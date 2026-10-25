===============================================================================
FESTOS GRILL — HOW TO PAUSE AND RESUME ONLINE ORDERING
===============================================================================

This controls the two buttons in the "Pickup or delivery" section of
festosgrill.com: Grubhub and Uber Eats.

Each platform has its own switch, so you can pause one, the other, or both.

When a platform is paused:
  - its logo turns grey
  - its button stops working, so nobody can click through and place an order
  - "Order now" under that logo changes to "Temporarily unavailable"
  - a short notice appears above the buttons explaining why

The platform you leave on keeps working normally, in full color.

Nothing is deleted. Turning one back on is a one-word change.

Everything you need to edit lives in ONE file:

    ordering.js

Open it in any text editor. At the top you will see a block that starts with:

    SETTINGS — this is the only part you need to edit

That block is the whole feature. Nothing below it needs to be touched.


-------------------------------------------------------------------------------
THE TWO SWITCHES
-------------------------------------------------------------------------------

Near the top of ordering.js you will see these two lines:

    grubhub:  false,
    ubereats: true,

true  = that button works normally
false = that button greys out and stops working

Right now Grubhub is paused and Uber Eats is working, which is why only the
Grubhub logo is grey.

Change either word, save, and publish (see PUBLISHING below).


-------------------------------------------------------------------------------
THE FOUR COMBINATIONS
-------------------------------------------------------------------------------

Both platforms working — no grey buttons, no notice:

    grubhub:  true,
    ubereats: true,

Only Grubhub paused (how the site is set up today):

    grubhub:  false,
    ubereats: true,

Only Uber Eats paused:

    grubhub:  true,
    ubereats: false,

Both paused — all online ordering off:

    grubhub:  false,
    ubereats: false,

IMPORTANT: whenever you change a switch, reread the notice below it and make
sure it still matches. The notice does not update itself. If you pause Uber
Eats but the notice still says Grubhub is down, customers get the wrong
message.


-------------------------------------------------------------------------------
THE OTHER TWO SETTINGS
-------------------------------------------------------------------------------

notice
    The message shown above the buttons. It appears whenever at least one
    platform is paused, and disappears on its own when both are back on.
    It currently reads:

        Grubhub ordering is temporarily unavailable.
        Please order through Uber Eats or call us at (646) 382-3912.

    It is written as a list, and each entry starts on its own line:

        notice: [
          'Grubhub ordering is temporarily unavailable.',
          'Please order through Uber Eats or call us at (646) 382-3912.'
        ],

    Every entry except the last one has a comma after its closing quote. Add
    a line by adding another entry, remove one by deleting its whole row.

    Some examples:

    If you pause Uber Eats instead:

        notice: [
          'Uber Eats ordering is temporarily unavailable.',
          'Please order through Grubhub or call us at (646) 382-3912.'
        ],

    If you pause both:

        notice: [
          'Online ordering is temporarily unavailable.',
          'Please call us at (646) 382-3912 or stop by to order in person.'
        ],

    For a one-line message you can skip the brackets and use plain quotes:

        notice: 'We are not taking Grubhub orders this week.',

    For no notice at all, use empty quotes: ''

buttonNote
    The small line under each grey logo, currently "Temporarily unavailable".
    It is used for every paused platform. Keep it short — it sits in a narrow
    space under the logo.

One thing to watch: every piece of text must stay inside its single quotes,
exactly as it does now. If your text needs an apostrophe, type it as \' — for
example:

    notice: 'We\'re not taking Grubhub orders this week.',


-------------------------------------------------------------------------------
PUBLISHING YOUR CHANGES
-------------------------------------------------------------------------------

The site is hosted on GitHub Pages, so a saved file is not a live file. After
saving ordering.js, publish it from the Terminal in the website folder:

    git add ordering.js
    git commit -m "Pause Grubhub ordering"
    git push

The live site usually updates within a minute or two.

To preview before publishing, open index.html in your browser, or run this in
the website folder and visit http://localhost:8000:

    python3 -m http.server 8000


-------------------------------------------------------------------------------
IF SOMETHING LOOKS WRONG
-------------------------------------------------------------------------------

The buttons still look normal after pausing
    Your browser cached the old file. Hard refresh the page:
    Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows.

Both buttons greyed out when you only paused one
    Check that you changed only one switch to false and that each line still
    ends with a comma.

Nothing on the page loads anymore
    A quote or comma in ordering.js was most likely deleted by accident. Undo
    your change with:

        git checkout ordering.js


-------------------------------------------------------------------------------
IF YOU ADD ANOTHER DELIVERY PLATFORM LATER
-------------------------------------------------------------------------------

The switches are matched to the buttons by a label in index.html. Each button
carries one, like this:

    <a class="order-option" data-provider="grubhub" ...>

To make a third platform switchable, give its button a data-provider of its
own, for example data-provider="doordash", then add a matching line to the
settings in ordering.js:

    doordash: true,

A button whose data-provider has no matching setting simply keeps working, so
nothing breaks if you forget.


-------------------------------------------------------------------------------
WORTH KNOWING
-------------------------------------------------------------------------------

This only greys out the buttons on your website. It does NOT pause your store
on Grubhub or Uber Eats. If you need orders to actually stop coming in, also
pause the store in each platform's own merchant app. Customers who have the
apps installed, or who saved a direct link, can still reach you otherwise.

The same applies to festosgrill.com/order, the short link that forwards
straight to the ordering page. It is separate from these buttons and keeps
working. Tell me if you want that one switched off too.

For the blue announcement strip at the top of the site, see the separate
instructions in BANNER-README.txt.
