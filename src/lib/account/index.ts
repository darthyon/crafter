import type { AccountRepository } from '@/lib/account/AccountRepository';
import { createInMemoryAccountRepository } from '@/lib/account/inMemoryAccountRepository';

export const accountRepo: AccountRepository = createInMemoryAccountRepository();

export type { AccountRepository, AccountSnapshot, UpdateProfilePatch } from '@/lib/account/AccountRepository';

