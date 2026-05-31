import {
  AtSign,
  Ban,
  CalendarDays,
  Copy,
  CopyCheck,
  FlagTriangleRight,
  Hand,
  Mail,
  MessageCircleMore,
  Pencil,
  PenLine,
  Phone,
  Video,
  X,
} from 'lucide-react';
import { useChatDetailsStore } from '../../zustand/ChatDetailsStore';
import './ChatInfo.scss';
import type React from 'react';
import { ChatTypes } from '../../utils/constant';
import { copyToClipboard, countOnlineMembers, formatLastSeen } from '../../utils/utils';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  setShowChatInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatInfo = ({ setShowChatInfo }: Props) => {
  const { user } = useAuth();
  const chatDetails = useChatDetailsStore((state) => state.chatDetails);
  const isPersonal = chatDetails?.type === ChatTypes.PERSONAL;
  const friend = chatDetails?.friend;
  const [copiedId, setCopiedId] = useState('');

  // TODO sort members, admins must be at the top
  const sortedMembers = chatDetails?.activeMembers;
  const creator = chatDetails?.activeMembers
    ?.filter(({ id }) => id === chatDetails.createdBy)
    .at(0);

  if (!chatDetails) return;

  console.log(chatDetails);

  return (
    <div className="bc-ChatInfo">
      <div className="bc-chat-info-header">
        <div className="bc-ci-title">
          <span>{isPersonal ? 'Contact Info' : 'Group Info'}</span>
          <span className={`bc-ci-badge ${isPersonal ? 'vlt' : 'gld'}`}>
            {isPersonal ? 'DM' : 'GROUP'}
          </span>
        </div>

        <div className="bc-ci-close-btn" onClick={() => setShowChatInfo(false)}>
          <X size={20} />
        </div>
      </div>

      <div className="bc-chat-info-body">
        <div className="bc-ci-cover"></div>
        <div className="bc-ci-profile">
          <div
            className={`bc-ci-avatar ${isPersonal ? (friend?.isOnline ? 'online' : 'offline') : ''}`}
          >
            <img src={chatDetails?.avatarUrl} alt={chatDetails?.name} />
          </div>

          <div className="bc-ci-name">{chatDetails?.name}</div>
          <div className="bc-ci-sub">
            {isPersonal ? (
              <span>@{friend?.username}</span>
            ) : (
              <>
                <span>{chatDetails?.activeMembers?.length} members</span>
                <span style={{ color: 'var(--border-color)' }}>·</span>
                <span className="bc-ci-online-cnt">
                  {countOnlineMembers(chatDetails?.activeMembers)} online
                </span>
              </>
            )}
          </div>
          <div className="bc-ci-desc">
            <span>
              <PenLine size={12} />
            </span>
            {isPersonal ? friend?.bio : chatDetails?.description}
          </div>

          {isPersonal && (
            <div className="bc-ci-status">
              <div className={`bc-ci-online-status ${friend?.isOnline ? 'online' : 'offline'} `}>
                {friend ? 'Online' : 'Offline'}
              </div>
              <div className="bc-ci-last-seen">
                Last seen {formatLastSeen(friend!.lastSeenAt!, friend!.isOnline)}{' '}
              </div>
            </div>
          )}
        </div>
        <div className="bc-ci-quick-actions">
          <div className="bc-ci-quick-action primary" onClick={() => setShowChatInfo(false)}>
            <span>
              <MessageCircleMore />
            </span>
            Message
          </div>
          <div className="bc-ci-quick-action" onClick={() => setShowChatInfo(false)}>
            <span>
              <Phone />
            </span>
            Audio Call
          </div>
          <div className="bc-ci-quick-action" onClick={() => setShowChatInfo(false)}>
            <span>
              <Video />
            </span>
            Video Cal
          </div>
        </div>

        {/* Contact Info for personal chats */}
        {isPersonal && friend && (
          <div className="bc-ci-dm-contact-info bc-ci-info-section">
            <div className="bc-ci-info-label">Contact Info</div>

            <div className="bc-ci-info-row">
              <div className="bc-ci-info-content">
                <div className="bc-ci-info-icon">
                  <AtSign size={20} />
                </div>
                <div className="bc-ci-info-body">
                  <p className="bc-ci-info-key">Username</p>
                  <p className="bc-ci-info-val">{friend?.username}</p>
                </div>
              </div>

              <div
                className={`bc-ci-info-copy ${copiedId === `${friend.id}-username` ? 'active' : ''}`}
                onClick={() =>
                  copyToClipboard(friend.username!, `${friend.id}-username`, setCopiedId)
                }
              >
                {copiedId === `${friend.id}-username` ? (
                  <CopyCheck size={20} />
                ) : (
                  <Copy size={20} />
                )}
              </div>
            </div>

            <div className="bc-ci-info-row">
              <div className="bc-ci-info-content">
                <div className="bc-ci-info-icon">
                  <Mail size={20} />
                </div>
                <div className="bc-ci-info-body">
                  <p className="bc-ci-info-key">Email</p>
                  <p className="bc-ci-info-val">{friend?.email}</p>
                </div>
              </div>

              <div
                className={`bc-ci-info-copy ${copiedId === `${friend.id}-email` ? 'active' : ''}`}
                onClick={() => copyToClipboard(friend.email!, `${friend.id}-email`, setCopiedId)}
              >
                {copiedId === `${friend.id}-email` ? <CopyCheck size={20} /> : <Copy size={20} />}
              </div>
            </div>

            <div className="bc-ci-info-row">
              <div className="bc-ci-info-content">
                <div className="bc-ci-info-icon">
                  <Phone size={20} />
                </div>
                <div className="bc-ci-info-body">
                  <p className="bc-ci-info-key">Phone</p>
                  <p className="bc-ci-info-val">{friend?.phone}</p>
                </div>
              </div>

              <div
                className={`bc-ci-info-copy ${copiedId === `${friend.id}-phone` ? 'active' : ''}`}
                onClick={() => copyToClipboard(friend.phone!, `${friend.id}-phone`, setCopiedId)}
              >
                {copiedId === `${friend.id}-phone` ? <CopyCheck size={20} /> : <Copy size={20} />}
              </div>
            </div>
          </div>
        )}

        {/* Group Description for group chats */}
        {!isPersonal && (
          <>
            <div className="bc-ci-grp-desc bc-ci-info-section">
              <div className="bc-ci-info-label">Description</div>
              {/* TODO - provide button to add grp description */}
              <div className="desc-box">{chatDetails.description}</div>
            </div>

            {/* Group Info */}
            <div className="bc-ci-grp-info bc-ci-info-section">
              <div className="bc-ci-info-label">Group Info</div>

              <div className="bc-ci-info-row">
                <div className="bc-ci-info-content">
                  <div className="bc-ci-info-icon">
                    <Pencil size={20} />
                  </div>
                  <div className="bc-ci-info-body">
                    <p className="bc-ci-info-key">Group name</p>
                    <p className="bc-ci-info-val" style={{ textTransform: 'capitalize' }}>
                      {chatDetails.name}
                    </p>
                  </div>
                </div>

                <div
                  className={`bc-ci-info-copy ${copiedId === `${chatDetails.id}-groupname` ? 'active' : ''}`}
                  onClick={() =>
                    copyToClipboard(chatDetails.name, `${chatDetails.id}-groupname`, setCopiedId)
                  }
                >
                  {copiedId === `${chatDetails.id}-groupname` ? (
                    <CopyCheck size={20} />
                  ) : (
                    <Copy size={20} />
                  )}
                </div>
              </div>

              <div className="bc-ci-info-row">
                <div className="bc-ci-info-content">
                  <div className="bc-ci-info-icon">
                    <CalendarDays size={20} />
                  </div>
                  <div className="bc-ci-info-body">
                    <p className="bc-ci-info-key">Created on</p>
                    <p className="bc-ci-info-val">
                      {dayjs(chatDetails.createdAt).tz('Asia/Kolkata').format('D MMM YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Group creator */}
            <div className="bc-ci-grp-created-by bc-ci-info-section">
              <div className="bc-ci-info-label">Created By</div>

              <div className="bc-ci-info-row">
                <div className="bc-ci-info-content">
                  <div className={`bc-ci-info-avatar ${creator?.isOnline ? 'online' : 'offline'}`}>
                    <img src={creator?.avatarUrl} alt={creator?.name} />
                  </div>
                  <div className="bc-ci-info-body">
                    <p className="bc-ci-info-key">{creator?.name}</p>
                    <p className="bc-ci-info-val">{creator?.username}</p>
                  </div>
                </div>

                <div className="bc-info-batch-container">
                  {creator!.id === user?.id && <div className="bc-ci-badge grn">You</div>}
                  <div className="bc-ci-badge vlt">Creator</div>
                </div>
              </div>
            </div>

            {/* Group Members */}
            <div className="bc-ci-grp-members bc-ci-info-section">
              <div className="bc-ci-info-label">Members</div>

              {sortedMembers?.map((mem, ind) => {
                return (
                  <div className="bc-ci-info-row" key={ind}>
                    <div className="bc-ci-info-content">
                      <div className={`bc-ci-info-avatar ${mem?.isOnline ? 'online' : 'offline'}`}>
                        <img src={mem?.avatarUrl} alt={mem?.name} />
                      </div>
                      <div className="bc-ci-info-body">
                        <p className="bc-ci-info-key">{mem?.name}</p>
                        <p className="bc-ci-info-val">{mem?.username}</p>
                      </div>
                    </div>

                    <div className="bc-info-batch-container">
                      {mem!.id === user?.id && <div className="bc-ci-badge grn">You</div>}
                      {chatDetails.admins?.includes(mem.id) && (
                        <div className="bc-ci-badge gld">Admin</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Chat Options */}
        <div className="bc-ci-options bc-ci-info-section">
          <div className="bc-ci-info-label">Options</div>

          {/* TODO - add functionalities here */}
          {isPersonal ? (
            <div className="bc-ci-cta danger">
              <Ban size={20} />
              Block User
            </div>
          ) : (
            <div className="bc-ci-cta warning">
              <Hand size={20} style={{ rotate: '-30deg' }} />
              Leave Group
            </div>
          )}

          <div className="bc-ci-cta danger">
            <span>
              <FlagTriangleRight size={20} />
            </span>
            Report {isPersonal ? 'User' : 'Group'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
