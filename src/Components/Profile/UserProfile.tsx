import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"
import s from "./Profile.module.scss";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import { useUserStore } from "../../store/userStore";
import {SelectionHeader} from "./SelectionHeader"

interface UserData {
    id: number;
    email: string;
    username: string;
    balance: number;
    photo: string;
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
            if (!profileUser.favorite_game_id) {
                setFavGame("-");
                return;
            }

            try {
                const response = await axios.get(`/games/get_game/${profileUser.favorite_game_id}`, {
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
            <SelectionHeader selected={"Profile"}/>
            <hr/>

            <div className = {s.allInfo} >
                <div className={s.userInfo}>
                    <img className={s.userAvatar} src={"/imgs"+avatarPreview} onClick={hadndleAvatarClick}/>
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
                    <p style={{paddingTop: "10px"}}>{"Favorute game: "+ favGame}</p>
                </div>
            </div>
            
            <div className = {s.userHistory}>
                <div className={s.gameHistoryRow}>
                    <p style={{marginBottom: "10px"}}>History</p>
                    <div className = {s.gameHistoryInfo}>
                        <div style={{width: "110px", height: "70px", backgroundColor: "yellow", marginRight: "15px"}}></div>
                        <p style={{marginRight: "5px", color: "yellow"}}>Sweety Banana</p>
                        <p style={{color: "grey", marginLeft: "50px"}}>100$</p>
                    </div>
                </div>

                <div className={s.gameIncomeRow}>
                    <p style={{marginBottom: "10px"}}>Income</p>
                    <div className = {s.incomeInfo}>
                        <p style={{color: "lightgreen"}}>+10</p>
                    </div>
                </div>
            </div>
        </div>
    )
};