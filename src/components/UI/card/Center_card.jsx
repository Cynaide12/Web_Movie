import React from "react";
import cs from './Center_card.module.css'
const CenterCard = ({ src, title, date, category, id }) => {
    const correctedSrc = src.replace(/\\/g, '/');
    return (
        <>

            <div className={cs.swiperSlide} style={{ backgroundImage: `url(${encodeURI(correctedSrc)})` }}>
                <div className={cs.description}>
                    <h2 className={cs.title}>
                        {title}
                    </h2>
                    <div className={cs.dateAndCategory}>
                        <span>{date}</span>
                        <span>{category}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CenterCard