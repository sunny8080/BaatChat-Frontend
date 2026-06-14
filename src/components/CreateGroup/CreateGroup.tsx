import {
  Camera,
  Check,
  MoveLeft,
  MoveRight,
  Pencil,
  Search,
  UserPlus,
  UsersRound,
  X,
} from 'lucide-react';
import './CreateGroup.scss';
import type React from 'react';
import { useEffect, useLayoutEffect, useRef, useState, type SetStateAction } from 'react';
import { useQuery } from '@tanstack/react-query';
import type UserInterface from '../../interfaces/UserInterface';
import { fetchFriends } from '../../services/usersServices';
import type { ChatActiveTabs } from '../../pages/Chat';
import toast from 'react-hot-toast';
import { createGroup } from '../../services/chatServices';
import { useChatListStore } from '../../zustand/ChatListStore';
import { useChatDetailsStore } from '../../zustand/ChatDetailsStore';

type Props = {
  setShowCreateGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: React.Dispatch<SetStateAction<ChatActiveTabs>>;
};

type CurrentSlideType = 'AddMembers' | 'GroupInfo';

const CreateGroup = ({ setShowCreateGroupModal, setActiveTab }: Props) => {
  const [selectedMembers, setSelectedMembers] = useState<UserInterface[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [currentSlide, setCurrentSlide] = useState<CurrentSlideType>('AddMembers');
  const [searchResults, setSearchResults] = useState<UserInterface[] | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState('');

  const allSelectedUsername = selectedMembers.map(({ username }) => username).join(',');
  const chipsContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const addChat = useChatListStore((state) => state.addChat);
  const setSelectedChatId = useChatListStore((state) => state.setSelectedChatId);
  const setChatDetails = useChatDetailsStore((state) => state.setChatDetails);

  const nextButtonEnabled =
    currentSlide === 'AddMembers'
      ? selectedMembers.length
      : isCreatingGroup
        ? false
        : groupName.length > 0 && selectedAvatar;

  const { data: friends = [], isLoading } = useQuery<UserInterface[]>({
    queryKey: ['friends'],
    queryFn: async () => {
      const res = await fetchFriends();
      return res.data?.friends || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const filteredFriends = searchResults ? searchResults : friends;

  const filterFriends = (searchTxt: string) => {
    if (!searchTxt) {
      setSearchResults(null);
    }
    setSearchResults(
      friends.filter(
        ({ name, username, phone }) =>
          name?.includes(searchTxt) || username?.includes(searchTxt) || phone?.includes(searchTxt),
      ),
    );
  };

  const toggleFriendSelect = (friend: UserInterface) => {
    setSelectedMembers((prev) => {
      const updatedSelFriend = prev.filter((mem) => mem.username !== friend.username);
      if (updatedSelFriend.length === prev.length) {
        // member not selected earlier
        updatedSelFriend.push(friend);
      }
      return updatedSelFriend;
    });
  };

  const handleNextBtnClick = () => {
    if (currentSlide === 'AddMembers') {
      if (selectedMembers.length) {
        setCurrentSlide('GroupInfo');
      }
    } else {
      handleCreateGroup();
    }
  };

  useLayoutEffect(() => {
    const el = chipsContainerRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
  }, [selectedMembers]);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) {
      return;
    }
    const file = files[0];
    setSelectedAvatar(file);

    if (previewAvatarUrl) {
      URL.revokeObjectURL(previewAvatarUrl);
    }

    const url = URL.createObjectURL(file);
    setPreviewAvatarUrl(url);
  };

  useEffect(() => {
    return () => {
      if (previewAvatarUrl) {
        URL.revokeObjectURL(previewAvatarUrl);
      }
    };
  }, [previewAvatarUrl]);

  const handleCreateGroup = async () => {
    if (!selectedMembers.length) {
      toast.error('Select atleast one group member');
      setCurrentSlide('AddMembers');
      return;
    }
    if (!groupName.length) {
      toast.error('Group name is required');
      return;
    }
    if (groupName.length > 50) {
      toast.error('Group name can have at most 50 chars');
      return;
    }
    if (groupDesc.length > 250) {
      toast.error('Group description can have at most 250 chars');
      return;
    }
    if (!selectedAvatar) {
      toast.error('Group avatar is required');
      return;
    }

    const formData = new FormData();
    formData.append('name', groupName);
    formData.append('description', groupDesc);
    formData.append('avatar', selectedAvatar);
    formData.append('members', JSON.stringify(selectedMembers.map(({ id }) => id)));

    setIsCreatingGroup(true);
    const res = await createGroup(formData);
    if (res && res.data) {
      // on success select and open this group chat
      const chat = res.data.group;
      addChat(chat);
      setSelectedChatId(chat.id);
      setChatDetails(chat);
      setActiveTab('ChatList');
      setShowCreateGroupModal(false);
    }
    setIsCreatingGroup(false);
  };

  return (
    <div className="bc-CreateGroup">
      <div className="bc-create-group-header">
        <div className="bc-cgh-title">
          <span className="bc-cgh-icon">
            <UsersRound size={22} />
          </span>
          <span>Create Group</span>
        </div>

        <div className="bc-cgh-close-btn" onClick={() => setShowCreateGroupModal(false)}>
          <X size={22} />
        </div>
      </div>

      <div className="bc-create-group-body bc-form">
        {currentSlide === 'AddMembers' && (
          <div className="bc-cgb-add-members-slide bc-slideScreenRight">
            <div className="bc-cgb-header">
              <div className="bc-cgb-title">
                Add Members
                {friends.length && (
                  <div className="friends-count">
                    ({selectedMembers.length}/{friends.length})
                  </div>
                )}
              </div>

              <div className="bc-cgb-friends-search">
                <span className="bc-cgb-friends-search-icon">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  onChange={(e) => filterFriends(e.target.value)}
                  placeholder="Search by name or @username..."
                />
              </div>

              {selectedMembers.length > 0 && (
                <div className="bc-cgb-user-chips" ref={chipsContainerRef}>
                  {selectedMembers.map((mem) => (
                    <div className="bc-cgb-user-chip" key={mem.id}>
                      <div className="chip-av">
                        <img src={mem.avatarUrl} alt={mem.name} />
                      </div>
                      <div className="chip-name">{mem.name?.split(' ')[0]}</div>
                      <div className="chip-cross-btn" onClick={() => toggleFriendSelect(mem)}>
                        <X size={14} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bc-cgb-list-container">
              {isLoading && (
                <div className="bc-cgb-loading-friends">
                  <div className="bc-inline-spinner"></div> Loading your BaatChat friends...
                </div>
              )}

              {!isLoading && friends.length == 0 && (
                <div className="bc-cgb-no-friends-found">
                  No BaatChat friend found !!
                  <button
                    className="bc-btn bc-btn-primary add-friend"
                    onClick={() => {
                      setActiveTab('Users');
                      setShowCreateGroupModal(false);
                    }}
                  >
                    <span>
                      <UserPlus size={20} />
                    </span>
                    Add Friend
                  </button>
                </div>
              )}

              {!isLoading && filteredFriends.length === 0 && (
                <div className="bc-cgb-no-friends-found">
                  No friend found, search with username or email !!
                </div>
              )}

              {!isLoading && filteredFriends.length && (
                <ul className="bc-cgb-friend-list">
                  {filteredFriends.map((friend, ind) => (
                    <li
                      className={`bc-cgb-friend-item`}
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
                        className={`user-checkbox ${allSelectedUsername.includes(friend.username!) ? 'checked' : ''}`}
                      >
                        {allSelectedUsername.includes(friend.username!) && <Check size={16} />}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {currentSlide === 'GroupInfo' && (
          <div className="bc-cgb-group-info-slide bc-slideScreenLeft">
            <div className="bc-cgb-header">
              <div className="bc-cgb-title">Group Info</div>
            </div>

            <div className="bc-cgb-av-section">
              <div className="avatar-wrap" onClick={openFilePicker}>
                <div className="avatar-preview">
                  {previewAvatarUrl ? (
                    <img src={previewAvatarUrl} className="avatar-img" alt="group image" />
                  ) : (
                    <span>
                      <Camera size={30} />
                    </span>
                  )}
                </div>
                <div className="avatar-edit-btn">
                  <Pencil size={10} />
                </div>
              </div>

              <div className="avatar-info">
                <h4>Group Avatar</h4>
                <p>Upload a photo that represents your group. PNG, JPG — max 2 MB.</p>
                <button className="bc-btn bc-btn-primary upload-btn" onClick={openFilePicker}>
                  Upload Photo
                </button>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                ref={fileInputRef}
                onChange={handleFilePick}
              />
            </div>

            <div className="bc-form-field">
              <label className="bc-form-label" htmlFor="groupName">
                Group Name <span className="bc-form-label-required">*</span>
              </label>
              <div className="bc-form-input-wrapper">
                <input
                  type="text"
                  className="bc-form-input"
                  id="groupName"
                  placeholder="e.g. College Gang 🎓, Work Buddies 💼"
                  maxLength={50}
                  required
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
            </div>

            <div className="bc-form-field">
              <label className="bc-form-label" htmlFor="groupDesc">
                Description <span className="bc-form-label-note">(optional)</span>
              </label>

              <div className="bc-form-input-wrapper">
                <textarea
                  className="bc-form-input"
                  rows={4}
                  id="groupDesc"
                  placeholder="What's this group about? 💬"
                  maxLength={250}
                  value={groupDesc}
                  onChange={(e) => setGroupDesc(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bc-create-group-footer">
        {currentSlide === 'GroupInfo' && (
          <button
            className="bc-btn bc-btn-secondary"
            onClick={() => setCurrentSlide('AddMembers')}
            disabled={isCreatingGroup}
          >
            <span>
              <MoveLeft size={16} />
            </span>
            Back
          </button>
        )}

        <button
          className={`bc-btn bc-btn-primary nextBtn ${isCreatingGroup ? 'cursor-progress!' : ''}`}
          disabled={!nextButtonEnabled}
          onClick={handleNextBtnClick}
        >
          {currentSlide === 'AddMembers' ? (
            <>
              Next
              <span>
                <MoveRight size={16} />
              </span>
            </>
          ) : isCreatingGroup ? (
            <>
              <div className="bc-inline-spinner"></div> Creating...
            </>
          ) : (
            'Create'
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
