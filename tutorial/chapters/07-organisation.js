/* CoPlanAI platform guide: Chapter 7: For organisation admins. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box and cursor point was checked by drawing it on the screenshot.
 * img/7-04-people.webp: the names and email addresses of other people are blurred.
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "organisation-settings",
  title: "For organisation *admins*",
  summary: "Brand CoPlanAI, decide who has access, choose the AI tools and the defaults every workshop starts from, and follow how your organisation uses the platform.",
  steps: [
    {
      id: "org-custom-logo",
      title: "Put your logo on CoPlanAI",
      lead: "Most of this chapter starts from <strong>App Settings</strong>, behind the gear icon in the top-right corner (see <a href='#app-settings'>App settings for your organisation</a>). First, <strong>Custom Logo</strong> puts your organisation's brand on the app.",
      image: "img/7-01-custom-logo.webp",
      url: "coplanai.ikonai.app",
      alt: "The Custom Logo page: a Custom logo upload area for PNG, JPEG, WebP or SVG files up to 5 MB, a Browse existing images button, and a Favicon upload area for PNG, WebP or SVG files up to 1 MB.",
      note: {
        kind: "tip",
        title: "Finding your way back",
        html: "The pages behind App Settings have no back button. To return to the cards, click the gear icon again, or use your browser's Back button."
      },
      beats: [
        {
          html: "Drop your logo onto the <strong>CUSTOM LOGO</strong> area, or click it to choose a file: PNG, JPEG, WebP or SVG, up to 5 MB. It replaces the default logo across the app.",
          highlight: { box: [0.2444, 0.272, 0.5113, 0.181], label: "Your logo" },
          cursor: { at: [0.5, 0.383], click: true },
          zoom: [0.22, 0.15, 0.56, 0.56]
        },
        {
          html: "Is your logo already among the pictures in CoPlanAI? <strong>Browse existing images</strong> lets you pick it from there instead of uploading it again.",
          highlight: { box: [0.2444, 0.4535, 0.1226, 0.0499], label: "Browse" },
          cursor: { at: [0.31, 0.479], click: true },
          zoom: [0.15, 0.25, 0.46, 0.46]
        },
        {
          html: "Add a <strong>FAVICON</strong> too: the small icon in the browser tab while the app is open. Use PNG, WebP or SVG, up to 1 MB; square images work best.",
          highlight: { box: [0.2444, 0.508, 0.5113, 0.213], label: "Favicon", side: "below" },
          cursor: { at: [0.5, 0.652], click: true },
          zoom: [0.22, 0.35, 0.56, 0.56]
        }
      ]
    },
    {
      id: "org-user-management",
      title: "See who uses your app",
      lead: "<strong>User management</strong> lists everyone in your organisation's CoPlanAI app, from the colleagues who build workshops to the people who took part in them.",
      image: "img/7-02-user-management.webp",
      url: "coplanai.ikonai.app",
      alt: "The User management page: an Add user button, a Filters panel with Search, Role, Status and Workshop, and three collapsed groups: Editors 10, Participants 249 and Workshop participants 146.",
      beats: [
        {
          html: "People are sorted into <strong>EDITORS</strong>, <strong>PARTICIPANTS</strong> and <strong>WORKSHOP PARTICIPANTS</strong>, each with a count. Workshop participants joined through a workshop's link. Click a group to open it.",
          highlight: { box: [0.2445, 0.4985, 0.5115, 0.3285], label: "Three groups", side: "below" },
          cursor: { at: [0.278, 0.55], click: true },
          zoom: [0.2, 0.34, 0.6, 0.6]
        },
        {
          html: "Looking for someone in particular? Type part of their name or email address into <strong>Search</strong>.",
          highlight: { box: [0.2605, 0.4195, 0.115, 0.0405], label: "Search", side: "below" },
          cursor: { at: [0.29, 0.44], click: true },
          zoom: [0.22, 0.16, 0.56, 0.56]
        },
        {
          html: "<strong>Role</strong> narrows the list to one role, such as <strong>App admin</strong> or <strong>Editor</strong>. <strong>Status</strong> shows <strong>Active</strong> members, or the people you have <strong>Removed</strong>.",
          highlight: { box: [0.3818, 0.4221, 0.2364, 0.0379], label: "Role and status", side: "below" },
          cursor: { at: [0.43, 0.442], click: true },
          zoom: [0.22, 0.16, 0.56, 0.56]
        },
        {
          html: "Pick a workshop under <strong>Workshop</strong> to list only the people who took part in it: the quickest way to check who actually joined a session.",
          highlight: { box: [0.6245, 0.4221, 0.115, 0.0379], label: "Workshop", side: "below" },
          cursor: { at: [0.68, 0.442], click: true },
          zoom: [0.22, 0.16, 0.56, 0.56]
        }
      ]
    },
    {
      id: "org-add-user",
      title: "Invite a colleague",
      lead: "Bring in the colleagues who will prepare and run workshops with you. All it takes is their email address and a role.",
      image: "img/7-03-add-user.webp",
      url: "coplanai.ikonai.app",
      alt: "User management with the Add user panel open above the filters: an Email field, the Role menu open on App admin, Editor, Participant and Workshop Participant with Editor ticked, a greyed-out Add button, and a Cancel button above the panel.",
      note: {
        kind: "info",
        title: "Not sure which role to give?",
        html: "The app doesn't explain what each role can do. If you're unsure, write to us at <a href='mailto:info@coplanai.com'>info@coplanai.com</a> before inviting someone."
      },
      beats: [
        {
          html: "Click <strong>Add user</strong>: the <strong>ADD USER</strong> panel opens above the filters, and the button turns into <strong>Cancel</strong>, which closes the panel again.",
          highlight: { box: [0.2415, 0.2735, 0.5095, 0.187], label: "Add user" },
          cursor: { at: [0.7225, 0.298], click: false },
          zoom: [0.2, 0.15, 0.6, 0.6]
        },
        {
          html: "Type your colleague's address under <strong>Email</strong>.",
          highlight: { box: [0.2566, 0.4189, 0.321, 0.0421], label: "Email", side: "below" },
          cursor: { at: [0.33, 0.44], click: true },
          zoom: [0.2, 0.15, 0.6, 0.6]
        },
        {
          html: "Choose their <strong>Role</strong>: <strong>App admin</strong>, <strong>Editor</strong>, <strong>Participant</strong> or <strong>Workshop Participant</strong>. It starts on <strong>Editor</strong>, the role of the colleagues who create workshops on your dashboard.",
          highlight: { box: [0.5839, 0.4232, 0.1179, 0.1908], label: "Role" },
          cursor: { at: [0.62, 0.521], click: true },
          zoom: [0.45, 0.2, 0.46, 0.46]
        },
        {
          html: "Click <strong>Add</strong> to invite them; it stays greyed out until you type an email. Until they join, they're listed with a <strong>Pending</strong> label.",
          highlight: { box: [0.7081, 0.4232, 0.0275, 0.0379], label: "Add", side: "right" },
          cursor: { at: [0.7215, 0.442], click: true },
          zoom: [0.45, 0.2, 0.46, 0.46]
        }
      ]
    },
    {
      id: "org-people-roles",
      title: "Change roles and remove people",
      lead: "Open a group to manage the people in it. Each row shows a name, an email address and a role; in this screenshot, other people's details are blurred.",
      image: "img/7-04-people.webp",
      url: "coplanai.ikonai.app",
      alt: "The Editors group opened in User management: a pending invitation with a mail icon, then editors with their names and emails blurred, each with an Editor role menu and a red bin; the signed-in admin's own row has neither.",
      beats: [
        {
          html: "An invitation that hasn't been taken up yet shows as <strong>Pending</strong>, with a mail icon. Its bin withdraws the invitation.",
          highlight: { box: [0.254, 0.588, 0.486, 0.051], label: "Pending", side: "below" },
          cursor: { at: [0.726, 0.6127], click: false },
          zoom: [0.2, 0.4, 0.56, 0.56]
        },
        {
          html: "To change someone's role, pick a new one in the menu on their row. There's no Save button on this page, so choose with care.",
          highlight: { box: [0.6083, 0.6487, 0.1071, 0.0499], label: "Role" },
          cursor: { at: [0.66, 0.674], click: true },
          zoom: [0.27, 0.46, 0.54, 0.54]
        },
        {
          html: "The red bin removes someone from your organisation's app; set <strong>Status</strong> to <strong>Removed</strong> to find them again. Your own row, the one not blurred here, has neither menu nor bin.",
          highlight: { box: [0.7136, 0.6487, 0.0249, 0.0499], shape: "circle" },   // no label: beside the bin it would cover the role menu
          cursor: { at: [0.726, 0.674], click: false },
          zoom: [0.27, 0.46, 0.54, 0.54]
        }
      ]
    },
    {
      id: "org-manage-experiences",
      title: "Choose your experiences",
      lead: "Experiences are CoPlanAI's single-image AI tools, the ones under <strong>Choose your experience</strong> on your dashboard. <strong>Manage experiences</strong> decides which of the eight your organisation offers, and how each one works.",
      image: "img/7-05-manage-experiences.webp",
      url: "coplanai.ikonai.app",
      alt: "Manage Experiences with the Experience Settings panel open on the right: Main image model set to Google Gemini 3.1 Flash Image, the linked library CoPlanAI Library Places (35 images), Select library and Add, New Library, and Cancel and Save; behind it, experience cards with their switches, tags and gear icons.",
      beats: [
        {
          html: "Each card is one experience, such as <strong>Alter volume</strong>. Its switch turns it on or off for your organisation's whole app.",
          highlight: { box: [0.2415, 0.276, 0.1665, 0.375], label: "Experience" },
          cursor: { at: [0.385, 0.486], click: false },
          zoom: [0.15, 0.2, 0.5, 0.5]
        },
        {
          html: "The tags show that it's <strong>ENABLED</strong>, whether it starts from an <strong>Image</strong> or an <strong>Empty Canvas</strong>, and which AI model draws its pictures.",
          highlight: { box: [0.252, 0.574, 0.118, 0.062], label: "Tags" },
          zoom: [0.15, 0.2, 0.5, 0.5]
        },
        {
          html: "Click the gear on a card to open its <strong>Experience Settings</strong>. The panel doesn't repeat the experience's name, so remember which gear you clicked.",
          highlight: { box: [0.3727, 0.5793, 0.0249, 0.0499], shape: "circle", label: "Settings", side: "below" },
          cursor: { at: [0.3852, 0.6043], click: true },
          zoom: [0.15, 0.2, 0.5, 0.5]
        },
        {
          html: "<strong>MAIN IMAGE MODEL</strong> chooses the AI model that draws this experience's pictures, from the Google Gemini models to OpenAI GPT-Image 2 and several Flux models.",
          highlight: { box: [0.778, 0.11, 0.207, 0.074], label: "Image model", side: "left" },
          cursor: { at: [0.85, 0.158], click: true },
          zoom: [0.54, 0, 0.46, 0.46]
        },
        {
          html: "<strong>LINKED LIBRARIES</strong> connects image libraries to the experience; the red cross unlinks one. Link another with <strong>Select library...</strong> and <strong>Add</strong>, or create one with <strong>New Library</strong>.",
          highlight: { box: [0.778, 0.198, 0.207, 0.195], label: "Libraries", side: "below" },
          cursor: { at: [0.82, 0.308], click: true },
          zoom: [0.54, 0, 0.46, 0.46]
        },
        {
          html: "Click <strong>Save</strong> at the bottom of the panel to keep your changes, or <strong>Cancel</strong> to close it without saving.",
          highlight: { box: [0.8989, 0.9308, 0.0836, 0.0499], label: "Save", side: "above" },
          cursor: { at: [0.9637, 0.9557], click: true },
          zoom: [0.54, 0.54, 0.46, 0.46]
        }
      ]
    },
    {
      id: "org-experience-tools",
      title: "Try an experience yourself",
      lead: "Below <strong>Your Workshops</strong>, the dashboard lists the experiences under <strong>Start from an image</strong> and <strong>Start from an empty canvas</strong>. Each one opens a standalone tool, separate from any workshop: handy for trying out an idea on your own.",
      image: "img/7-06-experience-tool.webp",
      url: "coplanai.ikonai.app",
      alt: "The Drawing on an image experience: a Back button and the tool's name at the top, a welcome message with Select from Library and a plus button on the left, a prompt box at the bottom, an empty canvas on the right, and a Model menu and gallery icon in the top-right corner.",
      beats: [
        {
          html: "The panel on the left explains the tool. <strong>Drawing on an image</strong> turns a photo with your sketch on top into a realistic render. <strong>Back</strong>, top left, takes you out again.",
          highlight: { box: [0.003, 0.004, 0.32, 0.2225], label: "What it does" },
          zoom: [0, 0, 0.5, 0.5]
        },
        {
          html: "Click <strong>Select from Library</strong> to start from a picture in a library, or <strong>+</strong> to upload your own.",
          highlight: { box: [0.0159, 0.2256, 0.122, 0.0499], label: "Your picture" },
          cursor: { at: [0.06, 0.25], click: true },
          zoom: [0, 0, 0.5, 0.5]
        },
        {
          html: "Then describe your idea in the box at the bottom, or drop an image onto it, and click the arrow to send it.",
          highlight: { box: [0.0032, 0.9265, 0.3311, 0.0691], label: "Your idea", side: "above" },
          cursor: { at: [0.1, 0.961], click: true },
          zoom: [0, 0.5, 0.5, 0.5]
        },
        {
          html: "<strong>Model</strong> chooses the AI model that draws the result, from Google Gemini to several Flux models. The picture icon beside it opens the gallery.",
          highlight: { box: [0.9182, 0.0024, 0.0797, 0.0499], label: "Model", side: "below" },
          cursor: { at: [0.945, 0.028], click: true },
          zoom: [0.5, 0, 0.5, 0.5]
        }
      ]
    },
    {
      id: "org-reports",
      title: "Follow usage in Reports",
      lead: "<strong>Reports</strong> shows how CoPlanAI is used across your whole organisation: useful when you report to stakeholders, or plan your next round of workshops.",
      image: "img/7-07-reports.webp",
      url: "coplanai.ikonai.app",
      alt: "The Reports page with a date range from 09/01/2026 to 09/25/2026 applied, the Overview, Workshops and Experiences tabs, totals of 618 images, 17 reactions, 4 comments and 31 workshops, and the top of the Images over time chart with an All workshops menu.",
      beats: [
        {
          html: "Set a <strong>Start date</strong> and an <strong>End date</strong>, then click <strong>Apply</strong>. Images, reactions and comments then count only that period: here, 1 to 25 September 2026.",
          highlight: { box: [0.1731, 0.278, 0.2593, 0.0754], label: "Date range" },
          cursor: { at: [0.412, 0.328], click: true },
          zoom: [0.1, 0.12, 0.5, 0.5]
        },
        {
          html: "The totals count <strong>Images</strong>, <strong>Reactions</strong> and <strong>Comments</strong>. Click one to open those pictures in the organisation gallery, in a new tab.",
          highlight: { box: [0.1731, 0.4761, 0.6461, 0.1194], label: "Totals", side: "below" },
          cursor: { at: [0.2925, 0.553], click: true },
          zoom: [0.1, 0.2, 0.8, 0.8]
        },
        {
          html: "Scroll down for charts: images per day, by model, by experience and by user, reactions and comments. <strong>All workshops</strong> narrows the daily chart to a single workshop.",
          highlight: { box: [0.1731, 0.743, 0.6461, 0.254], label: "Charts" },
          cursor: { at: [0.73, 0.788], click: true },
          zoom: [0.12, 0.25, 0.75, 0.75]
        },
        {
          html: "<strong>Workshops</strong> gives each workshop a card with its active days, participants, images, reactions and comments. Click a card to open its engagement report (see <a href='#engagement-report'>Open the engagement report</a>).",
          highlight: { box: [0.2358, 0.4045, 0.0448, 0.0457], label: "Workshops", side: "above" },
          cursor: { at: [0.258, 0.427], click: true },
          zoom: [0.1, 0.2, 0.46, 0.46]
        },
        {
          html: "<strong>Experiences</strong> shows how much each experience is used, with its counts of <strong>Images</strong>, <strong>Kept</strong>, <strong>Liked</strong> and <strong>Suggestions</strong>.",
          highlight: { box: [0.2907, 0.4045, 0.0496, 0.0457], label: "Experiences", side: "above" },
          cursor: { at: [0.315, 0.427], click: true },
          zoom: [0.1, 0.2, 0.46, 0.46]
        }
      ]
    },
    {
      id: "org-ai-defaults",
      title: "Set the AI defaults for every workshop",
      lead: "<strong>AI Image Customization</strong> holds the defaults that every workshop inherits unless it overrides them in its own <strong>AI Customization</strong> (see <a href='#editor-ai'>AI Customization: steer every image</a>). Set your organisation's rules once, here.",
      image: "img/7-08-ai-defaults.webp",
      url: "coplanai.ikonai.app",
      alt: "AI Image Customization: a Saved button, the Image Model section, a green panel titled The source image is your scene anchor, and sections for how the space should feel, who uses it, what must always be in the scene, what must never appear (opened, with a Never show these field, an Add button and 0/12), access and safety rules, and additional context.",
      note: {
        kind: "warning",
        title: "A ban steers the AI, it can't guarantee",
        html: "An AI model can't be forced to leave something out: despite the wording, an item under <strong>Never show these</strong> can still turn up now and then. Check the results of a test run before a workshop rather than relying on the list alone."
      },
      beats: [
        {
          html: "<strong>Image Model</strong> is the default AI model for workshops that don't choose their own; for this organisation it's Google Gemini 3 Pro Image. Click a section's title to open it.",
          highlight: { box: [0.2405, 0.066, 0.5105, 0.086], label: "Image Model" },
          cursor: { at: [0.278, 0.099], click: true },
          zoom: [0.22, 0, 0.55, 0.55]
        },
        {
          html: "As the green panel says, the AI reads space, scale and materials from each photo. So describe your intent and your limits, not what the photo already shows.",
          highlight: { box: [0.2405, 0.159, 0.5105, 0.113] },   // no label: above or below it would cover a section title
          zoom: [0.22, 0, 0.55, 0.55]
        },
        {
          html: "<strong>What should this space feel like?</strong> sets the goal and image style. <strong>Who uses this space?</strong> takes up to five groups and five activities; <strong>What must always be in the scene?</strong> up to eight elements.",
          highlight: { box: [0.2405, 0.279, 0.5105, 0.273], label: "Three sections", side: "above" },
          zoom: [0.22, 0.15, 0.55, 0.55]
        },
        {
          html: "<strong>What must never appear?</strong> lists up to 12 things to block, whatever participants ask for. Be specific: they're repeated at the end of every prompt as hard constraints.",
          highlight: { box: [0.2405, 0.559, 0.5105, 0.226] },   // no label: above or below it would cover a section title
          cursor: { at: [0.4, 0.72], click: true },
          zoom: [0.22, 0.4, 0.55, 0.55]
        },
        {
          html: "<strong>Access &amp; safety rules</strong> holds planning requirements, such as a lane kept clear for emergency vehicles. <strong>Additional context about this space</strong> adds background the photo can't show.",
          highlight: { box: [0.2405, 0.791, 0.5105, 0.181] },   // no label: above it would cover the Never show these field
          zoom: [0.22, 0.45, 0.55, 0.55]
        }
      ]
    },
    {
      id: "org-app-country",
      title: "Set your app country",
      lead: "At the bottom of App Settings, <strong>App country</strong> says <em>where this app's projects are located</em>. Studio's Focus Area map then opens on that country.",
      image: "img/7-09-app-country.webp",
      url: "coplanai.ikonai.app",
      alt: "App Settings with the App country list open: Not set is ticked at the top, followed by countries from Afghanistan to Bosnia and Herzegovina, over the settings cards; the selector below still reads Not set.",
      beats: [
        {
          html: "Click the selector under <strong>App country</strong>. It reads <strong>Not set</strong> until someone chooses a country.",
          highlight: { box: [0.2575, 0.7665, 0.2081, 0.0474], label: "App country" },
          cursor: { at: [0.36, 0.789], click: true },
          zoom: [0.15, 0.4, 0.6, 0.6]
        },
        {
          html: "The list opens upwards: <strong>Not set</strong>, then every country from A to Z, with no search box. Click yours: it saves straight away, for your whole organisation.",
          highlight: { box: [0.2585, 0.004, 0.155, 0.764], label: "Countries", side: "left" },
          zoom: [0.1, 0, 0.8, 0.8]
        }
      ]
    },
    {
      id: "org-gallery",
      title: "Browse your organisation's images",
      lead: "The picture icon on your dashboard opens the gallery in a new tab (see <a href='#library'>Your organisation's image library</a>). Beyond your own pictures, it holds every image your organisation has shared, from every workshop and experience.",
      image: "img/7-10-gallery.webp",
      url: "coplanai.ikonai.app",
      alt: "The organisation gallery showing All shared images: a counter reading 5180, Download all, Spotlight and Tiles, the IMPACT switch turned on, a bar of filters, a large picture of a Helsinki street with new benches and trees, and an Impact assessment panel listing More seating, Increased shade and Narrowed walkways, with gains and losses.",
      note: {
        kind: "tip",
        title: "Seeing No images found?",
        html: "The gallery opens on <strong>My images</strong>, which can be empty even if you have made pictures in workshops. Switch to <strong>All shared images</strong> to see everything."
      },
      beats: [
        {
          html: "Switch the first filter from <strong>My images</strong> to <strong>All shared images</strong> to see your whole organisation's library, not just the pictures you made yourself.",
          highlight: { box: [0.0142, 0.1042, 0.0884, 0.0337], label: "All shared images", side: "below" },
          cursor: { at: [0.05, 0.121], click: true },
          zoom: [0, 0, 0.5, 0.5]
        },
        {
          html: "Narrow it down by date with <strong>Created at</strong>, by starting photo with <strong>Source image</strong>, by AI model with <strong>All models</strong>, or to one experience or workshop with <strong>All</strong>. <strong>Sort by</strong> sets the order.",
          highlight: { box: [0.1089, 0.1021, 0.3848, 0.0379], label: "Filters", side: "below" },
          cursor: { at: [0.26, 0.121], click: true },
          zoom: [0, 0, 0.56, 0.56]
        },
        {
          html: "Switch on <strong>IMPACT</strong> to show an AI-written impact assessment beside the picture in view, handy when you compare ideas across workshops.",
          highlight: { box: [0.9015, 0.0105, 0.0575, 0.0379], label: "IMPACT", side: "below" },
          cursor: { at: [0.917, 0.029], click: true },
          zoom: [0.5, 0, 0.5, 0.5]
        },
        {
          html: "The <strong>IMPACT ASSESSMENT</strong> reads what the change does, such as <em>More seating</em> or <em>Narrowed walkways</em>, then its trade-offs: who <strong>GAINS</strong> and who <strong>LOSES</strong>.",
          highlight: { box: [0.8033, 0.1665, 0.1913, 0.7112], label: "Impact assessment", side: "left" },
          zoom: [0.28, 0.16, 0.72, 0.72]
        },
        {
          html: "<strong>Download all</strong>, <strong>Spotlight</strong>, <strong>Tiles</strong> and <strong>Original</strong> work just as in a workshop's own gallery (see <a href='#workshop-gallery'>Review the workshop gallery</a>).",
          highlight: { box: [0.7255, 0.0105, 0.1686, 0.0379], label: "Views", side: "below" },
          cursor: { at: [0.873, 0.029], click: true },
          zoom: [0.5, 0, 0.5, 0.5]
        }
      ]
    },
    {
      id: "org-profile",
      title: "Your profile",
      lead: "Finally, check how you appear to others. Choose <strong>Profile</strong> in your avatar menu (see <a href='#profile-menu'>Your profile, language and theme</a>) to open this small window.",
      image: "img/7-11-profile.webp",
      url: "coplanai.ikonai.app",
      alt: "The Profile window over the dimmed dashboard: This name is shown to other people in your projects, a Name field with the name selected, the email address below it, and Cancel and Save buttons.",
      beats: [
        {
          html: "<strong>Profile</strong> holds your display name: as the window says, <em>this name is shown to other people in your projects</em>.",
          highlight: { box: [0.3791, 0.3419, 0.2418, 0.3162], label: "Profile" },
          zoom: [0.25, 0.25, 0.5, 0.5]
        },
        {
          html: "Edit your <strong>Name</strong>. It opens already selected, so your first keystroke replaces it.",
          highlight: { box: [0.3953, 0.466, 0.2095, 0.0398], label: "Name" },
          cursor: { at: [0.5, 0.485], click: true },
          zoom: [0.25, 0.25, 0.5, 0.5]
        },
        {
          html: "Your <strong>Email</strong> is shown for reference and can't be changed here. Click <strong>Save</strong> to keep a new name, or <strong>Cancel</strong> to leave it as it was.",
          highlight: { box: [0.3895, 0.5215, 0.2215, 0.1125], label: "Email and Save" },
          cursor: { at: [0.589, 0.607], click: true },
          zoom: [0.25, 0.25, 0.5, 0.5]
        }
      ]
    }
  ]
});
