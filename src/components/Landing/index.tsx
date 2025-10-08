import { useState, useEffect } from 'react';
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

  const handleCreateRoom = () => {
    const roomId = generateRoomId();
    onStartCall(roomId);
  };

  const handleJoinRoom = () => {
    if (joinRoomId.trim()) onStartCall(joinRoomId.trim());
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.trim()) setTimeout(() => onStartCall(pastedText.trim()), 100);
  };

  // Features / Services
  const features = [
    { icon: <MdVideoCall />, title: 'HD Calls', description: 'Enjoy crystal-clear HD video meetings without lag.' },
    { icon: <MdMic />, title: 'Crystal Clear Audio', description: 'Experience noise-free, crisp audio quality every time.' },
    { icon: <MdSecurity />, title: 'Private & Secure', description: 'End-to-end encryption ensures your meetings stay private.' },
    { icon: <MdDevices />, title: 'Cross-Device Support', description: 'Works seamlessly on desktop, tablet, and mobile.' },
    { icon: <MdGroup />, title: 'Instant Rooms', description: 'Create or join meetings in just seconds — no signup needed.' },
    { icon: <MdAccessTime />, title: 'Unlimited Duration', description: 'No time limits. Talk as long as you want.' },
    { icon: <MdScreenShare />, title: 'Screen Sharing', description: 'Share your screen or specific apps for easy collaboration.' },
    { icon: <MdArrowForward />, title: 'Meeting Recording', description: 'Record your meetings for future reference or sharing.' },
    { icon: <MdOutlinePlayCircleFilled />, title: 'Live Streaming', description: 'Broadcast meetings to large audiences seamlessly.' },
    { icon: <MdChat />, title: 'Live Chat', description: 'Send messages, links, and files during the call.' },
    { icon: <MdDevices />, title: 'Device Flexibility', description: 'Switch between devices without losing your session.' },
    { icon: <MdLock />, title: 'Meeting Passwords', description: 'Protect meetings with optional passcodes for added security.' },
  ];

  // Testimonials
  const testimonials = [
    { name: 'Amit Sharma', comment: 'Super smooth video quality — feels like Zoom but simpler!', rating: 5, avatar: 'https://i.pravatar.cc/100?img=1' },
    { name: 'Sara Thomas', comment: 'Loved the no-login feature. Secure and instant!', rating: 4, avatar: 'https://i.pravatar.cc/100?img=2' },
    { name: 'Ravi Patel', comment: 'Perfect for quick team catchups. Just send a room ID and go!', rating: 5, avatar: 'https://i.pravatar.cc/100?img=3' },
    { name: 'Neha Singh', comment: 'Easy to use and highly responsive. Great UI!', rating: 5, avatar: 'https://i.pravatar.cc/100?img=4' },
    { name: 'John Doe', comment: 'Reliable and fast. No lag even in group calls!', rating: 5, avatar: 'https://i.pravatar.cc/100?img=5' },
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className={styles.landing}>
      <Header />

      {/* HERO SECTION */}
      <motion.section className={styles.hero} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className={styles.title}>
          Seamless <span className={styles.gradientText}>Video Meetings</span> for Everyone
        </h1>
        <p className={styles.subtitle}>Connect securely and instantly — anytime, anywhere, without signup.</p>
        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={handleCreateRoom}>
            <MdVideoCall size={24} /> Create Room <MdArrowForward size={20} />
          </button>
          <div className={styles.secondaryActions}>
            <button className={styles.secondaryButton} onClick={() => setShowCameraTest(true)}>
              <MdVideocam size={20} /> Test Camera
            </button>
            <button className={styles.secondaryButton}>
              <MdMic size={20} /> How It Works
            </button>
          </div>
        </div>
      </motion.section>

      {/* JOIN ROOM */}
      <motion.section className={styles.joinRoomSection} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className={styles.joinTitle}>Join a Room</h3>
        <input className={styles.joinInput} placeholder="Enter or paste room ID..." value={joinRoomId} onChange={(e) => setJoinRoomId(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()} onPaste={handlePaste} />
        <button className={styles.joinButton} disabled={!joinRoomId.trim()} onClick={handleJoinRoom}>Join</button>
      </motion.section>

      {/* FEATURES */}
      <section className={styles.features}>
        {features.map((f, i) => (
          <motion.div key={i} className={styles.feature} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 200 }}>
            <div className={styles.featureIcon}>{f.icon}</div>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.description}</p>
          </motion.div>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Users Say</h2>
        <AnimatePresence mode="wait">
          <motion.div key={currentTestimonial} className={styles.testimonialCard} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <img src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} className={styles.avatar} />
            <p className={styles.comment}>{testimonials[currentTestimonial].comment}</p>
            <div className={styles.stars}>
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <MdStar key={i} color="#FFD700" />
              ))}
            </div>
            <span className={styles.userName}>— {testimonials[currentTestimonial].name}</span>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FINAL CTA */}
      <motion.section className={styles.finalCTA} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <h2>Ready to Start Your Next Meeting?</h2>
        <button className={styles.primaryButton} onClick={handleCreateRoom}>
          Start Now <MdArrowForward size={20} />
        </button>
      </motion.section>

      {/* FOOTER */}
    <footer className={styles.footer}>
  <div className={styles.footerLinks}>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
    <a href="#privacy">Privacy Policy</a>
  </div>

  <div className={styles.footerSocials}>
    <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
    <a href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter</a>
    <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
  </div>

  <div className={styles.footerText}>
    🚀 Built with React + TypeScript + WebRTC • © 2025 YourCompany
  </div>
</footer>

      {showCameraTest && <CameraTest onClose={() => setShowCameraTest(false)} />}
    </div>
  );
};
