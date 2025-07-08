import Header from '../components/mypage/edit/Header';
import Desired from '../components/mypage/edit/Desired';
import ModifyingMenu from '../components/mypage/edit/ModifyingMenu';
import Strength from '../components/mypage/edit/Strength';
import Portfolio from '../components/mypage/edit/Portfolio';
import Reception from '../components/mypage/edit/Reception';
import History from '../components/mypage/edit/History';
import Save from '../components/mypage/edit/Save';

export const FormEdit = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex w-full max-w-[1024px] px-6 py-8">
        <div className="flex-1 space-y-20">
          <Header />
          <Desired />
          <Strength />
          <Portfolio />
          <History />
          <Reception />
          <Save />
        </div>
        <div className="w-[200px] flex-shrink-0 ml-8">
          <ModifyingMenu />
        </div>
      </div>
    </div>
  );
};
