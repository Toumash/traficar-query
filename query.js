// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== "granted")
        Notification.requestPermission();
});

function notifyMe() {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {
        var notification = new Notification('Traficar', {
            icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
            body: "ZNALEZIONO TRAFICARA ZOE w twojej okolizy!",
        });

        notification.onclick = function () {
            window.open("https://www.traficar.pl/booking");
        };
    }
}

function x(call) {
    fetch("https://api.traficar.pl/eaw-rest-api/car?shapeId=5", {
            "credentials": "include",
            "headers": {},
            "referrer": "https://www.traficar.pl/booking",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors"
        })
        .then(json => json.json())
        .then(json => {
            call(json);
        });
}

function refresh() {
    x(json => {
        var electricCars = [];
        for (var i = 0; i < json.cars.length; i++) {
            var car = json.cars[i];
            if (car.model.indexOf("ZOE") !== -1 || car.model.indexOf("zoe") !== -1 || car.model.indexOf("Zoe") !== -1) {
                electricCars.push(car);
            }
        }
        console.error(electricCars);
        if (electricCars.length > 0) {
            notifyMe();
        }

    });
}

setInterval(refresh, 10000);
