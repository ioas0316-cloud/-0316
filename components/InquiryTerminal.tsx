import React from 'react';
import { Icon } from './Icon';

interface InquiryTerminalProps {
  inquiry: string | null;
  isLoading: boolean;
}

export const InquiryTerminal: React.FC<InquiryTerminalProps> = ({ inquiry, isLoading }) => {
  if (isLoading || !inquiry) {
    return null;
  }

  return (
    <div className="p-6 border-t-2 border-fuchsia-500/20 flex flex-col flex-1 min-h-0">
        <div className="pb-3 mb-4 flex items-center space-x-2">
            <div className="w-5 h-5">
                <Icon name="question" className="w-full h-full text-fuchsia-400" />
            </div>
            <h2 className="text-lg font-semibold text-fuchsia-300">엘리시아의 질문</h2>
        </div>
        <div className="text-gray-300 leading-relaxed flex-grow overflow-y-auto bg-gray-900/50 rounded-md p-4">
            <p className="whitespace-pre-wrap font-light">
                <span className="font-semibold text-fuchsia-400">E.L.Y.S.I.A.:</span> {inquiry}
            </p>
        </div>
    </div>
  );
};
