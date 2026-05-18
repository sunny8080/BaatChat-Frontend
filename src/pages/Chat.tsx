import { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar/ChatSidebar';
import './Chat.scss';
import { logOutUser } from '../services/authService';
import toast from 'react-hot-toast';
import { BellOff, LogOut, MessageCircleMore, MoveLeft } from 'lucide-react';
import Modal from '../components/Modal/Modal';

export type ChatActiveTabs = 'ChatList' | 'Calls' | 'Files' | 'Users' | 'Settings' | 'Profile';

const Chat = () => {
  const [activeTab, setActiveTab] = useState<ChatActiveTabs>('ChatList');
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogOutModal] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    const res = await logOutUser();
    if (res && res.success) {
      toast.success('Logout successfully!');

      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    }
    setLoading(false);
  };

  return (
    <div className="bc-Chat">
      <div className="bc-chat-content">
        <ChatSidebar activeTab={activeTab} setActiveTab={setActiveTab} setShowLogOutModal={setShowLogOutModal} />
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
