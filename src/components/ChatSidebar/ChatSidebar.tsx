import './ChatSidebar.scss';
import bcLogo from '../../assets/logo/bc-logo.svg';
import { ContactRound, FolderOpen, LogOut, MessageCircleMore, Phone, Settings, UserRoundSearch } from 'lucide-react';
import type { ChatActiveTabs } from '../../pages/Chat';
import { useAuth } from '../../context/AuthContext';
import { getAvatarTxt } from '../../utils/utils';

type Props = {
  activeTab: ChatActiveTabs;
  setActiveTab: React.Dispatch<React.SetStateAction<ChatActiveTabs>>;
  setShowLogOutModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatSidebar = ({ activeTab, setActiveTab, setShowLogOutModal }: Props) => {
  const { user } = useAuth();

  if (!user) return;

  return (
    <div className="bc-ChatSidebar">
      <div className="bc-cs-top">
        <div className="bc-cs-logo">
          <img src={bcLogo} alt="BaatChat" />
        </div>

        <div
          className={`bc-cs-nav-item 
          ${activeTab === 'ChatList' ? 'active' : ''}`}
          onClick={() => setActiveTab('ChatList')}
          title="Chat List">
          <MessageCircleMore />
          <span className="bc-cs-nav-badge">3</span>
        </div>
        <div
          className={`bc-cs-nav-item 
          ${activeTab === 'Calls' ? 'active' : ''}`}
          onClick={() => setActiveTab('Calls')}
          title="Calls">
          <Phone />
        </div>
        <div
          className={`bc-cs-nav-item 
          ${activeTab === 'Files' ? 'active' : ''}`}
          onClick={() => setActiveTab('Files')}
          title="Files">
          <FolderOpen />
        </div>
        <div
          className={`bc-cs-nav-item 
          ${activeTab === 'Friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('Friends')}
          title="Friends">
          <ContactRound />
        </div>
        <div
          className={`bc-cs-nav-item 
          ${activeTab === 'Users' ? 'active' : ''}`}
          onClick={() => setActiveTab('Users')}
          title="Search Users">
          <UserRoundSearch />
        </div>
      </div>

      <div className="bc-cs-bottom">
        <div className="bc-cs-nav-item" title="LogOut" onClick={() => setShowLogOutModal(true)}>
          <LogOut />
        </div>

        <div className="bc-cs-nav-item" title="Settings">
          <Settings />
        </div>

        <div className="bc-cs-nav-item bc-cs-avatar" title="User Profile">
          <img src={user!.avatarUrl!} alt={user?.name} />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
