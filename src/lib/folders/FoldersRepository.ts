import type { Entry, EntryId, Folder, FolderId } from '@/lib/domain';

export type Cursor = string;

export type ListFoldersParams = {
  limit: number;
  cursor?: Cursor;
};

export type FolderSummary = {
  folder: Folder;
  entryCount: number;
};

export type ListFoldersResult = {
  folders: FolderSummary[];
  nextCursor?: Cursor;
};

export type GetFolderResult = {
  folder: Folder;
  entryCount: number;
} | null;

export type ListEntriesByFolderParams = {
  folderId: FolderId;
  limit: number;
  cursor?: Cursor;
};

export type ListEntriesByFolderResult = {
  entries: Entry[];
  nextCursor?: Cursor;
};

export type ListRecentEntriesParams = {
  limit: number;
  cursor?: Cursor;
};

export type RecentEntry = {
  entry: Entry;
  folder?: Folder;
};

export type ListRecentEntriesResult = {
  entries: RecentEntry[];
  nextCursor?: Cursor;
};

export interface FoldersRepository {
  listFolders(params: ListFoldersParams): Promise<ListFoldersResult>;
  getFolderById(id: FolderId): Promise<GetFolderResult>;
  listEntriesByFolder(params: ListEntriesByFolderParams): Promise<ListEntriesByFolderResult>;
  listRecentEntries(params: ListRecentEntriesParams): Promise<ListRecentEntriesResult>;
  getEntryById(id: EntryId): Promise<Entry | null>;
}

