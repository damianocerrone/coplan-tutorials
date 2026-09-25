/*
 * CoPlanAI platform guide: content (chapter 1, "Getting started").
 *
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box and cursor point was checked by drawing it on the screenshot.
 */
window.COPLAN_TUTORIAL = {
  title: "Platform guide",
  chapters: [
    {
      id: "getting-started",
      title: "Getting started",
      summary: "Sign in, find your way around your dashboard and settings, and start creating and duplicating workshops.",
      steps: [
        {
          id: "sign-in",
          title: "Sign in to CoPlanAI",
          lead: "As an admin or organisation user, you access CoPlanAI at <a href='https://coplanai.ikonai.app/' target='_blank'>coplanai.ikonai.app</a>. Choose the sign-in method that matches your account.",
          image: "img/01-sign-in.webp",
          url: "coplanai.ikonai.app",
          alt: "The CoPlanAI sign-in page: a central card with Continue with Google, Continue with Microsoft, an email field with a Send code button, and a language menu in the top-right corner.",
          note: {
            kind: "warning",
            title: "Blocked by your organisation?",
            html: "CoPlanAI is a subscription service, so even when your organisation has already paid, your Microsoft account may not let you in until your IT department has been told about it. The access-block message usually explains your organisation's procedure: follow it to get IT to approve access. In a rush? If your organisation allows it, sign in with a personal email address instead, and let us know which address you used at <a href='mailto:info@coplanai.com'>info@coplanai.com</a>."
          },
          beats: [
            {
              html: "Go to coplanai.ikonai.app in your browser. The sign-in card gives you three ways in: a Google account, a Microsoft account or a code sent to your email.",
              highlight: { box: [0.3867, 0.2433, 0.2267, 0.5133], label: "Sign-in card" },
              zoom: [0.19, 0.19, 0.62, 0.62]
            },
            {
              html: "Click <strong>Continue with Google</strong> if your organisation uses Google accounts. It signs you in with the account you already use for work.",
              highlight: { box: [0.4042, 0.3992, 0.1917, 0.0583], label: "Google" },
              cursor: { at: [0.53, 0.43], click: true },
              zoom: [0.25, 0.25, 0.5, 0.5]
            },
            {
              html: "Click <strong>Continue with Microsoft</strong> if you work with a Microsoft account. If you see an access block instead, it is usually an IT approval step: see the note below.",
              highlight: { box: [0.4042, 0.46, 0.1917, 0.0592], label: "Microsoft", side: "left below" },
              cursor: { at: [0.5258, 0.4917], click: true },
              zoom: [0.25, 0.25, 0.5, 0.5]
            },
            {
              html: "No Google or Microsoft account? Type your address into <strong>Enter your email</strong> and click <strong>Send code</strong>. You'll receive a code by email to finish signing in.",
              highlight: { box: [0.4042, 0.5825, 0.1917, 0.1233], label: "Email code" },
              cursor: { at: [0.4925, 0.6783], click: true },
              zoom: [0.25, 0.25, 0.5, 0.5]
            },
            {
              html: "Prefer another language? Open the <strong>English</strong> menu in the top-right corner and choose Italiano, Suomi, Svenska, Norsk or Deutsch.",
              highlight: { box: [0.9342, 0.0117, 0.0604, 0.0525], label: "Language" },
              cursor: { at: [0.9508, 0.04], click: true },
              zoom: [0.375, 0, 0.625, 0.625]
            }
          ]
        },
        {
          id: "dashboard",
          title: "Your workshop dashboard",
          lead: "Once you're in, you land on your organisation's workshop dashboard. From here you can create, duplicate and customise your workshops.",
          image: "img/02-dashboard.webp",
          url: "coplanai.ikonai.app",
          alt: "The CoPlanAI home page, headed Choose your experience, with the Your Workshops panel: a Create button, status tabs, sort and filter menus, and a grid of workshop cards.",
          beats: [
            {
              html: "Below <strong>Choose your experience</strong>, where you select a creative flow to get started, sits <strong>Your Workshops</strong>: your organisation's workshops, including those your colleagues created, all in one place.",
              highlight: { box: [0.175, 0.3167, 0.6483, 0.6833], label: "Your Workshops" }
            },
            {
              html: "Each card sums up one workshop at a glance: visibility (<strong>Public</strong>), status (<strong>Live</strong>), participant count, title, description, who created it and when it was last edited.",
              highlight: { box: [0.1913, 0.5042, 0.1979, 0.3942], label: "Workshop card" },
              zoom: [0.02, 0.4083, 0.54, 0.54]
            },
            {
              html: "The three icons in the top-right corner open your organisation's image library, <strong>App Settings</strong> and your profile menu. Each one is explained below.",
              highlight: { box: [0.9142, 0, 0.0729, 0.0458], label: "Library, settings, profile" },
              zoom: [0.375, 0, 0.625, 0.625]
            }
          ]
        },
        {
          id: "profile-menu",
          title: "Your profile, language and theme",
          lead: "Your personal settings sit behind your avatar in the top-right corner: your profile, language and theme, and the option to log out.",
          image: "img/03-profile-menu.webp",
          url: "coplanai.ikonai.app",
          alt: "The home page with the profile menu open under the avatar, showing the user's name and email, Profile, Language set to English, Theme set to Light, and Log out.",
          beats: [
            {
              html: "Click your avatar in the top-right corner. The menu opens with your name and email, so you can check which account you're signed in with.",
              highlight: { box: [0.9633, 0, 0.0217, 0.0433], shape: "circle" },   // no label: beside the avatar it would hide the icons, below it the account email
              cursor: { at: [0.978, 0.031], click: true },
              zoom: [0.58, 0, 0.42, 0.42]
            },
            {
              html: "Choose <strong>Profile</strong> to view your personal details.",
              highlight: { box: [0.8617, 0.105, 0.1217, 0.0342], label: "Profile" },
              cursor: { at: [0.8867, 0.1258], click: true },
              zoom: [0.58, 0, 0.42, 0.42]
            },
            {
              html: "Use the <strong>Language</strong> menu to switch the interface to the language you're most comfortable working in.",
              highlight: { box: [0.8617, 0.15, 0.1217, 0.0475], label: "Language" },
              cursor: { at: [0.9383, 0.1767], click: true },
              zoom: [0.58, 0, 0.42, 0.42]
            },
            {
              html: "Use the <strong>Theme</strong> menu to switch CoPlanAI between a light and a dark look, whichever is easier on your eyes.",
              highlight: { box: [0.8617, 0.2, 0.1217, 0.0475], label: "Theme" },
              cursor: { at: [0.9358, 0.2267], click: true },
              zoom: [0.58, 0, 0.42, 0.42]
            },
            {
              html: "Click <strong>Log out</strong> when you've finished, especially on a shared or borrowed computer at a workshop venue.",
              highlight: { box: [0.8617, 0.2575, 0.1217, 0.0358], label: "Log out" },
              cursor: { at: [0.8883, 0.2783], click: true },
              zoom: [0.58, 0, 0.42, 0.42]
            }
          ]
        },
        {
          id: "app-settings",
          title: "App settings for your organisation",
          lead: "App Settings is where organisation admins set up CoPlanAI for everyone in the organisation. Each card opens one area of settings.",
          image: "img/04-app-settings.webp",
          url: "coplanai.ikonai.app",
          alt: "The App Settings page with five cards (Custom Logo, User management, Manage experiences, Reports and AI Image Customization) and an App country panel set to Not set.",
          beats: [
            {
              html: "Click the gear icon in the top-right corner to open <strong>App Settings</strong>. What you change here applies to your organisation's whole app, not just a single workshop.",
              highlight: { box: [0.9471, 0.0058, 0.0158, 0.0317], shape: "circle", label: "App Settings", side: "below" },
              cursor: { at: [0.9588, 0.030], click: true },
              zoom: [0.58, 0, 0.42, 0.42]
            },
            {
              html: "Open <strong>Custom Logo</strong> to upload your own logo in place of the default Ikon logo, so participants see your organisation's brand across the app.",
              highlight: { box: [0.2483, 0.2725, 0.1671, 0.1875], label: "Custom Logo" },
              cursor: { at: [0.3217, 0.3775], click: true },
              zoom: [0.1021, 0.2033, 0.46, 0.46]
            },
            {
              html: "Open <strong>User management</strong> to invite colleagues and manage their roles, so the right people can help you prepare and run workshops.",
              highlight: { box: [0.4196, 0.2725, 0.1667, 0.1875], label: "User management", side: "above" },
              cursor: { at: [0.4825, 0.3775], click: true },
              zoom: [0.2729, 0.2033, 0.46, 0.46]
            },
            {
              html: "Open <strong>Manage experiences</strong> to create, edit and organise your organisation's experiences in one place.",
              highlight: { box: [0.5908, 0.2725, 0.1671, 0.1875], label: "Manage experiences", side: "right" },
              cursor: { at: [0.65, 0.3775], click: true },
              zoom: [0.4442, 0.2033, 0.46, 0.46]
            },
            {
              html: "Open <strong>Reports</strong> to see usage and engagement across the app, useful when you need to show stakeholders how CoPlanAI is being used.",
              highlight: { box: [0.2483, 0.47, 0.1671, 0.1867], label: "Reports" },
              cursor: { at: [0.3242, 0.5742], click: true },
              zoom: [0.1021, 0.2033, 0.46, 0.46]
            },
            {
              html: "Open <strong>AI Image Customization</strong> to set app-wide defaults for AI-generated images, keeping their look consistent from one workshop to the next.",
              highlight: { box: [0.4196, 0.47, 0.1667, 0.1867], label: "AI images", side: "right" },
              cursor: { at: [0.475, 0.5742], click: true },
              zoom: [0.2729, 0.2033, 0.46, 0.46]
            },
            {
              html: "Set <strong>App country</strong> to where your projects are located. Studio's Focus Area map will then open straight on that country.",
              highlight: { box: [0.2483, 0.67, 0.5096, 0.1658], label: "App country", side: "below" },
              cursor: { at: [0.2783, 0.7892], click: true },
              zoom: [0.2129, 0.42, 0.58, 0.58]
            }
          ]
        },
        {
          id: "library",
          title: "Your organisation's image library",
          lead: "Every image your organisation produces in CoPlanAI is collected in one library, just one click away from your dashboard.",
          image: "img/05-dashboard-library-icon.webp",
          url: "coplanai.ikonai.app",
          alt: "The home page with the small image-gallery icon in the top-right corner, to the left of the gear icon and the avatar.",
          note: {
            kind: "info",
            title: "Give it a moment",
            html: "If your organisation has many images, it can take a couple of minutes to load them all, so give it time before assuming something is missing."
          },
          beats: [
            {
              html: "Click the small image icon in the top-right corner to open your organisation library, handy for finding images from past workshops.",
              highlight: { box: [0.9129, 0.0067, 0.0158, 0.0317], shape: "circle", label: "Library" },
              cursor: { at: [0.9245, 0.030], click: true },
              zoom: [0.5, 0, 0.5, 0.5]
            }
          ]
        },
        {
          id: "find-workshops",
          title: "Filter and sort your workshops",
          lead: "As your list grows, the filter bar above the cards helps you find the right workshop quickly: filter by status or by who created it, and change the order.",
          image: "img/06-filters-ended.webp",
          url: "coplanai.ikonai.app",
          alt: "The Your Workshops panel with the Ended status tab selected, the Newest and Created by all menus, the Show archived toggle switched off, and three ended workshop cards.",
          beats: [
            {
              html: "Use the status tabs to narrow the list. <strong>All</strong> shows everything, <strong>Live</strong> shows workshops running now and <strong>Upcoming</strong> those scheduled to start.",
              highlight: { box: [0.1929, 0.42, 0.3046, 0.0608], label: "Status tabs" },
              zoom: [0.095, 0.22, 0.46, 0.46]
            },
            {
              html: "Click <strong>Ended</strong> to see only finished workshops, handy when you're looking for a past one to reuse.",
              highlight: { box: [0.3125, 0.4242, 0.0454, 0.0525], label: "Ended", side: "above" },
              cursor: { at: [0.33, 0.4533], click: true },
              zoom: [0.095, 0.22, 0.46, 0.46]
            },
            {
              html: "The last three tabs work the same way: <strong>Paused</strong> shows workshops on hold, <strong>Draft</strong> those still being set up, and <strong>Published</strong> your published workshops.",
              highlight: { box: [0.358, 0.4242, 0.1395, 0.0525], label: "More statuses", side: "above" },
              zoom: [0.095, 0.22, 0.46, 0.46]
            },
            {
              html: "Open the <strong>Newest</strong> menu to change the order in which your workshops are listed, so the ones you need are easier to spot.",
              highlight: { box: [0.5579, 0.4258, 0.0725, 0.0492], label: "Sort order", side: "above" },
              cursor: { at: [0.575, 0.4542], click: true },
              zoom: [0.4512, 0.22, 0.46, 0.46]
            },
            {
              html: "<strong>Created by all</strong> shows everyone's workshops. Switch it to see only those created by a specific person, such as yourself or a colleague.",
              highlight: { box: [0.6283, 0.4258, 0.0896, 0.0492], label: "Created by", side: "above" },
              cursor: { at: [0.6525, 0.4542], click: true },
              zoom: [0.4512, 0.22, 0.46, 0.46]
            },
            {
              html: "Turn on <strong>Show archived</strong> to bring archived workshops back into view, and turn it off again to keep your list focused on current work.",
              highlight: { box: [0.7208, 0.4308, 0.0838, 0.0392], label: "Show archived", side: "right below" },
              cursor: { at: [0.7858, 0.4517], click: true },
              zoom: [0.4512, 0.22, 0.46, 0.46]
            }
          ]
        },
        {
          id: "create-duplicate",
          title: "Create or duplicate a workshop",
          lead: "Start a new workshop from scratch, or duplicate one you've already set up and reuse all that preparation with a new group.",
          image: "img/07-workshop-menu.webp",
          url: "coplanai.ikonai.app",
          alt: "The Ended workshops list with the three-dot menu of the first card open: Go to workshop, Open gallery, Edit workshop, Guided setup, Duplicate workshop, Share workshop link, View report and Archive workshop.",
          beats: [
            {
              html: "Click <strong>Create</strong> to start a brand-new workshop from scratch, when there's no earlier workshop you want to build on.",
              highlight: { box: [0.7496, 0.3492, 0.055, 0.0483], label: "Create" },
              cursor: { at: [0.7775, 0.3758], click: true },
              zoom: [0.54, 0.1433, 0.46, 0.46]
            },
            {
              html: "To reuse a workshop instead, click the <strong>&bull;&bull;&bull;</strong> button on its card.",
              highlight: { box: [0.36, 0.795, 0.0167, 0.02], label: "More actions" },
              cursor: { at: [0.3683, 0.8058], click: true },
              zoom: [0.1092, 0.4383, 0.44, 0.44]
            },
            {
              html: "The menu gathers everything you can do with that workshop: <strong>Go to workshop</strong>, <strong>Open gallery</strong>, <strong>Edit workshop</strong> to customise it, <strong>Guided setup</strong>, <strong>Share workshop link</strong>, <strong>View report</strong> and more.",
              highlight: { box: [0.2787, 0.5058, 0.1008, 0.2983], label: "Workshop menu" },
              zoom: [0.1092, 0.4383, 0.44, 0.44]
            },
            {
              html: "Click <strong>Duplicate workshop</strong>. The copy keeps all the settings, starting images and AI customisation, but starts blank: none of the participants' content is carried over.",
              highlight: { box: [0.2858, 0.6533, 0.0875, 0.0283], label: "Duplicate" },
              cursor: { at: [0.3092, 0.67], click: true },
              zoom: [0.1092, 0.4383, 0.44, 0.44]
            },
            {
              html: "<strong>Archive workshop</strong> removes a workshop you no longer need from your list. It isn't lost: turn on <strong>Show archived</strong> to see it again.",
              highlight: { box: [0.2858, 0.7642, 0.0875, 0.0275], label: "Archive" },
              cursor: { at: [0.3083, 0.78], click: false },
              zoom: [0.1092, 0.4383, 0.44, 0.44]
            }
          ]
        }
      ]
    }
  ]
};
