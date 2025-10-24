export enum NodeType {
  FOLDER = 'FOLDER',
  FILE = 'FILE',
}

export interface FileSystemNode {
  id: string;
  name: string;
  type: NodeType;
  children?: FileSystemNode[];
  content?: string; // For memo files
  meta?: {
    isMemo: boolean;
  };
  isArchived?: boolean;
}

export interface MemoryCrystal {
  timestamp: string;
  knowledge: {
    id: string;
    name: string;
    memo: string | null;
  };
  elysia_process: {
    thought: string;
    inquiry: string | null;
    creation: string | null;
  };
}
