# Relictum Launcher Plugin Repository

Welcome to the official documentation for submitting and maintaining plugins for the Relictum Launcher. This repository serves as a trusted source for community-developed plugins, ensuring safety, performance, and compatibility.

## Trust & Safety Philosophy

Our goal is to provide a safe ecosystem for users. All plugins in the "Trusted" repository must undergo a review process by the development team.

**Important:** The launcher's "Browse" tab fetches data *exclusively* from the `plugins.json` file in this repository. Plugins not listed in this manifest will **not** appear in the launcher's interface. This ensures that every visible plugin has been verified.

-   **Code Transparency:** No obfuscated code is allowed. Source code must be readable.
-   **Sandboxing:** Plugins run in a restricted environment. Attempts to bypass this will lead to immediate rejection.
-   **No Malicious Intent:** Plugins must not steal data, inject malware, mining scripts, or harm the user's system.
-   **Respect User Privacy:** Do not collect user data without explicit consent and a clear functional reason.

## How to Submit a Plugin

If you have developed a plugin and want it included in the official list available in the launcher's "Browse" tab:

1.  **Fork the Repository:** Fork the repository containing the `plugins.json` and plugin files.
2.  **Add Your Plugin:**
    *   Place your plugin file (e.g., `my-plugin.js`) in the `plugins/` directory (or appropriate folder structure).
    *   **IMPORTANT:** Your plugin file MUST include a JSDoc header with metadata (see below).
    *   Ensure your code follows the [Plugin API Documentation](./api.md).

## Plugin File Header (Required)

Every plugin file (`.js`) must start with a JSDoc comment block containing metadata. This allows the launcher to display information about installed plugins even when offline.

```javascript
/**
 * @name Discord Rich Presence
 * @author Candy Team
 * @description Updates your Discord status with the game you are playing.
 * @version 1.0.0
 */

// Your plugin code starts here...
RelictumAPI.toast("Plugin loaded!");
```

3.  **Update the Manifest:**
    *   Add an entry to `plugins.json` with your plugin's metadata (see format below).
4.  **Submit a Pull Request (PR):**
    *   Open a PR with a clear description of what your plugin does.
    *   Include screenshots or a video demonstration if possible.
    *   The team will review the code for safety and functionality.

## Manifest Format (`plugins.json`)

To display your plugin in the launcher, it must be validly registered in the `plugins.json` file.

```json
[
  {
    "name": "Discord Rich Presence",
    "description": "Updates your Discord status with the game you are playing. Shows character name, level, and zone.",
    "author": "Candy Team",
    "version": "1.0.0",
    "filename": "discord-rpc.js",
    "url": "https://raw.githubusercontent.com/Warmane/plugins/main/discord-rpc.js",
    "downloads": 1500,
    "date": "2023-10-01",
    "metadata": {
        "name": "Discord Rich Presence",
        "author": "Candy Team",
        "version": "1.0.0",
        "description": "Updates your Discord status with the game you are playing..."
    }
  }
]
```

### Fields Explained
- **name**: Display name of the plugin.
- **description**: Short description shown in the list.
- **author**: Your name or handle.
- **version**: Semantic versioning (e.g., 1.0.0).
- **filename**: The exact filename of the script (must match the file you upload).
- **url**: Direct raw link to the plugin file (e.g., raw.githubusercontent.com).
- **downloads**: Initial download count (usually 0 for new plugins).
- **date**: Submission date (YYYY-MM-DD).

## Review Process

1.  **Automated Scan:** We check for syntax errors and known malicious patterns.
2.  **Manual Review:** A developer will read your code line-by-line to ensure it adheres to safety guidelines.
3.  **Testing:** We will install and run the plugin in a test environment to verify it works as described and doesn't crash the launcher.
4.  **Approval:** Once approved, your PR is merged. The launcher automatically fetches the updated `plugins.json`, making your plugin available to everyone instantly.

## Development Guidelines

*   **Performance:** Avoid heavy loops or blocking operations on the main thread.
*   **Clean Code:** Write readable code with comments.
*   **API Usage:** Use the provided `RelictumAPI` and `PluginStore` correctly.
*   **Self-Contained:** Plugins should ideally be self-contained single JS files. If you have dependencies, bundle them.
*   **Error Handling:** Wrap risky operations in try/catch blocks to prevent crashing the plugin system.

## Need Help?

Check the [API Documentation](./api.md) for available methods and hooks.
If you have questions, open an Issue in this repository or contact the development team on Discord.
