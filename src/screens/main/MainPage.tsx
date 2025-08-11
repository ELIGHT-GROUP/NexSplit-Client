import { useNavigate } from 'react-router';

export const MainPage = () => {
  const nav = useNavigate();

  return (
    <view>
      <text>MainPage</text>
      <text bindtap={() => nav('/signin')}>Navigate to SignIn</text>
      <text bindtap={() => nav('/signup')}>Navigate to SignUp</text>
    </view>
  );
};
