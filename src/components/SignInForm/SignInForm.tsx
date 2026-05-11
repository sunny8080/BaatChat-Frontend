import './SignInForm.scss';
import googleSvg from '../../assets/social/google.svg';
import facebookSvg from '../../assets/social/facebook.svg';
import { Eye, EyeOff, UserRound, UserRoundKey } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  setCurAuthTab: React.Dispatch<React.SetStateAction<string>>;
};

const SignInForm = ({ setCurAuthTab }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bc-SignInForm">
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
        <span className="bc-divider-txt">Or Continue With</span>
        <span className="bc-divider-line"></span>
      </div>

      <form className="bc-form">
        <div className="bc-form-field">
          <label className="bc-form-label" htmlFor="emailOrUsername">
            Username or Email
          </label>
          <div className="bc-form-input-wrapper">
            <span className="bc-form-icon">
              <UserRound />
            </span>
            <input type="text" className="bc-form-input has-icon" id="emailOrUsername" placeholder="user1234 or user@example.com" minLength={3} />
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
            <input type={showPassword ? 'text' : 'password'} className="bc-form-input has-icon has-right-icon" id="password" placeholder="Enter your password" />
            <span className="bc-form-right-icon" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </div>

        <div className="bc-forgot-row">
          <Link to={'/forgot-password'} className="bc-forgot-link">
            Forgot Password ?
          </Link>
        </div>

        <button type="submit" className="bc-form-submit-btn primary">
          <div className="bc-inline-spinner"></div>
          Sign in to BaatChat
        </button>

        <div className="bc-auth-switch-row">
          <span>Don't have an account ?&nbsp;</span>
          <span
            className="switch-link"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
              setCurAuthTab('signup');
            }}>
            Create one now →
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
