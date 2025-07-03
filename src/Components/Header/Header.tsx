// import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo"
import { Account } from "./Account"
// import s from "./Header.module.scss";


interface HeaderProps {
    openLoggining: () => void;
    openRegistration: () => void;
    onLogout: () => void;
}


export const Header: React.FC<HeaderProps> = ({ openLoggining, openRegistration, onLogout }) => {
    // const navigate = useNavigate();

    return (
        <header>
            <Logo/>
            <Account openLoggining={openLoggining} openRegistration={openRegistration} onLogout={onLogout}/>
        </header>
    );
};
