import { useState } from 'react';
import {
  MdVideoCall,
  MdMic,
  MdVideocam,
  MdSecurity,
  MdDevices,
  MdGroup,
  MdArrowForward,
  MdAccessTime,
} from 'react-icons/md';
import { motion } from 'framer-motion';

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

  const handleCreateRoom = () => {
    const roomId = generateRoomId();
    onStartCall(roomId);
  };

  const handleJoinRoom = () => {
    if (joinRoomId.trim()) {
      onStartCall(joinRoomId.trim());
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.trim()) {
      setTimeout(() => onStartCall(pastedText.trim()), 100);
    }
  };

  const features = [
    {
      icon: <MdVideoCall />,
      title: 'HD Calls',
      description: 'Experience sharp, high-quality video powered by WebRTC.',
    },
    {
      icon: <MdMic />,
      title: 'Crystal Clear Audio',
      description: 'Noise-free, crisp sound clarity for better conversations.',
    },
    {
      icon: <MdSecurity />,
      title: 'Private & Secure',
      description: 'End-to-end encrypted. No data stored on servers.',
    },
    {
      icon: <MdDevices />,
      title: 'Multi-device Ready',
      description: 'Seamless use across desktop, tablet, and mobile.',
    },
    {
      icon: <MdGroup />,
      title: 'Instant Rooms',
      description: 'Join or create rooms in just seconds.',
    },
    {
      icon: <MdAccessTime />,
      title: 'Unlimited Time',
      description: 'Enjoy uninterrupted meetings without restrictions.',
    },
  ];

  return (
    <div className={styles.landing}>
      <Header />

      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className={styles.title}>Seamless Video Meetings for Everyone</h1>
        <p className={styles.subtitle}>
          Connect securely and instantly — anytime, anywhere.
        </p>
      </motion.div>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button className={styles.primaryButton} onClick={handleCreateRoom}>
          <MdVideoCall size={24} />
          Create Room
          <MdArrowForward size={20} />
        </button>

        <div className={styles.secondaryActions}>
          <button className={styles.secondaryButton}>
            <MdMic size={20} />
            How it Works
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => setShowCameraTest(true)}
          >
            <MdVideocam size={20} />
            Test Camera
          </button>
        </div>
      </motion.div>

      <motion.div
        className={styles.joinRoomSection}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className={styles.joinTitle}>Join a Room</h3>
        <div className={styles.joinInputContainer}>
          <input
            className={styles.joinInput}
            placeholder="Enter or paste room ID..."
            type="text"
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
            onPaste={handlePaste}
          />
          <button
            className={styles.joinButton}
            disabled={!joinRoomId.trim()}
            onClick={handleJoinRoom}
          >
            Join
          </button>
        </div>
      </motion.div>

      <div className={styles.features}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={styles.feature}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <footer className={styles.footer}>
        <p>🚀 Built with React + TypeScript + WebRTC</p>
      </footer>

      {showCameraTest && <CameraTest onClose={() => setShowCameraTest(false)} />}
    </div>
  );
};
