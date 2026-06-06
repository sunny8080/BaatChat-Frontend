import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import './ChatList.scss';
import type ChatInterface from '../../interfaces/ChatInterface';
import { MessageCirclePlus, Search, UsersRound } from 'lucide-react';
import type { ChatActiveTabs } from '../../pages/Chat';
import {
  ChatListFilterTypes,
  ChatTypes,
  type ChatListFilterType,
  type ChatType,
} from '../../utils/constant';
import { formatLastMessageAt } from '../../utils/utils';
import { useAuth } from '../../context/AuthContext';
import type MessageInterface from '../../interfaces/MessageInterface';
import { useChatListStore } from '../../zustand/ChatListStore';
import { getChatList } from '../../services/chatServices';

type Props = {
  setActiveTab: Dispatch<SetStateAction<ChatActiveTabs>>;
};

const ChatList = ({ setActiveTab }: Props) => {
  const { user } = useAuth();
  const chats: ChatInterface[] = useChatListStore((state) => state.chats);
  const setChats = useChatListStore((state) => state.setChats);
  const selectedChatId = useChatListStore((state) => state.selectedChatId);
  const setSelectedChatId = useChatListStore((state) => state.setSelectedChatId);
  const chatFetched = useChatListStore((state) => state.chatFetched);
  const setChatFetched = useChatListStore((state) => state.setChatFetched);
  const [loading, setLoading] = useState(false);

  const [searchTxt, setSearchText] = useState('');
  const [currentChatFilter, setCurrentChatFilter] = useState<ChatListFilterType>(
    ChatListFilterTypes.ALL,
  );

  // we will be showing filtered chats to UI
  const filteredChats = useMemo(() => {
    const normalizedSearch = searchTxt.trim().toLowerCase();
    if (currentChatFilter === ChatListFilterTypes.ALL && !normalizedSearch) return chats;

    return chats.filter((chat) => {
      if (currentChatFilter === ChatListFilterTypes.UNREAD && !chat.unreadCount) return false;
      if (currentChatFilter === ChatListFilterTypes.GROUPS && chat.type !== ChatTypes.GROUP)
        return false;
      if (!normalizedSearch) return true;

      // search text can be either user/group name or it can be last sent message
      return (
        chat.name.toLowerCase().includes(normalizedSearch) ||
        chat.lastMessage?.text?.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [chats, searchTxt, currentChatFilter]);

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

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      const res = await getChatList();
      setChatFetched(true);
      if (res && res.success) {
        setChats(res.data?.chats || []);
      }
      setLoading(false);
    };

    if (!chatFetched) {
      fetchChats();
    }
  }, [setChats, chatFetched, setChatFetched]);

  return (
    <div className="bc-ChatList">
      <div className="bc-panel-header">
        <div className="bc-panel-title-row">
          <h3 className="bc-panel-title">Chats</h3>

          <div className="bc-panel-header-ctas">
            <button
              className="btn1"
              title="Create new chat"
              onClick={() => setActiveTab('Friends')}
            >
              <MessageCirclePlus size={20} />
            </button>

            {/* TODO - create new group feature */}
            <button
              className="btn2"
              title="Create new group"
              onClick={() => setActiveTab('Friends')}
            >
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
          <button
            className={`bc-panel-filter ${currentChatFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCurrentChatFilter('all')}
          >
            All
          </button>
          <button
            className={`bc-panel-filter ${currentChatFilter === 'unread' ? 'active' : ''}`}
            onClick={() => setCurrentChatFilter('unread')}
          >
            Unread
          </button>
          <button
            className={`bc-panel-filter ${currentChatFilter === 'groups' ? 'active' : ''}`}
            onClick={() => setCurrentChatFilter('groups')}
          >
            Groups
          </button>
        </div>
      </div>

      <div className="bc-chat-list-container">
        {/* TODO - implement chat list skeleton in case of loading */}
        {loading && (
          <div className="bc-searching-chats">
            <div className="bc-inline-spinner"></div> Loading your BaatChat friends...
          </div>
        )}
        {!loading && (!filteredChats || filteredChats.length === 0) && (
          <div className="bc-cl-no-chat">
            <p>
              {chats.length === 0
                ? 'Start chatting with your BaatChat friends and share your stories with them.'
                : "Couldn't find any matching chats."}
            </p>
          </div>
        )}
        {!loading && filteredChats && filteredChats.length ? (
          <ul className="bc-chat-list">
            {filteredChats.map((chat, ind) => (
              <li
                className={`bc-chat-list-item ${selectedChatId === chat.id ? 'active' : ''}
                `}
                key={ind}
                onClick={() => handleChatItemClick(chat.id)}
              >
                <div className="bc-chat-info-container">
                  <div className="bc-chat-avatar">
                    <img src={chat.avatarUrl} alt={chat.name} />
                    {chat.type === ChatTypes.PERSONAL && chat.isOnline !== undefined && (
                      <div
                        className={`bc-chat-presence-dot ${chat.isOnline ? 'online' : 'offline'}`}
                      ></div>
                    )}
                  </div>
                  <div className="bc-chat-info">
                    <p className={`bc-chat-name ${chat.id.includes('personal-') ? 'tmpChat' : ''}`}>
                      {chat.name}
                    </p>
                    <p className="bc-chat-last-message">
                      {genLastMsg(chat.lastMessage, chat.type)}
                    </p>
                  </div>
                </div>

                <div className="bc-chat-last-seen-container">
                  <div className="bc-chat-last-seen">{formatLastMessageAt(chat.lastMessageAt)}</div>
                  {chat.unreadCount && chat.unreadCount !== 0 ? (
                    <div className={`bc-chat-notification ${chat.unreadCount > 9 ? 'gld' : ''}`}>
                      {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                    </div>
                  ) : null}
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
