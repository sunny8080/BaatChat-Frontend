import {
  CheckCheck,
  ChevronDown,
  Clock,
  Download,
  Expand,
  File,
  MessageSquareX,
  Play,
  Plus,
  Reply,
  Smile,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type MessageInterface from '../../interfaces/MessageInterface';
import {
  canDeleteForEveryone,
  downloadFile,
  formatFileSize,
  formatMsgTime,
  formatPlayTime,
} from '../../utils/utils';
import './MessageItem.scss';
import { useChatDetailsStore } from '../../zustand/ChatDetailsStore';
import type { ChatDetailsInterface } from '../../interfaces/ChatDetailsInterface';
import { ChatTypes, MessageTypes } from '../../utils/constant';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import FileViewer from '../FileViewer/FileViewer';
import socket from '../../socket/socket';
import { MESSAGE_EVENTS } from '../../socket/socketEvents';
import { removeMessageInCache } from '../../tanstack/queryClient';
import toast from 'react-hot-toast';

type Props = {
  msg: MessageInterface;
};

const MessageItem = ({ msg }: Props) => {
  const { user } = useAuth();
  const isCurrentUserIsSender = msg.sender?.id === user?.id;
  const isNotification = msg.type === MessageTypes.NOTIFICATION;
  const chatDetails: ChatDetailsInterface | null = useChatDetailsStore(
    (state) => state.chatDetails,
  );
  const [openFIleViewer, setOpenFileViewer] = useState(false);
  const [showMsgTooltip, setShowMsgTooltip] = useState(false);
  const msgTooltipRef = useRef<HTMLDivElement>(null);
  const tooltipTriggerRef = useRef<HTMLDivElement>(null);
  const removeMessage = useChatDetailsStore((state) => state.removeMessage);

  useEffect(() => {
    if (!showMsgTooltip) return;
    const handleOutSideClick = (e: PointerEvent) => {
      if (
        msgTooltipRef.current &&
        !msgTooltipRef.current.contains(e.target as Node) &&
        !tooltipTriggerRef.current?.contains(e.target as Node)
      ) {
        setShowMsgTooltip(false);
      }
    };
    const handleScroll = () => {
      setShowMsgTooltip(false);
    };

    document.addEventListener('scroll', handleScroll, { capture: true });
    document.addEventListener('pointerdown', handleOutSideClick);

    return () => {
      document.removeEventListener('pointerdown', handleOutSideClick);
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [showMsgTooltip]);

  useLayoutEffect(() => {
    const tooltip = msgTooltipRef.current;
    if (!showMsgTooltip || !tooltip) return;

    const rect = tooltip.getBoundingClientRect();

    // fix bottom clipping
    if (rect.bottom + 80 > window.innerHeight) {
      tooltip.style.top = 'auto';
      tooltip.style.bottom = 'calc(50% + 16px)';
    }

    // fix left clipping
    if (rect.left < 0) {
      const left = parseFloat(getComputedStyle(tooltip).left);
      tooltip.style.left = `${left - rect.left + 5}px`;
    }

    // fix right clipping
    if (rect.right > window.innerWidth) {
      const right = parseFloat(getComputedStyle(tooltip).right);
      tooltip.style.right = `${right + (rect.right - window.innerWidth) + 5}px`;
    }
  }, [showMsgTooltip]);

  const handleDeleteMsg = (forEveryone: boolean) => {
    removeMessage(msg.id);

    socket.emit(
      MESSAGE_EVENTS.DELETE,
      { chatId: msg.chat, msgId: msg.id, forEveryone },
      (response: any) => {
        if (response.ok) {
          removeMessageInCache(msg.chat!, msg.id);
        } else {
          // TODO - handle error scenario
          toast.error("Couldn't delete message");
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }
      },
    );
  };

  return (
    <div
      className={`bc-MessageItem ${isNotification ? 'notification' : isCurrentUserIsSender ? 'msgOut' : 'msgIn'}`}
    >
      {isNotification && (
        <div className="bc-msg-content-wrapper">
          <div className="bc-msg-content">{msg.text}</div>
        </div>
      )}

      {!isNotification && (
        <>
          <div className="bc-msg-content-wrapper">
            {chatDetails?.type === ChatTypes.GROUP && !isCurrentUserIsSender && (
              <div className="bc-msg-avatar">
                <img src={msg.sender?.avatarUrl} alt={msg.sender?.name} />
              </div>
            )}

            <div className="bc-msg-content">
              {msg.type === MessageTypes.AUDIO && (
                <div className="bc-msg-audio">
                  <AudioPlayer
                    audioUrl={msg.attachments![0].url}
                    audioWaveform={msg.attachments![0].waveform}
                  />
                </div>
              )}

              {msg.type === MessageTypes.IMAGE && (
                <div className="bc-msg-image-video" onClick={() => setOpenFileViewer(true)}>
                  <img src={msg.attachments?.[0].url} alt="" />
                  <div className="bc-msg-image-overlay">
                    <span>
                      <Expand size={20} />
                    </span>
                  </div>
                </div>
              )}

              {msg.type === MessageTypes.VIDEO && (
                <div className="bc-msg-image-video" onClick={() => setOpenFileViewer(true)}>
                  <img src={msg.attachments?.[0].thumbnailUrl} alt="" />

                  <div className="bc-msg-video-overlay">
                    <span className="play-btn">
                      <Play size={20} />
                    </span>
                    <span className="video-duration">
                      {formatPlayTime(msg.attachments?.[0].duration)}
                    </span>
                  </div>
                </div>
              )}

              {msg.type === MessageTypes.FILE && (
                <div className="bc-msg-file">
                  <div className="bc-msg-file-icon">
                    <span>
                      <File size={20} />
                    </span>
                  </div>

                  <div className="bc-msg-file-details">
                    <div className="file-name">{msg.attachments?.[0].fileName}</div>
                    <div className="file-size">{formatFileSize(msg.attachments?.[0].size)}</div>
                  </div>
                  <div
                    className="bc-msg-file-download-btn"
                    onClick={() => {
                      downloadFile(msg.attachments?.[0].url, msg.attachments?.[0].fileName);
                    }}
                  >
                    <Download size={20} />
                  </div>
                </div>
              )}

              {msg.text && <div className="bc-msg-txt">{msg.text}</div>}

              <div
                className="bc-msg-settings-trigger"
                onClick={() => setShowMsgTooltip((prev) => !prev)}
                ref={tooltipTriggerRef}
              >
                <ChevronDown size={14} color="white" />
                <span className="plusIcon">
                  <Plus size={10} color="white" />
                </span>
              </div>

              {showMsgTooltip && (
                <>
                  <div className="bc-msg-settings-tooltip" ref={msgTooltipRef}>
                    <div className="bc-msg-setting">
                      <Reply />
                      <span>Reply</span>
                    </div>

                    <div className="bc-msg-setting">
                      <Smile />
                      <span>React</span>
                    </div>

                    <div className="bc-msg-setting danger" onClick={() => handleDeleteMsg(false)}>
                      <Trash2 />
                      <span>Delete for Me</span>
                    </div>

                    {isCurrentUserIsSender && canDeleteForEveryone(msg.createdAt!) && (
                      <div className="bc-msg-setting danger" onClick={() => handleDeleteMsg(true)}>
                        <MessageSquareX />
                        <span>Delete for Everyone</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bc-msg-time">
            {formatMsgTime(msg.createdAt!)}
            {isCurrentUserIsSender && (
              <span className="msg-sent-check">
                {msg.sending ? <Clock size={12} /> : <CheckCheck size={14} />}
              </span>
            )}
          </div>

          {/* <div className="bc-msg-reactions-container hidden!"></div> */}

          {/* <div className="bc-msg-reaction-picker"></div> */}
        </>
      )}

      {openFIleViewer &&
        msg.attachments?.length &&
        (msg.type === MessageTypes.IMAGE || msg.type === MessageTypes.VIDEO) && (
          <Modal
            handleOverlayClick={() => setOpenFileViewer(false)}
            modalContentStyles={{ width: '100%', height: '100%' }}
          >
            <FileViewer
              type={msg.type}
              fileUrl={msg.attachments[0].url}
              fileName={msg.attachments[0].fileName}
              sender={msg.sender}
              closeFileViewer={() => setOpenFileViewer(false)}
              createdAt={msg.createdAt}
              showDownloadBtn={true}
              showShareBtn={true}
            />
          </Modal>
        )}
    </div>
  );
};

export default MessageItem;
