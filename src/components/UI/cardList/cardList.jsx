import React from "react";
import "/src/style/scss/main.scss"
import "/src/style/scss/cardList.scss"
import Slider from "../Slider/Slider";
import Preloader from "../preloader/Preloader";
const TrendingList = ({ children, title, css, name, isPreloader, preloaderText }) => {
    return (
        <section className={["section cardList__section", css].join(" ")}>
            <h2 className="page-title cardList-title">{title}</h2>
            {isPreloader ?
                preloaderText ? 
                <p className="cardList_card-wrapper">{preloaderText}</p> : <Preloader />
                :
                <div className="cardList_card-wrapper">
                    <Slider>
                        {children}
                    </Slider>
                </div>}
        </section>
    )
}
export default TrendingList