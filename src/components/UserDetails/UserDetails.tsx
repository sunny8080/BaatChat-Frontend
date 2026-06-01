import {
  AtSign,
  Check,
  Clock,
  Copy,
  CopyCheck,
  Mail,
  MessageCircleMore,
  PenLine,
  Phone,
  Send,
  UserPlus,
  Video,
  X,
} from 'lucide-react';
import type UserInterface from '../../interfaces/UserInterface';
import './UserDetails.scss';
import { copyToClipboard, formatLastSeen, getRandomMorse } from '../../utils/utils';
import { FriendshipStatus } from '../../utils/constant';
import { useState, type Dispatch, type SetStateAction } from 'react';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from '../../services/usersServices';
import { useChatListStore } from '../../zustand/ChatListStore';
import type { ChatActiveTabs } from '../../pages/Chat';
import { useUsersStore } from '../../zustand/UsersStore';

type Props = {
  activeTab: ChatActiveTabs;
  setActiveTab: Dispatch<SetStateAction<ChatActiveTabs>>;
};

const randMorse = getRandomMorse();

const UserDetails = ({ activeTab, setActiveTab }: Props) => {
  const selectedFriend = useUsersStore((state) => state.selectedFriend);
  const selectedSearchUser = useUsersStore((state) => state.selectedSearchUser);
  const user: UserInterface | null = activeTab === 'Friends' ? selectedFriend : selectedSearchUser;

  const [copiedId, setCopiedId] = useState('');
  const [reqSent, setReqSent] = useState(false);
  const [reqAccepted, setReqAccepted] = useState(false);
  const [reqRejected, setReqRejected] = useState(false);
  const [reqCancelled, setReqCancelled] = useState(false);

  const startChat = useChatListStore((state) => state.startChat);

  const handleAcceptRequest = async (username: string) => {
    // optimistic UI, later if fails then change it back
    if (reqAccepted) return;
    setReqAccepted(true);
    const res = await acceptFriendRequest({ username });
    if (!(res && res.success)) {
      setReqAccepted(false);
    }
  };

  const handleRejectRequest = async (username: string) => {
    if (reqRejected) return;
    setReqRejected(true);
    const res = await rejectFriendRequest({ username });
    if (!(res && res.success)) {
      setReqRejected(false);
    }
  };

  const handleSendRequest = async (username: string) => {
    if (reqRejected) return;
    setReqSent(true);
    const res = await sendFriendRequest({ username });
    if (!(res && res.success)) {
      setReqSent(false);
    }
  };

  const handleCancelRequest = async (username: string) => {
    if (reqCancelled) return;
    setReqCancelled(true);
    const res = await cancelFriendRequest({ username });
    if (!(res && res.success)) {
      setReqCancelled(false);
    }
  };

  const handleStartMessage = () => {
    if (user) startChat(user);
    setActiveTab('ChatList');
  };

  return (
    <div className="bc-UserDetails">
      {!user && (
        <div className="bc-no-item">
          <div className="bc-ni-icon">
            <UserPlus />
          </div>
          <div className="bc-ni-title">Select a user to connect</div>
          <div className="bc-ni-sub">Choose a user or search for user to connect</div>
          <div className="bc-ni-morse" title={`Decode this - ${randMorse.hint}`}>
            {randMorse.morse}
          </div>
        </div>
      )}

      {user && (
        <div className="bc-user-details-wrap">
          <div className="bc-user-cover"></div>

          <div className="bc-user-name-avatar-wrap">
            <div className="bc-user-avatar">
              <img src={user.avatarUrl} alt={user.name} />
            </div>
            <div className="bc-user-name-container">
              <div className="bc-user-name">
                {user.name}

                {user?.status === FriendshipStatus.ACCEPTED && (
                  <span className="bc-user-friend">
                    <Check size={14} />
                    Friend
                  </span>
                )}
              </div>
              <div className="bc-user-username">@{user.username}</div>
            </div>
          </div>

          <div className="bc-user-bio">
            <span>
              <PenLine size={12} />
            </span>
            {user.bio}
          </div>

          {!user.status || user.status !== FriendshipStatus.ACCEPTED ? (
            <div className="bc-user-friend-request">
              {user.status === FriendshipStatus.REQUESTED && (
                <>
                  {!reqRejected && (
                    <button
                      className="bc-btn bc-btn-primary"
                      onClick={() => handleAcceptRequest(user.username!)}
                    >
                      <Check size={20} />
                      {reqAccepted ? 'Request accepted' : 'Accept request'}
                    </button>
                  )}

                  {!reqAccepted && (
                    <button
                      className="bc-btn warning-outline"
                      onClick={() => handleRejectRequest(user.username!)}
                    >
                      <X size={20} />
                      {reqRejected ? 'Request rejected' : 'Reject request'}
                    </button>
                  )}
                </>
              )}

              {!user.status && (
                <button
                  className="bc-btn bc-btn-primary"
                  onClick={() => handleSendRequest(user.username!)}
                >
                  <Send size={20} />
                  {reqSent ? 'Request sent' : 'Send request'}
                </button>
              )}

              {user.status === FriendshipStatus.PENDING && (
                <>
                  {!reqCancelled && (
                    <button className="bc-btn bc-btn-gold" style={{ cursor: 'default' }}>
                      <Clock size={20} />
                      Request Pending
                    </button>
                  )}

                  <button
                    className="bc-btn warning-outline"
                    onClick={() => handleCancelRequest(user.username!)}
                  >
                    <X size={20} />
                    {reqCancelled ? 'Request cancelled' : 'Cancel request'}
                  </button>
                </>
              )}
            </div>
          ) : null}

          {user.lastSeenAt && (
            <div className="bc-user-status">
              <div className={`bc-user-online-status ${user.isOnline ? 'online' : 'offline'} `}>
                {user.isOnline ? 'Online' : 'Offline'}
              </div>
              <div className="bc-user-last-seen">
                Last seen {formatLastSeen(user.lastSeenAt, user.isOnline)}{' '}
              </div>
            </div>
          )}

          {
            // if status is accepted then both users are friends
            user.status === 'accepted' && (
              <div className="bc-users-quick-actions">
                <div className="quick-action primary" onClick={handleStartMessage}>
                  <span>
                    <MessageCircleMore />
                  </span>
                  Message
                </div>

                <div className="quick-action" onClick={handleStartMessage}>
                  <span>
                    <Phone />
                  </span>
                  Audio Call
                </div>

                <div className="quick-action" onClick={handleStartMessage}>
                  <span>
                    <Video />
                  </span>
                  Video Cal
                </div>
              </div>
            )
          }

          <div className="bc-user-info">
            {/* TODO - future scope we can have different tabs like Media, Groups, Links specific to both users */}
            <div className="info-txt active">Info</div>

            <div className="bc-user-info-row">
              <div className="details">
                <div className="icon">
                  <AtSign />
                </div>
                <div className="info">
                  <p className="info-title">Username</p>
                  <p className="info-value">{user.username}</p>
                </div>
              </div>

              <div
                className={`copy-icon ${copiedId === `${user.id}-username` ? 'active' : ''}`}
                onClick={() => copyToClipboard(user.username!, `${user.id}-username`, setCopiedId)}
              >
                {copiedId === `${user.id}-username` ? <CopyCheck /> : <Copy />}
              </div>
            </div>

            {user.status === 'accepted' && (
              <>
                <div className="bc-user-info-row">
                  <div className="details">
                    <div className="icon">
                      <Mail />
                    </div>
                    <div className="info">
                      <p className="info-title">Email</p>
                      <p className="info-value">{user?.email}</p>
                    </div>
                  </div>

                  <div
                    className={`copy-icon ${copiedId === `${user.id}-email` ? 'active' : ''}`}
                    onClick={() => copyToClipboard(user.email!, `${user.id}-email`, setCopiedId)}
                  >
                    {copiedId === `${user.id}-email` ? <CopyCheck /> : <Copy />}
                  </div>
                </div>

                <div className="bc-user-info-row">
                  <div className="details">
                    <div className="icon">
                      <Phone />
                    </div>
                    <div className="info">
                      <p className="info-title">Phone</p>
                      <p className="info-value">{user?.phone}</p>
                    </div>
                  </div>

                  <div
                    className={`copy-icon ${copiedId === `${user.id}-phone` ? 'active' : ''}`}
                    onClick={() => copyToClipboard(user.phone!, `${user.id}-phone`, setCopiedId)}
                  >
                    {copiedId === `${user.id}-phone` ? <CopyCheck /> : <Copy />}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
