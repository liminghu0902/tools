
var client = function() {
    
    //内核
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        version: null
    };

    //浏览器
    var browser = {
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        version: null
    };

    //设备、平台、操作系统
    var system = {
        win: false,
        mac: false,
        xll: false,
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false
    };

    //检测内核和浏览器
    var ua = navigator.userAgent;
    if(window.opera) {
        engine.version = browser.version = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.version);
    } else if(/AppleWebKit\/(\S+)/.test(ua)) {
        engine.version = RegExp["$1"];
        engine.webkit = parseFloat(engine.version);
        
        //判断是chrome还是safari
        if(/Chrome\/(\S+)/.test(ua)) {
            browser.version = RegExp["$1"];
            browser.chrome = parseFloat(browser.version);
        } else if(/Version\/(\S+)/.test(ua)) {
            browser.version = RegExp["$1"];
            browser.safari = parseFloat(browser.version);
        } else {
            //近似的确定版本号
            var safariVersion = 1;
            if(engine.webkit < 100) {
                safariVersion = 1;
            } else if(engine.webkit < 312) {
                safariVersion = 1.2;
            } else if(engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }

            browser.safari = browser.version = safariVersion;
        }
    } else if(/KHTML\/(\S+)/.test(ua) || /Konquerror\/([^;]+)/.test(ua)) {
        engine.version = browser.version = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.version);
    } else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.version = RegExp["$1"];
        engine.gecko = parseFloat(engine.version);

        //判断是不是火狐
        if(/Firefox\/(\S+)/.test(ua)) {
            browser.version = RegExp["$1"];
            browser.firefox = parseFloat(browser.version);
        }
    } else if(/MSIE ([^;]+)/.test(ua)) {
        engine.version = browser.version = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.version);
    }

    //检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

    //检测windows操作系统
    if(system.win) {
        if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if(RegExp["$1"] == "NT") {
                switch(RegExp["$2"]) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    default:
                        system.win = "NT";
                        break;    
                }
            } else if(RegExp["$1"] == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }

    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("ipod") > -1;
    system.ipad = ua.indexOf("ipad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;

    //windows mobile
    if(system.win == "CE") {
        system.winMobile = system.win;
    } else if(system.win == "Ph") {
        if(/Windows Phone OS (\d+.\d+)/.test(ua)) {
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }

    //检测iOS
    if(system.mac && ua.indexOf("Mobile") > -1) {
        if(/CPU(?:iPhone)?OS(\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp["$1"].replace("_", "."));
        } else {
            system.ios = 2; //不能检测出来，所以只能猜测
        }
    }

    //检测Android
    if(/Android(\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp["$1"]);
    }

    return {
        engine: engine,
        browser: browser,
        system: system
    }

}();

export { client };