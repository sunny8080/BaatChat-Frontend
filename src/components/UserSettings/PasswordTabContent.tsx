import { Eye, EyeOff, Key, TriangleAlert, UserRoundKey } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type SettingsActiveTab } from './UserSettings';
import toast from 'react-hot-toast';
import { changePassword } from '../../services/authService';
import socket from '../../socket/socket';
import { useAuth } from '../../context/AuthContext';
import { UserLoginTypes } from '../../utils/constant';

type Props = {
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentActiveTab: SettingsActiveTab;
};
const passwordStrengthLabel = ['', 'Weak ❌', 'Fair 🙂', 'Good 👍', 'Strong 💪'];
const passwordStrengthClass = ['', 'weak', 'fair', 'good', 'strong'];

const PasswordTabContent = ({ setShowSettingsModal, currentActiveTab }: Props) => {
  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurPassword, setShowCurPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // check password strength in realtime as user types it
    const checkPasswordStrength = () => {
      const pass = newPassword ?? '';
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
  }, [newPassword]);

  const handlePasswordChange = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!curPassword || !newPassword || !confirmPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password are not matching!!');
      return;
    }
    setLoading(true);
    const res = await changePassword({ oldPassword: curPassword, newPassword, confirmPassword });
    if (res && res.success) {
      toast.success('Password updated successfully!');
      socket.disconnect();

      setTimeout(() => {
        window.location.href = '/auth?mode=signin';
      }, 300);
    }
    setLoading(false);
  };

  return (
    <div
      className={`bc-PasswordTabContent bc-user-settings-section-content ${currentActiveTab === 'Password' ? 'active' : ''}`}
    >
      <div className="bc-uss-content-title">Change Password</div>
      <div className="bc-uss-content-sub">Use a strong password you don't use elsewhere.</div>

      {user?.loginType !== UserLoginTypes.EMAIL_PASSWORD && (
        <div className="item-warning">
          <div className="warning-title">
            <span>
              <TriangleAlert size={12} />
            </span>
            Heads up
          </div>
          <div className="warning-content">
            Your account is managed through Google Sign-In. You don't need a password to access this
            account.
          </div>
        </div>
      )}

      {user?.loginType === UserLoginTypes.EMAIL_PASSWORD && (
        <form className="bc-form" onSubmit={handlePasswordChange}>
          <div className="bc-form-field">
            <label className="bc-form-label" htmlFor="curPassword">
              Current Password
            </label>
            <div className="bc-form-input-wrapper">
              <span className="bc-form-icon">
                <Key />
              </span>
              <input
                type={showCurPassword ? 'text' : 'password'}
                className="bc-form-input has-icon has-right-icon"
                id="curPassword"
                placeholder="Enter your current password"
                required
                minLength={6}
                value={curPassword}
                onChange={(e) => setCurPassword(e.target.value)}
              />
              <span
                className="bc-form-right-icon"
                onClick={() => setShowCurPassword((prev) => !prev)}
              >
                {showCurPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          <div className="bc-uss-content-divider"></div>

          <div className="bc-form-field">
            <label className="bc-form-label" htmlFor="newPassword">
              New Password
            </label>
            <div className="bc-form-input-wrapper">
              <span className="bc-form-icon">
                <UserRoundKey />
              </span>
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="bc-form-input has-icon has-right-icon"
                id="newPassword"
                placeholder="Enter a strong new password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="bc-form-right-icon"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <EyeOff /> : <Eye />}
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
          </div>

          <div className="bc-form-field">
            <label className="bc-form-label" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <div className="bc-form-input-wrapper">
              <span className="bc-form-icon">
                <UserRoundKey />
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="bc-form-input has-icon has-right-icon"
                id="confirmPassword"
                placeholder="Repeat your new password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="bc-form-right-icon"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          <div className="bc-uss-content-ctas">
            <button
              className="bc-btn bc-btn-secondary discard"
              onClick={() => setShowSettingsModal(false)}
              disabled={loading}
            >
              Discard
            </button>
            <button
              type="submit"
              className={`bc-form-submit-btn primary submit ${loading ? 'loading' : ''}`}
              disabled={!curPassword || !newPassword || !confirmPassword}
            >
              {loading && <div className="bc-inline-spinner"></div>}
              {loading ? ' Changing Password...' : 'Change Password'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PasswordTabContent;
