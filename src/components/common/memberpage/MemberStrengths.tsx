const MemberStrengths = () => {
    const workSkills = ["시장조사", "데이터 분석", "기획서 작성", "영상 편집"];
    const strengths = ["낙관적", "일론박적 사고", "친절해요", "꼼꼼해요"];

    return (
        <section>
            <p className="headline-small-emphasis mb-4">나만의 스킬  •  강점</p>
            <div className="bg-white rounded-[8px] border border-[#CBC4CF] px-16 py-10 w-full">
                <div className="flex flex-col gap-y-10">
                    {/* 업무 스킬들 */}
                    <div className="flex flex-col gap-3">
                        <h5 className="title-medium">나의 업무 스킬</h5>
                        <div className="flex gap-4 flex-wrap">
                            {workSkills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="title-small bg-[#FFD9E1] text-[#512030] p-2 rounded-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    {/* 나의 강점들 */}
                    <div className="flex flex-col gap-3">
                        <h5 className="title-medium">나의 강점</h5>
                        <div className="flex gap-4 flex-wrap">
                            {strengths.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="title-small bg-[#EBDDFF] text-[#3F008D] p-2 rounded-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    );
    
};

export default MemberStrengths;