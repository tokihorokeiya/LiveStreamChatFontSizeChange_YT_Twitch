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

  // DOM elements - Twitch
  const twitchSlider = document.getElementById('twitch-slider');
  const twitchDisplay = document.getElementById('twitch-size-display');
  const twitchDec = document.getElementById('twitch-dec');
  const twitchInc = document.getElementById('twitch-inc');
  const twitchReset = document.getElementById('twitch-reset');
  const twitchPresets = Array.from(document.querySelectorAll('.twitch-preset'));
  const sectionTwitch = document.getElementById('section-twitch');
  const badgeTwitch = document.getElementById('badge-twitch');

  // DOM elements - Settings
  const toggleFloating = document.getElementById('toggle-floating-widget');

  let currentYtSize = DEFAULT_YT_SIZE;
  let currentTwitchSize = DEFAULT_TWITCH_SIZE;

  function updateYtUI(size) {
    currentYtSize = Math.max(10, Math.min(64, Number(size) || DEFAULT_YT_SIZE));
    ytSlider.value = currentYtSize;
    ytDisplay.textContent = `${currentYtSize}px`;

    ytPresets.forEach(btn => {
      const pSize = Number(btn.getAttribute('data-size'));
      btn.classList.toggle('preset-active', pSize === currentYtSize);
    });
  }

  function updateTwitchUI(size) {
    currentTwitchSize = Math.max(10, Math.min(64, Number(size) || DEFAULT_TWITCH_SIZE));
    twitchSlider.value = currentTwitchSize;
    twitchDisplay.textContent = `${currentTwitchSize}px`;

    twitchPresets.forEach(btn => {
      const pSize = Number(btn.getAttribute('data-size'));
      btn.classList.toggle('preset-active', pSize === currentTwitchSize);
    });
  }

  function saveYtSize(size) {
    updateYtUI(size);
    chrome.storage.local.set({ yt_font_size: currentYtSize });
  }

  function saveTwitchSize(size) {
    updateTwitchUI(size);
    chrome.storage.local.set({ twitch_font_size: currentTwitchSize });
  }

  // Load saved values
  chrome.storage.local.get(['yt_font_size', 'twitch_font_size', 'show_floating_widget'], (res) => {
    if (chrome.runtime.lastError) {
      console.warn('Storage error:', chrome.runtime.lastError);
    }
    const ytSize = res?.yt_font_size ?? DEFAULT_YT_SIZE;
    const twitchSize = res?.twitch_font_size ?? DEFAULT_TWITCH_SIZE;
    const showWidget = res?.show_floating_widget ?? true;

    updateYtUI(ytSize);
    updateTwitchUI(twitchSize);
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

  // Twitch listeners
  twitchSlider.addEventListener('input', (e) => saveTwitchSize(e.target.value));
  twitchDec.addEventListener('click', () => saveTwitchSize(currentTwitchSize - 1));
  twitchInc.addEventListener('click', () => saveTwitchSize(currentTwitchSize + 1));
  twitchReset.addEventListener('click', () => saveTwitchSize(DEFAULT_TWITCH_SIZE));
  twitchPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      saveTwitchSize(Number(btn.getAttribute('data-size')));
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
      } else if (url.includes('twitch.tv')) {
        sectionTwitch.classList.add('active-platform');
        badgeTwitch.style.display = 'inline-block';
      }
    });
  }
});
