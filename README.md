# Chatroom Font Size Customizer (Chrome & Edge Extension)

A lightweight Manifest V3 browser extension for **Google Chrome** and **Microsoft Edge** that allows you to dynamically adjust and save the font size for YouTube Live popout chatrooms and Twitch popout chatrooms.

- **No login or account linking required**: Runs 100% locally on your computer.
- **Dynamic URL matching**: Automatically works with any YouTube video ID (`/live_chat?*`), any Twitch channel chat (`/popout/*/chat*`), and any Twitch Reward Queue (`/popout/*/reward-queue*`).
- **Real-time Live Adjustment**: Font size scales instantly without reloading the page.
- **In-Chat Floating Widget (`Aa`)**: Because popout windows often hide the browser toolbar, a sleek floating button is provided directly inside the popout window for one-click adjustments.
- **Auto-Saved Preferences**: Remembers your preferred sizes independently for YouTube and Twitch.

---

## 🚀 How to Install in Google Chrome

1. Open **Google Chrome**.
2. Navigate to `chrome://extensions/` in your address bar.
3. Turn **ON** the **Developer mode** switch (usually located in the top-right corner).
4. Click the **Load unpacked** button (top-left).
5. Select this project folder:
   ```
   C:\Users\liman\Documents\chatroomFontPlugin
   ```
6. The extension **"Chatroom Font Size Customizer"** is now installed and active!

---

## 🌊 How to Install in Microsoft Edge

1. Open **Microsoft Edge**.
2. Navigate to `edge://extensions/` in your address bar.
3. Turn **ON** the **Developer mode** toggle in the left sidebar.
4. Click the **Load unpacked** button.
5. Select this project folder:
   ```
   C:\Users\liman\Documents\chatroomFontPlugin
   ```
6. The extension is now ready to use on Edge!

---

## 🎯 How to Use

### 1. YouTube Live Popout Chat
Open any YouTube live chat popout, for example:
- `https://www.youtube.com/live_chat?is_popout=1&v=JVUtiKeUdr8`
- (Or click the 3-dots menu on any YouTube live stream chat and choose **"Popout chat"**).

### 2. Twitch Live Popout Chat & Reward Queue
Open any Twitch popout window, for example:
- Popout Chat: `https://www.twitch.tv/popout/mea_07311/chat?popout=`
- Channel Points Reward Queue: `https://www.twitch.tv/popout/tokihorokeiya/reward-queue`
- (Any channel ID works automatically).

### 3. Adjusting Font Size
You can adjust the font size in two easy ways:

1. **Directly inside the Chatroom (Recommended)**:
   - Notice the subtle **`Aa`** floating button centered on the middle-right edge of the chat window.
   - When your mouse is away, it stays largely transparent (`20% opacity`) so it never blocks chat text.
   - Hovering over it illuminates it to 100% opacity.
   - Click it to reveal the slider (supporting up to **64px**), **`−`** and **`+`** step buttons, or quick preset sizes (`14px`, `20px`, `32px`, `48px`, `64px`).
   - Chat text, author names, badges, and emotes immediately scale in real time!
2. **From the Browser Toolbar**:
   - Click the extension icon in your browser toolbar to open the popup settings panel.
   - Adjust individual font sizes for YouTube and Twitch, or toggle the in-chat floating button on/off.

---

## 📁 Project Structure

```text
chatroomFontPlugin/
├── manifest.json              # Extension Manifest V3 configuration
├── icons/                     # Extension icons (16, 32, 48, 128 px)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── content_scripts/
│   ├── content.css            # Styles for chatroom overrides & floating widget
│   └── content.js             # Font size logic & reactive storage synchronization
├── popup/
│   ├── popup.html             # Toolbar popup interface
│   ├── popup.css              # Dark theme styling
│   └── popup.js               # Settings manager for popup
└── README.md                  # Installation & usage documentation
```
