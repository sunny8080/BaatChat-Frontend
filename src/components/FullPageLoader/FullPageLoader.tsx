import './FullPageLoader.scss';
import BaatChatLogo from '../BaatChatLogo/BaatChatLogo';
import bcLogo from '../../assets/logo/bc-logo.svg';
import { useEffect, useState } from 'react';

const loadingMsgs = ['Fetching your chats', 'Loading messages', 'Syncing contacts', 'Setting up calls', 'Almost ready'];

const FullPageLoader = () => {
  const [msgInd, setMsgInd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgInd((prev) => (prev + 1) % loadingMsgs.length);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [msgInd]);

  return (
    <div className="bc-FullPageLoader">
      <div className="bc-fpl-content">
        <div className="bc-fpl-spinner">
          <div className="bc-fpl-logo-ring"></div>
          <div className="bc-fpl-logo-ring"></div>
          <div className="bc-fpl-logo-ring"></div>
          <div className="bc-fpl-inner-logo">
            <img src={bcLogo} alt="BaatChat" />
          </div>
        </div>

        <BaatChatLogo iconReq={false} />

        <div className="bc-fpl-status">
          {loadingMsgs[msgInd]}
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="bc-page-progress"></div>
      </div>
    </div>
  );
};

export default FullPageLoader;
