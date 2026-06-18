import { ContactRound, MessageCircleMore, Phone, UserRound, UserRoundSearch } from 'lucide-react';
import type ChatInterface from '../../interfaces/ChatInterface';
import type { ChatActiveTabs } from '../../pages/Chat';
import { useChatListStore } from '../../zustand/ChatListStore';
import './ChatSidebarMobile.scss';

type Props = {
  activeTab: ChatActiveTabs;
  setActiveTab: React.Dispatch<React.SetStateAction<ChatActiveTabs>>;
};

const ChatSidebarMobile = ({ activeTab, setActiveTab }: Props) => {
  const chats = useChatListStore((state) => state.chats);
  const newChatNotificationCount = chats.reduce(
    (cnt: number, chat: ChatInterface) => (chat?.unreadCount ? 1 : 0) + cnt,
    0,
  );

  return (
    <div className="bc-ChatSidebarMobile">
      <div
        className={`bc-csm-nav-item 
          ${activeTab === 'ChatList' ? 'active' : ''}`}
        onClick={() => setActiveTab('ChatList')}
        title="Chat List"
      >
        <div className="bc-csm-nav-item-content">
          <MessageCircleMore />
          <p className="bc-csm-nav-label">Chats</p>
        </div>

        {!!newChatNotificationCount && (
          <span className="bc-cs-nav-badge">{newChatNotificationCount}</span>
        )}
      </div>

      <div
        className={`bc-csm-nav-item 
          ${activeTab === 'Calls' ? 'active' : ''}`}
        onClick={() => setActiveTab('Calls')}
        title="Calls"
      >
        <div className="bc-csm-nav-item-content">
          <Phone />
          <p className="bc-csm-nav-label">Calls</p>
        </div>
      </div>

      <div
        className={`bc-csm-nav-item 
          ${activeTab === 'Friends' ? 'active' : ''}`}
        onClick={() => setActiveTab('Friends')}
        title="Friends"
      >
        <div className="bc-csm-nav-item-content">
          <ContactRound />
          <p className="bc-csm-nav-label">Friends</p>
        </div>
      </div>

      <div
        className={`bc-csm-nav-item 
          ${activeTab === 'Users' ? 'active' : ''}`}
        onClick={() => setActiveTab('Users')}
        title="Search Users"
      >
        <div className="bc-csm-nav-item-content">
          <UserRoundSearch />
          <p className="bc-csm-nav-label">Search</p>
        </div>
      </div>

      <div
        className={`bc-csm-nav-item 
          ${activeTab === 'Profile' ? 'active' : ''}`}
        onClick={() => setActiveTab('Profile')}
        title="Search Users"
      >
        <div className="bc-csm-nav-item-content">
          <UserRound />
          <p className="bc-csm-nav-label">Profile</p>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebarMobile;
