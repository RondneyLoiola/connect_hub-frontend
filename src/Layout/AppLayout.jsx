import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
