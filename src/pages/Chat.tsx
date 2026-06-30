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
import ChatSidebarMobile from '../components/ChatSidebarMobile/ChatSidebarMobile';
import ProfileSettings from '../components/ProfileSettings/ProfileSettings';
import CallList from '../components/CallList/CallList';
import FileList from '../components/FileList/FileList';
import SEOTags from '../components/SEOTags/SEOTags';

export type ChatActiveTabs = 'ChatList' | 'Calls' | 'Files' | 'Friends' | 'Users' | 'Profile';

const Chat = () => {
  const [activeTab, setActiveTab] = useState<ChatActiveTabs>('ChatList');
  const [showLogoutModal, setShowLogOutModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showMobilePanel2, setShowMobilePanel2] = useState(false);

  return (
    <div className="bc-Chat">
      <SEOTags
        title="Chats | BaatChat"
        description="Access your conversations, messages, voice calls, and video calls securely on BaatChat."
        canonicalLink={import.meta.env.VITE_FED_URL + '/chat'}
        image="chat.png"
        pageType="default"
        noIndex={true}
      />

      <div className="bc-chat-content">
        <div className="bc-chat-sidebar-container">
          <ChatSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setShowLogOutModal={setShowLogOutModal}
            setShowSettingsModal={setShowSettingsModal}
          />
        </div>

        <div className="bc-chat-panel-1">
          {(activeTab === 'Users' || activeTab === 'Friends') && (
            <SearchUsers
              activeTab={activeTab}
              setShowMobilePanel2={setShowMobilePanel2}
              key={activeTab}
            />
          )}

          {activeTab === 'ChatList' && (
            <ChatList
              setActiveTab={setActiveTab}
              key={activeTab}
              setShowMobilePanel2={setShowMobilePanel2}
            />
          )}

          {activeTab === 'Calls' && <CallList key={activeTab} />}

          {activeTab === 'Files' && <FileList key={activeTab} />}

          {activeTab === 'Profile' && (
            <ProfileSettings setShowLogOutModal={setShowLogOutModal} key={activeTab} />
          )}
        </div>

        <div className={`bc-chat-panel-2 ${showMobilePanel2 ? 'showMobilePanel2' : ''}`}>
          {(activeTab === 'Users' || activeTab === 'Friends') && (
            <UserDetails
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              setShowMobilePanel2={setShowMobilePanel2}
              key={activeTab}
            />
          )}
          {activeTab === 'ChatList' && <ChatDetails setShowMobilePanel2={setShowMobilePanel2} />}
        </div>
      </div>

      {!showMobilePanel2 && (
        <div className="bc-chat-sidebar-mobile-container">
          <ChatSidebarMobile activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      )}

      {showLogoutModal && (
        <Modal handleOverlayClick={() => setShowLogOutModal(false)}>
          <LogoutModal setShowLogOutModal={setShowLogOutModal} />
        </Modal>
      )}

      {showSettingsModal && (
        <Modal
          handleOverlayClick={() => setShowSettingsModal(false)}
          modalContentStyles={{ width: '100%', maxWidth: '560px', marginInline: '10px' }}
        >
          <UserSettings setShowSettingsModal={setShowSettingsModal} />
        </Modal>
      )}
    </div>
  );
};

export default Chat;
