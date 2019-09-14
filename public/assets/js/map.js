var map;
function initMap() {
    var input = document.getElementById('address');
    map = new google.maps.Map(document.getElementById('addressmap'), {
        center: { lat: -34.397, lng: 150.644 },
        streetViewControl: false,
        zoom: 8
    });
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8904, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631)
    )
    var options = {
        bounds: defaultBounds
    }
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        anchorPoint: new google.maps.Point(0, -29)
    });
    
    addYourLocationButton(map, marker);
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', function () {
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    });

    var geocoder = new google.maps.Geocoder;
    map.addListener('click', function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        marker.setPosition(event.latLng)
        geocodeLatLng(geocoder, map, { lat: lat, lng: lng })
    });

    function geocodeLatLng(geocoder, map, latlng) {
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    //   map.setZoom(11);
                    var address = results[0].formatted_address;
                    document.getElementById('address').value = address;
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    //change default location to user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latlng = new google.maps.LatLng(lat, lng);
        marker.setPosition(latlng)
        map.setZoom(17);
        map.panTo(marker.position);
        geocodeLatLng(geocoder, map, { lat: lat, lng: lng })
    }

    function error(msg) {
        console.log('error: ' + msg);
    }

    function addYourLocationButton(map, marker) {
        var controlDiv = document.createElement('div');

        var firstChild = document.createElement('button');
        firstChild.style.backgroundColor = '#fff';
        firstChild.style.border = 'none';
        firstChild.style.outline = 'none';
        firstChild.style.width = '28px';
        firstChild.style.height = '28px';
        firstChild.style.borderRadius = '2px';
        firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        firstChild.style.cursor = 'pointer';
        firstChild.style.marginRight = '10px';
        firstChild.style.padding = '0';
        firstChild.title = 'Your Location';
        firstChild.setAttribute('type', 'button');
        controlDiv.appendChild(firstChild);

        var secondChild = document.createElement('div');
        secondChild.style.margin = '5px';
        secondChild.style.width = '18px';
        secondChild.style.height = '18px';
        secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
        secondChild.style.backgroundSize = '180px 18px';
        secondChild.style.backgroundPosition = '0 0';
        secondChild.style.backgroundRepeat = 'no-repeat';
        firstChild.appendChild(secondChild);

        google.maps.event.addListener(map, 'center_changed', function () {
            secondChild.style['background-position'] = '0 0';
        });

        firstChild.addEventListener('click', function () {
            var imgX = 0,
                animationInterval = setInterval(function () {
                    imgX = -imgX - 18;
                    secondChild.style['background-position'] = imgX + 'px 0';
                }, 500);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    marker.setPosition(latlng);
                    map.setCenter(latlng);
                    map.setZoom(17);
                    clearInterval(animationInterval);
                    secondChild.style['background-position'] = '-144px 0';
                });
            } else {
                clearInterval(animationInterval);
                secondChild.style['background-position'] = '0 0';
            }
        });

        controlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    }
}