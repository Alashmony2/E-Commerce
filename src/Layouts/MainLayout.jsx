
import Navbar from './../components/Navbar/Navbar';
import Footer from './../components/Footer/Footer';
import { Outlet } from 'react-router-dom';


export default function MainLayout() {
  return (
    <div>
      <Navbar/>
      <div className="container py-10 ">
      <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
