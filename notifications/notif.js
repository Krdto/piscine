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

const notifications = [
    {
        id: 1,
        autor: "ECE",
        subject: "Test resumé notif",
        content: "Test texte notification",
        statut: 0 // 0 pour non lu

    },
    {
        id: 2,
        autor: "ECE2",
        subject: "Test2 resumé notif",
        content: "Test2 texte notification",
        statut: 1 // pour lu

    },
    {
        id: 3,
        autor: "ECE3",
        subject: "Test3 resumé notif",
        content: "Test3 texte notification",
        statut: 0 // pour lu
    }
]


$(function () {
    $(".notification").mouseenter(function () {
        //$("#notification").animate({height : "25%"}, "slow")
        //$(".notification").slideUp(2000).slideDown(2000);
    })
    $(".notification").mouseleave(function () {
        //$("#notification").animate({ height: "10%" }, "slow")
    })
    $(".nbNotif").mouseenter(function () {
        $(".nbNotif").nbNotif();
    })

    $("#container").dblclick(function () {
        $(".contenuNotif").css("opacity", "0%");
    }
    )

    $(".notification").click(function () {
        displayNotificationContent(1)// faudra definir le paramètre id pour qu'il récupère quel id de notif c'est
    })

    bulleNotif();
    initNotif();



})


function bulleNotif() {
    let nbNotif = 0;
    const nb = document.querySelector('.nbNotif');
    for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].statut == 0) {
            $(".nbNotif").css("opacity", "100%");
            nbNotif += 1;
        }
    }
    nb.innerHTML = nbNotif;
    //$(".nbNotif").append(`${nbNotif}`);
    //return nbNotif;

    //alert(`le nb de notif est : ${nbNotif}`);
}


function displayNotificationContent(id) {
    const notificationContentDiv = document.querySelector('.contenuNotif');

    const selectedNotification = notifications.find(notification => notification.id === id);
    $(".contenuNotif").css("opacity", "100%");
    notificationContentDiv.innerHTML = `
  <h2><strong>De : </strong>${selectedNotification.autor}</h2>
  <p>${selectedNotification.content}</p>
`;
}

function initNotif() {
    let nbNotif = 0;
    const nb = document.querySelector('.nbNotif');
    const spot = document.querySelector('listeNotif');
    for (let i = 0; i < notifications.length; i++) {

        if (notifications[i].statut == 0) {
            $(".nbNotif").css("opacity", "100%");
            nbNotif += 1;
            notif = document.createElement('div');
            notif.className = 'notification.error';

            let text = document.createTextNode(notifications[i].subject);
            spot.append(text);
            //document.body.appendChild(notif);
            //notif.classList.add(notifications[i].autor);

            notif.innerHTML = `
            <h2><strong>${notifications[i].autor}</strong></h2>
            <p>${notifications[i].subject}</p>
            `

        }

        else if (notifications[i].statut == 1) {
            $(".nbNotif").css("opacity", "100%");
            nbNotif += 1;
            notif = document.createElement('div');
            notif.className = 'notification.Lu';
            notif.innerHTML = `
            <h2><strong>${notifications[i].autor}</strong></h2>
            <p>${notifications[i].subject}</p>
            `

        }
    }
}


function lectureNotif() {

    let test = document.getElementsByClassName(".notification");
    if (test.className == "notification alert") {
        test.className = "notifications Lu";
    }
    let html = "<div>Clique sur la notification</div>";
    document.body.innerHTML = html;
    ("<p>La notif a été lue</p>").appendTo(document.contenuNotif);


}



function selectNotif() {
    const listeNotif = document.querySelector('.listeNotif');
    let nbNotif = count(listeNotif);
    listeNotif.innerHTML = '';

    notifs.forEach(notification => {
        const listItem = document.createElement('li');
        listItem.textContent = notification.subject;
        listItem.addEventListener('click', () => {
            displayNotif(notification);
        });
        listeNotif.appendChild(listItem);
    });
}

function displayNotif(notification) {
    const contentNotif = document.querySelector('.notification');
    contentNotif.innerHTML = `<h2>${notifs.subject}</h2>
        <p><strong>From:</strong> ${notifs.autor}</p>
        <p>${notifs.content}</p>`
        ;

}

function resumeNotif() {
    const resume = document.querySelector('.notification');
    const selectedNotification = notifications.find(notification => notification.id === id);

    resume.innerHTML = `
      <p><strong>${selectedNotification.subject}</strong></p>
    `;
}