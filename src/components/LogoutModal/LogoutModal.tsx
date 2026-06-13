import { BellOff, LogOut, MessageCircleMore, MoveLeft } from 'lucide-react';
import './LogoutModal.scss';
import toast from 'react-hot-toast';
import socket from '../../socket/socket';
import { logOutUser } from '../../services/authService';
import { useState } from 'react';

type Props = {
  setShowLogOutModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogoutModal = ({ setShowLogOutModal }: Props) => {
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="bc-LogoutModal">
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
  );
};

export default LogoutModal;
