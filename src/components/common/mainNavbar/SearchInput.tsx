import ic_search from "../../../assets/ic_search.svg";

type SearchInputProps = {
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({
  placeholder = "키워드로 검색해 보세요",
  disabled = false,
  onChange,
}: SearchInputProps) => {
  return (
    <div className="w-[296px] h-[48px] flex items-center px-5 py-4 bg-[#E7E0E8]/[0.58] rounded-[28px] ml-[8px]">
      <input
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        className="flex-1 bg-transparent outline-none body-large placeholder:opacity-60"
      />
      <img
        src={ic_search}
        alt="Search"
        className="w-4.5 h-4.5 text-[#49454E]"
      />
    </div>
  );
};
