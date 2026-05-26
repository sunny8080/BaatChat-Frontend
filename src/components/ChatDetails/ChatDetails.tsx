import './ChatDetails.scss';
import {
  CirclePlus,
  MessageCircleMore,
  Mic,
  MoveLeft,
  Phone,
  Search,
  SendHorizontal,
  Smile,
  Video,
} from 'lucide-react';
import type { ChatDetailsInterface } from '../../interfaces/ChatDetailsInterface';
import { ChatTypes } from '../../utils/constant';
import { formatLastSeen, getRandomMorse } from '../../utils/utils';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useChatDetailsStore } from '../../zustand/ChatDetailsStore';

const randMorse = getRandomMorse();

// TODO - add emoji picker

const ChatDetails = () => {
  const chatDetails: ChatDetailsInterface | null = useChatDetailsStore(
    (state) => state.chatDetails,
  );
  const [msgTxt, setMsgTxt] = useState('');
  const msgInputRef = useRef<HTMLTextAreaElement>(null);

  const generateSubName = () => {
    if (!chatDetails) return;
    if (chatDetails.type === 'personal') {
      if (chatDetails?.isOnline) return 'Online now';
      else
        return (
          'Last seen ' +
          formatLastSeen(chatDetails.lastSeenAt!, chatDetails.isOnline)
        );
    } else {
      const name = chatDetails.activeMembers
        ?.map((mem) => mem.name?.split(' ')[0])
        .join(', ');
      return name;
    }
  };

  const handleMsgInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsgTxt(e.target.value);

    const textArea = msgInputRef.current;
    if (!textArea) return;

    textArea.style.height = 'auto';
    const maxHeight = 5 * 24; // 5 lines max
    textArea.style.height = `${Math.min(textArea.scrollHeight, maxHeight)}px`;
    textArea.style.overflowY =
      textArea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  const handleSendMessage = () => {
    // TODO - complete send message
    toast.success('message sent');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) return;
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bc-ChatDetails">
      {!chatDetails && (
        <div className="bc-no-item">
          <div className="bc-ni-icon">
            <MessageCircleMore />
          </div>
          <div className="bc-ni-title">Select chat to start</div>
          <div className="bc-ni-sub">
            Choose a conversation or search for someone to message
          </div>
          <div
            className="bc-ni-morse"
            title={`Decode this - ${randMorse.hint}`}
          >
            {randMorse.morse}
          </div>
        </div>
      )}

      {chatDetails && (
        <div className="bc-chat-details-wrap">
          {/* Header */}
          <div className="bc-cd-header">
            <div className="bc-cd-info">
              <div className="bc-cd-mobile-back-btn">
                <MoveLeft size={16} />
              </div>
              <div
                className={`bc-cd-avatar ${chatDetails.type === ChatTypes.PERSONAL ? (chatDetails.isOnline ? 'online' : 'offline') : ''}`}
              >
                <img src={chatDetails.avatarUrl} alt={chatDetails.name} />
              </div>
              <div className="bc-cd-name-wrap">
                <p className="bc-cd-name">{chatDetails.name}</p>
                <p
                  className={`bc-cd-sub ${chatDetails.isOnline ? 'online' : ''}`}
                >
                  {generateSubName()}
                </p>
              </div>
            </div>

            <div className="bc-cd-actions">
              <button className="bc-cd-action" title="Audio Call">
                <Phone size={18} />
              </button>
              <button className="bc-cd-action" title="Video Call">
                <Video size={21} />
              </button>
              <button className="bc-cd-action" title="Search Message">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Message area */}
          <div className="bc-cd-messages"></div>

          {/* input area */}
          <div className="bc-cd-input-container">
            <button
              className="bc-cd-tool-btn bc-cd-file-input-btn"
              title="Attach a file"
            >
              <CirclePlus />
            </button>

            <div className="bc-cd-input-row">
              <textarea
                className="bc-cd-msg-input"
                rows={1}
                ref={msgInputRef}
                name="msg-input"
                id="msg-input"
                placeholder="Type a message"
                onChange={handleMsgInput}
                onKeyDown={handleKeyDown}
              ></textarea>

              <div className="bc-cd-tool-btn bc-cd-emoji-picker">
                <Smile />
              </div>
            </div>
            <div className="bc-cd-send-btn" onClick={handleSendMessage}>
              {msgTxt ? <SendHorizontal size={20} /> : <Mic size={20} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDetails;
