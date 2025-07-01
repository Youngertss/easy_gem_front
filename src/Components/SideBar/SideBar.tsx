import s from "./SideBar.module.scss";
import { NavLink, useLocation  } from 'react-router-dom';
import { useEffect, useState } from 'react'

export const SideBar = () => {
    const location = useLocation();
    const [current_page, setCurrentPage] = useState("MainPage");
    const pages = ["MainPage", "Games", "Bonuses", "Chat", "FAQ"];

    useEffect (() =>{
        setCurrentPage(window.location.pathname.split("/").filter(Boolean).slice(-1)[0]);
    }, [location.pathname]);
    
    return (
        <div className={s.sidebar}>
            <ul className={s.pages}>
                {pages.map((e) => {
                    return (
                        <li
                            key={e}
                            className={`${s.page} ${
                                e === current_page ? s.activePage : ""
                            }`}
                        >
                            <NavLink to={`/${e}`}>{e}</NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
