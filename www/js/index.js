var scanApp = {   
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady);
    },
    onDeviceReady: function () {
        console.log('Received Device Ready Event');
        Log.initialize(app.displayLogLine);
    },
    scan: function () {
        cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $('.scanReceiptMsg').html('16');
                    resetWheel();
                    $('.scanReceiptMsg').html('18');
                    document.getElementById('receiptId').value=result.text;
                    $('.scanReceiptMsg').html('20');
                    $('.amount').hide();
                    $('.preloader-wrapper').show();
                    $('.scanReceiptMsg').hide();
                    $('.scanReceiptMsg').html('24');
                    setTimeout(function () {                            
                        $('.amount').show();
                        $('.preloader-wrapper').hide();
                        $('.scanReceiptMsg').hide();
                    }, 5000);
                    $('.scanReceiptMsg').html('30');
                    //alert("Barcode/QR code data\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
                },
                function (error) {
                    $('.scanReceiptMsg').html('34');
                    $('.scanReceiptMsg').html("Scanning failed: " + error);
                    $('.scanReceiptMsg').html('36');
                },  
                {
                     //preferFrontCamera : true, // iOS and Android
                    // showFlipCameraButton : true, // iOS and Android
                     showTorchButton : true, // iOS and Android
                     torchOn: false, // Android, launch with the torch switched on (if available)
                    // saveHistory: true, // Android, save scan history (default false)
                     prompt : "Place a barcode inside the scan area", // Android
                     resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    // //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                     //orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                     disableAnimations : true, // iOS
                     disableSuccessBeep: false // iOS and Android
                }
        );
    },
};
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
    }
};
