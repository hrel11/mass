import { Outlet } from 'react-router';

export const Main = ({ navigation }) => {
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  return (
    <main
      id="main"
      className={`w-full flex-1 px-[4rem] py-[2rem] ${
        navigation.state === 'loading' && !searching
          ? 'opacity-25 transition-opacity duration-200 [transition-delay:200ms]'
          : ''
      }`}
    >
      <Outlet />
    </main>
  );
};
