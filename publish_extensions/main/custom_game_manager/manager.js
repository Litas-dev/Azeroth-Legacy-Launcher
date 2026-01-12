/**
 * @name Custom Game Manager
 * @author Relictum
 * @description Manage multiple game clients.
 */

const STORAGE_KEY = 'extension_custom_games_list';
const PATHS_KEY = 'warmane_game_paths';

// Helper to get stored games
function getStoredGames() {
    try {
        const stored = RelictumAPI.storage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to parse stored games:", e);
        return [];
    }
}

// Helper to save games
function saveStoredGames(games) {
    RelictumAPI.storage.setItem(STORAGE_KEY, JSON.stringify(games));
}

// Initialize: Register all stored games on startup
console.log("Custom Game Manager: Initializing...");

const storedGames = getStoredGames();
storedGames.forEach(game => {
    RelictumAPI.addGame(game);
});

// UI State
let isAdding = false;
let newGameData = { 
    name: '', 
    version: '3.3.5', 
    path: '',
    cardType: 'default', // default, upload, url, none
    cardValue: ''
};

// Render Function
function render() {
    try {
        console.log("Custom Game Manager: Rendering...");
        const games = getStoredGames();
        
        let html = `
        <div style="padding: 40px; max-width: 800px; margin: 0 auto; color: #fff; font-family: 'Segoe UI', sans-serif;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Custom Games</h1>
                <button id="cgm-add-btn" style="
                    background: #3b82f6; 
                    color: white; 
                    border: none; 
                    padding: 10px 20px; 
                    border-radius: 6px; 
                    cursor: pointer;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: background 0.2s;
                ">
                    + Add New Game
                </button>
            </div>

            ${isAdding ? renderForm() : ''}

            <div style="background: rgba(30, 30, 30, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; overflow: hidden;">
                ${games.length === 0 ? `
                    <div style="padding: 40px; text-align: center; color: #888;">
                        No custom games added yet. Click the button above to add one.
                    </div>
                ` : `
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: rgba(0, 0, 0, 0.2); text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <th style="padding: 15px; font-weight: 600; color: #ccc;">Name</th>
                                <th style="padding: 15px; font-weight: 600; color: #ccc;">Version</th>
                                <th style="padding: 15px; font-weight: 600; color: #ccc;">Path</th>
                                <th style="padding: 15px; text-align: right; font-weight: 600; color: #ccc;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${games.map(game => {
                                const path = RelictumAPI.getGamePath(game.id) || 'Not set';
                                return `
                                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                        <td style="padding: 15px; font-weight: 500;">${game.name}</td>
                                        <td style="padding: 15px;">
                                            <span style="
                                                background: rgba(255, 255, 255, 0.1); 
                                                padding: 4px 8px; 
                                                border-radius: 4px; 
                                                font-size: 12px;
                                                color: #ddd;
                                            ">${game.version}</span>
                                        </td>
                                        <td style="padding: 15px; color: #888; font-size: 13px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${path}">
                                            ${path}
                                        </td>
                                        <td style="padding: 15px; text-align: right;">
                                            <button 
                                                class="cgm-delete-btn" 
                                                data-id="${game.id}"
                                                style="
                                                    background: transparent; 
                                                    border: 1px solid #ef4444; 
                                                    color: #ef4444; 
                                                    padding: 6px 12px; 
                                                    border-radius: 4px; 
                                                    cursor: pointer;
                                                    font-size: 12px;
                                                    transition: all 0.2s;
                                                "
                                            >Remove</button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                `}
            </div>
        </div>
    `;

        RelictumAPI.registerPage('custom-game-manager', html);
    } catch(e) {
        console.error("Error in render:", e);
        RelictumAPI.registerPage('custom-game-manager', `<h1>Error Rendering Plugin</h1><pre>${e.message}</pre>`);
    }
}

function renderForm() {
    return `
        <div style="
            background: rgba(30, 30, 30, 0.95); 
            border: 1px solid #444; 
            border-radius: 8px; 
            padding: 20px; 
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        ">
            <h3 style="margin-top: 0; margin-bottom: 20px; font-weight: 500;">Add Client</h3>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #ccc;">Name</label>
                <input id="cgm-new-name" type="text" value="${newGameData.name}" style="
                    width: 100%; 
                    padding: 10px 12px; 
                    background: #1a1a1a; 
                    border: 1px solid #333; 
                    color: white; 
                    border-radius: 6px;
                    outline: none;
                " placeholder="e.g. Warmane Icecrown">
            </div>

            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #ccc;">Expansion</label>
                    <select id="cgm-new-version" style="
                        width: 100%; 
                        padding: 10px 12px; 
                        background: #1a1a1a; 
                        border: 1px solid #333; 
                        color: white; 
                        border-radius: 6px;
                        outline: none;
                    ">
                        <option value="3.3.5" ${newGameData.version === '3.3.5' ? 'selected' : ''}>WotLK (3.3.5)</option>
                        <option value="2.4.3" ${newGameData.version === '2.4.3' ? 'selected' : ''}>TBC (2.4.3)</option>
                        <option value="1.12.1" ${newGameData.version === '1.12.1' ? 'selected' : ''}>Vanilla (1.12.1)</option>
                        <option value="4.3.4" ${newGameData.version === '4.3.4' ? 'selected' : ''}>Cataclysm (4.3.4)</option>
                        <option value="5.4.8" ${newGameData.version === '5.4.8' ? 'selected' : ''}>MoP (5.4.8)</option>
                        <option value="Custom" ${newGameData.version === 'Custom' ? 'selected' : ''}>Other / Custom</option>
                    </select>
                </div>
                
                <div style="flex: 2;">
                    <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #ccc;">Game Executable File</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="cgm-new-path" value="${newGameData.path}" readonly style="
                            flex: 1; 
                            padding: 10px 12px; 
                            background: #1a1a1a; 
                            border: 1px solid #333; 
                            color: #888; 
                            border-radius: 6px;
                            outline: none;
                        " placeholder="Select executable (e.g. Wow.exe)...">
                        <button id="cgm-browse-btn" style="
                            padding: 10px 15px; 
                            background: #444; 
                            color: white; 
                            border: none; 
                            border-radius: 6px; 
                            cursor: pointer;
                            white-space: nowrap;
                        ">Browse...</button>
                    </div>
                </div>
            </div>

            <!-- Card Art Section -->
            <div style="margin-bottom: 20px; border-top: 1px solid #333; padding-top: 20px;">
                <label style="display: block; margin-bottom: 12px; font-size: 14px; color: #ccc;">Card Art (Banner)</label>
                <div style="display: flex; gap: 20px; align-items: flex-start;">
                    <div style="width: 150px;">
                        <select id="cgm-card-type" style="
                            width: 100%; padding: 8px; background: #1a1a1a; border: 1px solid #333; color: white; border-radius: 6px; outline: none;
                        ">
                            <option value="default" ${newGameData.cardType === 'default' ? 'selected' : ''}>Default</option>
                            <option value="upload" ${newGameData.cardType === 'upload' ? 'selected' : ''}>Upload Image</option>
                            <option value="url" ${newGameData.cardType === 'url' ? 'selected' : ''}>Image URL</option>
                            <option value="none" ${newGameData.cardType === 'none' ? 'selected' : ''}>No Art</option>
                        </select>
                    </div>
                    <div style="flex: 1;">
                        ${newGameData.cardType === 'upload' ? `
                            <div style="display: flex; gap: 10px;">
                                <input type="text" value="${newGameData.cardValue}" readonly placeholder="Select image..." style="flex: 1; padding: 8px; background: #1a1a1a; border: 1px solid #333; color: #888; border-radius: 6px;">
                                <button id="cgm-browse-card-btn" style="padding: 8px 15px; background: #444; color: white; border: none; border-radius: 6px; cursor: pointer;">Browse</button>
                            </div>
                        ` : newGameData.cardType === 'url' ? `
                            <input type="text" id="cgm-card-value" value="${newGameData.cardValue}" placeholder="https://example.com/banner.png" style="width: 100%; padding: 8px; background: #1a1a1a; border: 1px solid #333; color: white; border-radius: 6px;">
                        ` : ''}
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid #333; padding-top: 20px;">
                <button id="cgm-cancel-btn" style="
                    padding: 8px 16px; 
                    background: transparent; 
                    color: #aaa; 
                    border: 1px solid #444; 
                    border-radius: 6px; 
                    cursor: pointer;
                ">Cancel</button>
                <button id="cgm-save-btn" style="
                    padding: 8px 16px; 
                    background: #10b981; 
                    color: white; 
                    border: none; 
                    border-radius: 6px; 
                    cursor: pointer;
                    font-weight: 500;
                ">Save Client</button>
            </div>
        </div>
    `;
}

// Handler Functions
const clickHandler = async (e) => {
    // Add Button
    if (e.target.id === 'cgm-add-btn') {
        isAdding = true;
        render();
        setTimeout(() => {
            const el = document.getElementById('cgm-new-name');
            if (el) el.focus();
        }, 50);
    }

    // Cancel Button
    if (e.target.id === 'cgm-cancel-btn') {
        isAdding = false;
        newGameData = { name: '', version: '3.3.5', path: '', cardType: 'default', cardValue: '' };
        render();
    }

    // Browse Button
    if (e.target.id === 'cgm-browse-btn') {
        const path = await RelictumAPI.selectFile();
        if (path) {
            newGameData.path = path;
            const input = document.getElementById('cgm-new-path');
            if (input) input.value = path;
        }
    }

    // Save Button
    if (e.target.id === 'cgm-save-btn') {
        const nameInput = document.getElementById('cgm-new-name');
        const versionInput = document.getElementById('cgm-new-version');
        const pathInput = document.getElementById('cgm-new-path');

        const name = nameInput ? nameInput.value : '';
        const version = versionInput ? versionInput.value : '3.3.5';
        const path = pathInput ? pathInput.value : '';

        if (!name || !path) {
            RelictumAPI.toast('Please enter a name and select a path.');
            return;
        }

        const id = `custom-${Date.now()}`;
        
        let cardArt = undefined;
        if (newGameData.cardType === 'none') {
            cardArt = null;
        } else if (newGameData.cardType === 'default') {
            // Use the main app logo as requested by user
            cardArt = RelictumAPI.assets?.defaultLogo;
        } else {
            cardArt = newGameData.cardValue;
        }

        const newGame = {
            id,
            name,
            version,
            cardArt,
            icon: null,
            clientIcon: null
        };

        RelictumAPI.addGame(newGame);
        RelictumAPI.setGamePath(id, path);

        const games = getStoredGames();
        games.push(newGame);
        saveStoredGames(games);

        isAdding = false;
        newGameData = { name: '', version: '3.3.5', path: '', cardType: 'default', cardValue: '' };
        render();
        RelictumAPI.toast('Client added successfully!');
    }

    // Delete Button
    if (e.target.classList.contains('cgm-delete-btn')) {
        const id = e.target.getAttribute('data-id');
        try {
            if (confirm('Are you sure you want to remove this client?')) {
                RelictumAPI.removeGame(id);
                RelictumAPI.setGamePath(id, null);

                let games = getStoredGames();
                games = games.filter(g => g.id !== id);
                saveStoredGames(games);

                render();
                RelictumAPI.toast('Client removed.');
            }
        } catch (err) {
            console.error("Error removing client:", err);
            RelictumAPI.toast("Error removing client: " + err.message);
        }
    }
};

const inputHandler = (e) => {
    if (e.target.id === 'cgm-new-name') newGameData.name = e.target.value;
    if (e.target.id === 'cgm-new-version') newGameData.version = e.target.value;
    
    if (e.target.id === 'cgm-card-type') {
        newGameData.cardType = e.target.value;
        render();
    }
    if (e.target.id === 'cgm-card-value') newGameData.cardValue = e.target.value;
};

// Register Listeners
document.addEventListener('click', clickHandler);
document.addEventListener('input', inputHandler);

// Cleanup
RelictumAPI.onCleanup(() => {
    document.removeEventListener('click', clickHandler);
    document.removeEventListener('input', inputHandler);
    RelictumAPI.removeMenuItem('Manage Custom Games');
    // We should also remove the game button here, but currently no API for that.
});

// Initial Render
render();

// Add Menu Item
RelictumAPI.addMenuItem('Manage Custom Games', 'custom-game-manager');

// =========================================================================
// Customization Feature (Implemented via Plugin)
// =========================================================================

// Function to open the customization modal
function openCustomizeModal(activeGame) {
    console.log("Opening customization for:", activeGame.id);

    // Create Modal Container
    const modalId = 'cgm-customize-modal';
    const existingModal = document.getElementById(modalId);
    if (existingModal) existingModal.remove();

    const modalOverlay = document.createElement('div');
    modalOverlay.id = modalId;
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.background = 'rgba(0, 0, 0, 0.7)';
    modalOverlay.style.zIndex = '10000'; // High z-index to sit on top of everything
    modalOverlay.style.display = 'flex';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.backdropFilter = 'blur(5px)';

    // Get current values
    const store = RelictumAPI.PluginStore; // Direct access if available, or use what we can
    // We can use RelictumAPI.PluginStore.getGameImages(activeGame.id) if exposed.
    // PluginLoader.js exposes it as PluginStore.
    const currentImages = store.getGameImages(activeGame.id) || {};
    const currentGlow = store.getGameGlow(activeGame.id) || 'none';
    const defaultLogo = RelictumAPI.assets?.defaultLogo;
    
    // Initial state values
    let imageUrl = currentImages.cardArt || '';
    let glowColor = currentGlow;

    // Modal Content
    const modalContent = document.createElement('div');
    modalContent.style.background = '#1e1e1e';
    modalContent.style.width = '500px';
    modalContent.style.maxWidth = '90%';
    modalContent.style.borderRadius = '12px';
    modalContent.style.border = '1px solid #333';
    modalContent.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
    modalContent.style.padding = '0';
    modalContent.style.overflow = 'hidden';
    modalContent.style.fontFamily = "'Segoe UI', sans-serif";

    modalContent.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; color: #fff; font-size: 18px;">Customize Game Appearance</h3>
            <button id="cgm-modal-close-x" style="background: none; border: none; color: #888; cursor: pointer; font-size: 20px;">&times;</button>
        </div>
        
        <div style="padding: 24px;">
            <!-- Image Section -->
            <div style="margin-bottom: 24px;">
                <label style="display: block; marginBottom: 8px; font-weight: 600; color: #ccc; font-size: 14px;">Game Banner Image</label>
                <div style="display: flex; gap: 10px; margin-top: 8px;">
                    <input 
                        id="cgm-modal-image-input"
                        type="text" 
                        value="${imageUrl}" 
                        placeholder="Enter image URL..."
                        style="
                            flex: 1; 
                            background: rgba(0,0,0,0.3); 
                            border: 1px solid rgba(255,255,255,0.1); 
                            color: #fff; 
                            padding: 10px; 
                            border-radius: 4px;
                            outline: none;
                        "
                    />
                    <button 
                        id="cgm-modal-reset-btn"
                        style="
                            background: rgba(255,255,255,0.1);
                            border: 1px solid rgba(255,255,255,0.1);
                            color: #fff;
                            padding: 0 16px;
                            border-radius: 4px;
                            cursor: pointer;
                            white-space: nowrap;
                            font-size: 13px;
                        "
                    >
                        Reset to Default
                    </button>
                </div>
                <p style="font-size: 12px; color: #888; margin-top: 6px;">
                    Paste a URL for the top banner image.
                </p>
            </div>

            <!-- Glow Section -->
            <div>
                <label style="display: block; marginBottom: 12px; font-weight: 600; color: #ccc; font-size: 14px;">Glow Effect</label>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px;">
                    ${[
                        { label: 'None', value: 'none', color: '#444' },
                        { label: 'White', value: 'rgba(255, 255, 255, 0.6)', color: '#fff' },
                        { label: 'Yellow', value: 'rgba(255, 215, 0, 0.6)', color: '#ffd700' },
                        { label: 'Green', value: 'rgba(16, 185, 129, 0.6)', color: '#10b981' },
                        { label: 'Blue', value: 'rgba(59, 130, 246, 0.6)', color: '#3b82f6' }
                    ].map(option => `
                        <div 
                            class="cgm-glow-option"
                            data-value="${option.value}"
                            style="
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                padding: 8px 12px;
                                background: ${glowColor === option.value ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)'};
                                border: 1px solid ${glowColor === option.value ? option.color : 'transparent'};
                                border-radius: 4px;
                                cursor: pointer;
                                transition: all 0.2s;
                            "
                        >
                            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${option.color};"></div>
                            <span style="font-size: 13px; color: #eee;">${option.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <div style="padding: 20px; border-top: 1px solid #333; display: flex; justify-content: flex-end; gap: 12px; background: #1a1a1a;">
            <button id="cgm-modal-cancel" style="
                padding: 10px 20px; 
                background: transparent; 
                color: #fff; 
                border: 1px solid #444; 
                border-radius: 6px; 
                cursor: pointer;
            ">Cancel</button>
            <button id="cgm-modal-save" style="
                padding: 10px 20px; 
                background: #3b82f6; 
                color: white; 
                border: none; 
                border-radius: 6px; 
                cursor: pointer;
                font-weight: 600;
            ">Save Changes</button>
        </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Event Listeners for Modal Interactions

    // Close / Cancel
    const close = () => modalOverlay.remove();
    document.getElementById('cgm-modal-close-x').onclick = close;
    document.getElementById('cgm-modal-cancel').onclick = close;

    // Reset Image
    document.getElementById('cgm-modal-reset-btn').onclick = () => {
        const input = document.getElementById('cgm-modal-image-input');
        input.value = defaultLogo || '';
    };

    // Glow Selection
    const glowOptions = document.querySelectorAll('.cgm-glow-option');
    glowOptions.forEach(opt => {
        opt.onclick = () => {
            // Update UI
            glowOptions.forEach(o => {
                o.style.background = 'rgba(0,0,0,0.2)';
                o.style.borderColor = 'transparent';
            });
            opt.style.background = 'rgba(255,255,255,0.15)';
            // Find the color from data-value to set border
            const val = opt.getAttribute('data-value');
            // Quick hack to get color back for border
            const colorMap = {
                'none': '#444',
                'rgba(255, 255, 255, 0.6)': '#fff',
                'rgba(255, 215, 0, 0.6)': '#ffd700',
                'rgba(16, 185, 129, 0.6)': '#10b981',
                'rgba(59, 130, 246, 0.6)': '#3b82f6'
            };
            opt.style.borderColor = colorMap[val] || 'transparent';
            
            // Update state
            glowColor = val;
        };
    });

    // Save
    document.getElementById('cgm-modal-save').onclick = () => {
        const input = document.getElementById('cgm-modal-image-input');
        const newUrl = input.value.trim();
        
        const newImages = {};
        if (newUrl && newUrl !== '') {
            newImages.cardArt = newUrl;
        } else {
            // If empty, set to null to hide/reset? 
            // Consistent with previous logic: null to hide.
            // But if user wants default, they should have used reset.
            newImages.cardArt = null;
        }

        RelictumAPI.setGameImages(activeGame.id, newImages);
        RelictumAPI.setGameGlow(activeGame.id, glowColor === 'none' ? null : glowColor);
        
        RelictumAPI.toast("Game appearance updated!");
        close();
    };
}

// Add the Customize Button to Game Details
        RelictumAPI.addGameButton('Customize', openCustomizeModal, 'image', (game) => game.isCustom);

console.log("[Custom Game Manager] Loaded");
