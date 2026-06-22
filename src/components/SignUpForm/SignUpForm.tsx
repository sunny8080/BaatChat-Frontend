import type React from 'react';
import './SignUpForm.scss';
import googleSvg from '../../assets/social/google.svg';
import facebookSvg from '../../assets/social/facebook.svg';
import {
  AtSign,
  Check,
  Eye,
  EyeOff,
  Mail,
  MailCheck,
  NotebookPen,
  Search,
  UserRound,
  UserRoundKey,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { checkUsernameAvailability } from '../../services/authService';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpUser } from '../../services/authService';
import OTPForm from '../OTPForm/OTPForm.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

/**
 * NOTE :-
 * There will 3 steps for signup using email and password.
 * 1. users will provide required details
 * 2. user has to verify their email by providing verification OTP
 * 3. After successful verification he will get success message then after 5s he'll redirect to their chat dashboard
 */

type Props = {
  setCurAuthTab: React.Dispatch<React.SetStateAction<string>>;
  openGoogleLoginPopup: () => void;
};

const passwordStrengthLabel = ['', 'Weak ❌', 'Fair 🙂', 'Good 👍', 'Strong 💪'];
const passwordStrengthClass = ['', 'weak', 'fair', 'good', 'strong'];

const SignUpForm = ({ setCurAuthTab, openGoogleLoginPopup }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [countDownRedirect, setCountDownRedirect] = useState(3);
  const navigate = useNavigate();
  const cdProgressSVG = useRef<SVGCircleElement | null>(null);

  // create zod schema
  const SignUpSchema = z.object({
    username: z
      .string()
      .min(1, 'Username is required')
      .min(3, 'Username must be of at least 3 chars')
      .max(15, 'Username can be of at most 15 chars'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').min(5, 'Invalid email'),
    phone: z
      .string()
      .min(1, 'Phone is required')
      .regex(/^[0-9]{10}$/, 'Phone number must be digits')
      .regex(/^[1-9][0-9]{9}$/, 'Invalid phone number')
      .length(10, 'Invalid phone number'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be of at least 6 characters!'),
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const onPhoneChange = (val: string) => {
    val = val.replace(/\D/g, '');
    setValue('phone', val);
  };

  const onCheckUsername = async () => {
    if (userName.length < 3) return;
    setCheckingUsername(true);
    const res = await checkUsernameAvailability(userName);
    if (res && res.success) {
      setUserNameAvailable(res.data?.isAvailable ? 'true' : 'false');
    }
    setCheckingUsername(false);
  };

  const handleSignUp = async (data: any) => {
    if (userNameAvailable === 'false') {
      toast.error('Username is already taken!');
      return;
    }

    setLoading(true);
    const res = await signUpUser(data);
    if (res && res.success) {
      setOtpSent(true);
      toast.success('OTP sent to your email and phone.');
    }
    setLoading(false);
  };

  // It will update password whenever user changes password input
  const password = watch('password');

  useEffect(() => {
    // check password strength in realtime as user types it
    const checkPasswordStrength = () => {
      const pass = password ?? '';
      let score = 0;

      if (!pass || pass.length < 6) {
        setPasswordStrength(0);
        return;
      }

      if (pass.length >= 6) score++; // pass length
      if (pass.length >= 8) score++;
      if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score++; // uppercase + number
      if (/[^A-Za-z0-9]/.test(pass)) score++; // special char

      setPasswordStrength(score);
    };

    checkPasswordStrength();
  }, [password]);

  // handle countdown timer for redirecting user to homepage
  useEffect(() => {
    if (!emailVerified) {
      return;
    }

    const interval = setInterval(() => {
      setCountDownRedirect((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          navigate('/chat');
        }
        const circumference = 113; // 2 * pi * 18
        if (cdProgressSVG.current) {
          // strokeDashoffset - how much width of circle should be colored
          cdProgressSVG.current.style.strokeDashoffset = String(
            circumference * (1 - (countDownRedirect - 1) / 3),
          );
        }

        return Math.max(0, prev - 1);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countDownRedirect, emailVerified, navigate]);

  return (
    <div className="bc-SignUpForm bc-slideScreenRight">
      <div className="bc-social-links">
        <button className="bc-social-link google" onClick={() => openGoogleLoginPopup()}>
          <img className="bc-social-icon" src={googleSvg} alt="google-signup" />
          Sign up with Google
        </button>

        {/* Currently disabling Facebook */}
        {/* <button className="bc-social-link facebook">
          <img className="bc-social-icon facebook" src={facebookSvg} alt="facebook-signin" />
          Facebook
        </button> */}
      </div>

      <div className="bc-form-divider">
        <span className="bc-divider-line"></span>
        <span className="bc-divider-txt">Or Fill in details With</span>
        <span className="bc-divider-line"></span>
      </div>

      {/* Show OTP Input screen if otp sent and email not verified */}
      {otpSent && !emailVerified && (
        <OTPForm
          setOtpSent={setOtpSent}
          setEmailVerified={setEmailVerified}
          email={getValues('email')}
        />
      )}

      {/* Show Email verified success  screen if otp sent and email verified */}
      {otpSent && emailVerified && (
        <div className="bc-signup-success bc-form bc-slideScreenLeft">
          <div className="bc-sup-success-header">
            <div className="bc-sup-success-ring">
              <span>🎉</span>
            </div>
            <div className="bc-sup-success-title">Account created!</div>
            <div className="bc-sup-success-sub">
              Your BaatChat account is verified and ready. Welcome to the family! 🇮🇳
            </div>
          </div>

          <div className="bc-sup-ac-details">
            <div className="bc-sup-ac-row">
              <span className="bc-sup-ac-icon vlt">
                <UserRound size={16} />
              </span>
              {getValues('name')}
            </div>

            <div className="bc-sup-ac-row">
              <span className="bc-sup-ac-icon vlt">
                <AtSign size={16} />
              </span>
              {getValues('username')}
            </div>

            <div className="bc-sup-ac-row">
              <span className="bc-sup-ac-icon grn">
                <MailCheck size={16} />
              </span>
              {getValues('email')}
            </div>
          </div>

          <div className="bc-sup-success-countdown">
            {/* // Check countdown progress */}
            <div className="cd-icon">
              <svg width="44" height="44" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" />
                <circle cx="22" cy="22" r="18" className="progress" ref={cdProgressSVG} />
              </svg>
              <span className="cd-num">{countDownRedirect}</span>
            </div>
            <div className="cd-text">
              Redirecting to your dashboard in <strong>{countDownRedirect}</strong>s
            </div>
          </div>

          <button className="bc-form-submit-btn primary" onClick={() => navigate('/chat')}>
            Go to Dashboard →
          </button>
        </div>
      )}

      {/* Show Sign up form if otp not sent */}
      {!otpSent && (
        <form className="bc-form" onSubmit={handleSubmit(handleSignUp)}>
          <div className="bc-form-row">
            <div className="bc-form-field">
              <label className="bc-form-label" htmlFor="name">
                Full Name
              </label>
              <div className="bc-form-input-wrapper">
                <span className="bc-form-icon">
                  <NotebookPen />
                </span>
                <input
                  type="text"
                  className={`bc-form-input has-icon
                  ${errors.name?.message ? 'error' : ''}
                `}
                  id="name"
                  placeholder="Sunny Kumar"
                  {...register('name')}
                />
              </div>

              {errors.name?.message && (
                <div className="bc-form-input-validation-err">{errors.name?.message}</div>
              )}
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
                    ${errors.username?.message ? 'error' : ''}
                  `}
                  id="username"
                  {...register('username', {
                    onChange: (e) => {
                      setUserName(e.target.value);
                      setUserNameAvailable('');
                    },
                  })}
                  placeholder="user1234"
                />
              </div>

              {errors.username?.message && (
                <div className="bc-form-input-validation-err">{errors.username?.message}</div>
              )}

              <div className="bc-username-check">
                <p
                  className={`bc-username-status 
                ${userNameAvailable === 'true' ? 'available' : ''}
                ${userNameAvailable === 'false' ? 'not-available' : ''}
                `}
                >
                  <span>
                    {userNameAvailable === 'true' ? (
                      <Check size={16} strokeWidth={3} />
                    ) : (
                      <X size={20} strokeWidth={3} />
                    )}
                  </span>

                  {userNameAvailable === 'true'
                    ? 'Username is available! Lock it now.'
                    : 'Username is already taken'}
                </p>

                <button
                  type="button"
                  className={`bc-username-check-btn ${checkingUsername ? 'loading' : ''}`}
                  disabled={!(userName && userName.length >= 3)}
                  onClick={onCheckUsername}
                >
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
                <Mail />
              </span>
              <input
                type="email"
                className={`bc-form-input has-icon
                ${errors.email?.message ? 'error' : ''}
              `}
                id="email"
                placeholder="user@example.com"
                {...register('email')}
              />
            </div>
            {errors.email?.message && (
              <div className="bc-form-input-validation-err">{errors.email?.message}</div>
            )}
          </div>

          <div className="bc-form-field">
            <label className="bc-form-label" htmlFor="phone">
              Phone Number
            </label>
            <div className="bc-form-input-wrapper">
              <span className="bc-form-icon">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                className={`bc-form-input has-icon 
                ${errors.phone?.message ? 'error' : ''}
              `}
                id="phone"
                placeholder="98765 43210"
                maxLength={10}
                {...register('phone', {
                  onChange: (e) => {
                    onPhoneChange(e.target.value);
                  },
                })}
              />
            </div>
            {errors.phone?.message && (
              <div className="bc-form-input-validation-err">{errors.phone?.message}</div>
            )}
          </div>

          <div className="bc-form-field">
            <label className="bc-form-label" htmlFor="password">
              Password
            </label>
            <div className="bc-form-input-wrapper">
              <span className="bc-form-icon">
                <UserRoundKey />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`bc-form-input has-icon has-right-icon 
                ${errors.password?.message ? 'error' : ''}
              `}
                id="password"
                placeholder="Enter a strong password"
                {...register('password')}
              />
              <span className="bc-form-right-icon" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>

            <div className="bc-form-password-strength">
              <div className="bc-form-pw-bars">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`bc-form-pw-bar 
                  ${bar <= passwordStrength ? passwordStrengthClass[passwordStrength] : ''}`}
                  ></div>
                ))}
              </div>
              <div className="bc-form-pw-label">{passwordStrengthLabel[passwordStrength]}</div>
            </div>

            {errors.password?.message && (
              <div className="bc-form-input-validation-err">{errors.password?.message}</div>
            )}
          </div>

          <button type="submit" className="bc-form-submit-btn primary">
            {loading && <div className="bc-inline-spinner"></div>}
            {loading ? 'Sending register OTP...' : 'Create my account'}
          </button>

          <div className="bc-signup-terms">
            By creating an account you agree to our{' '}
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
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
              }}
            >
              Sign in →
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUpForm;
