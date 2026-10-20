/* Festos Grill — site-wide announcement banner.

   To change the message, turn the banner off, or swap the link, edit the
   ANNOUNCEMENT settings below. Step-by-step instructions, including how to
   bring the banner back for people who dismissed it, are in BANNER-README.txt. */

(function () {

  /* =========================================================
     SETTINGS — this is the only part you need to edit
     ========================================================= */
  const ANNOUNCEMENT = {
    // false hides the banner everywhere
    enabled: true,

    // Change this whenever you write a NEW message, so the banner shows
    // again for customers who dismissed the previous one
    id: 'new-location-2026-10',

    // Short tag shown before the message. Use '' for no tag.
    label: 'Store Update',

    message: 'Dear customers: we have moved to a new location. Follow us on social media for updates.',

    // Optional button beside the message. Use null for no button.
    link: {
      href: 'https://www.instagram.com/festosgrill',
      text: '@festosgrill',
      icon: 'instagram'
    },

    // true lets customers close the banner, and remembers their choice
    dismissible: true
  };

  /* =========================================================
     Everything below renders the settings above
     ========================================================= */

  const STORAGE_KEY_PREFIX = 'festos.announcement.';

  const ICONS = {
    instagram:
      '<svg class="announcement-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
        '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />' +
        '<circle cx="12" cy="12" r="4.6" />' +
        '<circle class="announcement-icon-dot" cx="17.6" cy="6.4" r="1.25" />' +
      '</svg>'
  };

  const CLOSE_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M6 6 18 18M18 6 6 18" />' +
    '</svg>';

  // Private browsing can block localStorage, in which case the banner just
  // reappears on the next visit rather than breaking the page.
  function wasDismissed(id) {
    try {
      return window.localStorage.getItem(STORAGE_KEY_PREFIX + id) === 'true';
    } catch (err) {
      return false;
    }
  }

  function rememberDismissal(id) {
    try {
      window.localStorage.setItem(STORAGE_KEY_PREFIX + id, 'true');
    } catch (err) {
      /* nothing to do */
    }
  }

  function buildMessage(config) {
    const text = document.createElement('p');
    text.className = 'announcement-text';

    if (config.label) {
      const label = document.createElement('span');
      label.className = 'announcement-label';
      label.textContent = config.label;
      text.appendChild(label);
    }

    text.appendChild(document.createTextNode(config.message));
    return text;
  }

  function buildLink(link) {
    const anchor = document.createElement('a');
    anchor.className = 'announcement-link';
    anchor.href = link.href;
    anchor.target = '_blank';
    anchor.rel = 'noopener';

    if (link.icon && ICONS[link.icon]) anchor.innerHTML = ICONS[link.icon];

    const text = document.createElement('span');
    text.textContent = link.text;
    anchor.appendChild(text);

    return anchor;
  }

  function buildCloseButton(onDismiss) {
    const button = document.createElement('button');
    button.className = 'announcement-close';
    button.type = 'button';
    button.setAttribute('aria-label', 'Dismiss announcement');
    button.innerHTML = CLOSE_ICON;
    button.addEventListener('click', onDismiss);
    return button;
  }

  function render(config, mount) {
    const banner = document.createElement('aside');
    banner.className = 'announcement';
    banner.setAttribute('aria-label', 'Store announcement');

    const inner = document.createElement('div');
    inner.className = 'announcement-inner';
    inner.appendChild(buildMessage(config));

    if (config.link && config.link.href) inner.appendChild(buildLink(config.link));

    if (config.dismissible) {
      inner.appendChild(buildCloseButton(function () {
        banner.remove();
        rememberDismissal(config.id);
      }));
    }

    banner.appendChild(inner);
    mount.appendChild(banner);
  }

  const mount = document.getElementById('announcement');
  if (!mount) return;
  if (!ANNOUNCEMENT.enabled || !ANNOUNCEMENT.message) return;
  if (ANNOUNCEMENT.dismissible && wasDismissed(ANNOUNCEMENT.id)) return;

  render(ANNOUNCEMENT, mount);
})();
