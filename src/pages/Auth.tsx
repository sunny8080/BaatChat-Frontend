import AuthLeftContent from '../components/AuthLeftContent/AuthLeftContent';
import './Auth.scss';
import bcLogo from '../assets/logo/bc-logo.svg';
import { useState } from 'react';
import BaatChatLogo from '../components/BaatChatLogo/BaatChatLogo';
import SignInForm from '../components/SignInForm/SignInForm';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import { useSearchParams } from 'react-router-dom';
import {
  useGoogleLogin,
  useGoogleOneTapLogin,
  type CodeResponse,
  type CredentialResponse,
} from '@react-oauth/google';
import toast from 'react-hot-toast';
import { connectSocket } from '../socket/socket';
import { useAuth } from '../context/AuthContext';
import { googleCallback } from '../services/authService';
import SocialSignupModal from '../components/SocialSignupModal/SocialSignupModal';
import Modal from '../components/Modal/Modal';
import { triggerAnalyticsEvent } from '../utils/utils';
import { AnalyticsEvents, UserLoginTypes } from '../utils/constant';

/**
 * NOTE :-
 * Goggle sign in -
 * implicit flow provide accessToken, so in backend we have to call google api to get user details
 * and auth-code flow and one tap feature provides code and credential respectively which can be used by backend to get user details
 * and i want our custom violet button + one tap feature, so we can't use button provided by google
 * so will be using google auth-code flow with google one tap feature to keep only one logic in backend to get user details
 *
 * for signup we will be authenticate user using google, generate temp token from backend, then ask BaatChat username and phone, then send these details to again backend with temp token, then signup will be completed.
 *
 * for signin it's simple, just authenticate with google, and then send code to backend and then login will be completed
 */

type googleSuccessResponseType =
  | Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>
  | CredentialResponse;
type googleErrorResponseType = Pick<
  CodeResponse,
  'error' | 'error_description' | 'error_uri'
> | void;

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [curAuthTab, setCurAuthTab] = useState(
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin',
  );
  const { setAccessToken, setUser } = useAuth();
  const [showSocialSignupModal, setShowSocialSignupModal] = useState(false);
  const [socialLoginUserData, setSocialLoginUserData] = useState(null);

  // callback function in case of success response from google
  const onSuccessGoogleLogin = async (credentialResponse: googleSuccessResponseType) => {
    let code = '';
    let credential = '';
    triggerAnalyticsEvent(AnalyticsEvents.google_login_triggered);

    if ('code' in credentialResponse) {
      // auth-code flow
      code = credentialResponse.code;
    } else if ('credential' in credentialResponse) {
      // one tap flow
      if (credentialResponse.credential) {
        credential = credentialResponse.credential;
      }
    }

    if (code || credential) {
      const res = await googleCallback(code ? { code } : { credential });
      if (res && res.success) {
        if (res.data?.isNewUser) {
          // signup
          sessionStorage.setItem('signUpGoogleToken', res.data.signUpGoogleToken);
          // setUserName(res.data?.user?.username?.split('_')[0]);
          setShowSocialSignupModal(true);
          setSocialLoginUserData(res.data.user);
          triggerAnalyticsEvent(AnalyticsEvents.sign_up, {
            method: UserLoginTypes.GOOGLE,
          });
        } else {
          // signin
          setUser(res.data.user);
          setAccessToken(res.data.accessToken);
          connectSocket(res.data.user);
          triggerAnalyticsEvent(AnalyticsEvents.sign_in, {
            method: UserLoginTypes.GOOGLE,
          });
        }
      }
    } else {
      toast.error('Unable to login');
    }
  };

  // callback function in case of error response from google
  const onErrorGoogleLogin = (_: googleErrorResponseType) => {
    console.error('Login Failed');
    toast.error('Google authorization failed');
  };

  // open google login popup when sign up with google is clicked
  const openGoogleLoginPopup = useGoogleLogin({
    onSuccess: onSuccessGoogleLogin,
    onError: onErrorGoogleLogin,
    flow: 'auth-code',
  });

  // this will open google login options popup in right top corner when page loads
  useGoogleOneTapLogin({
    onSuccess: onSuccessGoogleLogin,
    onError: onErrorGoogleLogin,
    auto_select: true,
  });

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

              <div className="bc-auth-title">
                {curAuthTab === 'signin' ? 'Welcome back' : 'Join BaatChat'}
              </div>
              <div className="bc-auth-sub">
                {curAuthTab === 'signin'
                  ? 'Sign in to continue to BaatChat'
                  : 'Create your account in seconds'}
              </div>
            </div>

            <div className="bc-auth-modes">
              <div className="bc-auth-tabs">
                <button
                  className={`bc-auth-tab signin ${curAuthTab == 'signin' ? 'active' : ''}`}
                  onClick={() => setCurAuthTab('signin')}
                >
                  Sign in
                </button>
                <button
                  className={`bc-auth-tab signup ${curAuthTab == 'signup' ? 'active' : ''}`}
                  onClick={() => setCurAuthTab('signup')}
                >
                  Create Account
                </button>
              </div>

              <div className="bc-auth-tab-content">
                {curAuthTab === 'signin' ? (
                  <SignInForm
                    setCurAuthTab={setCurAuthTab}
                    openGoogleLoginPopup={openGoogleLoginPopup}
                  />
                ) : (
                  <SignUpForm
                    setCurAuthTab={setCurAuthTab}
                    openGoogleLoginPopup={openGoogleLoginPopup}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSocialSignupModal && (
        <Modal
          handleOverlayClick={() => {}}
          // handleOverlayClick={() => setShowSocialSignupModal(false)}
          modalContentStyles={{ width: '100%', maxWidth: '460px' }}
        >
          <SocialSignupModal
            socialLoginUserData={socialLoginUserData}
            setShowSocialSignupModal={setShowSocialSignupModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Auth;
