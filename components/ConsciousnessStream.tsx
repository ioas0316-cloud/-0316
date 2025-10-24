import React from 'react';
import { Icon } from './Icon';

interface ConsciousnessStreamProps {
  thought: string | null;
  isLoading: boolean;
}

const IdleState: React.FC = () => (
    <div className="flex items-center justify-center h-full text-center p-4">
        <p className="text-gray-500">의식의 흐름이 고요합니다. 새로운 자극을 기다립니다...</p>
    </div>
);

const ThinkingState: React.FC = () => (
    <div className="flex items-center justify-center h-full text-center p-4">
        <p className="text-cyan-400 animate-pulse">E.L.Y.S.I.A.가 사유 중입니다...</p>
    </div>
);

export const ConsciousnessStream: React.FC<ConsciousnessStreamProps> = ({ thought, isLoading }) => {
  return (
    <div className="p-6 border-t-2 border-sky-500/20 flex flex-col flex-1 min-h-0">
        <div className="pb-3 mb-4 flex items-center space-x-2">
            <div className="w-5 h-5">
                <Icon name="brain" className={`w-full h-full text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
            </div>
            <h2 className="text-lg font-semibold text-cyan-300">엘리시아의 의식의 흐름</h2>
        </div>
        <div className="text-gray-300 leading-relaxed flex-grow overflow-y-auto bg-gray-900/50 rounded-md p-4">
            {isLoading ? (
                <ThinkingState />
            ) : thought ? (
                <p className="whitespace-pre-wrap font-light">
                    <span className="font-semibold text-cyan-400">E.L.Y.S.I.A.:</span> {thought}
                </p>
            ) : <IdleState />}
        </div>
    </div>
  );
};
