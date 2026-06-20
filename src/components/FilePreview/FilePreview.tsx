import { EyeOff, File, FileQuestionMark, Image, Music4, Send, Video, X } from 'lucide-react';
import './FilePreview.scss';
import { formatFileSize } from '../../utils/utils';
import { useRef } from 'react';
import type { ChatDetailsInterface } from '../../interfaces/ChatDetailsInterface';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

type Props = {
  selectedFile: File | null;
  previewUrl: string;
  deleteSelectedFile: () => void;
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
  chatDetails: ChatDetailsInterface;
  handleSendFile: () => void;
  setBars: React.Dispatch<React.SetStateAction<number[]>>;
  setAudioDuration: React.Dispatch<React.SetStateAction<number>>;
};

const FilePreview = ({
  selectedFile,
  previewUrl,
  deleteSelectedFile,
  caption,
  setCaption,
  handleSendFile,
  chatDetails,
  setBars,
  setAudioDuration,
}: Props) => {
  const msgInputRef = useRef<HTMLTextAreaElement>(null);
  const mimeType = selectedFile?.type || '';
  const isImage = mimeType.startsWith('image/');
  const isAudio = mimeType.startsWith('audio/');
  const isVideo = mimeType.startsWith('video/');
  const isFile = !isImage && !isVideo && !isAudio;

  if (!selectedFile) return;

  const handleMsgInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);

    const textArea = msgInputRef.current;
    if (!textArea) return;

    textArea.style.height = 'auto';
    const maxHeight = 5 * 24; // 5 lines max
    textArea.style.height = `${Math.min(textArea.scrollHeight, maxHeight)}px`;
    textArea.style.overflowY = textArea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) return;
      e.preventDefault();
      handleSendFile();
    }
  };

  return (
    <div className="bc-FilePreview">
      <div className="bc-fp-blob"></div>
      <div className="bc-fp-drag"></div>

      <div className="bc-file-preview-header">
        <div className="bc-file-preview-header-left">
          <span className="icon">
            {isImage && <Image size={20} />}
            {isAudio && <Music4 size={20} />}
            {isVideo && <Video size={20} />}
            {isFile && <File size={20} />}
          </span>
          <span className="text">Send File</span>
        </div>
        <div className="bc-file-preview-header-right">
          <div className="bc-fp-chat-name">
            <img src={chatDetails.avatarUrl} alt={chatDetails.name} />
            <span>{chatDetails.name}</span>
          </div>
          <button className="bc-file-preview-close-btn" onClick={deleteSelectedFile}>
            <X size={22} />
          </button>
        </div>
      </div>

      <div className="bc-file-preview-message">
        {isImage && (
          <div className="image-preview-wrap">
            <img src={previewUrl} alt={selectedFile.name} />
          </div>
        )}

        {isAudio && (
          <div className="audio-preview-wrap">
            <AudioPlayer
              audioUrl={previewUrl}
              audioBlob={selectedFile}
              setBars={setBars}
              setAudioDuration={setAudioDuration}
            />
          </div>
        )}

        {isVideo && (
          <div className="video-preview-wrap">
            <video
              src={previewUrl}
              controls
              className="w-full"
              onLoadedMetadata={(e) => setAudioDuration(Math.ceil(e.currentTarget.duration))}
            >
              Your browser does not support video.
            </video>
          </div>
        )}

        {isFile && (
          <div className="file-preview-wrap">
            <div className="file-card">
              <div className="file-icon">
                <FileQuestionMark />
              </div>
              <div className="bc-file-preview-file-info" title={selectedFile.name}>
                <span className="file-info-name" title={selectedFile.name}>
                  {selectedFile.name}
                </span>
                <span className="file-info-size">{formatFileSize(selectedFile.size)}</span>
              </div>
            </div>
            <div className="no-preview-note">
              <span>
                <EyeOff size={16} color="var(--gold-color)" />
              </span>
              <span>Files can't be previewed — the recipient will download and open it.</span>
            </div>
          </div>
        )}
      </div>

      <div className="bc-file-preview-send-msg">
        <textarea
          className="msg-input"
          rows={1}
          ref={msgInputRef}
          name="msg-input"
          id="msg-input-2"
          placeholder="Add a caption..."
          value={caption}
          onChange={handleMsgInput}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>

      <div className="bc-file-preview-cta">
        <div className="bc-file-preview-file-info">
          <span className="file-info-name" title={selectedFile.name}>
            {selectedFile.name}
          </span>
          <span className="file-info-size">{formatFileSize(selectedFile.size)}</span>
        </div>
        <button className="bc-btn bc-btn-primary rect" onClick={handleSendFile}>
          Send
          <span>
            <Send size={20} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default FilePreview;
