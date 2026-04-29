import { Phone, Video } from 'lucide-react';
import './HeroSection.scss';

const HeroSection = () => {
  return (
    <section className="bc-HeroSection w-full">
      <div className="bc-blob blob1"></div>
      <div className="bc-blob blob2"></div>
      <div className="bc-blob blob3"></div>
      <div className="bc-hero-badge">
        <span className="badge-dot"></span> Bolo &bull; Suno &bull; Connect
      </div>
      <h1 className="bc-hero-heading">
        <span className="line1">Chat. Call.</span>
        <span className="line2">No limits.</span>
        <span className="line3">Apna tarika.</span>
      </h1>
      <p className="bc-hero-subheading">BaatChat is a real-time messaging and video calling platform built for everyone. Text, voice, video — all in one place. Made in India 🇮🇳.</p>

      <div className="bc-hero-ctas">
        <button className="bc-btn bc-btn-gold">🚀 Start Chatting Now</button>
        <button className="bc-btn bc-btn-secondary watch-demo-btn">▶ Watch Demo</button>
      </div>

      <div className="bc-hero-chat-mockup">
        <div className="chat-mock-header">
          <div className="mock-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
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

        <div className="chat-mock-content">
          <div className="chat-msg msg-in">
            Hey! Kya haal hai? 👋
            <div className="msg-time">10:43 AM </div>
          </div>

          <div className="chat-msg msg-out">
            Sab badhiya! Did you check the new BaatChat update? The video quality is insane 🤩🔥
            <div className="msg-time">10:43 AM ✓✓</div>
          </div>

          <div className="chat-msg msg-in">
            <div className="voice-msg">
              <div>▶</div>
              <div className="voice-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>0:12</span>
            </div>
            <div className="msg-time">10:44 AM</div>
          </div>

          <div className="chat-msg msg-out">
            Let's do a video call tonight? 📹
            <div className="msg-time">10:44 AM ✓✓</div>
          </div>
          <div className="typing-txt">Sunny is typing...</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
