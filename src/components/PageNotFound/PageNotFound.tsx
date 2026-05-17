import { House, LayoutDashboard, MoveLeft, MoveRight, Settings, UserRoundKey } from 'lucide-react';
import BaatChatLogo from '../BaatChatLogo/BaatChatLogo';
import './PageNotFound.scss';
import { useNavigate } from 'react-router-dom';
import noSignal from '../../assets/others/noSignal.svg';
import Footer from '../Footer/Footer';

const particleColors = ['rgba(124,58,237,.5)', 'rgba(167,139,250,.4)', 'rgba(245,158,11,.3)', 'rgba(74,222,128,.3)'];
const genRandomParticleStyle = () => {
  const size = Math.random() * 4 + 4; // height and width will be [4, 8]

  const pStyle = {
    width: size + 'px',
    height: size + 'px',
    left: Math.random() * 100 + '%',
    background: particleColors[Math.floor(Math.random() * particleColors.length)],
    animationDuration: Math.random() * 10 + 6 + 's',
    animationDelay: Math.random() * 8 + 's',
  };
  return pStyle;
};

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bc-PageNotFound w-full h-full min-h-screen">
      <div className="bc-pnf-grid-bg"></div>
      <div className="bc-pnf-scanline"></div>
      <div className="bc-pnf-orb orb1"></div>
      <div className="bc-pnf-orb orb2"></div>
      <div className="bc-pnf-orb orb3"></div>

      {/* Random Floating particles */}
      <div className="bc-pnf-floating-particles-container">
        {Array.from({ length: 30 }).map((_, ind) => (
          <div className="bc-pnf-floating-particle" key={ind} style={genRandomParticleStyle()}></div>
        ))}
      </div>

      {/* Navbar */}
      <div className="bc-pnf-navbar">
        <div className="max-w-max-content w-full flex flex-row justify-between items-center">
          <BaatChatLogo />

          <div className="bc-pnf-cta">
            {window.history.length > 2 && (
              <button className="bc-btn bc-btn-secondary bc-pnf-nav-btn" onClick={() => navigate(-1)}>
                <MoveLeft size={16} color="var(--violet-text-color)" /> Go Back
              </button>
            )}

            <button className="bc-btn bc-btn-primary bc-pnf-nav-btn" onClick={() => navigate('/')}>
              <House size={16} color="var(--violet-text-color)" /> Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bc-pnf-content">
        <div className="bc-pnf-404-container bc-glitch-404">
          <div className="floater-chat">Yeh page toh mila hi nahi! 😅</div>
          <div className="floater-wifi-signal">
            <img src={noSignal} alt="not found" />
          </div>
          <div className="four04-txt">404</div>
          <div className="four04-txt-outline">404</div>
        </div>

        <div className="bc-pnf-error-chip">Page not found</div>
        <div className="bc-pnf-title">
          <span className="grad">Lost in the chat?</span>
          <br />
          This page doesn't exist
        </div>
        <div className="bc-pnf-sub">Looks like you wandered off to a page that never existed, was deleted, or moved to a new address. Happens to the best of us! 🙈</div>

        {/* URL Box */}
        <div className="bc-pnf-url-box">
          <div className="bc-pnf-url-method">Get</div>
          <div className="bc-pnf-url-link">{window.location.href}</div>
          <div className="bc-pnf-url-status">404</div>
        </div>

        {/* Suggestions  */}
        <div className="bc-pnf-suggestions">
          <div className="bc-pnf-sug-label">Maybe your were looking for</div>

          <div className="bc-pnf-sug-item">
            <div className="bc-pnf-sug-icon vlt">
              <House size={16} />
            </div>
            <div className="bc-pnf-sug-details">
              <div className="bc-pnf-sug-name">Home</div>
              <div className="bc-pnf-sug-path">{import.meta.env.VITE_FED_URL}</div>
            </div>
            <div className="bc-pnf-sug-arrow">
              <MoveRight size={16} />
            </div>
          </div>

          <div className="bc-pnf-sug-item">
            <div className="bc-pnf-sug-icon gld">
              <UserRoundKey size={16} />
            </div>
            <div className="bc-pnf-sug-details">
              <div className="bc-pnf-sug-name">Home</div>
              <div className="bc-pnf-sug-path">{import.meta.env.VITE_FED_URL}/auth</div>
            </div>
            <div className="bc-pnf-sug-arrow">
              <MoveRight size={16} />
            </div>
          </div>

          <div className="bc-pnf-sug-item">
            <div className="bc-pnf-sug-icon grn">
              <LayoutDashboard size={16} />
            </div>
            <div className="bc-pnf-sug-details">
              <div className="bc-pnf-sug-name">Home</div>
              <div className="bc-pnf-sug-path">{import.meta.env.VITE_FED_URL}</div>
            </div>
            <div className="bc-pnf-sug-arrow">
              <MoveRight size={16} />
            </div>
          </div>

          <div className="bc-pnf-sug-item">
            <div className="bc-pnf-sug-icon vlt">
              <Settings size={16} />
            </div>
            <div className="bc-pnf-sug-details">
              <div className="bc-pnf-sug-name">Home</div>
              <div className="bc-pnf-sug-path">{import.meta.env.VITE_FED_URL}</div>
            </div>
            <div className="bc-pnf-sug-arrow">
              <MoveRight size={16} />
            </div>
          </div>
        </div>

        <div className="bc-pnf-cta">
          {window.history.length > 2 && (
            <button className="bc-btn bc-btn-secondary bc-pnf-nav-btn" onClick={() => navigate(-1)}>
              <MoveLeft size={16} color="var(--violet-text-color)" /> Go Back
            </button>
          )}

          <button className="bc-btn bc-btn-primary bc-pnf-nav-btn" onClick={() => navigate('/')}>
            <House size={16} color="var(--violet-text-color)" /> Home
          </button>
        </div>

        <div className='bc-pnf-footer'>
          <Footer small={true} />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
