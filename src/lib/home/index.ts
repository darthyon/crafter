import type { HomeRepository } from '@/lib/home/HomeRepository';
import { createInMemoryHomeRepository } from '@/lib/home/inMemoryHomeRepository';

export const homeRepo: HomeRepository = createInMemoryHomeRepository();

export type {
  HomeRepository,
  HomeSnapshot,
  ListPinnedParams,
  ListPinnedResult,
} from '@/lib/home/HomeRepository';

