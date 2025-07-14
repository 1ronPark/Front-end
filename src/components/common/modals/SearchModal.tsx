import { X, ArrowLeft } from "lucide-react";

export type SearchModalProps = {
    onClose: () => void;
};

const SearchModal = ({ onClose }: SearchModalProps) => {
    
    return (
        <div className="fixed inset-0 z-50 bg-black/85 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[500px] rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto">
                {/* 헤더 */}
                <div className="flex items-center px-4 py-3 border-b">
                    <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer" onClick={onClose} />
                    <input
                        type="text"
                        placeholder="Input text"
                        className="flex-1 outline-none bg-transparent text-base"
                    />
                    <X className="w-5 h-5 ml-2 cursor-pointer" onClick={onClose} />
                </div>

                {/* 아이템들 */}
                <div className="divide-y">
                    {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="flex items-center px-4 py-4 hover:bg-gray-100">
                            {/* avatar */}
                            <div className="w-10 h-10 rounded-full bg-[#E7E4FF] flex items-center justify-center text-[#2E2C4F] font-medium mr-4">
                                A
                            </div>
                            {/* 내용들 */}
                            <div className="flex-1">
                                <div className="font-medium text-sm">List item</div>
                                <div className="text-sm text-gray-500 truncate">Supporting line text lorem ipsum...</div>
                            </div>
                            {/* 카운트 */}
                            <div className="text-sm text-gray-500 font-medium ml-2">100+</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchModal;