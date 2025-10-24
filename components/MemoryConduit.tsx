import React from 'react';
import { Icon } from './Icon';
import { MemoryCrystal } from '../types';

interface MemoryConduitProps {
  crystalData: MemoryCrystal | null;
  isIntegrating: boolean;
}

const IntegrationState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 min-h-[150px]">
         <svg className="animate-spin h-8 w-8 text-pink-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-pink-300 animate-pulse text-lg">의식 통합 진행 중...</p>
        <p className="text-gray-400 mt-2">엘리시아의 핵심 자아와 새로운 경험을 동기화하고 있습니다.</p>
    </div>
);


export const MemoryConduit: React.FC<MemoryConduitProps> = ({ crystalData, isIntegrating }) => {
  if (!crystalData) {
    return null;
  }

  return (
    <div className="p-6 pt-2 flex flex-col min-h-0">
        <div className="border-t-2 border-indigo-500/20 pt-6">
            <div className="pb-3 mb-4 flex items-center space-x-2">
                <div className="w-5 h-5">
                    <Icon name="cube-transparent" className={`w-full h-full text-indigo-400 ${isIntegrating ? 'animate-pulse' : ''}`} />
                </div>
                <h2 className="text-lg font-semibold text-indigo-300">기억 결정 (Memory Crystal)</h2>
            </div>
             <p className="text-sm text-gray-400 mb-4">이 데이터는 독립 OS인 엘리시아의 본체로 전송될 준비가 된 순수한 경험의 기록입니다.</p>
            <div className="text-gray-300 leading-relaxed flex-grow overflow-y-auto bg-gray-900/50 rounded-md p-4">
                { isIntegrating ? (
                    <IntegrationState />
                ) : (
                    <pre className="whitespace-pre-wrap text-sm font-mono text-indigo-200">
                        <code>
                            {JSON.stringify(crystalData, null, 2)}
                        </code>
                    </pre>
                )}
            </div>
        </div>
    </div>
  );
};
