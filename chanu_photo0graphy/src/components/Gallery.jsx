import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './styles/Gallery.css';
import BookingForm from './BookingForm';

const Gallery = () => {
  const verticalSliderRef = useRef(null);
  const verticalImagesRef = useRef(null);
  const horizontalSliderRef1 = useRef(null);
  const horizontalImagesRef1 = useRef(null);
  const horizontalSliderRef2 = useRef(null);
  const horizontalImagesRef2 = useRef(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Gallery images - Vertical Slider
  const verticalImages = [
    'https://images.pexels.com/photos/1054013/pexels-photo-1054013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1157386/pexels-photo-1157386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2649168/pexels-photo-2649168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/981091/pexels-photo-981091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/15134002/pexels-photo-15134002/free-photo-of-woman-in-black-dress-posing-in-doorway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/981092/pexels-photo-981092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];

  // Gallery images - First Horizontal Slider (Portraits)
  const horizontalImages1 = [
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/884422/pexels-photo-884422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];

  // Gallery images - Second Horizontal Slider (Landscapes)
  const horizontalImages2 = [
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];
  
  const openBookingForm = () => {
    setIsBookingOpen(true);
  };

  const closeBookingForm = () => {
    setIsBookingOpen(false);
  };

  // Set up GSAP animations
  useEffect(() => {
    // Setup for vertical slider
    const setupVerticalSlider = () => {
      if (!verticalImagesRef.current) return;

      const verticalImages = verticalImagesRef.current.children;
      const verticalImagesArray = Array.from(verticalImages);
      
      // Display all images first
      verticalImagesArray.forEach(img => {
        img.style.display = 'block';
      });
      
      // Calculate total height for vertical slider
      const totalHeight = verticalImagesArray.reduce((height, img) => height + img.offsetHeight + 15, 0); // 15px is the margin-bottom

      // Clone first few images for infinite loop effect
      const clonedImages = verticalImagesArray.slice(0, 3).map(img => {
        const clone = img.cloneNode(true);
        verticalImagesRef.current.appendChild(clone);
        return clone;
      });
      
      // Vertical slider animation
      const verticalTl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power1.inOut" }
      });
      
      verticalTl.to(verticalImagesRef.current, {
        y: -totalHeight,
        duration: 40,
        ease: "none"
      });
      
      verticalTl.eventCallback("onRepeat", () => {
        gsap.set(verticalImagesRef.current, { y: 0 });
      });
    };

    // Setup for first horizontal slider
    const setupHorizontalSlider1 = () => {
      if (!horizontalImagesRef1.current) return;

      const horizontalImages = horizontalImagesRef1.current.children;
      const horizontalImagesArray = Array.from(horizontalImages);
      
      // Display all images first
      horizontalImagesArray.forEach(img => {
        img.style.display = 'block';
      });
      
      // Calculate total width for horizontal slider
      const totalWidth = horizontalImagesArray.reduce((width, img) => width + img.offsetWidth + 15, 0); // 15px is the margin-right
      
      // Clone first few images for infinite loop effect
      const clonedImages = horizontalImagesArray.slice(0, 3).map(img => {
        const clone = img.cloneNode(true);
        horizontalImagesRef1.current.appendChild(clone);
        return clone;
      });
      
      // Horizontal slider animation (left to right)
      const horizontalTl1 = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power1.inOut" }
      });
      
      horizontalTl1.to(horizontalImagesRef1.current, {
        x: -totalWidth,
        duration: 30,
        ease: "none"
      });
      
      horizontalTl1.eventCallback("onRepeat", () => {
        gsap.set(horizontalImagesRef1.current, { x: 0 });
      });
    };

    // Setup for second horizontal slider
    const setupHorizontalSlider2 = () => {
      if (!horizontalImagesRef2.current) return;

      const horizontalImages = horizontalImagesRef2.current.children;
      const horizontalImagesArray = Array.from(horizontalImages);
      
      // Display all images first
      horizontalImagesArray.forEach(img => {
        img.style.display = 'block';
      });
      
      // Calculate total width for horizontal slider
      const totalWidth = horizontalImagesArray.reduce((width, img) => width + img.offsetWidth + 15, 0); // 15px is the margin-right
      
      // Clone first few images for infinite loop effect
      const clonedImages = horizontalImagesArray.slice(0, 3).map(img => {
        const clone = img.cloneNode(true);
        horizontalImagesRef2.current.appendChild(clone);
        return clone;
      });
      
      // Horizontal slider animation (right to left - opposite direction)
      const horizontalTl2 = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power1.inOut" }
      });
      
      // Start from right (positive X value)
      gsap.set(horizontalImagesRef2.current, { x: -totalWidth });
      
      horizontalTl2.to(horizontalImagesRef2.current, {
        x: 0,
        duration: 35,
        ease: "none"
      });
      
      horizontalTl2.eventCallback("onRepeat", () => {
        gsap.set(horizontalImagesRef2.current, { x: -totalWidth });
      });
    };

    // Wait for images to load before calculating dimensions
    setTimeout(() => {
      setupVerticalSlider();
      setupHorizontalSlider1();
      setupHorizontalSlider2();
    }, 500);
    
    return () => {
      // Clean up animations when component unmounts
      gsap.killTweensOf(verticalImagesRef.current);
      gsap.killTweensOf(horizontalImagesRef1.current);
      gsap.killTweensOf(horizontalImagesRef2.current);
    };
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h2>PHOTOGRAPHY COLLECTIONS</h2>
        <div className="separator"></div>
        <p className="gallery-intro">Explore a curated selection of my work across various genres and styles.</p>
      </div>

      <div className="gallery-content">
        {/* Vertical Slider */}
        <div className="vertical-slider-container" ref={verticalSliderRef}>
          <h3>Fashion</h3>
          <div className="vertical-images-wrapper" ref={verticalImagesRef}>
            {verticalImages.map((img, index) => (
              <div className="vertical-image-item" key={`v-${index}`}>
                <img src={img} alt={`Fashion ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-right-content">
          {/* First Horizontal Slider */}
          <div className="horizontal-slider-section">
            <h3>Portraits</h3>
            <div className="horizontal-slider-container" ref={horizontalSliderRef1}>
              <div className="horizontal-images-wrapper" ref={horizontalImagesRef1}>
                {horizontalImages1.map((img, index) => (
                  <div className="horizontal-image-item" key={`h1-${index}`}>
                    <img src={img} alt={`Portrait ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Horizontal Slider */}
          <div className="horizontal-slider-section">
            <h3>Landscapes</h3>
            <div className="horizontal-slider-container" ref={horizontalSliderRef2}>
              <div className="horizontal-images-wrapper" ref={horizontalImagesRef2}>
                {horizontalImages2.map((img, index) => (
                  <div className="horizontal-image-item" key={`h2-${index}`}>
                    <img src={img} alt={`Landscape ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="gallery-cta">
            <p>Ready to create your own story?</p>
            <button className="cta-button" onClick={openBookingForm}>BOOK A SESSION</button>
          </div>
        </div>
      </div>
      
      {/* Booking Form */}
      <BookingForm isOpen={isBookingOpen} onClose={closeBookingForm} />
    </div>
  );
};

export default Gallery;