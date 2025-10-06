import { useState } from 'react';
import {
  MdVideoCall,
  MdMic,
  MdVideocam,
  MdSecurity,
  MdDevices,
  MdGroup,
  MdArrowForward,
  MdAccessTime
} from 'react-icons/md';
import { generateRoomId, isValidRoomId } from '../../utils/roomUtils';
import { CameraTest } from '../CameraTest';
import { Header } from '../Header';
import styles from './Landing.module.css';

interface LandingProps {
  onStartCall: (roomId?: string) => void;
}

export const Landing = ({ onStartCall }: LandingProps) => {
  const [joinRoomId, setJoinRoomId] = useState('');
  const [showCameraTest, setShowCameraTest] = useState(false);
  const [error, setError] = useState('');

  const handleCreateRoom = () => {
    const roomId = generateRoomId();
    onStartCall(roomId);
  };

  const handleJoinRoom = () => {
    const trimmed = joinRoomId.trim();
    if (!trimmed) {
      setError('Room ID is required');
      return;
    }
    if (!isValidRoomId(trimmed)) {
      setError('Invalid room ID format. Room IDs should be in the format: numbers-letters');
      return;
    }
    setError('');
    onStartCall(trimmed);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.trim()) {
      setTimeout(() => onStartCall(pastedText.trim()), 100);
    }
  };

  const features = [
    { icon: <MdVideoCall />, title: 'HD Calls', description: 'High quality video with WebRTC technology' },
    { icon: <MdMic />, title: 'Crystal Clear Audio', description: 'Clear sound with noise cancellation' },
    { icon: <MdSecurity />, title: 'Private & Secure', description: 'Encrypted P2P connection, no data on server' },
    { icon: <MdDevices />, title: 'Multi-device', description: 'Works on desktop, tablet and mobile' },
    { icon: <MdGroup />, title: 'Instant Rooms', description: 'Create or join rooms quickly' },
    { icon: <MdAccessTime />, title: 'Unlimited time', description: 'Using for unlimited time without restrictions' }
  ];

  const handleHelpClick = () => console.log('Help clicked');
  const handleSettingsClick = () => console.log('Settings clicked');
  const handleLoginClick = () => console.log('Login clicked');

  return (
    <div className={styles.landing}>
      <Header onHelpClick={handleHelpClick} onLoginClick={handleLoginClick} onSettingsClick={handleSettingsClick} />
      <div className={styles.content}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Video calls and meetings for everyone</h1>
          <p className={styles.subtitle}>
            Modern, secure and instant video chat.<br />Connect with anyone, anywhere.
          </p>
        </div>
        <div className={styles.features}>
          {features.map((feature, index) => (
            <div className={styles.feature} key={index}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={handleCreateRoom}>
            <MdVideoCall size={24} />
            Create New Room
            <MdArrowForward size={20} />
          </button>
          <div className={styles.secondaryActions}>
            <button className={styles.secondaryButton}>
              <MdMic size={20} />
              How it Works?
            </button>
            <button className={styles.secondaryButton} onClick={() => setShowCameraTest(true)}>
              <MdVideocam size={20} />
              Test Camera
            </button>
          </div>
        </div>
        <div className={styles.joinRoomSection}>
          <h3 className={styles.joinTitle}>Join Existing Room</h3>
          <input
            className={styles.joinInput}
            placeholder="Paste room ID here..."
            type="text"
            value={joinRoomId}
            onChange={(e) => {
              const value = e.target.value;
              setJoinRoomId(value);
              if (value.trim() === '') setError('');
              else if (!isValidRoomId(value.trim()))
                setError('Invalid room ID format. Room IDs should be in the format: numbers-letters');
              else setError('');
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
            onPaste={handlePaste}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.joinButton} onClick={handleJoinRoom} disabled={!joinRoomId.trim() || !!error}>
            Join Room
          </button>
        </div>
        <div className={styles.footer}>🚀 Built with React + TypeScript + WebRTC</div>
        {showCameraTest && <CameraTest onClose={() => setShowCameraTest(false)} />}
      </div>
    </div>
  );
};
