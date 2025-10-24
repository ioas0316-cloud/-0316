import React, { useState } from 'react';
import { MemoryCrystal } from '../types';
import { Icon } from './Icon';

interface ChronicleProps {
  memories: MemoryCrystal[];
}

const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const ChronicleEntry: React.FC<{ memory: MemoryCrystal }> = ({ memory }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { knowledge, elysia_process, timestamp } = memory;

    return (
        <div className="bg-gray-900/50 rounded-lg transition-all duration-300">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left p-3 flex items-center justify-between hover:bg-gray-700/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
                <div className="flex-grow truncate">
                    <p className="text-sm font-semibold text-sky-300 truncate">{`'${knowledge.name}'에 대한 깨달음`}</p>
                    <p className="text-xs text-gray-400">{formatTimestamp(timestamp)}</p>
                </div>
                 <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isExpanded && (
                <div className="p-4 border-t border-gray-700/50 space-y-4">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <Icon name="brain" className="w-4 h-4 text-cyan-400" />
                            <h4 className="text-sm font-semibold text-cyan-300">사유</h4>
                        </div>
                        <p className="text-sm text-gray-300 whitespace-pre-wrap pl-6">{elysia_process.thought}</p>
                    </div>

                    {elysia_process.inquiry && (
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Icon name="question" className="w-4 h-4 text-fuchsia-400" />
                                <h4 className="text-sm font-semibold text-fuchsia-300">질문</h4>
                            </div>
                            <p className="text-sm text-gray-300 whitespace-pre-wrap pl-6">{elysia_process.inquiry}</p>
                        </div>
                    )}
                    
                    {elysia_process.creation && (
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Icon name="sparkles" className="w-4 h-4 text-emerald-400" />
                                <h4 className="text-sm font-semibold text-emerald-300">창조</h4>
                            </div>
                            <p className="text-sm text-gray-300 whitespace-pre-wrap pl-6">{elysia_process.creation}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export const Chronicle: React.FC<ChronicleProps> = ({ memories }) => {
  if (memories.length === 0) {
    return null;
  }
  
  // Newest first
  const sortedMemories = [...memories].reverse();

  return (
    <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="px-4 pb-2 flex items-center space-x-2">
            <Icon name="book-open" className="text-sky-400"/>
            <h3 className="text-md font-semibold text-gray-300">엘리시아의 연대기</h3>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {sortedMemories.map(memory => (
                <ChronicleEntry key={memory.timestamp} memory={memory} />
            ))}
        </div>
    </div>
  );
};
