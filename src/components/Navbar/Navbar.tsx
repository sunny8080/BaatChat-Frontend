import './Navbar.scss';
import bcLogo from '../../assets/logo/bc-logo.svg';
import { useState } from 'react';
import { createPortal } from 'react-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bc-Navbar flex justify-center">
      <div className="max-w-max-content w-full flex flex-row justify-between items-center">
        <div className="bc-nav-logo-container">
          <a className="bc-nav-logo" href="/">
            <div className="logo-icon">
              <img src={bcLogo} alt="BaatChat" />
            </div>
            <span className="logo-txt">
              Baat<span>Chat</span>
            </span>
          </a>
        </div>

        <ul className="bc-nav-links">
          <li>
            <a href="#">Features</a>
          </li>
          <li>
            <a href="#">How it works</a>
          </li>
          <li>
            <a href="#">Tech stack</a>
          </li>
          <li>
            <a href="#">Open source</a>
          </li>
        </ul>

        <div className="bc-nav-cta">
          <button className="bc-btn bc-btn-secondary">Sign in</button>
          <button className="bc-btn bc-btn-primary">Get Started</button>
        </div>

        {/* Hamburger Btn */}
        <div className="bc-hamburger" id="hamburgerBtn" onClick={() => setIsMobileMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Render Mobile Menu in body, so it can be in full screen  */}
      {createPortal(
        <div className={`bc-mobile-menu ${isMobileMenuOpen ? 'open' : 'close'}`}>
          <div className="bc-mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            ✕
          </div>

          <div className="bc-nav-logo-container">
            <a className="bc-nav-logo" href="/">
              <span className="logo-txt">
                Baat<span>Chat</span>
              </span>
            </a>
          </div>

          {/* TODO - check menu closes or not after clicking on menu */}
          <ul className="bc-mobile-nav-links">
            <li onClick={() => setIsMobileMenuOpen(false)}>
              <a href="/">Home</a>
            </li>
            <li onClick={() => setIsMobileMenuOpen(false)}>
              <a href="/features">Features</a>
            </li>
            <li onClick={() => setIsMobileMenuOpen(false)}>
              <a href="/how">How it works</a>
            </li>
            <li onClick={() => setIsMobileMenuOpen(false)}>
              <a href="/tech">Tech stack</a>
            </li>
            <li onClick={() => setIsMobileMenuOpen(false)}>
              <a href="/open-source">Open source</a>
            </li>
          </ul>

          <div className="bc-mobile-nav-cta">
            <button className="bc-btn bc-btn-secondary">Sign in</button>
            <button className="bc-btn bc-btn-primary">Get Started</button>
          </div>
        </div>,
        document.getElementById('root')!,
        'bc-mobile-menu',
      )}
    </div>
  );
}

export default Navbar;
