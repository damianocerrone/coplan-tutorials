/* CoPlanAI platform guide: Chapter 5: What your participants see. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 *   frame: "phone"  (on a step) for plates made with tools/compose-phone.py: no browser bar, fingertip pointer
 * The phone plates (5-02 to 5-10) were composed with tools/compose-phone.py from 390x844 @3x captures;
 * each box was measured on its phone screenshot, mapped onto the plate and checked by drawing it.
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "participant-experience",
  title: "What your participants *see*",
  summary: "Follow a participant through your workshop on their phone, from the welcome screen to the closing question, so you can test it, brief people and help them on the day.",
  steps: [
    {
      id: "journey-overview",
      title: "Walk the journey yourself",
      lead: "Before you share the link, go through your workshop as a participant would. Choose <strong>Go to workshop</strong> in the card's <strong>&bull;&bull;&bull;</strong> menu, <strong>Try it as a participant</strong> at the end of the guided setup, or <strong>Preview</strong> in the advanced editor.",
      image: "img/5-01-journey-overview.webp",
      url: "coplanai.ikonai.app",
      alt: "The participant view on a laptop: the workshop name and a seven-step progress bar along the top, with Questions ticked off and Select group current, eight cards from Table A to Table H, and a Get started button.",
      note: {
        kind: "tip",
        title: "Testing as more than one participant?",
        html: "Open each test participant in its own private window, or on a separate device. Participant tabs open side by side in the same browser can get in each other's way."
      },
      beats: [
        {
          html: "On a laptop, the whole journey runs along the top: <strong>Questions</strong>, <strong>Select group</strong>, <strong>Select Image</strong>, <strong>Choose transformation</strong>, <strong>Transformation</strong>, <strong>Iterate</strong> and <strong>Complete</strong>. A phone names only the current step.",
          highlight: { box: [0.2265, 0.0172, 0.5465, 0.0373], label: "Seven steps", side: "below" },
          zoom: [0.2, 0, 0.6, 0.6]
        },
        {
          html: "With the questions ticked off, participants pick their table under <strong>Select your group</strong>. These are the groups you set up, here <strong>Table A</strong> to <strong>Table H</strong>.",
          highlight: { box: [0.0865, 0.2066, 0.827, 0.5475], label: "Tables", side: "above" },
          cursor: { at: [0.1527, 0.33], click: true }
        },
        {
          html: "<strong>Get started</strong> stays pale until a table is picked. Next they tap the seat letter printed on their table card, as shown in <a href='#participants-sign-in'>What participants do to join</a>.",
          highlight: { box: [0.4666, 0.7926, 0.0667, 0.0541], label: "Get started" },
          cursor: { at: [0.5, 0.8197], click: true },
          zoom: [0.25, 0.44, 0.5, 0.5]
        },
        {
          html: "<strong>Start over</strong>, the circular arrow in the top-left corner, lets you begin the journey again: handy for a second test run.",
          highlight: { box: [0.0096, 0.0108, 0.0249, 0.0499], shape: "circle", label: "Start over", side: "right" },
          cursor: { at: [0.0221, 0.0358], click: true },
          zoom: [0, 0, 0.45, 0.45]
        }
      ]
    },
    {
      id: "journey-welcome",
      title: "The welcome and the questions",
      lead: "Participants sign in first, as described in <a href='#participants-sign-in'>What participants do to join</a>. Then your workshop opens with its welcome screen and the questionnaire, one question per screen.",
      image: "img/5-02-welcome.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Three phone screens: the welcome screen, What this square could be, with a green arrow button; the question How old are you? with Rather not say ticked and a Next button; and the last question, If this street changed, would it change your day?, with a Get started button.",
      note: {
        kind: "info",
        title: "Where the answers go",
        html: "Questionnaire answers appear in the engagement report, under <strong>What we asked, what you said, what we did</strong>. See <a href='#report-questionnaire'>Find the questionnaire answers</a>."
      },
      beats: [
        {
          html: "The welcome screen opens with the words drafted in your guided setup, here <strong>What this square could be</strong>. Participants tap the green arrow to begin.",
          highlight: { box: [0.1378, 0.4252, 0.1708, 0.272], label: "Welcome" },
          cursor: { at: [0.2235, 0.6714], click: true },
          zoom: [0, 0.2812, 0.56, 0.56]
        },
        {
          html: "Each question gets its own screen. <strong>Choose one</strong> asks for a single answer; other questions say <strong>Choose any that apply</strong>.",
          highlight: { box: [0.4467, 0.2644, 0.1062, 0.1247], label: "One per screen" },
          zoom: [0.2198, 0.0467, 0.56, 0.56]
        },
        {
          html: "Questions like this one offer a neutral answer, such as <strong>Rather not say</strong>, so nobody has to share more than they want. Then <strong>Next</strong>.",
          highlight: { box: [0.4131, 0.7123, 0.1735, 0.0572], label: "Neutral answer" },
          cursor: { at: [0.4557, 0.7409], click: true },
          zoom: [0.2198, 0.44, 0.56, 0.56]
        },
        {
          html: "On the last question, the button reads <strong>Get started</strong>. Anyone who finished the questionnaire skips it when they come back, though they choose their table, seat and picture again.",
          highlight: { box: [0.6893, 0.7593, 0.1735, 0.049], label: "Get started" },
          cursor: { at: [0.776, 0.7838], click: true },
          zoom: [0.44, 0.44, 0.56, 0.56]
        }
      ]
    },
    {
      id: "journey-picture",
      title: "Choose a starting picture",
      lead: "Once seated, participants choose the picture they want to change. They choose between the image sources you switched on in setup.",
      image: "img/5-03-picture.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Three phone screens: Which picture do you want to change? with From the library selected; the same screen with From street view selected; and Select from image library with four street photos, the second one ticked.",
      note: {
        kind: "warning",
        title: "Test street view on real phones",
        html: "The street-view map needs a browser with WebGL2. Without it, the screen can go blank after <strong>Open street view</strong>. Try it on the kind of phones your participants use, and offer a library as well."
      },
      beats: [
        {
          html: "<strong>From the library</strong> offers the pictures you chose for this workshop, or as the screen puts it: <em>Reuse a picture already taken here.</em>",
          highlight: { box: [0.1764, 0.2928, 0.0942, 0.2277], label: "Library" },
          cursor: { at: [0.2235, 0.4134], click: true },
          zoom: [0, 0.26, 0.56, 0.56]
        },
        {
          html: "<strong>From street view</strong> lets them <em>find the exact spot in street view</em> by dropping a pin on the map. The button changes to <strong>Open street view</strong>.",
          highlight: { box: [0.4527, 0.5238, 0.0942, 0.2277], label: "Street view" },
          cursor: { at: [0.4998, 0.6431], click: true },
          zoom: [0.2198, 0.31, 0.56, 0.56]
        },
        {
          html: "In the library, they tap the picture they want to change. A green tick marks their choice.",
          highlight: { box: [0.7766, 0.2548, 0.0836, 0.1671], label: "Their picture", side: "below" },
          cursor: { at: [0.8181, 0.3527], click: true },
          zoom: [0.44, 0.0583, 0.56, 0.56]
        },
        {
          html: "Then <strong>Continue</strong>. It stays pale and does nothing until a picture is chosen, so check for the green tick if someone is stuck here.",
          highlight: { box: [0.681, 0.8699, 0.1899, 0.0531], label: "Continue" },
          cursor: { at: [0.776, 0.8964], click: true },
          zoom: [0.44, 0.44, 0.56, 0.56]
        }
      ]
    },
    {
      id: "journey-theme",
      title: "Tap a ready-made change",
      lead: "Next, participants choose how to change their picture. This workshop offers all three ways, and a theme is the quickest: one tap on a ready-made change.",
      image: "img/5-04-theme.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Three phone screens: Choose a transformation method with Theme, Draw on the image and Transform with prompt cards; a sheet listing ten ready-made changes such as Seats in the sun and the shade; and the picture with that change chosen, above Change theme, Skip theme and Transform.",
      beats: [
        {
          html: "Under <strong>Choose a transformation method</strong> they tap a card: <strong>Theme</strong>, <strong>Draw on the image</strong> or <strong>Transform with prompt</strong>.",
          highlight: { box: [0.1368, 0.2456, 0.1735, 0.688], label: "Three ways" },
          cursor: { at: [0.2235, 0.4307], click: true },
          zoom: [0, 0.1896, 0.8, 0.8]
        },
        {
          html: "<strong>Pick a theme</strong> opens the buttons of your theme, here Placemaking&rsquo;s ten ready-made changes. Participants tap the one they want to see.",
          highlight: { box: [0.4046, 0.4247, 0.1904, 0.4859], label: "Ready-made changes" },
          cursor: { at: [0.4998, 0.5082], click: true },
          zoom: [0.2198, 0.3877, 0.56, 0.56]
        },
        {
          html: "Their choice appears in green under the picture, and <strong>Change theme</strong> swaps it for another.",
          highlight: { box: [0.7057, 0.7734, 0.1406, 0.1001], label: "Chosen change" },
          zoom: [0.44, 0.44, 0.56, 0.56]
        },
        {
          html: "<strong>Transform</strong> sends it to the AI, once a change is picked. <strong>Skip theme</strong>, if you allow it, moves on without one.",
          highlight: { box: [0.716, 0.874, 0.1199, 0.049], label: "Transform" },
          cursor: { at: [0.8081, 0.8985], click: true },
          zoom: [0.44, 0.44, 0.56, 0.56]
        }
      ]
    },
    {
      id: "journey-draw-prompt",
      title: "Or draw it, or describe it",
      lead: "The other two cards give participants more freedom: sketching the change onto the picture with coloured pens, or describing it in their own words.",
      image: "img/5-05-draw-prompt.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Two phone screens: Draw your idea, with green, blue and yellow strokes on a street photo, the colour legend, the drawing tools and a Transform button; and Transformation, showing the original photo and a typed idea about birch trees, benches and a café terrace.",
      note: {
        kind: "tip",
        title: "Brief the colours",
        html: "Only the legend's colours carry a meaning. The swatch row also offers others, such as purple and white, and when we tried it the pen started on red, which takes something away. Point people to the legend's colours before they draw."
      },
      beats: [
        {
          html: "With <strong>Draw on the image</strong>, participants sketch straight onto their picture with a finger, showing where things should change.",
          highlight: { box: [0.2674, 0.1978, 0.1889, 0.2862], label: "Drawing" },
          cursor: { at: [0.3278, 0.3874], click: false },
          zoom: [0.0819, 0.0609, 0.56, 0.56]
        },
        {
          html: "The legend names the colours from your guided setup, or from <strong>Draw</strong> in the editor, but not what they do. Tell people what they mean: green adds greenery, red takes something away.",
          highlight: { box: [0.2988, 0.5097, 0.1262, 0.1021], label: "Colour legend" },
          zoom: [0.0819, 0.2807, 0.56, 0.56]
        },
        {
          html: "Below are undo and redo, an eraser, text, arrows and shapes. When the sketch is done, <strong>Transform</strong> turns it into a picture.",
          highlight: { box: [0.264, 0.6135, 0.1929, 0.3095], label: "Tools", side: "right" },
          cursor: { at: [0.3619, 0.8987], click: true },
          zoom: [0.0819, 0.44, 0.56, 0.56]
        },
        {
          html: "With <strong>Transform with prompt</strong>, they type their idea under <strong>How would you like to reimagine this?</strong> and tap the green arrow.",
          highlight: { box: [0.5519, 0.7959, 0.1725, 0.1137], label: "Their own words" },
          cursor: { at: [0.7111, 0.8677], click: true },
          zoom: [0.3581, 0.44, 0.56, 0.56]
        }
      ]
    },
    {
      id: "journey-variants",
      title: "Generate and compare",
      lead: "Each <strong>Transform</strong> makes several versions of the picture at once, three in this workshop, so participants can pick the one that says it best.",
      image: "img/5-06-variants.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Three phone screens: Making your picture, with an optional It matters because field and three empty thumbnails; the result labelled Your picture, with a row of seven icons and three thumbnails; and the same screen showing the original photo.",
      note: {
        kind: "info",
        title: "Allow for a short wait",
        html: "When we tried it, three variants took roughly 10 to 25 seconds. <strong>Images per generation</strong>, under <strong>Generation</strong> in the editor, sets how many each round makes."
      },
      beats: [
        {
          html: "While the AI works, the screen reads <strong>Making your picture...</strong> and asks an optional question: <em>why does this matter to you?</em> It disappears when the picture arrives, so it&rsquo;s easy to miss.",
          highlight: { box: [0.1414, 0.405, 0.1643, 0.1285], label: "Why it matters" },
          cursor: { at: [0.2235, 0.507], click: true },
          zoom: [0, 0.1893, 0.56, 0.56]
        },
        {
          html: "The three empty frames below stand for the three variants on their way.",
          highlight: { box: [0.1773, 0.7061, 0.0882, 0.0613], label: "Three variants" },
          zoom: [0, 0.44, 0.56, 0.56]
        },
        {
          html: "The result appears as <strong>YOUR PICTURE</strong>. Participants tap a thumbnail to compare the variants; the one in view is outlined in green.",
          highlight: { box: [0.4536, 0.6183, 0.0882, 0.0613], label: "Variants" },
          cursor: { at: [0.4978, 0.6491], click: true },
          zoom: [0.2198, 0.16, 0.56, 0.56]
        },
        {
          html: "The icons are, in order: original, AI impact, touch up, submit, copy link, download and regenerate. On a phone they have no labels, so show people which is which.",
          highlight: { box: [0.4017, 0.5649, 0.1961, 0.0572], label: "Picture tools" },
          zoom: [0.2198, 0.3135, 0.56, 0.56]
        },
        {
          html: "The first icon switches to the untouched photo, labelled <strong>ORIGINAL</strong>, for a quick before and after. Another tap switches back.",
          highlight: { box: [0.6785, 0.5649, 0.0286, 0.0572], label: "Before and after", side: "right" },
          cursor: { at: [0.6928, 0.5935], click: true },
          zoom: [0.44, 0.16, 0.56, 0.56]
        }
      ]
    },
    {
      id: "journey-refine",
      title: "Understand and refine it",
      lead: "The first picture is rarely the last. Participants can read what their change would mean, correct details by hand, or ask for a new version.",
      image: "img/5-07-refine.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Three phone screens: the Transformation analysis with its Impact list and Trade-offs, gains and losses; the Touch up screen with orange and blue marks drawn on the result; and a follow-up idea typed under How would you like to reimagine this?, below AI suggestions (3).",
      beats: [
        {
          html: "The AI impact icon opens <strong>Transformation analysis</strong>. <strong>Impact</strong> lists what the change does, and flags possible downsides in orange, such as <em>Narrowed walkways</em>.",
          highlight: { box: [0.1373, 0.1808, 0.1706, 0.2937], label: "Impact" },
          zoom: [0, 0.0477, 0.56, 0.56]
        },
        {
          html: "<strong>Trade-offs</strong> sets out who gains and who loses, under <strong>GAINS</strong> and <strong>LOSSES</strong>: a good starting point for a conversation at the table.",
          highlight: { box: [0.1373, 0.4889, 0.1638, 0.216], label: "Trade-offs" },
          zoom: [0, 0.3169, 0.56, 0.56]
        },
        {
          html: "The pencil icon opens the touch-up view: participants mark corrections on the result with coloured pens, then tap <strong>Apply</strong> for a touched-up version.",
          highlight: { box: [0.4053, 0.073, 0.1889, 0.3331], label: "Touch up", side: "right" },
          cursor: { at: [0.5174, 0.0976], click: true },
          zoom: [0.2198, 0, 0.56, 0.56]
        },
        {
          html: "<strong>AI suggestions (3)</strong> offers three follow-up ideas written for this picture, for anyone stuck on what to try next.",
          highlight: { box: [0.7322, 0.7816, 0.0875, 0.0572], label: "AI suggestions" },
          cursor: { at: [0.776, 0.8102], click: true },
          zoom: [0.44, 0.44, 0.56, 0.56]
        },
        {
          html: "Or they type their own next step in <strong>Describe your idea</strong>, such as <em>Add a row of birch trees along the tram tracks</em>, and tap the arrow.",
          highlight: { box: [0.6898, 0.8391, 0.1725, 0.0705], label: "Next idea" },
          cursor: { at: [0.849, 0.8744], click: true },
          zoom: [0.44, 0.44, 0.56, 0.56]
        }
      ]
    },
    {
      id: "journey-submit",
      title: "React, comment and submit",
      lead: "When participants have a picture they stand behind, they share it. A reaction or a comment adds their view in a tap or a sentence.",
      image: "img/5-08-submit.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Three phone screens: the heart reaction selected and a comment being typed next to a Save button; the submit icon turned into a green tick; and the menu open with Start over, Complete, Gallery, Language and Theme.",
      note: {
        kind: "tip",
        title: "Tell people how to finish",
        html: "After they submit a picture, the screen doesn't move on by itself. Tell participants to open the menu and tap <strong>Complete</strong> when they're done: it appears only once they've submitted."
      },
      beats: [
        {
          html: "A heart, an OK hand or a yawn: one tap says how they feel. The report counts a heart or OK hand as backing the picture, and a yawn as against it.",
          highlight: { box: [0.1804, 0.644, 0.0656, 0.049], label: "Reactions" },
          cursor: { at: [0.1926, 0.6685], click: true },
          zoom: [0, 0.3885, 0.56, 0.56]
        },
        {
          html: "The speech bubble opens a comment field. They type a thought and tap <strong>Save</strong>; there&rsquo;s no confirmation, but the comment is kept.",
          highlight: { box: [0.1373, 0.6891, 0.1725, 0.0572], label: "Comment" },
          cursor: { at: [0.2914, 0.7177], click: true },
          zoom: [0, 0.4377, 0.56, 0.56]
        },
        {
          html: "The share icon submits the picture in view to the shared gallery. It turns into a green tick.",
          highlight: { box: [0.4855, 0.5649, 0.0286, 0.0572], label: "Submitted" },
          cursor: { at: [0.4998, 0.5935], click: true },
          zoom: [0.2198, 0.3135, 0.56, 0.56]
        },
        {
          html: "Now the menu in the top-right corner offers <strong>Complete</strong>, the way on to the end of the journey.",
          highlight: { box: [0.7487, 0.1685, 0.1217, 0.0572], label: "Complete", side: "left" },
          cursor: { at: [0.78, 0.1971], click: true },
          zoom: [0.44, 0, 0.56, 0.56]
        },
        {
          html: "The same menu holds <strong>Start over</strong>, the workshop <strong>Gallery</strong> and a <strong>Theme</strong> switch between <strong>Light</strong> and <strong>Dark</strong>.",
          highlight: { box: [0.7461, 0.1182, 0.1268, 0.2657], label: "Menu", side: "left" },
          zoom: [0.44, 0, 0.56, 0.56]
        }
      ]
    },
    {
      id: "journey-table-vote",
      title: "Decide together as a table",
      lead: "In this workshop, run at tables, <strong>Complete</strong> first leads into a short table vote: the people around each table choose which of their pictures to carry forward.",
      image: "img/5-09-table-vote.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Three phone screens: Pick your three, then seal, with one picture picked and a Seal my 1 button; Split card 1 of 1, with a line typed above the Let it go and Keep it buttons; and The table's picks are on the wall, with a Continue button.",
      note: {
        kind: "info",
        title: "Not voting?",
        html: "<strong>Skip the table vote</strong>, below the buttons on every vote screen, lets a participant leave the vote out."
      },
      beats: [
        {
          html: "Everyone picks up to three of the table&rsquo;s pictures they would defend. As the screen says, nobody sees anyone&rsquo;s picks until every seat has sealed.",
          highlight: { box: [0.1289, 0.1968, 0.1891, 0.2477], label: "Pick up to three" },
          cursor: { at: [0.1754, 0.37], click: true },
          zoom: [0, 0.0406, 0.56, 0.56]
        },
        {
          html: "<strong>Seal my 1</strong> locks in their picks; the number counts them.",
          highlight: { box: [0.1383, 0.4532, 0.1704, 0.0572], label: "Seal" },
          cursor: { at: [0.2235, 0.4818], click: true },
          zoom: [0, 0.2018, 0.56, 0.56]
        },
        {
          html: "Pictures that split the table go to the round. For each <strong>Split card</strong>, the table talks first; then everyone gives a stance and the one line they&rsquo;d stand behind.",
          highlight: { box: [0.405, 0.195, 0.1893, 0.1897], label: "Split card" },
          zoom: [0.2198, 0.0099, 0.56, 0.56]
        },
        {
          html: "The line is optional. <strong>Keep it</strong> or <strong>Let it go</strong> is the stance, and the lines are revealed together, shuffled, with no seats or names.",
          highlight: { box: [0.4048, 0.6196, 0.1899, 0.1305], label: "Stance and line" },
          cursor: { at: [0.5471, 0.7216], click: true },
          zoom: [0.2198, 0.4049, 0.56, 0.56]
        },
        {
          html: "<strong>The table&rsquo;s picks are on the wall</strong> shows what the table carried forward. <strong>Continue</strong> leads to the closing screen.",
          highlight: { box: [0.6815, 0.1968, 0.1889, 0.2967], label: "Carried" },
          cursor: { at: [0.776, 0.4649], click: true },
          zoom: [0.44, 0.0651, 0.56, 0.56]
        }
      ]
    },
    {
      id: "journey-closing",
      title: "The closing screen",
      lead: "The last screen thanks participants and shows the picture they shared. From here they can follow their ideas and vote on other people's.",
      image: "img/5-10-closing.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Three phone screens: the closing screen with the shared picture, What would make you stay an hour?, Where your ideas stand, Vote on ideas and a countdown; the Where your ideas stand panel with three ideas marked Raised; and the Vote on ideas deck, still empty.",
      beats: [
        {
          html: "Their submitted picture is labelled <strong>YOUR PICTURE &middot; SHARED WITH THE GALLERY</strong>, so they know it has gone in.",
          highlight: { box: [0.129, 0.2979, 0.1889, 0.2379], label: "Shared picture" },
          zoom: [0, 0.1369, 0.56, 0.56]
        },
        {
          html: "Below it is your closing question, here <strong>What would make you stay an hour?</strong> The phone doesn&rsquo;t collect an answer, so ask it out loud in the room.",
          highlight: { box: [0.1359, 0.5591, 0.1757, 0.129], label: "Closing question" },
          zoom: [0, 0.3436, 0.56, 0.56]
        },
        {
          html: "<strong>Where your ideas stand</strong> lists each of their ideas with its step on your follow-up ladder, starting at <strong>Raised</strong>. <a href='#ideas-follow-up'>Follow up every idea</a> explains the ladder.",
          highlight: { box: [0.4006, 0.2787, 0.1984, 0.4427], label: "Their ideas" },
          zoom: [0.2198, 0.22, 0.56, 0.56]
        },
        {
          html: "<strong>Vote on ideas</strong> opens a quick yes-or-no deck of the pictures other people have shared. It stays empty until someone else submits one.",
          highlight: { box: [0.6808, 0.078, 0.1904, 0.2503], label: "Vote on ideas" },
          zoom: [0.44, 0, 0.56, 0.56]
        },
        {
          html: "The countdown then sends the phone back to the welcome screen, ready for the next person. Set its length with <strong>Auto-restart timer</strong> under <strong>Complete</strong> in the editor.",
          highlight: { box: [0.2045, 0.8624, 0.0381, 0.0423], label: "Countdown" },
          zoom: [0, 0.44, 0.56, 0.56]
        }
      ]
    }
  ]
});
