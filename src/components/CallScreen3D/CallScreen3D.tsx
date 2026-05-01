import { useEffect, useState } from 'react';
import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import './CallScreen3D.scss';
import { formatTime } from '../../utils/utils';
import { Clock, Mic, MicOff, MonitorUp, MonitorX, PhoneOff, Video, VideoOff } from 'lucide-react';

const CallScreen3D = () => {
  const revealRef = useRevealOnScroll();
  const [timer, setTimer] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [shareOn, setShareOn] = useState(false);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect(),
      x = e.clientX - rect.left, // distance from left side of card to hovered point in hor dir
      y = e.clientY - rect.top; // distance from top side of card to hovered point in ver dir

    // center at (centerX, centerY)
    const centerX = rect.width / 2,
      centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -16,
      ry = ((x - centerX) / centerX) * 8;

    // tilt card
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'rotateX(8deg) rotateY(-8deg)';
  };

  return (
    <section className="bc-CallScreen3D bc-section">
      <div className="bc-section-content">
        <div className="bc-sec-badge" ref={revealRef}>
          Calls
        </div>
        <div className="bc-sec-title" ref={revealRef}>
          Video calls that just&nbsp;
          <em style={{ color: 'var(--lavender-color)', fontStyle: 'normal' }}>work</em>
        </div>
        <p className="bc-sec-sub mx-auto!" ref={revealRef}>
          P2P WebRTC — no middleman, low latency, completely private. Hover to interact.
        </p>

        <div className="bc-call-screen3D-wrapper" ref={revealRef}>
          <div className="bc-call-screen3D" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="bc-call-tiles">
              <div className="bc-call-tile">
                <div className="bc-call-av caller1">A</div>
                <div className="bc-call-name">Anjali Sharma</div>
                <div className="bc-call-live">Live</div>
              </div>
              <div className="bc-call-tile">
                <div className="bc-call-av caller2">R</div>
                <div className="bc-call-name">Rahul Ralchand</div>
                <div className="bc-call-live">Live</div>
              </div>
            </div>

            <div className="bc-call-ctrls-container">
              <div className="bc-call-timer">
                <Clock />
                {formatTime(timer)}
              </div>
              <div className="bc-call-ctrls">
                <button type="button" onClick={() => setMicOn((prev) => !prev)} className={`bc-call-ctrl ${micOn ? 'on' : 'off'}`}>
                  {micOn ? <Mic /> : <MicOff />}
                </button>
                <button type="button" onClick={() => setCameraOn((prev) => !prev)} className={`removeBlueBoxColor bc-call-ctrl ${cameraOn ? 'on' : 'off'}`}>
                  {cameraOn ? <Video /> : <VideoOff />}
                </button>
                <button type="button" onClick={() => setShareOn((prev) => !prev)} className={`bc-call-ctrl ${shareOn ? 'on' : 'off'}`}>
                  {shareOn ? <MonitorX /> : <MonitorUp />}
                </button>
                <span className="bc-call-ctrl end">
                  <PhoneOff />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallScreen3D;
