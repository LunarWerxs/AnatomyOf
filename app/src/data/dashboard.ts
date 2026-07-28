import type { LanguageDef } from '../lib/types'

// A "concept" entry: renders a live analytics-dashboard mockup
// (DashboardMockup.vue). Each annotation id matches a `data-region` there.
export const dashboard: LanguageDef = {
  id: 'dashboard',
  name: 'Dashboard',
  category: 'concept',
  titleWord: 'Dashboard',
  titleNoun: '',
  article: 'a',
  extensions: [],
  accentHex: '#14b8a6',
  officialUrl: 'https://en.wikipedia.org/wiki/Dashboard_(computing)',
  shikiLang: 'html',
  mockup: 'dashboard',
  note: 'A dashboard puts the numbers that matter (and the tools to slice them) on one glanceable screen, so decisions can be made without digging through raw data.',
  annotations: [
    {
      id: 'sidebar',
      title: 'Sidebar navigation',
      body: 'The vertical menu switching between the app’s main sections.',
      details:
        'A persistent left sidebar lists the top-level areas of the product (Overview, Reports, Customers…) and marks the current one. It stays put as content changes, giving users a stable map of where they are and where they can go.\n\nDashboards favour a sidebar over a horizontal nav because they are dense, data-heavy apps used for long sessions. Vertical space is cheap and the extra room lets labels and icons coexist. On narrow screens it typically collapses to icons or a hamburger.',
      learnMore: 'https://m3.material.io/components/navigation-drawer/overview',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'topbar',
      title: 'Top bar',
      body: 'The header with the page title, search, and account menu.',
      details:
        'The top bar names the current view and hosts global controls: search, notifications, and the user/account menu. It is the dashboard’s constant frame, distinct from the sidebar’s section navigation.\n\nKeeping account and global actions here (separate from the data below) means the workspace can change entirely while the controls stay exactly where the user expects them.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'search',
      title: 'Search',
      body: 'A field for jumping straight to a record or metric.',
      details:
        'Global search lets users pull up a specific customer, report, or metric without navigating the hierarchy. In data-heavy tools it is often the fastest path to anything, so it earns a prominent, always-visible spot in the top bar.\n\nGood dashboard search is scoped and typo-tolerant, shows results grouped by type, and supports keyboard shortcuts (a slash or ⌘K) since power users live in these tools all day.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'kpi',
      title: 'KPI / stat card',
      body: 'A single headline number with its trend.',
      details:
        'A KPI card surfaces one key metric big and bold (revenue, active users, churn) usually paired with a comparison to the previous period (▲ 12%). A row of them across the top answers "how are we doing?" in a glance.\n\nThe value should dominate, the delta should be color-coded (green up / red down, but mind that "up" is not always good. Churn rising is bad), and each card should link through to the detail behind the number.',
      learnMore: 'https://en.wikipedia.org/wiki/Performance_indicator',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'chart',
      title: 'Chart',
      body: 'A visualisation showing a metric over time or by category.',
      details:
        'Charts turn rows of numbers into shape (a trend line, a bar comparison, a distribution) so patterns and outliers jump out far faster than a table would allow. Choosing the right chart type for the question (time → line, parts-of-whole → bar/stacked, correlation → scatter) is most of the battle.\n\nLabel the axes, keep the ink-to-data ratio high, and avoid decorative 3D or dual axes that mislead. A chart’s job is an honest, instantly-readable summary, not decoration.',
      learnMore: 'https://en.wikipedia.org/wiki/Chart',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'filter',
      title: 'Filter control',
      body: 'Narrows what the dashboard shows: date range, segment, etc.',
      details:
        'Filters (a date-range picker, a segment dropdown, toggles) let one dashboard answer many questions by scoping the data down. The current filter state should always be visible so users trust what they are looking at.\n\nSensible defaults matter ("last 7 days" beats an empty picker) and applying a filter should update every card and chart consistently, so nothing on screen silently disagrees with the chosen range.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'table',
      title: 'Data table',
      body: 'Rows and columns of the underlying records.',
      details:
        'When users need the exact figures rather than the shape, a table lays records out in sortable, scannable columns. It is the drill-down layer beneath the charts, the "show me the actual rows" view.\n\nGood dashboard tables support sorting and column alignment (numbers right-aligned), keep the header visible while scrolling, and let users export. Dense but legible beats pretty-but-sparse here.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table',
      color: 'indigo',
      side: 'left',
    },
    {
      id: 'row',
      title: 'Table row',
      body: 'A single record across the table’s columns.',
      details:
        'Each row is one entity (a customer, an order, a transaction) with its fields spread across the columns. Consistent alignment lets the eye run down a single column to compare values quickly.\n\nRows are frequently interactive: hovering highlights them, clicking opens a detail view, and row-level actions (edit, delete) appear on hover to avoid cluttering every line at rest.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'pagination',
      title: 'Pagination',
      body: 'Controls for moving through large result sets in pages.',
      details:
        'Pagination breaks a large dataset into pages so the browser only renders a manageable slice at a time, keeping the table fast and the page short. It shows where you are ("1 / 12") and lets you step or jump between pages.\n\nThe alternative (infinite scroll) suits feeds but frustrates tables where users want a stable position and a sense of total size. For record lists, explicit pages usually win.',
      learnMore: 'https://en.wikipedia.org/wiki/Pagination',
      color: 'green',
      side: 'left',
    },
  ],
}
