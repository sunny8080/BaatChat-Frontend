import { Video } from 'lucide-react';
import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import './Stats.scss';

const Stats = () => {
  const revealRef = useRevealOnScroll();

  return (
    <section className="bc-Stats bc-section">
      <div className="bc-section-content">
        <div className="bc-sec-badge reveal-on-scroll" ref={revealRef}>
          By the numbers
        </div>
        <div className="bc-sec-title reveal-on-scroll" ref={revealRef}>
          Built for performance
        </div>
        <p className="bc-sec-sub reveal-on-scroll" ref={revealRef}>
          Every architectural decision optimized for speed, security and scale.
        </p>

        <div className="bc-stats-grid">
          <div className="bc-stat vlt">
            <div className="stat-icon">⚡</div>
            <h4 className="stat-title">&lt;50ms</h4>
            <div className="stat-label">Latency</div>
            <p className="stat-sub">Socket.io powered</p>
          </div>
          <div className="bc-stat gld">
            <div className="stat-icon">🔒</div>
            <h4 className="stat-title">E2E</h4>
            <div className="stat-label">Encrypted</div>
            <p className="stat-sub">End-to-end secure</p>
          </div>
          <div className="bc-stat grn">
            <div className="stat-icon">
              <Video width={28} height={28} color="var(--violet-text-color)" />
            </div>
            <h4 className="stat-title">P2P</h4>
            <div className="stat-label">Video Calls</div>
            <p className="stat-sub">WebRTC direct</p>
          </div>
          <div className="bc-stat vlt">
            <div className="stat-icon">⭐</div>
            <h4 className="stat-title">100%</h4>
            <div className="stat-label">Open Source</div>
            <p className="stat-sub">Free forever</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
