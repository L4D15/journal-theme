
export class SimpleJournalSheet extends JournalSheet {
    name = "SimpleJournalSheet";

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push("journal-theme");
        options.width = 500;
        return options;
    }

    activateEditor(name, options, initialContent) {
        const editor = this.editors[name];

        if (editor ===undefined) return;

        options = foundry.utils.mergeObject(editor.options, options);
        options.setup = this._onEditorSetup;
        options.content_css = "modules/journal-theme/journal-theme.css";

        TextEditor.create(options, initialContent).then((mce) => {
            mce.getBody().classList.add('journal-theme');

            editor.mce = mce;
            editor.changed = false;
            editor.active = true;

            mce.focus();
            mce.on("change", () => (editor.changed = true));
        });
    }

    _onEditorSetup(editor) {
        console.log(`Editor está listo.`);
    }
}