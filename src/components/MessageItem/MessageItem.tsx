import { Smile } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type MessageInterface from '../../interfaces/MessageInterface';
import { formatMsgTime } from '../../utils/utils';
import './MessageItem.scss';
import { useChatDetailsStore } from '../../zustand/ChatDetailsStore';
import type { ChatDetailsInterface } from '../../interfaces/ChatDetailsInterface';
import { ChatTypes } from '../../utils/constant';

type Props = {
  msg: MessageInterface;
};

const MessageItem = ({ msg }: Props) => {
  const { user } = useAuth();
  const isCurrentUserIsSender = msg.sender?.id === user?.id;
  const chatDetails: ChatDetailsInterface | null = useChatDetailsStore(
    (state) => state.chatDetails,
  );

  return (
    <div className={`bc-MessageItem ${isCurrentUserIsSender ? 'msgOut' : 'msgIn'}`}>
      <div className="bc-msg-content-wrapper">
        {chatDetails?.type === ChatTypes.GROUP && !isCurrentUserIsSender && (
          <div className="bc-msg-avatar">
            <img src={msg.sender?.avatarUrl} alt={msg.sender?.name} />
          </div>
        )}

        {/* TODO - how we will handle for files  */}
        <div className="bc-msg-content">{msg.text}</div>

        <div className="bc-msg-reaction-trigger">
          <Smile size={12} color="white" />+
        </div>
      </div>

      <div className="bc-msg-time">
        {formatMsgTime(msg.createdAt!)}
        {isCurrentUserIsSender && <span className="msg-sent-check">✓✓</span>}
      </div>

      <div className="bc-msg-reactions-container"></div>

      <div className="bc-msg-reaction-picker"></div>
    </div>
  );
};

export default MessageItem;
