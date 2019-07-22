function browserType() {
    return new Promise(function(resolve, reject) {
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]"
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;

        // Chrome 1 - 71
        var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

        // Blink engine detection
        var isBlink = (isChrome || isOpera) && !!window.CSS;

        if(isFirefox){
            resolve("firefox");
        } else if (isChrome){
            resolve("chrome")
        } else {
            reslove("other");
        }

    });
}

function borwserFull() {
    return  new Promise(function(resolve, reject) {
            var ua= navigator.userAgent, tem,
            M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if(/trident/i.test(M[1])){
                tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                resolve('IE '+(tem[1] || ''));
            }
            if(M[1]=== 'Chrome'){
                tem= ua.match(/\b(OPR|Edge?)\/(\d+)/);
                if(tem!= null) resolve(tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg ', 'Edge '));
            }
            M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
            if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
            resolve(M.join(' '));
    });
}

keyCodes = {
    "chrome":{
        "formatKey": [
            "Ctrl-Q",
            "Cmd-Q",
        ],
        "hintKey": [
            "Ctrl-Space",
        ],
    },
    "firefox":{
        "formatKey": [
            "Ctrl-D",
        ],
        "hintKey": [
            "Ctrl-Space",
        ],
    },
    "other":{
        "formatKey": [
            "Ctrl-Q",
            "Cmd-Q",
        ],
        "hintKey": [
            "Ctrl-Space",
        ],
    },
};

function changeKeycodes(browserType) {
    if(keyCodes[browserType]){
        document.getElementById("formatKey").innerHTML = keyCodes[browserType]["formatKey"][0];
        document.getElementById("hintKey").innerHTML = keyCodes[browserType]["hintKey"][0];
    } else {
        document.getElementById("formatKey").innerHTML = keyCodes["other"]["formatKey"][0];
        document.getElementById("hintKey").innerHTML = keyCodes["other"]["hintKey"][0];
    }
}

borwserFull()
.then(changeKeycodes)
