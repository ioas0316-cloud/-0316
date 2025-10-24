import React, { useState } from 'react';
import { FileSystemNode, NodeType } from '../types';
import { Icon } from './Icon';

interface FileExplorerProps {
  node: FileSystemNode;
  onFileSelect: (fileNode: FileSystemNode) => void;
  onFileArchive: (fileNode: FileSystemNode) => void;
  selectedFileId: string | null;
  integratedMemoryIds: string[];
  level?: number;
}

const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return 'file-pdf';
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) return 'file-doc';
    return 'file-text';
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ node, onFileSelect, onFileArchive, selectedFileId, integratedMemoryIds, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(level < 2);

  const isFolder = node.type === NodeType.FOLDER;
  const isMemo = node.meta?.isMemo ?? false;

  if (isMemo || node.isArchived) { // Don't render memo files or archived files
    return null;
  }

  const handleToggle = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onFileSelect(node);
    }
  };
  
  const isSelected = !isFolder && selectedFileId === node.id;
  const isIntegrated = !isFolder && integratedMemoryIds.includes(node.id);


  return (
    <div style={{ paddingLeft: `${level * 20}px` }}>
      <div
        className={`flex items-center space-x-2 p-1.5 rounded-md group transition-colors duration-200 
                    ${isSelected ? 'bg-sky-500/20 text-sky-300' : 'hover:bg-gray-700/50'}`}
      >
        <div onClick={handleToggle} className="flex items-center space-x-2 flex-grow cursor-pointer">
            {isFolder ? (
            <Icon name={isOpen ? 'folder-open' : 'folder'} className="text-sky-400" />
            ) : (
            <Icon name={getFileIcon(node.name)} className="text-gray-400" />
            )}
            <span className="flex-grow truncate">{node.name}</span>
            {isIntegrated && (
                <Icon name="checkmark-circle" className="text-emerald-400 flex-shrink-0" title="이 지식은 엘리시아의 자아에 통합되었습니다." />
            )}
        </div>
        {!isFolder && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFileArchive(node);
            }}
            className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-amber-400 transition-opacity ml-auto flex-shrink-0"
            title="이 지식을 기억의 심연으로 보내기"
          >
            <Icon name="archive" />
          </button>
        )}
      </div>
      {isFolder && isOpen && node.children && (
        <div className="mt-1">
          {node.children.map((child) => (
            <FileExplorer key={child.id} node={child} onFileSelect={onFileSelect} onFileArchive={onFileArchive} selectedFileId={selectedFileId} integratedMemoryIds={integratedMemoryIds} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
