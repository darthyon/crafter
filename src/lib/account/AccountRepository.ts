import type { AccountPlan, AccountProfile, AccountStats } from '@/lib/inMemoryDb';

export type AccountSnapshot = {
  profile: AccountProfile;
  stats: AccountStats;
  plan: AccountPlan;
};

export type UpdateProfilePatch = Partial<Pick<AccountProfile, 'displayName' | 'bio'>>;

export interface AccountRepository {
  getAccountSnapshot(): Promise<AccountSnapshot>;
  updateProfile(patch: UpdateProfilePatch): Promise<AccountProfile>;
  unlockPlus(): Promise<AccountSnapshot>;
}

