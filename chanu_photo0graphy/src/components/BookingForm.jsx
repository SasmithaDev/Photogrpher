import React, { useState, useEffect } from 'react';
import './styles/BookingForm.css';

const BookingForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    sessionType: 'portrait',
    message: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Web3Forms integration
    const formDataToSend = new FormData();
    
    // Add the access key
    formDataToSend.append('access_key', '11aa8e4a-0e92-4ea6-93d2-2a6a6f7a1b6a');
    
    // Add form fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    
    // Add recipient email
    formDataToSend.append('to_email', 'sasmitha@sasmitha.dev');
    
    // Add form name for Web3Forms
    formDataToSend.append('from_name', 'Sasmitha Photography Booking');
    formDataToSend.append('subject', 'New Photography Session Booking Request');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          sessionType: 'portrait',
          message: ''
        });
        
        // Close the modal after 3 seconds on success
        setTimeout(() => {
          onClose();
          setStatus('');
        }, 3000);
      } else {
        setStatus('error');
        console.error('Form submission error:', data);
      }
    } catch (error) {
      setStatus('error');
      console.error('Form submission error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="booking-overlay">
      <div className="booking-modal">
        <button className="close-button" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h2>Book a Session</h2>
        <div className="form-separator"></div>
        
        {status === 'success' ? (
          <div className="success-message">
            <p>Thank you for your booking request. We'll be in touch shortly to confirm your session.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="sessionType">Session Type</label>
              <select
                id="sessionType"
                name="sessionType"
                value={formData.sessionType}
                onChange={handleChange}
                required
              >
                <option value="portrait">Portrait</option>
                <option value="family">Family</option>
                <option value="wedding">Wedding</option>
                <option value="event">Event</option>
                <option value="commercial">Commercial</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Submitting...' : 'Book Now'}
            </button>
            
            {status === 'error' && (
              <div className="error-message">
                <p>There was an error submitting your request. Please try again or contact us directly.</p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;