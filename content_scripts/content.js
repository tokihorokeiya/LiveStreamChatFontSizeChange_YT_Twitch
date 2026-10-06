(function () {
  'use strict';

  // Determine platform
  const hostname = window.location.hostname.toLowerCase();
  const href = window.location.href.toLowerCase();
  const pathname = window.location.pathname.toLowerCase();

  const isYouTube = hostname.includes('youtube.com');
  const isTwitch = hostname.includes('twitch.tv');

  if (!isYouTube && !isTwitch) return;

  // Identify specific page types
  const isYouTubeChat = isYouTube && (pathname.includes('/live_chat') || pathname.includes('/live_chat_replay'));
  const isTwitchChat = isTwitch && (pathname.includes('/chat') || href.includes('popout'));
  const isTwitchRewardQueue = isTwitch && (href.includes('reward-queue') || pathname.includes('reward-queue'));
  const isTwitchPopout = isTwitch && (href.includes('popout') || pathname.includes('popout') || window.location.search.includes('popout'));
  const isTwitchStreamManager = isTwitch && href.includes('stream-manager');

  // If on Twitch, ensure this is a popout, chat, stream manager or reward queue page
  if (isTwitch && !isTwitchChat && !isTwitchRewardQueue && !isTwitchPopout && !isTwitchStreamManager) {
    return;
  }

  // If on YouTube, ensure this is a live chat page
  if (isYouTube && !isYouTubeChat) {
    return;
  }

  const platform = isYouTube ? 'youtube' : 'twitch';
  const defaultFontSize = isYouTube ? 15 : 14;
  const storageKey = isYouTube
    ? 'yt_font_size'
    : (isTwitchRewardQueue ? 'twitch_reward_queue_font_size' : 'twitch_chat_font_size');

  let currentFontSize = defaultFontSize;
  let showWidget = true;

  // Style element for dynamic CSS rules
  let styleElement = document.getElementById('crf-dynamic-style');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'crf-dynamic-style';
    (document.head || document.documentElement).appendChild(styleElement);
  }

  function applyFontSize(size) {
    currentFontSize = Math.max(10, Math.min(64, Number(size) || defaultFontSize));

    let css = `
      :root {
        --chat-custom-font-size: ${currentFontSize}px !important;
      }
    `;

    if (isTwitch) {
      // Twitch Sunlight / Creator Dashboard sets html { font-size: 62.5% } (= 10px).
      // Standard text uses 1.4rem (14px).
      // By scaling html base font size, all rem-based typography and cards in Sunlight scale proportionally.
      const remBase = (currentFontSize / 1.4);
      css += `
        html.crf-twitch-root {
          font-size: ${remBase}px !important;
        }
        body.crf-twitch-root {
          font-size: ${currentFontSize}px !important;
        }
      `;
    }

    styleElement.textContent = css;

    // Update floating widget UI if mounted
    updateWidgetUI();
  }

  // Add class to documentElement immediately
  if (isTwitch) {
    document.documentElement.classList.add('crf-twitch-root');
  }

  // Load initial settings from chrome.storage.local
  chrome.storage.local.get([storageKey, 'twitch_font_size', 'show_floating_widget'], (result) => {
    if (chrome.runtime.lastError) {
      console.warn('[ChatroomFontPlugin] Storage error:', chrome.runtime.lastError);
    }
    // Fall back to legacy twitch_font_size if specific key is not set yet
    const savedSize = result ? (result[storageKey] ?? (isTwitch ? result['twitch_font_size'] : null)) : null;
    if (savedSize) {
      applyFontSize(savedSize);
    } else {
      applyFontSize(defaultFontSize);
    }

    if (result && typeof result.show_floating_widget !== 'undefined') {
      showWidget = result.show_floating_widget;
    }
    updateWidgetVisibility();
  });

  // Listen for storage changes across popup or other tabs
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local') return;

    if (changes[storageKey]) {
      applyFontSize(changes[storageKey].newValue);
    }

    if (changes.show_floating_widget) {
      showWidget = changes.show_floating_widget.newValue;
      updateWidgetVisibility();
    }
  });

  function saveFontSize(newSize) {
    const clamped = Math.max(10, Math.min(64, Number(newSize)));
    applyFontSize(clamped);
    chrome.storage.local.set({ [storageKey]: clamped });
  }

  // =========================================================================
  // Floating Widget Implementation
  // =========================================================================
  let widgetContainer = null;
  let toggleBtn = null;
  let panel = null;
  let slider = null;
  let sizeDisplay = null;
  let presetButtons = [];

  function updateWidgetUI() {
    if (!sizeDisplay || !slider) return;
    sizeDisplay.textContent = `${currentFontSize}px`;
    slider.value = currentFontSize;

    presetButtons.forEach(btn => {
      const pSize = Number(btn.getAttribute('data-size'));
      btn.classList.toggle('crf-active', pSize === currentFontSize);
    });
  }

  function updateWidgetVisibility() {
    if (widgetContainer) {
      widgetContainer.style.display = showWidget ? 'block' : 'none';
    }
  }

  function mountFloatingWidget() {
    // Only mount in the top window or if not already present
    if (document.getElementById('crf-floating-widget')) return;
    if (!document.body) return;

    widgetContainer = document.createElement('div');
    widgetContainer.id = 'crf-floating-widget';
    widgetContainer.style.display = showWidget ? 'block' : 'none';

    const badgeLabel = isYouTube ? 'YouTube' : (isTwitchRewardQueue ? 'Reward Queue' : 'Twitch');

    widgetContainer.innerHTML = `
      <button id="crf-toggle-btn" title="Font Size (Click to adjust)">Aa</button>
      <div id="crf-panel">
        <div class="crf-header">
          <div class="crf-title">
            <span>Font Size</span>
            <span class="crf-badge">${badgeLabel}</span>
          </div>
          <button class="crf-close-btn" id="crf-close-btn" title="Close panel">✕</button>
        </div>
        <div class="crf-control-row">
          <button class="crf-btn-step" id="crf-dec-btn" title="Decrease font size">−</button>
          <span class="crf-size-value" id="crf-size-display">${currentFontSize}px</span>
          <button class="crf-btn-step" id="crf-inc-btn" title="Increase font size">+</button>
        </div>
        <div class="crf-slider-container">
          <input type="range" class="crf-slider" id="crf-slider" min="10" max="64" step="1" value="${currentFontSize}">
        </div>
        <div class="crf-presets">
          <button class="crf-preset-btn" data-size="14">14px</button>
          <button class="crf-preset-btn" data-size="20">20px</button>
          <button class="crf-preset-btn" data-size="32">32px</button>
          <button class="crf-preset-btn" data-size="48">48px</button>
          <button class="crf-preset-btn" data-size="64">64px</button>
        </div>
        <div class="crf-footer">
          <button class="crf-reset-btn" id="crf-reset-btn">Reset to Default</button>
        </div>
      </div>
    `;

    document.body.appendChild(widgetContainer);

    // Cache elements
    toggleBtn = widgetContainer.querySelector('#crf-toggle-btn');
    panel = widgetContainer.querySelector('#crf-panel');
    slider = widgetContainer.querySelector('#crf-slider');
    sizeDisplay = widgetContainer.querySelector('#crf-size-display');
    const closeBtn = widgetContainer.querySelector('#crf-close-btn');
    const decBtn = widgetContainer.querySelector('#crf-dec-btn');
    const incBtn = widgetContainer.querySelector('#crf-inc-btn');
    const resetBtn = widgetContainer.querySelector('#crf-reset-btn');
    presetButtons = Array.from(widgetContainer.querySelectorAll('.crf-preset-btn'));

    function setPanelOpen(open) {
      if (open) {
        panel.classList.add('crf-show');
        widgetContainer.classList.add('crf-panel-open');
      } else {
        panel.classList.remove('crf-show');
        widgetContainer.classList.remove('crf-panel-open');
      }
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = panel.classList.contains('crf-show');
      setPanelOpen(!isOpen);
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setPanelOpen(false);
    });

    document.addEventListener('click', (e) => {
      if (panel && !panel.contains(e.target) && e.target !== toggleBtn) {
        setPanelOpen(false);
      }
    });

    slider.addEventListener('input', (e) => {
      saveFontSize(e.target.value);
    });

    decBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      saveFontSize(currentFontSize - 1);
    });

    incBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      saveFontSize(currentFontSize + 1);
    });

    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      saveFontSize(defaultFontSize);
    });

    presetButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        saveFontSize(Number(btn.getAttribute('data-size')));
      });
    });

    updateWidgetUI();
  }

  function initPage() {
    if (isTwitch && document.body) {
      document.body.classList.add('crf-twitch-root');
    }
    mountFloatingWidget();
  }

  if (document.body) {
    initPage();
  } else {
    document.addEventListener('DOMContentLoaded', initPage);
  }

  // Use MutationObserver for Single Page App updates (ensuring widget and root classes persist)
  const observer = new MutationObserver(() => {
    if (isTwitch && !document.documentElement.classList.contains('crf-twitch-root')) {
      document.documentElement.classList.add('crf-twitch-root');
    }
    if (isTwitch && document.body && !document.body.classList.contains('crf-twitch-root')) {
      document.body.classList.add('crf-twitch-root');
    }
    if (document.body && !document.getElementById('crf-floating-widget')) {
      mountFloatingWidget();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
