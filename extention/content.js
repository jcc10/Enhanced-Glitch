// extracted from CodeMirror extension
// this can be generated as a bookmarklet using http://bookmarklets.org/maker/
function addExtention() {
    return new Promise(function(resolve, reject) {
        CodeMirror.defineExtension("autoFormatRange", function (from, to) {
            let cm = this;
            let originalCode = cm.getRange(from, to);
            let formattedCode = js_beautify(originalCode);
            cm.replaceRange(formattedCode, from, to);
            cm.setSelection(from, {line:cm.lineCount()});
        });
        resolve();
    });;

};
function formatCode() {
    var totalLines = application.editor().lineCount();
    application.editor().autoFormatRange({line:0, ch:0}, {line:totalLines});
}

function addKeybindings() {
    return new Promise(function(resolve, reject) {
        application.editor().addKeyMap(
            {
        		"Ctrl-Q": formatCode,
        		"Cmd-Q": formatCode
            }
        );
        resolve();
    });
}

function changeSaveMessage() {
    return new Promise(function(resolve, reject) {
        document.querySelector("aside.notifications div.notification.notifyAutosave").innerHTML = "Nice job remembering to save!"
    });
}

addExtention()
.then(addKeybindings)
.then(changeSaveMessage)
.then(()=>console.log("Glitch Enhanced"))
