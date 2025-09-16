import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"
import s from "./Profile.module.scss";
import axios from "axios";
import {useNavigate, NavLink} from "react-router-dom";

import { useUserStore } from "../../store/userStore";
import { SelectionHeader } from "./SelectionHeader";
import { UserHistory } from "./UserHistory";

interface UserData {
    id: number;
    email: string;
    username: string;
    balance: number;
    photo: string;
    total_earned: number;
    total_played: number;
    favorite_game_id: number;
    total_withdrawn: number;
    total_withdrawals: number;
    created_at: string;
}

export const UserProfile = () =>{
    const userData = useUserStore((set) => set.user)
    const fetchUser = useUserStore((state) => state.fetchUser)

    const [favGame, setFavGame] = useState<string>("-");
    const navigate = useNavigate();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState("");

    const { profileUsername } = useParams();
    const [ profileUser, setProfileUser] = useState<UserData | null>();

    //here we install whose profile we are going to render
    useEffect(() => {
        if (!profileUsername) return;

        if (profileUsername === userData?.username && userData) {
            setProfileUser(userData);
        } else {
            const fetchProfile = async () => {
                try {
                    const response = await axios.get<UserData>(
                        "/users/get_user_by_name/" + profileUsername,
                        { withCredentials: true }
                    );
                    if (!response.data) {
                        navigate("/"); 
                        return;
                    }
                    setProfileUser(response.data);
                } catch (e) {
                    console.log("Error while getting " + profileUsername + " profile:", e);
                    navigate("/");
                }
            };
            fetchProfile();
        }
    }, [profileUsername, userData, navigate]);

    //additional info about already known user to render
    useEffect(() => {
        if (!profileUser) return;

        setAvatarPreview(profileUser.photo);

        const fetchFavGame = async () => {
            if (!profileUser.favorite_game_id || profileUser.favorite_game_id == -1) {
                setFavGame("-");
                return;
            }

            try {
                const response = await axios.get(`/games/get_game?id=${profileUser.favorite_game_id}`, {
                    withCredentials: true,
                });
                setFavGame(response.data.name);
            } catch (err: any) {
                setFavGame("---");
            }
        };

        fetchFavGame();
    }, [profileUser]); 


    const hadndleAvatarClick = () => {
        if (!userData || userData.username !== profileUsername) return;
        fileInputRef.current?.click();
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!userData || userData.username !== profileUsername) return;

        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", userData.id.toString());
        console.log(formData)

        try {
            const response = await axios.post("/users/upload_photo", formData, {
                headers: { "Content-Type": "multipart/form-data"},
                withCredentials: true,
            });
            const avatarPath = response.data.avatar_url; // path to picture
            setAvatarPreview(avatarPath);
            fetchUser();
    
        } catch (error) {
            console.error("Ошибка при загрузке аватара:", error);
        }

    }

    return(
        <div className={s.profileBlock}>
            
            {userData?.username === profileUsername ? <SelectionHeader selected={"Profile"}  /> : null}
            {userData?.username === profileUsername ? <hr /> : null}

            <div className = {s.allInfo} >
                <div className={s.userInfo}>
                    <img className={s.userAvatar} src={"/imgs/users_avatars/"+avatarPreview} onClick={hadndleAvatarClick}/>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        accept="image/*"
                    />
                    <div style={{display: "flexbox", flexDirection: "column"}}>
                        <div className={s.personalInfo}>
                            <span style={{fontSize: "22px"}}>
                                <span style={{marginRight: "10px"}}>{profileUser?.username}</span>
                                <span style={{fontSize: "18px"}}>{profileUser?.balance}$</span>
                            </span>
                        </div>
                        <div className={s.registerDate}> <span>{"registered since: "+ profileUser?.created_at.slice(0,10)}</span></div>
                    </div>
                </div>
                <div className = {s.userStats}>
                    <p>Withdrawals sum: {profileUser?.total_withdrawn}</p>
                    <p>Count of withdrawals: {profileUser?.total_withdrawals}</p>
                    <div className={s.favGameStats}>
                        <p>Favorite game:</p>
                        {favGame !== "-" ?
                        <NavLink className={s.favGame} to={"/" + favGame}>{favGame}</NavLink>
                        : "-"
                        }
                    </div>
                </div>
            </div>
            
            {profileUser ? <UserHistory profileUser={profileUser}/> : null}
        </div>
    )
};