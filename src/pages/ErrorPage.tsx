import { useNavigate } from 'react-router-dom';
import ErrorIcon from '../assets/error/error-icon.svg';
import ErrorImage from '../assets/error/error-image.png';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex items-center space-x-32">
        <div className="flex flex-col">
          <div className="w-[172px] h-[89px] mb-9">
            <img src={ErrorIcon} alt="Error Icon" />
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-5xl font-bold text-[#1C1B21]">
              불편을 드려 죄송해요...
            </h1>
            <p className="text-2xl font-medium text-[#1C1B21]">
              조속히 해결할 수 있도록 할게요
            </p>
          </div>
          <button
            onClick={handleGoBack}
            className="mt-24 w-[280px] h-[56px] bg-[#5A5891] text-white text-base font-semibold rounded-lg cursor-pointer hover:bg-[#545288] transition-colors duration-300 hover:scale-105"
          >
            돌아가기
          </button>
        </div>
        <div className="w-[512px] h-[512px]">
          <img src={ErrorImage} alt="Error" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;