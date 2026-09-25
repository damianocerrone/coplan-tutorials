# CoPlanAI platform feedback

Notes for the CoPlanAI product team, collected while we built the CoPlanAI platform guide.

## How this was gathered

- **When and where:** 25 September 2026, on the live platform (`coplanai.ikonai.app`, organisation "CoPlanAI").
- **Who:** we were signed in as the workshop owner account. We worked in a sandbox workshop, **"Senate Square 2040
  (tutorial demo)"**, and in a copy of it. We only viewed other workshops and the organisation-wide settings.
- **Method:** a guided exploration in six passes: guided setup, advanced editor, participant journey (phone and
  desktop), workshop lifecycle, organisation settings, and a final check for gaps. An automated Chromium browser
  (Playwright) did the clicking, at desktop size (1900×950) and phone size (390×844). Every screen was saved as a
  screenshot, its page text and its element positions.
- **Editing:** the passes produced about 120 raw observations. We checked each one against the captures, merged
  duplicates, and removed anything that came from our own test setup or was only a matter of taste. The removed
  items are listed in [Appendix A](#appendix-a--excluded-observations). We describe only what we saw, not what might
  cause it.
- **Evidence:** file names refer to our capture set. `explore/<area>/…` and `scout/…` are screenshots (`.png`) that
  come with matching page text (`.txt`) and element boxes (`.json`). We can share any of them on request.

**Severity**

- **High:** stops or misleads participants or clients, or risks exposing personal data or harmful content.
- **Medium:** gives wrong or missing results, or is a step where many users will get stuck.
- **Low:** polish, clarity or consistency.

Within each severity level, privacy and security items come first.

## Summary

| ID | Area | Severity | Issue |
|---|---|---|---|
| PS-1 | Privacy & security | High | Participants' account names appear in the gallery, although the seat screen says "Nobody's name goes anywhere" |
| PA-1 | Participant app | High | A "Public — anyone with the link" workshop still makes every participant sign in (Google, Microsoft or an email code) |
| RG-1 | Reports & gallery | High | Organisers cannot hide or delete a participant's picture from the gallery |
| RG-2 | Reports & gallery | High | The report shows answers to only 6 of the 9 questions, and there is no other way to see or export them |
| PS-2 | Privacy & security | Medium | The report PDF is served from a public asset address, outside the app's sign-in |
| PS-3 | Privacy & security | Medium | "Add user" preselects the Editor role and does not explain what any role can do |
| GS-1 | Guided setup | Medium | Text drafted for a square asks about "this street" and leaves a `[street/ground/surfaces]` placeholder |
| GS-2 | Guided setup | Medium | Setup says "Everything is set" while three required (*) AI fields are empty |
| ED-1 | Advanced editor | Medium | The idea status dialog ("Where does this idea stand?") opens twice |
| PA-2 | Participant app | Medium | Street view blanks the whole app when the browser has no WebGL2 |
| PA-3 | Participant app | Medium | Submit is an unlabelled icon, and after submitting nothing on screen shows the next step (Complete is only in ☰) |
| PA-4 | Participant app | Medium | The closing question has no answer field; a 60 s countdown with no explanation resets the phone |
| PA-5 | Participant app | Medium | Pen colours do not match the colour legend, and on phones some swatches are cut off |
| PA-6 | Participant app | Medium | The gallery in the participant menu is the organiser gallery and does not fit a phone |
| DL-1 | Dashboard & lifecycle | Medium | The two Publish buttons behave differently; the card one leaves a workshop "published but not started" with no tag |
| DL-2 | Dashboard & lifecycle | Medium | Status wording and the Publish/Unpublish buttons disagree between screens |
| DL-3 | Dashboard & lifecycle | Medium | A future start date does not make a Live workshop "Upcoming", although the help text says it should |
| RG-3 | Reports & gallery | Medium | Pictures never submitted are counted as proposals and listed as ideas |
| RG-4 | Reports & gallery | Medium | "In their own words" quotes an image comment; the line typed in the table vote is missing |
| RG-5 | Reports & gallery | Medium | Figures and badges in the report contradict each other |
| RG-6 | Reports & gallery | Medium | The client-facing report prints example quotes that read like findings, and internal indicator keys |
| RG-7 | Reports & gallery | Medium | The only export is a ZIP of images with hash file names, with no data |
| RG-8 | Reports & gallery | Medium | The PDF document leaves out the pictures, the ideas, the verbatim lines and the questionnaire table |
| GS-3 | Guided setup | Low | The step 1 summary gives a closing question and image source that the workshop does not use |
| GS-4 | Guided setup | Low | The slug keeps the placeholder name ("my-workshop-30") after the workshop is named |
| ED-2 | Advanced editor | Low | Every help tooltip also appears in the top-left corner |
| ED-3 | Advanced editor | Low | Image pickers list all 270 images in the organisation, and some thumbnails are rotated |
| ED-4 | Advanced editor | Low | Two different library lists (12 and 18), with no sign of which ones are linked |
| ED-5 | Advanced editor | Low | Deleting a question or an answer option is instant, with no undo |
| ED-6 | Advanced editor | Low | The Questions page shows every question twice |
| ED-7 | Advanced editor | Low | The welcome card in the Questions preview cuts the subtitle off mid-word |
| ED-8 | Advanced editor | Low | The "Desktop" preview is a small thumbnail, although the caption promises real device size |
| ED-9 | Advanced editor | Low | The AI Customization tab has no header, and its preview shows the wrong step name |
| ED-10 | Advanced editor | Low | The deprecated "Legacy AI Guidance" section is still shown and did not expand |
| ED-11 | Advanced editor | Low | The "Report" menu item leaves the editor with no way back |
| PA-7 | Participant app | Low | The step indicator shows the wrong step (for example "3 Select Image" on the seat and table-vote screens) |
| PA-8 | Participant app | Low | "Why does this matter to you?" is visible only while the picture is being made |
| PA-9 | Participant app | Low | In the ☰ menu, Back skips a step and Language cannot be changed; step 4 does not show the chosen picture |
| PA-10 | Participant app | Low | Saving a comment or copying an image link gives no confirmation |
| PA-11 | Participant app | Low | The table vote runs the "split the table" round with only one person seated |
| PA-12 | Participant app | Low | On desktop, the theme list is squeezed into a small scroll box |
| DL-4 | Dashboard & lifecycle | Low | Archived cards have no "View report" and there is no Unarchive |
| DL-5 | Dashboard & lifecycle | Low | The card offers "View report" only after a workshop has ended |
| DL-6 | Dashboard & lifecycle | Low | The report of an archived, "read-only" workshop can still be edited |
| DL-7 | Dashboard & lifecycle | Low | An ended and archived workshop still opens its welcome screen for the owner |
| DL-8 | Dashboard & lifecycle | Low | The "Copied" toast sits behind the Share dialog's backdrop |
| DL-9 | Dashboard & lifecycle | Low | It is unclear what the "Published" filter tab includes |
| DL-10 | Dashboard & lifecycle | Low | An empty status tab shows no empty-state message |
| DL-11 | Dashboard & lifecycle | Low | Duplicate works silently and names the copy "… (copy)" |
| DL-12 | Dashboard & lifecycle | Low | Cards show "No preview yet" until someone sets a card image by hand |
| DL-13 | Dashboard & lifecycle | Low | Accessibility: dialogs are announced as "Dialog", switches as "on", and images as "Library image 1" |
| RG-9 | Reports & gallery | Low | Reactions are counted as votes, but nobody declares or explains that |
| RG-10 | Reports & gallery | Low | Charts have unlabelled slices, clipped labels, totals that are not explained, and no back link |
| RG-11 | Reports & gallery | Low | "My images" is empty for an organiser whose images appear under "All shared images" |
| RG-12 | Reports & gallery | Low | The gallery header and filter wording differ from the rest of the app |
| RG-13 | Reports & gallery | Low | In Comments, your own comment is pre-filled in the input and looks like a new comment |
| OS-1 | Organisation settings | Low | The App settings pages have no back link or breadcrumb |
| OS-2 | Organisation settings | Low | Test accounts ("StressTestUser") are mixed with real users and analytics, and there are no bulk actions |
| OS-3 | Organisation settings | Low | Workshop participants are hard to tell apart (truncated role, no email or workshop, many "Guest") |
| OS-4 | Organisation settings | Low | One editor is shown by a raw ID instead of a name |
| OS-5 | Organisation settings | Low | The account that manages users is labelled "Editor", and there is no App admin group |
| OS-6 | Organisation settings | Low | Manage experiences: titles are truncated, two look identical, and the settings drawer does not say which one it edits |
| OS-7 | Organisation settings | Low | The library selector is full of auto-created "Uploaded by user [id:id]" entries |
| OS-8 | Organisation settings | Low | The App country list has about 195 entries and no search; "Studio" is not explained |
| OS-9 | Organisation settings | Low | There is no help link and no view of AI usage, although each Transform makes 3 images |
| CT-1 | Copy & translations | Low | Plurals: "1 people", "1 directions", "in 1 groups", "1 Participants", "picture(s)" |
| CT-2 | Copy & translations | Low | Model names: internal IDs in some places, the typo "Gemini 25", and GPT-Image 2 missing from one menu |
| CT-3 | Copy & translations | Low | Custom Logo says "replace the default Ikon logo" |
| CT-4 | Copy & translations | Low | The app-wide AI Image Customization page says "in this workshop" |
| CT-5 | Copy & translations | Low | The Manage experiences card promises "Create, edit, and organize", but the page cannot create or reorder |
| CT-6 | Copy & translations | Low | "Get started" appears on two screens in a row |

**Totals:** 71 items: 4 high, 19 medium, 48 low.

---

## Guided setup

### GS-1 · Text drafted for a square talks about "this street" and leaves a placeholder (Medium)

- **What happens:** The sandbox was set up with "How much it covers: A square". The setup still drafted the "Your
  street" question set: "What brings you to this street?", "How often are you on this street?" and "If this street
  changed, would it change your day?". It also drafted the Prompt Guidance "The street keeps its shape, and the
  surfaces are open." The Draw Guidance contains an unfilled template token: "…casting accurate shadows and
  reflections onto the **[street/ground/surfaces]** based on the light source".
- **Where:** Guided setup > Questionnaire ("Intent & stake — 'Your street' on the phone"). Advanced editor >
  Questions, Image & Transform > Advanced settings > Prompt Guidance, and Draw > Draw Guidance. Also the participant
  questionnaire.
- **Why it matters:** People standing in a square are asked about "this street". The unfilled token sits inside
  text that is written as instructions to the image model.
- **Suggested fix:** Fill question and guidance templates from the chosen scope (square, street, park and so on).
  Block publishing while any text still contains an unfilled `[…]` token.
- **Evidence:** `scout/caps-42-setup-questionnaire.png`, `explore/participant/p06-q-your-street-why.png`,
  `p08-q-how-often.png`, `p10-q-change-your-day.png`, `explore/editor/51-image-transform-advanced.png`,
  `explore/editor/55-draw-top.png`

### GS-2 · "Everything is set" while three required AI fields are empty (Medium)

- **What happens:** In step 8, "Ready to run", every step shows Done and the page says "Everything is set". In the
  advanced editor, AI Customization has three fields marked required (\*): "Main goal of the redesign", "Image
  style" and "Never show these". All three are empty, and no warning appears. The app-wide AI Image Customization
  defaults, which every workshop inherits, are empty too.
- **Where:** Guided setup > Ready to run. Advanced editor > AI Customization > "What should this space feel like?"
  and "What must never appear?". App settings > AI Image Customization.
- **Why it matters:** Either the asterisks are wrong, or workshops go live without the scene rules the form calls
  required. That includes the "never show" list, which guards what the public sees.
- **Suggested fix:** Decide whether these fields are required. If they are, add them to the Ready-to-run checklist
  or pre-fill them from the chosen theme. If they are not, remove the asterisks.
- **Evidence:** `scout/caps-41-setup-step8-accepted.png`, `explore/editor/61-ai-customization-open-1.png`,
  `explore/editor/62-ai-customization-open-2.png`, `explore/org/29-ai-custom-what-should-this-space-feel-like.png`,
  `explore/org/32-ai-custom-what-must-never-appear.png`

### GS-3 · The step 1 summary gives a closing question and image source the workshop does not use (Low)

- **What happens:** After you choose Futuring in step 1, the summary reads 'Closing question: "What should this
  place become?"' and "… pictures from the map". Step 8 then says participants are asked "What would make you stay
  an hour?", which is the Placemaking theme's closing line. Participants actually get pictures from the library and
  from street view.
- **Where:** Guided setup > step 1, "What you are asking for" (summary card). Also step 8 and the participant's
  Complete screen.
- **Why it matters:** The organiser reads one thing in step 1 and gets another in the live workshop, and may not
  notice that the closing question changed.
- **Suggested fix:** Label these as defaults that later steps can change, or update the summary when they change.
  Show the final closing question on the Ready-to-run checklist.
- **Evidence:** `scout/caps-21-setup-step1-futuring.png`, `scout/caps-41-setup-step8-accepted.png`,
  `explore/participant/p48-closing.png`, `explore/participant/p16-image-source.png`

### GS-4 · The slug keeps the placeholder name "my-workshop-30" (Low)

- **What happens:** The guided setup creates the workshop as "My workshop 30". The slug stays `my-workshop-30`
  after the organiser names the workshop in step 8. That slug is in the participant URL and QR code
  (`…/coplanai/my-workshop-30`) and in the table links (`…?group=tablea`). A duplicate made from the dashboard card
  does get a slug from its name (`senate-square-2040-tutorial-demo-copy`).
- **Where:** Guided setup > Ready to run > Workshop name. Advanced editor > Settings > Basic Info > Slug. The Share
  workshop link dialog.
- **Why it matters:** Participants see and type this URL. A generic slug looks unfinished and is easy to confuse
  with other workshops.
- **Suggested fix:** Create the slug from the name when the name is first set, while the workshop is still a Draft.
  Otherwise, suggest a new slug when the name changes before publishing.
- **Evidence:** `scout/caps-39-setup-step8.png`, `explore/editor/10-settings-basic-info.png`,
  `explore/lifecycle/05-share-link.png`, `explore/lifecycle/28-copy-basic-info.png`

## Advanced editor

### ED-1 · The idea status dialog opens twice (Medium)

- **What happens:** Clicking an idea opens two identical "Where does this idea stand?" dialogs, one on top of the
  other. The page then has two headings, two Cancel buttons and two "Record it" buttons. The doubled backdrop makes
  the page almost black. It happened in two separate sessions.
- **Where:** Advanced editor > Ideas & Follow-up > an idea card.
- **Why it matters:** This is where an official commitment is recorded, with a document reference and a named
  official. Two open forms risk a duplicate or conflicting record, and the screen looks broken.
- **Suggested fix:** Open only one dialog per click.
- **Evidence:** `explore/editor/82-ideas-followup-idea-detail.png` (its `.json` lists both dialogs),
  `83-ideas-followup-step-options.png`, `84-ideas-followup-step4-fields.png`,
  `explore/gaps/41-ideas-not-carried-reason.png`

### ED-2 · Every help tooltip also appears in the top-left corner (Low)

- **What happens:** Hovering an (i) icon shows the tooltip next to the icon. A second copy appears in the top-left
  corner, over the logo and the workshop-name field.
- **Where:** Throughout the advanced editor. Examples: Settings > Guided Setup > Flow type (i); Themes > Max Theme
  Selections (i); Settings > Scheduling > Start Date (i).
- **Why it matters:** The copy covers the name field and looks like a rendering fault.
- **Suggested fix:** Render one tooltip, anchored to its icon.
- **Evidence:** `explore/editor/04-settings-flowtype-tooltip.png`, `explore/editor/44-themes-tooltip-max-selections.png`,
  `explore/gaps/57-editor-scheduling-help.txt` (the tooltip text appears twice)

### ED-3 · Image pickers list every image in the organisation, and some are rotated (Low)

- **What happens:** The "Choose an image" picker for the card image lists all 270 images uploaded in the
  organisation, over 12 pages. They include photos from other workshops and indoor shots, and there is no filter by
  workshop or library. Several thumbnails are sideways or upside down. The Custom Logo "Browse existing images"
  picker shows the same rotation, and its images have no names.
- **Where:** Advanced editor > Settings > Basic Info > Preview Image > Library. App settings > Custom Logo > Browse
  existing images.
- **Why it matters:** The right picture is hard to find, and rotated thumbnails look broken.
- **Suggested fix:** Open the picker on the workshop's linked libraries, with a filter or search. Apply the photos'
  EXIF orientation when making thumbnails.
- **Evidence:** `explore/editor/12-settings-preview-image-library.png`, `explore/org/04-custom-logo-browse-existing.png`

### ED-4 · Two different library lists, with no sign of which ones are linked (Low)

- **What happens:** The Image Libraries tab lists 12 libraries. The "Add Library" picker in Image & Transform lists
  18, including 6 marked "Global" (CoPlanAI Library Places, Objects, Sketches…). The Image Libraries tab does not
  show which libraries this workshop uses.
- **Where:** Advanced editor > Image Libraries. Also Image & Transform > Library > + Add Library.
- **Why it matters:** Organisers cannot tell which pictures participants will see, or where the Global libraries
  come from.
- **Suggested fix:** Show one list, with a "Linked to this workshop" marker and a Global or Organisation label.
- **Evidence:** `explore/editor/30-image-libraries.png`, `explore/editor/53-image-transform-add-library-picker.png`

### ED-5 · Deleting a question or answer option is instant, with no undo (Low)

- **What happens:** The trash icon on a question card deletes the question immediately. The X on an answer option
  does the same. No confirmation or undo appears, and the editor saves automatically.
- **Where:** Advanced editor > Questions > a question card.
- **Why it matters:** One wrong click loses a question and its drafted options, with no way back.
- **Suggested fix:** Show an undo toast, which suits autosave best, or ask for confirmation.
- **Evidence:** `explore/editor/21-questions-q1-card.png`, `explore/editor/25-questions-add-question.png`

### ED-6 · The Questions page shows every question twice (Low)

- **What happens:** The page shows the visual question cards. Under ADVANCED SETTINGS it then shows a second full
  form for the same 9 questions and the splash screen. The page becomes very long.
- **Where:** Advanced editor > Questions.
- **Why it matters:** It is unclear which copy to edit, and there is a lot of scrolling.
- **Suggested fix:** Keep one editor, or collapse Advanced settings by default.
- **Evidence:** `explore/editor/20-questions-top.png`, `explore/editor/23-questions-advanced-settings.png`,
  `explore/editor/questions-fulltext.txt`

### ED-7 · The welcome card in the Questions preview cuts the subtitle mid-word (Low)

- **What happens:** The editable welcome card shows "This square. What could it become? Say what you would notic",
  cut off. The phone preview next to it shows the full text.
- **Where:** Advanced editor > Questions > Welcome card.
- **Why it matters:** The organiser cannot see or check the whole subtitle while editing it.
- **Suggested fix:** Wrap the subtitle onto more lines.
- **Evidence:** `explore/editor/20-questions-top.png`

### ED-8 · The "Desktop" preview is a small thumbnail (Low)

- **What happens:** In Desktop mode the preview panel shows a small, scaled-down thumbnail. The caption below it
  says "The real workshop, at real device size".
- **Where:** Advanced editor > Preview panel > Desktop.
- **Why it matters:** The desktop layout cannot be checked here, and the caption promises something else.
- **Suggested fix:** Scale the preview to the panel width, or change the caption and point to the full-size
  "Preview" button in the top bar.
- **Evidence:** `explore/editor/96-preview-desktop.png`

### ED-9 · The AI Customization tab has no header, and its preview shows the wrong step name (Low)

- **What happens:** Every other tab starts with a titled header (for example "Drawing — Participants draw on their
  selected image…"). AI Customization starts straight with the Image Model card. Its preview shows the step name
  "5 Draw your idea" above the prompt screen ("Write your own prompt below to start generating").
- **Where:** Advanced editor > AI Customization.
- **Why it matters:** Without a header, the organiser gets no summary of what the tab controls, and the wrong step
  name in the preview is confusing.
- **Suggested fix:** Add a header like the other tabs. Make the preview's step name match the screen it shows.
- **Evidence:** `explore/editor/60-ai-customization-top.png`, `explore/editor/61-ai-customization-open-1.png`,
  `explore/editor/55-draw-top.png` (a normal header, for comparison)

### ED-10 · The deprecated "Legacy AI Guidance" section is still shown (Low)

- **What happens:** Settings shows a section called "Legacy AI Guidance — Deprecated — migrate to AI Image
  Customization tab". In our session it did not expand when clicked, so we could not tell whether it holds anything.
- **Where:** Advanced editor > Settings > ORGANISATION & LANGUAGE.
- **Why it matters:** It adds a section the organiser cannot use and invites a migration they cannot carry out.
- **Suggested fix:** Hide the section when it is empty. When it has content, show it with a one-click migration.
- **Evidence:** `explore/editor/03-settings-guided-setup-lower.png`, `explore/editor/14-settings-language.png`

### ED-11 · The "Report" menu item leaves the editor with no way back (Low)

- **What happens:** "Report" opens `/coplanai/settings/reports/my-workshop-30` (App settings > Reports >
  Workshops). The back arrow there goes to the Reports list, not back to the editor.
- **Where:** Advanced editor > INSIGHTS > Report.
- **Why it matters:** An organiser checking the report while editing has to find their own way back to the
  workshop.
- **Suggested fix:** Open the report inside the editor, or add a "Back to editor" link.
- **Evidence:** `explore/editor/90-report-top.png`, `explore/org/24-reports-workshop-drilldown.png`

## Participant app

### PA-1 · A "Public — anyone with the link" workshop still makes every participant sign in (High)

- **What happens:** We opened the Live, Public sandbox link in a browser that was not signed in. We also opened a
  table link (`?group=tablea`). Both show only "Welcome to CoPlanAI — Sign in to continue", with Google, Microsoft
  or an email code, and a language picker. There is no guest option, and the page does not name the workshop. The
  link of a Draft workshop shows the same page, with no hint that the workshop is not published yet.
- **Where:** The participant link `…/coplanai/<slug>` and the table links `…?group=<table>`. Also the card's Publish
  workshop dialog, where Access is "Public — anyone with the link".
- **Why it matters:** Walk-up, street and in-room sessions depend on people joining in seconds. Signing in or
  waiting for an email code is a big point where people give up, and the access label leads organisers to expect no
  sign-in at all. The seat screen's "Seat letters are the whole login at the table" also reads differently when
  everyone has had to sign in first.
- **Suggested fix:** Offer a guest path for Public workshops, for example an anonymous session tied to the device
  and seat. Otherwise, rename the option (for example "Anyone signed in who has the link") and explain the sign-in
  in the Share dialog. Show the workshop's name and status on the sign-in page.
- **Evidence:** `explore/gaps/30-anon-phone-join.png`, `explore/gaps/31-anon-phone-group-link.png`,
  `explore/participant/p00-anonymous-sign-in.png`, `explore/lifecycle/34-copy-publish-access-options.png`

### PA-2 · Street view blanks the whole app when the browser has no WebGL2 (Medium)

- **What happens:** In a browser without WebGL2, choosing "From street view" and then "Open street view" turns the
  whole app into a white page. The page error is "GPUInitializationError: WebGL2 is required to display this map".
  No message and no way back appear. Our test browser has no WebGL2, so we could not test the map itself.
- **Where:** Participant app > step 3, "Which picture do you want to change?" > From street view > Open street view.
- **Why it matters:** Participants whose device or browser lacks WebGL2 are stuck halfway through and have to start
  again.
- **Suggested fix:** Check for WebGL2 before opening the map. If it is missing, show a message and offer the library
  instead. Contain map failures so they cannot blank the whole app.
- **Evidence:** `explore/participant/p17-image-source-streetview.png`, `explore/participant/p18-streetview-map.png`

### PA-3 · Submitting and finishing are hard to find (Medium)

- **What happens:** The result screen's toolbar has seven buttons shown only as icons: Original, AI impact, Touch
  up, Submit, Copy image link, Download and Regenerate. Submit is a share icon. After Submit, only that icon turns
  green with a tick, and nothing says what to do next. "Complete", which leads to the table vote and the end screen,
  appears only inside the ☰ menu, and only after a submission.
- **Where:** Participant app > step 6, Iterate > result toolbar. Also the ☰ menu.
- **Why it matters:** Participants may never submit, or may submit and stop there. Their pictures then never reach
  the gallery, and the table vote does not happen.
- **Suggested fix:** Make Submit a button with a text label. After submitting, show the next step on screen, for
  example "Shared! Continue to your table's vote →", with a visible Continue button.
- **Evidence:** `explore/participant/p27-result.png`, `explore/participant/p40-submit.png`,
  `explore/participant/p42-menu-after-submit.png`

### PA-4 · The closing question cannot be answered (Medium)

- **What happens:** The end screen shows "What would make you stay an hour?" as a heading, with "Thanks for
  participating", but there is no field or button to answer it. A countdown ("59s…") then sends the phone back to the
  intro, and nothing explains the countdown.
- **Where:** Participant app > step 7, Complete. The settings are in Advanced editor > Complete (Title; Auto-restart
  timer, 60 seconds).
- **Why it matters:** The guided setup calls it the question participants are asked, so organisers will expect
  answers, and none are collected. Participants can lose the screen while they are still reading it.
- **Suggested fix:** Either add an answer field and include the answers in the report, or present the question as a
  closing message. Label the timer, for example "Restarting for the next person in 59 s", and add a "Stay" option.
- **Evidence:** `explore/participant/p48-closing.png`, `explore/editor/75-complete-top.png`,
  `scout/caps-41-setup-step8-accepted.png`

### PA-5 · Pen colours do not match the colour legend, and swatches are cut off on phones (Medium)

- **What happens:** The legend under the canvas lists Green, Blue, Orange, Yellow, Grey and Red, with the meanings
  set in Draw > Color meanings. The "Draw on the image" palette instead has red, orange, yellow, green, light blue,
  purple and white, plus black, which is off-screen. It has no grey, and light blue and purple have no meaning. The
  touch-up palette is different again. The legend chips cannot be tapped and do not show what each colour means. On
  a 390 px phone the first swatches are cut off at the left: black and red in draw mode, and the touch-up green,
  which sits at x = −12 px and could not be tapped. The hex colour button is cut off at the right, and the editor
  preview shows it as "#D".
- **Where:** Participant app > step 5, "Draw your idea". Also step 6 > Touch up, and the preview in Advanced
  editor > Draw.
- **Why it matters:** The colour meanings (for example "Red: takes something away") tell the reader how a sketch
  should be understood. Participants cannot pick the documented colours or see what they mean.
- **Suggested fix:** Build the palette from the Color meanings list, with the same colours in the same order. Let a
  tap on a legend chip select that colour and show its meaning. Keep the swatch row inside the screen by wrapping or
  scrolling it.
- **Evidence:** `explore/participant/p52-draw-method.png`, `explore/participant/p36-touch-up.png`,
  `explore/editor/55-draw-top.png`

### PA-6 · The gallery in the participant menu does not fit a phone (Medium)

- **What happens:** ☰ > Gallery opens the organiser-style live gallery in a new tab. On a 390 px phone, the
  breadcrumb and toolbar (image count, Download all, Spotlight/Tiles, IMPACT, account) are pushed off-screen to the
  right. The filter row overflows, and the caption overlaps the author and time label. The organisation gallery has
  the same problems on a phone.
- **Where:** Participant app > ☰ > Gallery (`/gallery?mode=interactive`). Also the organisation gallery on a phone.
- **Why it matters:** It is the only gallery participants can reach from the app, and they use phones.
- **Suggested fix:** Give participants a small-screen gallery (picture, reactions, previous/next) without the
  organiser tools.
- **Evidence:** `explore/participant/p57-gallery.png`, `explore/org/p64-phone-gallery.png`

### PA-7 · The step indicator shows the wrong step (Low)

- **What happens:** On a phone, the header reads "3 Select Image" on the "Pick your seat" screen. It reads the same
  again during the table vote ("Pick your three, then seal", "Split card"), which comes after step 6. Step 5 is
  called "Transformation", "Choose Theme" or "Draw your idea", depending on the method. "Select Image" is
  capitalised differently from the other steps. The intro and the questionnaire show 9 dots, and then a
  7-segment bar takes over.
- **Where:** Participant app > the step indicator in the header.
- **Why it matters:** Participants cannot tell where they are in the flow or how much is left.
- **Suggested fix:** Give seat choice and the table vote their own labels, or hide the indicator there. Keep the
  step names consistent.
- **Evidence:** `explore/participant/p15-seat-picked.png`, `p43-complete.png`, `p46-round-line-typed.png`,
  `p22-theme.png`, `p52-draw-method.png`, `p56-prompt-typed.png`, `p01-intro.png`

### PA-8 · "Why does this matter to you?" is visible only while the picture is being made (Low)

- **What happens:** The optional line "While it draws — why does this matter to you? One sentence, optional." shows
  on the waiting screen. It disappears when the result arrives, which took about 10–25 s.
- **Where:** Participant app > step 6 (while the picture is being made).
- **Why it matters:** Most participants will not have time to answer, and the reason behind a picture is valuable
  for the report.
- **Suggested fix:** Keep the field on the result screen until the picture is submitted, or ask it at Submit.
- **Evidence:** `explore/participant/p26-gen1-wait0.png`, `explore/participant/p27-result.png`

### PA-9 · ☰ menu: Back skips a step and Language cannot be changed (Low)

- **What happens:** At step 5, ☰ > Back returns to the image library (step 3) instead of the method choice (step 4).
  The ☰ menu's Language row shows "English" as plain text that cannot be changed. The method step (step 4) does not
  show which picture was chosen.
- **Where:** Participant app > ☰ menu. Also step 4, "Choose transformation".
- **Why it matters:** Back loses more progress than expected. A participant who wants another language finds no way
  to switch.
- **Suggested fix:** Make Back go to the previous step. Make Language a selector, since workshops support six
  languages, or remove the row. Show a thumbnail of the chosen picture in step 4.
- **Evidence:** `explore/participant/p54-menu-back.png`, `explore/participant/p13-header-menu.png`,
  `explore/participant/p21-after-library.png`, `explore/gaps/56-editor-language-options.png`

### PA-10 · Saving a comment or copying an image link gives no confirmation (Low)

- **What happens:** After "Save" on a comment, or after "Copy image link", nothing confirms it: no toast. The
  comment icon does not show that a comment exists.
- **Where:** Participant app > result screen > comment icon, and Copy image link.
- **Why it matters:** Participants cannot tell whether the comment was saved or the link was copied, and may repeat
  the action.
- **Suggested fix:** Show a short toast, and a count badge on the comment icon.
- **Evidence:** `explore/participant/p34-comment-typed.png`, `explore/participant/p35-comment-saved.png`,
  `explore/participant/p39-copy-link.png`

### PA-11 · The table vote runs the split round with only one person (Low)

- **What happens:** With only one seat taken, the table vote still runs "Split the table — to the round (1)" and
  "Split card 1 of 1", and asks for a stance and a line.
- **Where:** Participant app > Complete > table vote.
- **Why it matters:** The round only makes sense with other people at the table, so a lone participant goes through
  steps that have no purpose.
- **Suggested fix:** Skip the split round when fewer than two seats have sealed, or explain why it still runs.
- **Evidence:** `explore/participant/p46-round-line-typed.png`, `explore/participant/p47-after-keep.png`

### PA-12 · On desktop, the theme list is squeezed into a small scroll box (Low)

- **What happens:** On desktop, the 10 theme changes sit in a small scroll box beside the picture. The last visible
  row is cut off, and the rest can only be reached by scrolling inside the box, while most of the panel is empty.
- **Where:** Participant app on desktop > step 5, Choose Theme.
- **Why it matters:** Participants may not see every theme on offer.
- **Suggested fix:** Let the list use the full height of the panel, or lay it out as a grid.
- **Evidence:** `explore/participant/d16-theme.png`

## Dashboard & lifecycle

### DL-1 · The two Publish buttons behave differently (Medium)

- **What happens:** The guided setup's header "Publish" asks "Publish this workshop? Participants with the link can
  join once it is live." with no access choice. It makes the workshop Live at once and sets the start date to today.
  The card menu's "Publish workshop" asks for Access (Public or Private) but only publishes. The card then shows
  "Public" with no status tag, and the organiser has to find "Start workshop" in the menu; nothing says a second
  step is needed. "Start workshop" then sets the Start Date to today without saying so.
- **Where:** Guided setup header > Publish. Dashboard card ⋯ > Publish workshop and Start workshop.
- **Why it matters:** From the card, organisers can share a link that does not work yet. From the setup, they go
  live without choosing Public or Private.
- **Suggested fix:** Use one publish dialog everywhere: access level plus "Start now" or "Start on date". Give the
  published-but-not-started state its own tag, for example "Ready".
- **Evidence:** `explore/lifecycle/20-publish-dialog.png`, `21-publish-after-confirm.png`,
  `33-copy-publish-from-card.png`, `35-copy-published-live.png`, `36-copy-card-menu-published.png`,
  `44-copy-start-workshop.png`, `48-copy-editor-live-scheduling.png`

### DL-2 · Status wording and the Publish/Unpublish buttons disagree between screens (Medium)

- **What happens:** The sandbox, published from the guided setup, shows "Published — public access" in Settings >
  Scheduling and an orange "Unpublish" in the guided-setup header. The copy, published from the card and then
  started, showed "Live — active between scheduled dates (public)". Its guided-setup header still showed a green
  "Publish" while it was Live. Once a workshop is Live, the advanced editor's header shows neither Publish nor
  Unpublish. The dashboard calls both workshops "Live".
- **Where:** Settings > Scheduling banner, the guided-setup header, the advanced editor header, and the dashboard
  card.
- **Why it matters:** Organisers cannot read the state reliably. They have no consistent way to take a workshop
  offline: Pause is on the card, and Unpublish is only in one header.
- **Suggested fix:** Use one set of states and labels everywhere. Put the same main control (Publish, Pause or
  Unpublish) in both editor headers.
- **Evidence:** `explore/gaps/57-editor-scheduling-help.png`, `explore/lifecycle/21-publish-after-confirm.png`,
  `48-copy-editor-live-scheduling.png`, `51-copy-guided-header.png`, `23-sandbox-card-menu-published.png`

### DL-3 · A future start date does not make a workshop "Upcoming" (Medium)

- **What happens:** The Start Date help says "Workshop is Live between start and end dates". We set a Live
  workshop's Start Date to 2026-10-15 and it saved. The banner still read "Live — active between scheduled dates
  (public)", and the card stayed Live. The Upcoming tab stayed empty; we found no way to reach that state.
- **Where:** Advanced editor > Settings > Scheduling > Start Date. Dashboard > Upcoming tab.
- **Why it matters:** Organisers who schedule a workshop expect the link to stay closed until the start date.
- **Suggested fix:** Apply the dates as the help describes, so a workshop is Upcoming before its start date.
  Otherwise, say that dates only apply before the first start, and lock the start date once a workshop is Live.
- **Evidence:** `explore/lifecycle/49-copy-start-date-future.png`, `50-dashboard-after-future-start.png`,
  `38-filter-upcoming.png`, `explore/gaps/57-editor-scheduling-help.png`

### DL-4 · Archived cards have no "View report", and there is no Unarchive (Low)

- **What happens:** Archiving warns "This cannot be undone" and says the reports remain accessible. But an archived
  card's menu offers only Go to workshop, Open gallery and Duplicate workshop, with no View report. The report can
  be reached only through App settings > Reports > Workshops.
- **Where:** Dashboard > Show archived > archived card ⋯.
- **Why it matters:** The reports are the main reason to keep an archived workshop, and the card offers no way to
  them.
- **Suggested fix:** Add "View report" to archived cards. Consider an Unarchive that only admins can use.
- **Evidence:** `explore/lifecycle/57-copy-archive-confirm.png`, `58-copy-archived-result.png`,
  `60-archived-copy-card-menu.png`

### DL-5 · The card offers "View report" only after a workshop has ended (Low)

- **What happens:** Live and Paused cards have no report entry. Only the editor's Report tab and App settings >
  Reports lead to the report.
- **Where:** Dashboard card ⋯ for Live and Paused workshops.
- **Why it matters:** Organisers who want to check progress during a workshop have to take a detour to reach the
  report.
- **Suggested fix:** Offer "View report" in every state where the workshop has data.
- **Evidence:** `explore/lifecycle/23-sandbox-card-menu-published.png`, `47-copy-paused-card-menu.png`,
  `08-ended-workshop-card-menu.png`

### DL-6 · The report of an archived, "read-only" workshop can still be edited (Low)

- **What happens:** After we archived the copy, a toast said "The workshop is read-only now". Its report still
  offered "Edit this report", with editable section titles and Hide buttons. We took that capture after archiving.
- **Where:** App settings > Reports > Workshops > the archived workshop > Edit this report.
- **Why it matters:** An archived report that can still change is not a fixed record, which contradicts
  "read-only".
- **Suggested fix:** Decide whether archived reports are frozen. If they are, disable editing; if not, say that
  edits are still allowed.
- **Evidence:** `explore/lifecycle/58-copy-archived-result.png`, `explore/lifecycle/70-copy-report-edit.png`

### DL-7 · An ended and archived workshop still opens its welcome screen for the owner (Low)

- **What happens:** As the owner, opening the ended and archived copy's participant URL shows the welcome screen
  "What this square could be" with a Continue arrow. The editor's preview says "Workshop is closed — Check back later
  or contact the workshop organizer." Visitors who are not signed in get the sign-in page.
- **Where:** The participant URL of an ended or archived workshop. Also Dashboard card ⋯ > Go to workshop.
- **Why it matters:** The owner cannot see what participants will see after the end, and the preview and the live
  page disagree.
- **Suggested fix:** Show the "Workshop is closed" screen every time, with an organiser notice if owners can still
  enter.
- **Evidence:** `explore/lifecycle/66-archived-copy-participant-link.png`, `explore/lifecycle/53-copy-ended-editor.png`

### DL-8 · The "Copied" toast sits behind the Share dialog's backdrop (Low)

- **What happens:** Clicking the URL in the "Scan to enter…" dialog copies it. The "Copied / Workshop link copied"
  toast is drawn beneath the dimmed, blurred backdrop, so in practice it cannot be seen.
- **Where:** Dashboard card ⋯ > Share workshop link.
- **Why it matters:** Organisers cannot tell whether the link was copied.
- **Suggested fix:** Draw the toast above the dialog, or show "Copied" right next to the URL.
- **Evidence:** `explore/lifecycle/07-share-link-copied.png` (the matching `.txt` shows the toast text is in the page)

### DL-9 · It is unclear what the "Published" filter tab includes (Low)

- **What happens:** "Published" showed Public workshops that were Live or not yet started. It left out a Private
  workshop that was Live, and every Paused or Ended public workshop.
- **Where:** Dashboard > Your Workshops > Published tab.
- **Why it matters:** Organisers who use the tab to find their published workshops will miss some of them.
- **Suggested fix:** Rename the tab (for example "Public & open"), or make it show everything that has been
  published. Add a tooltip that explains it.
- **Evidence:** `explore/lifecycle/42-filter-published.png`, `explore/lifecycle/37-filter-live.png`

### DL-10 · An empty status tab shows no empty-state message (Low)

- **What happens:** A status tab with no workshops (Upcoming) shows a blank panel, and the experience cards follow
  directly below it.
- **Where:** Dashboard > Your Workshops > Upcoming.
- **Why it matters:** A blank panel looks like a loading error, and it does not say how to get a workshop into that
  state.
- **Suggested fix:** Add a message such as "No upcoming workshops. Set a future start date in Scheduling to plan
  one."
- **Evidence:** `explore/lifecycle/38-filter-upcoming.png`

### DL-11 · Duplicate works silently and names the copy "… (copy)" (Low)

- **What happens:** "Duplicate workshop" creates the copy at once, with no dialog or toast. The copy is called
  "<name> (copy)", and it can only be renamed by typing in the editor's header field.
- **Where:** Dashboard card ⋯ > Duplicate workshop.
- **Why it matters:** Organisers can miss that a copy was made, and renaming it is not obvious.
- **Suggested fix:** Show a short dialog that asks for the new name, or a toast with a "Rename" action.
- **Evidence:** `explore/lifecycle/24-duplicate-dialog.png`, `explore/lifecycle/28-copy-basic-info.png`

### DL-12 · Cards show "No preview yet" until someone sets a card image by hand (Low)

- **What happens:** The sandbox card shows "No preview yet" even though its gallery holds 3 pictures. Neither the
  guided setup nor the editor prompts for a Description or a Preview Image.
- **Where:** The dashboard card. Also Advanced editor > Settings > Basic Info.
- **Why it matters:** Cards without pictures are hard to tell apart, and the setup never mentions that a card image
  is missing.
- **Suggested fix:** Default the card to the first library image or the latest submitted picture. Add Description
  and card image to the Ready-to-run checklist.
- **Evidence:** `explore/gaps/00-dashboard-now.png`, `explore/lifecycle/35-copy-published-live.png`,
  `explore/editor/10-settings-basic-info.png`

### DL-13 · Accessibility: generic names for dialogs, switches and images (Low)

- **What happens:** Several dialogs expose the heading "Dialog" instead of their visible title: Share workshop
  link, card Publish workshop, Edit theme, the Custom Logo image picker, and the participant's "Where your ideas
  stand". The "Show archived" switch is named "on" whether it is on or off, because it is not linked to its label.
  The guided-setup switches follow the same pattern. The library pictures offered to participants have the alt text
  "Library image 1" to "Library image 4".
- **Where:** Dialogs across the app, Dashboard > Show archived, and the participant library picker.
- **Why it matters:** Screen-reader users hear "Dialog" and "on, switch" with no context. Public-sector clients have
  to meet accessibility requirements.
- **Suggested fix:** Label dialogs with their visible title, and switches with their visible label. Use library
  image titles or captions as alt text.
- **Evidence:** `explore/lifecycle/05-share-link.txt`, `explore/lifecycle/33-copy-publish-from-card.txt`,
  `explore/lifecycle/00-dashboard-top.json`, `explore/lifecycle/59-show-archived-on.json`,
  `scout/caps-30-setup-step4-theme-editor.txt`, `explore/org/04-custom-logo-browse-existing.png`,
  `explore/participant/p50-my-ideas.txt`, `explore/participant/p20-library-selected.json`

## Reports & gallery

### RG-1 · Organisers cannot hide or delete a participant's picture (High)

- **What happens:** The workshop gallery (the organiser's live view) has no control to hide, unsubmit or delete a
  participant's picture. We checked on hover, on right-click, in the Spotlight view and in the page structure.
  Only comments can be deleted, with the trash icon in Comments.
- **Where:** Dashboard card ⋯ > Open gallery or Open live gallery (Spotlight and Tiles views).
- **Why it matters:** In a public session, an offensive or inappropriate picture stays in the shared gallery and on
  any screen that shows it. Organisers need to be able to remove it in seconds.
- **Suggested fix:** Give organisers Hide, Unsubmit and Delete for each picture, with an optional reason and a log
  entry. Add a quick "hide from live view".
- **Evidence:** `explore/gaps/10-gallery-sandbox-spotlight.png`, `explore/gaps/14-gallery-tiles-hover.png`,
  `explore/gaps/16-gallery-comment-thread.png`

### RG-2 · The report shows only part of the questionnaire answers, and they cannot be exported (High)

- **What happens:** Questionnaire answers appear in one place only: report section 11, "What we asked, what you
  said, what we did". For the sandbox it lists 6 of the 9 questions. The participant also answered "How often are
  you on this street?", "When are you usually here?" and "If this street changed, would it change your day?", but
  those answers appear nowhere. There is no view per question and no export, and the "Participants" tile in Raw
  figures does not link to a list.
- **Where:** Report > 11, What happens next > "What we asked, what you said, what we did". Also Raw figures.
- **Why it matters:** Answers the client asked for are collected but cannot be seen or used, while the report looks
  complete.
- **Suggested fix:** List every question, with "nobody answered" where that applies. Add a CSV export of the
  answers, applying the reporting floor where needed.
- **Evidence:** `explore/gaps/24-report-asked-said-explained.png`, `explore/gaps/report-my-workshop-30-full.txt`
  (section 11), `explore/participant/p08-q-how-often.png`, `p09-q-when.png`, `p10-q-change-your-day.png`

### RG-3 · Pictures never submitted are counted as proposals and listed as ideas (Medium)

- **What happens:** One Transform produced 3 variants, and only 1 was submitted. Even so, the report's headline says
  "3 Proposals" and the trade-off table says "Seen 3 times". On the participant's end screen, "Where your ideas
  stand" lists 3 ideas as "Raised".
- **Where:** Report sections 02, 04 and 06. Also the participant end screen > Where your ideas stand.
- **Why it matters:** The figures overstate participation, since every tap on Transform counts as 3 proposals.
  Participants also see ideas they never shared being tracked on the ladder.
- **Suggested fix:** Count submitted pictures as proposals and show variants separately. List only submitted
  pictures in "Where your ideas stand".
- **Evidence:** `explore/gaps/22-report-document.png`, `explore/gaps/26-report-06-gained-given-up.png`,
  `explore/participant/p50-my-ideas.png`, `explore/participant/p40-submit.png`

### RG-4 · "In their own words" quotes the wrong text, and the table-vote line is missing (Medium)

- **What happens:** Section 07, "In their own words — Written by participants while they voted", shows "Benches
  facing the sun would make me stop here." That was the image comment. The line the participant typed in the table
  vote, "Shade and seats turn a tram street into a place to stay.", appears nowhere in the report.
- **Where:** Report > 07, Where people disagreed.
- **Why it matters:** The quote is attributed to the wrong moment. The reasons behind the vote, which the table
  round exists to collect, are lost.
- **Suggested fix:** Fill this block from the lines typed in the table round, and show comments in a block of their
  own.
- **Evidence:** `explore/gaps/27-report-07-disagreed.png`, `explore/gaps/report-my-workshop-30-full.txt`,
  `explore/participant/p46-round-line-typed.png`, `explore/participant/p34-comment-typed.png`

### RG-5 · Figures and badges in the report contradict each other (Medium)

- **What happens:** In the EPW 2026 demo report, section 05, "The vote, in full" says "Backed none of them · 9". Yet
  "Which directions go forward" shows several directions backed by 1 or 2 of the same 9 voters. In the sandbox
  report, section 11, a green "Complete" badge sits next to "0 of the ideas that were not carried have a written
  answer".
- **Where:** Report > 05, What people chose. Also report > 11, What happens next > Where each idea stands.
- **Why it matters:** When two figures next to each other disagree, readers such as clients and councils start to
  doubt every number.
- **Suggested fix:** Check the "backed none" count against the support shown for each direction. When there is
  nothing to answer yet, show "Nothing to answer yet" instead of "Complete".
- **Evidence:** `explore/lifecycle/13-report-05-what-people-chose.png`, `explore/gaps/report-epw-2026-full.txt`
  (section 05), `explore/lifecycle/15-report-11-next.png`, `explore/gaps/report-my-workshop-30-full.txt` (section 11)

### RG-6 · The client-facing report prints example quotes and internal keys (Medium)

- **What happens:** Section 03 prints example sentences in quotation marks: "under-25s were eight per cent of the
  answers and nineteen per cent of Itälahti" and "of the 41 who wanted the parking kept, six live on the street".
  They read like findings. Section 12, on the web and in the PDF, lists internal keys such as
  `choices.set_support` and `consensus.t-placemaking-seats-in-the-sun-and-the-shade`, with the state
  `NotCollected`. A workshop with no activity still prints all 12 sections, with values such as "middle half between
  0 and 0".
- **Where:** Report > 03, What people were invited to propose. Report > 12, How this was made. PDF page 3.
- **Why it matters:** Example numbers can be quoted by mistake in a council document, and internal keys make the
  report look unfinished.
- **Suggested fix:** Label examples clearly ("Example of what this section can show"), or leave them out of the
  printed report. Replace indicator keys with plain-language names. Collapse sections that have no data.
- **Evidence:** `explore/gaps/25-report-03-invited.png`, `explore/gaps/23-report-pdf-page3.png`,
  `explore/lifecycle/16-report-12-how-made.png`, `explore/lifecycle/55-copy-report-empty.png`

### RG-7 · The only export is a ZIP of images with hash file names (Medium)

- **What happens:** "Download all" in the gallery returns a ZIP of JPGs named by hash (for example
  `c41cef6b….jpg`). It holds no prompts, themes, authors, tables, reactions, comments or questionnaire answers. We
  found no CSV or JSON export anywhere else.
- **Where:** Workshop gallery > Download all. Also Reports.
- **Why it matters:** Planners need the material in their own tools, such as GIS, spreadsheets and appendices to
  council papers. Hash file names break the link between a picture and its idea.
- **Suggested fix:** Add a data export (CSV or JSON) with one row per picture. Name image files by workshop, table
  and idea, and include a manifest file in the ZIP.
- **Evidence:** `explore/gaps/10-gallery-sandbox-spotlight.png` (the Download all button). We inspected the ZIP's
  contents locally and then deleted it.

### RG-8 · The PDF document leaves out most of the report (Medium)

- **What happens:** "Save as a document" makes a 3-page PDF with sections 01, 04, 05, 10 and 12, and an empty "Who
  signs this off" block. It leaves out the pictures, the ideas, the trade-offs, the verbatim lines and the "What we
  asked, what you said" table. After a page reload, the button reads "Save as a document" again, so nothing shows
  that a document already exists.
- **Where:** Report header > Save as a document and Open the document.
- **Why it matters:** The PDF is the version people pass around. Without the pictures and the ideas, it does not
  represent the engagement.
- **Suggested fix:** Include every section that is not hidden. After a reload, keep showing "Open the document" with
  the date it was made.
- **Evidence:** `explore/gaps/20-report-save-as-document.png`, `explore/gaps/22-report-document.png`,
  `explore/gaps/23-report-pdf-page2.png`, `explore/gaps/23-report-pdf-page3.png`

### RG-9 · Reactions are counted as votes, but nobody declares or explains that (Low)

- **What happens:** The default reactions are ❤️ 👌 🥱. The report treats them as a ballot: "'❤️', '👌' counts as
  backing it; '🥱' counts as against". It also says the meaning "was read by a model from the labels themselves —
  nobody declared it". The participant screen shows the emoji without saying they count as votes, and the Generation
  settings have no field to declare what each reaction means.
- **Where:** Advanced editor > Generation > Reactions & comments. The participant result screen. Report > 05.
- **Why it matters:** Casual reactions become the vote in a document written for decision makers, and 🥱 ("bored")
  is a weak stand-in for "against".
- **Suggested fix:** Let organisers declare what each reaction means (support, neutral or against) and tell
  participants, for example "❤️ = I'd back this". Consider a clearer default than 🥱.
- **Evidence:** `explore/lifecycle/13-report-05-what-people-chose.png`, `explore/gaps/report-epw-2026-full.txt`
  (section 05), `explore/editor/72-generation-bottom.png`, `explore/participant/p32-reaction-heart.png`

### RG-10 · Charts: unlabelled slices, clipped labels, unexplained totals, no back link (Low)

- **What happens:**
  - Raw figures has no back link of its own; it says "Use your browser's back button to return to it".
  - Its Images-over-time chart for a single day shows one dot and a clipped date label.
  - Its donut charts draw a thin slice with no label ("Steps to sit on").
  - In App settings > Reports, the Reactions breakdown has two unlabelled slivers next to ❤️, 👌 and 🥱.
  - The x-axis labels of "Images by experience" are cut off ("n image from a prompt"), and its bars add up to 833
    against 5,180 images, with no explanation.
  - The Workshops total does not change with the date range.
- **Where:** Report > Raw figures. App settings > Reports > Overview.
- **Why it matters:** Charts that do not add up or cannot be read make people doubt the numbers.
- **Suggested fix:** Add a back link. Label small slices or group them as "Other". Use bars for single-day data.
  Wrap the axis labels. Say what a chart does not count, and apply the date range to every tile or mark the ones it
  does not affect.
- **Evidence:** `explore/lifecycle/17-report-raw-figures.png`, `explore/lifecycle/18-report-raw-figures-charts.png`,
  `explore/org/20-reports-overview-scroll2.png`, `explore/org/20-reports-overview-scroll3.png`,
  `explore/org/19-reports.png`, `explore/org/26-reports-date-filtered.png`

### RG-11 · "My images" is empty for an organiser whose images appear under "All shared images" (Low)

- **What happens:** The gallery opens on Your Gallery > My images, which shows 0 images ("No images found").
  Switching to All shared images shows recent pictures credited to the same account, from the sandbox.
- **Where:** The gallery icon in the header > Your Gallery.
- **Why it matters:** Organisers looking for their own pictures find an empty page and may think they are lost.
- **Suggested fix:** Include workshop pictures in My images, or explain what it covers (for example "images from
  experiences only").
- **Evidence:** `explore/org/40-gallery-loaded.png`, `explore/org/45-gallery-all-shared-spotlight.png`

### RG-12 · The gallery header and filter wording differ from the rest of the app (Low)

- **What happens:** The gallery opens in a new tab. Its breadcrumb shows the lowercase slug "coplanai / Your
  Gallery", and the settings and gallery icons are missing from its header. On desktop, the collapsed filter bar
  reads "Filters — tap to expand". The "All" filter mixes experiences and workshops in one alphabetical list.
- **Where:** The organisation gallery and the workshop gallery.
- **Why it matters:** The gallery feels like a separate product, and the mixed list makes one workshop hard to find.
- **Suggested fix:** Use the app's normal header, and word the bar "Show filters". Group the "All" list under
  Experiences and Workshops.
- **Evidence:** `explore/org/40-gallery-loaded.png`, `explore/org/54-gallery-all-shared-type-options.png`,
  `explore/org/55-gallery-filters-hidden.png`

### RG-13 · In Comments, your own comment is pre-filled in the input (Low)

- **What happens:** In the Comments dialog, if the viewer wrote a comment, the input under the thread is pre-filled
  with it and shows a "Save" button (edit mode). It looks like a box for a new comment.
- **Where:** Gallery > a picture > Comments.
- **Why it matters:** Organisers may overwrite their comment when they meant to add a new one.
- **Suggested fix:** Put an "Edit" action on the comment itself, and keep the input empty for new comments.
- **Evidence:** `explore/gaps/16-gallery-comment-thread.png`

## Organisation settings

### OS-1 · The App settings pages have no back link or breadcrumb (Low)

- **What happens:** Custom Logo, User management, Manage experiences, Reports and AI Image Customization have no back
  link or breadcrumb. The only ways back are the gear icon and the browser's Back button.
- **Where:** App settings > each of its pages.
- **Why it matters:** Admins moving between settings pages have to go through the gear icon every time.
- **Suggested fix:** Add "← App settings" at the top of each page.
- **Evidence:** `explore/org/03-custom-logo.png`, `explore/org/12-add-user-dialog.png`,
  `explore/org/14-manage-experiences.png`, `explore/org/27-ai-image-customization.png`

### OS-2 · Test accounts are mixed with real users and analytics, and there are no bulk actions (Low)

- **What happens:** On page 1 of Participants (25 rows, 10 pages), most rows are "StressTestUser" accounts.
  "StressTestUser" is also second in Reports > Images by user, with 389 images. User management has no bulk select
  or remove.
- **Where:** App settings > User management > Participants. Also App settings > Reports > Overview.
- **Why it matters:** Test data skews the analytics, and cleaning it up means removing accounts one at a time.
- **Suggested fix:** Add bulk actions and a way to mark accounts as test accounts and leave them out of analytics.
- **Evidence:** `explore/org/07-user-management-participants.png`, `explore/org/20-reports-overview-scroll3.png`

### OS-3 · Workshop participants are hard to tell apart (Low)

- **What happens:** In Workshop participants, the role selector is cut off to "Workshop Particip...". Rows show no
  email or workshop, and many are called "Guest". The search placeholder is cut off ("Search by name or email..").
- **Where:** App settings > User management > Workshop participants, and the filters above it.
- **Why it matters:** Admins cannot tell who a row belongs to, or which workshop they joined.
- **Suggested fix:** Show the workshop each person joined and their join date. Widen the role selector and the
  search field.
- **Evidence:** `explore/org/08-user-management-workshop-participants.png`, `explore/org/12-add-user-dialog.png`

### OS-4 · One editor is shown by a raw ID instead of a name (Low)

- **What happens:** One editor appears as `65f088f53a98f2e3269b0357` instead of a name. The same ID is shown as the
  author on that person's workshop cards on the dashboard.
- **Where:** App settings > User management > Editors. Also the dashboard cards.
- **Why it matters:** Other users cannot tell who this person is.
- **Suggested fix:** Fall back to the email or "Unnamed user" when no display name is set.
- **Evidence:** `explore/org/06b-user-management-editors-lower.png`, `explore/lifecycle/59-show-archived-on.png`

### OS-5 · The account that manages users is labelled "Editor" (Low)

- **What happens:** The account we used can open App settings and manage users. It appears in the EDITORS group
  with the label "Editor", including when the list is filtered by workshop. The page groups people into Editors,
  Participants and Workshop participants, with no App admin group, although "App admin" is one of the roles.
- **Where:** App settings > User management.
- **Why it matters:** It is unclear who can change settings and users.
- **Suggested fix:** Show App admins as such, in a group of their own or with a badge.
- **Evidence:** `explore/gaps/55-users-filtered-by-sandbox.png`, `explore/org/06-user-management-editors.png`,
  `explore/org/09-user-filter-role-open.png`

### OS-6 · Manage experiences: truncated titles, two cards that look identical, an unnamed drawer (Low)

- **What happens:** Card titles are cut off, and two cards both read "Generate an image from…" (one is "from a
  prompt", the other "from a sketch"); hovering shows no tooltip. The Experience Settings drawer does not say which
  experience it is editing, and it covers the header icons.
- **Where:** App settings > Manage experiences.
- **Why it matters:** Admins can switch off or reconfigure the wrong experience.
- **Suggested fix:** Wrap the titles, and put the experience's name at the top of the drawer.
- **Evidence:** `explore/org/14-manage-experiences.png`, `explore/org/16-experience-settings.png`

### OS-7 · The library selector is full of auto-created "Uploaded by user" entries (Low)

- **What happens:** In Experience Settings, "Select library..." lists the named libraries followed by 27 entries
  called "Uploaded by user [id:id]". The list opens far to the left of the drawer.
- **Where:** App settings > Manage experiences > gear > Linked libraries.
- **Why it matters:** The libraries admins actually want are buried among entries they cannot identify.
- **Suggested fix:** Hide automatic upload libraries by default, or name them after the person and the date.
- **Evidence:** `explore/org/18-experience-settings-library-options.png`

### OS-8 · The App country list has no search, and "Studio" is not explained (Low)

- **What happens:** "App country" opens a list of about 195 countries, with no search, which opens upwards over the
  settings cards. Its help says "Studio's Focus Area map opens on this country", but "Studio" is not mentioned
  anywhere else in the interface.
- **Where:** App settings > App country.
- **Why it matters:** Picking a country takes long scrolling, and the help text does not say what the setting
  affects.
- **Suggested fix:** Make the list searchable (type to filter), and name the screen it affects in words users see
  elsewhere.
- **Evidence:** `explore/org/01-app-settings-overview.png`, `explore/org/38-app-country-open.png`

### OS-9 · No help link, and no view of AI usage (Low)

- **What happens:** The dashboard, App settings and the account menu have no link to help, documentation or support.
  Nothing shows how much AI generation has been used, although each Transform creates 3 images ("Images per
  generation: 3").
- **Where:** The dashboard, App settings and the account menu. Also Advanced editor > Generation > Images per
  generation.
- **Why it matters:** Organisers cannot find help on their own, or foresee usage when planning a session for 40
  people.
- **Suggested fix:** Add a Help entry to the account menu, and a simple usage figure per workshop and for the app.
- **Evidence:** `explore/org/56-account-menu.png`, `explore/gaps/00-dashboard-now.png`,
  `explore/editor/71-generation-lower.png`, `explore/participant/p26-gen1-wait0.png`

## Copy & translations

We used the interface in English only, so we did not review the translations. The items below are English copy.

### CT-1 · Plurals (Low)

- **What happens:** Singular counts get plural words: "1 people backed it", "all 1 people who took part", "3
  proposals, and the 1 directions", "24 took part, in 1 groups of ten or more", "1 Participants" (on the Reports
  workshop cards) and "1 picture(s) carried".
- **Where:** The engagement report, App settings > Reports > Workshops, and the participant table vote.
- **Why it matters:** These errors sit in documents meant for clients and councils.
- **Suggested fix:** Use proper singular and plural forms (ICU plural rules also cover the other five languages).
- **Evidence:** `explore/gaps/report-my-workshop-30-full.txt`, `explore/lifecycle/10-report-01-mandate.txt`,
  `explore/org/23-reports-workshops-tab-bottom.txt`, `explore/participant/p47-after-keep.png`

### CT-2 · Model names (Low)

- **What happens:**
  - Reports > Images by model and the gallery's model filter show internal IDs (`Gemini25FlashImage`, `Dalle3`,
    `GptImage1`, `Flux1KontextMax`). The settings show friendly names ("Google Gemini 2.5 Flash Image").
  - The Model menu of the dashboard experiences reads "Google Gemini 25 Flash Image", without the dot.
  - That menu also lacks "OpenAI GPT-Image 2", which the workshop editor and Experience Settings do offer.
- **Where:** App settings > Reports, the gallery filters, and the Model menu of a dashboard experience such as
  "Drawing on an image".
- **Why it matters:** The same model appears under different names, so figures are hard to match to settings.
- **Suggested fix:** Show the friendly model names everywhere, and use the same list of models.
- **Evidence:** `explore/org/20-reports-overview-scroll2.png`, `explore/org/53-gallery-models-options.png`,
  `explore/gaps/52-experience-model-menu.png`, `explore/org/17-experience-settings-model-options.png`

### CT-3 · "Replace the default Ikon logo" (Low)

- **What happens:** The Custom Logo page says "Upload a custom logo to replace the default Ikon logo across the
  app." The logo users see is CoPlanAI.
- **Where:** App settings > Custom Logo.
- **Why it matters:** It shows clients the name of the platform underneath, and it names a logo they have never seen.
- **Suggested fix:** "…to replace the CoPlanAI logo across the app."
- **Evidence:** `explore/org/03-custom-logo.png`

### CT-4 · The app-wide AI settings say "in this workshop" (Low)

- **What happens:** On the app-wide AI Image Customization page, the Image Model subtitle reads "AI model used for
  image generation in this workshop". "Main goal of the redesign" and "Image style" are marked required (\*), although
  these are defaults.
- **Where:** App settings > AI Image Customization.
- **Why it matters:** Admins may think they are changing one workshop rather than the whole app.
- **Suggested fix:** Say "…default for all workshops in this app", and drop the asterisks at app level.
- **Evidence:** `explore/org/28-ai-custom-image-model.png`, `explore/org/29-ai-custom-what-should-this-space-feel-like.png`

### CT-5 · The Manage experiences card overpromises (Low)

- **What happens:** The App settings card says "Create, edit, and organize experiences". The page only switches
  experiences on and off and edits them ("Toggle experiences on or off for this app. Click settings to edit.").
- **Where:** The App settings hub > Manage experiences card.
- **Why it matters:** Admins go looking for create and reorder controls that do not exist.
- **Suggested fix:** "Turn experiences on or off and choose their models and libraries."
- **Evidence:** `explore/org/01-app-settings-overview.png`, `explore/org/14-manage-experiences.png`

### CT-6 · "Get started" on two screens in a row (Low)

- **What happens:** The button on the last question is "Get started", and the next screen (Select your group) has
  another "Get started".
- **Where:** Participant app > the last questionnaire question, then step 2, Select group.
- **Why it matters:** Participants have already started, so the second label is confusing.
- **Suggested fix:** Use "Next" on the last question and "Join this table" on the group screen.
- **Evidence:** `explore/participant/p10-q-change-your-day.png`, `explore/participant/p12-group-selected.png`

## Privacy & security

### PS-1 · Participants' account names appear in the gallery despite the anonymity promise (High)

- **What happens:**
  - The seat screen says "Seat letters are the whole login at the table. Nobody's name goes anywhere."
  - Participants must first sign in with Google, Microsoft or an email code (see PA-1).
  - The gallery that participants reach from the ☰ menu shows each picture with the creator's account name and a
    time ("Damiano Cerrone · 11m ago"), and offers an "All creators" filter.
  - The editor's Questions page says "A participant's name is always collected by default (after the welcome
    screen)", but the participant flow never asks for a name.
  - We saw this as the signed-in owner. We could not test with a second participant account.
- **Where:** Participant app > Pick your seat. Participant app > ☰ > Gallery (`/gallery?mode=interactive`).
  Advanced editor > Questions (the info banner).
- **Why it matters:** The app makes an explicit anonymity promise in a public consultation, and data-protection
  rules require telling people accurately what is collected and shown. If other participants can see names from
  sign-in accounts, the promise is broken.
- **Suggested fix:** Decide the rule and make all three places match. Hide creator names in the gallery
  participants can reach (show the table and seat, or nothing), or change the promise. Say plainly which personal
  data is collected and who can see it.
- **Evidence:** `explore/participant/p15-seat-picked.png`, `explore/participant/p57-gallery.png`,
  `explore/participant/p13-header-menu.png`, `explore/editor/20-questions-top.png`, `explore/gaps/30-anon-phone-join.png`

### PS-2 · The report PDF is served from a public asset address (Medium)

- **What happens:** "Save as a document" turns into "Open the document". That link opens the PDF directly from
  `assets.prod.ikon.live/hub/space/…/cloud-file-public/…/…-engagement-report-3b4b8bba.pdf`, a separate domain outside
  the app's sign-in. It loads in a new tab with nothing else needed. The interface shows no expiry and no access
  setting for the file.
- **Where:** App settings > Reports > Workshops > (workshop) > Save as a document, then Open the document.
- **Why it matters:** Engagement reports carry figures about a client's consultation, and links get forwarded.
  Anyone who has the link can read the report.
- **Suggested fix:** Serve documents through signed, expiring links, or check the app session. If links are meant to
  be shareable, say so next to the button.
- **Evidence:** `explore/gaps/20-report-save-as-document.png`, `explore/gaps/22-report-document.png` (the URL is in
  `22-report-document.txt`)

### PS-3 · "Add user" preselects Editor and does not explain the roles (Medium)

- **What happens:** User management > Add user opens an inline panel with Email, Role and Add. Role is preset to
  "Editor". The list offers App admin, Editor, Participant and Workshop Participant, with no description of what each
  role can see or do. Add becomes active as soon as an email is typed.
- **Where:** App settings > User management > Add user.
- **Why it matters:** An invite sent with the default gives more than participant access, and granting a higher role
  takes a single click with no explanation.
- **Suggested fix:** Default to the least powerful role, or require an explicit choice. Add one line describing each
  role, and ask for confirmation before granting App admin.
- **Evidence:** `explore/org/12-add-user-dialog.png`, `explore/org/13-add-user-role-options.png`

---

## Appendix A — Excluded observations

We removed these because they came from our test setup, the captures did not support them, or they were a matter of
taste.

**Caused by our test environment**

- **Connection problems:** a "Reconnecting..." overlay every 10–20 s, lost or late clicks, a picker that would not
  close, "No ActionCallAck received within 10000ms" in the console, and the URL changing while the screen stayed the
  same. Our proxy blocked WebSockets, and several tabs shared one test browser. Loading pages with
  `?ikon-transport=http-poll` or using separate browser contexts made them reliable. One point may still be useful
  to the team: in this environment the automatic fallback did not always recover by itself, so a test on a network
  that blocks WebSockets (for example municipal or venue Wi-Fi) could be worthwhile.
- **Tabs interfering, and a reload restarting the questionnaire:** this happened while several signed-in tabs
  shared one browser's local storage. We did not capture it.
- **The live copy showing as "Draft" once after a reload:** seen a single time, while the connection was degraded.
- **Tooltips appearing late or getting stuck:** a timing effect of the same connection problem. The duplicated
  tooltip is real and kept as ED-2.
- **The single-image "Download" doing nothing:** our automated browser handles downloads differently. "Download
  all" worked, and its contents are covered in RG-7.
- **Blank preview videos in Manage experiences and on the dashboard:** our headless Chromium cannot play the MP4
  codec. A poster image would still help any browser that cannot play the video.
- **Dates shown as mm/dd/yyyy:** these are native date fields, which follow the browser's locale, and our test
  browser was set to en-US.
- **A desktop-style scrollbar on the phone status tabs:** an artefact of phone emulation.
- **The CONTENTS sidebar missing from one report screenshot:** a screenshot artefact; the sidebar was still in the
  page.
- **Phone captures at 2× instead of 3×:** our tooling.

**Not supported by the evidence**

- **"Urban forest" theme missing from the sandbox:** the setup captures show Urban forest ticked at one point, but
  none shows the final confirmed choice, so we cannot rule out our own clicks. The team may want to check the setup
  record of `my-workshop-30`.
- **"How long have you been coming here?" skipped in the participant flow:** our one phone run moved from question
  1 to question 3. But the EPW 2026 demo report shows real answers to this question, so it is not skipped in general,
  and our automated run may have advanced twice.
- **"Liked is 0 for every experience" (Reports > Experiences):** the capture shows 6, 18 and 3 for three
  experiences.
- **Workshop filters listing workshops that are not on the dashboard** ("My workshop 9", "GIZ - demo" and others):
  these are archived workshops, visible with "Show archived", so listing them is expected. Marking them as archived
  in the filter would still help.
- **No confirmation when a Guided Setup field is changed in the editor:** not tested, because we never changed a
  value.
- **Spotlight selection resetting after Escape:** the explorer was not sure it happened.

**A matter of taste or design choice**

- The placement of the red "Archive Workshop" button. It sits in a labelled Danger Zone, and archiving from the card
  asks for confirmation.
- Icon-only buttons: the collapsed editor menu, and the header gallery and gear icons, which have accessible labels.
- The shortened editor header on phones.
- "Open gallery" and "Open live gallery" leading to the same page.
- Theme offering Light and Dark with no "System" option; the profile name being pre-selected.
- Different label sizes among the User management filters.
- Empty space in the report header card.
- The "INSUFFICIENT" verdict on a workshop with no data; it follows the report's own rules.
- "Start workshop" having no confirmation. The date overwrite is kept in DL-1.

**Not about the platform**

- **The contents of the "Helsinki photos" library** (some pictures look like other cities): this is organisation
  content. Its generic alt text is covered in DL-13.
- **Real names and emails in User management and Reports:** our own note about blurring screenshots for the guide.

## Appendix B — Changes our exploration made on the platform

Everything was done as the owner account on 25 September 2026. Nothing was changed outside the two sandbox
workshops. At the start and at the end of the session we checked that all 23 other workshops kept their status,
participant count and "Edited" date.

**"Senate Square 2040 (tutorial demo)", the sandbox (slug `my-workshop-30`): Public · Live**

- Created with the guided setup: Futuring, a square, horizon 2040, Placemaking theme, 8 table groups (Table A–H),
  "Helsinki photos" library and street view. Per the setup's own text, confirming the themes step generates a
  small picture for each theme button.
- **Published** from the guided-setup header. It became Public · Live, with the start date set automatically to
  2026-09-25. **It was left Live**, and its participant link is `https://coplanai.ikonai.app/coplanai/my-workshop-30`.
- **One participant run** by the owner account: all 8 questions shown were answered; it sat at Table A, seat C on a
  phone, and later joined Table B, seat D on desktop without generating anything. **One Transform** (theme "Seats in
  the sun and the shade" on library picture 2) produced **3 AI images**. It reacted ❤️ to variant 2, left the
  comment "Benches facing the sun would make me stop here.", and **submitted variant 2** to the shared gallery. It
  completed the table vote with the line "Shade and seats turn a tram street into a place to stay." and "Keep it".
  The card therefore shows 1 participant, and **one idea** shows as "Raised" in Ideas & Follow-up. No other
  generations were made; drawings and typed prompts were never sent.
- **Engagement report PDF generated** with "Save as a document" (record `3b4b8bba`). It is stored on the platform's
  asset storage. We downloaded it once to inspect it, deleted the local copy, and shared the link with no one.
- Gallery "Download all" was used once. The ZIP was inspected locally and deleted.
- Editor changes that cancel out: a blank question Q10 was added and then deleted, so the 9 original questions
  remain. Group access "Apply to all groups" was switched off and back on. Idea status dialogs were opened with
  "4 · In the brief" and with "Not carried" chosen, then cancelled. An attempt to record "2 · Counted" was blocked
  before it was sent. Nothing was recorded, so the idea is still "Raised". Dropdowns were opened and closed with
  Escape; values were verified unchanged.
- The participant link was opened in visitor sessions with no account (sign-in page only; nothing entered), and
  copied to our local clipboard from the Share dialog. It was sent to no one.

**"Senate Square 2040 (tutorial demo copy)" (slug `senate-square-2040-tutorial-demo-copy`): Ended and Archived**

- Created with Duplicate workshop, then renamed from "… (tutorial demo) (copy)".
- Published from the card (Access: Public), started, paused, started again, given a Start Date of 2026-10-15 (it
  stayed Live), paused and started once more. It was then **ended** on 2026-09-25 (Danger Zone > End workshop).
- Its report was opened and "Edit this report" switched on and off, with nothing hidden or renamed.
- **Archived**, which cannot be undone. It is hidden unless "Show archived" is on.

**Other workshops and settings: viewed only**

- We opened read-only the report and Raw figures of "EPW 2026 demo". We also opened the card menus of EPW 2026 demo,
  EPW 2026 demo (extended) and Copenhagen Demo, without choosing any action except View report.
- App settings (Custom Logo, User management, Manage experiences, Reports, AI Image Customization, App country) were
  viewed only. Nothing was saved, uploaded, invited, removed, re-roled or switched. App country is still "Not set".
- The dashboard's "Drawing on an image" experience was opened, along with its Model menu and library picker. Nothing
  was selected or generated.
- Dashboard filters, sort and "Show archived" were used and set back to All, Newest, Created by all and off. The
  account's profile, language (English) and theme (Light) are unchanged. We never logged out.

**Totals**

- 3 AI images generated, from one Transform.
- 1 picture submitted, with 1 reaction and 1 comment.
- 1 table-vote line.
- 1 report PDF.
- 1 sandbox left Live, and 1 copy ended and archived.
