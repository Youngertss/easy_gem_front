import casinoLogo from "../../imgs/headerImg/easyGemLogo.svg";
import s from "./Header.module.scss";
import { useLocation, useNavigate } from "react-router-dom";


export const Logo = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogoClick = () => {
        if (location.pathname === "/") {
            window.location.reload(); //reload if user is already in there
        } else {
            navigate("/"); 
        }
    };

    return (
        <img src={casinoLogo} alt="logo" className={s.headerLogo} onClick={handleLogoClick}/>
    )
}; 