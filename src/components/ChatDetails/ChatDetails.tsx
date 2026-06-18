import './ChatDetails.scss';
import {
  CirclePlus,
  MessageCircleMore,
  Mic,
  MoveLeft,
  Pause,
  Phone,
  Search,
  SendHorizontal,
  Smile,
  Trash2,
  Video,
} from 'lucide-react';
import type { ChatDetailsInterface } from '../../interfaces/ChatDetailsInterface';
import { ChatTypes, MessageTypes } from '../../utils/constant';
import { formatLastSeen, formatMsgDate, getRandomMorse } from '../../utils/utils';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useChatDetailsStore } from '../../zustand/ChatDetailsStore';
import socket from '../../socket/socket';
import { CHAT_EVENTS, MESSAGE_EVENTS, TYPING_EVENTS } from '../../socket/socketEvents';
import { useChatListStore } from '../../zustand/ChatListStore';
import { getChatDetails, sendAudioMessage } from '../../services/chatServices';
import MessageItem from '../MessageItem/MessageItem';
import { useAuth } from '../../context/AuthContext';
import type MessageInterface from '../../interfaces/MessageInterface';
import ChatInfo from '../ChatInfo/ChatInfo';
import Modal from '../Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { addMessageInCache, queryClient } from '../../tanstack/queryClient';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

const randMorse = getRandomMorse();

// TODO - add emoji picker

type Props = {
  setShowMobilePanel2: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatDetails = ({ setShowMobilePanel2 }: Props) => {
  const chatDetails: ChatDetailsInterface | null = useChatDetailsStore(
    (state) => state.chatDetails,
  );
  const [msgTxt, setMsgTxt] = useState('');
  const msgInputRef = useRef<HTMLTextAreaElement>(null);
  const selectedChatId = useChatListStore((state) => state.selectedChatId);
  const updateUnreadCount = useChatListStore((state) => state.updateUnreadCount);
  const upsertChat = useChatListStore((state) => state.upsertChat);
  const setChatDetails = useChatDetailsStore((state) => state.setChatDetails);
  const addMessage = useChatDetailsStore((state) => state.addMessage);
  const updateTempMessage = useChatDetailsStore((state) => state.updateTempMessage);
  const newMsgAdded = useChatDetailsStore((state) => state.newMsgAdded);
  const setNewMsgAdded = useChatDetailsStore((state) => state.setNewMsgAdded);
  const typingUsers = useChatDetailsStore((state) => state.typingUsers);
  const addPreviousMessage = useChatDetailsStore((state) => state.addPreviousMessage);
  const dummyRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [lastTypingEmit, setLastTypingEmit] = useState(0);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const updateLastMessage = useChatListStore((state) => state.updateLastMessage);
  const [loadingPreviousMessage, setLoadingPreviousMessage] = useState(false);
  const previousMsgHeightRef = useRef<number | null>(null);
  const setSelectedChatId = useChatListStore((state) => state.setSelectedChatId);
  let previousDate = '';

  // Audio recording setup
  const [isRecording, setIsRecording] = useState(false);
  const [bars, setBars] = useState<number[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const discardRecordingRef = useRef(false);

  const { data: chatData, isLoading } = useQuery({
    queryKey: ['chatDetails', selectedChatId],
    queryFn: async () => {
      const res = await getChatDetails({ chatId: selectedChatId });
      return res && res.success ? res.data.chat : null;
    },
    enabled: !!selectedChatId,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (chatData) {
      if (chatDetails?.id) socket.emit(CHAT_EVENTS.LEAVE, { chatId: chatDetails?.id });
      setChatDetails(chatData);
      setNewMsgAdded(true); // scroll to bottom
      updateUnreadCount(chatData?.id, 0);
      socket.emit(CHAT_EVENTS.JOIN, { chatId: chatData?.id });
    }
  }, [chatData, setChatDetails, updateUnreadCount, chatDetails?.id, setNewMsgAdded]);

  const generateSubName = () => {
    if (!chatDetails) return '';
    if (chatDetails.type === 'personal') {
      const friend = chatDetails.friend;
      if (friend?.isOnline) return 'Online now';
      else return 'Last seen ' + formatLastSeen(friend!.lastSeenAt!, friend!.isOnline);
    } else {
      let name = '';
      chatDetails.activeMembers?.forEach((mem) => {
        if (mem.id !== user?.id) name += mem.name?.split(' ')[0] + ', ';
      });
      return name + 'You';
    }
  };

  const handleMsgInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsgTxt(e.target.value);

    if (Date.now() - lastTypingEmit > 2000) {
      socket.emit(TYPING_EVENTS.START, { chatId: chatDetails?.id });
      setLastTypingEmit(Date.now());
    }

    const textArea = msgInputRef.current;
    if (!textArea) return;

    textArea.style.height = 'auto';
    const maxHeight = 5 * 24; // 5 lines max
    textArea.style.height = `${Math.min(textArea.scrollHeight, maxHeight)}px`;
    textArea.style.overflowY = textArea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  const handleSendMessage = () => {
    // show optimistic UI that message has been sent
    if (!chatDetails?.id) return;
    const tempId = crypto.randomUUID();

    const optimisticMessage: MessageInterface = {
      id: tempId,
      chat: chatDetails?.id,
      type: MessageTypes.TEXT,
      text: msgTxt,
      sender: user!,
      createdAt: new Date().toISOString(),
    };

    addMessage(optimisticMessage);
    updateLastMessage(chatDetails!.id, optimisticMessage);
    setNewMsgAdded(true);
    setMsgTxt('');

    // emit message send event
    const socketData = {
      chatId: chatDetails?.id,
      text: msgTxt,
      receiverId: '',
    };

    if (chatDetails?.id?.includes('personal')) {
      socketData.chatId = '';
      socketData.receiverId = chatDetails?.id.replace('personal-', '');
    }

    socket.emit(MESSAGE_EVENTS.SEND, socketData, (response: any) => {
      if (response.ok) {
        // update messages in left rails
        updateTempMessage(response.message, tempId);
        updateLastMessage(chatDetails!.id, response.message);

        if (response.newChat) {
          // update chat if new chat created
          const newChat = response.newChat;
          queryClient.setQueryData(['chatDetails', newChat.id], newChat);
          addMessageInCache(newChat.id, response.message);
          upsertChat(newChat, newChat.friend.id, true);
        } else {
          // add new msg in query cache
          addMessageInCache(chatDetails!.id, response.message);
        }
      } else {
        // TODO - handle error scenario
        toast.error('Something went wrong during sending message');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    });
  };

  const handleSendAudioMessage = async () => {
    if (!chatDetails?.id) return;

    const tempId = crypto.randomUUID();
    const audioMsgTxt = `Voice message (${Math.floor(audioDuration / 60)
      .toString()
      .padStart(2, '0')}:${Math.ceil(audioDuration % 60)
      .toString()
      .padStart(2, '0')})`;
    const fileName = `audio-${user?.id}-${chatDetails?.id}.webm`;

    const optimisticMessage: MessageInterface = {
      id: tempId,
      chat: chatDetails?.id,
      type: MessageTypes.AUDIO,
      text: audioMsgTxt,
      sender: user!,
      createdAt: new Date().toISOString(),
      attachments: [
        {
          url: audioUrl!,
          fileName: fileName,
          mimeType: 'audio/webm',
          duration: audioDuration,
          waveform: bars,
        },
      ],
    };

    addMessage(optimisticMessage);
    updateLastMessage(chatDetails!.id, optimisticMessage);
    setNewMsgAdded(true);
    setAudioBlob(null);

    const formData = new FormData();
    formData.append('chatId', chatDetails?.id);
    formData.append('audioBlob', audioBlob!, fileName);
    formData.append('duration', audioDuration.toString());
    formData.append('waveform', JSON.stringify(bars));

    if (chatDetails?.id?.includes('personal')) {
      formData.delete('chatId');
      formData.append('receiverId', chatDetails?.id.replace('personal-', ''));
    }

    const res = await sendAudioMessage(formData);
    if (res && res.success) {
      const response = res.data;
      updateTempMessage(response.message, tempId);
      updateLastMessage(chatDetails!.id, response.message);
      handleDeleteRecording();

      if (response.newChat) {
        // update chat if new chat created
        const newChat = response.newChat;
        queryClient.setQueryData(['chatDetails', newChat.id], newChat);
        addMessageInCache(newChat.id, response.message);
        upsertChat(newChat, newChat.friend.id, true);
      } else {
        // add new msg in query cache
        addMessageInCache(chatDetails!.id, response.message);
      }
    } else {
      // TODO - handle error scenario
      toast.error('Something went wrong during sending message');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  const handleSendOrRecordBtnClick = async () => {
    // TODO handle sending files
    if (msgTxt) {
      handleSendMessage(); // send message
    } else if (audioUrl) {
      // send audio message
      await handleSendAudioMessage();
    } else if (isRecording) {
      stopRecording(); // stop recording
    } else {
      startRecording(); // start recording
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) return;
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (newMsgAdded) {
      // move to bottom if new message added
      if (!messageContainerRef.current) return;
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      setNewMsgAdded(false);
    }
  }, [newMsgAdded, setNewMsgAdded]);

  const handleMessageScroll = async () => {
    const el = messageContainerRef.current;
    if (!el) return;

    if (el.scrollTop < 250 && chatDetails?.nextCursor && !loadingPreviousMessage) {
      // load previous message
      setLoadingPreviousMessage(true);
      const res = await getChatDetails({
        chatId: chatDetails.id,
        nextCursor: chatDetails.nextCursor,
      });
      if (res && res.data) {
        previousMsgHeightRef.current = el.scrollHeight - el.scrollTop;
        addPreviousMessage(res.data?.chat.messages, res.data?.chat.nextCursor);
      }
      setLoadingPreviousMessage(false);
    }
  };

  useLayoutEffect(() => {
    const el = messageContainerRef.current;
    const previousMsgHeight = previousMsgHeightRef.current;

    if (!el || !previousMsgHeight) {
      return;
    }
    el.scrollTop = el.scrollHeight - previousMsgHeight;
    previousMsgHeightRef.current = null;
  }, [chatDetails?.messages]);

  const handleMobileBackBtnClick = () => {
    setShowMobilePanel2(false);
    setSelectedChatId('');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      streamRef.current = stream;

      const audioChunks: Blob[] = [];
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      // this will be called when we have audio data
      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      // will be called when recording stopped
      recorder.onstop = () => {
        if (discardRecordingRef.current) {
          discardRecordingRef.current = false;
          setAudioUrl(null);
          setAudioBlob(null);
          return;
        }

        const audioBlob = new Blob(audioChunks, {
          type: 'audio/webm',
        });

        const sizeInMB = audioBlob.size / (1024 * 1024);
        if (sizeInMB > 2) {
          toast.error('Audio cannot be larger than 2 MB');
          return;
        }

        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
      };

      // waveform setup for UI
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser(); // convert audio signal into frequency information
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const animateWaveform = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray); // Read audio levels
        setBars([...dataArray]);
        animationFrameRef.current = requestAnimationFrame(animateWaveform); // Animate waveform continuously
      };

      animateWaveform();

      // start recording now
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      toast.error('Microphone permission is required!');
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
    if (animationFrameRef.current) {
      // stop the waveform animation
      cancelAnimationFrame(animationFrameRef.current);
    }
    audioContextRef.current?.close();
    setBars([]);

    setIsRecording(false);
  };

  const handleDeleteRecording = () => {
    if (isRecording) {
      stopRecording();
    }

    if (audioUrl) {
      setAudioUrl(null);
      URL.revokeObjectURL(audioUrl);
      discardRecordingRef.current = false;
    } else {
      discardRecordingRef.current = true;
    }
  };

  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [selectedChatId, audioUrl]);

  return (
    <div className="bc-ChatDetails">
      {isLoading && (
        // TODO - implement chat details skeleton in case of loading
        <div className="bc-loading-chat-details">
          <div className="bc-inline-spinner"></div> Loading conversation...
        </div>
      )}

      {!isLoading && !chatDetails && (
        <div className="bc-no-item">
          <div className="bc-ni-icon">
            <MessageCircleMore />
          </div>
          <div className="bc-ni-title">Select chat to start</div>
          <div className="bc-ni-sub">Choose a conversation or search for someone to message</div>
          <div className="bc-ni-morse" title={`Decode this - ${randMorse.hint}`}>
            {randMorse.morse}
          </div>
        </div>
      )}

      {!isLoading && chatDetails && (
        <div className="bc-chat-details-wrap">
          {/* Header */}
          <div className="bc-cd-header">
            <div className="bc-cd-info">
              <div className="bc-cd-mobile-back-btn" onClick={handleMobileBackBtnClick}>
                <MoveLeft size={16} />
              </div>

              <div className="bc-cd-header-content" onClick={() => setShowChatInfo(true)}>
                <div
                  className={`bc-cd-avatar ${chatDetails.type === ChatTypes.PERSONAL ? (chatDetails.friend!.isOnline ? 'online' : 'offline') : ''}`}
                >
                  <img src={chatDetails.avatarUrl} alt={chatDetails.name} />
                </div>
                <div className="bc-cd-name-wrap">
                  <p className="bc-cd-name">{chatDetails.name}</p>

                  <p className={`bc-cd-sub ${chatDetails?.friend?.isOnline ? 'online' : ''}`}>
                    {generateSubName()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bc-cd-actions">
              <button className="bc-cd-action" title="Audio Call" disabled>
                <Phone size={18} />
              </button>
              <button className="bc-cd-action" title="Video Call" disabled>
                <Video size={21} />
              </button>
              <button className="bc-cd-action" title="Search Message" disabled>
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Message area */}
          <div className="bc-cd-messages" ref={messageContainerRef} onScroll={handleMessageScroll}>
            {loadingPreviousMessage && (
              <div className="bc-previous-loading">
                <div className="bc-inline-spinner"></div>
              </div>
            )}

            {chatDetails.messages?.map((msg, _) => {
              const currentDate = formatMsgDate(msg.createdAt!);
              const showDate = currentDate !== previousDate;
              previousDate = currentDate;

              return (
                <React.Fragment key={msg.id}>
                  {showDate && (
                    <div className="bc-cd-messages-date-separator">
                      <span className="date-line"></span>
                      <span className="date-content">{formatMsgDate(msg.createdAt!)}</span>
                      <span className="date-line"></span>
                    </div>
                  )}
                  <MessageItem msg={msg} />
                </React.Fragment>
              );
            })}

            {/* Typing indicator */}
            {/* TODO - show users first name in case of group chats */}
            <div className={`bc-cd-typing-indicator ${typingUsers.length ? 'typing' : ''}`}>
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="bc-cd-dummy-msg" ref={dummyRef}></div>
          </div>

          {/* input area */}
          <div className="bc-cd-input-container">
            <button className="bc-cd-tool-btn bc-cd-file-input-btn">
              {isRecording || audioBlob ? (
                <span className="" title="Delete recording" onClick={handleDeleteRecording}>
                  <Trash2 />
                </span>
              ) : (
                <span className="" title="Attach a file">
                  <CirclePlus />
                </span>
              )}
            </button>

            <div className="bc-cd-input-row">
              {isRecording ? (
                <div className="bc-cd-voice-recording">
                  {bars.slice(0, 24).map((value, ind) => (
                    <span
                      className=""
                      style={{
                        height: `${Math.max(value / 5, 5)}px`,
                      }}
                      key={ind}
                    ></span>
                  ))}
                </div>
              ) : audioUrl && audioBlob ? (
                <div className="bc-cd-audio-preview">
                  <AudioPlayer
                    audioUrl={audioUrl}
                    audioBlob={audioBlob}
                    setBars={setBars}
                    setAudioDuration={setAudioDuration}
                  />
                </div>
              ) : (
                <>
                  <textarea
                    className="bc-cd-msg-input"
                    rows={1}
                    ref={msgInputRef}
                    name="msg-input"
                    id="msg-input"
                    placeholder="Type a message"
                    value={msgTxt}
                    onChange={handleMsgInput}
                    onKeyDown={handleKeyDown}
                  ></textarea>

                  <div className="bc-cd-tool-btn bc-cd-emoji-picker">
                    <Smile />
                  </div>
                </>
              )}
            </div>
            <div className="bc-cd-send-btn" onClick={handleSendOrRecordBtnClick}>
              {msgTxt || audioUrl ? (
                <span>
                  <SendHorizontal size={20} />
                </span>
              ) : (
                <span>{isRecording ? <Pause size={20} /> : <Mic size={20} />}</span>
              )}
            </div>
          </div>

          {showChatInfo && (
            <Modal
              handleOverlayClick={() => setShowChatInfo(false)}
              modalContentStyles={{ width: '100%', maxWidth: '440px' }}
            >
              <ChatInfo setShowChatInfo={setShowChatInfo} />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatDetails;
