import { useState } from 'react';
import { 
  MdAccountCircle, 
  MdSettings, 
  MdLogin, 
  MdHelpOutline,
  MdKeyboardArrowDown,
  MdMenu,
  MdClose
} from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

interface HeaderProps {
  onHelpClick?: () => void;
  onSettingsClick?: () => void;
  onLoginClick?: () => void;
}

export const Header = ({ onHelpClick, onSettingsClick, onLoginClick }: HeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const user = { name: 'John Doe', email: 'john@example.com' };

  const handleUserMenuToggle = () => setShowUserMenu(!showUserMenu);
  const handleMobileMenuToggle = () => setShowMobileMenu(!showMobileMenu);
  const handleLogin = () => { onLoginClick?.(); setShowUserMenu(false); };
  const handleLogout = () => { setIsLoggedIn(false); setShowUserMenu(false); };
  const handleSettings = () => { onSettingsClick?.(); setShowUserMenu(false); };
  const handleHelp = () => { onHelpClick?.(); };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 
            className={styles.logo} 
            onClick={() => (window.location.href = '/')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') window.location.href = '/'; }}
          >
            Chat <span className={styles.logoAccent}>Real</span>
          </h2>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navItems}>
            <button className={styles.iconButton} title="Help & Support" onClick={handleHelp}>
              <MdHelpOutline size={22} />
            </button>

            <button className={styles.iconButton} title="Settings" onClick={handleSettings}>
              <MdSettings size={22} />
            </button>

            <div className={styles.userMenu}>
              {isLoggedIn ? (
                <div className={styles.userProfile}>
                  <button className={styles.profileButton} onClick={handleUserMenuToggle}>
                    <MdAccountCircle size={30} />
                    <span className={styles.userName}>{user.name}</span>
                    <MdKeyboardArrowDown 
                      className={`${styles.dropdownIcon} ${showUserMenu ? styles.rotated : ''}`} 
                      size={18}
                    />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        className={styles.dropdown}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={styles.dropdownHeader}>
                          <MdAccountCircle size={26} />
                          <div>
                            <div className={styles.dropdownName}>{user.name}</div>
                            <div className={styles.dropdownEmail}>{user.email}</div>
                          </div>
                        </div>
                        <hr className={styles.dropdownDivider} />
                        <button className={styles.dropdownItem} onClick={handleSettings}>
                          <MdSettings size={18} /> Settings
                        </button>
                        <button className={styles.dropdownItem} onClick={handleHelp}>
                          <MdHelpOutline size={18} /> Help & Support
                        </button>
                        <hr className={styles.dropdownDivider} />
                        <button className={styles.dropdownItem} onClick={handleLogout}>
                          <MdLogin size={18} /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button className={styles.loginButton} onClick={handleLogin}>
                  <MdLogin size={20} /> Sign In
                </button>
              )}
            </div>
          </div>

          <button className={styles.mobileMenuButton} onClick={handleMobileMenuToggle}>
            {showMobileMenu ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <button className={styles.mobileMenuItem} onClick={handleHelp}>
                <MdHelpOutline size={20} /> Help & Support
              </button>
              <button className={styles.mobileMenuItem} onClick={handleSettings}>
                <MdSettings size={20} /> Settings
              </button>

              {isLoggedIn ? (
                <>
                  <div className={styles.mobileUserInfo}>
                    <MdAccountCircle size={24} />
                    <div>
                      <div className={styles.mobileUserName}>{user.name}</div>
                      <div className={styles.mobileUserEmail}>{user.email}</div>
                    </div>
                  </div>
                  <button className={styles.mobileMenuItem} onClick={handleLogout}>
                    <MdLogin size={20} /> Sign Out
                  </button>
                </>
              ) : (
                <button className={styles.mobileMenuItem} onClick={handleLogin}>
                  <MdLogin size={20} /> Sign In
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(showUserMenu || showMobileMenu) && (
        <div 
          className={styles.backdrop}
          onClick={() => { setShowUserMenu(false); setShowMobileMenu(false); }}
        />
      )}
    </header>
  );
};
