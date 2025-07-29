import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/apiHooks';

const PrivateRoute = () => {
  // useUser 훅으로 현재 사용자 정보를 가져옵니다.
  const { data, isLoading, isError } = useUser();

  // 사용자 정보를 확인하는 중이라면 로딩 화면을 보여줍니다.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // isError가 true라는 것은 사용자 정보 로드에 실패했다는 의미 (로그인 안 됨)
  // 이 경우 로그인 페이지로 리다이렉트합니다.
  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  // 로딩이 끝났고 에러도 없으면 (로그인 됨) 자식 라우트들을 보여줍니다.
  return <Outlet />;
};

export default PrivateRoute;