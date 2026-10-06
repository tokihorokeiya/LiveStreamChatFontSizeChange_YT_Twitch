document.addEventListener('DOMContentLoaded', () => {
  const DEFAULT_YT_SIZE = 15;
  const DEFAULT_TWITCH_SIZE = 14;

  // DOM elements - YouTube
  const ytSlider = document.getElementById('yt-slider');
  const ytDisplay = document.getElementById('yt-size-display');
  const ytDec = document.getElementById('yt-dec');
  const ytInc = document.getElementById('yt-inc');
  const ytReset = document.getElementById('yt-reset');
  const ytPresets = Array.from(document.querySelectorAll('.yt-preset'));
  const sectionYt = document.getElementById('section-yt');
  const badgeYt = document.getElementById('badge-yt');

  // DOM elements - Twitch Chat
  const twitchChatSlider = document.getElementById('twitch-chat-slider');
  const twitchChatDisplay = document.getElementById('twitch-chat-size-display');
  const twitchChatDec = document.getElementById('twitch-chat-dec');
  const twitchChatInc = document.getElementById('twitch-chat-inc');
  const twitchChatReset = document.getElementById('twitch-chat-reset');
  const twitchChatPresets = Array.from(document.querySelectorAll('.twitch-chat-preset'));
  const sectionTwitchChat = document.getElementById('section-twitch-chat');
  const badgeTwitchChat = document.getElementById('badge-twitch-chat');

  // DOM elements - Twitch Reward Queue
  const twitchQueueSlider = document.getElementById('twitch-queue-slider');
  const twitchQueueDisplay = document.getElementById('twitch-queue-size-display');
  const twitchQueueDec = document.getElementById('twitch-queue-dec');
  const twitchQueueInc = document.getElementById('twitch-queue-inc');
  const twitchQueueReset = document.getElementById('twitch-queue-reset');
  const twitchQueuePresets = Array.from(document.querySelectorAll('.twitch-queue-preset'));
  const sectionTwitchQueue = document.getElementById('section-twitch-queue');
  const badgeTwitchQueue = document.getElementById('badge-twitch-queue');

  // DOM elements - Settings
  const toggleFloating = document.getElementById('toggle-floating-widget');

  let currentYtSize = DEFAULT_YT_SIZE;
  let currentTwitchChatSize = DEFAULT_TWITCH_SIZE;
  let currentTwitchQueueSize = DEFAULT_TWITCH_SIZE;

  function updateYtUI(size) {
    currentYtSize = Math.max(10, Math.min(64, Number(size) || DEFAULT_YT_SIZE));
    ytSlider.value = currentYtSize;
    ytDisplay.textContent = `${currentYtSize}px`;

    ytPresets.forEach(btn => {
      const pSize = Number(btn.getAttribute('data-size'));
      btn.classList.toggle('preset-active', pSize === currentYtSize);
    });
  }

  function updateTwitchChatUI(size) {
    currentTwitchChatSize = Math.max(10, Math.min(64, Number(size) || DEFAULT_TWITCH_SIZE));
    twitchChatSlider.value = currentTwitchChatSize;
    twitchChatDisplay.textContent = `${currentTwitchChatSize}px`;

    twitchChatPresets.forEach(btn => {
      const pSize = Number(btn.getAttribute('data-size'));
      btn.classList.toggle('preset-active', pSize === currentTwitchChatSize);
    });
  }

  function updateTwitchQueueUI(size) {
    currentTwitchQueueSize = Math.max(10, Math.min(64, Number(size) || DEFAULT_TWITCH_SIZE));
    twitchQueueSlider.value = currentTwitchQueueSize;
    twitchQueueDisplay.textContent = `${currentTwitchQueueSize}px`;

    twitchQueuePresets.forEach(btn => {
      const pSize = Number(btn.getAttribute('data-size'));
      btn.classList.toggle('preset-active', pSize === currentTwitchQueueSize);
    });
  }

  function saveYtSize(size) {
    updateYtUI(size);
    chrome.storage.local.set({ yt_font_size: currentYtSize });
  }

  function saveTwitchChatSize(size) {
    updateTwitchChatUI(size);
    chrome.storage.local.set({ twitch_chat_font_size: currentTwitchChatSize });
  }

  function saveTwitchQueueSize(size) {
    updateTwitchQueueUI(size);
    chrome.storage.local.set({ twitch_reward_queue_font_size: currentTwitchQueueSize });
  }

  // Load saved values with backward compatibility
  chrome.storage.local.get([
    'yt_font_size',
    'twitch_font_size',
    'twitch_chat_font_size',
    'twitch_reward_queue_font_size',
    'show_floating_widget'
  ], (res) => {
    if (chrome.runtime.lastError) {
      console.warn('Storage error:', chrome.runtime.lastError);
    }
    const ytSize = res?.yt_font_size ?? DEFAULT_YT_SIZE;
    const legacyTwitch = res?.twitch_font_size ?? DEFAULT_TWITCH_SIZE;
    const twitchChatSize = res?.twitch_chat_font_size ?? legacyTwitch;
    const twitchQueueSize = res?.twitch_reward_queue_font_size ?? legacyTwitch;
    const showWidget = res?.show_floating_widget ?? true;

    updateYtUI(ytSize);
    updateTwitchChatUI(twitchChatSize);
    updateTwitchQueueUI(twitchQueueSize);
    toggleFloating.checked = showWidget;
  });

  // YouTube listeners
  ytSlider.addEventListener('input', (e) => saveYtSize(e.target.value));
  ytDec.addEventListener('click', () => saveYtSize(currentYtSize - 1));
  ytInc.addEventListener('click', () => saveYtSize(currentYtSize + 1));
  ytReset.addEventListener('click', () => saveYtSize(DEFAULT_YT_SIZE));
  ytPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      saveYtSize(Number(btn.getAttribute('data-size')));
    });
  });

  // Twitch Chat listeners
  twitchChatSlider.addEventListener('input', (e) => saveTwitchChatSize(e.target.value));
  twitchChatDec.addEventListener('click', () => saveTwitchChatSize(currentTwitchChatSize - 1));
  twitchChatInc.addEventListener('click', () => saveTwitchChatSize(currentTwitchChatSize + 1));
  twitchChatReset.addEventListener('click', () => saveTwitchChatSize(DEFAULT_TWITCH_SIZE));
  twitchChatPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      saveTwitchChatSize(Number(btn.getAttribute('data-size')));
    });
  });

  // Twitch Reward Queue listeners
  twitchQueueSlider.addEventListener('input', (e) => saveTwitchQueueSize(e.target.value));
  twitchQueueDec.addEventListener('click', () => saveTwitchQueueSize(currentTwitchQueueSize - 1));
  twitchQueueInc.addEventListener('click', () => saveTwitchQueueSize(currentTwitchQueueSize + 1));
  twitchQueueReset.addEventListener('click', () => saveTwitchQueueSize(DEFAULT_TWITCH_SIZE));
  twitchQueuePresets.forEach(btn => {
    btn.addEventListener('click', () => {
      saveTwitchQueueSize(Number(btn.getAttribute('data-size')));
    });
  });

  // Floating widget toggle listener
  toggleFloating.addEventListener('change', (e) => {
    chrome.storage.local.set({ show_floating_widget: e.target.checked });
  });

  // Detect active tab to highlight current platform
  if (chrome.tabs && chrome.tabs.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs && tabs[0];
      if (!activeTab || !activeTab.url) return;

      const url = activeTab.url.toLowerCase();
      if (url.includes('youtube.com/live_chat')) {
        sectionYt.classList.add('active-platform');
        badgeYt.style.display = 'inline-block';
      } else if (url.includes('reward-queue')) {
        sectionTwitchQueue.classList.add('active-platform');
        badgeTwitchQueue.style.display = 'inline-block';
      } else if (url.includes('twitch.tv')) {
        sectionTwitchChat.classList.add('active-platform');
        badgeTwitchChat.style.display = 'inline-block';
      }
    });
  }
});
