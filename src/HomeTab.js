import React from 'react';
import { useState, useEffect } from "react";
import './HomeTab.css';

function HomeTab() {
    const images = [
        'https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://img.etimg.com/thumb/width-1200,height-900,imgsize-101793,resizemode-75,msid-35020363/news/international/world-news/cambridge-trumps-oxford-to-be-named-best-uk-varsity.jpg',
        'https://www.shutterstock.com/image-photo/oxford-university_the-queens-college-260nw-299633474.jpg',
        // Add more image URLs as needed
      ];
        const [currentIndex, setCurrentIndex] = useState(0);
      
        const goToPrevSlide = () => {
          const newIndex = (currentIndex - 1 + images.length) % images.length;
          setCurrentIndex(newIndex);
        };
      
        const goToNextSlide = () => {
          const newIndex = (currentIndex + 1) % images.length;
          setCurrentIndex(newIndex);
        };
      
    return(
        <>
            <div className="grid-container">
                <div className="grid-item1">

                </div>
                <div className="grid-item2">
                    <div className="welcomeMessage">Welcome To Global University</div>
                    <div className="welcomeMessage2">New Beginnings,Endless Possibilities.Innovation Is Our Tradition !</div>

                    <div className="image-slider">
                        <button onClick={goToPrevSlide} className="arrow prev-arrow">&#8249;</button>
                        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                        <button onClick={goToNextSlide} className="arrow next-arrow">&#8250;</button>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <span className="dot"></span> 
                        <span className="dot"></span> 
                        <span className="dot"></span> 
                    </div> 
                </div>
                <div className="grid-item3">

                </div>
            </div>
        </>
    );
}

export default HomeTab;