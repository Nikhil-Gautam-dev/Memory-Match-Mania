import React from "react";
import style from './startScreen.module.css' 

function StartScreen(){
    return (
        <>
            <div className={style.info}>
                <div className={style.title}>WELCOME</div>
                <p className={style["description-para"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, corporis. Hic quasi tenetur velit natus at quisquam dicta laboriosam ratione possimus qui consectetur fugit, maxime magnam nesciunt? Tempore, ducimus laborum.</p>
            </div>
        </>
    )
} 


export default StartScreen; 