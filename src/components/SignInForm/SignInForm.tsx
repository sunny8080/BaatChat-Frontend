import './SignInForm.scss';
import googleSvg from '../../assets/social/google.svg';
import facebookSvg from '../../assets/social/facebook.svg';
import { Eye, EyeOff, UserRound, UserRoundKey } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser } from '../../services/authService';

type Props = {
  setCurAuthTab: React.Dispatch<React.SetStateAction<string>>;
};

const SignInForm = ({ setCurAuthTab }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // create zod schema
  const SignInSchema = z.object({
    emailOrUsername: z.string().min(1, 'Email or username is required!').min(3, 'Invalid email or username'),
    password: z.string().min(1, 'Password is required!').min(6, 'Password must be of at least 6 characters!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignInSchema) });

  const handleSignin = async (data: any) => {
    setLoading(true);
    const res = await loginUser(data);
    if (res.success) {
      // TODO - check if user login properly or not as page won't refresh
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="bc-SignInForm bc-slideScreenLeft">
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

      <form className="bc-form" onSubmit={handleSubmit(handleSignin)}>
        <div className="bc-form-field">
          <label className="bc-form-label" htmlFor="emailOrUsername">
            Username or Email
          </label>
          <div className="bc-form-input-wrapper">
            <span className="bc-form-icon">
              <UserRound />
            </span>
            <input
              type="text"
              className={`bc-form-input has-icon 
                ${errors.emailOrUsername?.message ? 'error' : ''}
              `}
              id="emailOrUsername"
              placeholder="user1234 or user@example.com"
              {...register('emailOrUsername')}
            />
          </div>

          {errors.emailOrUsername?.message && <div className="bc-form-input-validation-err">{errors.emailOrUsername?.message}</div>}
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
              placeholder="Enter your password"
              {...register('password')}
            />
            <span className="bc-form-right-icon" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          {errors.password?.message && <div className="bc-form-input-validation-err">{errors.password?.message}</div>}
        </div>

        <div className="bc-forgot-row">
          <Link to={'/forgot-password'} className="bc-forgot-link">
            Forgot Password ?
          </Link>
        </div>

        <button type="submit" className={`bc-form-submit-btn primary ${loading ? 'loading' : ''}`}>
          {loading && <div className="bc-inline-spinner"></div>}
          {loading ? 'Sign in to BaatChat' : 'Sign in to BaatChat'}
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
