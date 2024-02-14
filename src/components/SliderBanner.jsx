// SliderBanner.js
import React, { useState, useEffect } from 'react';
import './SliderBanner.css';

const SliderBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images =
        [
            'https://dlcdnwebimgs.asus.com/files/media/32AC71C1-A967-4B4A-A81C-23AB82184698/v3/images/large/1x/01__kv_rog_flow_x16.jpg',
            'https://dlcdnwebimgs.asus.com/gain/6BF10A73-F52C-4DF1-9286-E723C3480086/fwebp',
            'https://dlcdnwebimgs.asus.com/gain/8556058B-6621-40FA-8FA9-E0A31F6A66BB/fwebp',
            'https://dlcdnwebimgs.asus.com/gain/3B9AA0D9-07EF-4606-92C0-2C541CABB54A'
        ]; // Add your image URLs

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
          nextSlide();
        }, 3000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, [currentIndex]);

    return (
        <div className="slider-container">
            {/* <button onClick={prevSlide} className="slider-button">
                &lt;
            </button> */}
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slider-item" />
            {/* <button onClick={nextSlide} className="slider-button">
                &gt;
            </button> */}
        </div>
    );
};

export default SliderBanner;
