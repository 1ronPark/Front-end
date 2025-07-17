import logo from "../../../assets/icons/mypage/project_sample_logo.png";

interface MyProjectCartProps {
  status: "참여중" | "제안 수락됨" | "제안 거절됨" | "모집중";
  title: string;
  PM_name: string;
  univ: string;
  location: string;
}

const MyprojectCard = ({
  status,
  title,
  PM_name,
  univ,
  location,
}: MyProjectCartProps) => {
  return (
    <div className="w-[960px] ">
      <div
        className="w-full h-[96px] flex  items-center p-2.5
      border border-solid border-[#C8C5D0]"
      >
        <img src={logo} className="w-[64px] h-[64px] rounded-[8px] ml-1" />
        <button
          className={`text-black mx-[56px] w-[96px] h-[32px] flex justify-center items-center px-2 gap-2.5
        rounded-[8px]
        ${status === "참여중" && "bg-[#D6E6FF]"}
        ${status === "제안 수락됨" && "bg-[#D6FFD6]"}
        ${status === "제안 거절됨" && "bg-[#FFDAD6]"}
        ${status === "모집중" && "bg-[#E3DFFF]"}
        `}
        >
          <span className="label-medium text-[#1C1B21]">{status}</span>
        </button>
        <div className="flex flex-col justify-center items-start gap-1">
          <span className="title-medium-emphasis text-[#1C1B21]">{title}</span>
          <span className="label-medium text-[#47464F]">
            {PM_name} PM, {univ}, {location} 전체
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyprojectCard;
