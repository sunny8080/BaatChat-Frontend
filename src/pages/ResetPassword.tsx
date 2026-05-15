import { Check, Eye, EyeOff, Key, UserRoundKey } from 'lucide-react';
import BaatChatLogo from '../components/BaatChatLogo/BaatChatLogo';
import './ResetPassword.scss';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getRandomMorse } from '../utils/utils';
import { resetPassword } from '../services/authService';
import toast from 'react-hot-toast';

const randMorse = getRandomMorse();
const passwordStrengthLabel = ['', 'Weak ❌', 'Fair 🙂', 'Good 👍', 'Strong 💪'];
const passwordStrengthClass = ['', 'weak', 'fair', 'good', 'strong'];
const passReqStr = ['At least 6 characters', 'One lowercase letter (a-z)', 'One uppercase letter (A-Z)', 'One special character (!@#$...)', 'One number (0-9)'];

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  let tokenExpiry = Number.parseInt(searchParams.get('te') ?? '');
  tokenExpiry = Number.isNaN(tokenExpiry) ? -1 : tokenExpiry;

  if (tokenExpiry !== -1 && tokenExpiry > Date.now()) {
    tokenExpiry = Math.min(600, Math.floor((tokenExpiry - Date.now()) / 1000));
  }

  const [remainExpireTime, setRemainExpireTime] = useState(tokenExpiry); // time remaining to reset password token to expire
  const { resetToken } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordReqFulfillment, setPasswordReqFulfillment] = useState(Array(6).fill(0));
  const navigate = useNavigate();

  const ResetPasswordSchema = z
    .object({
      password: z.string().min(1, 'Password is required').min(6, 'Password must be of at least 6 characters!'),
      confirmPassword: z.string().min(1, 'Password is required').min(6, 'Password must be of at least 6 characters!'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Both passwords don't match",
      path: ['confirmPassword'],
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ResetPasswordSchema) });

  const handleResetPassword = async (data: any) => {
    setLoading(true);
    toast.success('Password reset successfully, login now!');
    setTimeout(() => {
      navigate('/auth');
    }, 1000);
    const res = await resetPassword({ ...data, resetToken });
    if (res && res.success) {
      toast.success('Password reset successfully, login now!');
      setTimeout(() => {
        navigate('/auth');
      }, 1000);
    }
    setLoading(false);
  };

  // It will update password whenever user changes password input
  const password = watch('password');

  useEffect(() => {
    // check password strength in realtime as user types it
    const checkPasswordStrength = () => {
      const pass = password ?? '';
      const newFulFillment = Array(6).fill(0);
      let score = 0;

      if (!pass) {
        setPasswordReqFulfillment(newFulFillment);
        setPasswordStrength(0);
      } else {
        if (pass.length >= 6) {
          newFulFillment[0] = 1; // pass length greater than equal to 6
          score++;
        }
        if (/[a-z]/.test(pass)) {
          newFulFillment[1] = 1; // lowercase
        }
        if (/[A-Z]/.test(pass)) {
          newFulFillment[2] = 1; // uppercase
        }
        if (/[^A-Za-z0-9]/.test(pass)) {
          newFulFillment[3] = 1; // special char
          score++;
        }
        if (/[0-9]/.test(pass)) {
          newFulFillment[4] = 1; // number
        }
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score++; // uppercase + number
      }

      setPasswordReqFulfillment(newFulFillment);
      setPasswordStrength(score);
    };

    checkPasswordStrength();
  }, [password]);

  useEffect(() => {
    if (remainExpireTime <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setRemainExpireTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainExpireTime]);

  return (
    <div className="bc-ResetPassword w-full h-full">
      <div className="bc-rp-blob blob-top-right"></div>
      <div className="bc-rp-blob blob-bottom-left"></div>
      <div className="bc-rp-blob blob-center-left"></div>

      <div className="bc-rp-content">
        <div className="bc-rp-logo-row">
          <BaatChatLogo />
        </div>

        <div className="bc-rp-main-content">
          <div className="bc-rp-blob"></div>
          <div className="bc-rp-header">
            <div className="bc-rp-icon">
              <Key />
            </div>
            <div className="bc-rp-title">Set new password</div>
            <div className="bc-rp-sub">Choose a strong password for your BaatChat account</div>

            {remainExpireTime >= 0 && (
              <div className="bc-rp-expiry-chip">
                Link expires in{' '}
                <strong>
                  {Math.floor(remainExpireTime / 60)
                    .toString()
                    .padStart(2, '0')}
                  :{(remainExpireTime % 60).toString().padStart(2, '0')}
                </strong>
              </div>
            )}
          </div>

          <div className="bc-rp-pass-reqs">
            <div className="bc-rp-req-title">Password Requirements</div>
            {passReqStr.map((req, ind) => (
              <div className={`bc-rp-pass-req-item ${passwordReqFulfillment[ind] ? 'fulfilled' : ''}`} key={ind}>
                <span>
                  <Check size={10} />
                </span>
                {req}
              </div>
            ))}
          </div>

          <form className="bc-rp-form bc-form" onSubmit={handleSubmit(handleResetPassword)}>
            <div className="bc-form-field">
              <label className="bc-form-label" htmlFor="password">
                New Password
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
                          ${bar <= passwordStrength ? passwordStrengthClass[passwordStrength] : ''}`}></div>
                  ))}
                </div>
                <div className="bc-form-pw-label">{passwordStrengthLabel[passwordStrength]}</div>
              </div>

              {errors.password?.message && <div className="bc-form-input-validation-err">{errors.password?.message}</div>}
            </div>

            <div className="bc-form-field">
              <label className="bc-form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="bc-form-input-wrapper">
                <span className="bc-form-icon">
                  <UserRoundKey />
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`bc-form-input has-icon has-right-icon 
                ${errors.confirmPassword?.message ? 'error' : ''}
              `}
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  {...register('confirmPassword')}
                />
                <span className="bc-form-right-icon" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>

              {errors.confirmPassword?.message && <div className="bc-form-input-validation-err">{errors.confirmPassword?.message}</div>}
            </div>

            <button type="submit" className="bc-form-submit-btn primary">
              {loading && <div className="bc-inline-spinner"></div>}
              {loading ? 'Resetting Password...' : 'Reset password'}
            </button>

            <div className="bc-auth-switch-row">
              <span className="switch-link muted" onClick={() => navigate('/auth')}>
                ← Back to sign in
              </span>
            </div>
          </form>

          <div className="bc-rp-footer">
            <p className="bc-rp-morse" title={`Decode this - ${randMorse.hint}`}>
              {randMorse.morse}
            </p>
            <p className="bc-copyright-txt">© 2026 BaatChat · baatchat.online · Made with ❤️ in India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
