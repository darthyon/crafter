import type { FoldersRepository } from '@/lib/folders/FoldersRepository';
import { createInMemoryFoldersRepository } from '@/lib/folders/inMemoryFoldersRepository';

export const foldersRepo: FoldersRepository = createInMemoryFoldersRepository();

export type {
  Cursor,
  FolderSummary,
  FoldersRepository,
  GetFolderResult,
  ListEntriesByFolderParams,
  ListEntriesByFolderResult,
  ListFoldersParams,
  ListFoldersResult,
  ListRecentEntriesParams,
  ListRecentEntriesResult,
  RecentEntry,
} from '@/lib/folders/FoldersRepository';

