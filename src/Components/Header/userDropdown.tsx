import s from "./Header.module.scss";
import { NavLink } from 'react-router-dom';

interface Props {
    onLogout: () => void;
};

export const UserDropdown: React.FC<Props> = ({onLogout}) => {
    return(
        <div className={s.userDropdown}>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/deposite">Deposite</NavLink>
            <NavLink to="/settings">Settings</NavLink>
            <button onClick={onLogout}>Logout</button>
            {/* <button>Profile</button> */}
        </div>
    );
};