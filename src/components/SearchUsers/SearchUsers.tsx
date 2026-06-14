import { Search } from 'lucide-react';
import './SearchUsers.scss';
import { useState } from 'react';
import type UserInterface from '../../interfaces/UserInterface';
import toast from 'react-hot-toast';
import { fetchFriends, fetchFriendRequests, searchUsersByTxt } from '../../services/usersServices';
import type { ChatActiveTabs } from '../../pages/Chat';
import { useUsersStore } from '../../zustand/UsersStore';
import { useQuery } from '@tanstack/react-query';
import bcLogo from '../../assets/logo/bc-logo.svg';

type Props = {
  activeTab: ChatActiveTabs;
  setShowMobilePanel2: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchUsers = ({ activeTab, setShowMobilePanel2 }: Props) => {
  const {
    selectedFriendUsername,
    selectedSearchUserUsername,
    setSelectedFriendUsername,
    setSelectedSearchUserUsername,
  } = useUsersStore();

  const isFriendTab = activeTab === 'Friends';
  const selectedUserUsername = isFriendTab ? selectedFriendUsername : selectedSearchUserUsername;
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<UserInterface[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [showFriendReq, setShowFriendReq] = useState(true);

  // friendQuery
  const { data: friends = [], isLoading: friendsLoading } = useQuery<UserInterface[]>({
    queryKey: ['friends'],
    queryFn: async () => {
      const res = await fetchFriends();
      return res.data?.friends || [];
    },
    enabled: isFriendTab,
    staleTime: 5 * 60 * 1000, // 5 min, data will be assumed to be fresh for 5 min, if data used again after this time then it will be fetched again
  });

  const { data: friendRequests = [], isLoading: requestsLoading } = useQuery<any[] | undefined>({
    queryKey: ['friendRequests'],
    queryFn: async () => {
      const res = await fetchFriendRequests();
      return res.data?.friendRequests ?? [];
    },
    enabled: !isFriendTab,
    staleTime: 5 * 60 * 1000,
  });

  const loading = friendsLoading || requestsLoading || searchLoading;
  const users: UserInterface[] | null = searchResults
    ? searchResults
    : isFriendTab
      ? friends
      : friendRequests?.map((fReq) => fReq.sender);

  const handleSearchFriends = (str?: string) => {
    const sText = str ?? searchText;
    if (sText.length === 0) {
      setSearchResults(null);
      setSelectedFriendUsername('');
    } else {
      const filteredFriends = friends?.filter(
        ({ name, username, phone }) =>
          name?.includes(sText) || username?.includes(sText) || phone?.includes(sText),
      );
      setSearchResults(filteredFriends ?? []);
      setSelectedFriendUsername('');
    }
  };

  const handleSearchUsers = async () => {
    if (searchText.length === 0) {
      if (friendRequests?.length) {
        setSearchResults(null);
        setShowFriendReq(true);
      } else {
        setSearchResults(null);
      }
      setSelectedSearchUserUsername('');
      return;
    }
    if (searchText.length < 3) {
      toast.error('Provide at least 3 chars');
      return;
    }

    setSearchLoading(true);
    const res = await searchUsersByTxt({ searchText });
    if (res && res.success) {
      setSearchResults(res.data.users);
      setSelectedSearchUserUsername('');
      setShowFriendReq(false);
    }
    setSearchLoading(false);
  };

  const handleSearching = async () => {
    if (activeTab === 'Friends') {
      handleSearchFriends();
    } else {
      await handleSearchUsers();
    }
  };

  const handleUserItemClick = async (username: string) => {
    if (username === selectedUserUsername) return;
    setShowMobilePanel2(true);
    if (isFriendTab) {
      setSelectedFriendUsername(username);
    } else {
      setSelectedSearchUserUsername(username);
    }
  };

  const handleSearchTextChange = (str: string) => {
    setSearchText(str);
    if (activeTab === 'Friends') {
      handleSearchFriends(str);
    }
  };

  return (
    <div className="bc-SearchUsers">
      <div className="bc-panel-header">
        <div className="bc-panel-title-row">
          <div className="bc-panel-mobile-logo">
            <img src={bcLogo} alt="BaatChat" />
          </div>
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
            onChange={(e) => handleSearchTextChange(e.target.value)}
            placeholder="Search by name or @username..."
          />
        </div>

        {!isFriendTab && showFriendReq && friendRequests?.length ? (
          <p className="bc-friend-req-txt">Friend Requests</p>
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
            <div className="bc-inline-spinner"></div>
            {isFriendTab ? 'Loading your BaatChat friends...' : 'Searching BaatChat users...'}
          </div>
        )}

        {!loading && users && users.length === 0 && (
          <div className="search-users-txt">
            No BaatChat users found, search with username or email !!
          </div>
        )}

        {!loading && users && users.length ? (
          <ul className="bc-search-users-list">
            {users.map((usr, ind) => (
              <li
                className={`bc-search-user-item ${selectedUserUsername === usr.username ? 'active' : ''}`}
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
