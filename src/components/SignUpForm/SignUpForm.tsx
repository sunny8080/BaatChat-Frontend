import type React from 'react';
import './SignUpForm.scss';
import googleSvg from '../../assets/social/google.svg';
import facebookSvg from '../../assets/social/facebook.svg';
import { AtSign, Check, Eye, EyeOff, NotebookPen, Search, UserRound, UserRoundKey, X } from 'lucide-react';
import { useState } from 'react';
import { checkUsernameAvailability } from '../../services/authService';

type Props = {
  setCurAuthTab: React.Dispatch<React.SetStateAction<string>>;
};
const SignUpForm = ({ setCurAuthTab }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUsername] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState('');

  const onCheckUsername = async () => {
    if (userName.length < 3) return;
    setCheckingUsername(true);
    const res = await checkUsernameAvailability(userName);
    if (res && res.success) {
      setUserNameAvailable(res.data?.isAvailable ? 'true' : 'false');
    }
    setCheckingUsername(false);
  };

  return (
    <div className="bc-SignUpForm">
      <div className="bc-social-links">
        <button className="bc-social-link">
          <img className="bc-social-icon" src={googleSvg} alt="google-signin" />
          Google
        </button>
        <button className="bc-social-link">
          <img className="bc-social-icon facebook" src={facebookSvg} alt="facebook-signin" />
          Facebook
        </button>
      </div>

      <div className="bc-form-divider">
        <span className="bc-divider-line"></span>
        <span className="bc-divider-txt">Or Fill in details With</span>
        <span className="bc-divider-line"></span>
      </div>

      <form className="bc-form">
        <div className="bc-form-row">
          <div className="bc-form-field">
            <label className="bc-form-label" htmlFor="name">
              Full Name
            </label>
            <div className="bc-form-input-wrapper">
              <span className="bc-form-icon">
                <NotebookPen />
              </span>
              <input type="text" className="bc-form-input has-icon" id="name" placeholder="Sunny Kumar" />
            </div>
          </div>
          <div className="bc-form-field">
            <label className="bc-form-label" htmlFor="username">
              Username
            </label>
            <div className="bc-form-input-wrapper">
              <span className="bc-form-icon">
                <AtSign />
              </span>
              <input
                type="text"
                className={`bc-form-input has-icon
                    ${userNameAvailable === 'true' ? 'valid' : ''}
                    ${userNameAvailable === 'false' ? 'error' : ''}
                  `}
                id="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUserNameAvailable('');
                }}
                placeholder="user1234"
                maxLength={15}
                minLength={3}
              />
            </div>

            <div className="bc-username-check">
              <p
                className={`bc-username-status 
                ${userNameAvailable === 'true' ? 'available' : ''}
                ${userNameAvailable === 'false' ? 'not-available' : ''}
                `}>
                <span>{userNameAvailable === 'true' ? <Check size={16} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}</span>

                {userNameAvailable === 'true' ? 'Username is available! Lock it now.' : 'Username is already taken'}
              </p>

              <button type="button" className={`bc-username-check-btn ${checkingUsername ? 'loading' : ''}`} disabled={!(userName && userName.length >= 3)} onClick={onCheckUsername}>
                {checkingUsername && <div className="bc-inline-spinner mr-1"></div>}
                <Search width={14} height={14} />
                <span>Check availability</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bc-form-field">
          <label className="bc-form-label" htmlFor="email">
            Email Address
          </label>
          <div className="bc-form-input-wrapper">
            <span className="bc-form-icon">
              <UserRound />
            </span>
            <input type="email" className="bc-form-input has-icon" id="email" placeholder="user@example.com" />
          </div>
        </div>

        <div className="bc-form-field">
          <label className="bc-form-label" htmlFor="phone">
            Phone Number
          </label>
          <div className="bc-form-input-wrapper">
            <span className="bc-form-icon">+91</span>
            <input type="tel" className="bc-form-input has-icon" id="phone" placeholder="98765 43210" maxLength={10} />
          </div>
        </div>

        <div className="bc-form-field">
          <label className="bc-form-label" htmlFor="password">
            Password
          </label>
          <div className="bc-form-input-wrapper">
            <span className="bc-form-icon">
              <UserRoundKey />
            </span>
            <input type={showPassword ? 'text' : 'password'} className="bc-form-input has-icon has-right-icon" id="password" placeholder="Enter a strong password" />
            <span className="bc-form-right-icon" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </div>

        <button type="submit" className="bc-form-submit-btn primary">
          <div className="bc-inline-spinner"></div>
          Sign in to BaatChat
        </button>

        <div className="bc-signup-terms">
          By creating an account you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </div>

        <div className="bc-auth-switch-row">
          <span>Already have an account? &nbsp;</span>
          <span
            className="switch-link"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
              setCurAuthTab('signin');
            }}>
            Sign in →
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
