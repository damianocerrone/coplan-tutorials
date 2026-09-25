/* CoPlanAI platform guide: Chapter 3: Fine-tune in the advanced editor. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box and cursor point was checked by drawing it on the screenshot.
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "advanced-editor",
  title: "Fine-tune in the *advanced editor*",
  summary: "Open the advanced editor and fine-tune every part of a workshop: its settings, questions, tables, themes, images, AI and what participants can do.",
  steps: [
    {
      id: "editor-open",
      title: "Open the advanced editor",
      lead: "The guided setup drafts a workshop from a few choices. The advanced editor is the full control panel behind it: every setting and every word participants see, in one place.",
      image: "img/3-01-card-menu.webp",
      url: "coplanai.ikonai.app",
      alt: "The dashboard with the three-dot menu of the Draft workshop Senate Square 2040 (tutorial demo) open: Go to workshop, Open gallery, Edit workshop, Guided setup, Publish workshop, Duplicate workshop, Share workshop link and Archive workshop.",
      note: {
        kind: "tip",
        title: "Coming from the guided setup?",
        html: "<strong>Use advanced editor</strong>, in the top-right corner of every setup screen, and <strong>Fine-tune in the advanced editor</strong>, at the end of the setup, open this same editor. Its <strong>Guided setup</strong> button takes you back."
      },
      beats: [
        {
          html: "On your dashboard, click the <strong>&bull;&bull;&bull;</strong> button on the workshop's card.",
          highlight: { box: [0.3529, 0.7718, 0.0249, 0.0499], label: "More actions" },
          cursor: { at: [0.3653, 0.7968], click: true },
          zoom: [0.14, 0.42, 0.44, 0.44]
        },
        {
          html: "Choose <strong>Edit workshop</strong>. The advanced editor opens on the workshop's <strong>Settings</strong>.",
          highlight: { box: [0.2715, 0.5719, 0.1037, 0.0457], label: "Edit workshop" },
          cursor: { at: [0.305, 0.5948], click: true },
          zoom: [0.14, 0.42, 0.44, 0.44]
        }
      ]
    },
    {
      id: "editor-layout",
      title: "Find your way around",
      lead: "The editor has three columns: the sections on the left, the selected section's form in the middle and a live preview on the right. There's no Save button: every change saves automatically.",
      image: "img/3-02-editor-layout.webp",
      url: "coplanai.ikonai.app",
      alt: "The advanced editor on Settings: the menu grouped into Setup, Experience, Generation and Insights on the left, the Guided Setup form in the middle, a phone preview of the welcome screen on the right, and the workshop name, Guided setup, Publish, Exit and Preview along the top.",
      note: {
        kind: "tip",
        title: "Need more room?",
        html: "The small icons beside <strong>MENU</strong> and <strong>PREVIEW</strong> collapse the menu to a row of icons and hide the preview, so the form gets the full width. Click them again to bring both back."
      },
      beats: [
        {
          html: "The menu lists every section, grouped under <strong>SETUP</strong>, <strong>EXPERIENCE</strong>, <strong>GENERATION</strong> and <strong>INSIGHTS</strong>. Click one to open its form in the middle column.",
          highlight: { box: [0.0012, 0.0987, 0.1318, 0.6441], label: "Sections", side: "right" },
          cursor: { at: [0.06, 0.1947], click: true }
        },
        {
          html: "The preview jumps to the participant screen for the section you're in, and always shows the last saved state. Switch between <strong>Phone</strong>, <strong>Tablet</strong> and <strong>Desktop</strong> above it.",
          highlight: { box: [0.749, 0.1015, 0.251, 0.8978], label: "Live preview", side: "left" }
        },
        {
          html: "Click the workshop name to rename it. The new name is saved as soon as you move on.",
          highlight: { box: [0.068, 0, 0.2418, 0.0523], label: "Name" },
          cursor: { at: [0.26, 0.0253], click: true },
          zoom: [0, 0, 0.5, 0.5]
        },
        {
          html: "<strong>Guided setup</strong> returns to the step-by-step setup and <strong>Exit</strong> leaves the editor. <strong>Preview</strong> opens the workshop full screen, as participants see it, until you click <strong>Back to edit</strong>. Publishing comes in the next chapter.",
          highlight: { box: [0.788, 0.0003, 0.2108, 0.0499], label: "Top bar", side: "below" },
          cursor: { at: [0.9735, 0.0253], click: true },
          zoom: [0.5, 0, 0.5, 0.5]
        }
      ]
    },
    {
      id: "editor-settings",
      title: "Settings: the basics and the framing",
      lead: "<strong>Settings</strong> is what the workshop is, who runs it and how it is published. Start at the top, with <strong>Basic Info</strong> and <strong>Guided Setup</strong>.",
      image: "img/3-03-settings-basics.webp",
      url: "coplanai.ikonai.app",
      alt: "Settings with Basic Info open (Slug my-workshop-30, an empty Description, Preview Image with Upload and Library buttons) and the Guided Setup block below it, with its warning and the Flow type, How much it covers and AI creativity menus.",
      note: {
        kind: "warning",
        title: "Changing the framing rewrites your edits",
        html: "Changing any <strong>Guided Setup</strong> answer regenerates the wording, themes and questionnaire it controls, replacing your manual edits to those parts. Settle these answers before you fine-tune anything else."
      },
      beats: [
        {
          html: "The <strong>Slug</strong> identifies the workshop in its web address and join links. It starts as a working name like my-workshop-30, so change it to something clear before you share any links.",
          highlight: { box: [0.1523, 0.287, 0.574, 0.0911], label: "Slug" },
          cursor: { at: [0.25, 0.3511], click: true },
          zoom: [0.13, 0.12, 0.62, 0.62]
        },
        {
          html: "Add a <strong>Description</strong> and a <strong>Preview Image</strong>, uploaded or picked from the <strong>Library</strong>. They appear on the workshop's card on your dashboard, which otherwise reads No preview yet.",
          highlight: { box: [0.1523, 0.382, 0.574, 0.2208], label: "Card details" },
          cursor: { at: [0.58, 0.5779], click: true },
          zoom: [0.13, 0.2, 0.62, 0.62]
        },
        {
          html: "<strong>Guided Setup</strong> holds your guided-setup answers, from <strong>Flow type</strong>, <strong>How much it covers</strong> and <strong>AI creativity</strong> down to <strong>Policy lens</strong>. You can change them here without reopening the setup.",
          highlight: { box: [0.145, 0.626, 0.5885, 0.374], label: "Guided Setup" },
          zoom: [0.13, 0.38, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-settings-organisation",
      title: "Settings: folders, reporting and language",
      lead: "Further down, Settings covers how the workshop is filed, how carefully the report treats small groups, and which language it speaks. You can skip <strong>Legacy AI Guidance</strong>: it's deprecated, and <strong>AI Customization</strong> replaces it.",
      image: "img/3-04-settings-organisation.webp",
      url: "coplanai.ikonai.app",
      alt: "Settings with Organization open (Folders with an Add folder name field and Add button, and Reporting floor set to Default (10)) and Language open (Workshop Language: English), followed by Legacy AI Guidance, Scheduling, Watermark and Publish Details.",
      beats: [
        {
          html: "Under <strong>Folders</strong>, type a name and click <strong>Add</strong> to group this workshop in one or more folders on your dashboard, for example by project.",
          highlight: { box: [0.1523, 0.136, 0.574, 0.1142], label: "Folders" },
          cursor: { at: [0.709, 0.2231], click: true },
          zoom: [0.13, 0.05, 0.62, 0.62]
        },
        {
          html: "The <strong>Reporting floor</strong> is the smallest group the report will publish a figure about, so nobody can be identified. Leave it empty for the default of 10, or lower it for a small room.",
          highlight: { box: [0.1523, 0.27, 0.574, 0.1181], label: "Reporting floor" },
          cursor: { at: [0.2, 0.361], click: true },
          zoom: [0.13, 0.05, 0.62, 0.62]
        },
        {
          html: "<strong>Workshop Language</strong> sets the language of participant-facing text and AI responses: English, Italiano, Suomi, Svenska, Norsk or Deutsch.",
          highlight: { box: [0.1523, 0.497, 0.574, 0.0737], label: "Language" },
          cursor: { at: [0.4, 0.5458], click: true },
          zoom: [0.13, 0.25, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-settings-schedule",
      title: "Settings: dates, watermark and archiving",
      lead: "The last part of Settings, <strong>Schedule &amp; Publishing</strong>, decides when the workshop runs and whether its images carry a watermark. It also holds the one button you should never press by mistake.",
      image: "img/3-05-settings-schedule.webp",
      url: "coplanai.ikonai.app",
      alt: "Settings with Scheduling open (Start Date 09/25/2026, an empty End Date and a banner reading Draft, only admins and editors can access), Watermark open with its switch off, and Publish Details with a red Archive Workshop button in a Danger Zone.",
      note: {
        kind: "info",
        title: "Dates, statuses and archiving",
        html: "How the dates, publishing and the status tags fit together is explained in <a href='#scheduling-danger-zone'>Dates, access and the Danger Zone</a>, in the next chapter. Archiving is covered in <a href='#archive-workshop'>Archive a finished workshop</a>, in <em>After the workshop</em>."
      },
      beats: [
        {
          html: "Under <strong>Scheduling</strong>, set the <strong>Start Date</strong> and <strong>End Date</strong>: once it's published, the workshop is Live between them. The banner below shows its current state, here <strong>Draft</strong>.",
          highlight: { box: [0.1523, 0.389, 0.574, 0.153], label: "Dates" },
          cursor: { at: [0.21, 0.4558], click: true },
          zoom: [0.13, 0.15, 0.62, 0.62]
        },
        {
          html: "Switch on <strong>Add watermark on generated images</strong> to put a watermark on every picture participants create, handy when the images may travel beyond the workshop.",
          highlight: { box: [0.1523, 0.632, 0.187, 0.043], label: "Watermark" },
          cursor: { at: [0.163, 0.6531], click: true },
          zoom: [0.1, 0.4, 0.46, 0.46]
        },
        {
          html: "<strong>Archive Workshop</strong> sits in the <strong>Danger Zone</strong>. Archived workshops can't be unarchived, although they can still be duplicated and their reports stay accessible.",
          highlight: { box: [0.1523, 0.871, 0.574, 0.092], label: "Danger Zone" },
          cursor: { at: [0.44, 0.9142], click: false },
          zoom: [0.13, 0.38, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-questions",
      title: "Questions: the welcome and the questionnaire",
      lead: "<strong>Questions</strong> shows the welcome screen and every question as participants see them. <strong>Show welcome screen</strong> switches the welcome on or off, and <strong>Add Question</strong> adds a new question at the end.",
      image: "img/3-06-questions.webp",
      url: "coplanai.ikonai.app",
      alt: "The Questions section with question Q1, How old are you?, shown as a card with seven answers, each with a remove cross, an Add option button, the question type menu open (Text, Number, Single Choice, Multiple Choice), a red bin icon and an Add Question button at the top.",
      note: {
        kind: "tip",
        title: "Read the drafted questions",
        html: "The guided setup drafts the questionnaire for you, so read every question through: in our square workshop, three of them still asked about a street. You don't need a Name question: a participant's name is always collected, after the welcome screen."
      },
      beats: [
        {
          html: "Click any text, the question or an answer, and type to change it. <strong>&times;</strong> removes an answer and <strong>Add option</strong> adds one.",
          highlight: { box: [0.2762, 0.3335, 0.326, 0.4793], label: "Edit in place", side: "left" },
          cursor: { at: [0.47, 0.362], click: true },
          zoom: [0.16, 0.27, 0.56, 0.56]
        },
        {
          html: "Open the type menu to choose <strong>Text</strong>, <strong>Number</strong>, <strong>Single Choice</strong> or <strong>Multiple Choice</strong>.",
          highlight: { box: [0.62, 0.1514, 0.0885, 0.2], label: "Question type", side: "left" },
          cursor: { at: [0.655, 0.1764], click: true },
          zoom: [0.5, 0.05, 0.46, 0.46]
        },
        {
          html: "The red bin deletes the whole question at once, with no confirmation and no undo, so take care.",
          highlight: { box: [0.7029, 0.1514, 0.0249, 0.0499], shape: "circle", label: "Delete", side: "below" },
          cursor: { at: [0.7153, 0.1764], click: false },
          zoom: [0.5, 0.05, 0.46, 0.46]
        }
      ]
    },
    {
      id: "editor-image-libraries",
      title: "Your image libraries",
      lead: "<strong>Image Libraries</strong> holds your organisation's photo collections. Which of them this workshop offers participants is set in <strong>Image &amp; Transform</strong>, further down.",
      image: "img/3-07-image-libraries.webp",
      url: "coplanai.ikonai.app",
      alt: "The Image Libraries section: a list of the organisation's libraries with image and workshop counts and a New Library button, with Helsinki photos selected and its four street photos shown, each with a location pin, plus Edit and Delete buttons.",
      beats: [
        {
          html: "The list shows every library with how many images it holds and how many workshops use it. <strong>New Library</strong> creates one.",
          highlight: { box: [0.1455, 0.064, 0.183, 0.924], label: "Libraries", side: "right" },
          cursor: { at: [0.284, 0.1184], click: true }
        },
        {
          html: "Selecting a library shows its pictures, here <strong>Helsinki photos</strong>; a pin marks photos that carry a location. Take care with <strong>Edit</strong> and <strong>Delete</strong>: this library is used by three workshops.",
          highlight: { box: [0.3355, 0.072, 0.396, 0.199], label: "Helsinki photos", side: "below" },
          zoom: [0.26, 0, 0.54, 0.54]
        }
      ]
    },
    {
      id: "editor-groups",
      title: "Groups: your tables",
      lead: "<strong>Groups</strong> are the tables or teams participants pick when they join. The guided setup created eight here, <strong>Table A</strong> to <strong>Table H</strong>, for a room working in groups.",
      image: "img/3-08-groups.webp",
      url: "coplanai.ikonai.app",
      alt: "The Groups section scrolled down: the Table G and Table H cards with Click to upload, an Add Group card, and Group Access with Apply to all groups switched on and an All Groups card setting Image Libraries and Themes to Use all; the phone preview shows Select your group.",
      note: {
        kind: "info",
        title: "A link for every table",
        html: "With <strong>Apply to all groups</strong> off, each table shows its own <strong>Join Link</strong>, which drops people straight into that table. <a href='#table-join-links'>Give each table its own link</a> shows how to find and share them."
      },
      beats: [
        {
          html: "Click a table's name, such as <strong>Table G</strong>, to rename it, and add a picture with <strong>Click to upload</strong> so people find their table at a glance. <strong>Add Group</strong> adds another table.",
          highlight: { box: [0.1455, 0.132, 0.4617, 0.371], label: "Tables" },
          cursor: { at: [0.22, 0.4658], click: true },
          zoom: [0.1, 0.05, 0.6, 0.6]
        },
        {
          html: "<strong>Apply to all groups</strong> gives every table the same libraries and themes; <strong>Use all</strong> offers every one linked to the workshop. Switch it off to set each table separately.",
          highlight: { box: [0.1444, 0.569, 0.59, 0.41], label: "Group Access", side: "right" },
          cursor: { at: [0.1568, 0.6458], click: false },
          zoom: [0.1, 0.38, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-themes",
      title: "Themes: the ready-made changes",
      lead: "Themes are the ready-made changes participants tap to transform their picture. The live preview shows the theme screen as they see it.",
      image: "img/3-09-themes.webp",
      url: "coplanai.ikonai.app",
      alt: "The Themes section: the Placemaking theme card with its ten buttons and Edit theme, Generate image and From library buttons, an Add Theme card, and Primary Themes settings with Allow Skip Theme on and Max Theme Selections set to 1; the preview shows Pick a theme, Skip theme and Transform.",
      beats: [
        {
          html: "Each card is one theme: <strong>Placemaking</strong> offers 10 buttons participants can tap. Click <strong>Edit theme</strong> to change them, or <strong>Add Theme</strong> to create another theme.",
          highlight: { box: [0.1449, 0.1335, 0.2926, 0.3278], label: "Placemaking", side: "above" },
          cursor: { at: [0.19, 0.4195], click: true },
          zoom: [0.12, 0.05, 0.62, 0.62]
        },
        {
          html: "<strong>Allow Skip Theme</strong> lets participants go on without tapping a button. <strong>Max Theme Selections</strong> sets how many of the buttons they can pick at once: 1 by default.",
          highlight: { box: [0.145, 0.528, 0.5885, 0.33], label: "Primary Themes" },
          cursor: { at: [0.166, 0.6331], click: false },
          zoom: [0.12, 0.38, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-theme-buttons",
      title: "Edit a theme's buttons",
      lead: "<strong>Edit theme</strong> opens a panel with the theme's name, shown on its card and in the participant's phone header, and the buttons participants tap. Each button has two parts.",
      image: "img/3-10-theme-buttons.webp",
      url: "coplanai.ikonai.app",
      alt: "The Edit theme panel for Placemaking: What it is called, then The buttons participants tap, each with a short label such as Seats in the sun and the shade, a longer prompt for the model below it, a drag handle and a remove cross, and a Done button.",
      beats: [
        {
          html: "The <strong>label</strong> is what participants read and tap, such as Seats in the sun and the shade. Keep it short and concrete.",
          highlight: { box: [0.0202, 0.2345, 0.2881, 0.0541], label: "Label", side: "right" },
          cursor: { at: [0.15, 0.2616], click: true },
          zoom: [0, 0.1, 0.5, 0.5]
        },
        {
          html: "The <strong>prompt</strong> below it is what the AI model is told. The drafted prompts end by keeping the same viewpoint, so the place stays recognisable.",
          highlight: { box: [0.0202, 0.2829, 0.2881, 0.0836], label: "Prompt", side: "right" },
          cursor: { at: [0.22, 0.32], click: true },
          zoom: [0, 0.1, 0.5, 0.5]
        },
        {
          html: "Drag a button's handle to reorder it, click <strong>&times;</strong> to remove it, or use <strong>+ Add transformation</strong> at the end of the list. Click <strong>Done</strong> to close the panel.",
          highlight: { box: [0.2964, 0.9372, 0.043, 0.0541], label: "Done", side: "above" },
          cursor: { at: [0.3179, 0.9643], click: true },
          zoom: [0, 0.5, 0.5, 0.5]
        }
      ]
    },
    {
      id: "editor-image-transform",
      title: "Image & Transform: pictures and changes",
      lead: "<strong>Image &amp; Transform</strong> decides where each participant's starting picture comes from, and how they may change it. Tick as many image sources as you like: participants choose between them. <strong>Upload</strong> and <strong>Map</strong>, which pins your GPS-tagged library photos, are off here.",
      image: "img/3-11-image-transform.webp",
      url: "coplanai.ikonai.app",
      alt: "The Image & transform section: Image Source cards Upload (off), Library (on, with Helsinki photos (4) and Add Library), Street view (on, opening at Helsinki, Finland, with a Locate button) and Map (off), and Transformations cards Theme, Draw and Prompt, all ticked.",
      note: {
        kind: "tip",
        title: "Check the drafted wording",
        html: "Under <strong>ADVANCED SETTINGS</strong>, <strong>Transform Methods</strong> holds the <strong>Prompt Guidance</strong> added to what participants type. The guided setup drafts it for you, so read it through: in our square workshop, it still talked about a street."
      },
      beats: [
        {
          html: "<strong>Library</strong> offers the libraries linked here, now <strong>Helsinki photos (4)</strong>. <strong>Add Library</strong> links another, including CoPlanAI's own libraries marked Global. Click <strong>&times;</strong> to remove one from the list.",
          highlight: { box: [0.1435, 0.289, 0.2285, 0.22], label: "Library", side: "right" },
          cursor: { at: [0.19, 0.4658], click: true },
          zoom: [0.08, 0.2, 0.5, 0.5]
        },
        {
          html: "With <strong>Street view</strong>, participants drop a pin on real street photos anywhere in the world. <strong>Opens at</strong> only sets where the map starts: type a place and click <strong>Locate</strong>.",
          highlight: { box: [0.1435, 0.508, 0.2285, 0.277], label: "Street view", side: "right" },
          cursor: { at: [0.336, 0.7153], click: true },
          zoom: [0.08, 0.4, 0.5, 0.5]
        },
        {
          html: "Under <strong>Transformations</strong>, tick how participants may change their picture: tap a <strong>Theme</strong>, <strong>Draw</strong> on it, or type a <strong>Prompt</strong>.",
          highlight: { box: [0.378, 0.137, 0.266, 0.588], label: "Transformations", side: "right" },
          zoom: [0.22, 0.1, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-draw",
      title: "Draw: what the pens mean",
      lead: "<strong>Draw</strong> sets how drawings on the picture are turned into images. Switch on <strong>Require Prompt with Drawing</strong> if every drawing should also come with a few words.",
      image: "img/3-12-draw.webp",
      url: "coplanai.ikonai.app",
      alt: "The Drawing section: Require Prompt with Drawing switched off, a long Draw Guidance text, and six colour meanings (Green, Blue, Orange, Yellow, Grey and Red) with an Add color meaning button; the preview shows the drawing screen with its colour legend and pen tools.",
      beats: [
        {
          html: "<strong>Draw Guidance</strong> tells the AI how to turn sketches into realistic parts of the photo. Read it through and fit it to your place, replacing any placeholder in square brackets.",
          highlight: { box: [0.1444, 0.184, 0.5898, 0.3515], label: "Draw Guidance" },
          zoom: [0.12, 0.1, 0.62, 0.62]
        },
        {
          html: "<strong>Color meanings</strong> sets what each pen does, such as Green for greenery. Rename a colour, reword it, remove it with <strong>&times;</strong> or click <strong>Add color meaning</strong>. Participants see this legend.",
          highlight: { box: [0.1444, 0.561, 0.5898, 0.409], label: "Color meanings" },
          cursor: { at: [0.19, 0.9401], click: true },
          zoom: [0.12, 0.38, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-ai",
      title: "AI Customization: steer every image",
      lead: "<strong>AI Customization</strong> shapes every image this workshop generates. The AI reads space, scale and materials from the photo itself, so these fields only need your intent and your limits.",
      image: "img/3-13-ai-customization.webp",
      url: "coplanai.ikonai.app",
      alt: "The AI Customization section: Image Model set to Google Gemini 3.1 Flash Image, a banner reading The source image is your scene anchor, and What should this space feel like? with the required Main goal of the redesign and Image style fields and an optional Visual style reference.",
      note: {
        kind: "warning",
        title: "Fill in the required fields",
        html: "Further down, you say who uses the space, what must always be in the scene and what must never appear. <strong>Main goal of the redesign</strong>, <strong>Image style</strong> and <strong>Never show these</strong> are required, yet our guided setup left them empty without a warning. Check them before you publish."
      },
      beats: [
        {
          html: "<strong>Image Model</strong> picks the AI that draws this workshop's images, from Google Gemini models to OpenAI GPT-Image 2 and several Flux models.",
          highlight: { box: [0.145, 0.072, 0.5885, 0.199], label: "Image Model" },
          cursor: { at: [0.3, 0.2311], click: true },
          zoom: [0.12, 0, 0.62, 0.62]
        },
        {
          html: "<strong>Main goal of the redesign</strong> is one clear sentence that anchors every image the AI produces.",
          highlight: { box: [0.1523, 0.485, 0.574, 0.124], label: "Main goal" },
          cursor: { at: [0.26, 0.559], click: true },
          zoom: [0.12, 0.25, 0.62, 0.62]
        },
        {
          html: "Choose an <strong>Image style</strong>: a photorealistic edit of the photo, an architectural visualisation render, a watercolour or concept sketch, or a 3D render. One style keeps results consistent across sessions.",
          highlight: { box: [0.1523, 0.611, 0.574, 0.0991], label: "Image style" },
          cursor: { at: [0.3, 0.6832], click: true },
          zoom: [0.12, 0.3, 0.62, 0.62]
        },
        {
          html: "<strong>Visual style reference</strong> names a reference place or aesthetic, such as a square you admire. The editor calls it the strongest single lever for consistent results.",
          highlight: { box: [0.1523, 0.71, 0.574, 0.124], label: "Style reference" },
          cursor: { at: [0.3, 0.7843], click: true },
          zoom: [0.12, 0.38, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-generation-session",
      title: "Generation: the session and sharing",
      lead: "<strong>Generation</strong> decides how images are made and what participants can do with them. The switches at the top cover the session and what people can do with a finished image, such as <strong>Download</strong> and <strong>Compare with original</strong>.",
      image: "img/3-14-generation-session.webp",
      url: "coplanai.ikonai.app",
      alt: "The Generation section: Session controls with Complete button, Start over button, User profile and Force reaction all switched on, and Image actions with Submit, Download and Compare with original switched on.",
      beats: [
        {
          html: "With <strong>Complete button</strong> on, the closing screen's button and its auto-restart timer reset the session for the next participant, as a kiosk needs. <strong>Start over button</strong> lets people restart from the beginning.",
          highlight: { box: [0.1523, 0.232, 0.566, 0.139], label: "Finish or restart" },
          cursor: { at: [0.1648, 0.2647], click: false },
          zoom: [0.1, 0.08, 0.62, 0.62]
        },
        {
          html: "<strong>Force reaction</strong> asks for an emoji, or Skip, after every generated image, so you collect a reaction to each picture.",
          highlight: { box: [0.1523, 0.456, 0.566, 0.056], label: "Force reaction" },
          cursor: { at: [0.164, 0.4835], click: false },
          zoom: [0.1, 0.25, 0.62, 0.62]
        },
        {
          html: "With <strong>Submit</strong> on, participants choose which images go to the shared gallery. Switch it off and every generated image is submitted automatically.",
          highlight: { box: [0.1523, 0.634, 0.566, 0.056], label: "Submit" },
          cursor: { at: [0.164, 0.6603], click: false },
          zoom: [0.1, 0.38, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-generation-tools",
      title: "Generation: images and tools",
      lead: "Further down, <strong>Image generation</strong> sets how many pictures each round makes and which tools participants get to refine them.",
      image: "img/3-15-generation-tools.webp",
      url: "coplanai.ikonai.app",
      alt: "Image generation settings: Images per generation 3, Custom prompts, Regeneration and AI impact evaluation switched on, Iteration history off, Touch-up on with its Touch-up guidance text, and the collapsed AI recommendations and Reactions & comments sections.",
      beats: [
        {
          html: "<strong>Images per generation</strong> is how many variants each round produces: 3 here, so every round gives participants a choice.",
          highlight: { box: [0.1523, 0.088, 0.574, 0.0906], label: "Images per round" },
          cursor: { at: [0.2, 0.1516], click: true },
          zoom: [0.12, 0, 0.62, 0.62]
        },
        {
          html: "Choose the tools: <strong>Custom prompts</strong> for their own words, <strong>Regeneration</strong> for a fresh set, <strong>AI impact evaluation</strong> for an AI-written summary of each image, and <strong>Touch-up</strong> to mark up a result and fix it.",
          highlight: { box: [0.1523, 0.19, 0.574, 0.336], label: "Participant tools" },
          zoom: [0.12, 0.05, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-generation-feedback",
      title: "Generation: reactions, comments and galleries",
      lead: "At the bottom of <strong>Generation</strong>, choose how people respond to each other's images, and which galleries they can browse.",
      image: "img/3-16-generation-feedback.webp",
      url: "coplanai.ikonai.app",
      alt: "Reactions & comments with Enable reactions on and three emoji, an Add field, Comments on with Who can comment set to People who created the image and Who can see comments set to Image creators and admins, and Gallery with Personal gallery, Swipe voting and Shared gallery switched on.",
      beats: [
        {
          html: "<strong>Enable reactions</strong> lets people react to images. Remove an emoji with its red <strong>&times;</strong>, or type one and click <strong>Add</strong>. The report counts each as backing or against an idea, so pick clear ones.",
          highlight: { box: [0.1523, 0.177, 0.196, 0.202], label: "Reactions", side: "right" },
          cursor: { at: [0.224, 0.3516], click: true },
          zoom: [0.08, 0.05, 0.54, 0.54]
        },
        {
          html: "With <strong>Comments</strong> on, choose <strong>Who can comment</strong> and <strong>Who can see comments</strong>. Workshop admins can always see and add comments.",
          highlight: { box: [0.1523, 0.389, 0.574, 0.257], label: "Comments" },
          cursor: { at: [0.3, 0.5105], click: true },
          zoom: [0.12, 0.2, 0.62, 0.62]
        },
        {
          html: "<strong>Personal gallery</strong> keeps each person's own images, <strong>Swipe voting</strong> lets them vote on others' shared images after completing, and <strong>Shared gallery</strong> shows everyone's.",
          highlight: { box: [0.1523, 0.766, 0.574, 0.197], label: "Galleries" },
          cursor: { at: [0.164, 0.8623], click: false },
          zoom: [0.12, 0.38, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-complete",
      title: "Complete: the closing screen",
      lead: "<strong>Complete</strong> is the last screen participants see. The preview shows it in place, with <strong>Where your ideas stand</strong> and <strong>Vote on ideas</strong> above the button.",
      image: "img/3-17-complete.webp",
      url: "coplanai.ikonai.app",
      alt: "The Complete screen section: Title What would make you stay an hour?, Subtitle and Button label showing their defaults, Auto-restart timer set to 60 seconds and Show QR code switched off; the preview shows the closing screen.",
      beats: [
        {
          html: "Word the <strong>Title</strong>, <strong>Subtitle</strong> and <strong>Button label</strong>. The title starts as the closing question drafted by the guided setup: here, &ldquo;What would make you stay an hour?&rdquo;",
          highlight: { box: [0.145, 0.134, 0.589, 0.287], label: "Closing words" },
          cursor: { at: [0.35, 0.2063], click: true },
          zoom: [0.12, 0, 0.62, 0.62]
        },
        {
          html: "On a shared tablet or kiosk, the <strong>Auto-restart timer</strong> restarts the workshop for the next person after 60 seconds. <strong>Show QR code</strong> lets participants scan a code and download their own images.",
          highlight: { box: [0.145, 0.62, 0.589, 0.358], label: "Kiosk and QR" },
          cursor: { at: [0.2, 0.761], click: true },
          zoom: [0.12, 0.38, 0.62, 0.62]
        }
      ]
    },
    {
      id: "editor-ideas-report",
      title: "Ideas & Follow-up, and the report",
      lead: "The last two sections are for after the workshop. <a href='#after-the-workshop'>After the workshop</a> covers both in detail.",
      image: "img/3-18-ideas-followup.webp",
      url: "coplanai.ikonai.app",
      alt: "The Ideas & Follow-up section: a ladder of six steps from 1 Raised to 6 Delivered, and one shared idea, a street photo with benches, marked Raised; Report is at the bottom of the menu, under Insights.",
      beats: [
        {
          html: "<strong>Ideas &amp; Follow-up</strong> tracks each shared idea on a ladder from <strong>Raised</strong> to <strong>Delivered</strong>. Steps 4 to 6 are claims about the real world, so they need an official document and a named official.",
          highlight: { box: [0.1447, 0.1536, 0.3435, 0.0324], label: "The ladder", side: "right" },
          zoom: [0.08, 0.02, 0.46, 0.46]
        },
        {
          html: "Each shared idea has a card showing its current step, here <strong>Raised</strong>, and participants see the same status on their own ideas. Click a card to move the idea along.",
          highlight: { box: [0.1444, 0.1908, 0.1964, 0.3407], label: "Shared idea", side: "right" },
          cursor: { at: [0.24, 0.34], click: true },
          zoom: [0.08, 0.05, 0.5, 0.5]
        },
        {
          html: "<strong>Report</strong>, under <strong>INSIGHTS</strong>, opens the workshop's engagement report. It leaves the editor, so use your browser's back button to return.",
          highlight: { box: [0.0012, 0.6937, 0.1318, 0.0491], label: "Report", side: "right" },
          cursor: { at: [0.035, 0.7182], click: true },
          zoom: [0, 0.4, 0.5, 0.5]
        }
      ]
    }
  ]
});
