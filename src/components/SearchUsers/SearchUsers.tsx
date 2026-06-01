import { Search } from 'lucide-react';
import './SearchUsers.scss';
import { useEffect, useState } from 'react';
import type UserInterface from '../../interfaces/UserInterface';
import toast from 'react-hot-toast';
import {
  fetchFriends,
  fetchReceivedFriendRequest,
  getUserDetails,
  searchUsersByTxt,
} from '../../services/usersServices';
import type { ChatActiveTabs } from '../../pages/Chat';
import { useUsersStore } from '../../zustand/UsersStore';

type Props = {
  activeTab: ChatActiveTabs;
};

const SearchUsers = ({ activeTab }: Props) => {
  const {
    friends,
    selectedFriend,
    setFriends,
    setSelectedFriend,
    setFetchingUserDetails,
    receivedFriendReq,
    selectedSearchUser,
    setReceivedFriendReq,
    setSelectedSearchUser,
  } = useUsersStore();

  const isFriendTab = activeTab === 'Friends';
  const selectedUser: UserInterface | null =
    activeTab === 'Friends' ? selectedFriend : selectedSearchUser;
  const [users, setUsers] = useState<UserInterface[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showFriendReq, setShowFriendReq] = useState(true);

  const handleSearchFriends = () => {
    if (searchText.length === 0) {
      setUsers(friends);
      setSelectedFriend(null);
    } else {
      const filteredFriends = friends?.filter(
        ({ name, username, phone }) =>
          name?.includes(searchText) ||
          username?.includes(searchText) ||
          phone?.includes(searchText),
      );
      setUsers(filteredFriends ?? []);
      setSelectedFriend(null);
    }
  };

  const handleSearchUsers = async () => {
    if (searchText.length === 0) {
      if (receivedFriendReq?.length) {
        setUsers(receivedFriendReq.map((fReq: any) => fReq.sender));
        setShowFriendReq(true);
      } else {
        setUsers(null);
      }
      setSelectedSearchUser(null);
      return;
    }

    if (searchText.length < 3) {
      toast.error('Provide at least 3 chars');
      return;
    }

    setLoading(true);
    const res = await searchUsersByTxt({ searchText });
    if (res && res.success) {
      setUsers(res.data.users);
      setSelectedSearchUser(null);
      setShowFriendReq(false);
    }
    setLoading(false);
  };

  const handleSearching = async () => {
    if (activeTab === 'Friends') {
      handleSearchFriends();
    } else {
      await handleSearchUsers();
    }
  };

  const handleUserItemClick = async (username: string) => {
    if (selectedUser?.username === username) return;
    setFetchingUserDetails(true);
    const res = await getUserDetails({ username });
    if (res && res.success) {
      if (activeTab === 'Users') {
        setSelectedSearchUser(res.data?.user);
      } else {
        setSelectedFriend(res.data?.user);
      }
    }
    setFetchingUserDetails(false);
  };

  // setup users list for friends or users tab
  useEffect(() => {
    const fetchFriendReq = async () => {
      if (receivedFriendReq) {
        let isSelectedFrndReq = false;
        setUsers(
          receivedFriendReq.map((fReq: any) => {
            if (selectedSearchUser && fReq.sender.id === selectedSearchUser)
              isSelectedFrndReq = true;
            return fReq.sender;
          }),
        );

        if (!isSelectedFrndReq) setSelectedSearchUser(null);
        return;
      }

      setLoading(true);
      const res = await fetchReceivedFriendRequest();
      if (res && res.success && res.data?.friendRequests) {
        setReceivedFriendReq(res.data.friendRequests);
      }
      setLoading(false);
    };

    const loadFriends = async () => {
      if (friends) {
        setUsers(friends);
        return;
      }

      setLoading(true);
      const res = await fetchFriends();
      if (res && res.success) {
        setFriends(res.data?.friends || []);
      }
      setLoading(false);
    };

    if (isFriendTab) {
      loadFriends();
    } else {
      fetchFriendReq();
    }
  }, [isFriendTab, friends, receivedFriendReq]);

  return (
    <div className="bc-SearchUsers">
      <div className="bc-panel-header">
        <div className="bc-panel-title-row">
          <h3 className="bc-panel-title">{isFriendTab ? 'Search Friends' : 'Search Users'}</h3>
        </div>

        <div className="bc-panel-search">
          <span className="bc-panel-icon" onClick={handleSearching}>
            <Search size={16} />
          </span>
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearching();
              }
            }}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name or @username..."
          />
        </div>

        {!isFriendTab && showFriendReq && receivedFriendReq?.length ? (
          <p className="bc-friend-req-txt">Received Friend Request</p>
        ) : null}
      </div>

      <div className="bc-search-users-list-container">
        {!loading && !users && (
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
