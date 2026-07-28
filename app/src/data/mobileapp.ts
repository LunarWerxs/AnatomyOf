import type { LanguageDef } from '../lib/types'

// A "concept" entry: renders a live mobile-app mockup (MobileAppMockup.vue).
// Each annotation id matches a `data-region` there.
export const mobileapp: LanguageDef = {
  id: 'mobileapp',
  name: 'Mobile App',
  category: 'concept',
  titleWord: 'Mobile App',
  titleNoun: '',
  article: 'a',
  extensions: [],
  accentHex: '#10b981',
  officialUrl: 'https://m3.material.io/components',
  shikiLang: 'html',
  mockup: 'mobileapp',
  note: 'Mobile apps share a common set of UI patterns (a top app bar, scrollable content, a floating action button, and bottom navigation) that users recognise across platforms.',
  annotations: [
    {
      id: 'status-bar',
      title: 'Status bar',
      body: 'The OS-owned strip showing time, signal, and battery.',
      details:
        'The status bar belongs to the operating system, not the app: it reports the clock, network, and battery at the very top of the screen. Apps do not draw it, but they do choose whether their content draws behind it (edge-to-edge) and whether its icons are light or dark for contrast.\n\nRespecting the "safe area" so content is not hidden under the status bar (and the notch/camera cutout) is a core part of mobile layout. Getting this wrong is the classic "content clipped at the top" bug.',
      learnMore: 'https://developer.apple.com/design/human-interface-guidelines/layout',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'app-bar',
      title: 'App bar (top bar)',
      body: 'The header with the screen title and primary actions.',
      details:
        'The top app bar anchors the current screen: it holds the title, a navigation control (a back arrow or menu "hamburger"), and the most important actions (search, profile, overflow menu). It tells users where they are and what they can do here.\n\nOn Material it is the "top app bar"; on iOS the "navigation bar". It commonly collapses or changes elevation as the content scrolls under it.',
      learnMore: 'https://m3.material.io/components/top-app-bar/overview',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'search',
      title: 'Search bar',
      body: 'An input for filtering or finding content.',
      details:
        'A prominent search field lets users jump straight to what they want instead of scrolling. On content-heavy apps it often sits directly under the app bar or is revealed by a search icon in it.\n\nGood search shows recent queries and suggestions as the user types, and makes the affordance obvious with a magnifier icon and placeholder text.',
      learnMore: 'https://m3.material.io/components/search/overview',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'content',
      title: 'Content area',
      body: 'The scrollable region holding the screen’s main content.',
      details:
        'The content area is the vertically scrolling body between the app bar and the bottom navigation: the feed, list, or detail view the screen exists to show. It is where the majority of interaction happens.\n\nMobile content is designed for one-handed, thumb-driven scrolling, so the most important and tappable items belong within comfortable reach and touch targets stay at least ~44px.',
      learnMore:
        'https://developer.apple.com/design/human-interface-guidelines/layout#Touch-targets',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'card',
      title: 'Card / list item',
      body: 'A tappable unit of content in the list.',
      details:
        'Cards and list items are the repeating building blocks of a mobile feed: each bundles related content (avatar, title, snippet) into a single tappable surface. Consistent structure lets users scan a long list quickly.\n\nThey often support gestures: swipe to archive or delete, long-press to select. Each should have one clear primary tap target and a comfortable touch size.',
      learnMore: 'https://m3.material.io/components/cards/overview',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'fab',
      title: 'Floating action button (FAB)',
      body: 'The prominent circular button for the screen’s main action.',
      details:
        'The FAB is a floating, high-emphasis button that promotes the single most common action on a screen: compose, add, create. It hovers above the content in a fixed spot (usually bottom-right) so it stays reachable while scrolling.\n\nUse at most one FAB per screen and reserve it for a constructive, positive action, never for destructive ones like delete. It is a signature Material Design element.',
      learnMore: 'https://m3.material.io/components/floating-action-button/overview',
      color: 'green',
      side: 'right',
    },
    {
      id: 'snackbar',
      title: 'Snackbar',
      body: 'A brief, auto-dismissing message about an action.',
      details:
        'A snackbar is a short, transient message that slides in at the bottom to confirm an action ("Message archived") and often offers a single undo. It does not interrupt the user, it disappears on its own after a few seconds.\n\nUnlike a dialog it is non-modal and non-blocking. Keep the text short and offer at most one action; use it for lightweight feedback, not critical errors that need acknowledgement.',
      learnMore: 'https://m3.material.io/components/snackbar/overview',
      color: 'indigo',
      side: 'left',
    },
    {
      id: 'bottom-sheet',
      title: 'Bottom sheet',
      body: 'A panel that slides up from the bottom with extra options.',
      details:
        'A bottom sheet is a surface that rises from the bottom edge to present contextual actions or content without leaving the screen: a share menu, a filter panel, a "move to folder" list. A drag handle hints it can be expanded or dismissed by swiping.\n\nModal bottom sheets dim the background and demand a choice; persistent ones coexist with the content. They keep secondary tasks within thumb reach instead of pushing users to a new screen.',
      learnMore: 'https://m3.material.io/components/bottom-sheets/overview',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'bottom-nav',
      title: 'Bottom navigation',
      body: 'The bar of top-level destinations along the bottom.',
      details:
        'Bottom navigation places the app’s three-to-five top-level destinations within thumb reach, each an icon with a label, one highlighted as the current section. It makes switching between the app’s main areas fast and always available.\n\nReserve it for peer destinations (not actions), keep the set small and stable, and always show the labels. Icon-only bars are frequently misread. It is the mobile counterpart to a website’s primary navigation.',
      learnMore: 'https://m3.material.io/components/navigation-bar/overview',
      color: 'rose',
      side: 'left',
    },
  ],
}
