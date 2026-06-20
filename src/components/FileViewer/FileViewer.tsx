import { Download, Share2, X } from 'lucide-react';
import './FileViewer.scss';
import type UserInterface from '../../interfaces/UserInterface';
import { useAuth } from '../../context/AuthContext';
import { downloadFile, formatMsgDate, formatMsgTime } from '../../utils/utils';

type Props = {
  type: string;
  fileUrl: string;
  fileName: string;
  closeFileViewer: () => void;
  sender?: UserInterface;
  createdAt?: string;
};

// TODO - currently this supports only image and video, we can setup it for PDF also
const FileViewer = ({ type, fileUrl, fileName, closeFileViewer, sender, createdAt }: Props) => {
  const { user } = useAuth();

  return (
    <div className="bc-FileViewer">
      <div className="bc-file-viewer-header">
        <div className="bc-file-other-details">
          {sender && (
            <div className="sender-details">
              <div className="av">
                <img src={sender.avatarUrl} alt={sender.name} />
              </div>
              <div>
                <div className="sender-name">{sender.id === user?.id ? 'You' : sender.name}</div>
                {createdAt && (
                  <div className="send-time">
                    {formatMsgDate(createdAt)} {' · '} {formatMsgTime(createdAt)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bc-file-viewer-ctas">
          <button className="bc-file-viewer-cta" onClick={() => downloadFile(fileUrl, fileName)}>
            <span>
              <Download size={20} />
            </span>
          </button>

          <button className="bc-file-viewer-cta cursor-not-allowed!" disabled>
            <span>
              <Share2 size={20} />
            </span>
          </button>

          <button className="bc-file-viewer-cta close-btn" onClick={closeFileViewer}>
            <span>
              <X size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className="bc-file-viewer-content">
        {type === 'image' && <img src={fileUrl} alt={fileName} />}
        {type === 'video' && (
          <video className="" src={fileUrl} controls autoPlay>
            Your browser does not support video.
          </video>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
