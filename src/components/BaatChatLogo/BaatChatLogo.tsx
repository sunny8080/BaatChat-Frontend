import bcLogo from '../../assets/logo/bc-logo.svg';
import './BaatChatLogo.scss';

const BaatChatLogo = () => {
  return (
    <a className="bc-BaatChatLogo bc-nav-logo" href="/">
      <div className="logo-icon">
        <img src={bcLogo} alt="BaatChat" />
      </div>
      <span className="logo-txt">
        Baat<span>Chat</span>
      </span>
    </a>
  );
};

export default BaatChatLogo;
