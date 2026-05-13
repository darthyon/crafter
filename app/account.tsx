import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  BottomSheet,
  Button,
  Card,
  ConfirmDialog,
  DashedCard,
  Divider,
  IconButton,
  PressableRow,
  ProgressBar,
  RadioRow,
  SectionHeader,
  StatCard,
  Text,
} from '@/components/primitives';
import { AccountCoffee } from '@/assets/icons/AccountCoffee';
import { AccountFolders } from '@/assets/icons/AccountFolders';
import { AccountLogout } from '@/assets/icons/AccountLogout';
import { AccountNotes } from '@/assets/icons/AccountNotes';
import { AccountPinned } from '@/assets/icons/AccountPinned';
import { AccountPlusWand } from '@/assets/icons/AccountPlusWand';
import { AccountWords } from '@/assets/icons/AccountWords';
import { Idle } from '@/assets/mascot';
import { useAccountStore } from '@/stores/accountStore';
import { usePreferencesStore } from '@/stores/preferencesStore';
import { radius, spacing } from '@/styles/tokens';
import { useColors } from '@/styles/theme';
import type { ThemePreference } from '@/lib/inMemoryDb';

export default function AccountScreen() {
  const colors = useColors();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const { isLoading, error, snapshot, load, unlockPlus } = useAccountStore();
  const { themePreference, setThemePreference } = usePreferencesStore();

  const [sheet, setSheet] = useState<null | 'appearance' | 'comingSoon'>(null);
  const [comingSoonTitle, setComingSoonTitle] = useState('Coming soon');
  const [comingSoonBody, setComingSoonBody] = useState('This is still being crafted.');
  const [confirmUnlockOpen, setConfirmUnlockOpen] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  useEffect(() => {
    void load();
  }, [load]);

  const contentWidth = useMemo(() => Math.min(520, Math.max(0, screenWidth)), [screenWidth]);
  const statsColumns = useMemo(() => (contentWidth < 340 ? 2 : 4), [contentWidth]);

  const statCardWidth = useMemo(() => {
    const horizontalPadding = spacing.lg;
    const gap = spacing.md;
    const available = contentWidth - horizontalPadding * 2 - gap * (statsColumns - 1);
    return Math.max(0, Math.floor(available / statsColumns));
  }, [contentWidth, statsColumns]);

  const stats = snapshot?.stats ?? {
    notesWritten: 0,
    wordsSaved: 0,
    foldersCreated: 0,
    pinnedNotes: 0,
  };

  const plan = snapshot?.plan ?? {
    freeLimitNotes: 150,
    notesUsed: 0,
    plusUnlocked: false,
    plusUnlockPriceUsd: 5,
  };

  const profile = snapshot?.profile ?? {
    displayName: 'Threadkeeper',
    email: 'threadkeeper@craftor.app',
    bio: 'Making little things, one stitch at a time.',
  };

  const wordsSavedLabel = useMemo(() => {
    const n = stats.wordsSaved;
    if (n >= 1000) return `${Math.round((n / 1000) * 10) / 10}k`;
    return String(n);
  }, [stats.wordsSaved]);

  const openComingSoon = (title: string, body: string) => {
    setComingSoonTitle(title);
    setComingSoonBody(body);
    setSheet('comingSoon');
  };

  const openKoFi = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://crafter.app/kofi');
    } catch {
      openComingSoon('Support', 'Unable to open the browser right now.');
    }
  };

  const updateTheme = async (value: ThemePreference) => {
    await setThemePreference(value);
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      <View style={[styles.topBar, { width: contentWidth, alignSelf: 'center', paddingHorizontal: spacing.lg }]}>
        <View style={styles.topBarLeft}>
          <IconButton
            onPress={() => router.back()}
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
          >
            <Feather name="chevron-left" size={24} color={colors.text} />
          </IconButton>
          <Text variant="brandTitle">Account</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { width: contentWidth, alignSelf: 'center', paddingHorizontal: spacing.lg },
        ]}
      >
        {/* ── Profile ── */}
        <View style={styles.profileRow}>
          <View style={[styles.avatarWrap, { borderColor: colors.border, backgroundColor: colors.surfaceRaised }]}>
            <Text variant="statNumber" style={{ color: colors.textSecondary }}>
              T
            </Text>
            <IconButton
              onPress={() => openComingSoon('Edit profile', 'Profile editing is still being crafted.')}
              accessibilityLabel="Edit profile"
              accessibilityHint="Change your avatar and profile details"
              style={[styles.avatarEdit, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Feather name="edit-3" size={16} color={colors.textSecondary} />
            </IconButton>
          </View>

          <View style={styles.profileText}>
            <Text variant="accountName">
              {profile.displayName}
            </Text>
            <Text variant="bodyMuted">{profile.email}</Text>
            <View style={styles.profileBioRow}>
              <Text variant="bodyMuted">{profile.bio}</Text>
              <Feather name="heart" size={14} color={colors.textSecondary} />
            </View>
          </View>
        </View>

        {/* ── Stats ── */}
        <View style={styles.section}>
          <SectionHeader label="STATS" />
          <Divider />

          <View style={[styles.statsRow, { gap: spacing.md }]}>
            <StatCard
              style={{ width: statCardWidth }}
              icon={<AccountNotes size={22} color={colors.textSecondary} />}
              value={stats.notesWritten}
              label="Notes written"
            />

            <StatCard
              style={{ width: statCardWidth }}
              icon={<AccountWords size={22} color={colors.textSecondary} />}
              value={wordsSavedLabel}
              label="Words saved"
            />

            <StatCard
              style={{ width: statCardWidth }}
              icon={<AccountFolders size={22} color={colors.textSecondary} />}
              value={stats.foldersCreated}
              label="Folders created"
            />

            <StatCard
              style={{ width: statCardWidth }}
              icon={<AccountPinned size={22} color={colors.textSecondary} />}
              value={stats.pinnedNotes}
              label="Pinned notes"
            />
          </View>
        </View>

        {/* ── Plan ── */}
        <View style={styles.section}>
          <SectionHeader label="PLAN" />
          <Divider />

          <Card padding={spacing.lg}>
            <View style={styles.planRow}>
              <View style={styles.planLeft}>
                <AccountPlusWand size={22} color={colors.textSecondary} />
                <View>
                  <Text variant="accountCardTitle">Free plan</Text>
                  <Text variant="bodyMuted">Up to {plan.freeLimitNotes} notes</Text>
                </View>
              </View>

              <View style={styles.planRight}>
                <Text variant="bodyMuted">
                  {plan.notesUsed} / {plan.freeLimitNotes}
                </Text>
                <ProgressBar value={plan.notesUsed} max={plan.freeLimitNotes} style={{ marginTop: spacing.sm }} />
              </View>
            </View>
          </Card>

          {!plan.plusUnlocked ? (
            <DashedCard padding={spacing.lg}>
              <View style={styles.plusRow}>
                <View style={styles.plusLeft}>
                  <AccountPlusWand size={22} color={colors.textSecondary} />
                  <View style={{ flex: 1 }}>
                    <View style={styles.plusTitleRow}>
                      <Text variant="accountCardTitle">Crafter Plus</Text>
                      <View style={[styles.plusBadge, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                        <Text variant="action">PLUS</Text>
                      </View>
                    </View>
                    <Text variant="bodyMuted">Unlimited notes. One-time unlock.</Text>
                    <View style={styles.plusMetaRow}>
                      <Feather name="heart" size={14} color={colors.textSecondary} />
                      <Text variant="bodyMuted">Support indie</Text>
                      <Text variant="bodyMuted">·</Text>
                      <Text variant="bodyMuted">Unlock forever</Text>
                    </View>
                  </View>
                </View>

                <Button
                  onPress={() => setConfirmUnlockOpen(true)}
                  accessibilityLabel="Unlock Crafter Plus"
                  accessibilityHint="Unlock unlimited notes with a one-time purchase"
                  style={styles.unlockButton}
                >
                  <Text variant="pillPrice">${plan.plusUnlockPriceUsd}</Text>
                  <Text variant="bodyMuted">Unlock</Text>
                </Button>
              </View>
            </DashedCard>
          ) : null}
        </View>

        {/* ── Support ── */}
        <View style={styles.section}>
          <SectionHeader label="SUPPORT CRAFTER" />
          <Divider />

          <Card padding={spacing.lg}>
            <View style={styles.supportRow}>
              <View style={styles.supportLeft}>
                <AccountCoffee size={22} color={colors.textSecondary} />
                <View>
                  <Text variant="accountCardTitle">Love Crafter?</Text>
                  <Text variant="bodyMuted">Buy me a coffee on Ko-fi</Text>
                  <Text variant="bodyMuted">Your support keeps this little project going.</Text>
                </View>
              </View>

              <Button
                variant="secondary"
                onPress={() => void openKoFi()}
                accessibilityLabel="Support on Ko-fi"
                accessibilityHint="Opens Ko-fi in your browser"
                style={styles.supportButton}
              >
                <Text style={styles.supportButtonText}>Support on Ko-fi</Text>
                <Feather name="external-link" size={16} color={colors.textSecondary} />
              </Button>
            </View>
            <View style={[styles.supportMascot, { opacity: 0.22 }]}>
              <Idle size={28} color={colors.textSecondary} />
            </View>
          </Card>
        </View>

        {/* ── Settings ── */}
        <View style={styles.section}>
          <SectionHeader label="SETTINGS" />
          <Divider />

          <Card padding={0}>
            <PressableRow
              onPress={() => setSheet('appearance')}
              accessibilityLabel="Appearance"
              accessibilityHint="Choose light or dark mode"
              style={styles.settingsRow}
              left={
                <>
                  <Feather name="feather" size={18} color={colors.textSecondary} />
                  <Text>Appearance</Text>
                </>
              }
              right={
                <>
                  <Text variant="bodyMuted">{themePreference === 'system' ? 'System' : themePreference}</Text>
                  <Feather name="chevron-right" size={20} color={colors.textSecondary} />
                </>
              }
            />
            <Divider style={{ marginLeft: 48 }} />

            <PressableRow
              onPress={() => openComingSoon('Export data', 'Export will be added soon.')}
              accessibilityLabel="Export data"
              accessibilityHint="Export your notes and folders"
              style={styles.settingsRow}
              left={
                <>
                  <Feather name="download" size={18} color={colors.textSecondary} />
                  <Text>Export data</Text>
                </>
              }
              right={<Feather name="chevron-right" size={20} color={colors.textSecondary} />}
            />
            <Divider style={{ marginLeft: 48 }} />

            <PressableRow
              onPress={() => openComingSoon('About', 'More details will be added soon.')}
              accessibilityLabel="About Crafter"
              accessibilityHint="Learn more about Crafter"
              style={styles.settingsRow}
              left={
                <>
                  <Feather name="info" size={18} color={colors.textSecondary} />
                  <Text>About Crafter</Text>
                </>
              }
              right={<Feather name="chevron-right" size={20} color={colors.textSecondary} />}
            />
          </Card>
        </View>

        <Button
          variant="secondary"
          onPress={() => setConfirmLogoutOpen(true)}
          accessibilityLabel="Log out"
          accessibilityHint="Logs out of your account"
          style={styles.logoutButton}
        >
          <AccountLogout size={20} color={colors.textSecondary} />
          <Text>Log out</Text>
        </Button>

        <View style={styles.footer}>
          <Text variant="bodyMuted">Thanks for crafting with Crafter.</Text>
          <View style={styles.footerRow}>
            <Text variant="bodyMuted">Made with care by an indie maker.</Text>
            <Feather name="heart" size={14} color={colors.textSecondary} />
          </View>
        </View>

        {error ? (
          <Text variant="bodyMuted" style={{ color: colors.attention }}>
            {error}
          </Text>
        ) : null}

        {isLoading ? <View style={{ paddingTop: spacing.md }} /> : null}
      </ScrollView>

      <BottomSheet open={sheet === 'appearance'} onRequestClose={() => setSheet(null)} title="Appearance">
        <Text variant="bodyMuted">Choose a theme for Crafter.</Text>
        <View style={{ paddingTop: spacing.md }}>
          <RadioRow
            label="System"
            description="Match your device setting"
            selected={themePreference === 'system'}
            onPress={() => void updateTheme('system')}
            accessibilityLabel="Use system appearance"
          />
          <Divider />
          <RadioRow
            label="Light"
            selected={themePreference === 'light'}
            onPress={() => void updateTheme('light')}
            accessibilityLabel="Use light mode"
          />
          <Divider />
          <RadioRow
            label="Dark"
            selected={themePreference === 'dark'}
            onPress={() => void updateTheme('dark')}
            accessibilityLabel="Use dark mode"
          />
        </View>
      </BottomSheet>

      <BottomSheet open={sheet === 'comingSoon'} onRequestClose={() => setSheet(null)} title={comingSoonTitle}>
        <Text variant="bodyMuted">{comingSoonBody}</Text>
      </BottomSheet>

      <ConfirmDialog open={confirmUnlockOpen} onRequestClose={() => setConfirmUnlockOpen(false)}>
        <Text variant="brandTitle">Unlock Crafter Plus?</Text>
        <Text variant="bodyMuted" style={{ marginTop: spacing.sm }}>
          One-time unlock for unlimited notes.
        </Text>
        <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg }}>
          <Button variant="secondary" onPress={() => setConfirmUnlockOpen(false)} accessibilityLabel="Cancel unlock">
            <Text>Cancel</Text>
          </Button>
          <Button
            onPress={() => {
              setConfirmUnlockOpen(false);
              void unlockPlus();
            }}
            accessibilityLabel="Confirm unlock"
          >
            <Text>Unlock</Text>
          </Button>
        </View>
      </ConfirmDialog>

      <ConfirmDialog open={confirmLogoutOpen} onRequestClose={() => setConfirmLogoutOpen(false)}>
        <Text variant="brandTitle">Log out?</Text>
        <Text variant="bodyMuted" style={{ marginTop: spacing.sm }}>
          Authentication is not wired up yet.
        </Text>
        <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg }}>
          <Button variant="secondary" onPress={() => setConfirmLogoutOpen(false)} accessibilityLabel="Cancel logout">
            <Text>Cancel</Text>
          </Button>
          <Button
            onPress={() => {
              setConfirmLogoutOpen(false);
              openComingSoon('Log out', 'Log out will be added soon.');
            }}
            accessibilityLabel="Confirm logout"
          >
            <Text>Log out</Text>
          </Button>
        </View>
      </ConfirmDialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  content: {
    paddingBottom: spacing['4xl'],
    gap: spacing['2xl'],
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingTop: spacing.lg,
  },
  avatarWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarEdit: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
  },
  profileText: {
    flex: 1,
    gap: spacing.xs,
  },
  profileBioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },

  section: { gap: spacing.md },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  planRight: {
    minWidth: 120,
    alignItems: 'flex-end',
  },

  plusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.lg },
  plusLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  plusTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  plusBadge: {
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  plusMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },
  unlockButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    minWidth: 88,
  },

  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  supportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  supportButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  supportButtonText: {},
  supportMascot: { position: 'absolute', right: spacing.lg, bottom: spacing.md },

  settingsRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  logoutButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
