import { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar/ChatSidebar';
import './Chat.scss';
import { logOutUser } from '../services/authService';
import toast from 'react-hot-toast';
import { BellOff, LogOut, MessageCircleMore, MoveLeft } from 'lucide-react';
import Modal from '../components/Modal/Modal';
import { socket } from '../socket/socket';
import SearchUsers from '../components/SearchUsers/SearchUsers';
import UserDetails from '../components/UserDetails/UserDetails';
import type UserInterface from '../interfaces/UserInterface';
import { getUserDetails } from '../services/usersServices';
import ChatList from '../components/ChatList/ChatList';
import ChatDetails from '../components/ChatDetails/ChatDetails';

export type ChatActiveTabs = 'ChatList' | 'Calls' | 'Files' | 'Friends' | 'Users' | 'Settings' | 'Profile';

const Chat = () => {
  const [activeTab, setActiveTab] = useState<ChatActiveTabs>('ChatList');
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogOutModal] = useState(false);

  // Related to user details
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
  const [_, setFetchingUserDetails] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    const res = await logOutUser();
    if (res && res.success) {
      toast.success('Logout successfully!');
      socket.disconnect();

      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    }
    setLoading(false);
  };

  const handleUserItemClick = async (username: string) => {
    setFetchingUserDetails(true);
    const res = await getUserDetails({ username });
    if (res && res.success) {
      setSelectedUser(res.data?.user);
    }
    setFetchingUserDetails(false);
  };

  return (
    <div className="bc-Chat">
      <div className="bc-chat-content">
        <div className="bc-chat-sidebar-container">
          <ChatSidebar activeTab={activeTab} setActiveTab={setActiveTab} setShowLogOutModal={setShowLogOutModal} />
        </div>

        <div className="bc-chat-panel-1">
          {(activeTab === 'Users' || activeTab === 'Friends') && <SearchUsers selectedUser={selectedUser} handleUserItemClick={handleUserItemClick} setSelectedUser={setSelectedUser} activeTab={activeTab} key={activeTab} />}

          {activeTab === 'ChatList' && <ChatList setActiveTab={setActiveTab} key={activeTab} />}
        </div>

        <div className="bc-chat-panel-2">
          {(activeTab === 'Users' || activeTab === 'Friends') && <UserDetails user={selectedUser} key={selectedUser?.id} />}
          {activeTab === 'ChatList' && <ChatDetails />}
        </div>
      </div>

      {showLogoutModal && (
        <Modal handleOverlayClick={() => setShowLogOutModal(false)}>
          <div className="bc-logout-modal-content">
            <div className="bc-logout-modal-bar"></div>
            <div className="bc-logout-icon">
              <LogOut />
            </div>

            <div className="bc-logout-txt">Sign out?</div>
            <p className="bc-logout-sub">You'll be signed out of your BaatChat account on this device.</p>

            <div className="bc-logout-info-rows">
              <div className="bc-logout-info">
                <span>
                  <MessageCircleMore size={20} />
                </span>
                Your chats and messages will be safe
              </div>

              <div className="bc-logout-info">
                <span>
                  <BellOff size={20} />
                </span>
                You won't receive notifications until you sign back in
              </div>
            </div>

            <div className="bc-logout-ctas">
              <button className="bc-btn warning" onClick={handleLogout}>
                {loading && <div className="bc-inline-spinner"></div>}
                {loading ? 'Logging out...' : 'Log out'}
              </button>

              <button className="bc-btn bc-btn-primary" onClick={() => setShowLogOutModal(false)}>
                <span>
                  <MoveLeft size={16} />
                </span>
                Stay Signed In
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Chat;
