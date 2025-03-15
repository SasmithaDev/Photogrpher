import React from 'react';
import './styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content-wrapper">
        <div className="about-image-container">
          <img 
            src="https://images.pexels.com/photos/19481476/pexels-photo-19481476.jpeg?cs=srgb&dl=pexels-amar-19481476.jpg&fm=jpg&w=3651&h=5477" 
            alt="Photographer at work" 
            className="about-image"
          />
        </div>
        
        <div className="about-text-container">
          <h2>ABOUT ME</h2>
          <div className="separator"></div>
          
          <div className="about-text">
            <p className="intro">
              Hello, I'm Sasmitha — a classically trained photographer with a passion for capturing 
              beauty in its most authentic form.
            </p>
            
            <p>
              My journey in photography began over a decade ago, after studying Fine Arts and Photography 
              at the Royal Academy of Arts. I've spent years refining my craft, developing a distinctive style 
              that combines timeless elegance with modern sensibilities.
            </p>
            
            <p>
              What drives my work is the belief that photographs should not simply document moments, but 
              evoke emotions and tell stories that transcend time. My approach is intentional and patient — 
              waiting for the perfect light, the honest expression, the unguarded instant that reveals something true.
            </p>
            
            <p>
              When I'm not behind the camera, you'll find me traveling in search of new perspectives, 
              exploring art exhibitions, or experimenting with film photography techniques in my home studio.
            </p>
            
            <div className="about-quote">
              "Photography is the story I fail to put into words."
            </div>
            
            <p>
              I believe that every client brings a unique story worth telling. Whether it's a wedding, portrait 
              session, or commercial project, my goal remains the same: to create images that you'll treasure 
              for generations to come.
            </p>
            
            <p>
              I would be honored to collaborate with you on your next photography project. Let's create something beautiful together.
            </p>
          </div>
          
          <div className="about-signature">
            Sasmitha
          </div>
        </div>
      </div>
      <div className="collaborations-section">
        <h2>PAST COLLABORATIONS</h2>
        <div className="separator"></div>
        <div className="collaborations-grid">
          <div className="collaboration-item">Henegama C. C</div>
          <div className="collaboration-item">My Photography</div>
          <div className="collaboration-item">Shrangila</div>
          <div className="collaboration-item">Add</div>
          <div className="collaboration-item">Add</div>
          <div className="collaboration-item">Add</div>
        </div>
      </div>
    </div>
  );
};

export default About;