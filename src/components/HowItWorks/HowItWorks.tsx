import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import './HowItWorks.scss';

const HowItWorks = () => {
  const revealRef = useRevealOnScroll();

  return (
    <section className="bc-HowItWorks bc-section">
      <div className="bc-section-content">
        <div className="bc-sec-badge reveal-on-scroll" ref={revealRef}>
          How it works
        </div>
        <div className="bc-sec-title reveal-on-scroll" ref={revealRef}>
          Up and running in seconds
        </div>

        <div className="bc-steps">
          <div className="bc-step reveal-on-scroll" ref={revealRef}>
            <div className="bc-step-icon">👤</div>
            <h4>Create account</h4>
            <p>Sign up with email or Google / Facebook in one click</p>
          </div>

          <div className="bc-step reveal-on-scroll" ref={revealRef}>
            <div className="bc-step-icon">🔍</div>
            <h4>Find friends</h4>
            <p>Search by username or phone and send a message</p>
          </div>

          <div className="bc-step reveal-on-scroll" ref={revealRef}>
            <div className="bc-step-icon">💬</div>
            <h4>Start chatting</h4>
            <p>Text, share files, send voice notes in real time</p>
          </div>

          <div className="bc-step reveal-on-scroll" ref={revealRef}>
            <div className="bc-step-icon">📹</div>
            <h4>Jump on a call</h4>
            <p>One tap for crystal-clear audio or HD video calls</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
