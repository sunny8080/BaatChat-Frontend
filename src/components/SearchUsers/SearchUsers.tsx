import { Search } from 'lucide-react';
import './SearchUsers.scss';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import type UserInterface from '../../interfaces/UserInterface';
import toast from 'react-hot-toast';
import {
  fetchFriends,
  fetchReceivedFriendRequest,
  searchUsers,
} from '../../services/usersServices';
import type { ChatActiveTabs } from '../../pages/Chat';

type Props = {
  selectedUser: UserInterface | null;
  handleUserItemClick: (userId: string) => void;
  setSelectedUser: Dispatch<SetStateAction<UserInterface | null>>;
  activeTab: ChatActiveTabs;
};

const SearchUsers = ({ selectedUser, handleUserItemClick, setSelectedUser, activeTab }: Props) => {
  const [users, setUsers] = useState<UserInterface[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [receivedFriendReq, setReceivedFriendReq] = useState([]);
  const [showFriendReq, setShowFriendReq] = useState(true);
  const isFriendTab = activeTab === 'Friends';

  const handleSearchUsers = async () => {
    if (searchText.length < 3) {
      if (searchText.length !== 0) {
        toast.error('Provide at least 3 chars');
      }

      if (receivedFriendReq.length > 0) {
        setUsers(receivedFriendReq.map((freq: any) => freq.sender));
        setShowFriendReq(true);
      } else {
        setUsers(null);
      }
      setSelectedUser(null);
      return;
    }

    setLoading(true);
    const res = await searchUsers({ searchText });
    if (res && res.success) {
      setUsers(res.data.users);
      setSelectedUser(null);
      setShowFriendReq(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    // TOD - optimize it using zustand store
    const fetchReq = async () => {
      setLoading(true);
      const res = await fetchReceivedFriendRequest();
      if (res && res.success && res.data?.friendRequests?.length > 0) {
        setReceivedFriendReq(res.data.friendRequests);
        setUsers(res.data.friendRequests.map((freq: any) => freq.sender));
      }
      setLoading(false);
    };

    const loadFriends = async () => {
      setLoading(true);
      const res = await fetchFriends();
      if (res && res.success) {
        setUsers(res.data?.friends || []);
      }
      setLoading(false);
    };

    if (isFriendTab) {
      loadFriends();
    } else {
      fetchReq();
    }
  }, [isFriendTab]);

  return (
    <div className="bc-SearchUsers">
      <div className="bc-panel-header">
        <div className="bc-panel-title-row">
          <h3 className="bc-panel-title">{isFriendTab ? 'Search Friends' : 'Search Users'}</h3>
        </div>

        <div className="bc-panel-search">
          <span className="bc-panel-icon" onClick={handleSearchUsers}>
            <Search size={16} />
          </span>
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === 'Enter') void handleSearchUsers();
            }}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name or @username..."
          />
        </div>

        {isFriendTab && showFriendReq && receivedFriendReq.length ? (
          <p className="bc-friend-req-txt">Received Friend Request</p>
        ) : null}
      </div>

      <div className="bc-search-users-list-container">
        {!users && !loading && (
          <div className="search-users-txt">
            Connect with BaatChat users by searching with their name, username, or email.
          </div>
        )}

        {loading && (
          <div className="searching-txt">
            <div className="bc-inline-spinner"></div> Searching BaatChat users...
          </div>
        )}

        {!loading && users && users.length === 0 && (
          <div className="search-users-txt">
            No BattChat users found, search with username or email !!
          </div>
        )}

        {!loading && users && users.length ? (
          <ul className="bc-search-users-list">
            {users.map((usr, ind) => (
              <li
                className={`bc-search-user-item ${selectedUser && selectedUser.id === usr.id ? 'active' : ''}`}
                key={ind}
                onClick={() => handleUserItemClick(usr.username!)}
              >
                <div className="user-avatar">
                  <img src={usr.avatarUrl} alt={usr.name} />
                  {/* <div className={`presence-dot ${usr.isOnline ? 'online' : 'offline'}`}></div> */}
                </div>
                <div className="user-details">
                  <p className="user-name">{usr.name}</p>
                  <p className="user-username">
                    {/* Last seen {formatLastSeen(usr.lastSeenAt)} ·  */}@{usr.username}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default SearchUsers;
