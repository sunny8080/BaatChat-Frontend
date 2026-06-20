import { CheckCheck, Clock, Download, Expand, File, Play, Smile } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type MessageInterface from '../../interfaces/MessageInterface';
import { downloadFile, formatFileSize, formatMsgTime, formatPlayTime } from '../../utils/utils';
import './MessageItem.scss';
import { useChatDetailsStore } from '../../zustand/ChatDetailsStore';
import type { ChatDetailsInterface } from '../../interfaces/ChatDetailsInterface';
import { ChatTypes, MessageTypes } from '../../utils/constant';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import FileViewer from '../FileViewer/FileViewer';

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
            </div>

            <div className="bc-msg-reaction-trigger">
              <Smile size={12} color="white" />+
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

          <div className="bc-msg-reactions-container hidden!"></div>

          <div className="bc-msg-reaction-picker"></div>
        </>
      )}

      {openFIleViewer && msg.attachments?.length && (
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
          />
        </Modal>
      )}
    </div>
  );
};

export default MessageItem;
