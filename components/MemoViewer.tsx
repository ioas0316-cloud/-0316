import React from 'react';

interface MemoViewerProps {
  memoContent: string | null;
  fileName: string | null;
}

const WelcomeMessage: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
     <div className="w-16 h-16 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-sky-400 opacity-50">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    </div>
    <h2 className="text-xl font-bold text-gray-200 mb-2">E.L.Y.S.I.A.의 도서관</h2>
    <p className="text-gray-400">왼쪽의 세계수에서 지식을 선택하면, 창조주가 남긴 메모를 이곳에서 확인할 수 있습니다.</p>
  </div>
);

export const MemoViewer: React.FC<MemoViewerProps> = ({ memoContent, fileName }) => {
  if (memoContent === null || fileName === null) {
    return <WelcomeMessage />;
  }

  return (
    <div className="p-6 flex flex-col flex-grow min-h-0">
        <div className="border-b border-gray-700 pb-3 mb-4">
             <h2 className="text-lg font-semibold text-gray-300">지식의 정수: 창조주의 메모</h2>
        </div>
        <h3 className="text-md font-semibold text-sky-300 mb-4">
            관련 파일: <span className="font-normal text-gray-300">{fileName}</span>
        </h3>
        <div className="text-gray-300 whitespace-pre-wrap leading-relaxed flex-grow overflow-y-auto bg-gray-900/50 rounded-md p-4">
            {memoContent ? memoContent : "이 파일에 대한 메모가 없습니다."}
        </div>
    </div>
  );
};