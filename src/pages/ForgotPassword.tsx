import './ForgotPassword.scss';
import AuthLeftContent from '../components/AuthLeftContent/AuthLeftContent';
import BaatChatLogo from '../components/BaatChatLogo/BaatChatLogo';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { forgotPassword } from '../services/authService';
import toast from 'react-hot-toast';
import { Key, MailSearch, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const navigate = useNavigate();

  const ForgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').min(5, 'Invalid email'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ForgotPasswordSchema) });

  const handleForgotPassword = async (data: any) => {
    setLoading(true);

    const res = await forgotPassword(data);
    if (res && res.success) {
      setResetLinkSent(true);
      toast.success('Password reset link sent to your mail!');
    }
    setLoading(false);
  };

  return (
    <div className="bc-ForgotPassword w-full h-full flex flex-col justify-between">
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
              <div className="bc-fp-icon">
                <Key />
              </div>

              <div className="bc-auth-title">Reset password</div>
              {!resetLinkSent && <div className="bc-auth-sub">Enter your email and we'll send you a password reset link</div>}
            </div>

            {resetLinkSent && (
              <div className="bc-fp-success">
                <div className="bc-fp-success-title">
                  <MailSearch size={22} color="var(--gold-color)" />
                  Check you Inbox!
                </div>
                <p className="bc-fp-success-sub">We sent a password reset link to ( if exist )</p>
                <div className="bc-fp-email-pill">sadf@gmail.com</div>

                <p className="bc-fp-success-expire-txt">Link expires in 10 minutes.</p>

                <button className="bc-btn bc-btn-primary" onClick={() => navigate('/auth')}>
                  ← Back to sign in
                </button>
              </div>
            )}

            {!resetLinkSent && (
              <form className="bc-form" onSubmit={handleSubmit(handleForgotPassword)}>
                <div className="bc-form-field">
                  <label className="bc-form-label" htmlFor="email">
                    Email Address
                  </label>
                  <div className="bc-form-input-wrapper">
                    <span className="bc-form-icon">
                      <UserRound />
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

                  {errors.email?.message && <div className="bc-form-input-validation-err">{errors.email?.message}</div>}
                </div>

                <button type="submit" className="bc-form-submit-btn primary">
                  {loading && <div className="bc-inline-spinner"></div>}
                  {loading ? 'Sending reset link...' : 'Send reset link'}
                </button>

                <div className="bc-auth-switch-row">
                  <span
                    className="switch-link"
                    onClick={() => {
                      navigate('/auth');
                    }}>
                    ← Back to sign in
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
