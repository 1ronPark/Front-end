import ic_portfoliopage from '../../../assets/icons/ic_portfoliopage.svg';
import ic_github from '../../../assets/icons/ic_github.svg';

const MemberPortfolio = () => (
    <section>
        <p className="headline-medium-emphasis mb-3">자기소개서&nbsp;&nbsp;•&nbsp;&nbsp;포트폴리오</p>
            <div className="bg-white rounded-[12px] border border-[#79747E]/[0.16] p-6 w-full">
                <p className="p-6 border border-[rgba(121,116,126,0.16)] rounded-[8px] mb-12">
                    창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.
                </p>
                <img src={ic_portfoliopage} alt="portfolio link img" className="w-full" />

                <div className="flex items-center flex-wrap gap-4 mt-12">
                    <img src={ic_github} alt="깃허브" />
                    <img src={ic_github} alt="깃허브" />
                </div>
            </div>
    </section>
);

export default MemberPortfolio;