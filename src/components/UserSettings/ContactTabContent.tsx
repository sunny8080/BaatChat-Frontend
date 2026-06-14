import { Mail } from 'lucide-react';
import { useState } from 'react';
import { type SettingsActiveTab } from './UserSettings';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { updateUserDetails } from '../../services/usersServices';

type Props = {
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentActiveTab: SettingsActiveTab;
};

const ContactTabContent = ({ setShowSettingsModal, currentActiveTab }: Props) => {
  const { user, setUser } = useAuth();
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [loading, setLoading] = useState(false);

  const onPhoneChange = (val: string) => {
    val = val.replace(/\D/g, '');
    setPhone(val);
  };
  const handlePhoneChange = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phone === user?.phone) return;

    if (phone.length !== 10) {
      return toast.error('Invalid phone no.');
    }

    setLoading(true);
    const res = await updateUserDetails({ phone });
    if (res && res.success) {
      setUser(res.data.user);
      toast.success('Phone no. updated successfully!');
    }
    setLoading(false);
  };

  return (
    <div
      className={`bc-ContactTabContent bc-user-settings-section-content ${currentActiveTab === 'Contact' ? 'active' : ''}`}
    >
      <div className="bc-uss-content-title">Contact Info</div>
      <div className="bc-uss-content-sub">
        Your email is already verified. Phone no. is used for account recovery.
      </div>

      <form className="bc-form" onSubmit={handlePhoneChange}>
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
              className="bc-form-input has-icon"
              id="email"
              placeholder="user@example.com"
              value={user?.email}
              disabled
            />
          </div>
          <div className="item-hint">Email can't be changed.</div>
        </div>

        <div className="bc-uss-content-divider"></div>

        <div className="bc-form-field">
          <label className="bc-form-label" htmlFor="phone">
            Phone Number
          </label>
          <div className="bc-form-input-wrapper">
            <span className="bc-form-icon">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              className="bc-form-input has-icon"
              id="phone"
              placeholder="98765 43210"
              maxLength={10}
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
            />
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
            disabled={phone === user?.phone || phone.length !== 10}
          >
            {loading && <div className="bc-inline-spinner"></div>}
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactTabContent;
