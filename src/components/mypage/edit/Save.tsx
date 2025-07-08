import { Folder } from 'lucide-react';

const Save = () => {
  return (
    <div className="flex justify-center py-6">
      <button className="flex items-center justify-center gap-2 rounded-lg bg-[#68548E] px-8 py-4 text-sm font-semibold text-white">
        <Folder size={20} />
        <span>프로필 저장</span>
      </button>
    </div>
  );
};

export default Save;
