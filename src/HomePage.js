import React from 'react';
import { useState, useEffect } from "react";
import './HomePage.css';
import axios from 'axios';
import { FadeLoader  } from 'react-spinners';
// import HomeTab from './HomeTab';
import ApplicationTab from './ApplicationTab';
import ServiceRequestTab from './ServiceRequestTab';

//  ------------------------------------------------ JS  ------------------------------------------------
function HomePage() {
    // ------------------------------------------------Variable Declaration Starts here---------------------------------------------------
    const [activeTab, setActiveTab] = useState('Home');
    const [onApplicationTab, setApplicationTab] = useState(false);
    const [cmpLogo, setcmpLogo] = useState('');
    const [loading, setLoading] = useState(true);

    const pythonDomain = 'http://localhost:5000/';

    useEffect(() => {
        setActiveTab('Home');
        axios.post(`${pythonDomain}sliderImages`)
            .then(response => {
               console.log('=====Imagess',response.data)
               setcmpLogo(response.data)
               if(response.data !== undefined){
                    setLoading(false);
               }
            }) 
            .catch(error => { 
                console.error(' Error fetching data:', error); 
            });
    }, []);

    function onNavigationClick(event, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabContent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tabbutton");

        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block"; 
        event.currentTarget.className += " active";
        if(tabName === 'Application'){
            setApplicationTab(true);
        }
    }
    const images = [
        'https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://img.etimg.com/thumb/width-1200,height-900,imgsize-101793,resizemode-75,msid-35020363/news/international/world-news/cambridge-trumps-oxford-to-be-named-best-uk-varsity.jpg',
        'https://www.shutterstock.com/image-photo/oxford-university_the-queens-college-260nw-299633474.jpg',
      ];
        const [currentIndex, setCurrentIndex] = useState(0);
      
        const goToPrevSlide = () => {
          const newIndex = (currentIndex - 1 + cmpLogo.length) % cmpLogo.length;
          setCurrentIndex(newIndex);
        };
      
        const goToNextSlide = () => {
          const newIndex = (currentIndex + 1) % cmpLogo.length;
          setCurrentIndex(newIndex);
        };

    //  ------------------------------------------------ HTML  ------------------------------------------------
    return(
        <>
            <div className="PageHeader">
                <div className='HeaderMain'>
                    SIVIO Community
                </div>
                <div className="GlobalNavigation">
                    <div className="tab">
                        <button className="tabbutton" onClick={(event) => onNavigationClick(event, "Home")}>Home</button>
                        <button className="tabbutton" onClick={(event) => onNavigationClick(event, "Application")}>Application</button>
                        <button className="tabbutton" onClick={(event) => onNavigationClick(event, "ServiceRequest")}>Service Request</button>
                    </div>
                </div>
            </div>
            <div className="PageBody">
                <div id="Home" className={`tabContent ${activeTab === 'Home' ? 'active' : ''}`}>
                    <div className="grid-container">
                        <div className="grid-item1">

                        </div>
                        <div className="grid-item2">
                            <div className="welcomeMessage">Welcome To Global University</div>
                            <div className="welcomeMessage2">New Beginnings,Endless Possibilities.Innovation Is Our Tradition !</div>

                            <div className="image-slider">
                                {loading && (
                                    <div className="spinner-container">
                                        <FadeLoader  color={'#000000'} loading={loading} size={100} />
                                    </div>
                                )}
                                <button onClick={goToPrevSlide} className="arrow prev-arrow">&#8249;</button>
                                    <img className='imgSlider'  src={`data:image/gif;base64,${cmpLogo}`} alt={`Slide ${currentIndex + 1}`} />
                                <button onClick={goToNextSlide} className="arrow next-arrow">&#8250;</button>
                            </div>
                            {/* <div style={{textAlign:'center'}}>
                                <span className="dot"></span> 
                                <span className="dot"></span> 
                                <span className="dot"></span> 
                            </div>  */}
                        </div>
                        <div className="grid-item3">

                        </div>
                    </div>
                </div>
                <div id="Application" className={`tabContent ${activeTab === 'Application' ? 'active' : ''}`}>
                    {onApplicationTab && (
                        <ApplicationTab/>
                    )}
                </div>
                <div id="ServiceRequest" className={`tabContent ${activeTab === 'ServiceRequest' ? 'active' : ''}`}>
                     <ServiceRequestTab/> 
                </div>
            </div>
        </>
    );
}

export default HomePage;