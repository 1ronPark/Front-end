type MemberStrengthsProps = {
    skills: string[];
    strengths: string[];
}

const MemberStrengths = ({ skills, strengths }:MemberStrengthsProps) => {

    return (
        <section>
            <p className="headline-small-emphasis mb-3">나의 스킬&nbsp;&nbsp;•&nbsp;&nbsp;강점</p>
            <div className="bg-white rounded-[12px] border border-[#79747E]/[0.16] px-[50px] py-6 w-full">
                <div className="flex flex-col gap-y-12">
                    {/* 업무 스킬들 */}
                    <div className="flex flex-col gap-3">
                        <h5 className="title-medium">스킬</h5>
                        <div className="flex gap-4 flex-wrap">
                            {skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="label-large bg-[#F2EFFF] text-[#434078] px-4 py-2 rounded-xl"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    {/* 나의 강점들 */}
                    <div className="flex flex-col gap-3">
                        <h5 className="title-medium">강점</h5>
                        <div className="flex gap-4 flex-wrap">
                            {strengths.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="label-large bg-[#FFEEE1] text-[#693C00] px-4 py-2 rounded-xl"
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