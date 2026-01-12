/**
 * @name Menu Controller
 * @author Relictum
 * @description Restyles the sidebar to a cleaner look when enabled.
 * @version 2.0.0
 */

(function() {
    const STYLE_ID = 'menu-controller-style';
    const ACTIVE_CLASS = 'menu-clean-active';

    const css = `
    #app-sidebar {
        background: linear-gradient(180deg, rgba(24, 32, 41, 0.95) 0%, rgba(28, 38, 49, 0.95) 100%) !important;
        backdrop-filter: blur(16px) !important;
        border-right: 1px solid rgba(255,255,255,0.06) !important;
    }
    #app-sidebar .navItem {
        background: transparent !important;
        border: 1px solid transparent !important;
        border-radius: 10px !important;
        padding: 10px 14px !important;
        color: rgba(225,225,225,0.88) !important;
        transition: background .15s ease, color .15s ease !important;
    }
    #app-sidebar .navItem:hover {
        background: rgba(255,255,255,0.06) !important;
        color: #fff !important;
        border-color: rgba(255,255,255,0.08) !important;
    }
    #app-sidebar .navItem.${ACTIVE_CLASS} {
        background: linear-gradient(90deg, rgba(60,125,194,0.40) 0%, rgba(60,125,194,0.25) 100%) !important;
        color: #fff !important;
        border-color: rgba(60,125,194,0.35) !important;
        box-shadow: inset 0 0 0 1px rgba(60,125,194,0.15) !important;
    }

    .titleBar {
        background: linear-gradient(180deg, rgba(24, 32, 41, 0.92) 0%, rgba(24, 32, 41, 0.88) 100%) !important;
        border-bottom: 1px solid rgba(255,255,255,0.06) !important;
        backdrop-filter: blur(10px) !important;
    }
    .windowControls .controlBtn, .rightControls .controlBtn {
        border-radius: 6px !important;
        margin-left: 4px !important;
        border: 1px solid transparent !important;
    }
    .controlBtn:hover {
        background: rgba(255,255,255,0.08) !important;
        color: #fff !important;
        border-color: rgba(255,255,255,0.06) !important;
    }
    .controlBtn.close:hover {
        background: #e11d48 !important;
        color: #fff !important;
        box-shadow: 0 0 15px rgba(225, 29, 72, 0.35) !important;
        border-color: rgba(225, 29, 72, 0.4) !important;
    }

    /* Extensions page: full-page layout, remove big outer card */
    [class*="addonsView"] {
        background: transparent !important;
        border: none !important;
        border-radius: 0 !important;
        backdrop-filter: none !important;
        padding: 0 !important;
    }
    [class*="addonsContent"] {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 12px 16px 12px !important;
    }
    [class*="viewHeader"] {
        border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
        background: linear-gradient(180deg, rgba(24,32,41,0.85) 0%, rgba(20,26,34,0.85) 100%) !important;
        padding: 12px 16px !important;
        margin: 0 !important;
    }
    [class*="addonsToolbar"] {
        padding: 12px 16px !important;
        background: rgba(255,255,255,0.03) !important;
        border-bottom: 1px solid rgba(255,255,255,0.06) !important;
    }
    
    /* Section headers */
    .mc-section-header {
        margin: 16px 0 8px 0 !important;
        padding: 10px 12px !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-radius: 8px !important;
        background: rgba(255,255,255,0.03) !important;
    }
    [class*="settingsView"] {
        background: rgba(24, 32, 41, 0.75) !important;
        backdrop-filter: blur(14px) !important;
        border: 1px solid rgba(255,255,255,0.06) !important;
        border-radius: 10px !important;
        padding: 20px !important;
    }
    [class*="settingsSection"] {
        background: rgba(0, 0, 0, 0.25) !important;
        border-color: rgba(255,255,255,0.06) !important;
    }
    [class*="viewHeader"] {
        border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
    }
    [class*="addonsListContainer"] {
        padding-right: 8px !important;
    }
    [class*="addonRow"] {
        background: linear-gradient(180deg, rgba(34,44,56,0.70) 0%, rgba(27,34,44,0.70) 100%) !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        border-radius: 10px !important;
        box-shadow: 0 6px 18px rgba(0,0,0,0.35) !important;
        margin: 8px 0 !important;
    }
    [class*="addonRow"]:hover {
        background: linear-gradient(180deg, rgba(42,54,68,0.78) 0%, rgba(32,40,52,0.78) 100%) !important;
        border-color: rgba(255, 255, 255, 0.14) !important;
        transform: translateX(2px) !important;
    }
    
    [class*="sortDropdownTrigger"], [class*="versionOptions"] {
        background: rgba(0, 0, 0, 0.35) !important;
        border-color: rgba(255, 255, 255, 0.14) !important;
        border-radius: 6px !important;
        color: #e5e7eb !important;
    }
    [class*="sortDropdownMenu"] {
        background: #182029 !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        border-radius: 8px !important;
    }
    [class*="sortOption"] {
        color: #c7cacf !important;
    }
    [class*="sortOption"]:hover {
        background: rgba(255,255,255,0.08) !important;
        color: #fff !important;
    }
    [class*="versionBadge"] {
        background: rgba(255, 255, 255, 0.10) !important;
        color: #c7cacf !important;
        border-radius: 6px !important;
        border: 1px solid rgba(255,255,255,0.12) !important;
        padding: 3px 8px !important;
    }
    .mc-badge-official { background: #22c55e !important; color: #0b130c !important; border-color: rgba(34,197,94,0.45) !important; }
    .mc-badge-community { background: #f59e0b !important; color: #1a1200 !important; border-color: rgba(245,158,11,0.45) !important; }
    [class*="addonIconPlaceholder"] {
        background: rgba(255, 255, 255, 0.06) !important;
        color: rgba(255, 255, 255, 0.25) !important;
    }
    [class*="addonModulesBadge"] {
        background: rgba(59, 130, 246, 0.12) !important;
        color: #93c5fd !important;
        border-radius: 10px !important;
    }

    [class*="viewBtnSmall"] {
        background: rgba(255, 255, 255, 0.06) !important;
        color: #c7cacf !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-radius: 6px !important;
    }
    [class*="viewBtnSmall"]:hover {
        background: rgba(255, 255, 255, 0.10) !important;
        color: #fff !important;
        border-color: rgba(255,255,255,0.14) !important;
    }
    [class*="deleteBtnSmall"] {
        background: rgba(225, 29, 72, 0.12) !important;
        color: #fb7185 !important;
        border: 1px solid rgba(225, 29, 72, 0.25) !important;
        border-radius: 6px !important;
    }
    [class*="deleteBtnSmall"]:hover {
        background: rgba(225, 29, 72, 0.20) !important;
        border-color: rgba(225, 29, 72, 0.35) !important;
    }
    [class*="installBtnSmall"] {
        background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%) !important;
        color: #0b1220 !important;
        border-radius: 6px !important;
        border: 1px solid rgba(59, 130, 246, 0.5) !important;
        box-shadow: 0 6px 18px rgba(59,130,246,0.25) !important;
    }
    [class*="installBtnSmall"]:hover:not(:disabled) {
        filter: brightness(1.03) !important;
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25) !important;
    }
    [class*="installBtnSmall"].installed {
        background: rgba(34, 197, 94, 0.15) !important;
        color: #4ade80 !important;
        border-color: rgba(34, 197, 94, 0.35) !important;
    }

    [class*="iconBtnLarge"] {
        border-radius: 8px !important;
        background: rgba(59, 130, 246, 0.10) !important;
        border: 1px solid rgba(59, 130, 246, 0.30) !important;
        color: #93c5fd !important;
    }
    [class*="iconBtnLarge"]:hover {
        background: rgba(59, 130, 246, 0.18) !important;
        box-shadow: 0 0 18px rgba(59, 130, 246, 0.25) !important;
    }
    [class*="locateButton"] {
        border-radius: 6px !important;
        border-style: solid !important;
        border-color: rgba(255, 255, 255, 0.18) !important;
        background: rgba(255, 255, 255, 0.04) !important;
        color: #c7cacf !important;
    }
    [class*="locateButton"]:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        color: #fff !important;
        border-color: rgba(255, 255, 255, 0.28) !important;
    }
    [class*="gameView"] [class*="detailCard"], [class*="aboutView"] [class*="securityCard"], [class*="aboutView"] [class*="gameItem"] {
        background: rgba(0, 0, 0, 0.25) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        border-radius: 8px !important;
    }
    [class*="aboutView"] [class*="gameIconWrapper"] {
        background: rgba(0, 0, 0, 0.30) !important;
    }

    /* Dashboard view */
    [class*="dashboardView"] {
        background: radial-gradient(circle at center, rgba(24,32,41,0.40) 0%, rgba(11,12,16,0.80) 100%) !important;
    }
    @media (min-width: 1200px) and (min-height: 700px) {
        [class*="content-area"]::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image:
                radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 38px 38px;
            opacity: 0.35;
        }
        [class*="dashboardView"] {
            padding: 24px !important;
        }
        [class*="heroSection"] {
            max-width: 1200px !important;
            margin: 0 auto 16px auto !important;
            padding: 28px 24px !important;
            background: linear-gradient(180deg, rgba(24,32,41,0.65) 0%, rgba(18,24,32,0.65) 100%) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            border-radius: 12px !important;
            box-shadow: inset 0 0 40px rgba(0,0,0,0.35) !important;
        }
    }
    [class*="userTag"] {
        background: linear-gradient(180deg, #ffffff 0%, #cfd5db 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        letter-spacing: 1px !important;
    }
    [class*="gameIconCard"] {
        background: rgba(24, 32, 41, 0.60) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        backdrop-filter: blur(8px) !important;
        border-radius: 12px !important;
    }
    [class*="gameIconCard"]:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
    }
    [class*="versionLabel"] {
        opacity: 0.85 !important;
        color: #c7cacf !important;
    }
    [class*="gameIcon"] {
        filter: drop-shadow(0 6px 18px rgba(0,0,0,0.55)) !important;
    }

    /* Game Details: primary action buttons */
    [class*="playButtonLarge"], [class*="installButtonLarge"] {
        background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%) !important;
        color: #0b1220 !important;
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25) !important;
        border-radius: 6px !important;
    }
    [class*="playButtonLarge"]:hover, [class*="installButtonLarge"]:hover {
        filter: brightness(1.06) !important;
    }
    [class*="downloadCompactContainer"] {
        background: rgba(24, 32, 41, 0.75) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        border-radius: 8px !important;
        backdrop-filter: blur(10px) !important;
    }
    [class*="removePathBtn"] {
        color: #60a5fa !important;
    }
    [class*="content-area"], [class*="main-content"] {
        background: linear-gradient(180deg, rgba(24, 32, 41, 0.95) 0%, rgba(28, 38, 49, 0.95) 100%) !important;
    }
    [class*="bg-gradient-overlay"], [class*="bg-vignette"], [class*="app-background"] {
        display: none !important;
    }
    [class*="gameView"] {
        background: transparent !important;
        border: none !important;
        backdrop-filter: none !important;
    }
    `;

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function markActiveButton(targetBtn) {
        try {
            document.querySelectorAll('#app-sidebar button').forEach(b => b.classList.remove(ACTIVE_CLASS));
            if (targetBtn) targetBtn.classList.add(ACTIVE_CLASS);
        } catch (e) {}
    }

    const clickHandler = (e) => {
        const btn = e.target.closest('#app-sidebar .navItem');
        if (!btn) return;
        markActiveButton(btn);
    };

    function init() {
        injectStyle();
        const root = document.getElementById('app-sidebar');
        if (root) {
            root.addEventListener('click', clickHandler, true);
            // Best-effort: mark first nav item active on load
            const firstBtn = root.querySelector('.navItem');
            if (firstBtn) markActiveButton(firstBtn);
        }

        // Apply badges based on text content in Extensions list
        const observer = new MutationObserver(() => {
            document.querySelectorAll('[class*="versionBadge"]').forEach(el => {
                const txt = (el.textContent || '').trim().toLowerCase();
                el.classList.remove('mc-badge-official','mc-badge-community');
                if (txt === 'official') el.classList.add('mc-badge-official');
                if (txt === 'community') el.classList.add('mc-badge-community');
            });
        });
        observer.observe(document.body, { subtree: true, childList: true });
    }

    function cleanup() {
        const style = document.getElementById(STYLE_ID);
        if (style) style.remove();
        const root = document.getElementById('app-sidebar');
        if (root) root.removeEventListener('click', clickHandler, true);
        document.querySelectorAll('#app-sidebar .navItem').forEach(b => b.classList.remove(ACTIVE_CLASS));
    }

    init();
    RelictumAPI.onCleanup(cleanup);
    console.log('[Menu Controller] Sidebar restyle applied');
})();
