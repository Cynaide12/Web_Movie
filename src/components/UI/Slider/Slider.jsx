
import React, { useState, useRef, useEffect } from "react";
import style from './Slider.module.css';
import "/src/style/scss/cardList.scss"
import Button from '../../Button/Widget/Button';
import { useNavigate } from "react-router-dom";
const Slider = ({ type, children }) => {
    const [activeTransform, setActiveTransform] = useState(type == 'center' ? -(currentWidth + +currentGap) : 0);
    const sliderRef = useRef(null);
    const wrapperRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [currentGap, setCurrentGap] = useState(32);
    const [currentWidth, setCurrentWidth] = useState(0);
    const [showSlide, setShowSlide] = useState(0);
    const [containerWidth, setContainerWidth] = useState((currentWidth * showSlide) + (+currentGap * (showSlide + 1)));
    const [navWidth, setNavWidth] = useState(273);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [slideChangedDuringMove, setSlideChangedDuringMove] = useState(false);
    const [transformDuration, setTransofrmDuration] = useState(0)
    const [deltaX, setDeltaX] = useState(0)
    const navigate = useNavigate()
    const calculateContainerWidth = () => {
        setContainerWidth((currentWidth * showSlide) + (+currentGap * (showSlide) - currentGap));
    };
    const handleCurrentValue = () => {
        setCurrentWidth(sliderRef.current.offsetWidth);
        setCurrentGap(window.getComputedStyle(wrapperRef.current).gap.replace('px', ''));
    }
    const handleMouseDown = (event) => {
        setIsDragging(true);
        setStartX(event.clientX);

    };
    const handleMouseMove = (event) => {
        if (!isDragging || slideChangedDuringMove) return;
        const currentX = event.clientX;
        setDeltaX(currentX - startX);
    };
    const handleMouseUp = (id) => {
        if (isDragging) {
            if (deltaX > 0 && !minTransformSlide()) {
                setSlideChangedDuringMove(true);
                handlePrevSlide();
                setDeltaX(0);
            }
            else if (deltaX < 0 && !maxTransformSlide() && ((activeTransform - (currentWidth + +currentGap) * (showSlide)) < 0)) {
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
        setTransofrmDuration(0)
    }, [showSlide, width])
    useEffect(() => {
        calculateContainerWidth();
    }, [currentWidth, currentGap, sliderRef, showSlide]);
    useEffect(() => {
        if (type !== 'center') {
            setShowSlide(() => {
                const slide = Math.floor((width - navWidth) / (currentWidth + +currentGap))
                return slide === 0 ? 1 : slide
            });
        } else {
            setShowSlide(1)
        }
    }, [width, currentWidth])
    const handleNextSlide = () => {
        setTransofrmDuration(0.5)
        setCurrentWidth(sliderRef.current.offsetWidth)
        setActiveTransform(((prevTransform) => (prevTransform - (currentWidth + +currentGap) * showSlide)));
    };

    const handlePrevSlide = () => {
        if (!((activeTransform + (currentWidth + +currentGap) * (showSlide)) > 0)) {
            setTransofrmDuration(0.5)
            setCurrentWidth(sliderRef.current.offsetWidth)
            setActiveTransform((prevTransform) => prevTransform + (currentWidth + +currentGap) * showSlide);
        }
        else if ((activeTransform + (currentWidth + +currentGap) * (showSlide * 2)) > 0) {
            setActiveTransform(0)
            setTransofrmDuration(0.5)
            setCurrentWidth(sliderRef.current.offsetWidth)
        }
    };
    const handleLinkClick = (id) => {
        navigate(`/film/${id}`);
    };
    const sliderStyles = {
        transform: `translateX(${activeTransform}px)`,
        transition: `transform ${transformDuration}s`
    };
    const maxTransformSlide = () => {
        let maxTransform = ((currentWidth + +currentGap) * (React.Children.count(children) - showSlide))
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
        if (type === 'center' && React.Children.count(children) > 2) {
            setActiveTransform(-(currentWidth + +currentGap));
        } else {
            setActiveTransform(0);
        }
    }, [type, currentWidth]);
    useEffect(() => {
        if(React.Children.count(children) <= showSlide){
            setActiveTransform(0)
        }
    }, [showSlide])
    return (
        <>
            {React.Children.count(children) > showSlide ? (
                <div className={[style.sliderWrapper, type == 'center' && style.visible].join(' ')} style={{ width: `${containerWidth}px` }}>
                    <Button onClick={handlePrevSlide} bg='../../../assets/img/widget/right-arrow-svgrepo-com.svg' dis={minTransformSlide()} disBtn={style.btn_disabled} css={[style.btn, style.leftBtn].join(' ')}></Button>
                    <div className={style.sliderContainer} style={sliderStyles} ref={wrapperRef} >
                        {React.Children.map(children, (child, index) => (
                            
                            <>
                                <div
                                    className={[style.slide].join(' ')}
                                    ref={sliderRef}
                                    onMouseUp={() => handleMouseUp(child.props.id)}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseUp}
                                >
                                    {child}
                                </div>

                            </>
                        ))}
                    </div>

                    <Button onClick={handleNextSlide} bg='../../../assets/img/widget/right-arrow-svgrepo-com.svg' dis={maxTransformSlide()} disBtn={style.btn_disabled} css={[style.btn, style.rightBtn].join(' ')}></Button>
                </div>
            ) : (
                <>
                    {/* {console.log(showSlide)} */}
                    <div className={style.sliderContainer} style={sliderStyles} ref={wrapperRef}>
                        {React.Children.map(children, (child, index) => (
                            <div className={style.slide} ref={sliderRef} onClick={() => handleLinkClick(child.props.id)}>
                                {child}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default Slider;