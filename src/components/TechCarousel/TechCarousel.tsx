import './TechCarousel.scss';

const techIcons: Record<string, string> = import.meta.glob<string>('../../assets/techIcons/*.svg', {
  eager: true,
  import: 'default',
});

const techStacks = [
  {
    title: 'React 19',
    iconName: 'react.svg',
    uses: 'Frontend',
  },
  {
    title: 'Node.js',
    iconName: 'nodejs.svg',
    uses: 'Backend',
  },
  {
    title: 'MongoDB',
    iconName: 'mongoDB.svg',
    uses: 'Database',
  },
  {
    title: 'Socket.io',
    iconName: 'socketIO.svg',
    uses: 'Realtime',
  },
  {
    title: 'WebRTC',
    iconName: 'webRTC.svg',
    uses: 'Calls',
  },
  {
    title: 'Tailwind CSS',
    iconName: 'tailwind.svg',
    uses: 'Styling',
  },
  {
    title: 'JWT',
    iconName: 'jwt.svg',
    uses: 'Auth',
  },
  {
    title: 'Cloudinary',
    iconName: 'cloudinary.svg',
    uses: 'Media',
  },
  {
    title: 'Vite',
    iconName: 'vite.svg',
    uses: 'Build',
  },
  {
    title: 'Express',
    iconName: 'express.svg',
    uses: 'API',
  },
  {
    title: 'Passport.js ',
    iconName: 'passport.svg',
    uses: 'OAuth',
  },
  {
    title: 'Zustand',
    iconName: 'zustand.svg',
    uses: 'State',
  },
];

const TechCarousel = () => {
  return (
    <div className="bc-TechCarousel">
      <div className="bc-tech-carousel-track">
        {techStacks?.map((tech, ind) => (
          <div className="bc-tech-pill" key={ind} title={tech.title}>
            <span className="tech-icon">
              <img src={techIcons[`../../assets/techIcons/${tech.iconName}`]} />
            </span>
            <span className="tech-title">{tech.title}</span>
            <span className="tech-uses">{tech.uses}</span>
          </div>
        ))}
        {techStacks?.map((tech, ind) => (
          <div className="bc-tech-pill" key={techStacks.length + ind} title={tech.title}>
            <span className="tech-icon">
              <img src={techIcons[`../../assets/techIcons/${tech.iconName}`]} />
            </span>
            <span className="tech-title">{tech.title}</span>
            <span className="tech-uses">{tech.uses}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechCarousel;
