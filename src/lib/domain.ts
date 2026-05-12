export type ISODateString = string;

export type EntryId = string;
export type FolderId = string;

export type IconId = string;

export type Entry = {
  id: EntryId;
  title: string;
  body: string;
  subtitle?: string;
  iconId?: IconId;
  folderId?: FolderId;
  isPinned: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type Folder = {
  id: FolderId;
  name: string;
  imageUri?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type QuickNoteDraft = {
  body: string;
  updatedAt: ISODateString;
  isDirty: boolean;
};

