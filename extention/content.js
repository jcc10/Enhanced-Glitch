// extracted from CodeMirror extension
// this can be generated as a bookmarklet using http://bookmarklets.org/maker/
function addExtention() {
    return new Promise(function(resolve, reject) {
        CodeMirror.defineExtension("autoFormatRange", function (from, to) {
            let cm = this;
            let mode = cm.options.mode;
            if(mode == "text/jsx" || mode == "text/html" || mode == "text/css"){
                let originalCode = cm.getRange(from, to);
                let formattedCode;
                if(mode == "text/jsx"){
                    formattedCode = js_beautify(originalCode);
                } else if(mode == "text/html") {
                    formattedCode = html_beautify(originalCode);
                } else if(mode == "text/css") {
                    formattedCode = css_beautify(originalCode);
                }
                cm.replaceRange(formattedCode, from, to);
                cm.setSelection(from, {line:cm.lineCount()});
            } else {
                // Not supported.
            }
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
        document.querySelector("aside.notifications div.notification.notifyAutosave").innerHTML = "Nice job remembering to save!";
        resolve();
    });
}

function enhanced() {
    console.log("Glitch Enhanced")
}

addExtention()
.then(addKeybindings)
.then(changeSaveMessage)
.then(enhanced)
