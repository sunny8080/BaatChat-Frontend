import './Footer.scss';
import { getRandomMorse } from '../../utils/utils';
import bcLogo from '../../assets/logo/bc-logo.svg';

const randMorse = getRandomMorse();

const Footer = () => {
  return (
    <footer className="bc-Footer">
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
            <a href="">Features</a>
            <a href="">How it works</a>
            <a href="">Changelog</a>
            <a href="">Roadmap</a>
          </div>
          <div className="footer-col">
            <h5>Tech</h5>
            <a href="">GitHub</a>
            <a href="">Architecture</a>
            <a href="">API docs</a>
            <a href="">Self-host</a>
          </div>
          <div className="footer-col">
            <h5>Connect</h5>
            <a href="">Twitter / X</a>
            <a href="">LinkedIn</a>
            <a href="">Email</a>
            <a href="">GitHub</a>
          </div>
        </div>
      </div>

      <div className="bc-footer-bottom">
        <p className="bc-copyright-txt">© 2025 BaatChat · baatchat.online · Made with ❤️ in India</p>
        <p className="bc-footer-morse" title={`Decode this - ${randMorse.hint}`}>
          {randMorse.morse}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
