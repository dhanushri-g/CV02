import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Lightbulb,
  HelpCircle,
  CheckCircle,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Github
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className="contact-icon" />,
      title: '📬 Email',
      details: 'contact@greenifyapp.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <Globe className="contact-icon" />,
      title: '🌐 Website',
      details: 'www.greenifyapp.com',
      description: 'Visit our official website'
    },
    {
      icon: <Phone className="contact-icon" />,
      title: '📱 Phone / WhatsApp',
      details: '+91-98765-43210',
      description: 'Call or message us'
    },
    {
      icon: <MapPin className="contact-icon" />,
      title: '📍 Location',
      details: 'Greenify Team, XYZ College/Startup Incubator',
      description: '[City, State, Country]'
    }
  ];

  const socialLinks = [
    {
      icon: <Twitter className="social-icon" />,
      platform: '🐦 Twitter',
      handle: 'Follow us on Twitter',
      description: '@greenify',
      url: 'https://twitter.com/greenify',
      color: '#1DA1F2'
    },
    {
      icon: <Linkedin className="social-icon" />,
      platform: '💼 LinkedIn',
      handle: 'Connect on LinkedIn',
      description: 'Greenify – Waste Segregation',
      url: 'https://linkedin.com/company/greenify',
      color: '#0077B5'
    },
    {
      icon: <Instagram className="social-icon" />,
      platform: '📸 Instagram',
      handle: 'Follow on Instagram',
      description: '@greenifyapp',
      url: 'https://instagram.com/greenifyapp',
      color: '#E4405F'
    },
    {
      icon: <Github className="social-icon" />,
      platform: '💻 GitHub',
      handle: 'View on GitHub',
      description: 'Open Source Project',
      url: 'https://github.com/greenify',
      color: '#333333'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'support', label: 'Technical Support', icon: '🔧' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' },
    { value: 'feedback', label: 'Feedback', icon: '💡' },
    { value: 'press', label: 'Press & Media', icon: '📰' }
  ];

  const faqs = [
    {
      question: 'How accurate is the AI waste classification?',
      answer: 'Our AI model currently achieves 95% accuracy and continues to improve with more data and user feedback.'
    },
    {
      question: 'Is the app free to use?',
      answer: 'Yes! The basic features of Greenify are completely free. We also offer premium features for advanced users.'
    },
    {
      question: 'Can I use the app offline?',
      answer: 'The camera and basic classification work offline, but some features require an internet connection for the latest updates.'
    },
    {
      question: 'How do you protect my privacy?',
      answer: 'We take privacy seriously. Images are processed locally when possible, and we never share personal data without consent.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="contact-page">
        <div className="container">
          <div className="success-message">
            <CheckCircle className="success-icon" />
            <h2>Message Sent Successfully!</h2>
            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setIsSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">
            <MessageCircle className="title-icon" />
            📞 Contact Us
          </h1>
          <p className="contact-description">
            We'd love to hear from you — whether you have a question, suggestion, partnership idea, or just want to say hi!
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <h2>Contact Information</h2>
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-card">
                  <div className="info-icon-wrapper">
                    {info.icon}
                  </div>
                  <div className="info-content">
                    <h3 className="info-title">{info.title}</h3>
                    <p className="info-details">{info.details}</p>
                    <span className="info-description">{info.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="social-media-section">
              <h3>Connect With Us</h3>
              <p className="section-subtitle">Follow us on social media for updates, tips, and eco-friendly content!</p>
              <div className="social-links-grid">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-link-card"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--social-color': social.color }}
                  >
                    <div className="social-icon-wrapper">
                      {social.icon}
                    </div>
                    <div className="social-content">
                      <h4 className="social-platform">{social.platform}</h4>
                      <p className="social-handle">{social.handle}</p>
                      <span className="social-description">{social.description}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <a href="/scanner" className="action-btn">
                  <Users size={20} />
                  Try the Scanner
                </a>
                <a href="/diy" className="action-btn">
                  <Lightbulb size={20} />
                  Browse DIY Projects
                </a>
                <a href="/about" className="action-btn">
                  <HelpCircle size={20} />
                  Learn About Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2 className="map-title">Find Us</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <MapPin className="map-icon" />
              <p>Interactive map would be embedded here</p>
              <p className="map-address">123 Green Street, Eco City, EC 12345</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-section">
          <h2>Connect With Us</h2>
          <div className="social-links">
            <a href="#" className="social-link twitter">
              <div className="social-icon">🐦</div>
              <span>Follow us on Twitter</span>
            </a>
            <a href="#" className="social-link linkedin">
              <div className="social-icon">💼</div>
              <span>Connect on LinkedIn</span>
            </a>
            <a href="#" className="social-link instagram">
              <div className="social-icon">📸</div>
              <span>Follow on Instagram</span>
            </a>
            <a href="#" className="social-link github">
              <div className="social-icon">💻</div>
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
