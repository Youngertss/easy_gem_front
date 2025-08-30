import s from "./Profile.module.scss";
import {NavLink } from 'react-router-dom';

import { useUserStore } from "../../store/userStore";

interface Props {
    selected: string;
}


export const SelectionHeader: React.FC<Props> = ({ selected }) => {
    const buttons = ["Profile", "Deposite", "Settings"];
    const user = useUserStore((set) => (set.user))

    return (
        <div className={s.selectHeader}>
            {buttons.map((btn) => (
                <NavLink
                    to = { btn === "Profile" ? "/"+btn.toLowerCase()+"/"+user?.username : "/"+btn.toLowerCase()}
                    key={btn.toLowerCase()}
                    className={selected.toLowerCase() === btn.toLowerCase() ? s.selectedInfoPage : ""}
                >
                    {btn}
                </NavLink>
            ))}
            <NavLink
                to = "/refferalProgram"
                className={selected.toLowerCase() === "refferal program" ? s.selectedInfoPage : ""}
            >
                Refferal program
            </NavLink>
        </div> 
        
    );
};
{/* <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/deposit">Deposit</NavLink>
            <NavLink to="/settings">Settings</NavLink> */}