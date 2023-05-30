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

var contacts = [{
        name: "Jean Dupont",
        picture: "/assets/images/jdupont.jpg",
        description: "Enseignant en Informatique à l'ECE Paris",
        link: "/user/jdupont",
        friends: [{
                name: "Marie Durand",
                picture: "/assets/images/mdurand.jpg",
                link: "/user/mdurand"
            },
            {
                name: "Pierre Martin",
                picture: "/assets/images/pmartin.jpg",
                link: "/user/pmartin"
            }
        ]
    },
    // ajouter plus de contacts ici...
];

function createContactHTML(contact) {
    var html = '<div class="contact">';
    html += '<a href="' + contact.link + '">';
    html += '<img src="' + contact.picture + '" alt="' + contact.name + '">';
    html += '<h2>' + contact.name + '</h2>';
    html += '<p>' + contact.description + '</p>';
    html += '</a>';
    html += '<div class="friends">';
    for (var i = 0; i < contact.friends.length; i++) {
        var friend = contact.friends[i];
        html += '<a href="' + friend.link + '">';
        html += '<img src="' + friend.picture + '" alt="' + friend.name + '">';
        html += '<h3>' + friend.name + '</h3>';
        html += '</a>';
    }
    html += '</div>';
    html += '</div>';
    return html;
}

var networkDivs = document.getElementsByClassName('network');
for (var i = 0; i < networkDivs.length; i++) {
    var html = '';
    for (var j = 0; j < contacts.length; j++) {
        html += createContactHTML(contacts[j]);
    }
    networkDivs[i].innerHTML = html;
}