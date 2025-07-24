import { Upload } from 'lucide-react';

const Save = () => {
  return (
    <div className="flex justify-center py-6">
      <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#5A5891] px-14 py-4 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-[#4A477C]">
        <Upload size={20} />
        <span>프로젝트 게시</span>
      </button>
    </div>
  );
};

export default Save;
