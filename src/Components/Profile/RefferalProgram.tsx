import s from "./Profile.module.scss";
import {SelectionHeader} from "./SelectionHeader"

export const RefferalProgram = () =>{
    return(
        <div className={s.profileBlock}>
            <SelectionHeader selected={"Refferal program"}/>
            <hr/>

            <div className = {s.infoBody} >
                NICKNAME AND SO ON
            </div>
        </div>
    )
};