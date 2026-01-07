import React from 'react';
import styles from './Dashboard.module.css';
import { games } from '../../config/games';
import ipcRenderer from '../../utils/ipc';
import { Users } from 'lucide-react';
import titleImage from '../../assets/logo-new-white.png';

const Dashboard = ({ games, onGameSelect }) => {
  // Helper: Retrieve game icon from configuration
  const getGameIcon = (id) => {
    const game = games.find(g => g.id === id);
    return game ? game.clientIcon : null;
  };

  const handleJoinCommunity = () => {
    ipcRenderer.send('open-external', 'https://www.reddit.com/r/AzerothLegacy/');
  };

  const classicIcon = getGameIcon('classic');
  const tbcIcon = getGameIcon('tbc');
  const wotlkIcon = getGameIcon('wotlk');

  return (
    <div className={styles.dashboardView}>
      <div className={styles.heroSection}>
        <img src={titleImage} alt="Relictum Logo" className={styles.titleImage} />
        <p className={styles.heroDescription}>
          A modern, secure launcher built for gaming. <br/>
          Manage multiple expansions, addons, and settings in one unified hub.
        </p>

        <button className={styles.communityButton} onClick={handleJoinCommunity}>
          <Users className={styles.communityIcon} size={24} />
          <span className={styles.communityText}>JOIN COMMUNITY</span>
        </button>

        <div className={styles.supportedGamesPreview}>
          <div 
            className={styles.gameIconCard} 
            onClick={() => onGameSelect && onGameSelect('classic')}
            style={{ cursor: 'pointer' }}
          >
            <div className={`${styles.iconGlow} ${styles.iconGlowClassic}`}>
              <img 
                src={classicIcon} 
                alt="Classic" 
                className={`${styles.gameIcon} ${styles.gameIconClassic}`} 
              />
            </div>
            <span className={`${styles.versionLabel} ${styles.versionLabelClassic}`}>1.12</span>
          </div>

          <div 
            className={styles.gameIconCard}
            onClick={() => onGameSelect && onGameSelect('tbc')}
            style={{ cursor: 'pointer' }}
          >
            <div className={`${styles.iconGlow} ${styles.iconGlowTbc}`}>
              <img 
                src={tbcIcon} 
                alt="TBC" 
                className={`${styles.gameIcon} ${styles.gameIconTbc}`} 
              />
            </div>
            <span className={`${styles.versionLabel} ${styles.versionLabelTbc}`}>2.4.3</span>
          </div>

          <div 
            className={styles.gameIconCard}
            onClick={() => onGameSelect && onGameSelect('wotlk')}
            style={{ cursor: 'pointer' }}
          >
            <div className={`${styles.iconGlow} ${styles.iconGlowWotlk}`}>
              <img 
                src={wotlkIcon} 
                alt="WotLK" 
                className={`${styles.gameIcon} ${styles.gameIconWotlk}`} 
              />
            </div>
            <span className={`${styles.versionLabel} ${styles.versionLabelWotlk}`}>3.3.5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
