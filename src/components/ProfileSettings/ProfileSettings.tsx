import './ProfileSettings.scss';
import bcLogo from '../../assets/logo/bc-logo.svg';
import UserSettings from '../UserSettings/UserSettings';

type Props = {
  setShowLogOutModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileSettings = ({ setShowLogOutModal }: Props) => {
  return (
    <div className="bc-ProfileSettings">
      <div className="bc-panel-header">
        <div className="bc-panel-title-row">
          <div className="bc-panel-mobile-logo">
            <img src={bcLogo} alt="BaatChat" />
          </div>
          <h3 className="bc-panel-title">Profile Settings</h3>
        </div>
      </div>

      <div className="bc-profile-settings-content">
        <UserSettings setShowSettingsModal={() => {}} setShowLogOutModal={setShowLogOutModal} />
      </div>
    </div>
  );
};

export default ProfileSettings;
