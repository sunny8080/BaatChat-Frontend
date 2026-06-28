import { Check, MoveRight, Search, X } from 'lucide-react';
import { useState } from 'react';
import './AddGroupMemberSection.scss';
import type UserInterface from '../../interfaces/UserInterface';
import { useQuery } from '@tanstack/react-query';
import { fetchFriends } from '../../services/usersServices';
import toast from 'react-hot-toast';
import type { ChatDetailsInterface } from '../../interfaces/ChatDetailsInterface';
import { useChatDetailsStore } from '../../zustand/ChatDetailsStore';
import { addMembersInGroupChat } from '../../services/chatServices';
import { updateActiveMembersInCache } from '../../tanstack/queryClient';

type Props = {
  setAddMember: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddGroupMemberSection = ({ setAddMember }: Props) => {
  const chatDetails: ChatDetailsInterface | null = useChatDetailsStore(
    (state) => state.chatDetails,
  );
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<UserInterface[] | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { data: friends = [], isLoading } = useQuery<UserInterface[]>({
    queryKey: ['friends'],
    queryFn: async () => {
      const res = await fetchFriends();
      return res.data?.friends || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // show only those friends which are not in the group
  const friendsNotInGroup: UserInterface[] = friends
    .map((frnd) => (chatDetails?.activeMembers?.some((mem) => mem.id === frnd.id) ? null : frnd))
    .filter(Boolean) as UserInterface[];

  const filteredFriends = searchResults ? searchResults : friendsNotInGroup;

  const filterFriends = (searchTxt: string) => {
    if (!searchTxt) {
      setSearchResults(null);
    }
    setSearchResults(
      friendsNotInGroup.filter(
        ({ name, username, phone }) =>
          name?.includes(searchTxt) || username?.includes(searchTxt) || phone?.includes(searchTxt),
      ),
    );
  };

  const toggleFriendSelect = (friend: UserInterface) => {
    setSelectedMembers((prev) => {
      const updatedSelFriend = prev.filter((memberId) => memberId !== friend.id);
      if (updatedSelFriend.length === prev.length) {
        // member not selected earlier
        updatedSelFriend.push(friend.id);
      }
      return updatedSelFriend;
    });
  };

  const handleAddMembers = async () => {
    if (!selectedMembers.length) {
      toast.error('Select at least one member');
      return;
    }

    if (!chatDetails?.id) return;

    setIsAdding(true);
    const res = await addMembersInGroupChat({
      chatId: chatDetails?.id,
      members: JSON.stringify(selectedMembers),
    });
    if (res && res.success) {
      const updatedActiveMembers = [
        ...(chatDetails?.activeMembers ?? []),
        ...res.data.addedMembers,
      ];
      updateActiveMembersInCache(chatDetails.id, updatedActiveMembers);
      setAddMember(false);
    }
    setIsAdding(false);
  };

  return (
    <div className="bc-AddGroupMemberSection">
      <div className="bc-add-panel-header">
        <span className="header-title">Add new members</span>
        <button className="close-btn" onClick={() => setAddMember(false)}>
          <X size={16} />
        </button>
      </div>

      <div className="bc-add-panel-search-input-wrap">
        <span className="bc-panel-icon">
          <Search size={16} />
        </span>
        <input
          type="text"
          onChange={(e) => filterFriends(e.target.value)}
          placeholder="Search by name or @username..."
        />
      </div>

      <div className="bc-add-panel-user-results">
        {isLoading && (
          <div className="results-loading">
            <div className="bc-inline-spinner"></div>{' '}
            <span className="loading-txt">Loading friends...</span>
          </div>
        )}

        {!isLoading && !filterFriends.length && <div className="no-results">No friends found</div>}

        {!isLoading && filterFriends.length && (
          <ul className="add-panel-user-list">
            {filteredFriends.map((friend, ind) => (
              <li
                className="add-panel-user-item"
                key={ind}
                onClick={() => toggleFriendSelect(friend)}
              >
                <div className="user-avatar">
                  <img src={friend.avatarUrl} alt={friend.name} />
                </div>
                <div className="user-details">
                  <p className="user-name">{friend.name}</p>
                  <p className="user-username">@{friend.username}</p>
                </div>

                <div
                  className={`user-checkbox ${selectedMembers.includes(friend.id!) ? 'checked' : ''}`}
                >
                  {selectedMembers.includes(friend.id!) && <Check size={16} />}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bc-add-panel-bottom">
        <span className="selected-txt">
          Selected: <span>{selectedMembers.length}</span>
        </span>
        <button
          className="add-members-btn"
          disabled={!selectedMembers.length || isAdding}
          onClick={handleAddMembers}
        >
          {isAdding && <div className="bc-inline-spinner"></div>}
          Add to group <MoveRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default AddGroupMemberSection;
