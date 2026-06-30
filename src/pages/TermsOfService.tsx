import {
  ArrowUp,
  BadgeInfo,
  Ban,
  BanknoteArrowDown,
  Bell,
  CalendarDays,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock4,
  Copyright,
  CreditCard,
  Eye,
  FileText,
  FlagTriangleRight,
  FolderOpen,
  Gift,
  Globe,
  Info,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircleMore,
  MessageCircleWarning,
  Phone,
  RefreshCcw,
  Scale,
  ShieldAlert,
  ShieldOff,
  Siren,
  TriangleAlert,
  UserRound,
  UserRoundCheck,
  UsersRound,
  WifiOff,
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import './TermsOfService.scss';
import Footer from '../components/Footer/Footer';
import { useEffect, useState } from 'react';
import SEOTags from '../components/SEOTags/SEOTags';

const TermsOfService = () => {
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
    <div className="bc-TermsOfService">
      <SEOTags
        title="Terms of Service | BaatChat"
        description="Review BaatChat's Terms of Service, including user responsibilities, acceptable use, and the terms governing our messaging platform."
        canonicalLink={import.meta.env.VITE_FED_URL + '/terms-of-service'}
        image="terms.png"
        pageType="default"
      />

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
          Terms of <span className="grad">Service</span>
        </h1>
        <p className="hero-sub">
          Please read these terms carefully before using BaatChat. By accessing or using our
          service, you agree to be bound by these terms.
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
        </div>
      </div>

      {/* CONTENT */}
      <div className="bc-tos-body">
        {/* Table of Contents */}
        <aside className="bc-tos-toc" aria-label="Table of contents">
          <div className="bc-tos-toc-label">On this page</div>
          <ul className="bc-tos-toc-list">
            <li className="bc-tos-toc-item active">
              <a
                href="#introduction"
                className={`${activeSectionId === 'introduction' ? 'active' : ''}`}
              >
                <Info />
                Introduction
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#eligibility"
                className={`${activeSectionId === 'eligibility' ? 'active' : ''}`}
              >
                <UserRoundCheck />
                Eligibility
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#permitted-use"
                className={`${activeSectionId === 'permitted-use' ? 'active' : ''}`}
              >
                <CircleCheck />
                Permitted Use
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#prohibited-conduct"
                className={`${activeSectionId === 'prohibited-conduct' ? 'active' : ''}`}
              >
                <Ban />
                Prohibited Conduct
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#user-content"
                className={`${activeSectionId === 'user-content' ? 'active' : ''}`}
              >
                <MessageCircleWarning />
                User Content
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#account-and-termination"
                className={`${activeSectionId === 'account-and-termination' ? 'active' : ''}`}
              >
                <LockKeyhole />
                Account & Termination
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#intellectual-property"
                className={`${activeSectionId === 'intellectual-property' ? 'active' : ''}`}
              >
                <Copyright />
                Intellectual Property
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#disclaimers"
                className={`${activeSectionId === 'disclaimers' ? 'active' : ''}`}
              >
                <ShieldOff />
                Disclaimers
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#limitation-of-liability"
                className={`${activeSectionId === 'limitation-of-liability' ? 'active' : ''}`}
              >
                <TriangleAlert />
                Limitation of Liability
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#refund-policy"
                className={`${activeSectionId === 'refund-policy' ? 'active' : ''}`}
              >
                <BanknoteArrowDown />
                Refund Policy
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#governing-law"
                className={`${activeSectionId === 'governing-law' ? 'active' : ''}`}
              >
                <Globe />
                Governing Law
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#changes-to-these-terms"
                className={`${activeSectionId === 'changes-to-these-terms' ? 'active' : ''}`}
              >
                <RefreshCcw />
                Changes to Terms
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
          <section className="bc-tos-section" id="introduction">
            <div className="section-header">
              <div className="section-num vlt">01</div>
              <div>
                <div className="section-heading">Introduction</div>
                <div className="section-desc">Who we are and what this agreement covers</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                Welcome to <strong>BaatChat</strong> ("we", "our", "us"), a real-time messaging and
                video calling platform available at <a href="/">{import.meta.env.VITE_FED_URL}</a>.
                BaatChat is a personal and open source project from India.
              </p>
              <p>
                These Terms of Service ("Terms") govern your access to and use of the BaatChat
                website, mobile applications, APIs, and all related services (collectively, the
                "Service"). By creating an account or using the Service in any way, you acknowledge
                that you have read, understood, and agree to be bound by these Terms and our{' '}
                <a href="#">Privacy Policy</a>.
              </p>
              <p>
                If you do not agree to these Terms, please discontinue using the Service and delete
                your account.
              </p>
            </div>
            <div className="bc-tos-info-box">
              <Info />
              <div className="info-box-body">
                <strong>Plain English summary:</strong> BaatChat is a chat app made in India 🇮🇳. By
                signing up and using it, you agree to follow these rules. If you don't agree, please
                don't use the app.
              </div>
            </div>
          </section>

          {/* 2. ELIGIBILITY */}
          <section className="bc-tos-section" id="eligibility">
            <div className="section-header">
              <div className="section-num grn">02</div>
              <div>
                <div className="section-heading">Eligibility</div>
                <div className="section-desc">Who can use BaatChat</div>
              </div>
            </div>
            <div className="section-prose">
              <p>To use BaatChat, you must meet all of the following requirements:</p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <CircleCheck />
                <span>
                  Be at least <strong>13 years of age</strong>. Users between 13 and 18 must have
                  parental or guardian consent.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  Provide accurate, truthful registration information including a valid email
                  address and phone number.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  Not be a person barred from receiving services under applicable laws of India or
                  any other jurisdiction.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  Not have had a previously terminated BaatChat account unless you have received our
                  express written permission to re-register.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  Agree to these Terms and our Privacy Policy on your own behalf, or on behalf of an
                  organisation you are authorised to bind.
                </span>
              </li>
            </ul>
            <div className="bc-tos-warning-box">
              <TriangleAlert />
              <div className="warn-box-body">
                <strong>Age restriction:</strong> BaatChat is not intended for children under the
                age of 13. If we discover that a user is under 13, we will immediately terminate
                that account and delete associated data.
              </div>
            </div>
          </section>

          {/* 3. PERMITTED USE */}
          <section className="bc-tos-section" id="permitted-use">
            <div className="section-header">
              <div className="section-num grn">03</div>
              <div>
                <div className="section-heading">Permitted Use</div>
                <div className="section-desc">What you are allowed to do on BaatChat</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                Subject to these Terms, BaatChat grants you a limited, non-exclusive,
                non-transferable, revocable license to access and use the Service for your personal,
                non-commercial communication purposes. You are permitted to:
              </p>
            </div>
            <div className="bc-tos-rule-grid">
              <div className="rule-card allowed">
                <div className="rule-icon">
                  <MessageCircleMore />
                </div>
                <div>
                  <div className="rule-title">Send messages & media</div>
                  <div className="rule-sub">
                    Exchange text, images, voice notes, videos, and files with other users.
                  </div>
                </div>
              </div>
              <div className="rule-card allowed">
                <div className="rule-icon">
                  <Phone />
                </div>
                <div>
                  <div className="rule-title">Make voice & video calls</div>
                  <div className="rule-sub">
                    Initiate and receive peer-to-peer audio and video calls.
                  </div>
                </div>
              </div>
              <div className="rule-card allowed">
                <div className="rule-icon">
                  <UsersRound />
                </div>
                <div>
                  <div className="rule-title">Create & join groups</div>
                  <div className="rule-sub">
                    Create group chats and invite contacts to collaborate.
                  </div>
                </div>
              </div>
              <div className="rule-card allowed">
                <div className="rule-icon">
                  <UserRound />
                </div>
                <div>
                  <div className="rule-title">Manage your profile</div>
                  <div className="rule-sub">
                    Update your username, avatar, bio, and privacy settings.
                  </div>
                </div>
              </div>
              <div className="rule-card allowed">
                <div className="rule-icon">
                  <Bell />
                </div>
                <div>
                  <div className="rule-title">Customise notifications</div>
                  <div className="rule-sub">
                    Control how and when you receive alerts from the Service.
                  </div>
                </div>
              </div>
              <div className="rule-card allowed">
                <div className="rule-icon">
                  <FolderOpen />
                </div>
                <div>
                  <div className="rule-title">Share files</div>
                  <div className="rule-sub">
                    Send documents, PDFs, spreadsheets and other files within size limits.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*  4. PROHIBITED CONDUCT */}
          <section className="bc-tos-section" id="prohibited-conduct">
            <div className="section-header">
              <div className="section-num rd">04</div>
              <div>
                <div className="section-heading">Prohibited Conduct</div>
                <div className="section-desc">Actions that are strictly forbidden on BaatChat</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                You agree not to engage in any of the following prohibited activities. Violations
                may result in immediate suspension or permanent termination of your account, and may
                be reported to relevant authorities.
              </p>
            </div>

            <table className="bc-tos-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Prohibited Activity</th>
                  <th>Consequence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Illegal Content</strong>
                  </td>
                  <td>
                    Sharing, distributing, or soliciting child sexual abuse material (CSAM), content
                    that promotes terrorism, or any content illegal under Indian law or applicable
                    jurisdiction.
                  </td>
                  <td>
                    <span className="td-badge danger">Permanent Ban + Report</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Harassment</strong>
                  </td>
                  <td>
                    Threatening, bullying, doxxing, stalking, or sending repeated unwanted messages
                    to any individual or group.
                  </td>
                  <td>
                    <span className="td-badge danger">Permanent Ban</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Hacking</strong>
                  </td>
                  <td>
                    Attempting to gain unauthorised access to BaatChat servers, databases, or
                    another user's account.
                  </td>
                  <td>
                    <span className="td-badge danger">Permanent Ban + Report</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Reverse Engineering</strong>
                  </td>
                  <td>
                    Decompiling, disassembling, or otherwise attempting to extract source code from
                    the BaatChat application.
                  </td>
                  <td>
                    <span className="td-badge warning">Suspension</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Spam & Bots</strong>
                  </td>
                  <td>
                    Using automated scripts, bots, or scrapers to send bulk messages, harvest user
                    data, or abuse the API.
                  </td>
                  <td>
                    <span className="td-badge warning">Suspension</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Impersonation</strong>
                  </td>
                  <td>
                    Pretending to be another user, BaatChat staff, or any public figure to deceive
                    others.
                  </td>
                  <td>
                    <span className="td-badge warning">Suspension</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Hate Speech</strong>
                  </td>
                  <td>
                    Sharing content that promotes hatred, discrimination, or violence based on race,
                    religion, gender, caste, nationality, or sexual orientation.
                  </td>
                  <td>
                    <span className="td-badge danger">Permanent Ban</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Malware</strong>
                  </td>
                  <td>
                    Sending files or links that contain viruses, trojans, ransomware, or any
                    malicious software.
                  </td>
                  <td>
                    <span className="td-badge danger">Permanent Ban + Report</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bc-tos-danger-box">
              <BadgeInfo />
              <div className="danger-box-body">
                <strong>Zero tolerance:</strong> Activities involving child exploitation, terrorism,
                or hacking will always result in a permanent ban and will be reported to the
                appropriate law enforcement authorities without exception.
              </div>
            </div>
          </section>

          {/* 5. USER CONTENT */}
          <section className="bc-tos-section" id="user-content">
            <div className="section-header">
              <div className="section-num vlt">05</div>
              <div>
                <div className="section-heading">User Content</div>
                <div className="section-desc">Your responsibility for what you send</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                <strong>You are solely responsible for all content</strong> — messages, images,
                videos, files, links, or any other material — that you send, share, or publish
                through BaatChat ("User Content").
              </p>
              <p>By sending content through BaatChat, you represent and warrant that:</p>
            </div>

            <ul className="bc-tos-list">
              <li>
                <CircleCheck />
                <span>
                  You own or have the necessary rights, licences, and consents to share the content.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  Your content does not infringe any third-party intellectual property, privacy, or
                  other rights.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  Your content does not violate these Terms, any applicable law, or any court order.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  You understand that BaatChat does not pre-screen User Content but reserves the
                  right to remove it.
                </span>
              </li>
            </ul>
            <div className="section-prose">
              <p>
                BaatChat grants you a limited licence to use the Service for sending User Content to
                designated recipients. You do <strong>not</strong> transfer ownership of your
                content to BaatChat. However, you grant us a worldwide, royalty-free licence to
                process, store, transmit, and display your content solely to operate and improve the
                Service.
              </p>
            </div>
            <div className="bc-tos-warning-box">
              <Eye />
              <div className="warn-box-body">
                <strong>Content moderation:</strong> We may (but are not obligated to) review, flag,
                or remove User Content that is reported as abusive, illegal, or in violation of
                these Terms. Removal decisions are at our sole discretion. We will notify you when
                practicable unless doing so would compromise a legal investigation.
              </div>
            </div>
            <div className="bc-tos-info-box">
              <WifiOff />
              <div className="info-box-body">
                <strong>Service availability:</strong> BaatChat operates on a best-effort basis. The
                Service may be periodically unavailable due to scheduled maintenance, unforeseen
                outages, or circumstances beyond our control. We are not liable for any loss
                resulting from temporary unavailability.
              </div>
            </div>
          </section>

          {/* 6. ACCOUNT & TERMINATION */}
          <section className="bc-tos-section" id="account-and-termination">
            <div className="section-header">
              <div className="section-num rd">06</div>
              <div>
                <div className="section-heading">Account & Termination</div>
                <div className="section-desc">Account rules and suspension policy</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                <strong>Account security:</strong> You are responsible for maintaining the
                confidentiality of your account credentials. You must notify us immediately at{' '}
                <a href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}>
                  {import.meta.env.VITE_SITE_EMAIL}
                </a>{' '}
                if you suspect unauthorised access. You are liable for all activities conducted
                through your account.
              </p>
              <p>
                <strong>Termination by you:</strong> You may delete your account at any time from
                the Settings → Danger Zone section of the app. Deletion is permanent and we cannot
                recover your data after 30 days.{' '}
                <span style={{ fontSize: '12px', color: 'var(--muted-color)' }}>
                  (Account deletion feature will be avail soon.)
                </span>
              </p>
              <p>
                <strong>Termination by BaatChat:</strong> We reserve the right to suspend or
                permanently terminate your account, with or without notice, if we reasonably believe
                you have:
              </p>
            </div>
            <div className="bc-tos-rule-grid">
              <div className="rule-card forbidden">
                <div className="rule-icon">
                  <TriangleAlert color="var(--gold-color)" />
                </div>
                <div>
                  <div className="rule-title">Violated these Terms</div>
                  <div className="rule-sub">Any breach of the rules in this agreement.</div>
                </div>
              </div>
              <div className="rule-card forbidden">
                <div className="rule-icon">
                  <Siren color="var(--red-color)" />
                </div>
                <div>
                  <div className="rule-title">Abused other users</div>
                  <div className="rule-sub">Harassment, threats, or targeted abuse complaints.</div>
                </div>
              </div>
              <div className="rule-card forbidden">
                <div className="rule-icon">
                  <LockKeyhole color="var(--red-color)" />
                </div>
                <div>
                  <div className="rule-title">Compromised security</div>
                  <div className="rule-sub">Hacking, credential stuffing, or other attacks.</div>
                </div>
              </div>
              <div className="rule-card forbidden">
                <div className="rule-icon">
                  <Scale color="var(--red-color)" />
                </div>
                <div>
                  <div className="rule-title">Legal obligations</div>
                  <div className="rule-sub">
                    A court order or legal authority requires us to act.
                  </div>
                </div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                <strong>Effect of termination:</strong> Upon termination, your access to the Service
                will cease immediately. Your messages remain in recipients' accounts unless they
                delete them. We may retain certain data as required by law.
              </p>
              <p>
                <strong>Appeals:</strong> If you believe your account was terminated in error, you
                may submit an appeal within 30 days to{' '}
                <a href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}>
                  {import.meta.env.VITE_SITE_EMAIL}
                </a>
                . We will review your case within 14 business days.
              </p>
            </div>
          </section>

          {/* 7. INTELLECTUAL PROPERTY */}
          <section className="bc-tos-section" id="intellectual-property">
            <div className="section-header">
              <div className="section-num vlt">07</div>
              <div>
                <div className="section-heading">Intellectual Property</div>
                <div className="section-desc">Ownership of the platform and its assets</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                BaatChat and all its associated content, features, functionality, source code,
                designs, logos, trademarks, trade names, and service marks are the exclusive
                property of{' '}
                <strong>
                  <a
                    href="https://www.linkedin.com/in/sunny8080"
                    style={{ textDecoration: 'none' }}
                  >
                    BaatChat Team
                  </a>{' '}
                </strong>
                and are protected under Indian copyright law, trademark law, and applicable
                international treaties.
              </p>
              <p>
                The BaatChat name, the "Bolo. Suno. Connect karo." tagline, the speech-bubble logo,
                the Haldi Gold morse-code design, and all related marks are our registered or
                unregistered trademarks. You may not use them without our prior written consent.
              </p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <Ban />
                <span>
                  You may not copy, reproduce, modify, translate, or create derivative works of
                  BaatChat software or content.
                </span>
              </li>
              <li>
                <Ban />
                <span>
                  You may not remove or obscure any copyright, trademark, or proprietary notices.
                </span>
              </li>
              <li>
                <Ban />
                <span>
                  You may not use our name or logo to imply endorsement of your product or service.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  You retain ownership of all original content you create and send through BaatChat.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  You may submit bug reports, suggestions, or feedback — we may use such feedback
                  without restriction or compensation.
                </span>
              </li>
            </ul>
          </section>

          {/* 8. DISCLAIMERS */}
          <section className="bc-tos-section" id="disclaimers">
            <div className="section-header">
              <div className="section-num gld">08</div>
              <div>
                <div className="section-heading">Disclaimers</div>
                <div className="section-desc">What BaatChat does not guarantee</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                The Service is provided on an <strong>"as is"</strong> and{' '}
                <strong>"as available"</strong> basis without warranties of any kind, whether
                express or implied. To the maximum extent permitted by applicable law, BaatChat
                expressly disclaims all warranties including but not limited to:
              </p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <CircleAlert />
                <span>
                  Implied warranties of{' '}
                  <strong>merchantability, fitness for a particular purpose</strong>, and
                  non-infringement.
                </span>
              </li>
              <li>
                <CircleAlert />
                <span>
                  That the Service will be <strong>uninterrupted, error-free, or secure</strong> at
                  all times.
                </span>
              </li>
              <li>
                <CircleAlert />
                <span>
                  That any defects or errors in the Service will be corrected within a specific time
                  frame.
                </span>
              </li>
              <li>
                <CircleAlert />
                <span>
                  That the Service is free of viruses or other harmful components introduced by
                  third parties.
                </span>
              </li>
              <li>
                <CircleAlert />
                <span>
                  The accuracy, reliability, or completeness of any content transmitted by other
                  users.
                </span>
              </li>
            </ul>
            <div className="bc-tos-warning-box">
              <WifiOff />
              <div className="warn-box-body">
                <strong>Service outages:</strong> Scheduled maintenance windows will be announced at
                least 24 hours in advance where possible. Unplanned outages due to infrastructure
                issues, DDoS attacks, or third-party failures are not within our control. We aim for
                99.5% uptime but cannot guarantee it.
              </div>
            </div>
          </section>

          {/* 9. LIMITATION OF LIABILITY */}
          <section className="bc-tos-section" id="limitation-of-liability">
            <div className="section-header">
              <div className="section-num rd">09</div>
              <div>
                <div className="section-heading">Limitation of Liability</div>
                <div className="section-desc">The extent of our financial responsibility</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                To the fullest extent permitted by applicable law, BaatChat Team, its directors,
                employees, partners, agents, and licensors shall <strong>not be liable</strong> for
                any:
              </p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <CircleX />
                <span>Indirect, incidental, special, consequential, or punitive damages.</span>
              </li>
              <li>
                <CircleX />
                <span> Loss of profits, data, goodwill, or other intangible losses.</span>
              </li>
              <li>
                <CircleX />
                <span>
                  Damages resulting from unauthorised access to or alteration of your transmissions
                  or data.
                </span>
              </li>
              <li>
                <CircleX />
                <span>Damages resulting from content sent by other users through the Service.</span>
              </li>
              <li>
                <CircleX />
                <span>Damages resulting from any interruption or cessation of the Service.</span>
              </li>
            </ul>
            <div className="section-prose">
              <p>
                In jurisdictions that do not allow the exclusion or limitation of liability for
                consequential or incidental damages, our liability is limited to the maximum extent
                permitted. In all cases, our <strong>total cumulative liability</strong> to you for
                any claims arising from these Terms or the Service shall not exceed the amount you
                paid us in the <strong>12 months preceding the claim</strong>, or ₹1,000 (Indian
                Rupees one thousand), whichever is greater.
              </p>
            </div>
          </section>

          {/* 10. REFUND POLICY */}
          <section className="bc-tos-section" id="refund-policy">
            <div className="section-header">
              <div className="section-num grn">10</div>
              <div>
                <div className="section-heading">Refund Policy</div>
                <div className="section-desc">Payments and subscription refunds</div>
              </div>
            </div>
            <div className="bc-tos-info-box">
              <Gift />
              <div className="info-box-body">
                <strong>Currently free:</strong> BaatChat is currently free to use. This section
                will apply when paid features or subscriptions are introduced.
              </div>
            </div>
            <div className="section-prose">
              <p>
                When BaatChat introduces paid plans or premium features, the following refund policy
                will apply:
              </p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <CircleCheck />
                <span>
                  <strong>7-day refund window:</strong> You may request a full refund within 7 days
                  of your first purchase if you are not satisfied with the Service.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  <strong>Partial refunds:</strong> For annual subscriptions cancelled after the
                  7-day window, we will offer a pro-rated refund for the unused months.
                </span>
              </li>
              <li>
                <CircleX />
                <span>
                  <strong>Non-refundable:</strong> One-time purchases such as custom sticker packs
                  or add-ons are non-refundable once downloaded or used.
                </span>
              </li>
              <li>
                <CircleX />
                <span>
                  <strong>Chargebacks:</strong> Initiating a chargeback without first contacting us
                  may result in immediate account suspension.
                </span>
              </li>
              <li>
                <CircleCheck />
                <span>
                  <strong>Refund method:</strong> Approved refunds will be credited to the original
                  payment method within 5–10 business days.
                </span>
              </li>
            </ul>
            <div className="section-prose">
              <p>
                To request a refund, contact{' '}
                <a href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}>
                  {import.meta.env.VITE_SITE_EMAIL}
                </a>{' '}
                with your order ID and reason for the request.
              </p>
            </div>
          </section>

          {/* 11. GOVERNING LAW */}
          <section className="bc-tos-section" id="governing-law">
            <div className="section-header">
              <div className="section-num vlt">11</div>
              <div>
                <div className="section-heading">Governing Law</div>
                <div className="section-desc">Jurisdiction and dispute resolution</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the{' '}
                <strong>Republic of India</strong>, without regard to its conflict of law
                provisions. The courts of <strong>Kolkata, West Bengal, India</strong> shall have
                exclusive jurisdiction over any disputes arising out of or in connection with these
                Terms or the Service.
              </p>
              <p>
                <strong>Dispute resolution:</strong> Before initiating legal proceedings, both
                parties agree to attempt to resolve any dispute informally by contacting us at{' '}
                <a href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}>
                  {import.meta.env.VITE_SITE_EMAIL}
                </a>
                . We will try to resolve the dispute within 30 days. If the dispute cannot be
                resolved informally, it shall be referred to arbitration under the{' '}
                <strong>Arbitration and Conciliation Act, 1996</strong> of India.
              </p>
              <p>
                <strong>Applicable laws:</strong> Your use of the Service is also subject to
                applicable provisions of the Information Technology Act, 2000 (India), the
                Information Technology (Intermediary Guidelines and Digital Media Ethics Code)
                Rules, 2021, and the Digital Personal Data Protection Act, 2023.
              </p>
            </div>
          </section>

          {/* 12. CHANGES TO TERMS */}
          <section className="bc-tos-section" id="changes-to-these-terms">
            <div className="section-header">
              <div className="section-num vlt">12</div>
              <div>
                <div className="section-heading">Changes to These Terms</div>
                <div className="section-desc">How we notify you of updates</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                We may revise these Terms at any time. When we make material changes, we will notify
                you by:
              </p>
            </div>
            <ul className="bc-tos-list">
              <li>
                <Bell />
                <span>
                  Sending an in-app notification to all active users at least{' '}
                  <strong>14 days before</strong> the changes take effect.
                </span>
              </li>
              <li>
                <Mail />
                <span>Emailing the address associated with your account.</span>
              </li>
              <li>
                <Clock4 />
                <span>Updating the "Last updated" date at the top of this page.</span>
              </li>
            </ul>
            <div className="section-prose">
              <p>
                Your continued use of the Service after the effective date of the revised Terms
                constitutes your acceptance of the changes. If you do not agree to the revised
                Terms, you must stop using the Service and delete your account before the changes
                take effect.
              </p>
            </div>
          </section>

          {/* 13. CONTACT */}
          <section className="bc-tos-section" id="contact-us">
            <div className="section-header">
              <div className="section-num grn">13</div>
              <div>
                <div className="section-heading">Contact Us</div>
                <div className="section-desc">Get in touch with the BaatChat legal team</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                If you have any questions, concerns, or requests regarding these Terms of Service,
                please reach out to us:
              </p>
            </div>
            <div className="bc-tos-rule-grid">
              <div className="rule-card info">
                <div className="rule-icon">
                  <Scale />
                </div>
                <div>
                  <div className="rule-title">Legal & Terms</div>
                  <div className="rule-sub">
                    <a
                      href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}
                      style={{ color: 'var(--lavender-color)' }}
                    >
                      {import.meta.env.VITE_SITE_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
              <div className="rule-card info">
                <div className="rule-icon">
                  <ShieldAlert color="var(--gold-color)" />
                </div>
                <div>
                  <div className="rule-title">Security Issues</div>
                  <div className="rule-sub">
                    <a
                      href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}
                      style={{ color: 'var(--lavender-color)' }}
                    >
                      {import.meta.env.VITE_SITE_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
              <div className="rule-card info">
                <div className="rule-icon">
                  <CreditCard />
                </div>
                <div>
                  <div className="rule-title">Billing & Refunds</div>
                  <div className="rule-sub">
                    <a
                      href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}
                      style={{ color: 'var(--lavender-color)' }}
                    >
                      {import.meta.env.VITE_SITE_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
              <div className="rule-card info">
                <div className="rule-icon">
                  <FlagTriangleRight color="var(--red-color)" />
                </div>
                <div>
                  <div className="rule-title">Report Abuse</div>
                  <div className="rule-sub">
                    <a
                      href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}
                      style={{ color: 'var(--lavender-color)' }}
                    >
                      {import.meta.env.VITE_SITE_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-prose" style={{ marginTop: '18px' }}>
              <p>
                <strong>Postal address:</strong>
                <br />
                BaatChat Team <span style={{ color: 'var(--muted-color)' }}>(Sunny Kumar)</span>
                <br />
                Kolkata, West Bengal — 700 156, India
              </p>
              <p>
                We aim to respond to all enquiries within <strong>5 business days</strong>.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
