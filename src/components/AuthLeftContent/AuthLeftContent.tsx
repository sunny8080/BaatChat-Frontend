import { Lock, MessageCircleMore, Phone, Video } from 'lucide-react';
import { getRandomMorse } from '../../utils/utils';
import BaatChatLogo from '../BaatChatLogo/BaatChatLogo';
import './AuthLeftContent.scss';
import { useEffect, useState } from 'react';

const randMorse = getRandomMorse();
const mockMsgsStart = [
  {
    id: '0',
    txt: 'Hey! BaatChat try kiya? 🔥',
    out: false,
  },
  {
    id: '1',
    txt: 'Haan yaar, bahut smooth hai!',
    out: true,
  },
  {
    id: '2',
    txt: 'Video call karein? 📹',
    out: false,
  },
];
const mockMsgs = [
  {
    id: '3',
    txt: 'Haan yaar! 🔥',
    out: true,
  },
  {
    id: '4',
    txt: 'Call karein? 📹',
    out: false,
  },
  {
    id: '5',
    txt: 'Haan, zaroor!',
    out: true,
  },

  {
    id: '6',
    txt: 'Namaste! 🙏',
    out: false,
  },
  {
    id: '7',
    txt: 'Kya haal hai? 😊',
    out: true,
  },
  {
    id: '8',
    txt: 'BaatChat bahut smooth hai!',
    out: false,
  },
];

const AuthLeftContent = () => {
  const [messages, setMessages] = useState<{ txt: string; out: boolean; id: string }[]>(mockMsgsStart);
  const [msgInd, setMsgInd] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // required deep clone to avoid changing id of main mockMsgs index
      const curMsg = { ...mockMsgs[msgInd % mockMsgs.length] };
      curMsg.id = curMsg.id + '_' + Date.now();

      setMessages((prev) => {
        const updated = [...prev, curMsg];
        if (updated.length > 9) updated.splice(0, 1);
        return updated;
      });
      setMsgInd((prev) => (prev + 1) % mockMsgs.length);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [msgInd]);

  return (
    <div className="bc-AuthLeftContent">
      <BaatChatLogo />

      <div className="bc-auth-left-top-orb"></div>
      <div className="bc-auth-left-bottom-orb"></div>

      <div className="bc-left-center">
        <div className="bc-auth-tagline">
          Bolo. Suno.
          <br />
          <span className="grad">Connect karo.</span>
        </div>
        <p className="bc-auth-tagline-desc">Real-time messaging, HD video calls, and voice notes — all in one place. Made in India 🇮🇳</p>

        <div className="bc-feat-pills">
          <div className="bc-feat-pill vlt">
            <div className="pill-icon">
              <MessageCircleMore width={20} height={20} />
            </div>
            <div className="pill-desc-wrapper">
              <div className="pill-title">Real-time messaging</div>
              <div className="pill-sub">Socket.io · &lt;50ms latency</div>
            </div>
          </div>

          <div className="bc-feat-pill gld">
            <div className="pill-icon">
              <Video width={20} height={20} />
            </div>
            <div className="pill-desc-wrapper">
              <div className="pill-title">HD video & audio calls</div>
              <div className="pill-sub">WebRTC · peer-to-peer</div>
            </div>
          </div>

          <div className="bc-feat-pill grn">
            <div className="pill-icon">
              <Lock width={20} height={20} />
            </div>
            <div className="pill-desc-wrapper">
              <div className="pill-title">End-to-end encrypted</div>
              <div className="pill-sub">JWT auth · your data stays yours</div>
            </div>
          </div>
        </div>

        <div className="bc-chat-preview">
          <div className="bc-cp-header">
            <div className="user-profile">
              <div className="mock-avatar">SK</div>
              <div>
                <div className="mock-name">Sunny Kumar</div>
                <div className="mock-status">Online now</div>
              </div>
            </div>
            <div className="chat-mock-ctas">
              <div>
                <Phone width={14} color="var(--muted-color)" />
              </div>
              <div>
                <Video width={14} color="var(--muted-color)" />
              </div>
            </div>
          </div>

          <div className="bc-cp-msgs">
            {messages?.map((msg) => (
              <div className={`bc-cp-msg ${msg.out ? 'out' : 'in'}`} key={msg.id}>
                {msg.txt}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bc-left-footer">
        <p className="bc-footer-morse" title={`Decode this - ${randMorse.hint}`}>
          {randMorse.morse}
        </p>
        <p className="bc-copyright-txt">© 2026 BaatChat · baatchat.online · Made with ❤️ in India</p>
      </div>
    </div>
  );
};

export default AuthLeftContent;
