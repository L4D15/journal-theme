import { SimpleJournalSheet } from './sheets/simple-journal-sheet';

Hooks.once('setup', () => {
    DocumentSheetConfig.registerSheet(JournalEntry, "journal-theme", SimpleJournalSheet, {
      label: "Test Sheet",
      makeDefault: true
    });
});

require('./styles/journal-theme.scss');