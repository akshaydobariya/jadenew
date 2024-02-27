// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDt5nyPsqxPUdIuHOFVJixwB5RG5q-idOg",
    authDomain: "my-demo-5667d.firebaseapp.com",
    projectId: "my-demo-5667d",
    storageBucket: "my-demo-5667d.appspot.com",
    messagingSenderId: "802442928131",
    appId: "1:802442928131:web:996167f16845f984246e36",
    measurementId: "G-P1K66P6YJ1"
};

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
        console.log('Received background message ', payload);

        const notificationTitle = payload.data.data?JSON.parse(payload.data.data):"";
        const notificationOptions = {
            body: notificationTitle.body,
        };

        self.registration.showNotification(notificationTitle.title,
            notificationOptions)
    })
}