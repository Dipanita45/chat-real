import React, { useEffect, useState } from 'react';
import {
  MdVideoCall,
  MdMic,
  MdVideocam,
  MdSecurity,
  MdDevices,
  MdGroup,
  MdArrowForward,
  MdAccessTime,
  MdOutlinePlayCircleFilled,
  MdStar,
  MdScreenShare,
  MdChat,
  MdLock,
} from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

import { generateRoomId } from '../../utils/roomUtils';
import { CameraTest } from '../CameraTest';
import { Header } from '../Header';

import styles from './Landing.module.css';

interface LandingProps {
  onStartCall: (roomId?: string) => void;
}

export const Landing = ({ onStartCall }: LandingProps) => {
  const [joinRoomId, setJoinRoomId] = useState('');
  const [showCameraTest, setShowCameraTest] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleCreateRoom = () => {
    const roomId = generateRoomId();
    onStartCall(roomId);
  };

  const handleJoinRoom = () => {
    const id = joinRoomId.trim();
    if (id) onStartCall(id);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text').trim();
    if (pastedText) {
      // small delay to let paste finish
      setTimeout(() => onStartCall(pastedText), 100);
    }
  };

  // Services / features list (12 items)
  const features = [
    { icon: <MdVideoCall />, title: 'HD Calls', description: 'Enjoy crystal-clear HD video meetings without lag.' },
    { icon: <MdMic />, title: 'Crystal Clear Audio', description: 'Noise-free, crisp audio for every participant.' },
    { icon: <MdSecurity />, title: 'Private & Secure', description: 'End-to-end encryption; optional meeting passwords.' },
    { icon: <MdDevices />, title: 'Cross-Device', description: 'Seamless on desktop, tablet, and mobile.' },
    { icon: <MdGroup />, title: 'Instant Rooms', description: 'Create or join meetings in seconds — no signup required.' },
    { icon: <MdAccessTime />, title: 'Unlimited Duration', description: 'No forced time limits on meetings.' },
    { icon: <MdScreenShare />, title: 'Screen Sharing', description: 'Share full screen or a single app window.' },
    { icon: <MdArrowForward />, title: 'Recording', description: 'Record meeting sessions for later playback.' },
    { icon: <MdOutlinePlayCircleFilled />, title: 'Live Streaming', description: 'Stream to larger audiences with ease.' },
    { icon: <MdChat />, title: 'Live Chat', description: 'Text, links and file sharing while in-call.' },
    { icon: <MdDevices />, title: 'Device Handover', description: 'Switch devices mid-call without dropping session.' },
    { icon: <MdLock />, title: 'Meeting Passwords', description: 'Optional passcodes for added access control.' },
  ];

  // Testimonials
  const testimonials = [
    { name: 'Amit Sharma', comment: 'Super smooth video quality — feels like Zoom but simpler!', rating: 5, avatar: 'https://i.pravatar.cc/100?img=1' },
    { name: 'Sara Thomas', comment: 'Loved the no-login feature. Secure and instant!', rating: 4, avatar: 'https://i.pravatar.cc/100?img=2' },
    { name: 'Ravi Patel', comment: 'Perfect for quick team catchups. Just send a room ID and go!', rating: 5, avatar: 'https://i.pravatar.cc/100?img=3' },
    { name: 'Neha Singh', comment: 'Easy to use and highly responsive. Great UI!', rating: 5, avatar: 'https://i.pravatar.cc/100?img=4' },
    { name: 'John Doe', comment: 'Reliable and fast. No lag even in group calls!', rating: 5, avatar: 'https://i.pravatar.cc/100?img=5' },
  ];

  // Auto-advance every 5s (pauses while hovered)
  useEffect(() => {
    if (isHovered) return;
    const t = setInterval(() => {
      setCurrentTestimonial((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, [isHovered, testimonials.length]);

  return (
    <div className={styles.landing}>
      <Header />

      {/* HERO */}
      <motion.section className={styles.hero} initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className={styles.title}>
          Seamless <span className={styles.gradientText}>Video Meetings</span> for Everyone
        </h1>
        <p className={styles.subtitle}>Connect securely and instantly — anytime, anywhere, without signup.</p>

        <div className={styles.actions}>
          <button type="button" className={styles.primaryButton} onClick={handleCreateRoom} aria-label="Create room">
            <MdVideoCall size={20} /> Create Room <MdArrowForward size={18} />
          </button>

          <div className={styles.secondaryActions}>
            <button type="button" className={styles.secondaryButton} onClick={() => setShowCameraTest(true)}>
              <MdVideocam size={18} /> Test Camera
            </button>
            <button type="button" className={styles.secondaryButton} onClick={() => window.scrollTo({ top: document.body.scrollHeight * 0.4, behavior: 'smooth' })}>
              <MdMic size={18} /> How It Works
            </button>
          </div>
        </div>
      </motion.section>

      {/* JOIN ROOM */}
      <motion.section className={styles.joinRoomSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className={styles.joinTitle}>Join a Room</h3>
        <input
          className={styles.joinInput}
          placeholder="Enter or paste room ID..."
          value={joinRoomId}
          onChange={(e) => setJoinRoomId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
          onPaste={handlePaste}
          aria-label="Room ID"
        />
        <button type="button" className={styles.joinButton} disabled={!joinRoomId.trim()} onClick={handleJoinRoom}>
          Join
        </button>
      </motion.section>

      {/* FEATURES */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <div className={styles.features}>
          {features.map((f, idx) => (
            <motion.div className={styles.feature} key={idx} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 200 }}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureDesc}>{f.description}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.testimonials} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <h2 className={styles.sectionTitle}>What Our Users Say</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            className={styles.testimonialCard}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45 }}
          >
            <img src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} className={styles.avatar} />
            <p className={styles.comment}>&ldquo;{testimonials[currentTestimonial].comment}&rdquo;</p>
            <div className={styles.stars}>
              {[...Array(testimonials[currentTestimonial].rating)].map((_, s) => (
                <MdStar key={s} color="#FFD700" />
              ))}
            </div>
            <div className={styles.userName}>— {testimonials[currentTestimonial].name}</div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === currentTestimonial ? styles.activeDot : ''}`}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setCurrentTestimonial(i)}
            />
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <motion.section className={styles.finalCTA} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <h2>Ready to Start Your Next Meeting?</h2>
        <button type="button" className={styles.primaryButton} onClick={handleCreateRoom}>
          Start Now <MdArrowForward size={18} />
        </button>
      </motion.section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>🚀 Built with React + TypeScript + WebRTC</div>

          <nav className={styles.footerLinks} aria-label="Footer links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy</a>
          </nav>

          <div className={styles.footerSocials}>
            <a href="https://github.com/yourrepo" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className={styles.footerText}>© {new Date().getFullYear()} YourCompany — All rights reserved.</div>
      </footer>

      {showCameraTest && <CameraTest onClose={() => setShowCameraTest(false)} />}
    </div>
  );
};
