import './ChatSidebar.scss';
import bcLogo from '../../assets/logo/bc-logo.svg';
import {
  ContactRound,
  FolderOpen,
  LogOut,
  MessageCircleMore,
  Phone,
  Settings,
  UserRoundSearch,
} from 'lucide-react';
import type { ChatActiveTabs } from '../../pages/Chat';
import { useAuth } from '../../context/AuthContext';
import { useChatListStore } from '../../zustand/ChatListStore';
import type ChatInterface from '../../interfaces/ChatInterface';

type Props = {
  activeTab: ChatActiveTabs;
  setActiveTab: React.Dispatch<React.SetStateAction<ChatActiveTabs>>;
  setShowLogOutModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatSidebar = ({
  activeTab,
  setActiveTab,
  setShowLogOutModal,
  setShowSettingsModal,
}: Props) => {
  const { user } = useAuth();
  const chats = useChatListStore((state) => state.chats);
  const newChatNotificationCount = chats.reduce(
    (cnt: number, chat: ChatInterface) => (chat?.unreadCount ? 1 : 0) + cnt,
    0,
  );

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
          title="Chat List"
        >
          <MessageCircleMore />
          {!!newChatNotificationCount && (
            <span className="bc-cs-nav-badge">{newChatNotificationCount}</span>
          )}
        </div>
        <div
          className={`bc-cs-nav-item 
          ${activeTab === 'Calls' ? 'active' : ''}`}
          onClick={() => setActiveTab('Calls')}
          title="Calls"
        >
          <Phone />
        </div>
        <div
          className={`bc-cs-nav-item 
          ${activeTab === 'Files' ? 'active' : ''}`}
          onClick={() => setActiveTab('Files')}
          title="Files"
        >
          <FolderOpen />
        </div>
        <div
          className={`bc-cs-nav-item 
          ${activeTab === 'Friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('Friends')}
          title="Friends"
        >
          <ContactRound />
        </div>
        <div
          className={`bc-cs-nav-item 
          ${activeTab === 'Users' ? 'active' : ''}`}
          onClick={() => setActiveTab('Users')}
          title="Search Users"
        >
          <UserRoundSearch />
        </div>
      </div>

      <div className="bc-cs-bottom">
        <div className="bc-cs-nav-item" title="LogOut" onClick={() => setShowLogOutModal(true)}>
          <LogOut />
        </div>

        <div className="bc-cs-nav-item" title="Settings" onClick={() => setShowSettingsModal(true)}>
          <Settings />
        </div>

        <div
          className="bc-cs-nav-item bc-cs-avatar"
          title="User Profile"
          onClick={() => setShowSettingsModal(true)}
        >
          <img src={user!.avatarUrl!} alt={user?.name} />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
