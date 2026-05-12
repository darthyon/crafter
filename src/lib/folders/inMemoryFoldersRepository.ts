import type {
  Entry,
  EntryId,
  Folder,
  FolderId,
} from '@/lib/domain';
import { findEntryById, readDb } from '@/lib/inMemoryDb';
import type {
  Cursor,
  FoldersRepository,
  FolderSummary,
  ListEntriesByFolderParams,
  ListEntriesByFolderResult,
  ListFoldersParams,
  ListFoldersResult,
  ListRecentEntriesParams,
  ListRecentEntriesResult,
  RecentEntry,
} from '@/lib/folders/FoldersRepository';

function parseCursor(cursor?: Cursor): number {
  if (!cursor) return 0;
  const n = Number(cursor);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

function nextCursorFor(nextOffset: number, total: number): Cursor | undefined {
  if (nextOffset >= total) return undefined;
  return String(nextOffset);
}

function sortByUpdatedDesc(a: Entry, b: Entry) {
  return b.updatedAt.localeCompare(a.updatedAt);
}

function entryCountByFolderId(entries: Entry[]): Record<FolderId, number> {
  const counts: Record<FolderId, number> = {} as Record<FolderId, number>;
  for (const e of entries) {
    if (!e.folderId) continue;
    counts[e.folderId] = (counts[e.folderId] ?? 0) + 1;
  }
  return counts;
}

function folderByIdMap(folders: Folder[]): Record<FolderId, Folder> {
  const map: Record<FolderId, Folder> = {} as Record<FolderId, Folder>;
  for (const f of folders) map[f.id] = f;
  return map;
}

export function createInMemoryFoldersRepository(): FoldersRepository {
  return {
    listFolders: async (params: ListFoldersParams): Promise<ListFoldersResult> => {
      const db = readDb();
      const offset = parseCursor(params.cursor);
      const counts = entryCountByFolderId(db.entries);

      const all: FolderSummary[] = db.folders.map((folder) => ({
        folder,
        entryCount: counts[folder.id] ?? 0,
      }));

      const slice = all.slice(offset, offset + params.limit);
      return {
        folders: slice,
        nextCursor: nextCursorFor(offset + slice.length, all.length),
      };
    },

    getFolderById: async (id: FolderId) => {
      const db = readDb();
      const folder = db.folders.find((f) => f.id === id);
      if (!folder) return null;
      const counts = entryCountByFolderId(db.entries);
      return { folder, entryCount: counts[id] ?? 0 };
    },

    listEntriesByFolder: async (
      params: ListEntriesByFolderParams,
    ): Promise<ListEntriesByFolderResult> => {
      const db = readDb();
      const offset = parseCursor(params.cursor);
      const all = db.entries
        .filter((e) => e.folderId === params.folderId)
        .slice()
        .sort(sortByUpdatedDesc);

      const slice = all.slice(offset, offset + params.limit);
      return {
        entries: slice,
        nextCursor: nextCursorFor(offset + slice.length, all.length),
      };
    },

    listRecentEntries: async (params: ListRecentEntriesParams): Promise<ListRecentEntriesResult> => {
      const db = readDb();
      const offset = parseCursor(params.cursor);
      const foldersById = folderByIdMap(db.folders);

      const all: RecentEntry[] = db.entries
        .slice()
        .sort(sortByUpdatedDesc)
        .map((entry) => ({
          entry,
          folder: entry.folderId ? foldersById[entry.folderId] : undefined,
        }));

      const slice = all.slice(offset, offset + params.limit);
      return {
        entries: slice,
        nextCursor: nextCursorFor(offset + slice.length, all.length),
      };
    },

    getEntryById: async (id: EntryId) => {
      return findEntryById(id) ?? null;
    },
  };
}

