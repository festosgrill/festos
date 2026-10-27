/* Festos Grill — online ordering availability.

   Each delivery platform has its own on/off switch below. Set one to false and
   that button greys out, stops being clickable, and the notice appears above
   the buttons. The other platform keeps working normally.
   See ORDERING-README.txt for instructions. */

(function () {

  /* =========================================================
     SETTINGS — this is the only part you need to edit
     ========================================================= */
  const ORDERING = {
    // true  = that button works normally
    // false = that button greys out and stops working
    grubhub:  true,
    ubereats: true,

    // Shown above the buttons whenever at least one platform is paused.
    // Reword it to match whichever platforms are off. Use '' for no notice.
    // Written as a list, each entry starts on its own line.
    notice: [
      'Grubhub ordering is temporarily unavailable.',
      'Please order through Uber Eats or call us at (646) 382-3912.'
    ],

    // Replaces "Order now" under each greyed-out logo
    buttonNote: 'Temporarily unavailable'
  };

  /* =========================================================
     Everything below applies the settings above
     ========================================================= */

  function disableOption(option, note) {
    option.classList.add('is-unavailable');

    // Dropping the href makes the card unclickable and takes it out of the
    // keyboard tab order, so it cannot be opened by accident
    option.removeAttribute('href');
    option.removeAttribute('target');
    option.setAttribute('aria-disabled', 'true');

    const label = option.querySelector('.order-option-note');
    if (label && note) label.textContent = note;
  }

  function buildNotice(text) {
    const notice = document.createElement('p');
    notice.className = 'order-notice';

    // concat accepts both a plain string and a list of lines. Each line gets
    // its own element so the break holds, while a line too long for a narrow
    // screen still wraps on its own.
    [].concat(text).forEach(function (line) {
      const row = document.createElement('span');
      row.className = 'order-notice-line';
      row.textContent = line;
      notice.append(row);
    });

    return notice;
  }

  const options = document.querySelector('.order-options');
  if (!options) return;

  let anyPaused = false;

  options.querySelectorAll('.order-option').forEach(function (option) {
    // Only an explicit false pauses a button, so a platform added to the page
    // without a matching setting above keeps working rather than silently
    // greying out
    if (ORDERING[option.dataset.provider] === false) {
      disableOption(option, ORDERING.buttonNote);
      anyPaused = true;
    }
  });

  // Checking length rather than truthiness so an empty list is treated the
  // same as an empty string
  if (anyPaused && ORDERING.notice && ORDERING.notice.length) {
    options.before(buildNotice(ORDERING.notice));
  }
})();
