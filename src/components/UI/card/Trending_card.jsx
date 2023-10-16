import React from "react";
import '/src/style/scss/cardList.scss'
const Trending = ({ src, title, description, date, id }) => {
    return (
        <>
            <div className="trending_card-container card-container">
                <img
                    className="trending_card-img"
                    src={src}
                />
                <div className="trending_card_text-wrapper card-text">
                    <h3 className="card_text-title">{title}</h3>
                    <div className="card_text-bottomContainer">
                        <span className="card_text-description">
                            {description.join(", ")}
                        </span>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Trending