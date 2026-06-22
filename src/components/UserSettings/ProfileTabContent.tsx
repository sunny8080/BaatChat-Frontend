import { NotebookPen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { type SettingsActiveTab } from './UserSettings';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { updateUserDetails } from '../../services/usersServices';
import Modal from '../Modal/Modal';
import FileViewer from '../FileViewer/FileViewer';

type Props = {
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentActiveTab: SettingsActiveTab;
};

const ProfileTabContent = ({ setShowSettingsModal, currentActiveTab }: Props) => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState(user?.avatarUrl ?? '');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [openFIleViewer, setOpenFileViewer] = useState(false);

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

  const handleRemovePhoto = () => {
    setPreviewAvatarUrl(user?.avatarUrl ?? '');
    setSelectedAvatar(null);
  };

  const isFormChanged = () => {
    return name !== user?.name || bio !== user.bio || previewAvatarUrl !== user.avatarUrl;
  };

  const handleUserProfileChange = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormChanged) return;

    const formData = new FormData();

    if (name !== user?.name) {
      if (!name) {
        toast.error('Name is required');
        return;
      } else if (name.length > 30) {
        toast.error("Name can't have have more than 30 chars");
        return;
      }
      formData.append('name', name);
    }

    if (bio !== user?.bio) {
      if (bio.length > 250) {
        toast.error("Bio can't have have more than 250 chars");
        return;
      }
      formData.append('bio', bio);
    }

    if (selectedAvatar && previewAvatarUrl !== user?.avatarUrl) {
      formData.append('avatar', selectedAvatar);
    }

    setLoading(true);
    const res = await updateUserDetails(formData);
    if (res && res.success) {
      setUser(res.data.user);
      toast.success('Profile changes updated successfully!');
    }
    setLoading(false);
  };

  return (
    <div
      className={`bc-ProfileTabContent bc-user-settings-section-content ${currentActiveTab === 'Username' ? 'active' : ''}`}
    >
      <div className="bc-uss-content-title">Profile</div>
      <div className="bc-uss-content-sub">How others see you on BaatChat.</div>

      <form className="bc-form" onSubmit={handleUserProfileChange}>
        <div className="bc-uss-avatar-editor">
          <div className="avatar-preview" onClick={() => setOpenFileViewer(true)}>
            <img src={previewAvatarUrl} className="avatar-img" alt={user?.name} />
          </div>

          <div className="avatar-info">
            <h4>Profile photo</h4>
            <p>Upload a clear photo. PNG, JPG — max 2 MB.</p>

            <div className="avatar-actions">
              <button
                type="button"
                className="bc-btn bc-btn-primary upload-btn"
                onClick={openFilePicker}
              >
                Upload New
              </button>

              {selectedAvatar && (
                <button
                  type="button"
                  className="bc-btn warning-outline"
                  onClick={handleRemovePhoto}
                >
                  Remove
                </button>
              )}
            </div>
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
          <label className="bc-form-label" htmlFor="name">
            Full Name
          </label>
          <div className="bc-form-input-wrapper">
            <span className="bc-form-icon">
              <NotebookPen />
            </span>
            <input
              type="text"
              className="bc-form-input has-icon capitalize"
              id="name"
              placeholder="User Singh"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={30}
            />
          </div>
        </div>

        <div className="bc-form-field">
          <label className="bc-form-label" htmlFor="groupDesc">
            Bio <span className="bc-form-label-note">(optional)</span>
          </label>

          <div className="bc-form-input-wrapper">
            <textarea
              className="bc-form-input"
              rows={4}
              id="groupDesc"
              placeholder="Tell people a little about yourself..."
              maxLength={250}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="item-hint">Appears on your profile card.</div>
        </div>

        <div className="bc-uss-content-ctas">
          <button
            className="bc-btn bc-btn-secondary discard"
            onClick={() => setShowSettingsModal(false)}
            disabled={loading}
          >
            Discard
          </button>
          <button
            type="submit"
            className={`bc-form-submit-btn primary submit ${loading ? 'loading' : ''}`}
            disabled={!isFormChanged()}
          >
            {loading && <div className="bc-inline-spinner"></div>}
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {openFIleViewer && (
        <Modal
          handleOverlayClick={() => setOpenFileViewer(false)}
          modalContentStyles={{ width: '100%', height: '100%' }}
        >
          <FileViewer
            type={'image'}
            fileUrl={previewAvatarUrl}
            fileName={`${user?.name} profile photo`}
            closeFileViewer={() => setOpenFileViewer(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProfileTabContent;
