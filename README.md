# ⚔️ Relictum Launcher

<div align="center">

![Relictum Launcher](public/logo-new-white.png)

**The ultimate, secure, and modern launcher for private servers.**
*Supports 1.12.1 • 2.4.3 • 3.3.5a*


[Download Latest Release](https://github.com/Litas-dev/Relictum-Launcher/releases) • [Report Bug](https://github.com/Litas-dev/Relictum-Launcher/issues) • ![Downloads](https://img.shields.io/github/downloads/Litas-dev/Relictum-Launcher/total?label=Downloads&logo=github&color=blue) • [![Virus Scan](https://github.com/Litas-dev/Relictum-Launcher/actions/workflows/virus_scan.yml/badge.svg)](https://github.com/Litas-dev/Relictum-Launcher/actions/workflows/virus_scan.yml) • [![Build Linux Release](https://github.com/Litas-dev/Relictum-Launcher/actions/workflows/linux-release.yml/badge.svg)](https://github.com/Litas-dev/Relictum-Launcher/actions/workflows/linux-release.yml)

</div>

---

## 📖 About

The **Relictum Launcher** is a powerful, open-source universal launcher designed to modernize your experience across multiple expansions. Whether you play on **1.12.1**, **2.4.3**, or **3.3.5a**, this launcher provides unparalleled security, automated game management, and a seamless addon ecosystem.

It is the first private server launcher to feature **Advanced Integrity Verification**, ensuring that your client code is authentic, safe, and unmodified.

## ✨ Key Features

### 📸 Interface Preview

<div align="center">
  <img src="src/assets/1.12.png" width="30%" alt="Classic Client Interface" />
  <img src="src/assets/2.4.3.png" width="30%" alt="TBC Client Interface" />
  <img src="src/assets/3.3.5.png" width="30%" alt="WotLK Client Interface" />
</div>
<br/>

### 🛡️ Security & Integrity
*   **ASAR Code Verification**: Unlike standard launchers that only check the `.exe`, we verify the cryptographic hash of the internal `app.asar` code archive.
*   **Real-Time Dashboard**: A dedicated security status card in the "About" section provides instant feedback (Secure/Warning/Danger).
*   **Active Threat Monitoring**: Immediate visual alerts on the sidebar if any integrity mismatch is detected.

### 🧩 Next-Gen Addon Manager
*   **Universal Browser**: Browse and install addons.
*   **One-Click Install**: No more unzipping or manual folder management. Just click "Install".
*   **Smart Grouping**: Automatically groups multi-module addons into single, clean entries.
*   **Local Management**: Easily update or delete your existing addons.

### 🔌 Extensible Plugin System
*   **Modular Architecture**: Supports dynamic loading of plugins to extend functionality.
*   **Custom Games**: Plugins can register support for custom servers and expansions beyond the defaults.
*   **Safe Execution**: Plugins run in a sandboxed environment to ensure launcher stability.

### � Global Localization
*   **Multi-Language Support**: Fully localized interface available in **English**, **Spanish**, **German**, **Portuguese**, and **Russian**.
*   **Instant Switching**: Change languages on the fly from the Settings menu.

### �🎨 Immersive Experience
*   **Integrated Music Player**: Enjoy the iconic soundtracks while you browse.
*   **Classic Layout**: A refined user interface that pays homage to the original game launcher while using modern glass-morphism effects.

### ⚡ Smart Game Management
*   **Multi-Version Support**: Built-in support for managing **1.12.1**, **2.4.3**, and **3.3.5a** clients.
*   **Auto-Locate**: Intelligently finds and verifies existing game installations for any supported version.

## 🛠 Tech Stack

*   **Core**: [Electron](https://www.electronjs.org/) (v28)
*   **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Localization**: [i18next](https://www.i18next.com/)
*   **Security**: SHA-256 Integrity Verification
*   **Styling**: CSS Modules + Modern CSS3
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### For Users
1.  Go to the [Releases](https://github.com/Litas-dev/Relictum-Launcher/releases/latest) page.
2.  Download `Relictum.Launcher.Setup.exe`.
3.  Run the installer. The launcher will automatically verify its own integrity on first launch.

### For Developers

**Prerequisites**
*   Node.js (v18 or higher)
*   npm (v9 or higher)

**Installation**

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Litas-dev/Relictum-Launcher.git
    cd Relictum-Launcher
    ```

2.  **Initialize Plugin System (Required)**
    The repository includes public stubs for the plugin engine. You must enable them to run the app:
    
    **Windows (PowerShell):**
    ```powershell
    Copy-Item src/utils/PluginLoader.stub.js src/utils/PluginLoader.js
    Copy-Item src/utils/PluginStore.stub.js src/utils/PluginStore.js
    ```
    
    **Linux/Mac:**
    ```bash
    cp src/utils/PluginLoader.stub.js src/utils/PluginLoader.js
    cp src/utils/PluginStore.stub.js src/utils/PluginStore.js
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Run in development mode**
    ```bash
    npm run dev
    ```

5.  **Build for production**
    ```bash
    npm run build
    ```
    The output executable will be in the `dist_v3.4.5/` directory.
