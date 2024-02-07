import { Outlet } from 'react-router-dom';
import { Main } from '../components/Main';
import { Header } from '../components/Header';

export const RootLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};
