import './Footer.scss';
import { getRandomMorse } from '../../utils/utils';
import bcLogo from '../../assets/logo/bc-logo.svg';

const randMorse = getRandomMorse();

const Footer = ({ small = false }: { small?: boolean }) => {
  return (
    <footer className={`bc-Footer ${small ? 'small' : 'main'}`}>
      {small && (
        <div className="bc-footer-bottom">
          <p className="bc-footer-morse" title={`Decode this - ${randMorse.hint}`}>
            {randMorse.morse}
          </p>
          <p className="bc-copyright-txt">© 2026 BaatChat ·&nbsp;{import.meta.env.VITE_FED_URL}&nbsp;· Made with ❤️ in India</p>
        </div>
      )}
      {!small && (
        <div className="max-w-max-content mx-auto!">
          <div className="bc-footer-top">
            <div className="bc-footer-brand">
              <a className="bc-nav-logo" href="/">
                <div className="logo-icon">
                  <img src={bcLogo} alt="BaatChat" />
                </div>
                <span className="logo-txt">
                  Baat<span>Chat</span>
                </span>
              </a>
              <p>Real-time messaging & video calling. MERN stack. Made in India 🇮🇳</p>
            </div>

            <div className="bc-footer-links">
              <div className="footer-col">
                <h5>Product</h5>
                <a href="/#features">Features</a>
                <a href="/#howItWorks">How it works</a>
                <a href="#">Changelog</a>
                <a href="#">Roadmap</a>
              </div>
              <div className="footer-col">
                <h5>Tech</h5>
                <a href="https://github.com/sunny8080/BaatChat">GitHub</a>
                <a href="">Architecture</a>
                <a href="">API docs</a>
                <a href="">Self-host</a>
              </div>
              <div className="footer-col">
                <h5>Connect</h5>
                <a href="https://x.com/sunny8080_">Twitter / X</a>
                <a href="https://www.linkedin.com/in/sunny8080">LinkedIn</a>
                <a href="mailto:sk7522422@gmail.com">Email</a>
                <a href="https://github.com/sunny8080/BaatChat">GitHub</a>
              </div>
            </div>
          </div>

          <div className="bc-footer-bottom">
            <p className="bc-copyright-txt">© 2026 BaatChat ·&nbsp;{import.meta.env.VITE_FED_URL}&nbsp;· Made with ❤️ in India</p>
            <p className="bc-footer-morse" title={`Decode this - ${randMorse.hint}`}>
              {randMorse.morse}
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
