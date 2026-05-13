import type { AccountRepository, AccountSnapshot, UpdateProfilePatch } from '@/lib/account/AccountRepository';
import { readDb, writeDb } from '@/lib/inMemoryDb';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withLatency<T>(fn: () => T | Promise<T>): Promise<T> {
  const jitter = 50 + Math.floor(Math.random() * 71); // 50–120ms
  await sleep(jitter);
  return await fn();
}

export function createInMemoryAccountRepository(): AccountRepository {
  const db = readDb();

  return {
    async getAccountSnapshot(): Promise<AccountSnapshot> {
      return await withLatency(() => db.account);
    },

    async updateProfile(patch: UpdateProfilePatch) {
      return await withLatency(() => {
        writeDb((s) => {
          s.account.profile = { ...s.account.profile, ...patch };
        });
        return readDb().account.profile;
      });
    },

    async unlockPlus(): Promise<AccountSnapshot> {
      return await withLatency(() => {
        writeDb((s) => {
          s.account.plan.plusUnlocked = true;
        });
        return readDb().account;
      });
    },
  };
}

