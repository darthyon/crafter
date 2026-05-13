import { useEffect, useMemo, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { IdleAnimated } from '@/assets/mascot/IdleAnimated';
import {
  BottomSheet,
  Button,
  ConfirmDialog,
  Divider,
  IconButton,
  PressableRow,
  ScreenHeader,
  Text,
  TextArea,
  TextField,
} from '@/components/primitives';
import type { CraftSectionKind } from '@/stores/editorStore';
import { useEditorStore } from '@/stores/editorStore';
import { spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';

const CRAFT_SECTIONS: { kind: CraftSectionKind; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { kind: 'Ingredients', label: 'Ingredients', icon: 'package' },
  { kind: 'Use', label: 'Use', icon: 'activity' },
  { kind: 'Details', label: 'Details', icon: 'align-left' },
  { kind: 'Checklist', label: 'Checklist', icon: 'check-square' },
  { kind: 'Tips', label: 'Tips', icon: 'sun' },
];

function cursorIndexForHeading(kind: CraftSectionKind, body: string, headingStart: number) {
  const heading = kind;
  const lineBreak = body.slice(headingStart).indexOf('\n');
  if (lineBreak < 0) return headingStart + heading.length;
  return headingStart + lineBreak + 1;
}

function detectSingleInsertion(previous: string, next: string) {
  if (previous === next) return null;
  let prefixLen = 0;
  const minLen = Math.min(previous.length, next.length);
  while (prefixLen < minLen && previous[prefixLen] === next[prefixLen]) prefixLen++;

  let suffixLen = 0;
  while (
    suffixLen < minLen - prefixLen &&
    previous[previous.length - 1 - suffixLen] === next[next.length - 1 - suffixLen]
  ) {
    suffixLen++;
  }

  const removed = previous.slice(prefixLen, previous.length - suffixLen);
  const inserted = next.slice(prefixLen, next.length - suffixLen);
  return { prefixLen, removed, inserted };
}

function autoPrefixNextLine(opts: { previous: string; next: string }) {
  const { previous, next } = opts;
  const diff = detectSingleInsertion(previous, next);
  if (!diff) return { text: next, cursor: undefined as number | undefined };
  if (diff.inserted !== '\n' || diff.removed.length > 0) return { text: next, cursor: undefined as number | undefined };

  const cursorAfterNewline = diff.prefixLen + 1;
  const beforeCursor = next.slice(0, cursorAfterNewline);
  const lastLineStart = beforeCursor.lastIndexOf('\n', beforeCursor.length - 2) + 1;
  const previousLine = beforeCursor.slice(lastLineStart, beforeCursor.length - 1);

  const prefix = previousLine.startsWith('☐ ')
    ? '☐ '
    : previousLine.startsWith('- ')
      ? '- '
      : null;
  if (!prefix) return { text: next, cursor: undefined as number | undefined };

  const nextText = next.slice(0, cursorAfterNewline) + prefix + next.slice(cursorAfterNewline);
  const nextCursor = cursorAfterNewline + prefix.length;
  return { text: nextText, cursor: nextCursor };
}

export default function EditorScreen() {
  const router = useRouter();
  const colors = useColors();
  const params = useLocalSearchParams<{ mode?: string; id?: string }>();

  const mode = params.mode === 'entry' ? 'entry' : 'draft';
  const entryId = mode === 'entry' ? params.id : undefined;

  const inputRef = useRef<TextInput | null>(null);
  const previousBodyRef = useRef<string>('');
  const [craftSheetOpen, setCraftSheetOpen] = useState(false);
  const [selection, setSelection] = useState<{ start: number; end: number } | undefined>(undefined);
  const selectionRef = useRef<{ start: number; end: number } | undefined>(undefined);

  const {
    title,
    body,
    isLoading,
    error,
    isDirty,
    confirmDiscardOpen,
    loadDraft,
    loadEntry,
    setTitle,
    setBody,
    insertCraftSection,
    saveAndClose,
    requestClose,
    discardAndClose,
    cancelDiscard,
  } = useEditorStore();

  useEffect(() => {
    if (mode === 'entry') {
      if (!entryId) return;
      void loadEntry(entryId);
      return;
    }
    void loadDraft();
  }, [mode, entryId, loadDraft, loadEntry]);

  useEffect(() => {
    previousBodyRef.current = body;
  }, [body]);

  const sheetItems = useMemo(() => CRAFT_SECTIONS, []);

  function navigateBack() {
    router.back();
  }

  function onPressClose() {
    requestClose({ onDiscard: navigateBack });
  }

  function onPressSave() {
    void saveAndClose({ navigateBack });
  }

  function onInsertSection(kind: CraftSectionKind) {
    const res = insertCraftSection(kind);
    setCraftSheetOpen(false);
    const idx = res.index ?? body.length;
    const nextCursor = res.inserted ? idx : cursorIndexForHeading(kind, body, idx);
    setSelection({ start: nextCursor, end: nextCursor });
    selectionRef.current = { start: nextCursor, end: nextCursor };
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function onChangeBody(nextText: string) {
    const prev = previousBodyRef.current;
    const { text, cursor } = autoPrefixNextLine({ previous: prev, next: nextText });
    previousBodyRef.current = text;
    setBody(text);
    if (cursor != null) {
      setSelection({ start: cursor, end: cursor });
      selectionRef.current = { start: cursor, end: cursor };
    }
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScreenHeader
          left={
            <IconButton
              onPress={onPressClose}
              accessibilityLabel="Close editor"
              accessibilityHint={isDirty ? 'Prompts to discard unsaved changes' : 'Closes the editor'}
            >
              <Feather name="x" size={22} color={colors.text} />
            </IconButton>
          }
          right={
            <IconButton
              onPress={onPressSave}
              disabled={isLoading}
              accessibilityLabel="Save"
              accessibilityHint="Saves and closes the editor"
            >
              <Feather name="check" size={22} color={colors.text} />
            </IconButton>
          }
        />

        <View style={styles.content}>
          <TextField
            value={title}
            onChangeText={setTitle}
            placeholder="Optional title"
            variant="editorTitle"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => inputRef.current?.focus()}
          />

          <Divider style={{ marginHorizontal: spacing.lg }} />

          <View style={styles.bodyArea}>
            <TextArea
              ref={(r) => {
                inputRef.current = r;
              }}
              value={body}
              onChangeText={onChangeBody}
              selection={selection}
              onSelectionChange={(e) => {
                selectionRef.current = e.nativeEvent.selection;
                setSelection(e.nativeEvent.selection);
              }}
              placeholder=""
              variant="editorBody"
              autoCorrect
              autoCapitalize="sentences"
              scrollEnabled
              style={styles.bodyInputExtra}
            />

            <View style={styles.mascot}>
              <IdleAnimated size={34} color={colors.textTertiary} />
            </View>
          </View>

          <View style={styles.addDetailWrap}>
            <Button
              onPress={() => setCraftSheetOpen(true)}
              accessibilityLabel="Add section"
              accessibilityHint="Opens section picker"
            >
              <Feather name="plus" size={16} color={colors.textSecondary} />
              <Text variant="action">Add section</Text>
            </Button>
          </View>
        </View>

        <BottomSheet open={craftSheetOpen} onRequestClose={() => setCraftSheetOpen(false)} title="Add section">
          {sheetItems.map((item) => (
            <PressableRow
              key={item.kind}
              onPress={() => onInsertSection(item.kind)}
              accessibilityLabel={`Add ${item.label}`}
              left={
                <>
                  <Feather name={item.icon} size={18} color={colors.textSecondary} />
                  <Text>{item.label}</Text>
                </>
              }
            />
          ))}
        </BottomSheet>

        <ConfirmDialog open={confirmDiscardOpen} onRequestClose={cancelDiscard}>
          <Text variant="cardTitle" style={{ marginBottom: spacing.sm }}>
            Discard changes?
          </Text>
          <Text variant="bodyMuted" style={{ marginBottom: spacing.lg }}>
            You have unsaved edits. They’ll be lost if you leave.
          </Text>
          <View style={styles.confirmActions}>
            <IconButton onPress={cancelDiscard} accessibilityLabel="Keep editing" style={styles.confirmButton}>
              <Text variant="action">Keep editing</Text>
            </IconButton>
            <IconButton onPress={discardAndClose} accessibilityLabel="Discard changes" style={styles.confirmButton}>
              <Text variant="action" style={{ color: colors.attention }}>
                Discard
              </Text>
            </IconButton>
          </View>
        </ConfirmDialog>

        {error ? (
          <View style={styles.errorToast}>
            <Text variant="bodyMuted" style={{ color: colors.attention }}>
              {error}
            </Text>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1 },

  bodyArea: {
    flex: 1,
    position: 'relative',
  },
  bodyInputExtra: {
    flex: 1,
    paddingBottom: spacing['3xl'],
  },
  mascot: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    opacity: 0.85,
    pointerEvents: 'none',
  },

  addDetailWrap: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },

  confirmActions: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'flex-end',
  },
  confirmButton: {
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: 'center',
  },

  errorToast: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing['4xl'],
  },
});
