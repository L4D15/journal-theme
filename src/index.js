console.log(`Hello, I've been loaded.`);

Hooks.on('init', () => {
    // Register sheet here
    console.log(`Hello world, Journal Theme has been initialized.`);
});

Hooks.on('readu', () => {
    console.log(`Game is ready now, time to use Journal Theme`);
});

require('./styles/journal-theme.scss');