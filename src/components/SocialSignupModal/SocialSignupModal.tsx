import './SocialSignupModal.scss';
import googleSvg from '../../assets/social/google.svg';
import { AtSign, Check, MoveRight, Search, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { checkUsernameAvailability, completeSocialSignup } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { connectSocket } from '../../socket/socket';

type Props = {
  socialLoginUserData: any;
  setShowSocialSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SocialSignupModal = ({ socialLoginUserData, setShowSocialSignupModal }: Props) => {
  const [userName, setUserName] = useState(socialLoginUserData.username?.split('_')[0]);
  const [phone, setPhone] = useState(socialLoginUserData.phone);
  const [isCompletingProfile, setIsCompletingProfile] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState('');
  const { setAccessToken, setUser } = useAuth();

  const onCheckUsername = async () => {
    if (userName.length < 3) return;
    setCheckingUsername(true);
    const res = await checkUsernameAvailability(userName);
    if (res && res.success) {
      setUserNameAvailable(res.data?.isAvailable ? 'true' : 'false');
    }
    setCheckingUsername(false);
  };

  console.log(socialLoginUserData);

  const handleCompleteSocialSignup = async () => {
    if (userName.length < 3) {
      toast.error('Username must have at least 3 chars');
      return;
    }
    if (!phone || phone.length !== 10) {
      toast.error('Phone no. is required');
      return;
    }

    const data = {
      username: userName,
      email: socialLoginUserData.email,
      phone,
    };

    setIsCompletingProfile(true);
    const res = await completeSocialSignup(data);
    console.log(res);
    if (res && res.success) {
      setTimeout(() => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        connectSocket(res.data.user);
      }, 1000);
      toast.success('Account Created Successfully 🎉');
    }
    setIsCompletingProfile(false);
  };

  if (!socialLoginUserData) {
    setShowSocialSignupModal(false);
    return null;
  }

  return (
    <div className="bc-SocialSignupModal">
      <div className="bc-ssm-orb1"></div>
      <div className="bc-ssm-orb2"></div>

      <div className="bc-ssm-header">
        <div className="bc-ssm-user-avatar">
          <img src={socialLoginUserData.avatarUrl} alt={socialLoginUserData.name} />
        </div>
        <div className="bc-ssm-user-info">
          <p className="bc-ssm-user-name">{socialLoginUserData.name}</p>
          <p className="bc-ssm-user-email">{socialLoginUserData.email}</p>
          <p className="bc-ssm-google-pill">
            <img src={googleSvg} alt="google-signup" />
            Signed up with Google
          </p>
        </div>

        <div className="bc-ssm-close-btn" onClick={() => setShowSocialSignupModal(false)}>
          <X size={20} />
        </div>
      </div>

      <div className="bc-ssm-header-divider">Complete your profile </div>

      <div className="bc-ssm-form-body bc-form">
        <div className="bc-form-field">
          <label className="bc-form-label" htmlFor="username-modal">
            Username <span className="bc-form-label-required">*</span>
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
              id="username-modal"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setUserNameAvailable('');
              }}
              placeholder="user1234"
              minLength={3}
              maxLength={30}
              autoFocus
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
              disabled={!(userName && userName.length >= 3)}
              onClick={onCheckUsername}
            >
              {checkingUsername && <div className="bc-inline-spinner mr-1"></div>}
              <Search width={14} height={14} />
              <span>Check availability</span>
            </button>
          </div>
        </div>

        <div className="bc-form-field">
          <label className="bc-form-label" htmlFor="phone-modal">
            Phone Number <span className="bc-form-label-required">*</span>
          </label>
          <div className="bc-form-input-wrapper">
            <span className="bc-form-icon">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              className="bc-form-input has-icon"
              id="phone-modal"
              placeholder="98765 43210"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          className="bc-form-submit-btn primary"
          disabled={!(userName && userName.length >= 3 && phone && phone.length === 10)}
          onClick={handleCompleteSocialSignup}
        >
          {isCompletingProfile && <div className="bc-inline-spinner"></div>}
          {isCompletingProfile ? 'Completing your profile...' : 'Complete your profile'}
          <MoveRight size={10} />
        </button>

        <div className="bc-signup-terms">
          By creating an account you agree to our <a href="#">Terms of Service</a> and{' '}
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default SocialSignupModal;
