import type { LanguageDef } from '../lib/types'

// A "concept" entry: renders a live settings-page mockup (SettingsMockup.vue).
// Each annotation id matches a `data-region` there.
export const settings: LanguageDef = {
  id: 'settings',
  name: 'Settings Page',
  category: 'concept',
  titleWord: 'Settings Page',
  titleNoun: '',
  article: 'a',
  extensions: ['.html'],
  accentHex: '#8b5cf6',
  officialUrl: 'https://developer.apple.com/design/human-interface-guidelines/settings',
  shikiLang: 'html',
  mockup: 'settings',
  note: 'Well-designed settings pages share a common anatomy (grouped sections, labelled controls, and a clear save action) that helps users find and change options with confidence.',
  annotations: [
    {
      id: 'header',
      title: 'Page header',
      body: 'The title bar that tells users where they are.',
      details:
        'The header names the screen ("Settings") and often adds a one-line description of its scope. It orients users the moment the page loads and anchors the whole layout.\n\nIt frequently also holds the account avatar or a global save state. Keep the title short and match it to the entry point users clicked to get here.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'nav',
      title: 'Category navigation',
      body: 'The list of setting categories that splits a big page into sections.',
      details:
        'Once a settings screen grows past a handful of options, a category list (a sidebar or tabs) breaks it into digestible groups like Account, Notifications, and Privacy. It keeps each panel short and scannable.\n\nMark the current category as selected, and order categories by how often they are used. For long lists, a search box on top beats making users hunt.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'group',
      title: 'Settings group',
      body: 'A titled section that clusters related options together.',
      details:
        'Grouping related settings under a heading (e.g. "Profile", "Notifications") reduces cognitive load: users scan headings, not individual rows. Each group is usually a `<section>` with its own heading.\n\nGood grouping mirrors the user’s mental model, not the database schema. Keep groups focused; if one grows huge, it probably wants to become its own category.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'row',
      title: 'Setting row',
      body: 'A single option: a label paired with its control.',
      details:
        'The atomic unit of a settings page is a row: a descriptive label on one side and the control that changes it on the other. Associating the `<label>` with its control (via `for`/`id`) makes the whole label clickable and readable by screen readers.\n\nConsistent alignment across rows (labels left, controls right) lets users scan down the column and find what they need fast.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'toggle',
      title: 'Toggle / switch',
      body: 'An on/off control for a single binary setting.',
      details:
        'A toggle switch represents an immediate binary choice (on or off) and by convention applies the change instantly, without a separate save. Its state should be obvious at a glance from color and knob position.\n\nUse toggles for independent on/off settings; use checkboxes when options are part of a list being submitted together, and radio buttons for mutually exclusive choices.',
      learnMore: 'https://m3.material.io/components/switch/guidelines',
      color: 'green',
      side: 'right',
    },
    {
      id: 'select',
      title: 'Dropdown / select',
      body: 'A control for choosing one option from a fixed list.',
      details:
        'A select (dropdown) is right when there is one choice among several known, mutually exclusive options: a language, a timezone, a plan. It stays compact by hiding the options until opened.\n\nIf there are only two or three choices, inline radio buttons are often clearer since they show all options at once. Always provide a sensible default.',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'help',
      title: 'Help text',
      body: 'A short hint that clarifies what a setting does.',
      details:
        'Secondary help text under a label explains consequences a user cannot infer from the label alone ("Used across the interface", "Others can see this"). It prevents mistakes without cluttering the primary label.\n\nKeep it to a sentence, tie it to the specific control (via `aria-describedby` for assistive tech), and reserve it for settings whose effect is genuinely unclear.',
      learnMore:
        'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'danger',
      title: 'Danger zone',
      body: 'A visually separated area for destructive, irreversible actions.',
      details:
        'Destructive actions (delete account, revoke access, reset data) are corralled into a visually distinct "danger zone", usually with red accents and separation from everyday settings, so they are not triggered by accident.\n\nPair them with a confirmation step (a dialog or a typed confirmation) because they are hard or impossible to undo. Distance and color together signal "think before you click".',
      learnMore: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog',
      color: 'red',
      side: 'left',
    },
    {
      id: 'actions',
      title: 'Action bar',
      body: 'The Save / Cancel buttons that commit or discard changes.',
      details:
        'When settings are saved together rather than instantly, a persistent action bar with primary "Save" and secondary "Cancel" buttons commits or discards the batch. The primary action is visually dominant; cancel is quiet.\n\nDisable Save until something actually changes, and warn before navigating away with unsaved edits. Instant-apply controls like toggles usually sit outside this deferred-save flow.',
      learnMore: 'https://m3.material.io/components/buttons/guidelines',
      color: 'amber',
      side: 'right',
    },
  ],
}
