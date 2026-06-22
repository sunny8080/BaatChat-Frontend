import {
  ArchiveRestore,
  ArrowUp,
  Ban,
  Bell,
  Building2,
  CalendarDays,
  CircleCheck,
  CircleUserRound,
  Clock4,
  Cookie,
  Database,
  DatabaseZap,
  Eye,
  File,
  FileChartColumn,
  FileText,
  FolderDown,
  Gavel,
  Globe,
  Hotel,
  Info,
  KeyRound,
  Laptop,
  Link,
  LockKeyhole,
  Mail,
  MapPin,
  MapPinOff,
  MessageCircleMore,
  Mic,
  MonitorX,
  NotebookText,
  NotepadText,
  OctagonAlert,
  Pencil,
  Phone,
  RefreshCcw,
  Scale,
  Server,
  Share2,
  ShieldCheck,
  Target,
  Trash2,
  TriangleAlert,
  UserRound,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import './TermsOfService.scss';
import Footer from '../components/Footer/Footer';
import { useEffect, useState } from 'react';
import GoogleIcon2 from '../assets/social/google2.svg?react';
import BulbIcon from '../assets/others/bulb.svg?react';
import CookieOffIcon from '../assets/others/cookie-off.svg?react';
import CloudinaryIcon from '../assets/techIcons/cloudinary.svg?react';
import SocketIOIcon from '../assets/techIcons/socketIO.svg?react';
import MongoDBIcon from '../assets/techIcons/mongoDB.svg?react';
import WebRTCIcon from '../assets/techIcons/webRTC.svg?react';
import GoogleIcon from '../assets/social/google.svg?react';

const PrivacyPolicy = () => {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('s1');

  useEffect(() => {
    // setup for progress bar and back to top button
    const handlePageScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
      setShowBackToTop(scrollTop > 400);
    };

    document.addEventListener('scroll', handlePageScroll);
    handlePageScroll();

    // highlight left rail link as it's section is into view
    const sections = document.querySelectorAll('section[id].bc-tos-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);

            // bring a tag element into view
            const activeLink = document.querySelector(
              `.bc-tos-toc-item a[href="#${entry.target.id}"]`,
            );
            if (activeLink) {
              activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-80px 0px -70% 0px',
      },
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      document.removeEventListener('scroll', handlePageScroll);
      observer.disconnect();
    };
  }, []);

  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bc-PrivacyPolicy">
      {/* bg orbs  */}
      <div className="bg-orb bg-orb1"></div>
      <div className="bg-orb bg-orb2"></div>
      <div className="bg-orb bg-orb3"></div>

      <div className="bc-tos-progress-bar" style={{ width: `${progress}%` }}></div>
      <div
        className={`bc-tos-back-to-top ${showBackToTop ? 'show' : ''}`}
        aria-label="Back to top"
        onClick={handleBackToTopClick}
      >
        <ArrowUp />
      </div>

      <Navbar />

      {/* HERO section */}
      <div className="bc-tos-hero">
        <div className="hero-tag">
          <FileText />
          Legal Document
        </div>
        <h1 className="hero-title">
          Privacy <span className="grad">Policy</span>
        </h1>
        <p className="hero-sub">
          We believe your privacy is a fundamental right — not a feature. This policy explains
          exactly what data we collect, why we need it, and how it is protected.
        </p>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <CalendarDays />
            Effective: June 21, 2026
          </div>
          <div className="hero-meta-item">
            <Clock4 />
            Last updated: June 21, 2026
          </div>
          <div className="hero-meta-item">
            <MapPin /> Governed by Indian law
          </div>
          <div className="hero-meta-item">
            <ShieldCheck /> DPDP Act 2023 compliant
          </div>
        </div>
      </div>

      {/* COLOR LEGEND */}
      <div className="bc-legend-strip">
        <span className="legend-label">Colour key</span>

        <span className="legend-pill identity">
          <span className="legend-dot"></span>
          <span>Identity data</span>
        </span>

        <span className="legend-pill usage">
          <span className="legend-dot"></span>
          <span>Usage &amp; behavioural</span>
        </span>

        <span className="legend-pill technical">
          <span className="legend-dot"></span>
          <span>Technical &amp; device</span>
        </span>

        <span className="legend-pill user-content">
          <span className="legend-dot"></span>
          <span>User content</span>
        </span>

        <span className="legend-pill third-party">
          <span className="legend-dot"></span>
          <span>Third-party</span>
        </span>
      </div>

      {/* CONTENT */}
      <div className="bc-tos-body">
        {/* Table of Contents */}
        <aside className="bc-tos-toc" aria-label="Table of contents">
          <div className="bc-tos-toc-label">On this page</div>
          <ul className="bc-tos-toc-list">
            <li className="bc-tos-toc-item active">
              <a href="#overview" className={`${activeSectionId === 'overview' ? 'active' : ''}`}>
                <Info />
                Overview
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#data-we-collect"
                className={`${activeSectionId === 'data-we-collect' ? 'active' : ''}`}
              >
                <Database />
                Data We Collect
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#why-we-collect-it"
                className={`${activeSectionId === 'why-we-collect-it' ? 'active' : ''}`}
              >
                <Target />
                Why We Collect It
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#storage-and-security"
                className={`${activeSectionId === 'storage-and-security' ? 'active' : ''}`}
              >
                <LockKeyhole />
                Storage &amp; Security
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#data-sharing"
                className={`${activeSectionId === 'data-sharing' ? 'active' : ''}`}
              >
                <Share2 />
                Data Sharing
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#messages-and-calls"
                className={`${activeSectionId === 'messages-and-calls' ? 'active' : ''}`}
              >
                <MessageCircleMore />
                Messages &amp; Calls
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#third-party-services"
                className={`${activeSectionId === 'third-party-services' ? 'active' : ''}`}
              >
                <GoogleIcon2 />
                Third-Party Services
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#cookies-and-storage"
                className={`${activeSectionId === 'cookies-and-storage' ? 'active' : ''}`}
              >
                <Cookie />
                Cookies &amp; Storage
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#your-rights"
                className={`${activeSectionId === 'your-rights' ? 'active' : ''}`}
              >
                <UserRoundCheck />
                Your Rights
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#children-privacy"
                className={`${activeSectionId === 'children-privacy' ? 'active' : ''}`}
              >
                <UsersRound />
                Children's Privacy
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#international-data-transfers"
                className={`${activeSectionId === 'international-data-transfers' ? 'active' : ''}`}
              >
                <Globe />
                International Transfers
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#policy-updates"
                className={`${activeSectionId === 'policy-updates' ? 'active' : ''}`}
              >
                <RefreshCcw />
                Policy Updates
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#contact-us"
                className={`${activeSectionId === 'contact-us' ? 'active' : ''}`}
              >
                <Mail />
                Contact Us
              </a>
            </li>
          </ul>

          <div className="bc-tos-toc-divider"></div>

          <div className="bc-tos-toc-label mb-2">Colour key</div>

          <div className="bc-toc-mini-legend">
            <div className="toc-legend-item">
              <div className="toc-legend-dot" style={{ background: 'var(--cat-identity)' }}></div>
              <span>Identity data</span>
            </div>
            <div className="toc-legend-item">
              <div className="toc-legend-dot" style={{ background: 'var(--cat-usage)' }}></div>
              <span>Usage &amp; behavioural</span>
            </div>
            <div className="toc-legend-item">
              <div className="toc-legend-dot" style={{ background: 'var(--cat-technical)' }}></div>
              <span>Technical &amp; device</span>
            </div>
            <div className="toc-legend-item">
              <div className="toc-legend-dot" style={{ background: 'var(--cat-content)' }}></div>
              <span>User content</span>
            </div>
            <div className="toc-legend-item">
              <div className="toc-legend-dot" style={{ background: 'var(--cat-third)' }}></div>
              <span>Third-party</span>
            </div>
          </div>
          <div className="bc-tos-toc-divider"></div>
          <div className="mail-title">
            Questions? Email us at
            <br />
            <a href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`} className="mail-link">
              {import.meta.env.VITE_SITE_EMAIL}
            </a>
          </div>
        </aside>

        {/* main content */}
        <div className="bc-tos-content">
          {/* 1. INTRODUCTION */}
          <section className="bc-tos-section" id="overview">
            <div className="section-header">
              <div className="section-num vlt">01</div>
              <div>
                <div className="section-heading">Overview</div>
                <div className="section-desc">Who we are and what this policy covers</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                <strong>BaatChat Team</strong> ("BaatChat", "we", "our", "us") operates the BaatChat
                messaging platform, including the website at{' '}
                <a href="/">{import.meta.env.VITE_FED_URL}</a>, mobile applications (iOS and
                Android), and all associated APIs and services{' '}
                <span style={{ fontSize: '12px', color: 'var(--muted-color)' }}>
                  (mobile applications coming soon...)
                </span>
                .
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, share, and protect your
                personal data when you use BaatChat. It applies to all users regardless of location,
                and is compliant with the{' '}
                <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> (India), the{' '}
                <strong>Information Technology Act, 2000</strong>, and applicable international
                privacy frameworks.
              </p>
              <p>
                By creating an account or using BaatChat in any capacity, you consent to the
                practices described in this policy. If you do not agree, please discontinue using
                the Service and delete your account.
              </p>
            </div>
            <div className="bc-tos-info-box">
              <BulbIcon />
              <div className="info-box-body">
                <strong>Plain English:</strong> We built BaatChat to be a private, secure messaging
                app. We collect only what we need to run the service, we never sell your data, and
                you have full control over what you share with us.
              </div>
            </div>
          </section>

          {/* 2. DATA WE COLLECT  */}
          <section className="bc-tos-section" id="data-we-collect">
            <div className="section-header">
              <div className="section-num vlt">02</div>
              <div>
                <div className="section-heading">Data We Collect</div>
                <div className="section-desc">
                  Every category of personal data BaatChat processes — colour-coded by type
                </div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                We collect data in five categories. Each card below is colour-coded to the legend at
                the top of this page so you can identify at a glance what type of data is involved.
              </p>
            </div>

            <div className="bc-tos-data-grid">
              {/* IDENTITY */}
              <div className="data-card dc-identity">
                <div className="data-card-head">
                  <span className="data-card-icon">
                    <UserRound />
                  </span>
                  <span className="data-card-title">Account Identity</span>
                  <span className="data-card-tag">Identity</span>
                </div>
                <div className="data-card-body">
                  Collected when you register or update your profile.
                </div>
                <div className="data-card-items">
                  <span className="data-chip dc-identity">Full name</span>
                  <span className="data-chip dc-identity">Username</span>
                  <span className="data-chip dc-identity">Email address</span>
                  <span className="data-chip dc-identity">Phone number</span>
                  <span className="data-chip dc-identity">Profile photo</span>
                  <span className="data-chip dc-identity">Bio</span>
                </div>
              </div>

              {/* USAGE */}
              <div className="data-card dc-usage">
                <div className="data-card-head">
                  <span className="data-card-icon">
                    <FileChartColumn />
                  </span>
                  <span className="data-card-title">Usage &amp; Behaviour</span>
                  <span className="data-card-tag">Usage</span>
                </div>
                <div className="data-card-body">Automatically collected as you use the app.</div>
                <div className="data-card-items">
                  <span className="data-chip dc-usage">Login timestamps</span>
                  <span className="data-chip dc-usage">Feature usage</span>
                  <span className="data-chip dc-usage">Last seen</span>
                  <span className="data-chip dc-usage">Read receipts</span>
                  <span className="data-chip dc-usage">Search queries</span>
                  <span className="data-chip dc-usage">Session duration</span>
                </div>
              </div>

              {/* TECHNICAL */}
              <div className="data-card dc-technical">
                <div className="data-card-head">
                  <span className="data-card-icon">
                    <Laptop />
                  </span>
                  <span className="data-card-title">Technical &amp; Device</span>
                  <span className="data-card-tag">Technical</span>
                </div>
                <div className="data-card-body">
                  Collected from your device and network connection.
                </div>
                <div className="data-card-items">
                  <span className="data-chip dc-technical">IP address</span>
                  <span className="data-chip dc-technical">Device type &amp; OS</span>
                  <span className="data-chip dc-technical">Browser / app version</span>
                  <span className="data-chip dc-technical">Device identifiers</span>
                  <span className="data-chip dc-technical">Approximate location</span>
                  <span className="data-chip dc-technical">Push token</span>
                  <span className="data-chip dc-technical">Crash logs</span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="data-card dc-content">
                <div className="data-card-head">
                  <span className="data-card-icon">
                    <MessageCircleMore />
                  </span>
                  <span className="data-card-title">User Content</span>
                  <span className="data-card-tag">Content</span>
                </div>
                <div className="data-card-body">
                  Content you actively create and send through BaatChat.
                </div>
                <div className="data-card-items">
                  <span className="data-chip dc-content">Messages</span>
                  <span className="data-chip dc-content">Voice notes</span>
                  <span className="data-chip dc-content">Images &amp; videos</span>
                  <span className="data-chip dc-content">Shared files</span>
                  <span className="data-chip dc-content">Call metadata</span>
                  <span className="data-chip dc-content">Group activity</span>
                </div>
              </div>

              {/* THIRD-PARTY  */}
              <div className="data-card dc-third span2">
                <div className="data-card-head">
                  <span className="data-card-icon">
                    <Link />
                  </span>
                  <span className="data-card-title">Third-Party &amp; OAuth Data</span>
                  <span className="data-card-tag">Third-party</span>
                </div>
                <div className="data-card-body">
                  Data received from external services you connect to BaatChat, such as Google
                  Sign-In.
                </div>
                <div className="data-card-items">
                  <span className="data-chip dc-third">Google profile name</span>
                  <span className="data-chip dc-third">Google email</span>
                  <span className="data-chip dc-third">Google profile photo</span>
                  <span className="data-chip dc-third">OAuth token (not stored)</span>
                  <span className="data-chip dc-third">Analytics identifiers</span>
                  <span className="data-chip dc-third">Payment processor data</span>
                </div>
              </div>
            </div>

            <div className="bc-tos-warning-box">
              <MapPinOff />
              <div className="warn-box-body">
                <strong>Precise location:</strong> We do not collect your precise GPS location. We
                only derive an approximate city-level location from your IP address for fraud
                prevention and to display the correct country code (+91) on registration forms.
              </div>
            </div>
          </section>

          {/* 3. WHY WE COLLECT IT  */}
          <section className="bc-tos-section" id="why-we-collect-it">
            <div className="section-header">
              <div className="section-num gld">03</div>
              <div>
                <div className="section-heading">Why We Collect It</div>
                <div className="section-desc">
                  The specific legal purpose behind every category of data
                </div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                We only collect data when we have a clear, lawful reason to do so. The table below
                maps each data category to its purpose and the legal basis under the DPDP Act, 2023.
              </p>
            </div>

            <table className="bc-tos-table">
              <thead>
                <tr>
                  <th>Data category</th>
                  <th>Purpose</th>
                  <th>Legal basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="identity">
                    <span className="td-dot"></span>
                    <strong>Identity</strong>
                  </td>
                  <td>
                    Create and manage your account, allow others to find and contact you, verify
                    your identity.
                  </td>
                  <td>Contractual necessity</td>
                </tr>
                <tr>
                  <td className="usage">
                    <span className="td-dot"></span>
                    <strong>Usage</strong>
                  </td>
                  <td>
                    Improve app features, detect unusual activity, show "Online" / "Last seen"
                    status to contacts.
                  </td>
                  <td>Legitimate interest</td>
                </tr>
                <tr>
                  <td className="technical">
                    <span className="td-dot"></span>
                    <strong>Technical</strong>
                  </td>
                  <td>
                    Diagnose errors, prevent fraud, send push notifications, enforce security
                    policies.
                  </td>
                  <td>Legitimate interest / Legal obligation</td>
                </tr>
                <tr>
                  <td className="content">
                    <span className="td-dot"></span>
                    <strong>Content</strong>
                  </td>
                  <td>
                    Deliver your messages and calls in real-time, store media you upload via
                    Cloudinary, enable message history.
                  </td>
                  <td>Contractual necessity</td>
                </tr>
                <tr>
                  <td className="third">
                    <span className="td-dot"></span>
                    <strong>Third-party</strong>
                  </td>
                  <td>
                    Enable Google Sign-In so you can register without a separate password, process
                    payments securely.
                  </td>
                  <td>Consent</td>
                </tr>
              </tbody>
            </table>

            <div className="bc-tos-info-box">
              <Ban />
              <div className="info-box-body">
                <strong>We never sell your data.</strong> BaatChat does not sell, rent, or trade
                your personal data to advertisers or data brokers under any circumstances. Our
                business model is the app itself — not your information.
              </div>
            </div>
          </section>

          {/* 4. STORAGE & SECURITY  */}
          <section className="bc-tos-section" id="storage-and-security">
            <div className="section-header">
              <div className="section-num cat-technical">04</div>
              <div>
                <div className="section-heading">Storage &amp; Security</div>
                <div className="section-desc">How your data is stored and protected</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                We take data security seriously and implement multiple layers of protection to
                safeguard your information.
              </p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <LockKeyhole color="var(--cat-technical)" />
                <span>
                  <strong>Encryption in transit:</strong> All data between your device and BaatChat
                  servers is encrypted using <strong>TLS 1.3</strong>. WebRTC calls use DTLS-SRTP
                  encryption.
                </span>
              </li>
              <li>
                <DatabaseZap color="var(--cat-technical)" />
                <span>
                  <strong>Encryption at rest:</strong> User data stored in our MongoDB database is
                  encrypted at rest using AES-256. Passwords are hashed with <strong>bcrypt</strong>{' '}
                  and are never stored in plaintext.
                </span>
              </li>
              <li>
                <ArchiveRestore color="var(--cat-content)" />
                <span>
                  <strong>Media storage:</strong> Images, videos, and files you share are stored
                  securely on <strong>Cloudinary</strong> with signed access URLs that expire after
                  24 hours.
                </span>
              </li>
              <li>
                <KeyRound color="var(--cat-technical)" />
                <span>
                  <strong>Authentication:</strong> All sessions use signed{' '}
                  <strong>JWT tokens</strong> with short expiry windows. Refresh tokens are stored
                  as HTTP-only cookies.
                </span>
              </li>
              <li>
                <Server color="var(--cat-technical)" />
                <span>
                  <strong>Infrastructure:</strong> Our servers are hosted on reputable cloud
                  providers with SOC 2 Type II certification. Access to production databases is
                  restricted to authorised personnel only via MFA-protected access.
                </span>
              </li>
              <li>
                <Clock4 color="var(--cat-usage)" />
                <span>
                  <strong>Data retention:</strong> Account data is retained for as long as your
                  account is active. After account deletion, personal data is purged within{' '}
                  <strong>30 days</strong>. Backup copies may persist for up to{' '}
                  <strong>90 days</strong> before being overwritten.
                </span>
              </li>
            </ul>
            <div className="bc-tos-danger-box">
              <TriangleAlert />
              <div className="danger-box-body">
                <strong>Report a security issue:</strong> If you discover a vulnerability in
                BaatChat, please disclose it responsibly to{' '}
                <a
                  href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}
                  style={{ color: 'var(--red-color)' }}
                >
                  {import.meta.env.VITE_SITE_EMAIL}
                </a>
                . We operate a responsible disclosure programme and will respond within 48 hours.
              </div>
            </div>
          </section>

          {/* 5. DATA SHARING */}
          <section className="bc-tos-section" id="data-sharing">
            <div className="section-header">
              <div className="section-num cat-third">05</div>
              <div>
                <div className="section-heading">Data Sharing</div>
                <div className="section-desc">Who we share your data with and why</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                We do not share your personal data with third parties except in the limited
                circumstances described below. All third parties we work with are contractually
                required to process your data only for the specific purpose we instruct.
              </p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <Hotel color="var(--cat-third)" />
                <span>
                  <strong>Service providers:</strong> We use Cloudinary (media storage), MongoDB
                  Atlas (database), and email delivery services to operate BaatChat. These providers
                  act as data processors under our instructions.
                </span>
              </li>
              <li>
                <GoogleIcon2 style={{ color: 'var(--cat-third)' }} />
                <span>
                  <strong>Google OAuth:</strong> If you sign in with Google, we receive your name,
                  email, and profile photo from Google. We do not share data back to Google beyond
                  the OAuth handshake.
                </span>
              </li>
              <li>
                <Gavel color="var(--red-color)" />
                <span>
                  <strong>Legal obligations:</strong> We may disclose data to law enforcement or
                  government authorities when required by a valid court order, warrant, or
                  applicable Indian law (e.g., IT Act, 2000 Section 69).
                </span>
              </li>
              <li>
                <Building2 color="var(--lavender-color)" />
                <span>
                  <strong>Business transfers:</strong> In the event of a merger, acquisition, or
                  sale of assets, your data may be transferred to the successor entity. We will
                  notify you via email at least 30 days before any such transfer.
                </span>
              </li>
              <li>
                <CircleUserRound color="var(--cat-content)" />
                <span>
                  <strong>Other users:</strong> Your username, profile photo, bio, and "last seen"
                  status are visible to users you communicate with, subject to your privacy
                  settings.
                </span>
              </li>
            </ul>
            <div className="bc-tos-success-box">
              <ShieldCheck />
              <div className="success-box-body">
                <strong>No advertising networks.</strong> We do not share your data with any
                advertising networks, social media trackers, or analytics platforms that build
                advertising profiles. BaatChat is ad-free.
              </div>
            </div>
          </section>

          {/* 6. MESSAGES & CALLS  */}
          <section className="bc-tos-section" id="messages-and-calls">
            <div className="section-header">
              <div className="section-num grn">06</div>
              <div>
                <div className="section-heading">Messages &amp; Calls</div>
                <div className="section-desc">How your communications are handled</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                Your communications are at the core of what BaatChat does. Here is exactly how we
                handle them:
              </p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <MessageCircleMore color="var(--cat-content)" />
                <span>
                  <strong>Message content:</strong> Messages are transmitted via Socket.io over
                  encrypted TLS connections and stored in our database so you can access your
                  history across devices. We do not read the content of your messages unless legally
                  compelled.
                </span>
              </li>
              <li>
                <Phone color="var(--cat-content)" />
                <span>
                  <strong>Voice &amp; video calls:</strong> Calls use{' '}
                  <strong>WebRTC peer-to-peer</strong> connections where possible. Call audio and
                  video are never recorded or stored by BaatChat. We only retain{' '}
                  <strong>call metadata</strong> (who called whom, duration, timestamp) for billing
                  and abuse-detection purposes.
                </span>
              </li>
              <li>
                <Mic color="var(--cat-content)" />
                <span>
                  <strong>Voice notes:</strong> Voice notes are uploaded to Cloudinary and stored as
                  audio files. They are accessible to the sender and recipients for the duration the
                  message exists in the chat.
                </span>
              </li>
              <li>
                <File color="var(--cat-content)" />
                <span>
                  <strong>Shared files:</strong> Files shared in chats are stored on Cloudinary with
                  access restricted to chat participants. Files are not scanned for content by
                  default, but may be reviewed following a valid abuse report.
                </span>
              </li>
              <li>
                <Clock4 color="var(--cat-usage)" />
                <span>
                  <strong>Call metadata retained:</strong> Caller ID (hashed), callee ID (hashed),
                  duration, timestamp, and call type (voice/video). This data is retained for 12
                  months for fraud detection and is never sold.
                </span>
              </li>
            </ul>
            <div className="bc-tos-warning-box">
              <Server />
              <div className="warn-box-body">
                <strong>No true E2E encryption yet:</strong> BaatChat currently encrypts all data in
                transit and at rest, but does not implement client-side end-to-end encryption (where
                only you hold the keys). We plan to introduce E2EE in a future release and will
                update this policy when we do.
              </div>
            </div>
          </section>

          {/* 7. THIRD-PARTY SERVICES  */}
          <section className="bc-tos-section" id="third-party-services">
            <div className="section-header">
              <div className="section-num cat-third">07</div>
              <div>
                <div className="section-heading">Third-Party Services</div>
                <div className="section-desc">External platforms integrated into BaatChat</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                BaatChat integrates with the following third-party services to deliver its
                functionality. Each has its own Privacy Policy governing their use of data.
              </p>
            </div>
            <div className="bc-tod-third-grid">
              <div className="third-card">
                <div className="third-card-head">
                  <div
                    className="third-card-logo"
                    style={{ background: 'rgba(66, 133, 244, 0.15)' }}
                  >
                    <GoogleIcon
                      style={{ color: 'var(--cat-third)', width: '17px', height: '17px' }}
                    />
                  </div>
                  <div>
                    <div className="third-card-name">Google Sign-In</div>
                    <div className="third-card-type">Authentication</div>
                  </div>
                </div>
                <div className="third-card-body">
                  Used for OAuth 2.0 login. We receive your name, email, and profile photo. Google
                  may collect login event data per their{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    style={{ color: 'var(--cat-third)' }}
                  >
                    Privacy Policy
                  </a>
                  .
                </div>
              </div>

              <div className="third-card">
                <div className="third-card-head">
                  <div
                    className="third-card-logo"
                    style={{ background: 'rgba(249, 115, 22, 0.12)' }}
                  >
                    <CloudinaryIcon
                      style={{ color: 'var(--cat-third)', width: '17px', height: '17px' }}
                    />
                  </div>
                  <div>
                    <div className="third-card-name">Cloudinary</div>
                    <div className="third-card-type">Media storage</div>
                  </div>
                </div>
                <div className="third-card-body">
                  All images, videos, voice notes, and files are stored on Cloudinary's CDN. Data is
                  encrypted at rest. See{' '}
                  <a href="https://cloudinary.com/privacy" style={{ color: 'var(--cat-third)' }}>
                    Cloudinary Privacy Policy
                  </a>
                  .
                </div>
              </div>

              <div className="third-card">
                <div className="third-card-head">
                  <div
                    className="third-card-logo"
                    style={{ background: 'rgba(74, 222, 128, 0.1)' }}
                  >
                    <MongoDBIcon
                      style={{ color: 'var(--green-color)', width: '17px', height: '17px' }}
                    />
                  </div>
                  <div>
                    <div className="third-card-name">MongoDB Atlas</div>
                    <div className="third-card-type">Database</div>
                  </div>
                </div>
                <div className="third-card-body">
                  User profiles, messages, and app data are stored in MongoDB Atlas. Data is
                  encrypted at rest and in transit. See{' '}
                  <a
                    href="https://www.mongodb.com/legal/privacy-policy"
                    style={{ color: 'var(--cat-third)' }}
                  >
                    MongoDB Privacy Policy
                  </a>
                  .
                </div>
              </div>

              <div className="third-card">
                <div className="third-card-head">
                  <div
                    className="third-card-logo"
                    style={{ background: 'rgba(59, 130, 246, 0.1)' }}
                  >
                    <Mail
                      style={{ color: 'var(--cat-technical)', width: '17px', height: '17px' }}
                    />
                  </div>
                  <div>
                    <div className="third-card-name">Mailgen / SMTP</div>
                    <div className="third-card-type">Email delivery</div>
                  </div>
                </div>
                <div className="third-card-body">
                  Used to send OTP verification emails and password reset links. We pass only your
                  email address to the delivery service — no message content.
                </div>
              </div>

              <div className="third-card">
                <div className="third-card-head">
                  <div
                    className="third-card-logo"
                    style={{ background: 'rgba(124, 58, 237, 0.12)' }}
                  >
                    <SocketIOIcon
                      style={{ color: 'var(--lavender-color)', width: '17px', height: '17px' }}
                    />
                  </div>
                  <div>
                    <div className="third-card-name">Socket.io</div>
                    <div className="third-card-type">Real-time transport</div>
                  </div>
                </div>
                <div className="third-card-body">
                  Powers real-time messaging and presence updates. No data is stored or processed by
                  Socket.io beyond the WebSocket transport layer.
                </div>
              </div>

              <div className="third-card">
                <div className="third-card-head">
                  <div
                    className="third-card-logo"
                    style={{ background: 'rgba(74, 222, 128, 0.1)' }}
                  >
                    <WebRTCIcon
                      style={{ color: 'var(--green-color)', width: '17px', height: '17px' }}
                    />
                  </div>
                  <div>
                    <div className="third-card-name">WebRTC</div>
                    <div className="third-card-type">P2P calls</div>
                  </div>
                </div>
                <div className="third-card-body">
                  Peer-to-peer voice and video calls via WebRTC. Audio/video streams pass directly
                  between users where possible via STUN/TURN relay servers. No call content is
                  stored.
                </div>
              </div>
            </div>
          </section>

          {/* 8. COOKIES  */}
          <section className="bc-tos-section" id="cookies-and-storage">
            <div className="section-header">
              <div className="section-num cat-technical">08</div>
              <div>
                <div className="section-heading">Cookies &amp; Storage</div>
                <div className="section-desc">What we store on your device and why</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                BaatChat uses minimal browser and device storage. We do not use advertising cookies
                or tracking pixels{' '}
                <span style={{ fontSize: '12px', color: 'var(--muted-color)' }}>
                  (for now only)
                </span>
                . The table below lists everything we store on your device:
              </p>
            </div>
            <table className="bc-tos-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>Expiry</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>refreshToken</code>
                  </td>
                  <td>
                    <span className="td-dot technical"></span>
                    HTTP-only cookie
                  </td>
                  <td>Keeps you logged in securely — never accessible by JavaScript.</td>
                  <td>30 days</td>
                </tr>
                <tr>
                  <td>
                    <code>accessToken</code>
                  </td>
                  <td>
                    <span className="td-dot technical"></span>
                    HTTP-only cookie
                  </td>
                  <td>
                    Authenticate you and your requests to protected routes — never accessible by
                    JavaScript.
                  </td>
                  <td>15 min</td>
                </tr>
                <tr>
                  <td>
                    <code>bc_theme</code>
                  </td>
                  <td>
                    <span className="td-dot usage"></span>
                    localStorage
                  </td>
                  <td>Remembers your dark/light mode preference.</td>
                  <td>Permanent (user-cleared)</td>
                </tr>
                <tr>
                  <td>
                    <code>bc_session</code>
                  </td>
                  <td>
                    <span className="td-dot technical"></span>
                    sessionStorage
                  </td>
                  <td>Holds your active JWT access token in memory for the current tab session.</td>
                  <td>Tab close</td>
                </tr>
                <tr>
                  <td>
                    <code>bc_notif_prefs</code>
                  </td>
                  <td>
                    <span className="td-dot usage"></span>
                    localStorage
                  </td>
                  <td>Stores your notification settings (sounds, previews, etc.) locally.</td>
                  <td>Permanent (user-cleared)</td>
                </tr>
              </tbody>
            </table>
            <div className="bc-tos-success-box">
              <CookieOffIcon />
              <div className="success-box-body">
                <strong>Not much tracking cookies.</strong> We are only using Google Analytics for
                tracking purpose for some special scenarios, We do not use Facebook Pixel, or any
                other third-party tracking scripts that follow you across websites. Our only
                analytics are server-side and anonymised.
              </div>
            </div>
            <div className="section-prose">
              <p>
                You can clear all stored data at any time by clearing your browser's site data for{' '}
                {import.meta.env.VITE_FED_URL}, or via Settings → Privacy → Clear Session Data
                within the app.
              </p>
            </div>
          </section>

          {/* 9. USER RIGHTS*/}
          <section className="bc-tos-section" id="your-rights">
            <div className="section-header">
              <div className="section-num grn">09</div>
              <div>
                <div className="section-heading">Your Rights</div>
                <div className="section-desc">Full control over your personal data</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                Under the Digital Personal Data Protection Act, 2023 (India) and applicable
                international frameworks, you have the following rights regarding your personal
                data:
              </p>
            </div>
            <div className="bc-tod-rights-grid">
              <div className="right-card">
                <div className="right-icon">
                  <Eye />
                </div>
                <div>
                  <div className="right-title">Right to Access</div>
                  <div className="right-body">
                    Request a copy of all personal data BaatChat holds about you, including your
                    profile, messages, and call metadata.
                  </div>
                  <div className="right-how">→ Settings → Privacy → Request my data</div>
                </div>
              </div>
              <div className="right-card">
                <div className="right-icon">
                  <Pencil />
                </div>
                <div>
                  <div className="right-title">Right to Correction</div>
                  <div className="right-body">
                    Update or correct inaccurate personal data such as your name, email, username,
                    or phone number at any time.
                  </div>
                  <div className="right-how">→ Settings → Profile → Edit</div>
                </div>
              </div>
              <div className="right-card">
                <div className="right-icon">
                  <Trash2 />
                </div>
                <div>
                  <div className="right-title">Right to Erasure</div>
                  <div className="right-body">
                    Permanently delete your account and all associated personal data. Deletion is
                    processed within 30 days.
                  </div>
                  <div className="right-how">→ Settings → Danger Zone → Delete Account</div>
                </div>
              </div>
              <div className="right-card">
                <div className="right-icon">
                  <FolderDown />
                </div>
                <div>
                  <div className="right-title">Right to Portability</div>
                  <div className="right-body">
                    Export your data in a machine-readable format (JSON) including your profile,
                    contacts, and message history.
                  </div>
                  <div className="right-how">→ Settings → Privacy → Export my data</div>
                </div>
              </div>
              <div className="right-card">
                <div className="right-icon">
                  <NotebookText />
                </div>
                <div>
                  <div className="right-title">Right to Object</div>
                  <div className="right-body">
                    Object to processing of your data for purposes based on legitimate interest,
                    such as usage analytics or abuse detection.
                  </div>
                  <div className="right-how">→ Email {import.meta.env.VITE_SITE_EMAIL}</div>
                </div>
              </div>
              <div className="right-card">
                <div className="right-icon">
                  <MonitorX />
                </div>
                <div>
                  <div className="right-title">Right to Withdraw Consent</div>
                  <div className="right-body">
                    Withdraw consent for optional data processing (e.g. Google login, email
                    marketing) at any time without affecting prior processing.
                  </div>
                  <div className="right-how">→ Settings → Privacy → Manage Consent</div>
                </div>
              </div>
              <div className="right-card">
                <div className="right-icon">
                  <NotepadText />
                </div>
                <div>
                  <div className="right-title">Right to Nominate</div>
                  <div className="right-body">
                    Under DPDP Act 2023, you may nominate another individual to exercise your data
                    rights in the event of your incapacity or death.
                  </div>
                  <div className="right-how">→ Email {import.meta.env.VITE_SITE_EMAIL}</div>
                </div>
              </div>
              <div className="right-card">
                <div className="right-icon">
                  <Scale />
                </div>
                <div>
                  <div className="right-title">Right to Complain</div>
                  <div className="right-body">
                    If you believe your rights have been violated, you may lodge a complaint with
                    the Data Protection Board of India.
                  </div>
                  <div className="right-how">→ dpboard.gov.in (when established)</div>
                </div>
              </div>
            </div>
            <div className="bc-tos-info-box">
              <Clock4 />
              <div className="info-box-body">
                <strong>Response time:</strong> We will respond to all verifiable data rights
                requests within <strong>30 days</strong>. Complex requests may take up to 90 days,
                in which case we will notify you of the extended timeline.
              </div>
            </div>
          </section>

          {/* 10. CHILDREN  */}
          <section className="bc-tos-section" id="children-privacy">
            <div className="section-header">
              <div className="section-num rd">10</div>
              <div>
                <div className="section-heading">Children's Privacy</div>
                <div className="section-desc">Protections for users under 18</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                BaatChat is not intended for children under the age of <strong>13</strong>. We do
                not knowingly collect personal data from children under 13. If we discover that a
                child under 13 has registered, we will immediately delete their account and all
                associated data.
              </p>
              <p>
                Users between the ages of <strong>13 and 18</strong> may use BaatChat with the
                consent of a parent or legal guardian. If you are a parent and believe your child
                has created an account without your permission, please contact us at{' '}
                <a href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}>
                  {import.meta.env.VITE_SITE_EMAIL}
                </a>
                .
              </p>
            </div>
            <div className="bc-tos-danger-box">
              <OctagonAlert />
              <div className="danger-box-body">
                <strong>Under-13 accounts:</strong> If you are under 13, please do not register. If
                we detect an under-13 account, it will be terminated immediately and reported to our
                data protection officer for review.
              </div>
            </div>
          </section>

          {/* 11. INTERNATIONAL TRANSFERS  */}
          <section className="bc-tos-section" id="international-data-transfers">
            <div className="section-header">
              <div className="section-num cat-technical">11</div>
              <div>
                <div className="section-heading">International Data Transfers</div>
                <div className="section-desc">Where your data may be processed outside India</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                BaatChat's primary servers and database are hosted in India. However, some
                third-party service providers (Cloudinary, MongoDB Atlas) may process your data in
                servers located in other countries, including the United States and the European
                Union.
              </p>
              <p>Where data is transferred internationally, we ensure that:</p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <CircleCheck color="var(--green-color)" />
                <span>
                  The receiving country has been assessed to provide an{' '}
                  <strong>adequate level of data protection</strong>.
                </span>
              </li>
              <li>
                <CircleCheck color="var(--green-color)" />
                <span>
                  We have signed <strong>data processing agreements</strong> with all third-party
                  processors.
                </span>
              </li>
              <li>
                <CircleCheck color="var(--green-color)" />
                <span>
                  Data in transit is always encrypted using <strong>TLS 1.3</strong> regardless of
                  where it is going.
                </span>
              </li>
              <li>
                <CircleCheck color="var(--green-color)" />
                <span>
                  We comply with applicable cross-border transfer provisions of the{' '}
                  <strong>DPDP Act, 2023</strong>.
                </span>
              </li>
            </ul>
          </section>

          {/* 12. POLICY UPDATES  */}
          <section className="bc-tos-section" id="policy-updates">
            <div className="section-header">
              <div className="section-num vlt">12</div>
              <div>
                <div className="section-heading">Policy Updates</div>
                <div className="section-desc">How we notify you when this policy changes</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                We may update this Privacy Policy from time to time. When we make material changes —
                changes that affect how we collect, use, or share your data — we will notify you by:
              </p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <Bell color="var(--lavender-color)" />
                <span>
                  Sending an <strong>in-app notification</strong> at least 14 days before changes
                  take effect.
                </span>
              </li>
              <li>
                <Mail color="var(--lavender-color)" />
                <span>Emailing the address registered on your account.</span>
              </li>
              <li>
                <Clock4 color="var(--lavender-color)" />
                <span>
                  Updating the <strong>"Last updated"</strong> date at the top of this page.
                </span>
              </li>
            </ul>
            <div className="section-prose">
              <p>
                Your continued use of BaatChat after the changes take effect constitutes your
                acceptance of the revised policy. If you disagree with the changes, you may delete
                your account before the effective date.
              </p>
            </div>
          </section>

          {/* 13. CONTACT  */}
          <section className="bc-tos-section" id="contact-us">
            <div className="section-header">
              <div className="section-num grn">13</div>
              <div>
                <div className="section-heading">Contact Us</div>
                <div className="section-desc">Reach our Data Protection Officer</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                If you have any questions, requests, or concerns about this Privacy Policy or your
                personal data, please contact our <strong>Data Protection Officer (DPO)</strong>:
              </p>
            </div>
            <div className="bc-tos-data-grid">
              <div
                className="data-card dc-identity"
                style={{ borderTopColor: 'var(--lavender-color)' }}
              >
                <div className="data-card-head">
                  <span className="data-card-icon">🔒</span>
                  <span className="data-card-title" style={{ color: 'var(--lavender-color)' }}>
                    Privacy &amp; DPO
                  </span>
                </div>
                <div className="data-card-body">
                  <a
                    href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}
                    style={{ color: 'var(--lavender-color)' }}
                  >
                    {import.meta.env.VITE_SITE_EMAIL}
                  </a>
                  <br />
                  Response within 30 days
                </div>
              </div>
              <div
                className="data-card dc-technical"
                style={{ borderTopColor: 'var(--cat-technical)' }}
              >
                <div className="data-card-head">
                  <span className="data-card-icon">🛡️</span>
                  <span className="data-card-title" style={{ color: 'var(--cat-technical)' }}>
                    Security
                  </span>
                </div>
                <div className="data-card-body">
                  <a
                    href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}
                    style={{ color: 'var(--cat-technical)' }}
                  >
                    {import.meta.env.VITE_SITE_EMAIL}
                  </a>
                  <br />
                  Response within 48 hours
                </div>
              </div>
              <div
                className="data-card dc-content"
                style={{ borderTopColor: 'var(--cat-content)', gridColumn: 'span 2' }}
              >
                <div className="data-card-head">
                  <span className="data-card-icon">📬</span>
                  <span className="data-card-title" style={{ color: 'var(--cat-content)' }}>
                    Postal Address
                  </span>
                </div>
                <div className="data-card-body">
                  BaatChat Team <span style={{ color: 'var(--muted-color)' }}>(Sunny Kumar)</span>
                  <br />
                  Data Protection Officer
                  <br />
                  Kolkata, West Bengal — 700 156, India
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
