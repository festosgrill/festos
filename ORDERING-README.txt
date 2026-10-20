===============================================================================
FESTOS GRILL — HOW TO PAUSE AND RESUME ONLINE ORDERING
===============================================================================

This controls the two buttons in the "Pickup or delivery" section of
festosgrill.com: Grubhub and Uber Eats.

When you pause online ordering:
  - both logos turn grey
  - the buttons stop working, so nobody can click through and place an order
  - "Order now" under each logo changes to "Temporarily unavailable"
  - a short notice appears above the buttons explaining why

Nothing is deleted. Turning it back on is a one-word change.

Everything you need to edit lives in ONE file:

    ordering.js

Open it in any text editor. At the top you will see a block that starts with:

    SETTINGS — this is the only part you need to edit

That block is the whole feature. Nothing below it needs to be touched.


-------------------------------------------------------------------------------
HOW TO PAUSE ONLINE ORDERING
-------------------------------------------------------------------------------

1. Open ordering.js.
2. Change this line:

       available: true,

   to:

       available: false,

3. Save and publish (see PUBLISHING below).

The buttons grey out immediately for every visitor.


-------------------------------------------------------------------------------
HOW TO TURN ONLINE ORDERING BACK ON
-------------------------------------------------------------------------------

1. Open ordering.js.
2. Change available back to true:

       available: true,

3. Save and publish.

The buttons return to full color and work exactly as before. There is nothing
else to undo — no deleted links to put back, no styling to reverse.


-------------------------------------------------------------------------------
THE OTHER TWO SETTINGS
-------------------------------------------------------------------------------

notice
    The sentence shown above the greyed-out buttons. It currently reads:

        Online ordering is temporarily unavailable. Please call us at
        (646) 382-3912 or stop by to order in person.

    Edit the text inside the quotes to say something else, for example
    mention a reopening date. For no notice at all, use empty quotes: ''

buttonNote
    The small line under each grey logo, currently "Temporarily unavailable".
    Keep it short — it sits in a narrow space under the logo.

Both of these are ignored while available is true, so you can write them
ahead of time and they will be ready whenever you need to pause.

One thing to watch: each setting must stay inside its single quotes and end
with a comma, exactly as it does now. If your text needs an apostrophe, type
it as \' — for example:

    notice: 'We\'re not taking online orders this week.',


-------------------------------------------------------------------------------
PUBLISHING YOUR CHANGES
-------------------------------------------------------------------------------

The site is hosted on GitHub Pages, so a saved file is not a live file. After
saving ordering.js, publish it from the Terminal in the website folder:

    git add ordering.js
    git commit -m "Pause online ordering"
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

Nothing on the page loads anymore
    A quote or comma in ordering.js was most likely deleted by accident. Undo
    your change with:

        git checkout ordering.js


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
