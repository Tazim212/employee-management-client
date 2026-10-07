import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Footer></Footer>
        </div>
    )
}
export default Home;