function initMap() {
    // Coordonnées de votre emplacement
    var myLocation = { lat: 48.8566, lng: 2.3522 };

    // Créez une instance de carte et centrez-la sur votre emplacement
    var map = new google.maps.Map(document.getElementById("map"), {
        center: myLocation,
        zoom: 14
    });

    // Ajoutez un marqueur pour votre emplacement
    var marker = new google.maps.Marker({
        position: myLocation,
        map: map,
        title: "Emplacement de l'ECE In."
    });
}

let carousel = document.getElementById('carouselExampleIndicators');
let textCarousel = document.getElementById('textCarousel');
let textItems = textCarousel.querySelectorAll('.carousel-item');

// Sélectionnez tous les items du carousel.
let items = carousel.querySelectorAll('.carousel-item');
let indicators = carousel.querySelectorAll('.carousel-indicators li');

// Pour chaque item du carousel...
items.forEach(function(item, index) {
    // Ajoutez un événement "click" qui rend le texte visible quand on clique sur l'item.
    item.addEventListener('click', function() {
        // Mettre à jour la classe active du carousel
        carousel.querySelector('.active').classList.remove('active');
        item.classList.add('active');

        // Mettre à jour la classe active du texte du carousel
        textCarousel.querySelector('.active').classList.remove('active');
        textItems[index].classList.add('active');

        // Mettre à jour l'indicateur actif
        indicators.forEach(function(indicator) {
            indicator.classList.remove('active');
        });
        indicators[index].classList.add('active');
    });
});

const addIcons = document.querySelectorAll('.add-icon');
addIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        alert('Ajouter un évènement');
    });
});