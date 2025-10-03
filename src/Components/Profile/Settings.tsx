import s from "./Profile.module.scss";
import {SelectionHeader} from "./SelectionHeader"

export const Settings = () =>{
    return(
        <div className={s.profileBlock}>
            <SelectionHeader selected={"Settings"}/>
            <hr/>

            <div className = {s.infoBody} >
                No info yet.
            </div>
        </div>
    )
};