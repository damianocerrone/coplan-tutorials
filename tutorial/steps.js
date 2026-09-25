/*
 * CoPlanAI platform guide: content (chapter 1 "Getting started", chapter 2 "Create a workshop").
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
    },
    {
      id: "create-workshop",
      title: "Create a *workshop*",
      summary: "Walk through the guided workshop setup, from what you are asking for to a workshop ready to run, and see why each choice matters.",
      steps: [
        {
          id: "setup-type",
          title: "Choose what you are asking for",
          lead: "Click <strong>Create</strong> on your dashboard to open <strong>Workshop setup</strong>: eight short steps, with a preview of what participants see on the right. The first choice matters most, because the rest of the setup is drafted from it.",
          image: "img/2-01-setup-type.webp",
          url: "coplanai.ikonai.app",
          alt: "Step 1 of the Workshop setup, What you are asking for: four engagement cards (Scenario planning, Futuring, Design review, Co-design) with Futuring selected, a summary of what the choice sets up, the list of steps on the left and a phone sketch on the right.",
          note: {
            kind: "tip",
            title: "Prefer to set everything by hand?",
            html: "<strong>Use advanced editor</strong>, in the top-right corner of every setup screen, switches to the full editor at any time."
          },
          beats: [
            {
              html: "The list on the left tracks your progress through the setup steps. Each one unlocks as you reach it, and the three optional steps below unlock at the end.",
              highlight: { box: [0.0012, 0.112, 0.1655, 0.5243], label: "Setup steps" },
              zoom: [0, 0.06, 0.6, 0.6]
            },
            {
              html: "Choose <strong>Scenario planning</strong> when you already have options to put to people. Participants are asked: &ldquo;Tell us what this would mean where you live.&rdquo;",
              highlight: { box: [0.1786, 0.2382, 0.1841, 0.1378], label: "Scenario planning", side: "above" },
              cursor: { at: [0.346, 0.282], click: false },
              zoom: [0.16, 0.13, 0.6, 0.6]
            },
            {
              html: "Choose <strong>Futuring</strong> when there's nothing yet and you want ideas about what a place could become. We picked it for this guide's example: the future of Senate Square in Helsinki.",
              highlight: { box: [0.364, 0.2382, 0.1841, 0.1378], label: "Futuring", side: "above" },
              cursor: { at: [0.5315, 0.282], click: true },
              zoom: [0.16, 0.13, 0.6, 0.6]
            },
            {
              html: "Choose <strong>Design review</strong> when you have a design to improve before it is final. Participants work from a curated gallery and are asked what works and what doesn't.",
              highlight: { box: [0.5495, 0.2382, 0.1841, 0.1378], label: "Design review", side: "above" },
              cursor: { at: [0.7165, 0.282], click: false },
              zoom: [0.16, 0.13, 0.6, 0.6]
            },
            {
              html: "Choose <strong>Co-design</strong> when you know what you'll build but not yet how it looks. Participants are asked: &ldquo;Show us how you would design it.&rdquo;",
              highlight: { box: [0.1786, 0.3787, 0.1841, 0.1173], label: "Co-design", side: "right" },
              cursor: { at: [0.346, 0.423], click: false },
              zoom: [0.16, 0.13, 0.6, 0.6]
            },
            {
              html: "<strong>What this choice sets up for you</strong> lists the question participants are asked, how they change the picture, where the pictures come from, the questionnaire and the closing question. You can change it all later.",
              highlight: { box: [0.1786, 0.5073, 0.555, 0.2137], label: "What it sets up" },
              zoom: [0.16, 0.13, 0.6, 0.6]
            },
            {
              html: "Your choice even renames step 4. With Futuring it becomes <strong>Time horizon</strong>; Scenario planning turns it into <strong>The what-ifs</strong>, and the other two into <strong>Theme</strong>.",
              highlight: { box: [0.0012, 0.2611, 0.1655, 0.0491], label: "Step 4" },
              zoom: [0, 0.05, 0.46, 0.46]
            }
          ]
        },
        {
          id: "setup-extent",
          title: "Set how much it covers",
          lead: "Step 2 sets the scale of the workshop: how much ground it covers, from a single corner to the whole city.",
          image: "img/2-02-setup-extent.webp",
          url: "coplanai.ikonai.app",
          alt: "Step 2 of the Workshop setup, How much it covers: a grid of place types with A square selected, a Write your own field at the bottom, and a phone preview reading What this square could be.",
          note: {
            kind: "info",
            title: "Come back to it later",
            html: "You don't have to finish in one go. Leave the setup whenever you like and pick it up again with <strong>Guided setup</strong> in the workshop's <strong>&bull;&bull;&bull;</strong> menu on your dashboard."
          },
          beats: [
            {
              html: "After step 1 your draft saves itself. The header now shows a working name, such as <strong>My workshop 30</strong>; you'll give it a proper name in the last step.",
              highlight: { box: [0.0317, 0.0110, 0.0729, 0.0390], label: "Draft name" },
              zoom: [0, 0, 0.42, 0.42]
            },
            {
              html: "Pick the kind of place: it sets the phone's opening words and the themes offered in step 4. We picked <strong>A square</strong>: one public space, with an edge to it.",
              highlight: { box: [0.1786, 0.3235, 0.1841, 0.1331], label: "A square" },
              cursor: { at: [0.346, 0.365], click: true },
              zoom: [0.12, 0.17, 0.5, 0.5]
            },
            {
              html: "The preview on the right now shows your real workshop as last saved, at real size on a <strong>Phone</strong>, <strong>Tablet</strong> or <strong>Desktop</strong>. Here the phone opens on <strong>What this square could be</strong>.",
              highlight: { box: [0.7464, 0.1164, 0.2532, 0.8766], label: "Live preview", side: "left" }
            },
            {
              html: "Nothing fits? Scroll down to <strong>Write your own</strong> and describe your topic and aim in one line. That line becomes the task on the phone.",
              highlight: { box: [0.1786, 0.8548, 0.555, 0.081], label: "Write your own" },
              zoom: [0.16, 0.4, 0.6, 0.6]
            }
          ]
        },
        {
          id: "setup-place",
          title: "Say where it is",
          lead: "Step 3 tells the AI where the place is, and how far its pictures may stray from it.",
          image: "img/2-03-setup-place.webp",
          url: "coplanai.ikonai.app",
          alt: "Step 3 of the Workshop setup, Where it is: Country set to Finland, City Helsinki, Area or street Senate Square, Season As in the pictures, an empty notes field, and the AI creativity scale set to Balanced.",
          beats: [
            {
              html: "Describe your place: <strong>Country</strong>, <strong>City</strong>, <strong>Area or street</strong> and <strong>Season</strong>. Every field is optional, but naming the place tells the AI where this is. We entered Senate Square, Helsinki, Finland.",
              highlight: { box: [0.187, 0.2140, 0.5382, 0.2005], label: "Your place" },
              cursor: { at: [0.235, 0.395], click: true },
              zoom: [0.15, 0.17, 0.6, 0.6]
            },
            {
              html: "Use <strong>Anything else the model should know</strong> for context the pictures alone can't give, such as a historic centre or a school opposite.",
              highlight: { box: [0.187, 0.4275, 0.5382, 0.0722], label: "Extra context" },
              zoom: [0.15, 0.2, 0.6, 0.6]
            },
            {
              html: "<strong>AI creativity</strong> is required. It trades faithfulness for imagination: with <strong>Fully localised</strong> the pictures could be photographs of this place; <strong>Fully creative</strong> may imagine a place that has never existed.",
              highlight: { box: [0.1786, 0.525, 0.555, 0.186], label: "AI creativity" },
              zoom: [0.15, 0.2, 0.6, 0.6]
            },
            {
              html: "We chose <strong>Balanced</strong>: the shape of the place stays, with its widths, building lines and levels, and everything on top of them is open to new ideas.",
              highlight: { box: [0.4016, 0.6098, 0.1091, 0.052], label: "Balanced" },
              cursor: { at: [0.458, 0.639], click: true },
              zoom: [0.24, 0.38, 0.44, 0.44]
            }
          ]
        },
        {
          id: "setup-horizon",
          title: "Pick a time horizon and themes",
          lead: "With Futuring, step 4 is <strong>Time horizon</strong>: how far ahead participants imagine, what the phone opens with, and which ready-made themes they can use.",
          image: "img/2-04-setup-horizon.webp",
          url: "coplanai.ikonai.app",
          alt: "Step 4 of the Workshop setup, Time horizon: 2040 The next plan selected, a row of tappable things in the picture, the Urban design themes switch turned on, and theme cards with Urban forest selected.",
          beats: [
            {
              html: "Pick how far ahead this looks, from <strong>Next summer</strong> to a century out. We picked <strong>2040 &middot; The next plan</strong>, the master-plan horizon where land use can move.",
              highlight: { box: [0.4016, 0.2219, 0.1091, 0.0731], label: "Horizon" },
              cursor: { at: [0.456, 0.262], click: true },
              zoom: [0.15, 0.03, 0.6, 0.6]
            },
            {
              html: "<strong>The phone opens with the things in the picture</strong>: participants tap one, such as the fountain or the benches, and finish the sentence in their own words.",
              highlight: { box: [0.1786, 0.3565, 0.555, 0.1303], label: "Opening taps" },
              zoom: [0.15, 0.1, 0.6, 0.6]
            },
            {
              html: "Turn on <strong>Urban design themes</strong> to also offer recognised themes with ready-made changes to tap. Leave it off and people start from their own ideas.",
              highlight: { box: [0.1786, 0.498, 0.555, 0.094], label: "Themes switch" },
              cursor: { at: [0.7126, 0.5316], click: true },
              zoom: [0.15, 0.25, 0.6, 0.6]
            },
            {
              html: "Choose from the 15 ready-made themes for a square or plaza. Here <strong>Urban forest</strong> is selected: shade and shelter first, then seating.",
              highlight: { box: [0.1786, 0.7993, 0.1841, 0.1352], label: "Urban forest" },
              cursor: { at: [0.346, 0.852], click: true },
              zoom: [0.1, 0.45, 0.55, 0.55]
            },
            {
              html: "Every theme can be edited: click the pencil on its card to see and change what's behind it. Editing a theme also picks it: we opened <strong>Placemaking</strong>, and it became this workshop's theme.",
              highlight: { box: [0.3155, 0.6958, 0.0189, 0.0379], shape: "circle", label: "Edit theme", side: "above" },
              cursor: { at: [0.3275, 0.7215], click: true },
              zoom: [0.1, 0.45, 0.55, 0.55]
            }
          ]
        },
        {
          id: "setup-theme-editor",
          title: "Make a theme your own",
          lead: "A theme is what participants are asked to imagine. <strong>Edit theme</strong> shows everything behind it, and whatever you change applies to this workshop only.",
          image: "img/2-05-setup-theme-editor.webp",
          url: "coplanai.ikonai.app",
          alt: "The Edit theme panel for Placemaking: fields for what it is called, what it is about, what it holds the engagement to, renders well and renders badly, the buttons participants tap with their prompts, and Reset to shipped and Done buttons.",
          beats: [
            {
              html: "<strong>What it is called</strong> appears on the theme card and in the participant's phone header. <strong>What it is about</strong> is the two lines the card reads.",
              highlight: { box: [0.0075, 0.1887, 0.3318, 0.2163], label: "Name and summary" },
              zoom: [0, 0.1, 0.5, 0.5]
            },
            {
              html: "<strong>What it holds the engagement to</strong> is what a good answer must do. <strong>Renders well</strong> and <strong>Renders badly</strong> say candidly what the AI pictures convincingly, and what it doesn't.",
              highlight: { box: [0.0075, 0.4112, 0.3318, 0.2758], label: "What answers need" },
              zoom: [0, 0.28, 0.5, 0.5]
            },
            {
              html: "<strong>The buttons participants tap</strong>: each has a label they read and a prompt the model is told. Rewrite, reorder, add or remove them to fit your brief.",
              highlight: { box: [0.0075, 0.693, 0.3318, 0.1767], label: "Buttons" },
              zoom: [0, 0.5, 0.5, 0.5]
            },
            {
              html: "<strong>Reset to shipped</strong> brings back the original theme. Click <strong>Done</strong> to keep your changes and return to the setup.",
              highlight: { box: [0.0075, 0.9372, 0.3318, 0.0541], label: "Reset or done" },
              cursor: { at: [0.3179, 0.9665], click: true },
              zoom: [0, 0.5, 0.5, 0.5]
            }
          ]
        },
        {
          id: "setup-who",
          title: "Decide who takes part",
          lead: "Step 5 covers who you are asking, how many of them, and how the engagement is actually run.",
          image: "img/2-06-setup-who.webp",
          url: "coplanai.ikonai.app",
          alt: "Step 5 of the Workshop setup, Who takes part: Students and People who live here selected as audiences, 15 to 40 people selected, and six session modes with In a room, in groups suggested and selected; the phone preview shows Table A, B and C.",
          beats: [
            {
              html: "Under <strong>Who are you asking?</strong>, pick every audience that applies. We chose <strong>Students</strong> and <strong>People who live here</strong>.",
              highlight: { box: [0.1781, 0.2319, 0.4581, 0.0962], label: "Audiences" },
              cursor: { at: [0.35, 0.304], click: true },
              zoom: [0.15, 0.1, 0.6, 0.6]
            },
            {
              html: "Missing a group? Type its name, not a sentence, such as &ldquo;Allotment holders&rdquo;, and click <strong>Add</strong>.",
              highlight: { box: [0.1781, 0.3372, 0.5561, 0.0541], label: "Your own group" },
              cursor: { at: [0.7165, 0.3645], click: true },
              zoom: [0.15, 0.1, 0.6, 0.6]
            },
            {
              html: "<strong>How many people?</strong> shapes how the engagement is run, and CoPlanAI suggests a session mode to match. We picked <strong>15&ndash;40</strong>, a room in groups of four.",
              highlight: { box: [0.1786, 0.4030, 0.555, 0.2404], label: "Group size" },
              cursor: { at: [0.5315, 0.476], click: true },
              zoom: [0.15, 0.3, 0.6, 0.6]
            },
            {
              html: "<strong>Where are they?</strong> offers six formats: in person, online or both at once. For 15&ndash;40 people, <strong>In a room, in groups</strong> is suggested: about eight tables of four, which CoPlanAI sets up for you.",
              highlight: { box: [0.1786, 0.694, 0.1841, 0.1652], label: "Suggested mode" },
              cursor: { at: [0.346, 0.751], click: true },
              zoom: [0.12, 0.45, 0.55, 0.55]
            },
            {
              html: "The preview already shows the tables: participants pick their group under <strong>Select your group</strong>, <strong>Table A</strong>, <strong>Table B</strong> and so on.",
              highlight: { box: [0.7464, 0.1164, 0.2532, 0.8766], label: "Tables", side: "left" }
            }
          ]
        },
        {
          id: "setup-tools",
          title: "Choose how people change the picture",
          lead: "Step 6 decides how participants change the picture. Turn on as many ways as apply; each one has its own settings.",
          image: "img/2-07-setup-tools.webp",
          url: "coplanai.ikonai.app",
          alt: "Step 6 of the Workshop setup, How people change the picture: the ready-made changes from the theme, Drawing switched on with six coloured pens and their instructions, and Prompting switched on.",
          beats: [
            {
              html: "With <strong>Tapping a ready-made change</strong>, one tap applies a prepared change. The buttons come from the theme, here Placemaking; <strong>Change theme</strong> lets you swap it.",
              highlight: { box: [0.1781, 0.0656, 0.5561, 0.1609], label: "Ready-made changes" },
              cursor: { at: [0.688, 0.109], click: false },
              zoom: [0.15, 0, 0.6, 0.6]
            },
            {
              html: "<strong>Drawing</strong>, marked Suggested, lets people draw on the picture with coloured pens. Each colour is an action the model understands.",
              highlight: { box: [0.1786, 0.236, 0.555, 0.095], label: "Drawing" },
              cursor: { at: [0.7126, 0.2701], click: false },
              zoom: [0.15, 0, 0.6, 0.6]
            },
            {
              html: "<strong>What the colours do</strong>: Green adds greenery, Blue water, Orange places to stay, Yellow light and shelter, Grey changes the surface and Red takes something away.",
              highlight: { box: [0.187, 0.3640, 0.5381, 0.3541], label: "Coloured pens" },
              zoom: [0.15, 0.27, 0.6, 0.6]
            },
            {
              html: "Every pen can be changed: its colour, its name and its words. Click <strong>Add a colour</strong> for a new one, or remove the pens you don't need.",
              highlight: { box: [0.187, 0.7272, 0.084, 0.0499], label: "Add a colour" },
              cursor: { at: [0.236, 0.753], click: true },
              zoom: [0.15, 0.4, 0.6, 0.6]
            },
            {
              html: "<strong>Prompting</strong> lets people describe a change in their own words and the model draws it. How far it may stray is the AI creativity you set in step 3.",
              highlight: { box: [0.1786, 0.804, 0.555, 0.095], label: "Prompting" },
              cursor: { at: [0.7126, 0.8385], click: false },
              zoom: [0.15, 0.4, 0.6, 0.6]
            }
          ]
        },
        {
          id: "setup-images",
          title: "Choose where images come from",
          lead: "Step 7 decides where each participant's starting picture comes from. Turn on as many sources as you like: participants choose between them.",
          image: "img/2-08-setup-images.webp",
          url: "coplanai.ikonai.app",
          alt: "Step 7 of the Workshop setup, Where images come from: own photos off, the gallery and the street-view map on, and a list of image libraries with Helsinki photos (4) selected; the phone preview asks which picture to change, From the library or From street view.",
          beats: [
            {
              html: "<strong>They take or upload their own photos</strong>: their own street, their own camera. Nothing to prepare, but no control over what arrives.",
              highlight: { box: [0.1786, 0.2329, 0.555, 0.1125], label: "Own photos" },
              zoom: [0.15, 0.12, 0.6, 0.6]
            },
            {
              html: "<strong>They pick the spot on a street-view map</strong>: participants drop a pin and the street photo there becomes their picture. The map opens on the place you named in step 3.",
              highlight: { box: [0.1786, 0.4635, 0.555, 0.1125], label: "Street-view map" },
              cursor: { at: [0.7165, 0.505], click: false },
              zoom: [0.15, 0.12, 0.6, 0.6]
            },
            {
              html: "<strong>We upload a gallery of images</strong>: you vet every picture, but the gallery has to exist before the day.",
              highlight: { box: [0.1786, 0.3482, 0.555, 0.1125], label: "Gallery" },
              cursor: { at: [0.7165, 0.39], click: false },
              zoom: [0.15, 0.12, 0.6, 0.6]
            },
            {
              html: "Then pick the image libraries to offer, here <strong>Helsinki photos (4)</strong>. Everybody is offered these pictures and nothing else.",
              highlight: { box: [0.19, 0.6966, 0.0964, 0.0499], label: "Library" },
              cursor: { at: [0.24, 0.722], click: true },
              zoom: [0.10, 0.48, 0.48, 0.48]
            },
            {
              html: "No suitable library yet? <strong>New library &mdash; pick or upload pictures</strong> creates one.",
              highlight: { box: [0.187, 0.7893, 0.1789, 0.0499], label: "New library" },
              cursor: { at: [0.28, 0.815], click: true },
              zoom: [0.10, 0.48, 0.48, 0.48]
            },
            {
              html: "The preview shows the choice this gives participants. Under <strong>Which picture do you want to change?</strong> they tap <strong>From the library</strong> or <strong>From street view</strong>.",
              highlight: { box: [0.7464, 0.1164, 0.2532, 0.8766], label: "Participant's choice", side: "left" }
            }
          ]
        },
        {
          id: "setup-ready",
          title: "Name and check your workshop",
          lead: "Step 8, <strong>Ready to run</strong>, is the last check before your workshop is set up.",
          image: "img/2-09-setup-ready.webp",
          url: "coplanai.ikonai.app",
          alt: "Step 8 of the Workshop setup, Ready to run: the workshop name Senate Square 2040 (tutorial demo), a checklist with every step marked Done, and a button to accept one waiting suggestion.",
          beats: [
            {
              html: "Give your workshop a clear name under <strong>Workshop name</strong>. It replaces the working name in the header: here, <strong>Senate Square 2040 (tutorial demo)</strong>.",
              highlight: { box: [0.187, 0.19, 0.5382, 0.0797], label: "Workshop name" },
              cursor: { at: [0.34, 0.243], click: true },
              zoom: [0.15, 0.05, 0.6, 0.6]
            },
            {
              html: "The checklist shows each step as <strong>Done</strong>. Click a row to jump back to that step and change it.",
              highlight: { box: [0.1828, 0.3198, 0.5466, 0.3490], label: "Checklist" },
              cursor: { at: [0.249, 0.472], click: true },
              zoom: [0.15, 0.2, 0.6, 0.6]
            },
            {
              html: "Click <strong>Accept the 1 suggestion(s) waiting on you</strong>. Until you give the setup's suggestions your OK, <strong>Next</strong> stays greyed out.",
              highlight: { box: [0.187, 0.6724, 0.1829, 0.0499], label: "Accept" },
              cursor: { at: [0.279, 0.7], click: true },
              zoom: [0.17, 0.42, 0.58, 0.58]
            }
          ]
        },
        {
          id: "setup-questionnaire",
          title: "Optional: a questionnaire",
          lead: "At Ready to run, three optional steps unlock in the list on the left. The first, <strong>Questionnaire</strong>, decides whether participants are asked anything about themselves.",
          image: "img/2-10-setup-questionnaire.webp",
          url: "coplanai.ikonai.app",
          alt: "The optional Questionnaire step: Ask a questionnaire switched on, and seven question sets with Demographics and Intent and stake ticked, plus a Create your own set card.",
          beats: [
            {
              html: "<strong>Ask a questionnaire</strong> is on. Switch it off and the pictures stand on their own, but nothing can be cross-cut by who answered.",
              highlight: { box: [0.1786, 0.174, 0.555, 0.094], label: "Questionnaire" },
              cursor: { at: [0.7126, 0.2074], click: false },
              zoom: [0.15, 0.02, 0.6, 0.6]
            },
            {
              html: "Tick any of the seven question sets; your engagement type pre-ticks some. <strong>Demographics</strong> shows who actually turned up, so the report can say who is missing.",
              highlight: { box: [0.1786, 0.3377, 0.3695, 0.1978], label: "Question sets" },
              cursor: { at: [0.346, 0.3995], click: true },
              zoom: [0.12, 0.2, 0.55, 0.55]
            },
            {
              html: "Click a pencil to edit a set's questions, or <strong>Create your own set</strong>. Your changes apply to this workshop only.",
              highlight: { box: [0.3635, 0.7124, 0.1851, 0.1573], label: "Your own set", side: "right" },
              cursor: { at: [0.4555, 0.779], click: true },
              zoom: [0.15, 0.4, 0.6, 0.6]
            }
          ]
        },
        {
          id: "setup-policy-lens",
          title: "Optional: a policy lens",
          lead: "The second optional step holds the pictures to a published policy, when your engagement has to answer to one.",
          image: "img/2-11-setup-policy-lens.webp",
          url: "coplanai.ikonai.app",
          alt: "The optional Policy lens step: No policy lens selected, and nine published policies to choose from, such as New European Bauhaus, the New Leipzig Charter and the Nature Restoration Regulation.",
          beats: [
            {
              html: "<strong>Policy lens</strong> adds the principles of one published policy to what the model is told, and the report then cites it. Pick one at a time, or none.",
              highlight: { box: [0.1786, 0.2329, 0.555, 0.6447], label: "Policies" }
            },
            {
              html: "With <strong>No policy lens</strong>, the theme alone decides the pictures. Pick a policy, such as <strong>New European Bauhaus</strong>, when your brief is tied to it.",
              highlight: { box: [0.1786, 0.2329, 0.3695, 0.1378], label: "None or one" },
              cursor: { at: [0.5315, 0.285], click: false },
              zoom: [0.14, 0.05, 0.5, 0.5]
            }
          ]
        },
        {
          id: "setup-ai-customisation",
          title: "Optional: AI customisation",
          lead: "The last optional step is for what your organisation requires of an AI-assisted process, in your own words.",
          image: "img/2-12-setup-ai-customisation.webp",
          url: "coplanai.ikonai.app",
          alt: "The optional AI customisation step: the Core Vision and Theme block with Macro-Theme, Primary Objective and Aesthetic Style fields, and The Hardscape block below it, with a Done, back to overview button.",
          note: {
            kind: "warning",
            title: "A ban is a strong preference, not a guarantee",
            html: "The last block, <strong>AI Guardrails</strong>, lists what the AI must never draw. It pushes the model away from those things but cannot forbid them: a banned element still turns up sometimes, so check the results rather than trusting the ban."
          },
          beats: [
            {
              html: "The theme already configures the model. Everything here is added on top, so use it only for what this engagement must have or must never show.",
              highlight: { box: [0.1782, 0.1757, 0.5048, 0.0262], label: "Added on top" },
              zoom: [0.15, 0, 0.6, 0.6]
            },
            {
              html: "<strong>Core Vision &amp; Theme</strong> is read first and applied to everything after it, so it changes the results most. Start here: a macro-theme, an objective, a style.",
              highlight: { box: [0.1786, 0.212, 0.555, 0.379], label: "Core vision" },
              zoom: [0.15, 0.1, 0.6, 0.6]
            },
            {
              html: "Further blocks bias what is built (<strong>The Hardscape</strong>), what grows (<strong>The Softscape</strong>), who is in the picture (<strong>Social Dynamics</strong>) and what local rules allow (<strong>Local Policy</strong>).",
              highlight: { box: [0.1786, 0.604, 0.555, 0.3305], label: "More blocks" },
              zoom: [0.15, 0.4, 0.6, 0.6]
            },
            {
              html: "Click <strong>Done &mdash; back to overview</strong> when you're finished.",
              highlight: { box: [0.6079, 0.9435, 0.1304, 0.0499], label: "Done" },
              cursor: { at: [0.675, 0.971], click: true },
              zoom: [0.325, 0.55, 0.45, 0.45]
            }
          ]
        },
        {
          id: "setup-done",
          title: "Your workshop is set up",
          lead: "Once you've accepted the suggestion, <strong>Ready to run</strong> confirms the setup is complete. Open it from the list on the left whenever you return.",
          image: "img/2-13-setup-done.webp",
          url: "coplanai.ikonai.app",
          alt: "Ready to run after accepting the suggestion: the checklist reads Everything is set, and a Your workshop is set up panel offers Try it as a participant and Publish, with Fine-tune in the advanced editor below.",
          beats: [
            {
              html: "The checklist now reads <strong>Everything is set</strong>, and <strong>Your workshop is set up</strong> shows the closing question, which comes from the theme: here, &ldquo;What would make you stay an hour?&rdquo;",
              highlight: { box: [0.1786, 0.704, 0.555, 0.152], label: "Set up" },
              zoom: [0.15, 0.28, 0.6, 0.6]
            },
            {
              html: "Click <strong>Try it as a participant</strong> to go through the workshop exactly as your participants will.",
              highlight: { box: [0.187, 0.7887, 0.1144, 0.0499], label: "Try it", side: "left below" },
              cursor: { at: [0.25, 0.815], click: true },
              zoom: [0.12, 0.5, 0.46, 0.46]
            },
            {
              html: "Click <strong>Publish</strong> when you're ready for participants to join.",
              highlight: { box: [0.2997, 0.7887, 0.0593, 0.0499], label: "Publish", side: "right" },
              cursor: { at: [0.333, 0.815], click: true },
              zoom: [0.12, 0.5, 0.46, 0.46]
            },
            {
              html: "Need a detail the guided setup doesn't cover? <strong>Fine-tune in the advanced editor</strong> opens the full editor.",
              highlight: { box: [0.1781, 0.8656, 0.1596, 0.0499], label: "Advanced editor" },
              cursor: { at: [0.264, 0.891], click: true },
              zoom: [0.12, 0.5, 0.46, 0.46]
            }
          ]
        }
      ]
    }
  ]
};
