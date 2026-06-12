import './OTPForm.scss';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { resendSignUpOtp, verifyEmail } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { connectSocket } from '../../socket/socket';

type Props = {
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
};

const OTPForm = ({ email, setOtpSent, setEmailVerified }: Props) => {
  const [otpValidating, setOtpValidating] = useState(false);
  const [resendOtpTimer, setResendOtpTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill('')); // ['', '', '', '', '', '']
  const { setAccessToken, setUser } = useAuth();

  useEffect(() => {
    if (resendOtpTimer <= 0) return;
    const interval = setInterval(() => {
      setResendOtpTimer((prev: number) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendOtpTimer]);

  // handle when users enters otp
  const handleOtpChange = (e: React.InputEvent<HTMLInputElement>, ind: number) => {
    const val = e.currentTarget.value.replace(/\D/g, '');

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[ind] = val;
      return newOtp;
    });

    // move to next input elem if exist
    if (val && ind < 5) {
      inputRefs.current[ind + 1]?.focus();
    }
  };

  // handle when user types otp or delete otp, moves accordingly of the moves
  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, ind: number) => {
    if (e.key === 'Backspace' && !otp[ind] && ind > 0) {
      // move to prev input elem if exist
      inputRefs.current[ind - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && ind > 0) {
      // move to prev input elem if exist
      inputRefs.current[ind - 1]?.focus();
      requestAnimationFrame(() => {
        const len = inputRefs.current[ind - 1]?.value.length || 0;
        inputRefs.current[ind - 1]?.setSelectionRange(len, len);
      });
    } else if (e.key === 'ArrowRight' && ind < 5) {
      // move to next input elem if exist
      inputRefs.current[ind + 1]?.focus();
    }
  };

  // handle  when user paste otp
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = Array(6).fill('');
    setOtp(newOtp);

    pasted.split('').forEach((ch: string, ind: number) => {
      newOtp[ind] = ch;
    });

    if (pasted.length !== 6) {
      // move to next input elem if pasted otp is not of 6 chars
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const handleVerifyEmail = useCallback(async () => {
    if (otp.join('').length !== 6) {
      toast.error('Incorrect OTP');
      return;
    }

    setOtpValidating(true);
    const res = await verifyEmail({ email, otp: otp.join('') });
    if (res && res.success) {
      setTimeout(() => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        connectSocket(res.data.user);
      }, 4000);
      setEmailVerified(true);
      toast.success('Email Verified 🎉');
    }
    setOtpValidating(false);
  }, [otp, email, setAccessToken, setEmailVerified, setUser]);

  // resend otp and restart resend otp timer
  const handleResendOTP = async () => {
    setResendOtpTimer(60);
    const res = await resendSignUpOtp({ email });
    if (res && res.success) {
      toast.success('OTP re-sent to your email and phone.');
    }
  };

  useEffect(() => {
    let timeout = undefined;
    if (otp.join('').length === 6) {
      // if otp is complete then verify email automatically
      timeout = setTimeout(async () => {
        await handleVerifyEmail();
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [otp, handleVerifyEmail]);

  return (
    <div className="bc-OTPForm bc-form bc-slideScreenLeft">
      <div className="bc-sup-otp-header">
        <div className="bc-sup-otp-icon">
          <Mail />
        </div>
        <div className="bc-sup-otp-title">Verify your email</div>
        <div className="bc-sup-otp-sub">We sent a 6-digit OTP to</div>
        <div className="bc-sup-otp-email">{email}</div>
      </div>
      <div className="bc-sup-otp-inputs">
        {otp.map((digit, ind) => (
          <input
            type="text"
            inputMode="numeric"
            value={digit}
            key={ind}
            className={`bc-sup-otp-box ${digit !== '' ? 'filled' : ''}`}
            maxLength={1}
            ref={(el) => {
              inputRefs.current[ind] = el;
            }}
            onKeyDown={(e) => handleOtpKeyDown(e, ind)}
            onInput={(e) => handleOtpChange(e, ind)}
            onPaste={handleOtpPaste}
          />
        ))}
      </div>
      <div className="bc-sup-otp-resend">
        {resendOtpTimer > 0 ? (
          <div className="bc-sup-otp-timer">
            Resend OTP in{' '}
            <span className="otp-timer">
              {Math.floor(resendOtpTimer / 60)
                .toString()
                .padStart(2, '0')}
              :{(resendOtpTimer % 60).toString().padStart(2, '0')}
            </span>
          </div>
        ) : (
          <button type="button" className="bc-otp-resend-button" onClick={handleResendOTP}>
            Resend OTP
          </button>
        )}
      </div>

      <button type="button" className="bc-form-submit-btn primary" onClick={handleVerifyEmail}>
        {otpValidating && <div className="bc-inline-spinner"></div>}
        {otpValidating ? 'Verifying Email...' : 'Verify Email'}
      </button>

      <button
        type="button"
        className="bc-auth-switch-row"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          setOtpSent(false);
        }}
      >
        <span className="switch-link muted">← Change email or details</span>
      </button>
    </div>
  );
};

export default OTPForm;
