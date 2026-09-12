# Chatroom Font Size Customizer | 實況聊天室字體大小自訂外掛

[English](#english) | [繁體中文](#繁體中文)

---

<a name="english"></a>
## 🌐 English

A lightweight Manifest V3 browser extension for **Google Chrome** and **Microsoft Edge** that allows you to dynamically adjust and save the font size for YouTube Live popout chatrooms, Twitch popout chats, and Twitch Channel Points Reward Queues.

### ✨ Key Features

- **No Login Required**: Runs 100% locally on your browser with settings stored in `chrome.storage.local`. No account linking or third-party servers.
- **Universal Dynamic URL Support**:
  - **YouTube**: Matches any video ID (`*://*.youtube.com/live_chat*` & `/live_chat_replay*`).
  - **Twitch Chat**: Matches any channel popout chat (`*://*.twitch.tv/popout/*/chat*`).
  - **Twitch Reward Queue**: Matches any channel's Channel Points Reward Queue (`*://*.twitch.tv/popout/*/reward-queue*` and Creator Dashboard).
- **Supports Large Font Sizes**: Scale text smoothly from **10px up to 64px** with quick presets (`14px`, `20px`, `32px`, `48px`, `64px`).
- **In-Chat Floating Control (`Aa`)**:
  - Discreetly placed along the middle-right edge of the screen so it never blocks the chat input bar or top stream info.
  - Transparent at rest (`20% opacity`) and illuminates to 100% opacity on hover or click.
- **Real-Time Live Scaling**: Chat messages, viewer prompts, usernames, superchats, badges, and emotes scale instantly without reloading.
- **Independent Preferences**: Automatically saves separate preferences for YouTube and Twitch.

---

### 🚀 Installation Guide

#### For Google Chrome:
1. Open Chrome and navigate to `chrome://extensions/`.
2. Turn **ON** the **Developer mode** toggle in the top-right corner.
3. Click **Load unpacked** (top-left).
4. Select this folder:
   ```
   C:\Users\liman\Documents\chatroomFontPlugin
   ```
5. The extension is now active!

#### For Microsoft Edge:
1. Open Edge and navigate to `edge://extensions/`.
2. Turn **ON** the **Developer mode** toggle in the left sidebar.
3. Click **Load unpacked**.
4. Select this folder:
   ```
   C:\Users\liman\Documents\chatroomFontPlugin
   ```

---

### 🎯 How to Use

1. **YouTube Live Popout Chat**:
   - Open any YouTube live popout chat (e.g. `https://www.youtube.com/live_chat?is_popout=1&v=JVUtiKeUdr8`).
   - Click the subtle **`Aa`** floating button on the middle-right edge.
   - Adjust the slider or click presets to resize font in real time.
2. **Twitch Popout Chat & Reward Queue**:
   - Open any Twitch popout chat: `https://www.twitch.tv/popout/<channel>/chat?popout=`
   - Or open any Reward Queue: `https://www.twitch.tv/popout/<channel>/reward-queue`
   - Use the **`Aa`** floating button or click the extension icon in your browser toolbar to adjust font sizes.

---

<a name="繁體中文"></a>
## 🇹🇼 繁體中文

一款適用於 **Google Chrome** 與 **Microsoft Edge** 的 Manifest V3 擴充套件，可即時調整並儲存 YouTube 直播彈出式聊天室、Twitch 彈出式聊天室以及 Twitch 忠誠點數獎勵佇列（Reward Queue）的文字大小。

### ✨ 主要功能特色

- **免登入、完全隱私**：100% 本地運作，所有設定皆存放在瀏覽器的 `chrome.storage.local`，無須登入任何帳號，不收集亦不上傳任何個人資料。
- **全自動動態網址適配**：
  - **YouTube 直播**：自動適配所有直播 ID（`/live_chat?*` 與 `/live_chat_replay*`）。
  - **Twitch 彈出式聊天室**：自動適配任何實況主頻道的聊天室（`/popout/*/chat*`）。
  - **Twitch 點數獎勵佇列**：自動適配任何實況主頻道的獎勵兌換佇列（`/popout/*/reward-queue*` 及創作者儀表板）。
- **支援大字體（最高可達 64px）**：支援從 **10px 到 64px** 的字體微調，並提供快速預設按鈕（`14px`, `20px`, `32px`, `48px`, `64px`）。
- **聊天室懸浮按鈕（`Aa`）**：
  - 由於彈出視窗通常會隱藏瀏覽器工具列，因此在畫面右側垂直置中位置貼心提供了懸浮 **`Aa`** 調整鈕，不遮擋底部發言框與頂部資訊。
  - 平時維持 **20% 高透明度**，滑鼠移至上方或點擊時自動亮起至 100%。
- **即時響應調整**：聊天訊息、觀眾自訂留言、實況主/觀眾名稱、貼圖與徽章皆會隨字體等比例即時縮放，完全不需重新整理網頁。
- **獨立設定儲存**：YouTube 與 Twitch 的字體大小分開記憶，下次開啟視窗自動套用。

---

### 🚀 安裝教學

#### Google Chrome 安裝步驟：
1. 打開 Chrome 瀏覽器，在網址列輸入 `chrome://extensions/` 並前往。
2. 開啟右上角的 **「開發人員模式」**（Developer mode）。
3. 點選左上角的 **「載入未封裝項目」**（Load unpacked）。
4. 選擇本專案資料夾：
   ```
   C:\Users\liman\Documents\chatroomFontPlugin
   ```
5. 外掛即刻載入完成並可開始使用！

#### Microsoft Edge 安裝步驟：
1. 打開 Edge 瀏覽器，在網址列輸入 `edge://extensions/` 並前往。
2. 開啟左側側邊欄的 **「開發人員模式」**。
3. 點選 **「載入已解壓縮的項目」**。
4. 選擇本專案資料夾：
   ```
   C:\Users\liman\Documents\chatroomFontPlugin
   ```

---

### 🎯 使用方式

1. **YouTube 直播彈出式聊天室**：
   - 開啟任意 YouTube 直播聊天室彈出視窗（例如：`https://www.youtube.com/live_chat?is_popout=1&v=...`）。
   - 點擊畫面右邊中間的半透明 **`Aa`** 按鈕。
   - 拖動拉桿或點選預設尺寸，文字與貼圖即刻放大！
2. **Twitch 彈出式聊天室與點數獎勵佇列**：
   - 彈出式聊天室：`https://www.twitch.tv/popout/<實況主ID>/chat?popout=`
   - 點數獎勵佇列：`https://www.twitch.tv/popout/<實況主ID>/reward-queue`
   - 點擊畫面右側中間的 **`Aa`** 按鈕或瀏覽器工具列圖示即可自由調整字體大小。

---

## 📁 Project Structure / 專案結構

```text
chatroomFontPlugin/
├── manifest.json              # Extension Manifest V3 / 擴充套件設定清單
├── icons/                     # Icons / 外掛圖示 (16, 32, 48, 128 px)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── content_scripts/
│   ├── content.css            # Styles & floating widget / 注入樣式與懸浮選單
│   └── content.js             # Logic & scaling observer / 動態字體與即時同步邏輯
├── popup/
│   ├── popup.html             # Toolbar popup / 工具列彈出視窗
│   ├── popup.css              # Dark theme styling / 深色主題樣式
│   └── popup.js               # Settings manager / 設定管理邏輯
├── .gitignore
└── README.md                  # Documentation (EN & 繁中)
```
