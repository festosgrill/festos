/* Festos Grill — online ordering availability.

   When delivery and pickup are paused, set available to false below. The
   Grubhub and Uber Eats buttons grey out, stop being clickable, and a short
   notice appears above them. See ORDERING-README.txt for instructions. */

(function () {

  /* =========================================================
     SETTINGS — this is the only part you need to edit
     ========================================================= */
  const ORDERING = {
    // true  = the ordering buttons work normally
    // false = the buttons grey out and the notice below appears
    available: false,

    // Shown above the greyed-out buttons. Use '' for no notice.
    notice: 'Online ordering is temporarily unavailable. Please call us at (646) 382-3912 or stop by to order in person.',

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
    notice.textContent = text;
    return notice;
  }

  const options = document.querySelector('.order-options');
  if (!options || ORDERING.available) return;

  options.querySelectorAll('.order-option').forEach(function (option) {
    disableOption(option, ORDERING.buttonNote);
  });

  if (ORDERING.notice) options.before(buildNotice(ORDERING.notice));
})();
