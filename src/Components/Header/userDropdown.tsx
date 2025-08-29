import s from "./Header.module.scss";
import { NavLink } from 'react-router-dom';

import { useUserStore } from "../../store/userStore";
interface Props {
    onLogout: () => void;
};

export const UserDropdown: React.FC<Props> = ({ onLogout }) => {
    const user = useUserStore((set) => set.user)
    return(
        <div className={s.userDropdown}>
            <NavLink to={`/profile/${user?.username}`}>Profile</NavLink>
            <NavLink to="/deposite">Deposite</NavLink>
            <NavLink to="/settings">Settings</NavLink>
            <button onClick={onLogout}>Logout</button>
            {/* <button>Profile</button> */}
        </div>
    );
};