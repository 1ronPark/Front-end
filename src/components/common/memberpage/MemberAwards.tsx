
const MemberAwards = () => {
    const awardData = [
        { date: '2024.05.28', description: '벤처 창업 경진대회 우수상' },
        { date: '2024.06.28', description: '24년도 하반기 SW융합연구 개발과제' },
        { date: '2025.02.12', description: '해동 창업 경진대회 우수상' },
        { date: '2025.03.24', description: '2025 창업 아이디어톤 대상' },
        { date: '2025.03.28', description: '전국 sw 창업 아이디어톤 장려상' },

        { date: '2025.04.12', description: '대학 연합 창업 캠프 3위' },
        { date: '2025.05.28', description: '대학생 융합 기술 창업 지원 수혜' },
        { date: '2025.05.28', description: '25년 SW창업동아리 연합 회장' },
    ];
    
    return (
        <section>
            <p className="headline-small-emphasis mb-4">경력 및 수상 이력</p>
            <div className="bg-white rounded-[8px] border border-[#CBC4CF] p-16 w-full">
                <div className="flex flex-col gap-[34px]">
                    {awardData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-[99px]">
                            <p className="title-large-emphasis text-[#49454E] min-w-[114px]">{item.date}</p>
                            <p className="body-large-emphasis">{item.description}</p>
                        </div>
                    ))}
                </div>
            
            </div>
        </section>
    );
};

export default MemberAwards;