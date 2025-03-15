import React, { useState } from 'react';
import './styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [status, setStatus] = useState('');

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
    formDataToSend.append('from_name', 'Sasmitha Photography Contact');
    formDataToSend.append('subject', `Contact Form: ${formData.subject}`);

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
          subject: 'General Inquiry',
          message: ''
        });
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setStatus('');
        }, 5000);
      } else {
        setStatus('error');
        console.error('Form submission error:', data);
      }
    } catch (error) {
      setStatus('error');
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>GET IN TOUCH</h2>
        <div className="separator"></div>
        <p className="contact-intro">I would love to hear from you. Please fill out the form below and I will get back to you as soon as possible.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <h3>Studio Address</h3>
            <p>123 Gampaha</p>
            <p>Gampaha, Sri Lanka.</p>
          </div>
          
          <div className="info-item">
            <h3>Contact Details</h3>
            <p>Email: sasmitha@sasmitha.dev</p>
            <p>Phone: +94 712 345 6789</p>
          </div>
          
          <div className="info-item">
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9am - 6pm</p>
            <p>Saturday: 10am - 4pm</p>
            <p>Sunday: Closed</p>
          </div>
          
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
        
        <div className="contact-form-container">
          {status === 'success' ? (
            <div className="success-message">
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. I'll be in touch with you shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
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
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Booking Request">Booking Request</option>
                  <option value="Pricing Information">Pricing Information</option>
                  <option value="Portfolio Review">Portfolio Review</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              
              {status === 'error' && (
                <div className="error-message">
                  <p>There was an error sending your message. Please try again or contact us directly via email.</p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;