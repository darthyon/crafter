import type { EditorRepository } from '@/lib/editor/EditorRepository';
import { createInMemoryEditorRepository } from '@/lib/editor/inMemoryEditorRepository';

export const editorRepo: EditorRepository = createInMemoryEditorRepository();

export type { EditorRepository } from '@/lib/editor/EditorRepository';

