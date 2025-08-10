import LoadingAnimation from '../components/common/LoadingAnimation';
import './LoadingPage.css';

const LoadingPage = () => {
  // Create an array of star positions for decoration
  const starPositions = [
    { top: '10%', left: '10%', animationDelay: '0s' },
    { top: '20%', left: '80%', animationDelay: '0.2s' },
    { top: '30%', left: '30%', animationDelay: '0.4s' },
    { top: '40%', left: '70%', animationDelay: '0.6s' },
    { top: '50%', left: '20%', animationDelay: '0.8s' },
    { top: '60%', left: '90%', animationDelay: '1s' },
    { top: '70%', left: '40%', animationDelay: '1.2s' },
    { top: '80%', left: '60%', animationDelay: '1.4s' },
    { top: '90%', left: '10%', animationDelay: '1.6s' },
    { top: '15%', left: '95%', animationDelay: '1.8s' },
    { top: '5%', left: '45%', animationDelay: '2s' },
    { top: '25%', left: '55%', animationDelay: '2.2s' },
    { top: '85%', left: '25%', animationDelay: '2.4s' },
    { top: '75%', left: '75%', animationDelay: '2.6s' },
    { top: '55%', left: '5%', animationDelay: '2.8s' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-b from-[#0A0A19] to-[#9A938A]">
      {starPositions.map((pos, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: pos.top,
            left: pos.left,
            animationDelay: pos.animationDelay,
            width: '50px',
            height: '50px',
          }}
        />
      ))}
      <div className = "w-95 h-95 absolute transform bottom-[60%] left-[55%] ">
        <LoadingAnimation/>
      </div>
      <div className="absolute bottom-[28%] left-[40%]">
        <div className="bg-[#47464F] rounded-tl-[28px] rounded-tr-[28px] rounded-br-[28px] px-8 py-2">
          <p className="text-white text-base font-semibold">
            잠시만 기다려주세요...
          </p>
        </div>
      </div>
      <div
        className="w-[200px] h-[200px] bg-no-repeat bg-cover mt-150 mr-90 scale-x-[-1]"
        style={{ backgroundImage: "url('/src/assets/loading/loading-bg.png')" }}
      ></div>
    </div>
  );
};

export default LoadingPage;