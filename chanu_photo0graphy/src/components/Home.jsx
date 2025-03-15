import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './styles/Home.css';
import BookingForm from './BookingForm';

const Home = () => {
  const sliderRef = useRef(null);
  const imagesRef = useRef(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Photography portfolio images
  const portfolioImages = [
    'https://images.pexels.com/photos/1715189/pexels-photo-1715189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/21827093/pexels-photo-21827093/free-photo-of-un-segundo-de-pensamiento.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/9727862/pexels-photo-9727862.jpeg?cs=srgb&dl=pexels-chehomova-ph-9727862.jpg&fm=jpg&w=5568&h=3712',
    'https://images.pexels.com/photos/14084904/pexels-photo-14084904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/29031305/pexels-photo-29031305.jpeg?cs=srgb&dl=pexels-wolfgang-weiser-467045605-29031305.jpg&fm=jpg&w=7911&h=5274',
    'https://images.pexels.com/photos/5078360/pexels-photo-5078360.jpeg?cs=srgb&dl=pexels-daniel-rodriguez-3394955-5078360.jpg&fm=jpg&w=6000&h=4000',
    'https://images.pexels.com/photos/20480143/pexels-photo-20480143.jpeg?cs=srgb&dl=pexels-michaela-st-3448542-20480143.jpg&fm=jpg&w=5472&h=3648',
    ];

  const openBookingForm = () => {
    setIsBookingOpen(true);
  };

  const closeBookingForm = () => {
    setIsBookingOpen(false);
  };

  useEffect(() => {
    // Wait for images to load before calculating heights
    setTimeout(() => {
      const slider = sliderRef.current;
      const images = imagesRef.current.children;
      const imagesArray = Array.from(images);
      
      // Get all images to display correctly first
      imagesArray.forEach(img => {
        img.style.display = 'block';
      });
      
      // Calculate the total height after images are properly displayed
      const totalHeight = imagesArray.reduce((height, img) => height + img.offsetHeight, 0);
      
      // Clone the first few images and append them to create the infinite loop effect
      const clonedImages = imagesArray.slice(0, 5).map(img => {
        const clone = img.cloneNode(true);
        imagesRef.current.appendChild(clone);
        return clone;
      });
      
      // Set up GSAP animation
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power1.inOut" }
      });
      
      // Animate the slider to move upward continuously
      tl.to(imagesRef.current, {
        y: -totalHeight,
        duration: 70, // Slow, elegant scrolling
        ease: "none"
      });
      
      // Reset position when animation completes one cycle
      tl.eventCallback("onRepeat", () => {
        gsap.set(imagesRef.current, { y: 0 });
      });
    }, 500); // Short delay to ensure images have loaded
    
    return () => {
      // Clean up animation when component unmounts
      gsap.killTweensOf(imagesRef.current);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="logo">
        <div className="logo-line"></div>
        <h1>Sasmitha</h1>
        <div className="logo-line"></div>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li><a href="#" className="active">Portfolio</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="content-wrapper">
        <div className="slider-container" ref={sliderRef}>
          <div className="images-wrapper" ref={imagesRef}>
            {portfolioImages.map((img, index) => (
              <div className="image-item" key={index}>
                <img src={img} alt={`Portfolio ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="content">
          <h2>SASMITHA PHOTOGRAPHY</h2>
          <div className="separator"></div>
          <p>Capturing timeless moments with a classic aesthetic. Each photograph tells a story of elegance and nostalgia.</p>
          <p className="tagline">Est. 2020</p>
          <button className="cta-button" onClick={openBookingForm}>BOOK A SESSION</button>
          
          <div className="social-links">
            <a href="#" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      

      {/* Booking Form */}
      <BookingForm isOpen={isBookingOpen} onClose={closeBookingForm} />
    </div>
  );
};

export default Home;