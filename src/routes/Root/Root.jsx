import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';

export default function Root() {
  return (
    <>
      <Navigation loggedIn={false} />
      <Outlet />
      <Footer />
    </>
  );
}
