import type { LanguageDef } from '../lib/types'

// A "concept" entry: renders a live email-client mockup (EmailMockup.vue).
// Each annotation id matches a `data-region` there.
export const email: LanguageDef = {
  id: 'email',
  name: 'Email Client',
  category: 'concept',
  titleWord: 'Email Client',
  titleNoun: '',
  article: 'an',
  extensions: [],
  accentHex: '#6366f1',
  officialUrl: 'https://en.wikipedia.org/wiki/Email_client',
  shikiLang: 'html',
  mockup: 'email',
  note: 'Nearly every email client converges on the same three-pane anatomy (folders, a message list, and a reading pane) because it lets you triage a full inbox without ever leaving the screen.',
  annotations: [
    {
      id: 'toolbar',
      title: 'Toolbar',
      body: 'The top bar of actions for the current message or selection.',
      details:
        'The toolbar exposes the verbs of email (archive, delete, reply, mark-as-read) plus global search. It acts on whatever is selected, so its buttons enable and disable as the selection changes.\n\nKeeping destructive actions (delete) slightly apart from everyday ones (archive) reduces misclicks, and the most common action, search, usually gets the most prominent slot.',
      learnMore: 'https://m3.material.io/components/toolbars/overview',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'search',
      title: 'Search',
      body: 'Finds messages across every folder.',
      details:
        'Because inboxes grow without bound, search is often the primary way people actually find mail: by sender, subject, date, or full text. It typically spans all folders, not just the one in view.\n\nStrong mail search supports operators (from:, has:attachment, before:) and instant results as you type, turning "where did that thread go" into a one-second lookup.',
      learnMore: 'https://support.google.com/mail/answer/7190',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'folders',
      title: 'Folder list',
      body: 'The sidebar of mailboxes and labels, with unread counts.',
      details:
        'The left column lists mailboxes (Inbox, Starred, Sent, Drafts) and any custom folders or labels, each showing an unread count so attention goes where it is needed. Selecting one scopes the message list beside it.\n\nInbox sits at the top because it is where triage happens. Some clients use foldering (a message lives in one place) and others labels (a message can carry many), but the navigational role is the same.',
      learnMore: 'https://m3.material.io/components/navigation-drawer/overview',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'compose',
      title: 'Compose button',
      body: 'Starts a brand-new message.',
      details:
        'Compose is the client’s primary creative action, so it gets a high-emphasis, always-visible button (often the only filled/colored one in the sidebar), the email equivalent of a dashboard’s "New" or a mobile app’s FAB.\n\nIt is deliberately separate from Reply and Forward, which act on an existing message; Compose always starts from a blank slate.',
      learnMore: 'https://m3.material.io/components/floating-action-button/overview',
      color: 'green',
      side: 'left',
    },
    {
      id: 'message-list',
      title: 'Message list',
      body: 'The scrollable column of messages in the current folder.',
      details:
        'The middle column lists the selected folder’s messages, newest first, each a compact preview: sender, subject, a snippet, and a timestamp. It is the triage surface where users scan, select, and bulk-act.\n\nUnread messages are visually stronger (bold), the selected one is highlighted, and threaded clients collapse a back-and-forth conversation into a single expandable row to keep the list short.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'message',
      title: 'Message item',
      body: 'A single email’s preview row in the list.',
      details:
        'Each row condenses a message into a scannable summary (who it is from, the subject, a one-line snippet, and when it arrived) so users can judge relevance without opening it. Bold text marks unread; a colored accent marks the currently open one.\n\nRows are gesture-rich: swipe to archive, hover for quick actions, click to open in the reading pane. The snippet in particular saves countless unnecessary opens.',
      learnMore: 'https://en.wikipedia.org/wiki/Conversation_threading',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'reading-pane',
      title: 'Reading pane',
      body: 'The panel that shows the selected message in full.',
      details:
        'The reading pane renders the open message (subject, sender identity, full body, and attachments) beside the list, so users can move through their inbox without navigating away and back. It is why the three-pane layout is so fast to triage in.\n\nIt reveals sender details and security cues (is this really from your bank?), renders the HTML body safely (blocking remote images by default), and anchors the reply actions at the bottom.',
      learnMore: 'https://en.wikipedia.org/wiki/Email_client',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'attachment',
      title: 'Attachment',
      body: 'A file carried along with the message.',
      details:
        'Attachments appear as chips showing the file name, type icon, and size, with actions to preview or download. Surfacing them clearly matters. A missed attachment is a classic email mistake ("oops, forgot to attach the file").\n\nClients preview common types inline (PDFs, images), scan for malware, and warn on risky executables, since attachments are a favourite vector for phishing and malware.',
      learnMore: 'https://en.wikipedia.org/wiki/Email_attachment',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'reply',
      title: 'Reply actions',
      body: 'Reply, Reply All, and Forward for the open message.',
      details:
        'The reply bar turns a received message into the start of the next one: Reply (to the sender), Reply All (to everyone), and Forward (to someone new). They pre-fill recipients and quote the original thread so context carries forward.\n\nReply All deserves respect (it is the source of countless "please stop replying all" storms) so many clients make plain Reply the default and set Reply All slightly apart.',
      learnMore: 'https://en.wikipedia.org/wiki/Email',
      color: 'rose',
      side: 'left',
    },
  ],
}
