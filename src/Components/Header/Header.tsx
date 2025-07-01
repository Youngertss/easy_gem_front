// import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo"
import { Account } from "./Account"
// import s from "./Header.module.scss";

interface UserData {
    id: number;
    email: string;
    username: string;
    balance: string;
    photo: string;
}

interface HeaderProps {
    openLoggining: () => void;
    openRegistration: () => void;
    onLogout: () => void;
    userData: UserData | null;
}

export const Header: React.FC<HeaderProps> = ({ openLoggining, openRegistration, onLogout, userData }) => {
    // const navigate = useNavigate();

    return (
        <header>
            <Logo/>
            <Account userData={userData} openLoggining={openLoggining} openRegistration={openRegistration} onLogout={onLogout}/>
        </header>
    );
};
