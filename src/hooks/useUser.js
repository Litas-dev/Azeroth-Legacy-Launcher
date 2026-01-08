import { useState, useEffect } from 'react';

const ADJECTIVES = [
  'Ancient', 'Brave', 'Crimson', 'Dark', 'Eternal', 
  'Fierce', 'Glorious', 'Holy', 'Iron', 'Jade',
  'Lunar', 'Mystic', 'Noble', 'Obsidian', 'Primal',
  'Radiant', 'Silent', 'Thunder', 'Vengeful', 'Wild'
];

const NOUNS = [
  'Warrior', 'Mage', 'Rogue', 'Paladin', 'Hunter', 
  'Druid', 'Shaman', 'Warlock', 'Priest', 'Knight',
  'Dragon', 'Phoenix', 'Titan', 'Ghost', 'Spirit',
  'Legend', 'Hero', 'Champion', 'Guardian', 'Slayer'
];

const generateRandomName = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj}${noun}`;
};

const generateDiscriminator = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 1000-9999
};

export const useUser = () => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    discriminator: ''
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.username && parsed.discriminator) {
          setUserProfile(parsed);
        } else {
          createNewProfile();
        }
      } catch (e) {
        createNewProfile();
      }
    } else {
      createNewProfile();
    }
  }, []);

  const createNewProfile = () => {
    const newProfile = {
      username: generateRandomName(),
      discriminator: generateDiscriminator()
    };
    saveProfile(newProfile);
  };

  const saveProfile = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('user_profile', JSON.stringify(profile));
  };

  const updateUsername = (newUsername) => {
    if (!newUsername || newUsername.trim().length === 0) return;
    
    // If name didn't change, do nothing
    if (newUsername.trim() === userProfile.username) return;

    const updatedProfile = {
      ...userProfile,
      username: newUsername.trim()
    };
    saveProfile(updatedProfile);
  };

  return {
    userProfile,
    updateUsername
  };
};
