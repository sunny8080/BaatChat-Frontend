import { Quote } from 'lucide-react';
import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import { FaStar } from 'react-icons/fa';
import './Testimonials.scss';

const reviews = [
  {
    name: 'Anjali Singh',
    review: 'Finally a chat app that feels Indian. The Haldi Gold, the Hindi-English mix — everything feels like home.',
    role: 'Product Designer',
    location: 'Bengaluru',
    rating: 5,
  },

  {
    name: 'Dev Garg',
    review: 'Open source and self-hostable. As a privacy-first developer, this is exactly what I was looking for.',
    role: 'Backend Engineer',
    location: 'Delhi',
    rating: 5,
  },
  {
    name: 'Neha Patel',
    review: 'Clean MERN architecture and well-documented. A great reference for anyone learning full-stack dev.',
    role: 'Full Stack Dev',
    location: 'Mumbai',
    rating: 5,
  },
  {
    name: 'Manish Kumar',
    review: 'WebRTC call quality is on par with Google Meet. Zero lag, crystal clear audio for daily standups.',
    role: 'Engineering Lead',
    location: 'Pune',
    rating: 4,
  },
];

const Testimonials = () => {
  const revealRef = useRevealOnScroll();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    const centerX = rect.width / 2,
      centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -6,
      ry = ((x - centerX) / centerX) * 6;

    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;

    el.style.setProperty('--mx', ((x / rect.width) * 100).toFixed(1) + '%');
    el.style.setProperty('--my', ((y / rect.height) * 100).toFixed(1) + '%');
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section className="bc-Testimonials bc-section">
      <div className="bc-section-content">
        <div className="bc-sec-badge reveal-on-scroll" ref={revealRef}>
          Why BaatChat
        </div>
        <div className="bc-sec-title reveal-on-scroll" ref={revealRef}>
          Built different. For everyone.
        </div>

        <div className="bc-testimonials">
          {reviews.map((review, ind) => {
            const nm = review.name.trim().split(' ');
            const av = nm[0].charAt(0) + (nm.length > 1 ? nm[1].charAt(0) : '');

            return (
              <div className="bc-testimonial-card reveal-on-scroll" key={ind} ref={revealRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="testimonial-rating">
                  {Array.from({ length: Math.ceil(review.rating) }).map((_, ind) => (
                    <FaStar size={12} color="var(--gold-color)" key={ind} />
                  ))}
                </div>
                <div className="testimonial-quote">
                  <Quote width={16} height={16} />
                </div>
                <div className="testimonial-text">{review.review}</div>
                <div className="testimonial-author">
                  <div className="testimonial-av">{av}</div>
                  <div className="testimonial-user">
                    <div className="testimonial-name">{review.name}</div>
                    <div className="testimonial-role">
                      {review.role},{review.location}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
