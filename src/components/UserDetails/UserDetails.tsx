import {
  AtSign,
  Check,
  Clock,
  Copy,
  CopyCheck,
  Mail,
  MessageCircleMore,
  MoveLeft,
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
  getUserDetails,
  rejectFriendRequest,
  sendFriendRequest,
} from '../../services/usersServices';
import { useChatListStore } from '../../zustand/ChatListStore';
import type { ChatActiveTabs } from '../../pages/Chat';
import { useUsersStore } from '../../zustand/UsersStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Props = {
  activeTab: ChatActiveTabs;
  setActiveTab: Dispatch<SetStateAction<ChatActiveTabs>>;
  setShowMobilePanel2: React.Dispatch<React.SetStateAction<boolean>>;
};

const randMorse = getRandomMorse();

const UserDetails = ({ activeTab, setActiveTab, setShowMobilePanel2 }: Props) => {
  const startChat = useChatListStore((state) => state.startChat);
  const [copiedId, setCopiedId] = useState('');
  const [reqSent, setReqSent] = useState(false);
  const [reqAccepted, setReqAccepted] = useState(false);
  const [reqRejected, setReqRejected] = useState(false);
  const [reqCancelled, setReqCancelled] = useState(false);

  const isFriendTab = activeTab === 'Friends';
  const selectedFriendUsername = useUsersStore((state) => state.selectedFriendUsername);
  const selectedSearchUserUsername = useUsersStore((state) => state.selectedSearchUserUsername);
  const setSelectedSearchUserUsername = useUsersStore(
    (state) => state.setSelectedSearchUserUsername,
  );
  const setSelectedFriendUsername = useUsersStore((state) => state.setSelectedFriendUsername);
  const selectedUserUsername = isFriendTab ? selectedFriendUsername : selectedSearchUserUsername;
  const queryClient = useQueryClient();

  // react query to load user details
  const { data: user, isLoading } = useQuery<UserInterface | null>({
    queryKey: ['user', selectedUserUsername],
    queryFn: async () => {
      const res = await getUserDetails({ username: selectedUserUsername });
      return res && res.success ? res.data?.user : null;
    },
    enabled: !!selectedUserUsername,
    staleTime: 60 * 60 * 1000,
  });

  // tanstack mutation to accept friend request
  const acceptFriendRequestMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onMutate: () => {
      // optimistic UI, later if fails then change it back
      setReqAccepted(true);
    },
    onSuccess: (res, arg) => {
      if (res && res.success) {
        queryClient.invalidateQueries({
          queryKey: ['user', arg.username],
        });
        queryClient.invalidateQueries({
          queryKey: ['friends'],
        });
        queryClient.removeQueries({
          queryKey: ['friendRequests'],
        });
      }
    },
    onError: () => {
      // rollback changes
      setReqAccepted(false);
    },
  });

  const handleAcceptRequest = async (username: string) => {
    if (reqAccepted) return;
    acceptFriendRequestMutation.mutate({ username });
  };

  const handleRejectRequest = async (username: string) => {
    if (reqRejected) return;
    setReqRejected(true);
    const res = await rejectFriendRequest({ username });
    if (res && res.success) {
      queryClient.removeQueries({
        queryKey: ['friendRequests'],
      });
    } else {
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
    if (res && res.success) {
      queryClient.removeQueries({
        queryKey: ['friendRequests'],
      });
    } else {
      setReqCancelled(false);
    }
  };

  const handleStartMessage = () => {
    if (user) startChat(user);
    if (reqAccepted) {
      setSelectedSearchUserUsername('');
    }
    setActiveTab('ChatList');
  };

  const handleMobileBackBtnClick = () => {
    setShowMobilePanel2(false);

    if (isFriendTab) {
      setSelectedFriendUsername('');
    } else {
      setSelectedSearchUserUsername('');
    }
  };

  return (
    <div className="bc-UserDetails">
      <div className="bc-cd-mobile-back-btn" onClick={handleMobileBackBtnClick}>
        <MoveLeft size={16} />
      </div>

      {isLoading && (
        <div className="bc-loading-user-details">
          <div className="bc-inline-spinner"></div> Loading user info...
        </div>
      )}

      {!isLoading && !user && (
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

      {!isLoading && user && (
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

          {user.bio && (
            <div className="bc-user-bio">
              <span>
                <PenLine size={12} />
              </span>
              {user.bio}
            </div>
          )}

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
