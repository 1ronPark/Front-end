import type { MemberDetailData } from "../../../types/MemberProps";

type MemberAwardsProps = {
    activities: MemberDetailData['activities'];
};

const getYear = (iso?: string) =>
    iso ? new Date(iso).getFullYear().toString() : "";

    const formatPeriod = (
        startDate: string,
        hasEndDate: boolean,
        endDate?: string
    ) => {
    const s = getYear(startDate);
    const e = hasEndDate && endDate ? getYear(endDate) : "현재";
    // 같은 해면 "2025"로만 보여주고 싶으면 아래 한 줄로 대체:
    // return hasEndDate && endDate && s === e ? s : `${s} - ${e}`;
    return `${s} - ${e}`;
};

const MemberAwards = ({ activities }: MemberAwardsProps) => {
    
    return (
        <section className="mb-2">
            <p className="headline-small-emphasis mb-3">이력</p>
            <div className="bg-white rounded-[12px] border border-[#79747E]/[0.16] px-12 py-6 w-full">
                <div className="flex flex-col gap-[34px]">
                    {activities.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-6">
                            <p className="body-large-emphasis text-[#000000]/[0.58] min-w-[128px]">
                                {formatPeriod(item.startDate, item.hasEndDate, item.endDate)}
                            </p>
                            <p className="title-medium-emphasis">{item.name}</p>
                        </div>
                    ))}
                </div>
            
            </div>
        </section>
    );
};

export default MemberAwards;