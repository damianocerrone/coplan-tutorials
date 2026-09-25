/* CoPlanAI platform guide: Chapter 6: After the workshop. */
/*
 * Coordinates are fractions (0..1) of each 2400x1200 screenshot, origin top-left:
 *   highlight.box = [x, y, w, h]   the area to spotlight (hugs the element with a small margin)
 *   cursor.at     = [x, y]         where the pointer TIP lands; click: true plays the tap animation
 *   zoom          = [x, y, w, h]   2:1 region to zoom into (w === h keeps the 2:1 aspect); omit for the full view
 *   highlight.side = "above" | "left below" | …   optional: the side(s) to try first for the label pill
 * Every box and cursor point was checked by drawing it on the screenshot.
 * img/6-10-idea-evidence.webp is a composite: two states of the same dialog, cropped and set side by side.
 */
window.COPLAN_TUTORIAL.chapters.push({
  id: "after-the-workshop",
  title: "After the *workshop*",
  summary: "Review the pictures and comments, read and share the engagement report, follow up every idea, then run the workshop again or archive it.",
  steps: [
    {
      id: "workshop-gallery",
      title: "Review the workshop gallery",
      lead: "The gallery gathers every picture made in the workshop, in one place. Open it while the workshop runs, or afterwards, to see what people imagined.",
      image: "img/6-01-gallery.webp",
      url: "coplanai.ikonai.app",
      alt: "The workshop gallery in Spotlight view: a breadcrumb with the workshop name, a picture counter, Download all, Spotlight and Tiles buttons, a bar of filters, one large AI-generated street picture with a reaction bar, and a filmstrip of three thumbnails.",
      beats: [
        {
          html: "Choose <strong>Open gallery</strong> in the workshop's <strong>&bull;&bull;&bull;</strong> menu, or <strong>Open live gallery</strong> while it's Live. It opens in a new tab, and the counter shows how many pictures there are.",
          highlight: { box: [0.6886, 0.0045, 0.0336, 0.0499], label: "Pictures" },
          zoom: [0.5, 0, 0.5, 0.5]
        },
        {
          html: "<strong>Spotlight</strong> shows one picture large, latest first. Its caption says how it was changed, here with the theme button <em>Seats in the sun and the shade</em>; the other corner says who made it and when.",
          highlight: { box: [0.0084, 0.1705, 0.9832, 0.7032], label: "Spotlight" }
        },
        {
          html: "The bar at the bottom of the picture holds its reactions. The speech bubble at the end opens the picture's comments, explained below.",
          highlight: { box: [0.4513, 0.7746, 0.0974, 0.0627], label: "Reactions" },
          cursor: { at: [0.533, 0.806], click: true },
          zoom: [0.29, 0.55, 0.42, 0.42]
        },
        {
          html: "Click <strong>Original</strong> to see the photo the participant started from, handy for showing the room exactly what changed.",
          highlight: { box: [0.8662, 0.1772, 0.0585, 0.0457], label: "Original" },
          cursor: { at: [0.8955, 0.2], click: true },
          zoom: [0.58, 0.02, 0.42, 0.42]
        },
        {
          html: "Switch to <strong>Tiles</strong> to see every picture at once. In Spotlight, step through them with the filmstrip and the arrows at the bottom.",
          highlight: { box: [0.8523, 0.0066, 0.0448, 0.0457], label: "Tiles", side: "below" },
          cursor: { at: [0.875, 0.0295], click: true },
          zoom: [0.58, 0, 0.42, 0.42]
        }
      ]
    },
    {
      id: "gallery-filters",
      title: "Filter and download the pictures",
      lead: "With dozens of people each making several versions, a gallery fills up fast. The filter bar finds the pictures you need.",
      image: "img/6-02-gallery-filters.webp",
      url: "coplanai.ikonai.app",
      alt: "The gallery in Tiles view, filtered to Submitted: the counter reads 1 / 3, the download button reads Download filtered, and a single picture with one heart reaction remains.",
      beats: [
        {
          html: "The gallery shows every picture generated, including versions nobody shared. Set the first filter to <strong>Submitted</strong> to keep only the ideas participants submitted.",
          highlight: { box: [0.0112, 0.0982, 0.0667, 0.0457], label: "Submitted", side: "below" },
          cursor: { at: [0.045, 0.121], click: true },
          zoom: [0, 0, 0.42, 0.42]
        },
        {
          html: "The counter shows what's left: <strong>1 / 3</strong>, one submitted picture out of the three that were made.",
          highlight: { box: [0.66, 0.0045, 0.0447, 0.0499], label: "Counter" },
          zoom: [0.5, 0, 0.5, 0.5]
        },
        {
          html: "Narrow it further by <strong>Reaction</strong>, theme, <strong>Commented</strong>, <strong>Type</strong> (theme change, drawing or prompt), date, or by starting picture with <strong>Source image</strong>.",
          highlight: { box: [0.0782, 0.0982, 0.5186, 0.0457], label: "Filters" },
          zoom: [0, 0, 0.62, 0.62]
        },
        {
          html: "<strong>All creators</strong> and <strong>All groups</strong> pick out one person's or one table's pictures, useful before a table presents its ideas. <strong>Sort by</strong> changes the order.",
          highlight: { box: [0.5971, 0.0982, 0.2243, 0.0457], label: "People and tables", side: "below" },
          cursor: { at: [0.7, 0.121], click: true },
          zoom: [0.38, 0, 0.62, 0.62]
        },
        {
          html: "<strong>Download all</strong> saves the pictures as a ZIP of image files; with a filter on, it reads <strong>Download filtered</strong>. Prompts, names and comments aren't included.",
          highlight: { box: [0.7029, 0.0045, 0.0947, 0.0499], label: "Download", side: "below" },
          cursor: { at: [0.75, 0.0295], click: true },
          zoom: [0.5, 0, 0.5, 0.5]
        }
      ]
    },
    {
      id: "gallery-comments",
      title: "Read and moderate comments",
      lead: "Comments are where participants explain their pictures, or respond to other people's. You can read every thread, and remove a comment that shouldn't be there.",
      image: "img/6-03-gallery-comments.webp",
      url: "coplanai.ikonai.app",
      alt: "The Comments dialog over the gallery: one comment by its author, one hour ago, reading Benches facing the sun would make me stop here, with a bin icon beside it and a comment box with a send arrow below.",
      note: {
        kind: "warning",
        title: "Pictures can't be removed",
        html: "Comments are the only thing you can moderate. The gallery has no way to hide or delete a participant's picture, so look through it before you show it to a room, and filter to <strong>Submitted</strong> to show only the ideas people chose to share."
      },
      beats: [
        {
          html: "Click the speech bubble in a picture's reaction bar to open its <strong>Comments</strong>. Each comment shows who wrote it and when.",
          highlight: { box: [0.3796, 0.4469, 0.2397, 0.1009], label: "Comments" },
          zoom: [0.29, 0.3, 0.42, 0.42]
        },
        {
          html: "Click the bin to delete a comment that shouldn't be there, such as a personal remark about someone in the room.",
          highlight: { box: [0.5849, 0.4595, 0.0249, 0.0499], label: "Delete", side: "right" },
          cursor: { at: [0.5973, 0.4845], click: true },
          zoom: [0.29, 0.3, 0.42, 0.42]
        },
        {
          html: "To add a comment of your own, type in the box and click the arrow. If the comment above is yours, the box holds it for editing instead, as here.",
          highlight: { box: [0.3881, 0.5495, 0.2238, 0.0541], label: "Your comment", side: "below" },
          cursor: { at: [0.5994, 0.5765], click: false },
          zoom: [0.29, 0.3, 0.42, 0.42]
        }
      ]
    },
    {
      id: "engagement-report",
      title: "Open the engagement report",
      lead: "When a workshop has ended, choose <strong>View report</strong> in its <strong>&bull;&bull;&bull;</strong> menu. After a few seconds of <em>Counting the record&hellip;</em> the engagement report opens. You can also open it from the editor's <strong>Report</strong> section, even before the workshop ends.",
      image: "img/6-04-report.webp",
      url: "coplanai.ikonai.app",
      alt: "The engagement report of EPW 2026 demo on the Workshops tab of Reports: Raw figures, Edit this report and Save as a document buttons, the headline verdict that the engagement is insufficient to act on as a public mandate, and a panel with the field window, place, record and sources.",
      beats: [
        {
          html: "The report opens on the <strong>Workshops</strong> tab of <strong>Reports</strong>, in <strong>App Settings</strong>. The arrow beside its title takes you to the list of all your workshop reports.",
          highlight: { box: [0.1741, 0.4781, 0.1014, 0.0539], label: "Report title" },
          cursor: { at: [0.1856, 0.505], click: false },
          zoom: [0.1, 0.26, 0.44, 0.44]
        },
        {
          html: "The headline sums up the report in one sentence. Here, with 24 participants, the engagement was judged <strong>INSUFFICIENT</strong> to act on as a public mandate.",
          highlight: { box: [0.1831, 0.7597, 0.3221, 0.0723], label: "Headline" },
          zoom: [0.1, 0.45, 0.5, 0.5]
        },
        {
          html: "The panel on the right gives the field window, issue date, place, record and data sources. Below them, it explains that every number was counted from the workshop's own record.",
          highlight: { box: [0.6315, 0.6045, 0.1735, 0.3955], label: "About the report", side: "left" },
          zoom: [0.45, 0.45, 0.55, 0.55]
        },
        {
          html: "<strong>Raw figures</strong> shows the plain tally behind the report: participants, images, prompts, reactions, comments and a few charts. Use your browser's back button to return.",
          highlight: { box: [0.5821, 0.4801, 0.0648, 0.0499], label: "Raw figures" },
          cursor: { at: [0.6145, 0.505], click: true },
          zoom: [0.42, 0.26, 0.44, 0.44]
        }
      ]
    },
    {
      id: "report-sections",
      title: "Read the report, section by section",
      lead: "The report is written for the people who have to act on it. Twelve sections take you from the verdict to the method behind every number.",
      image: "img/6-05-report-sections.webp",
      url: "coplanai.ikonai.app",
      alt: "Section 01 of the report, The mandate: an INSUFFICIENT badge, four key figures, and The five checks behind that word with C2 marked Fail; a Contents list of all twelve sections runs down the left.",
      note: {
        kind: "info",
        title: "Why some figures are held back",
        html: "So that nobody can be identified, the report publishes no figure about a group smaller than the <strong>Reporting floor</strong>: 10 people by default. For a small room, lower it in the workshop's settings (see <a href='#editor-settings-organisation'>Settings: folders, reporting and language</a>)."
      },
      beats: [
        {
          html: "Scroll down, or click an entry in <strong>Contents</strong> on the left to jump to a section. The list stays beside you as you read.",
          highlight: { box: [0.1731, 0.1, 0.1239, 0.738], label: "Contents", side: "right" }
        },
        {
          html: "<strong>01 The mandate</strong> comes first: whether the engagement produced a mandate, in one word. Here it's <strong>INSUFFICIENT</strong>. The four key figures below show what the verdict rests on.",
          highlight: { box: [0.3025, 0.108, 0.514, 0.452], label: "The mandate", side: "above" },
          zoom: [0.28, 0.03, 0.56, 0.56]
        },
        {
          html: "<strong>The five checks behind that word</strong> explain the verdict. Here <strong>C2</strong>, <em>Enough people, in enough groups</em>, fails: it needs 30 people and 3 groups.",
          highlight: { box: [0.3145, 0.737, 0.4935, 0.069], label: "C2 fails" },
          zoom: [0.3, 0.45, 0.55, 0.55]
        },
        {
          html: "Sections <strong>02</strong> to <strong>09</strong> cover the ideas people proposed, the brief they were given, who took part, what they chose, trade-offs, disagreements, what's in the pictures and objections.",
          highlight: { box: [0.1731, 0.1765, 0.1239, 0.4891], label: "02 to 09", side: "right" },
          zoom: [0.08, 0.13, 0.56, 0.56]
        },
        {
          html: "<strong>10</strong> lists every figure the report holds back, why, and what would release it, such as more people per group. <strong>11</strong> covers what happens next, and <strong>12</strong> how it was made.",
          highlight: { box: [0.1731, 0.6638, 0.1239, 0.1682], label: "10 to 12", side: "right" },
          zoom: [0.08, 0.44, 0.56, 0.56]
        }
      ]
    },
    {
      id: "report-questionnaire",
      title: "Find the questionnaire answers",
      lead: "If your workshop had a questionnaire, the answers are in section 11, <strong>What happens next</strong>, in the table <strong>What we asked, what you said, what we did</strong>.",
      image: "img/6-06-report-questionnaire.webp",
      url: "coplanai.ikonai.app",
      alt: "Section 11 of the report: the table What we asked, what you said, what we did, with its explanation open, six questions with the answers people gave and their counts, and empty WE DID and WHY boxes.",
      note: {
        kind: "info",
        title: "Only in the report",
        html: "This table is the one place questionnaire answers appear. They aren't part of the gallery download, and the PDF from <strong>Save as a document</strong> leaves this table out."
      },
      beats: [
        {
          html: "Click <strong>11 What happens next</strong> in <strong>Contents</strong>. The section ends with the table <strong>What we asked, what you said, what we did</strong>.",
          highlight: { box: [0.1731, 0.6375, 0.1239, 0.0583], label: "Section 11", side: "right" },
          cursor: { at: [0.215, 0.6665], click: true },
          zoom: [0.1, 0.3, 0.5, 0.5]
        },
        {
          html: "Click the <strong>i</strong> for what the table is: the public record of what the city does with what it heard, filled in after the decision, not before it.",
          highlight: { box: [0.3045, 0.0306, 0.5125, 0.2774], label: "The table" },
          cursor: { at: [0.4933, 0.0541], click: true },
          zoom: [0.28, 0, 0.56, 0.56]
        },
        {
          html: "<strong>WE ASKED</strong> lists each question, and <strong>YOU SAID</strong> the top answers, with how many people gave each one. A question nobody answered says so.",
          highlight: { box: [0.3145, 0.315, 0.3075, 0.378], label: "Questions and answers" },
          zoom: [0.26, 0.18, 0.56, 0.56]
        },
        {
          html: "<strong>WE DID</strong> and <strong>WHY</strong> are left empty on purpose, for your organisation's answer once decisions are made. The report calls it a promise with a date on it.",
          highlight: { box: [0.627, 0.315, 0.183, 0.388], label: "Your answer", side: "left" },
          zoom: [0.4, 0.18, 0.56, 0.56]
        }
      ]
    },
    {
      id: "report-edit",
      title: "Tailor the report",
      lead: "Click <strong>Edit this report</strong> to adapt the report before you share it. A banner explains what you can change, and <strong>Done editing</strong> at the top takes you back to reading.",
      image: "img/6-07-report-edit.webp",
      url: "coplanai.ikonai.app",
      alt: "The report in editing mode: section 01 The mandate with its title and subtitle as editable text fields and a Hide button on the right.",
      beats: [
        {
          html: "Each section's title and subtitle become text fields. Reword them for your readers, for example in plainer language for a public audience.",
          highlight: { box: [0.3036, 0.3772, 0.4675, 0.1298], label: "Title and subtitle", side: "below" },
          cursor: { at: [0.45, 0.4043], click: true },
          zoom: [0.28, 0.2, 0.56, 0.56]
        },
        {
          html: "Click <strong>Hide</strong> to leave a section out: it disappears from the report and from the document you save. The figures themselves can't be edited.",
          highlight: { box: [0.7717, 0.3329, 0.0473, 0.0499], label: "Hide" },
          cursor: { at: [0.795, 0.358], click: true },
          zoom: [0.34, 0.2, 0.56, 0.56]
        }
      ]
    },
    {
      id: "report-document",
      title: "Save the report as a document",
      lead: "When the report says what you need, save it as a PDF to send to colleagues and decision-makers.",
      image: "img/6-08-report-document.webp",
      url: "coplanai.ikonai.app",
      alt: "The report header of Senate Square 2040 (tutorial demo) after saving: the last button has turned green and reads Open the document.",
      note: {
        kind: "info",
        title: "What the document contains",
        html: "The PDF is a short summary, three pages for our demo: the headline figures, sections 01, 04, 05, 10 and 12, and a <em>Who signs this off</em> block. The pictures, the ideas and the questionnaire table stay in the online report. Anyone who has the document's link can open it, so share the link with care."
      },
      beats: [
        {
          html: "Click <strong>Save as a document</strong>, the last of the three buttons. After a moment it turns green and reads <strong>Open the document</strong>, as here: click it to open the PDF in a new tab.",
          highlight: { box: [0.7237, 0.4801, 0.0954, 0.0499], label: "Document", side: "above" },
          cursor: { at: [0.771, 0.505], click: true },
          zoom: [0.44, 0.26, 0.44, 0.44]
        }
      ]
    },
    {
      id: "ideas-follow-up",
      title: "Follow up every idea",
      lead: "The workshop is only half the story: participants want to know what happened to their ideas. In the editor, open <strong>Ideas &amp; Follow-up</strong>, where each shared idea has a card, and click one. Participants see its status under <strong>Where your ideas stand</strong> (see <a href='#journey-closing'>The closing screen</a>).",
      image: "img/6-09-idea-ladder.webp",
      url: "coplanai.ikonai.app",
      alt: "The Where does this idea stand? dialog with its Progress step list open: 1 Raised, 2 Counted, 3 In the vision, 4 In the brief, 5 In a plan and 6 Delivered, the last three marked needs a document, and Not carried, answered with a reason.",
      beats: [
        {
          html: "<strong>Where does this idea stand?</strong> opens on the idea's current step. A newly shared idea is at <strong>1 &middot; Raised</strong>. Open <strong>Progress step</strong> to move it along the ladder.",
          highlight: { box: [0.3754, 0.4811, 0.2492, 0.0499], shape: "rect" },   // no label: above it would cover the dialog title, below it the open list
          cursor: { at: [0.5, 0.506], click: true },
          zoom: [0.29, 0.37, 0.42, 0.42]
        },
        {
          html: "The first three steps, <strong>Raised</strong>, <strong>Counted</strong> and <strong>In the vision</strong>, don't need a document.",
          highlight: { box: [0.3785, 0.5317, 0.1655, 0.1071], label: "Steps 1 to 3", side: "right" },
          zoom: [0.29, 0.37, 0.42, 0.42]
        },
        {
          html: "Steps <strong>4</strong> to <strong>6</strong>, <strong>In the brief</strong>, <strong>In a plan</strong> and <strong>Delivered</strong>, are claims about the real world, so each needs an official document and a named official.",
          highlight: { box: [0.3785, 0.6328, 0.1655, 0.1071], label: "Steps 4 to 6", side: "right" },
          zoom: [0.29, 0.37, 0.42, 0.42]
        },
        {
          html: "<strong>Not carried &mdash; answered with a reason</strong> closes the loop when an idea won't go ahead. You write the reason, and participants see it.",
          highlight: { box: [0.3785, 0.7338, 0.1655, 0.0397], label: "Not carried", side: "right" },
          cursor: { at: [0.43, 0.7537], click: true },
          zoom: [0.29, 0.37, 0.42, 0.42]
        }
      ]
    },
    {
      id: "idea-evidence",
      title: "Record the evidence, or the reason",
      lead: "What the dialog asks for depends on the step you choose. On the left, step 4, <strong>In the brief</strong>; on the right, <strong>Not carried</strong>.",
      image: "img/6-10-idea-evidence.webp",
      url: "coplanai.ikonai.app",
      alt: "Two versions of the Where does this idea stand? dialog side by side: step 4 In the brief with Official document reference and Responsible official fields, and Not carried with a field for The answer, in their words; both end with Cancel and Record it.",
      beats: [
        {
          html: "For steps 4 to 6, fill in the <strong>Official document reference</strong>: the council decision, budget line or adopted plan, by name, number or link.",
          highlight: { box: [0.1036, 0.433, 0.3586, 0.1083], label: "Document" },
          cursor: { at: [0.2, 0.505], click: true },
          zoom: [0.02, 0.22, 0.54, 0.54]
        },
        {
          html: "Then name the <strong>Responsible official</strong> who stands behind the claim, so every real-world claim can be traced to someone accountable.",
          highlight: { box: [0.1036, 0.546, 0.3586, 0.1086], label: "Official" },
          cursor: { at: [0.2, 0.618], click: true },
          zoom: [0.02, 0.22, 0.54, 0.54]
        },
        {
          html: "For <strong>Not carried</strong>, fill in <strong>The answer, in their words</strong>: why the idea won't go ahead. Participants see this answer, so write it for them.",
          highlight: { box: [0.5377, 0.433, 0.3586, 0.1687], label: "The answer" },
          cursor: { at: [0.65, 0.52], click: true },
          zoom: [0.46, 0.22, 0.54, 0.54]
        },
        {
          html: "Click <strong>Record it</strong> to save the new step, or <strong>Cancel</strong> to leave the idea where it was.",
          highlight: { box: [0.757, 0.6076, 0.1363, 0.066], label: "Record it" },
          cursor: { at: [0.857, 0.641], click: true },
          zoom: [0.46, 0.22, 0.54, 0.54]
        }
      ]
    },
    {
      id: "run-again",
      title: "Run the workshop again",
      lead: "To run the same workshop with a new group, duplicate it: choose <strong>Duplicate workshop</strong> in its <strong>&bull;&bull;&bull;</strong> menu. A Draft copy, named after the original with <em>(copy)</em> on the end, appears at the top of your list straight away. Open it with <strong>Edit workshop</strong>.",
      image: "img/6-11-run-again.webp",
      url: "coplanai.ikonai.app",
      alt: "The advanced editor of the copy, named Senate Square 2040 (tutorial demo) (copy), open on Settings: the Guided Setup answers carried over from the original, such as Futuring, A square, Balanced, 2040, Students and People who live here.",
      note: {
        kind: "tip",
        title: "A new link for the new group",
        html: "The copy has its own web address. Share it with <strong>Share workshop link</strong> in the copy's menu, not with the link or QR code you used last time."
      },
      beats: [
        {
          html: "Rename the copy first: click the name at the top, type the new name and press <kbd>Tab</kbd>. It saves straight away.",
          highlight: { box: [0.068, 0, 0.2418, 0.0524], label: "Name", side: "right" },
          cursor: { at: [0.2, 0.025], click: true },
          zoom: [0, 0, 0.5, 0.5]
        },
        {
          html: "The copy keeps the whole setup. Under <strong>Settings</strong>, <strong>Guided Setup</strong> still holds your answers: Futuring, A square, Balanced, 2040, the same audiences and the same session mode.",
          highlight: { box: [0.1463, 0.288, 0.5855, 0.712], label: "Guided Setup" },
          zoom: [0.12, 0.26, 0.74, 0.74]
        },
        {
          html: "The rest of the setup comes across too, including the questions, groups, themes and image sources, so the new session runs just like the last one.",
          highlight: { box: [0.0022, 0.1716, 0.1298, 0.2464], label: "Carried over", side: "right" },
          zoom: [0, 0.08, 0.56, 0.56]
        },
        {
          html: "The copy starts empty: no participants, pictures, ideas, dates or access level. When it's ready, publish and start it as in <a href='#publish-and-share'>Publish, share and run</a>.",
          highlight: { box: [0.8721, 0.0003, 0.0462, 0.0499], label: "Publish", side: "below" },
          cursor: { at: [0.895, 0.025], click: true },
          zoom: [0.5, 0, 0.5, 0.5]
        }
      ]
    },
    {
      id: "archive-workshop",
      title: "Archive a finished workshop",
      lead: "When you've finished with a workshop for good, archive it to keep your list tidy: choose <strong>Archive workshop</strong> in its <strong>&bull;&bull;&bull;</strong> menu and confirm. The card then leaves your list.",
      image: "img/6-12-archived.webp",
      url: "coplanai.ikonai.app",
      alt: "Your Workshops with Show archived switched on: the archived copy's card carries a red Archived tag, and its menu is open with only Go to workshop, Open gallery and Duplicate workshop.",
      note: {
        kind: "warning",
        title: "Archiving is permanent",
        html: "The confirmation says it plainly: <em>This cannot be undone.</em> An archived workshop becomes read-only for good, and there is no way to un-archive it. You can still duplicate it, and its report stays under <strong>App Settings</strong> &rsaquo; <strong>Reports</strong> (see <a href='#org-reports'>Follow usage in Reports</a>)."
      },
      beats: [
        {
          html: "Archived workshops are hidden from your list. Turn on <strong>Show archived</strong> to see them again, among the others in date order.",
          highlight: { box: [0.7128, 0.1266, 0.0894, 0.0415], label: "Show archived", side: "below" },
          cursor: { at: [0.7872, 0.147], click: true },
          zoom: [0.5, 0, 0.5, 0.5]
        },
        {
          html: "Each one carries a red <strong>Archived</strong> tag. It stays read-only, so it can no longer be edited, published or started.",
          highlight: { box: [0.199, 0.43, 0.043, 0.031], label: "Archived", side: "above" },
          zoom: [0.14, 0.28, 0.44, 0.44]
        },
        {
          html: "Its <strong>&bull;&bull;&bull;</strong> menu offers only <strong>Go to workshop</strong>, <strong>Open gallery</strong> and <strong>Duplicate workshop</strong>. To use it again, duplicate it: the copy can be edited as usual.",
          highlight: { box: [0.2704, 0.5108, 0.1074, 0.1236], label: "Archived menu", side: "right" },
          cursor: { at: [0.315, 0.606], click: true },
          zoom: [0.14, 0.28, 0.44, 0.44]
        }
      ]
    }
  ]
});
