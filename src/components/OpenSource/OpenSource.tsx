import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import './OpenSource.scss';
import { getRandomMorse } from '../../utils/utils';

const randMorse = getRandomMorse();

const OpenSource = () => {
  const revealRef = useRevealOnScroll();

  return (
    <section className="bc-OpenSource bc-section">
      <div className="bc-os-content" ref={revealRef}>
        <div className="pwr-icon">⚡</div>
        <h2 className="bc-os-title">
          Open source <br /> & free forever
        </h2>
        <p className="bc-os-sub">BaatChat is built in public. Star it, fork it, contribute. Self-host or use baatchat.online — your choice.</p>
        <div className="bc-os-ctas">
          <button className="bc-btn bc-btn-primary">⭐ Star on GitHub</button>
          <button className="bc-btn bc-btn-gold">🚀 Launch app</button>
        </div>
        <div className="bc-os-morse" title={`Decode this - ${randMorse.hint}`}>
          {randMorse.morse}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
