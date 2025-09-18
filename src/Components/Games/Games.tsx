import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import s from "./GamesMenu.module.scss"
import axios from "axios";

import { useUserStore } from "../../store/userStore";

interface Props{
    openLoggining: () => void;
}

type Game = {
    game_name: string;
    game_photo: string;
}

type TagGames = {
    [tag: string]: Game[];
}

export const Games: React.FC<Props> = ({ openLoggining}) => {
    const userData = useUserStore((set) => set.user);
    const [tagsGames, setTagGames] = useState<TagGames>({})

    const navigate = useNavigate();

    const handleGameClick = (path: string) => {
        if (!userData){
            openLoggining();
        }
        else{
            navigate(path);
        }
    };

    useEffect (() => {
        const fetchGames = async () =>{
            try{
                const response = await axios.get("/games/get_all_games/", {
                    withCredentials: true
                });
                setTagGames(response.data.tag_games);
            } catch(e){
                console.log(e)
            }
        };

        fetchGames();
    }, [])

    return (
        <div className={s.layout}>
            {Object.entries(tagsGames).map(([tag, games], idx) => (
                <div key={idx} className={s.categoryBlock}>
                    <p className={s.categoryHeader}>{tag}</p>
                    <div className={s.categoryGames}>
                    {games.map((game, gameIdx) => (
                        <img
                        key={gameIdx}
                        src={"/imgs/games" + game.game_photo}
                        className={s.gamePicture}
                        onClick={() => handleGameClick(`/${game.game_name}`)}
                        />
                    ))}
                    </div>
                </div>
                ))}


            {/* There is no such games, just filling site with a dummy */}
            <div className={s.categoryBlock}>
                <p className={s.categoryHeader}>Fruits</p>
                <div className={s.categoryGames}>
                    <img src={"/imgs/games/SweetBananas.png"} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                    <img src={"/imgs/games/CherryBoom.png"} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                </div>
            </div>
        </div>
    );
};
