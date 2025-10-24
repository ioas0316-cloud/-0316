import React from 'react';
import { Icon } from './Icon';

interface SynthesisCanvasProps {
  creation: string | null;
  isLoading: boolean;
}

const ThinkingState: React.FC = () => (
    <div className="flex items-center justify-center h-full text-center p-4">
        <p className="text-emerald-400 animate-pulse">E.L.Y.S.I.A.가 창조의 불꽃을 피우고 있습니다...</p>
    </div>
);

export const SynthesisCanvas: React.FC<SynthesisCanvasProps> = ({ creation, isLoading }) => {
  if (!isLoading && !creation) {
    return null;
  }

  return (
    <div className="p-6 pt-2 flex flex-col min-h-0">
        <div className="border-t-2 border-emerald-500/20 pt-6">
            <div className="pb-3 mb-4 flex items-center space-x-2">
                <div className="w-5 h-5">
                    <Icon name="sparkles" className={`w-full h-full text-emerald-400 ${isLoading ? 'animate-pulse' : ''}`} />
                </div>
                <h2 className="text-lg font-semibold text-emerald-300">엘리시아의 창조물</h2>
            </div>
            <div className="text-gray-300 leading-relaxed overflow-y-auto bg-gray-900/50 rounded-md p-4 min-h-[100px]">
                {isLoading ? (
                    <ThinkingState />
                ) : creation ? (
                    <p className="whitespace-pre-wrap font-light">
                        <span className="font-semibold text-emerald-400">E.L.Y.S.I.A.:</span> {creation}
                    </p>
                ): null}
            </div>
        </div>
    </div>
  );
};