import { useEffect, useState } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';
import { Writing01 } from './Writing01';
import { Writing02 } from './Writing02';
import { Idle } from './Idle';
import type { MascotProps } from './types';

function useReduceMotionEnabled() {
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);

  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (!mounted) return;
      setReduceMotionEnabled(Boolean(enabled));
    });

    const sub = AccessibilityInfo.addEventListener?.('reduceMotionChanged', (enabled) => {
      setReduceMotionEnabled(Boolean(enabled));
    });

    return () => {
      mounted = false;
      // RN typings vary by version
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sub as any)?.remove?.();
    };
  }, []);

  return reduceMotionEnabled;
}

/**
 * Mascot IdleAnimated — subtle two-frame motion (writing-01 ↔ writing-02).
 *
 * Intended for notes/editor surfaces; keep nav chrome (TopBar) static.
 */
export function IdleAnimated(props: MascotProps) {
  const reduceMotionEnabled = useReduceMotionEnabled();
  const [frame, setFrame] = useState<'a' | 'b'>('a');

  useEffect(() => {
    setFrame('a');
    if (reduceMotionEnabled) return;
    const id = setInterval(() => {
      setFrame((f) => (f === 'a' ? 'b' : 'a'));
    }, 900);
    return () => clearInterval(id);
  }, [reduceMotionEnabled]);

  if (reduceMotionEnabled) {
    return <Idle {...props} />;
  }

  return (
    <View style={[styles.wrap, { width: props.size ?? 32, height: props.size ?? 32 }]}>
      <View style={styles.frame}>{frame === 'a' ? <Writing01 {...props} /> : <Writing02 {...props} />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative' },
  frame: { position: 'absolute', left: 0, top: 0 },
});
