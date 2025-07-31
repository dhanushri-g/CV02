import React from 'react';
import { Recycle, Heart, Github, Mail, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section">
            <div className="footer-logo">
              <Recycle className="footer-logo-icon" />
              <span className="footer-logo-text">Greenify</span>
            </div>
            <p className="footer-description">
              Making waste sorting simple and accessible for everyone.
              Together, we can create a more sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/scan">Scan Item</a></li>
              <li><a href="/info">Infographics</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li><a href="#recycling-guide">Recycling Guide</a></li>
              <li><a href="#waste-tips">Waste Tips</a></li>
              <li><a href="#environmental-impact">Environmental Impact</a></li>
            </ul>
          </div>

          {/* Connect With Us - New Modern Design */}
          <div className="footer-section">
            <h3 className="footer-title">Connect With Us</h3>
            <div className="social-media-grid">
              <a href="https://twitter.com/greenify" className="social-media-card twitter">
                <div className="social-icon-wrapper">
                  <Twitter size={20} />
                </div>
                <div className="social-content">
                  <div className="social-platform">Twitter</div>
                  <div className="social-handle">@greenify</div>
                  <div className="social-description">Follow for eco tips</div>
                </div>
              </a>
              
              <a href="https://linkedin.com/company/greenify" className="social-media-card linkedin">
                <div className="social-icon-wrapper">
                  <Linkedin size={20} />
                </div>
                <div className="social-content">
                  <div className="social-platform">LinkedIn</div>
                  <div className="social-handle">Greenify</div>
                  <div className="social-description">Professional network</div>
                </div>
              </a>
              
              <a href="https://instagram.com/greenify" className="social-media-card instagram">
                <div className="social-icon-wrapper">
                  <Instagram size={20} />
                </div>
                <div className="social-content">
                  <div className="social-platform">Instagram</div>
                  <div className="social-handle">@greenify</div>
                  <div className="social-description">Visual inspiration</div>
                </div>
              </a>
              
              <a href="https://github.com/greenify" className="social-media-card github">
                <div className="social-icon-wrapper">
                  <Github size={20} />
                </div>
                <div className="social-content">
                  <div className="social-platform">GitHub</div>
                  <div className="social-handle">greenify</div>
                  <div className="social-description">Open source code</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 Greenify. Made with <Heart size={16} className="heart-icon" /> for the environment.
          </p>
          <p className="footer-note">
            This is a prototype app for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
