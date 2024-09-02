function webViewHandler(iosCallback, adrCallback) {
	if (getMobileOperatingSystem() === 'iOS') {
		setupWebViewJavascriptBridge(iosCallback);
	} else if (getMobileOperatingSystem() === 'Android') {
		connectWebViewJavascriptBridge(adrCallback);
	}

	/*Obtain the operating system of the mobile terminal ,mobile*/
	function getMobileOperatingSystem() {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		if (/windows phone/i.test(userAgent)) {
			return "Windows Phone";
		}
		if (/android/i.test(userAgent)) {
			return "Android";
		}
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return "iOS";
		}
		return "unknown";
	}

	/*setting page js bridge,mobile*/
	function setupWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
		if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'https://__bridge_loaded__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
	}

	function connectWebViewJavascriptBridge(callback) {
		if (window.Android) { return callback(Android); }
		callback();
	}
}