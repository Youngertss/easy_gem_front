import s from "./Header.module.scss";
import { UserDropdown } from "./userDropdown"

import {useState} from "react";

interface UserData {
    id: number;
    email: string;
    username: string;
    balance: string;
    photo: string;
}

interface AccountProps {
    openLoggining: () => void;
    openRegistration: () => void;
    onLogout: () => void;
    userData: UserData | null;
}

export const Account: React.FC<AccountProps> = ({openLoggining, openRegistration, onLogout, userData}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    if (userData){
        return (
            <div className={s.userIn}>
                <img className={s.userAvatar} src={"/imgs"+userData.photo}/>
                <div className={s.dropdownBlock}
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                    onClick={() => setShowDropdown(false)}
                >   
                    
                    <div className={s.userName}>{userData.username}</div>
                    {showDropdown && <UserDropdown onLogout={onLogout} />}
                </div>
                {userData.balance}$
            </div>
        )
    } else{
        return(
            <div className={s.entrance}>
                <button onClick={openLoggining}>Войти</button>
                <button onClick={openRegistration}>Регестрация</button>
            </div>
        )
    }
};
