import React, { useState, useRef, useEffect } from "react";
import style from './Slider.module.css';
import "/src/style/scss/cardList.scss"
import cs from "./MainSlider.module.css"
import Button from '../../Button/Widget/Button';
import { useNavigate } from "react-router-dom";
import CenterCard from "../card/Center_card"
import Preloader from "../preloader/Preloader";
const MainSlider = ({ children, isPreloader }) => {
    const [activeTransform, setActiveTransform] = useState(0);
    const [sliderData, setSliderData] = useState([]);
    const sliderRef = useRef({});
    const wrapperRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [currentGap, setCurrentGap] = useState(32);
    const [currentWidth, setCurrentWidth] = useState(0);
    const [showSlide, setShowSlide] = useState(1);
    const [containerWidth, setContainerWidth] = useState((currentWidth * showSlide) + (+currentGap * (showSlide + 1)));
    const [navWidth, setNavWidth] = useState(273);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [slideChangedDuringMove, setSlideChangedDuringMove] = useState(false);
    const [transformDuration, settransformDuration] = useState(0)
    const [deltaX, setDeltaX] = useState(0)
    const [isUpdate, setIsUpdate] = useState(false)
    const navigate = useNavigate()
    const [infiniteSliderData, setInfiniteSliderData] = useState([]);
    useEffect(() => {
        if (!isPreloader) {
            const filteredChildren = React.Children.toArray(children).filter(child => child.props.isSlider);
            setSliderData(filteredChildren)
            const duplicatedData = [[...filteredChildren], [...filteredChildren], [...filteredChildren]]
            setInfiniteSliderData(duplicatedData)
        }
    }, [children]);
    const setSlideRef = (ref, index) => {
        sliderRef.current[index] = ref;
        setIsUpdate(true)
    };
    const calculateContainerWidth = () => {
        setContainerWidth((currentWidth * showSlide) + (+currentGap * (showSlide) - currentGap));
    };
    const handleCurrentValue = () => {
        if (isUpdate) {
            setCurrentWidth(sliderRef.current[0].offsetWidth);

            setCurrentGap(window.getComputedStyle(wrapperRef.current).gap.replace('px', ''));
        }
    }
    const handleMouseDown = (event) => {
        setIsDragging(true);
        setStartX(event.clientX || event.targetTouches[0].clientX);

    };
    const handleMouseMove = (event) => {
        if (!isDragging || slideChangedDuringMove) return;
        const currentX = event.clientX || event.targetTouches[0].clientX;
        setDeltaX(currentX - startX);
    };
    const handleMouseUp = (id) => {
        if (isDragging) {
            if (deltaX > 0 && !minTransformSlide()) {
                setSlideChangedDuringMove(true);
                handlePrevSlide();
                setDeltaX(0);
            }
            else if (deltaX < 0 && !maxTransformSlide()) {
                setSlideChangedDuringMove(true);
                handleNextSlide();
                setDeltaX(0);
            }
            else if (deltaX === 0 && id) {
                navigate(`/film/${id}`);
            }
        }
        setIsDragging(false);
        setStartX(0);
        setSlideChangedDuringMove(false);
    };
    useEffect(() => {
        if (activeTransform > 0) {
            setActiveTransform((currentWidth + +currentGap) * showSlide);
        }
    }, [showSlide])
    useEffect(() => {
        handleCurrentValue()
        if (width <= 1000) {
            setNavWidth(0)
        }
        else {
            setNavWidth(273)
        }
        settransformDuration(0)
    }, [showSlide, width, isUpdate])
    useEffect(() => {
        calculateContainerWidth();
    }, [currentWidth, currentGap, sliderRef, showSlide]);
    const handleNextSlide = () => {
        if (activeTransform === -(currentWidth + +currentGap) * ((sliderData.length * 2 - 1))) {
            settransformDuration(0)
            setActiveTransform(-(currentWidth + +currentGap) * ((sliderData.length - 1)))
        }
        setTimeout(() => {
            settransformDuration(0.3)
            setActiveTransform(((prevTransform) => (prevTransform - (currentWidth + +currentGap) * showSlide)));
            setCurrentWidth(sliderRef.current[0].offsetWidth)
        }, 0)
    };

    const handlePrevSlide = () => {
        if (activeTransform === -(currentWidth + +currentGap)) {
            settransformDuration(0)
            setActiveTransform(-(currentWidth + +currentGap) * ((sliderData.length + 1)))
        }
        setTimeout(() => {
            settransformDuration(0.3)
            setCurrentWidth(sliderRef.current[0].offsetWidth)
            setActiveTransform((prevTransform) => prevTransform + (currentWidth + +currentGap) * showSlide);
        }, 0)
    };
    const sliderStyles = {
        transform: `translateX(${activeTransform}px)`,
        transition: `transform ${transformDuration}s`
    };
    const maxTransformSlide = () => {
        let maxTransform = ((currentWidth + +currentGap) * (sliderData.length * infiniteSliderData.length))
        return Math.abs(activeTransform) >= +maxTransform
    }
    const minTransformSlide = () => {
        let minTransform = 0

        return activeTransform >= minTransform
    }
    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        setActiveTransform(-(currentWidth + +currentGap) * sliderData.length)
    }, [currentWidth, sliderData]);
    return (
        isPreloader ? <div className={[cs.swiperContainer, cs.preloaderContainer].join(' ')}><Preloader /></div> :
            <section className={`section ${cs.centerSlider}`}>
                <div className={[style.sliderWrapper,].join(' ')} style={{ width: `${containerWidth}px`, overflow: 'visible' }}>
                    <Button onClick={handlePrevSlide} bg='../../../assets/img/widget/right-arrow-svgrepo-com.svg' dis={minTransformSlide()} disBtn={style.btn_disabled} css={[style.btn, style.leftBtn].join(' ')}></Button>
                    <div className={cs.swiperContainer} style={sliderStyles} ref={wrapperRef} >
                        {infiniteSliderData.map((slideArr, index) => {
                            return (
                                slideArr.map((slide, index) => {
                                    return (
                                        <div
                                            className={[style.slide].join(' ')}
                                            ref={(ref) => {
                                                setSlideRef(ref, index);
                                            }}
                                            onMouseUp={() => handleMouseUp(slide.props.id)}
                                            onMouseDown={handleMouseDown}
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseUp}
                                            onTouchStart={handleMouseDown} 
                                            onTouchMove={handleMouseMove} 
                                            onTouchEnd={() => handleMouseUp(slide.props.id)}
                                            key={slide.props.id}
                                        >
                                            <CenterCard src={slide.props.src} title={slide.props.title} date={slide.props.date} category={slide.props.category} id={slide.props._id} />
                                        </div>
                                    )
                                }))
                        })}
                    </div>

                    <Button onClick={handleNextSlide} bg='../../../assets/img/widget/right-arrow-svgrepo-com.svg' dis={maxTransformSlide()} disBtn={style.btn_disabled} css={[style.btn, style.rightBtn].join(' ')}></Button>
                </div>
            </section>
    );
};

export default MainSlider;