import {useState} from 'react';
import { searchKakaoKeyword} from '@/api/kakao';
import type { KakaoPlace } from '@/api/kakao';

type AddLocationModalProps = {
  onClose: () => void;
  onSelect: (place: KakaoPlace) => void; 
};

export default function AddLocationModal({ onClose, onSelect }: AddLocationModalProps) {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState<KakaoPlace[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState("1");

    // 검색 함수 (API 요청)
  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const data = await searchKakaoKeyword(keyword.trim());
      setResults(data);
    } catch (e) {
      alert('검색 실패');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="flex flex-col items-start w-[624px] max-w-full bg-white
          p-[36px_72px] rounded-2xl shadow-[4px_4px_4px_3px_rgba(0,0,0,0.25)] gap-12 relative"
        style={{ padding: '36px 72px', gap: '48px' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 text-2xl font-bold">&times;</button>
        <div className="w-full flex items-center gap-4 mb-3">
          {/* 합성에 따라 아이콘 경로/이미지 교체 */}
          
          <img src="/cloud-sun.svg" className="w-20 h-20" alt="" />
          <span className="text-[32px] font-bold">날씨 위치 추가</span>
        </div>
        {/* 검색 인풋 */}
        <div className="w-full flex flex-col gap-2">
        <label
            className="block text-[24px] font-normal mb-2 pl-1"
            htmlFor="locationInput"> 장소 이름 </label>
        <div className="relative w-full">
            <input
            id="locationInput"
            className="
                w-full h-12 pr-10 pl-2 text-lg bg-transparent font-normal border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 placeholder-gray-300 outline-none"
            placeholder="장소를 입력해주세요" type="text" 
            value={keyword} 
            onChange={e => setKeyword(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center justify-center w-8 h-8"
            tabIndex={-1} // 포커스 이동 방지: 필요시 삭제
            onClick={handleSearch}
            >
            <img src="/zoom-front-color.svg" alt="검색" className="w-6 h-6" />
            </button>
        </div>
        </div>
        
        {/* 결과/선택 리스트*/}
        <div className="w-full mt-8 border border-gray-200 rounded-lg bg-white overflow-y-auto max-h-[250px]" style={{ minHeight: "140px" }}>
          {loading ? (
            <div className="p-4 text-gray-400">검색 중...</div>
          ) : (
            results.length > 0 ? results.map((place, idx) => (
              <button
                key={place.id}
                type="button"
                className={`
                  flex items-center w-full px-4 py-4 text-left
                  ${idx < results.length - 1 ? 'border-b border-gray-200' : ''}
                  focus:outline-none
                `}
            style={{ gap: '6px' }}
            onClick={() => setSelectedId(place.id)}
          >
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="font-semibold text-[16px] text-gray-40 truncate">{place.place_name}</span>
              <span className="text-[12px] text-gray-40 truncate">{place.address_name}</span>
            </div>
            {place.id === selectedId && (
              <img
                src="/tick-front-color.svg"
                alt="선택됨"
                className="w-8 h-8 ml-3"
              />
            )}
          </button>
        )): (
          <div className="p-4 text-gray-400"></div>
        )
        )}
        </div>

       <div className="flex w-full justify-end mt-3">
        <button
        className="
            px-8 py-2
            bg-gray-900 text-white text-lg font-bold rounded-lg
            shadow
        "
        style={{ minWidth: '100px' }}
        disabled = {!selectedId}
        onClick={() => {
          const sel = results.find(p => p.id === selectedId);
          if(sel) {
            onSelect(sel);
          }
        }}
        >
        확인
        </button>
      </div>
    </div> 
  </div>         
  );
}

