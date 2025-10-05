import { 
  MdMic, 
  MdMicOff, 
  MdVideocam, 
  MdVideocamOff, 
  MdCallEnd, 
  MdMessage 
} from 'react-icons/md';
import type { MediaState } from '../../types';
import styles from './Controls.module.css';

interface ControlsProps {
  mediaState: MediaState;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
  onToggleChat?: () => void; // ✅ optional prop for chat
}

export const Controls = ({
  mediaState,
  onToggleAudio,
  onToggleVideo,
  onEndCall,
  onToggleChat
}: ControlsProps) => {
  return (
    <div className={styles.controls}>
      <button 
        className={`${styles.controlButton} ${styles.audioButton} ${!mediaState.audio ? styles.muted : ''}`}
        onClick={onToggleAudio}
        title={mediaState.audio ? 'Mute mic' : 'Unmute mic'}
      >
        {mediaState.audio ? <MdMic size={20} /> : <MdMicOff size={20} />}
      </button>
      
      <button 
        className={`${styles.controlButton} ${styles.videoButton} ${!mediaState.video ? styles.disabled : ''}`}
        onClick={onToggleVideo}
        title={mediaState.video ? 'Turn off camera' : 'Turn on camera'}
      >
        {mediaState.video ? <MdVideocam size={20} /> : <MdVideocamOff size={20} />}
      </button>

      <button 
        className={`${styles.controlButton} ${styles.chatButton}`}
        onClick={onToggleChat}
        title="Open Chat"
      >
        <MdMessage size={20} />
      </button>
      
      <button 
        className={`${styles.controlButton} ${styles.endCallButton}`}
        onClick={onEndCall}
        title="End Call"
      >
        <MdCallEnd size={20} />
      </button>
    </div>
  );
};
