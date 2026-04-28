import type React from 'react';
import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import './Features.scss';

const Features = () => {
  const revealRef = useRevealOnScroll();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect(),
      x = e.clientX - rect.left, // distance from left side of card to hovered point in hor dir
      y = e.clientY - rect.top; // distance from top side of card to hovered point in ver dir

    // center at (centerX, centerY)
    const centerX = rect.width / 2,
      centerY = rect.height / 2;

    // cal rotation on X-axis, Y-axis
    // max rotation angle = [-12deg, 12deg] = How much the card is allowed to tilt at most
    const rx = ((y - centerY) / centerY) * -12,
      ry = ((x - centerX) / centerX) * 12;

    // tilt card
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03) translateZ(8px)`;

    // move blob glow also
    el.style.setProperty('--mx', ((x / rect.width) * 100).toFixed(1) + '%');
    el.style.setProperty('--my', ((y / rect.height) * 100).toFixed(1) + '%');
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
    setTimeout(() => (el.style.transform = ''), 300);
  };

  return (
    <section className="bc-Features w-full">
      <div className="max-w-max-content mx-auto!">
        <div className="bc-sec-badge reveal-on-scroll" ref={revealRef}>
          Features
        </div>
        <div className="bc-sec-title reveal-on-scroll" ref={revealRef}>
          Everything you need <br /> to stay connected
        </div>
        <p className="bc-sec-sub reveal-on-scroll" ref={revealRef}>
          Built with love, powered by cutting-edge tech. Real-time, secure, and beautifully designed.
        </p>

        <div className="bc-features-grid">
          {/* Hero card: Real-time messaging */}
          <div ref={revealRef} className="fg-card fg-hero violet reveal-on-scroll" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="fg-card-glow"></div>
            <div className="fg-card-content">
              <div className="fg-card-icon lg">💬</div>
              <h3 className="fg-card-title lg">Real-time messaging</h3>
              <p className="fg-card-desc lg">Send texts, images, files and voice messages instantly. Read receipts, typing indicators, emoji reactions and delete-for-everyone — all powered by Socket.io.</p>
              <div className="fg-card-tag">Socket.io</div>
            </div>

            <div className="fg-card-preview">
              <div className="fg-chat-preview">
                <div className="fg-card-msg msg-in">Hey! Kya haal hai? 👋</div>
                <div className="fg-card-msg msg-out">Sab badhiya! BaatChat 3D Styling is Crazy 🔥</div>
                <div className="fg-card-typing">
                  <span className="fg-card-dot"></span>
                  <span className="fg-card-dot"></span>
                  <span className="fg-card-dot"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Tall Card: Video Calls */}
          <div ref={revealRef} className="fg-card fg-tall gold reveal-on-scroll" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="fg-card-glow"></div>
            <div className="fg-card-content">
              <div className="fg-card-icon lg">📹</div>
              <h3 className="fg-card-title lg">HD video &amp; audio calls</h3>
              <p className="fg-card-desc lg">Crystal-clear peer-to-peer calls via WebRTC. No middleman, no lag. Screen sharing included.</p>
              <div className="fg-card-tag">WebRTC</div>
            </div>

            <div className="fg-card-preview">
              <div className="fg-call-preview">
                <div className="fg-call-tiles">
                  <div className="fg-call-tile">
                    <div className="fg-call-av caller1">P</div>
                    <div className="fg-call-name">Priya</div>
                    <div className="fg-call-live">Live</div>
                  </div>
                  <div className="fg-call-tile">
                    <div className="fg-call-av caller2">R</div>
                    <div className="fg-call-name">Rahul</div>
                    <div className="fg-call-live">Live</div>
                  </div>
                </div>
                <div className="fg-call-ctrls">
                  <div className="fg-ctrl on">🎙️</div>
                  <div className="fg-ctrl on">📹</div>
                  <div className="fg-ctrl off">🖥️</div>
                  <div className="fg-ctrl end">📵</div>
                </div>
              </div>
            </div>
          </div>

          {/* Small Card: secure auths */}
          <div ref={revealRef} className="fg-card fg-small violet reveal-on-scroll" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="fg-card-glow"></div>
            <div className="fg-card-content">
              <div className="fg-card-icon sm">🔐</div>
              <h3 className="fg-card-title sm">Secure auth</h3>
              <p className="fg-card-desc sm">JWT + Google + Facebook OAuth. Refresh token rotation keeps sessions safe.</p>
              <div className="fg-card-tag">Passport.js</div>
            </div>
          </div>

          {/* Small card: voice messages */}
          <div ref={revealRef} className="fg-card fg-small gold reveal-on-scroll" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="fg-card-glow"></div>
            <div className="fg-card-content">
              <div className="fg-card-icon sm">🎙️</div>
              <h3 className="fg-card-title sm">Voice messages</h3>
              <p className="fg-card-desc sm">Record, visualize and play back voice notes with waveform in the browser.</p>
              <div className="fg-card-tag">Web Audio API</div>
            </div>
          </div>

          {/* Small Card: Group Chats */}
          <div ref={revealRef} className="fg-card fg-small green reveal-on-scroll" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="fg-card-glow"></div>
            <div className="fg-card-content">
              <div className="fg-card-icon sm">👥</div>
              <h3 className="fg-card-title sm">Group chats</h3>
              <p className="fg-card-desc sm">Record, visualize and play back voice notes with waveform in the browser.</p>
              <div className="fg-card-tag">MongoDB</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
