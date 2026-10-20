===============================================================================
FESTOS GRILL — HOW TO USE THE ANNOUNCEMENT BANNER
===============================================================================

The announcement banner is the dark blue strip at the very top of
festosgrill.com, above the ORDER / MENU / LOCATION / HOURS / CONTACT links.
Use it for short, important notices: a move, a holiday closure, a phone
number change, a temporary menu change.

Everything you need to edit lives in ONE file:

    banner.js

Open it in any text editor. At the top you will see a block that starts with:

    SETTINGS — this is the only part you need to edit

That block is the whole banner. Nothing below it needs to be touched.


-------------------------------------------------------------------------------
THE SETTINGS, ONE BY ONE
-------------------------------------------------------------------------------

enabled
    true  = the banner shows on the site
    false = the banner is completely hidden
    No quotation marks around true or false.

id
    A short nickname for the current message, in quotes, used to remember who
    has already closed the banner. Change it every time you write a NEW
    message. See "WHY THE ID MATTERS" below.

label
    The small orange tag in front of the message, for example:
        Store Update
        Holiday Hours
        Important
    Keep it to one or two words. For no tag at all, use empty quotes: ''

message
    The sentence customers read. Keep it to one or two sentences — this is a
    narrow strip, not a paragraph.

link
    The small white pill button beside the message. It has three parts:
        href = the web address it opens
        text = what the button says
        icon = 'instagram' draws the Instagram logo. Use '' for no logo.
    To remove the button entirely, replace the whole block with:
        link: null,

dismissible
    true  = customers can close the banner with the X, and it stays closed
            for them
    false = no X, the banner always shows


-------------------------------------------------------------------------------
HOW TO CHANGE THE MESSAGE
-------------------------------------------------------------------------------

1. Open banner.js.
2. Edit the text inside the quotes on the "message" line.
3. Change the "id" line to a new nickname, for example 'holiday-hours-2026-12'.
   (This is what makes the new message appear for everyone, including people
   who closed the last one.)
4. Update "label" if the old tag no longer fits.
5. Save the file and publish (see PUBLISHING below).

Watch out for one thing only: the message must stay inside its single quotes,
and it must end with a comma after the closing quote, exactly like it does now.
If your message needs an apostrophe, type it as \' — for example:

    message: 'We\'re closed Monday for a private event.',


-------------------------------------------------------------------------------
HOW TO TURN THE BANNER OFF
-------------------------------------------------------------------------------

1. Open banner.js.
2. Change this line:

       enabled: true,

   to:

       enabled: false,

3. Save and publish.

The banner disappears from the site. Nothing else changes, and the message is
still sitting there for next time. To bring it back, set it to true again.


-------------------------------------------------------------------------------
WHY THE ID MATTERS
-------------------------------------------------------------------------------

When a customer clicks the X, their browser remembers that they closed THAT
specific message, so it does not nag them on every visit. The browser matches
it by the "id".

So if you write a brand new message but leave the old id in place, anyone who
closed the previous banner will never see the new one. Changing the id tells
every browser "this is a different notice" and the banner comes back for
everyone.

A good id is a few words plus the month, so it is always unique:

    'new-location-2026-10'
    'closed-for-easter-2027-04'
    'new-phone-number-2027-01'

If you want a message nobody can dismiss, set dismissible to false instead,
and the id no longer matters.


-------------------------------------------------------------------------------
PUBLISHING YOUR CHANGES
-------------------------------------------------------------------------------

The site is hosted on GitHub Pages, so a saved file is not a live file. After
saving banner.js, publish it from the Terminal in the website folder:

    git add banner.js
    git commit -m "Update the announcement banner"
    git push

The live site usually updates within a minute or two.

To preview before publishing, open index.html in your browser, or run this in
the website folder and visit http://localhost:8000:

    python3 -m http.server 8000


-------------------------------------------------------------------------------
IF SOMETHING LOOKS WRONG
-------------------------------------------------------------------------------

The banner vanished and you did not turn it off
    You probably clicked the X yourself at some point. Open the site in a
    private/incognito window to see it the way customers do.

Nothing on the page loads anymore
    A quote or comma in banner.js was most likely deleted by accident. Compare
    your edit against the punctuation shown in the examples above, or undo
    your change with:

        git checkout banner.js

The old message is still showing
    Your browser cached the old file. Hard refresh the page:
    Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows.


-------------------------------------------------------------------------------
THE FILES INVOLVED
-------------------------------------------------------------------------------

banner.js    The message, the on/off switch, and the code that draws it.
             This is the only file you edit.
styles.css   The look of the banner, under "ANNOUNCEMENT BANNER" near the top.
             Edit only if you want to change colors or spacing.
index.html   Holds the empty <div id="announcement"></div> the banner drops
             into, just after <body>. Leave it alone.
