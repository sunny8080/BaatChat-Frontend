import { AtSign, Lock, Phone, Settings, UserRound, X } from 'lucide-react';
import './UserSettings.scss';
import { useState } from 'react';
import PasswordTabContent from './PasswordTabContent';
import ContactTabContent from './ContactTabContent';
import UsernameTabContent from './UsernameTabContent';
import ProfileTabContent from './ProfileTabContent';

type Props = {
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export type SettingsActiveTab = 'Profile' | 'Username' | 'Contact' | 'Password';

const UserSettings = ({ setShowSettingsModal }: Props) => {
  const [currentActiveTab, setCurrentActiveTab] = useState<SettingsActiveTab>('Profile');

  return (
    <div className="bc-UserSettings">
      <div className="bc-user-settings-orb1"></div>
      <div className="bc-user-settings-orb2"></div>
      <div className="bc-user-settings-header">
        <div className="bc-user-settings-title">
          <span className="bc-user-settings-icon">
            <Settings size={22} />
          </span>
          <span>Settings</span>
        </div>

        <div className="bc-user-settings-close-btn" onClick={() => setShowSettingsModal(false)}>
          <X size={22} />
        </div>
      </div>

      <div className="bc-user-settings-body">
        {/* Sidebar in settings panel */}
        <div className="bc-user-settings-sidebar">
          <div className="bc-uss-section">
            <div className="bc-us-section-title">Profile</div>

            <div
              className={`bc-us-section-item ${currentActiveTab === 'Profile' ? 'active' : ''}`}
              onClick={() => setCurrentActiveTab('Profile')}
            >
              <span className="item-icon">
                <UserRound size={20} />
              </span>
              <span className="item-text">Profile</span>
            </div>

            <div
              className={`bc-us-section-item ${currentActiveTab === 'Username' ? 'active' : ''}`}
              onClick={() => setCurrentActiveTab('Username')}
            >
              <span className="item-icon">
                <AtSign size={20} />
              </span>
              <span className="item-text">Username</span>
            </div>

            <div
              className={`bc-us-section-item ${currentActiveTab === 'Contact' ? 'active' : ''}`}
              onClick={() => setCurrentActiveTab('Contact')}
            >
              <span className="item-icon">
                <Phone size={20} />
              </span>
              <span className="item-text">Phone</span>
            </div>
          </div>

          <div className="bc-uss-section">
            <div className="bc-us-section-title">Security</div>

            <div
              className={`bc-us-section-item ${currentActiveTab === 'Password' ? 'active' : ''}`}
              onClick={() => setCurrentActiveTab('Password')}
            >
              <span className="item-icon">
                <Lock size={20} />
              </span>
              <span className="item-text">Password</span>
            </div>
          </div>
        </div>

        {/* Content in settings panel */}
        <div className="bc-user-settings-content">
          {currentActiveTab === 'Profile' && (
            <ProfileTabContent
              setShowSettingsModal={setShowSettingsModal}
              currentActiveTab={currentActiveTab}
            />
          )}

          {currentActiveTab === 'Username' && (
            <UsernameTabContent
              setShowSettingsModal={setShowSettingsModal}
              currentActiveTab={currentActiveTab}
            />
          )}

          {currentActiveTab === 'Contact' && (
            <ContactTabContent
              setShowSettingsModal={setShowSettingsModal}
              currentActiveTab={currentActiveTab}
            />
          )}

          {currentActiveTab === 'Password' && (
            <PasswordTabContent
              setShowSettingsModal={setShowSettingsModal}
              currentActiveTab={currentActiveTab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
