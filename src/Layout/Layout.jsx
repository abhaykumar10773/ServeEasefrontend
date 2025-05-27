
import Heade from "../Components/Heade";
import Footers from "../Components/footers";
import {Outlet} from 'react-router-dom';

 function Layout() {
  return (
  <>

    <Heade/>
      <Outlet/>
    <Footers/>
    </>
  );
}
export default Layout;
