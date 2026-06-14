import { AtSign, Check, Search, TriangleAlert, X } from 'lucide-react';
import { useState } from 'react';
import { type SettingsActiveTab } from './UserSettings';
import { useAuth } from '../../context/AuthContext';
import { checkUsernameAvailability } from '../../services/authService';
import toast from 'react-hot-toast';
import { updateUserDetails } from '../../services/usersServices';

type Props = {
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentActiveTab: SettingsActiveTab;
};

const UsernameTabContent = ({ setShowSettingsModal, currentActiveTab }: Props) => {
  const { user, setUser } = useAuth();
  const [userName, setUserName] = useState(user?.username ?? '');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState('');
  const [loading, setLoading] = useState(false);

  const onCheckUsername = async () => {
    if (userName.length < 3) return;
    setCheckingUsername(true);
    const res = await checkUsernameAvailability(userName);
    if (res && res.success) {
      setUserNameAvailable(res.data?.isAvailable ? 'true' : 'false');
    }
    setCheckingUsername(false);
  };

  const handleUsernameChange = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName === user?.username) return;

    if (userName.length < 3) {
      return toast.error('Username should have at least 3 chars');
    }
    if (userName.length > 30) {
      return toast.error('Username can be max 15 chars');
    }

    setLoading(true);
    const res = await updateUserDetails({ username: userName });
    if (res && res.success) {
      setUser(res.data.user);
      toast.success('Username updated successfully!');
    }
    setLoading(false);
  };

  return (
    <div
      className={`bc-UsernameTabContent bc-user-settings-section-content ${currentActiveTab === 'Username' ? 'active' : ''}`}
    >
      <div className="bc-uss-content-title">Username</div>
      <div className="bc-uss-content-sub">
        Your unique @handle on BaatChat. Others can find and mention you by this.
      </div>

      <form className="bc-form" onSubmit={handleUsernameChange}>
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
                setUserName(e.target.value);
                setUserNameAvailable('');
              }}
              placeholder="user1234"
              value={userName}
              required
              minLength={3}
              maxLength={15}
            />
          </div>

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
              disabled={!(userName && userName.length >= 3 && userName !== user?.username)}
              onClick={onCheckUsername}
            >
              {checkingUsername && <div className="bc-inline-spinner mr-1"></div>}
              <Search width={14} height={14} />
              <span>Check availability</span>
            </button>
          </div>
        </div>

        <div className="item-warning">
          <div className="warning-title">
            <span>
              <TriangleAlert size={12} />
            </span>
            Heads up
          </div>
          <div className="warning-content">
            Changing your username will update all your @mentions. You can change it again after 30
            days.
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
            disabled={userName === user?.username || userName.length < 3}
          >
            {loading && <div className="bc-inline-spinner"></div>}
            {loading ? 'Changing Username...' : 'Change Username'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsernameTabContent;
