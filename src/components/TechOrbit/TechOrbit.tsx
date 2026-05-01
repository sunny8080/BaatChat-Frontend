import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import './TechOrbit.scss';
import bcLogo from '../../assets/logo/bc-logo.svg';

const techIcons: Record<string, string> = import.meta.glob<string>('../../assets/techIcons/*.svg', {
  eager: true,
  import: 'default',
});

const techStacks = [
  {
    title: 'React 19',
    iconName: 'react.svg',
    uses: 'Frontend',
    animationDelay: '0s',
  },
  {
    title: 'Node.js',
    iconName: 'nodejs.svg',
    uses: 'Backend',
    animationDelay: '-1.8s',
  },
  {
    title: 'MongoDB',
    iconName: 'mongoDB.svg',
    uses: 'Database',
    animationDelay: '-3.6s',
  },
  {
    title: 'Socket.io',
    iconName: 'socketIO.svg',
    uses: 'Realtime',
    animationDelay: '-5.4s',
  },
  {
    title: 'WebRTC',
    iconName: 'webRTC.svg',
    uses: 'Calls',
    animationDelay: '-7.2s',
  },
  {
    title: 'Tailwind',
    iconName: 'tailwind.svg',
    uses: 'Styling',
    animationDelay: '0s',
  },
  {
    title: 'JWT',
    iconName: 'jwt.svg',
    uses: 'Auth',
    animationDelay: '-2.6s',
  },
  {
    title: 'Cloudinary',
    iconName: 'cloudinary.svg',
    uses: 'Media',
    animationDelay: '-5.2s',
  },
  {
    title: 'Vite',
    iconName: 'vite.svg',
    uses: 'Build',
    animationDelay: '-7.8s',
  },
  {
    title: 'Express',
    iconName: 'express.svg',
    uses: 'API',
    animationDelay: '-10.4s',
  },
  {
    title: 'Passport',
    iconName: 'passport.svg',
    uses: 'OAuth',
    animationDelay: '-13s',
  },
  {
    title: 'Zustand',
    iconName: 'zustand.svg',
    uses: 'State',
    animationDelay: '0s',
  },
  {
    title: 'Web Push',
    iconName: 'notification.svg',
    uses: 'Notification',
    animationDelay: '-2.8s',
  },
  {
    title: 'Web Audio',
    iconName: 'mic.svg',
    uses: 'Audio Calls',
    animationDelay: '-5.7s',
  },
  {
    title: 'Docker',
    iconName: 'docker.svg',
    uses: 'Deployment',
    animationDelay: '-8.5s',
  },
  {
    title: 'Vercel',
    iconName: 'vercel-white.svg',
    uses: 'Deployment',
    animationDelay: '-11.4s',
  },
  {
    title: 'Mongoose',
    iconName: 'mongoose.svg',
    uses: 'Database',
    animationDelay: '-14.2s',
  },
  {
    title: 'Docker',
    iconName: 'docker.svg',
    uses: 'Deployment',
    animationDelay: '-17s',
  },
];

const TechOrbit = () => {
  const revealRef = useRevealOnScroll();
  return (
    <section className="bc-TechOrbit bc-section">
      <div className="bc-section-content">
        <div className="bc-sec-badge reveal-on-scroll" ref={revealRef}>
          Tech Stack
        </div>
        <div className="bc-sec-title reveal-on-scroll" ref={revealRef}>
          Powered by the best
        </div>
        <p className="bc-sec-sub reveal-on-scroll mx-auto!" ref={revealRef}>
          Every tool chosen for a reason — fast, reliable, and battle-tested in production.
        </p>

        <div className="bc-tech-orbit reveal-on-scroll" ref={revealRef}>
          <div className="orbit-ring ring1"></div>
          <div className="orbit-ring ring2"></div>
          <div className="orbit-ring ring3"></div>
          <div className="orbit-center">
            <img src={bcLogo} alt="BaatChat" width={44} height={44} />
          </div>

          <div className="bc-orbit-items-container">
            {techStacks.map((tech, ind) => (
              <div className="orbit-item" key={ind} style={{ animationDelay: tech.animationDelay }}>
                <div className="orbit-icon">
                  <img src={techIcons[`../../assets/techIcons/${tech.iconName}`]} />
                </div>
                <span className="orbit-title">{tech.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechOrbit;
