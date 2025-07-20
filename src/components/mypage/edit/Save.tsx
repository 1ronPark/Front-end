import { Folder } from 'lucide-react';

const Save = () => {
  return (
    <div className="flex justify-center py-6">
      <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#68548E] px-15 py-4 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-[#59407e]">
        <Folder size={20} />
        <span>프로필 저장</span>
      </button>
    </div>
  );
};

export default Save;
