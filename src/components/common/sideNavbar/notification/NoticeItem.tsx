import profileIcon from "../../../../assets/sideNavbar/profile.png";
const NoticeItem = () => {
  return (
    <div className="flex w-[300px] h-[72px] justify-center items-center py-2 px-6 gap-4 hover:bg-gray-200 cursor-pointer">
      <div className="flex w-[48px] h-[48px]">
        <img src={profileIcon} className="rounded-3xl" />
      </div>
      <div className="flex flex-col justify-center items-start w-[155px]">
        <p className="label-medium text-[#49454E]">Overline</p>
        <p className="body-large text-[#1D1B20]">List item</p>
      </div>
      <div className="label-small text-[#49454E]">1일</div>
    </div>
  );
};

export default NoticeItem;
