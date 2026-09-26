/* CoPlanAI platform guide: Chapter 4: Publish, share and run. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 *   frame: "phone"  (on a step) for plates made with tools/compose-phone.py: no browser bar, fingertip pointer
 * Every box and cursor point was checked by drawing it on the screenshot.
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "publish-and-share",
  title: "Publish, share and *run*",
  summary: "Publish your workshop, share its link and QR code, and run the session: start, pause and end it, and read what each status means.",
  steps: [
    {
      id: "publish-workshop",
      title: "Publish your workshop",
      lead: "Every new workshop starts as a <strong>Draft</strong> that only admins and editors can open. Publishing it is the first step to letting participants in.",
      image: "img/4-01-publish-menu.webp",
      url: "coplanai.ikonai.app",
      alt: "The Your Workshops panel with the three-dot menu of a Draft workshop open: Go to workshop, Open gallery, Edit workshop, Guided setup, Publish workshop, Duplicate workshop, Share workshop link and Archive workshop.",
      note: {
        kind: "info",
        title: "Publishing from the guided setup",
        html: "The <strong>Publish</strong> button in the guided setup works differently. It asks <strong>Publish this workshop?</strong> without an access choice, then makes the workshop Public and Live at once, with today as its start date."
      },
      beats: [
        {
          html: "The <strong>Draft</strong> tag means the workshop isn't published yet, so participants can't take part. The tag beside it counts participants: none so far.",
          highlight: { box: [0.1987, 0.7357, 0.0564, 0.0328], label: "Draft" },
          zoom: [0.1, 0.42, 0.42, 0.42]
        },
        {
          html: "Click <strong>&bull;&bull;&bull;</strong> on the card and choose <strong>Publish workshop</strong>. You'll find it in the menu only while the workshop is a draft.",
          highlight: { box: [0.2715, 0.6393, 0.1037, 0.0457], label: "Publish" },
          cursor: { at: [0.305, 0.6622], click: true },
          zoom: [0.1, 0.42, 0.42, 0.42]
        },
        {
          html: "<strong>Share workshop link</strong> works for drafts too, so you can send the link early, once its address is final (see the tip further down). Participants can join only once the workshop is <strong>Live</strong>.",
          highlight: { box: [0.2715, 0.7066, 0.1037, 0.0457], label: "Share link" },
          cursor: { at: [0.305, 0.7295], click: false },
          zoom: [0.1, 0.42, 0.42, 0.42]
        }
      ]
    },
    {
      id: "publish-access",
      title: "Choose who can get in",
      lead: "<strong>Publish workshop</strong> opens a short dialog. Pick the access level, then click <strong>Publish</strong>.",
      image: "img/4-02-publish-access.webp",
      url: "coplanai.ikonai.app",
      alt: "The Publish workshop dialog with its Access menu open, offering Private — only app users, editors, and admins, and Public — anyone with the link, which is selected.",
      beats: [
        {
          html: "Open the <strong>Access</strong> menu. It decides who can open the workshop once it's published.",
          highlight: { box: [0.3923, 0.5053, 0.2155, 0.0499], label: "Access" },
          cursor: { at: [0.5935, 0.5305], click: true },
          zoom: [0.29, 0.29, 0.42, 0.42]
        },
        {
          html: "<strong>Private — only app users, editors, and admins</strong> keeps it to people who already use your organisation's CoPlanAI app: useful for a dry run with colleagues.",
          highlight: { box: [0.3949, 0.5539, 0.1969, 0.0387], label: "Private", side: "left" },
          cursor: { at: [0.44, 0.5757], click: false },
          zoom: [0.29, 0.29, 0.42, 0.42]
        },
        {
          html: "<strong>Public — anyone with the link</strong> is the default, and the one you need for a public engagement. Participants still sign in first, as explained further down.",
          highlight: { box: [0.3949, 0.5886, 0.1969, 0.0437], label: "Public", side: "below" },
          cursor: { at: [0.45, 0.6094], click: true },
          zoom: [0.29, 0.29, 0.42, 0.42]
        }
      ]
    },
    {
      id: "start-workshop",
      title: "Start the workshop",
      lead: "Published from the dashboard, a workshop is ready but not yet running. Participants with the link can join once it is Live, so you choose the moment.",
      image: "img/4-03-start-workshop.webp",
      url: "coplanai.ikonai.app",
      alt: "The Your Workshops panel: the published copy shows only a Public tag and its open menu offers Start workshop; beside it, the workshop published from the guided setup shows Public and Live.",
      beats: [
        {
          html: "Your card now reads <strong>Public</strong>, with no status tag after it: the workshop is published, but not started.",
          highlight: { box: [0.1987, 0.7357, 0.0597, 0.0328], label: "Published" },
          zoom: [0.12, 0.45, 0.44, 0.44]
        },
        {
          html: "Open the <strong>&bull;&bull;&bull;</strong> menu and choose <strong>Start workshop</strong>. There's no confirmation: the card turns <strong>Live</strong> straight away and today becomes the start date.",
          highlight: { box: [0.2715, 0.7161, 0.1037, 0.0457], label: "Start", side: "right" },
          cursor: { at: [0.303, 0.739], click: true },
          zoom: [0.12, 0.45, 0.44, 0.44]
        },
        {
          html: "The workshop beside it was published from the guided setup, so it went <strong>Live</strong> at once and already has a participant.",
          highlight: { box: [0.4062, 0.7357, 0.086, 0.0328], label: "Already Live", side: "above" },
          zoom: [0.12, 0.45, 0.44, 0.44]
        }
      ]
    },
    {
      id: "status-tags",
      title: "Read the status tags",
      lead: "The tags on each card show who can get in and where the workshop stands. The card's <strong>&bull;&bull;&bull;</strong> menu changes with them.",
      image: "img/4-04-status-tags.webp",
      url: "coplanai.ikonai.app",
      alt: "Workshop cards with their tags: Public with no status tag, Public and Live, Public and Ended with 24 participants, and Public and Paused.",
      note: {
        kind: "info",
        title: "Draft and Archived",
        html: "A <strong>Draft</strong> tag marks a workshop that isn't published yet. <strong>Archived</strong> workshops appear only with <strong>Show archived</strong> switched on: see <a href='#after-the-workshop'>After the workshop</a>."
      },
      beats: [
        {
          html: "The first tag is the access level, <strong>Public</strong> or <strong>Private</strong>. With no status tag after it, as on this copy, the workshop is published but not started, and its menu offers <strong>Start workshop</strong>.",
          highlight: { box: [0.1987, 0.4298, 0.0597, 0.032], label: "Access" },
          zoom: [0.12, 0.2, 0.44, 0.44]
        },
        {
          html: "<strong>Live</strong>: the workshop is running and participants with the link can join. Its menu now offers <strong>Open live gallery</strong> and <strong>Pause workshop</strong>.",
          highlight: { box: [0.4387, 0.4298, 0.0281, 0.032], label: "Live", side: "above" },
          zoom: [0.12, 0.2, 0.44, 0.44]
        },
        {
          html: "<strong>Paused</strong>: on hold. Everyone was disconnected, and nobody can rejoin until you choose <strong>Start workshop</strong> in its menu again.",
          highlight: { box: [0.4387, 0.8465, 0.0381, 0.0328], label: "Paused", side: "above" },
          zoom: [0.12, 0.56, 0.44, 0.44]
        },
        {
          html: "<strong>Ended</strong>: closed for good. Participants can no longer join, but the report and data stay available. Its menu offers <strong>View report</strong>, and you can still duplicate the workshop.",
          highlight: { box: [0.2312, 0.8473, 0.0352, 0.032], label: "Ended", side: "above" },
          zoom: [0.12, 0.56, 0.44, 0.44]
        },
        {
          html: "The last tag counts participants: 24 people took part in this one.",
          highlight: { box: [0.2641, 0.8473, 0.0314, 0.032], label: "Participants", side: "above" },
          zoom: [0.12, 0.56, 0.44, 0.44]
        }
      ]
    },
    {
      id: "share-workshop-link",
      title: "Share the link and QR code",
      lead: "Choose <strong>Share workshop link</strong> in the card's <strong>&bull;&bull;&bull;</strong> menu. One link and one QR code take every participant to your workshop.",
      image: "img/4-05-share-link.webp",
      url: "coplanai.ikonai.app",
      alt: "The Scan to enter Senate Square 2040 (tutorial demo) dialog, with a large QR code and the participant link https://coplanai.ikonai.app/coplanai/my-workshop-30 next to a copy icon.",
      note: {
        kind: "tip",
        title: "A tidier address",
        html: "The end of the link is the workshop's <strong>Slug</strong>, here <em>my-workshop-30</em>. To make it more readable, change it in the editor under <strong>Settings</strong> &rsaquo; <strong>Basic Info</strong> before you share the link."
      },
      beats: [
        {
          html: "The dialog is titled <strong>Scan to enter</strong> and your workshop's name, so you can check you've opened the right one.",
          highlight: { box: [0.3799, 0.2057, 0.2189, 0.032], label: "Workshop name" },
          zoom: [0.29, 0.1, 0.42, 0.42]
        },
        {
          html: "Show the QR code on the screen in the room, or print it. Participants scan it with their phone's camera to open the workshop.",
          highlight: { box: [0.4094, 0.2897, 0.1808, 0.3615], label: "QR code" }
        },
        {
          html: "Click the link or the copy icon to copy it, then paste it into your invitation or onto your project page. The <strong>Copied</strong> confirmation is easy to miss, so paste once to check.",
          highlight: { box: [0.3754, 0.7003, 0.2492, 0.0794], label: "Link" },
          cursor: { at: [0.6069, 0.74], click: true },
          zoom: [0.29, 0.5, 0.42, 0.42]
        }
      ]
    },
    {
      id: "table-join-links",
      title: "Give each table its own link",
      lead: "Running the session in a room, in groups? Every group, or table, has its own join link, in the <strong>Groups</strong> section of the advanced editor.",
      image: "img/4-06-table-links.webp",
      url: "coplanai.ikonai.app",
      alt: "The Groups section of the advanced editor with Apply to all groups switched off: Table A is open, showing its Join Link ending in ?group=tablea with a copy icon, and the preview shows Select your group.",
      beats: [
        {
          html: "Open the workshop with <strong>Edit workshop</strong> and choose <strong>Groups</strong>. Each group is a table, here <strong>Table A</strong> to <strong>Table H</strong>.",
          highlight: { box: [0.0032, 0.2527, 0.1278, 0.0491], label: "Groups", side: "below" },
          cursor: { at: [0.036, 0.277], click: true },
          zoom: [0, 0.05, 0.46, 0.46]
        },
        {
          html: "Under <strong>Group Access</strong>, switch off <strong>Apply to all groups</strong>. Each table then gets its own row, with its own settings.",
          highlight: { box: [0.142, 0.3324, 0.0935, 0.0331], label: "Apply to all" },
          cursor: { at: [0.1568, 0.349], click: true },
          zoom: [0.1, 0.18, 0.46, 0.46]
        },
        {
          html: "Open a table, such as <strong>Table A</strong>. Its <strong>Join Link</strong> is the workshop link with the table added: it ends in <em>?&#8288;group=tablea</em>.",
          highlight: { box: [0.1533, 0.4848, 0.5719, 0.0896], label: "Join Link" },
          zoom: [0.12, 0.3, 0.62, 0.62]
        },
        {
          html: "Click the copy icon to copy each table's link, and share it only with the people at that table.",
          highlight: { box: [0.6953, 0.5238, 0.0241, 0.0473], label: "Copy" },
          cursor: { at: [0.7074, 0.5475], click: true },
          zoom: [0.3, 0.3, 0.46, 0.46]
        },
        {
          html: "With the plain workshop link, participants choose their table themselves under <strong>Select your group</strong>, as the preview shows.",
          highlight: { box: [0.7795, 0.1615, 0.1865, 0.8], label: "Preview", side: "left" }
        }
      ]
    },
    {
      id: "participants-sign-in",
      title: "What participants do to join",
      lead: "Whether they scan the QR code or tap a link, participants join on their own phone. Knowing the first screens helps you brief them. <a href='#participant-experience'>What your participants see</a> follows the rest of their journey.",
      image: "img/4-07-join-sign-in.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Three phone screens: Welcome to CoPlanAI with Continue with Google, Continue with Microsoft and an email field with Send code; Select your group with Table A selected; and Pick your seat with seat letters A to F and C selected.",
      note: {
        kind: "warning",
        title: "Public still means signing in",
        html: "<strong>Public — anyone with the link</strong> doesn't mean anonymous: every participant signs in first, and there is no guest access. Say so in your invitation, and allow a few minutes for it at the start of the session."
      },
      beats: [
        {
          html: "Even for a <strong>Public</strong>, Live workshop, anyone not yet signed in first sees <strong>Welcome to CoPlanAI</strong>. It doesn't name your workshop, so tell people to expect it.",
          highlight: { box: [0.1373, 0.2992, 0.1725, 0.4016], label: "Sign-in" },
          zoom: [0, 0.2, 0.56, 0.56]
        },
        {
          html: "They sign in with <strong>Continue with Google</strong> or <strong>Continue with Microsoft</strong>. Anyone else types their email and taps <strong>Send code</strong>, then uses the code sent to them.",
          highlight: { box: [0.1373, 0.4009, 0.1725, 0.3059], label: "Ways in" },
          cursor: { at: [0.2235, 0.6722], click: true },
          zoom: [0, 0.2, 0.56, 0.56]
        },
        {
          html: "The <strong>English</strong> menu in the corner switches the sign-in page to Italiano, Suomi, Svenska, Norsk or Deutsch, handy when not everyone in the room reads English.",
          highlight: { box: [0.2737, 0.0695, 0.0489, 0.0408], label: "Language" },
          cursor: { at: [0.2982, 0.0899], click: true },
          zoom: [0, 0, 0.56, 0.56]
        },
        {
          html: "If your workshop has groups, as ours does, they then pick their table under <strong>Select your group</strong>, after the welcome screen and any questions.",
          highlight: { box: [0.4527, 0.2619, 0.0942, 0.2113], label: "Table" },
          cursor: { at: [0.4998, 0.3676], click: true },
          zoom: [0.22, 0.1, 0.56, 0.56]
        },
        {
          html: "Next, the screen asks them to tap <em>the seat letter printed on the card in front of you</em>. So print seat-letter cards and set them out on every table before people arrive.",
          highlight: { box: [0.6833, 0.3157, 0.1852, 0.3589], label: "Seat letters", side: "left" },
          cursor: { at: [0.8329, 0.5044], click: true },
          zoom: [0.44, 0.2, 0.56, 0.56]
        }
      ]
    },
    {
      id: "run-from-phone",
      title: "Run the session from your phone",
      lead: "Your dashboard works on a phone too, handy while you walk between tables. A Live workshop's <strong>&bull;&bull;&bull;</strong> menu has what you need during the session.",
      image: "img/4-08-live-phone.webp",
      frame: "phone",
      url: "coplanai.ikonai.app",
      alt: "Two phone screens of the Your Workshops dashboard: a Live workshop's card with its three-dot button, then its menu open with Go to workshop, Open live gallery, Edit workshop, Guided setup, Duplicate workshop, Share workshop link, Pause workshop and Archive workshop.",
      note: {
        kind: "tip",
        title: "Pause or end?",
        html: "Pause when the workshop should carry on later, for example on a second evening. End it only when it's over: an ended workshop can't be started again."
      },
      beats: [
        {
          html: "Find your workshop's card, with its <strong>Public</strong> and <strong>Live</strong> tags, and tap <strong>&bull;&bull;&bull;</strong>.",
          highlight: { box: [0.4077, 0.5617, 0.0245, 0.049], shape: "circle", label: "More actions", side: "right" },
          cursor: { at: [0.42, 0.586], click: true },
          zoom: [0.1, 0.3, 0.56, 0.56]
        },
        {
          html: "<strong>Open live gallery</strong> shows the pictures as participants make them. <em>After the workshop</em> explains the gallery in full.",
          highlight: { box: [0.6045, 0.2476, 0.1014, 0.0572], label: "Live gallery", side: "left" },
          cursor: { at: [0.6565, 0.275], click: true },
          zoom: [0.4, 0.1, 0.56, 0.56]
        },
        {
          html: "<strong>Share workshop link</strong> brings the QR code back up for anyone who arrives late.",
          highlight: { box: [0.6045, 0.4284, 0.1014, 0.0572], label: "Share link", side: "left" },
          cursor: { at: [0.6625, 0.456], click: true },
          zoom: [0.4, 0.1, 0.56, 0.56]
        },
        {
          html: "<strong>Pause workshop</strong> puts it on hold. Once you confirm, everyone in the workshop is disconnected and can't rejoin until you start it again.",
          highlight: { box: [0.6045, 0.4828, 0.1014, 0.0572], label: "Pause", side: "left" },
          cursor: { at: [0.655, 0.511], click: true },
          zoom: [0.4, 0.1, 0.56, 0.56]
        },
        {
          html: "To carry on, open the same menu: <strong>Start workshop</strong> now sits where Pause was. The card turns <strong>Live</strong> again, and participants can rejoin."
        }
      ]
    },
    {
      id: "scheduling-danger-zone",
      title: "Dates, access and the Danger Zone",
      lead: "In the editor, <strong>Settings</strong> ends with <strong>Schedule &amp; Publishing</strong>: when the workshop is open, who can get in, and how to close it.",
      image: "img/4-09-scheduling.webp",
      url: "coplanai.ikonai.app",
      alt: "The advanced editor's Settings for a Live workshop: Scheduling with Start Date 09/25/2026, an empty End Date and the banner Live — active between scheduled dates (public); Publish Details with Access set to Public; and a Danger Zone with End workshop and Archive Workshop.",
      note: {
        kind: "tip",
        title: "Dates won't pause a Live workshop",
        html: "Moving the <strong>Start Date</strong> of a workshop that is already Live to a later day doesn't take it offline. To close it for a while, pause it from the dashboard."
      },
      beats: [
        {
          html: "Open <strong>Scheduling</strong>. The help beside <strong>Start Date</strong> says a workshop is Live between its start and end dates. <strong>Start workshop</strong> sets the start date to today, replacing any date typed here.",
          highlight: { box: [0.1441, 0.2008, 0.5906, 0.2652], label: "Scheduling" },
          zoom: [0.1, 0.08, 0.66, 0.66]
        },
        {
          html: "Set an <strong>End Date</strong> and participants lose access after that day, while the data stays. You can change the date only while it's still in the future.",
          highlight: { box: [0.4405, 0.3032, 0.2858, 0.0881], label: "End Date" },
          cursor: { at: [0.5174, 0.3638], click: true },
          zoom: [0.3, 0.1, 0.5, 0.5]
        },
        {
          html: "The banner sums up the state, here <strong>Live — active between scheduled dates (public)</strong>.",
          highlight: { box: [0.152, 0.404, 0.5743, 0.047], label: "Status" },
          zoom: [0.1, 0.12, 0.66, 0.66]
        },
        {
          html: "Under <strong>Publish Details</strong>, the <strong>Access</strong> menu shows who can get in. Once a workshop is published, this is where you configure its access.",
          highlight: { box: [0.1523, 0.572, 0.574, 0.1772], label: "Access", side: "above" },
          cursor: { at: [0.712, 0.724], click: true },
          zoom: [0.1, 0.34, 0.66, 0.66]
        },
        {
          html: "<strong>End workshop</strong>, in the <strong>Danger Zone</strong>, closes the workshop for good and disconnects everyone. As its warning says, pause the workshop instead if it should continue later.",
          highlight: { box: [0.152, 0.7932, 0.5743, 0.0895], label: "End workshop" },
          cursor: { at: [0.439, 0.8337], click: true },
          zoom: [0.1, 0.34, 0.66, 0.66]
        }
      ]
    },
    {
      id: "end-workshop",
      title: "End the workshop",
      lead: "Click <strong>End workshop</strong> and CoPlanAI asks you to confirm: everyone in the workshop will be disconnected, and it will no longer be accessible. Once ended, a workshop can't be started again.",
      image: "img/4-10-end-workshop.webp",
      url: "coplanai.ikonai.app",
      alt: "The advanced editor after ending the workshop: a Workshop ended message, Publish Details reading Workshop ended on 2026-09-25, and the preview showing Workshop is closed.",
      note: {
        kind: "info",
        title: "What comes next",
        html: "The report, the gallery, running a workshop again from a copy, and archiving are all in <a href='#after-the-workshop'>After the workshop</a>."
      },
      beats: [
        {
          html: "A <strong>Workshop ended</strong> message confirms that participants have been disconnected.",
          highlight: { box: [0.3955, 0.845, 0.209, 0.109], label: "Workshop ended" },
          zoom: [0.28, 0.55, 0.45, 0.45]
        },
        {
          html: "<strong>Publish Details</strong> now gives the end date. Participants can no longer join, but reports and data remain accessible, and you can still archive or duplicate the workshop.",
          highlight: { box: [0.1524, 0.8032, 0.5096, 0.0245], label: "Ended on" },
          zoom: [0.12, 0.44, 0.56, 0.56]
        },
        {
          html: "The preview on the right now reads <strong>Workshop is closed</strong>: <em>Check back later or contact the workshop organizer.</em>",
          highlight: { box: [0.7941, 0.474, 0.1664, 0.2295], label: "Preview", side: "left" },
          zoom: [0.58, 0.3, 0.42, 0.42]
        },
        {
          html: "Back on your dashboard, the card reads <strong>Ended</strong> and its menu offers <strong>View report</strong>."
        }
      ]
    }
  ]
});
