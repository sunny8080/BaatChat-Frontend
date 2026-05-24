import { useState, type Dispatch, type SetStateAction } from 'react';
import './ChatList.scss';
import type ChatInterface from '../../interfaces/ChatInterface';
import { MessageCirclePlus, Search, UsersRound } from 'lucide-react';
import type { ChatActiveTabs } from '../../pages/Chat';
import { ChatTypes, type ChatType } from '../../utils/constant';
import { formatLastMessageAt } from '../../utils/utils';
import { useAuth } from '../../context/AuthContext';
import type MessageInterface from '../../interfaces/MessageInterface';

type Props = {
  setActiveTab: Dispatch<SetStateAction<ChatActiveTabs>>;
  // selectedChat: ChatInterface | null;
  // handleChatItemClick: (chatId: string) => void;
};

const ChatList = ({ setActiveTab }: Props) => {
  const { user } = useAuth();
  const [searchTxt, setSearchText] = useState('');
  const [currentChatFilter, setCurrentChatFilter] = useState<'all' | 'unread' | 'groups'>('all');
  const [selectedChatId, setSelectedChatId] = useState('');
  const chats: ChatInterface[] = [];

  // TODO - remove this
  if (chats.length === 0) return;

  const handleSearchChats = () => {};

  const handleChatItemClick = async (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const genLastMsg = (lastMessage: MessageInterface | undefined, chatType: ChatType): string => {
    if (!lastMessage) return '';
    if (!lastMessage.text) return '';
    if (lastMessage.sender?.id === user?.id) return '✓✓' + ' ' + lastMessage.text;
    if (chatType === ChatTypes.GROUP) {
      return lastMessage.sender?.name?.split(' ')[0] + ': ' + lastMessage.text;
    }
    return lastMessage.text;
  };

  return (
    <div className="bc-ChatList">
      <div className="bc-panel-header">
        <div className="bc-panel-title-row">
          <h3 className="bc-panel-title">Chats</h3>

          <div className="bc-panel-header-ctas">
            <button className="btn1" title="Create new chat" onClick={() => setActiveTab('Users')}>
              <MessageCirclePlus size={20} />
            </button>

            {/* TODO - create new group feature */}
            <button className="btn2" title="Create new group" onClick={() => setActiveTab('Users')}>
              <UsersRound size={20} />
            </button>
          </div>
        </div>

        <div className="bc-panel-search">
          <span className="bc-panel-icon" onClick={handleSearchChats}>
            <Search size={16} />
          </span>
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === 'Enter') void handleSearchChats();
            }}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search chats..."
          />
        </div>

        <div className="bc-panel-filters">
          <button className={`bc-panel-filter ${currentChatFilter === 'all' ? 'active' : ''}`} onClick={() => setCurrentChatFilter('all')}>
            All
          </button>
          <button className={`bc-panel-filter ${currentChatFilter === 'unread' ? 'active' : ''}`} onClick={() => setCurrentChatFilter('unread')}>
            Unread
          </button>
          <button className={`bc-panel-filter ${currentChatFilter === 'groups' ? 'active' : ''}`} onClick={() => setCurrentChatFilter('groups')}>
            Groups
          </button>
        </div>
      </div>

      <div className="bc-chat-list-container">
        {/* TODO - see how loading works here */}
        {!chats || chats.length === 0 ? (
          <div className="bc-cl-no-chat">
            <p>Connect with your BaatChat friends and share you smiley stories with them </p>
          </div>
        ) : null}

        {chats && chats.length ? (
          <ul className="bc-chat-list">
            {chats.map((chat, ind) => (
              <li
                className={`bc-chat-list-item ${selectedChatId === chat.id ? 'active' : ''}
                `}
                key={ind}
                onClick={() => handleChatItemClick(chat.id)}>
                <div className="bc-chat-info-container">
                  <div className="bc-chat-avatar">
                    <img src={chat.avatarUrl} alt={chat.name} />
                    {chat.type === ChatTypes.PERSONAL && chat.isOnline !== undefined && <div className={`bc-chat-presence-dot ${chat.isOnline ? 'online' : 'offline'}`}></div>}
                  </div>
                  <div className="bc-chat-info">
                    <p className="bc-chat-name">{chat.name}</p>
                    <p className="bc-chat-last-message">{genLastMsg(chat.lastMessage, chat.type)}</p>
                  </div>
                </div>

                <div className="bc-chat-last-seen-container">
                  <div className="bc-chat-last-seen">{formatLastMessageAt(chat.lastMessageAt)}</div>
                  {chat.activeNotification && chat.activeNotification !== 0 ? <div className={`bc-chat-notification ${chat.activeNotification > 9 ? 'gld' : ''}`}>{chat.activeNotification > 9 ? '9+' : chat.activeNotification}</div> : null}
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default ChatList;
