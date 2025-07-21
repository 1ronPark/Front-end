import { CircleUser } from "lucide-react";
import cachedIcon from "../assets/icons/ic_cached.svg";

export const LightTalk = () => {
  return (
    <div className="flex flex-col items-start justify-end px-[608px] pt-[72px] gap-[24px]">
      <div className="flex justify-center items-center gap-[19px]">
        <button className="flex justify-center items-center">
          <div className="flex justify-center items-center px-4 py-2 gap-2 rounded-[100px] shadow-lg bg-[#FCF8FF]">
            <CircleUser className="w-5 h-5 aspect-square" />
            <span className="text-[#47464F] label-large">우리학교</span>
            <button>
              <img
                src={cachedIcon}
                className="w-6 h-6 aspect-square opacity-[0.38]"
              />
            </button>
          </div>
        </button>
      </div>
    </div>
  );
};
