import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, ChevronDown, FolderOpen, X, Globe } from 'lucide-react';
import styles from './Settings.module.css';
import { themes } from '../../config/themes';

/**
 * Settings Component
 * Manages application preferences including launcher behavior, 
 * theming, and installation paths.
 */
const Settings = ({
  activeGame,
  autoCloseLauncher,
  toggleAutoClose,
  playMusicOnStartup,
  togglePlayMusicOnStartup,
  clearCacheOnLaunch,
  toggleClearCache,
  handleCleanCacheNow,
  currentTheme,
  setCurrentTheme,
  enableNotifications,
  toggleNotifications,
  enableSoundEffects,
  toggleSoundEffects,
  defaultDownloadPath,
  handleSetDefaultPath,
  handleClearDefaultPath
}) => {
  const { t, i18n } = useTranslation();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageDropdownOpen(false);
  };

  const languages = [
    { code: 'en', label: 'settings.english', disabled: false },
    { code: 'es', label: 'settings.spanish', disabled: false },
    { code: 'ru', label: 'settings.russian', disabled: true },
    { code: 'pt', label: 'settings.portuguese', disabled: true },
    { code: 'de', label: 'settings.german', disabled: true },
  ];

  return (
    <div className={styles.settingsView}>
      <h2>{t('settings.title')}</h2>
      
      <div className={styles.settingsSection}>
        <h3>{t('settings.general')}</h3>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>{t('settings.language')}</span>
            <span className={styles.toggleDesc}>{t('settings.language_desc')}</span>
          </div>
          
          <div className={styles.languageSelectorContainer}>
            <div 
              className={styles.languageSelectorTrigger}
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={14} />
                <span>{languages.find(l => l.code === i18n.language)?.label ? t(languages.find(l => l.code === i18n.language).label) : 'English'}</span>
              </div>
              <ChevronDown size={14} />
            </div>

            {isLanguageDropdownOpen && (
              <div className={styles.languageSelectorDropdown}>
                {languages.map((lang) => (
                  <div 
                    key={lang.code}
                    className={`${styles.languageOption} ${i18n.language === lang.code ? styles.selected : ''} ${lang.disabled ? styles.disabled : ''}`}
                    onClick={() => !lang.disabled && changeLanguage(lang.code)}
                    title={lang.disabled ? "Coming Soon" : ""}
                  >
                    <Globe size={14} />
                    {t(lang.label)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h3>{t('settings.launcher_behavior')}</h3>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>{t('settings.auto_close')}</span>
            <span className={styles.toggleDesc}>{t('settings.auto_close_desc')}</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={autoCloseLauncher}
              onChange={toggleAutoClose}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>{t('settings.play_music')}</span>
            <span className={styles.toggleDesc}>{t('settings.play_music_desc')}</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={playMusicOnStartup}
              onChange={togglePlayMusicOnStartup}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.toggleRow}>
           <div className={styles.toggleLabel}>
               <span className={styles.toggleTitle}>{t('settings.clear_cache')}</span>
               <span className={styles.toggleDesc}>{t('settings.clear_cache_desc')}</span>
           </div>
           <div className={styles.cacheControlRow}>
               <button 
                   className={styles.cleanCacheBtn} 
                   onClick={handleCleanCacheNow}
                   title={`Clear cache for ${activeGame ? activeGame.shortName : 'Game'}`}
                   disabled={!activeGame}
               >
                   <Trash2 size={14} /> {t('settings.clean_now')}
               </button>
               <label className={styles.toggleSwitch}>
                   <input 
                       type="checkbox" 
                       checked={clearCacheOnLaunch}
                       onChange={toggleClearCache}
                   />
                   <span className={styles.slider}></span>
               </label>
           </div>
         </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>{t('settings.app_theme')}</span>
            <span className={styles.toggleDesc}>{t('settings.app_theme_desc')}</span>
          </div>
          <div className={styles.themeSelectorContainer}>
            <div 
              className={styles.themeSelectorTrigger}
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
            >
              <div className={styles.themeSelectorLabel}>
                <span className={styles.themeColorPreview} style={{background: themes[currentTheme]?.colors['--primary-gold']}}></span>
                {themes[currentTheme]?.name}
              </div>
              <ChevronDown size={16} style={{transform: isThemeDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'}} />
            </div>
            
            {isThemeDropdownOpen && (
              <div className={styles.themeSelectorDropdown}>
                {Object.values(themes).map(theme => (
                  <div 
                    key={theme.id} 
                    className={`${styles.themeOption} ${currentTheme === theme.id ? styles.selected : ''}`}
                    onClick={() => {
                      setCurrentTheme(theme.id);
                      setIsThemeDropdownOpen(false);
                    }}
                  >
                    <span className={styles.themeColorPreview} style={{background: theme.colors['--primary-gold']}}></span>
                    {theme.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h3>{t('settings.notifications_sound')}</h3>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>{t('settings.notifications')}</span>
            <span className={styles.toggleDesc}>{t('settings.notifications_desc')}</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={enableNotifications}
              onChange={toggleNotifications}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            <span className={styles.toggleTitle}>{t('settings.sound_effects')}</span>
            <span className={styles.toggleDesc}>{t('settings.sound_effects_desc')}</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={enableSoundEffects}
              onChange={toggleSoundEffects}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>


    </div>
  );
};

export default Settings;
