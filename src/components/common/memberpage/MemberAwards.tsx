
const MemberAwards = () => {
    const awardData = [
        { date: '2025 - 2026', description: 'Developer Relations @ Node Guardians' },
        { date: '2025 - 2026', description: '24년도 하반기 SW융합연구 개발과제' },
        { date: '2025 - 2026', description: '해동 창업 경진대회 우수상' },
        { date: '2025 - 2026', description: '2025 창업 아이디어톤 대상' },
        { date: '2025 - 2026', description: '전국 sw 창업 아이디어톤 장려상' },

        { date: '2025 - 2026', description: '대학 연합 창업 캠프 3위' },
        { date: '2025 - 2026', description: '대학생 융합 기술 창업 지원 수혜' },
        { date: '2025 - 2026', description: '25년 SW창업동아리 연합 회장' },
    ];
    
    return (
        <section className="mb-2">
            <p className="headline-small-emphasis mb-3">이력</p>
            <div className="bg-white rounded-[12px] border border-[#79747E]/[0.16] px-12 py-6 w-full">
                <div className="flex flex-col gap-[34px]">
                    {awardData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-6">
                            <p className="body-large-emphasis text-[#000000]/[0.58] min-w-[128px]">{item.date}</p>
                            <p className="title-medium-emphasis">{item.description}</p>
                        </div>
                    ))}
                </div>
            
            </div>
        </section>
    );
};

export default MemberAwards;