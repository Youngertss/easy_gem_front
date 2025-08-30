import s from "./Header.module.scss";
import { UserDropdown } from "./userDropdown"
import { useUserStore } from "../../store/userStore";

import {useState} from "react";


interface AccountProps {
    openLoggining: () => void;
    openRegistration: () => void;
    onLogout: () => void;
}

export const Account: React.FC<AccountProps> = ({openLoggining, openRegistration, onLogout}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const userData = useUserStore((state) => state.user)

    if (userData){
        return (
            <div className={s.userIn}>
                <img className={s.userAvatar} src={"/imgs/users_avatars/"+userData.photo}/>
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
                <button onClick={openRegistration}>Регистрация</button>
            </div>
        )
    }
};
