import { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar/ChatSidebar';
import './Chat.scss';
import Modal from '../components/Modal/Modal';
import SearchUsers from '../components/SearchUsers/SearchUsers';
import UserDetails from '../components/UserDetails/UserDetails';
import ChatList from '../components/ChatList/ChatList';
import ChatDetails from '../components/ChatDetails/ChatDetails';
import UserSettings from '../components/UserSettings/UserSettings';
import LogoutModal from '../components/LogoutModal/LogoutModal';

export type ChatActiveTabs = 'ChatList' | 'Calls' | 'Files' | 'Friends' | 'Users';

const Chat = () => {
  const [activeTab, setActiveTab] = useState<ChatActiveTabs>('ChatList');
  const [showLogoutModal, setShowLogOutModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(true);

  return (
    <div className="bc-Chat">
      <div className="bc-chat-content">
        <div className="bc-chat-sidebar-container">
          <ChatSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setShowLogOutModal={setShowLogOutModal}
          />
        </div>

        <div className="bc-chat-panel-1">
          {(activeTab === 'Users' || activeTab === 'Friends') && (
            <SearchUsers activeTab={activeTab} key={activeTab} />
          )}

          {activeTab === 'ChatList' && <ChatList setActiveTab={setActiveTab} key={activeTab} />}
        </div>

        <div className="bc-chat-panel-2">
          {(activeTab === 'Users' || activeTab === 'Friends') && (
            <UserDetails setActiveTab={setActiveTab} activeTab={activeTab} key={activeTab} />
          )}
          {activeTab === 'ChatList' && <ChatDetails />}
        </div>
      </div>

      {showLogoutModal && (
        <Modal handleOverlayClick={() => setShowLogOutModal(false)}>
          <LogoutModal setShowLogOutModal={setShowLogOutModal} />
        </Modal>
      )}

      {showSettingsModal && (
        <Modal handleOverlayClick={() => setShowSettingsModal(false)}>
          <UserSettings setShowSettingsModal={setShowSettingsModal} />
        </Modal>
      )}
    </div>
  );
};

export default Chat;
