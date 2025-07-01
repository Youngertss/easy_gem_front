import s from "./Profile.module.scss";
import {SelectionHeader} from "./SelectionHeader"

export const Settings = () =>{
    return(
        <div className={s.profileBlock}>
            <SelectionHeader selected={"Settings"}/>
            <hr/>

            <div className = {s.infoBody} >
                NICKNAME AND SO ON
            </div>
        </div>
    )
};