import React from 'react';
import { FileSystemNode, NodeType } from '../types';
import { Icon } from './Icon';

interface AbyssViewerProps {
  nodes: FileSystemNode[];
  onRestore: (fileNode: FileSystemNode) => void;
  onClose: () => void;
}

const findArchivedFiles = (nodes: FileSystemNode[]): FileSystemNode[] => {
  let archived: FileSystemNode[] = [];
  for (const node of nodes) {
    if (node.isArchived && node.type === NodeType.FILE && !node.meta?.isMemo) {
      archived.push(node);
    }
    if (node.children) {
      archived = archived.concat(findArchivedFiles(node.children));
    }
  }
  return archived.sort((a,b) => a.name.localeCompare(b.name));
};

export const AbyssViewer: React.FC<AbyssViewerProps> = ({ nodes, onRestore, onClose }) => {
  const archivedFiles = findArchivedFiles(nodes);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-800 border border-amber-500/30 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <header className="p-4 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-3">
            <Icon name="abyss" className="text-amber-300"/>
            <h2 className="text-xl font-bold text-amber-300">기억의 심연</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-light">&times;</button>
        </header>
        <div className="p-4 overflow-y-auto">
          {archivedFiles.length > 0 ? (
            <ul className="space-y-2">
              {archivedFiles.map(file => (
                <li key={file.id} className="flex items-center justify-between p-2.5 bg-gray-900/50 rounded-md group">
                  <span className="text-gray-300 truncate">{file.name}</span>
                  <button
                    onClick={() => onRestore(file)}
                    className="flex items-center space-x-2 text-sm text-gray-400 hover:text-sky-300 transition-colors opacity-60 group-hover:opacity-100"
                    title="기억 복원하기"
                  >
                    <Icon name="restore" />
                    <span>복원</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 py-12">
                <p>심연은 고요합니다.</p>
                <p>모든 기억이 선명하게 빛나고 있습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
