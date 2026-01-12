# Relictum Launcher Plugin API

Welcome to the official developer documentation for the Relictum Launcher Plugin System.
Plugins allow you to extend the launcher's functionality, add custom games, create new pages, and integrate with the operating system.

## Getting Started

1.  Navigate to the `plugins/` directory in your launcher installation.
2.  Create a new JavaScript file (e.g., `my-plugin.js`).
3.  The launcher will automatically detect and load your plugin.
    *   **Note:** New plugins are **DISABLED** by default for security. You must enable them in **Settings > Plugins**.

---

## Security & Sandbox

Plugins run in a **sandboxed environment** to ensure user safety.
*   **Restricted Access:** You cannot access `localStorage`, `eval`, `require`, or the full Node.js environment.
*   **Network:** You must use `RelictumAPI.fetch` instead of the standard `fetch` API.
*   **DOM Access:** You have full access to the standard DOM (`document`, `window`, `HTMLElement`), but cannot inject global `<style>` tags or `<script>` tags into widgets (they are sanitized).

---

## API Reference

All functionality is exposed through the global `RelictumAPI` object.

### 1. UI & Navigation

Control the sidebar, menus, and navigation flow.

#### `toast(message)`
Displays a temporary notification toast at the bottom of the screen.
```javascript
RelictumAPI.toast("Plugin loaded successfully!");
```

#### `addMenuItem(label, onClickId)`
Adds a new item to the "Plugins" section of the sidebar.
*   `label` (String): The text to display.
*   `onClickId` (String | Function):
    *   **String:** Navigates to a registered page ID (see `registerPage`).
    *   **Function:** Executes the callback immediately.
*   **Restriction:** You cannot use reserved labels (e.g., "Settings", "Dashboard", "Addons").

#### `removeMenuItem(label)`
Removes a custom menu item previously added by a plugin.
*   `label` (String): The text label of the item to remove.
*   **Note:** This **only** removes items from the "Plugins" section. It cannot remove system menus or games.

#### `setSidebarVisible(visible)`
Programmatically shows or hides the sidebar.
*   `visible` (Boolean): `true` to show, `false` to hide.

#### `getSidebarVisible()`
Returns `true` if the sidebar is currently visible.

#### `showPage(view, gameId)`
Navigates the user to a specific view.
*   `view` (String): The page ID (e.g., `'plugin:my-page'`).
*   `gameId` (String | null): Optional context for the view.

#### `setStartPage(view, gameId)`
Sets the default page that opens when the launcher starts.
```javascript
// Force the launcher to open your custom page on startup
RelictumAPI.setStartPage('plugin:my-custom-page', null);
```

#### `openRealmlist(gameId)`
Opens the Realmlist editor modal for the specified game.
*   `gameId` (String): The ID of the game (e.g., `'wow-wotlk'`).

---

### 2. Custom Pages & Widgets

Create full-screen interfaces or inject content into existing views.

#### `registerPage(id, content)`
Registers a full-screen page that can be navigated to via `showPage` or a menu item.
*   `id` (String): Unique identifier.
*   `content` (String): HTML string.
```javascript
RelictumAPI.registerPage('my-page', `
    <div class="container">
        <h1>Hello World</h1>
        <p>This is a custom plugin page.</p>
    </div>
`);
```

#### `addGameDetailsWidget(title, content)`
Adds a widget to the "Game Details" view (visible when a game is selected).
*   `title` (String): Header text.
*   `content` (String): HTML content.
*   **Returns:** A widget ID (String) that can be used to update or remove it later.

#### `updateGameDetailsWidget(id, content)`
Updates the content of an existing game details widget.
*   `id` (String): The widget ID returned by `addGameDetailsWidget`.
*   `content` (String): New HTML content.

#### `removeGameDetailsWidget(id)`
Removes a widget from the Game Details view.

#### `addAboutWidget(title, content)`
Adds a widget to the **Settings > About** tab.

#### `addSettingsWidget(tab, title, content)`
Adds a widget to a specific Settings tab.
*   `tab` (String): `'general'`, `'appearance'`, or `'system'`.

#### `addGameButton(label, callback)`
Adds a custom action button to the Game Details view (under the "Play" button).
```javascript
RelictumAPI.addGameButton("Clear Cache", () => {
    RelictumAPI.toast("Cache Cleared!");
});
```

---

### 3. Game Library Management

Manage games, artwork, and visual effects.

#### `addGame(gameConfig)`
Registers a new custom game.
*   `gameConfig` (Object):
    *   `id` (String): **Required.** Unique ID.
    *   `name` (String): **Required.** Display name.
    *   `icon` (String): URL/Path to sidebar icon.
    *   `bg` (String): URL/Path to background image.
    *   `version` (String): Version label (default: 'Custom').

#### `setGameImages(gameId, images)`
Updates the artwork for a specific game.
*   `images` (Object):
    *   `cardArt` (String): Large card image.
    *   `clientIcon` (String): Small icon.
    *   `icon` (String): Sidebar icon.

#### `setGameGlow(gameId, color)`
Sets a custom glow color for the game card.
*   `color` (String): CSS color (e.g., `'#ff0000'`, `'rgba(0,255,0,0.5)'`) or `null` to reset.

#### `setMusic(url)`
Overrides the background music.
*   `url` (String): Path to audio file.

#### `getGamePath(gameId)`
Returns the local installation path of a game (if installed).

#### `onGameChange(callback)`
Registers a listener that fires when the user selects a different game.
```javascript
RelictumAPI.onGameChange((gameId) => {
    console.log("User switched to:", gameId);
});
```

---

### 4. System & Networking

Interact with files and the network.

#### `fetch(url, options)`
Performs a network request. This is a secure wrapper around the standard `fetch` API.
*   **Returns:** `Promise<Response>`

#### `downloadFile(url, savePath, callbacks)`
Downloads a file to the local system.
*   `callbacks` (Object):
    *   `onProgress({ progress, downloadedBytes, totalBytes })`
    *   `onComplete(path)`
    *   `onError(error)`
*   **Returns:** A download ID.

#### `extractFile(filePath, destPath)`
Extracts a ZIP archive.
*   **Returns:** `Promise<Boolean>` (success/fail).

#### `getSystemInfo()`
Returns system details:
*   `os`: Platform (win32, darwin, etc.)
*   `cpus`: CPU model info.
*   `totalMem`: Total RAM.
*   `freeMem`: Free RAM.

#### `openPath(path)`
Opens a file or directory in the OS file explorer.

#### `openExternal(url)`
Opens a URL in the user's default web browser.

---

### 5. Lifecycle

#### `onCleanup(callback)`
Registers a function to run when the plugin is unloaded or reloaded.
*   **Critical:** Use this to clear intervals or event listeners to prevent memory leaks.
```javascript
const interval = setInterval(() => { ... }, 1000);

RelictumAPI.onCleanup(() => {
    clearInterval(interval);
});
```
