import AuthLeftContent from '../components/AuthLeftContent/AuthLeftContent';
import './Auth.scss';
import bcLogo from '../assets/logo/bc-logo.svg';
import { useState } from 'react';
import BaatChatLogo from '../components/BaatChatLogo/BaatChatLogo';
import SignInForm from '../components/SignInForm/SignInForm';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import { useSearchParams } from 'react-router-dom';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [curAuthTab, setCurAuthTab] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'signin');

  return (
    <div className="bc-Auth w-full h-full flex flex-col justify-between">
      <div className="bc-auth-wrapper">
        <div className="bc-auth-left-panel">
          <AuthLeftContent />
        </div>

        <div className="bc-auth-right-panel">
          <div className="bc-auth-right-panel-content">
            <div className="bc-auth-mobile-orb"></div>
            <div className="bc-auth-mobile-logo">
              <BaatChatLogo />
            </div>

            <div className="bc-auth-header">
              <div className="bc-auth-logo">
                <img src={bcLogo} alt="BaatChat" />
              </div>

              <div className="bc-auth-title">{curAuthTab === 'signin' ? 'Welcome back' : 'Join BaatChat'}</div>
              <div className="bc-auth-sub">{curAuthTab === 'signin' ? 'Sign in to continue to BaatChat' : 'Create your account in seconds'}</div>
            </div>

            <div className="bc-auth-modes">
              <div className="bc-auth-tabs">
                <button className={`bc-auth-tab signin ${curAuthTab == 'signin' ? 'active' : ''}`} onClick={() => setCurAuthTab('signin')}>
                  Sign in
                </button>
                <button className={`bc-auth-tab signup ${curAuthTab == 'signup' ? 'active' : ''}`} onClick={() => setCurAuthTab('signup')}>
                  Create Account
                </button>
              </div>

              <div className="bc-auth-tab-content">{curAuthTab === 'signin' ? <SignInForm setCurAuthTab={setCurAuthTab} /> : <SignUpForm setCurAuthTab={setCurAuthTab} />}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
