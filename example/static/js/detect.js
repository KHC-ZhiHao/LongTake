window.detect = {
    inApp: () => {
        let u = navigator.userAgent
        let ua = navigator.userAgent.toLowerCase()
        let isLineApp = u.indexOf('Line') > -1
        let isFbApp = u.indexOf('FBAV') > -1
        let isWeixinApp = !!ua.match(/MicroMessenger/)
        return !!isLineApp || !!isFbApp || !!isWeixinApp || false
    },
    inMobile: () => {
        return inIOS() || inAndroid()
    },
    inIOS: () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    },
    inAndroid: () => {
        let ua = navigator.userAgent.toLowerCase()
        return ua.indexOf('android') > -1
    },
    inSafari: () => {
        let ua = window.navigator.userAgent
        let iOS = !!ua.match(/iP(ad|od|hone)/i)
        let hasSafariInUa = !!ua.match(/Safari/i)
        let noOtherBrowsersInUa = !ua.match(/Chrome|CriOS|OPiOS|mercury|FxiOS|Firefox/i)
        let result = false
        if (iOS) {
            let webkit = !!ua.match(/WebKit/i)
            result = webkit && hasSafariInUa && noOtherBrowsersInUa
        } else if (window.safari !== undefined) {
            result = true
        } else {
            result = hasSafariInUa && noOtherBrowsersInUa
        }
        return result
    }    
}
