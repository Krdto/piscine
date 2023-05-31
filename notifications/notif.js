function lectureNotif() {

    let test = document.getElementsByClassName(".notification");
    if (test.className == "notification alert") {
        test.className = "notifications Lu";
    }
    let html = "<div>Clique sur la notification</div>";
    document.body.innerHTML = html;
    ("<p>La notif a été lue</p>").appendTo(document.contenuNotif);


}

const notifs = [
    {
        id: 1,
        autor: "ECE",
        subject: "Test resumé notif",
        content: "Test texte notification"
    },
    {
        id: 2,
        autor: "ECE2",
        subject: "Test2 resumé notif",
        content: "Test2 texte notification"
    }
]

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

function displayNotif(notification)
{
    const contentNotif = document.querySelector('.notification');
    contentNotif.innerHTML = `<h2>${notifs.subject}</h2>
    <p><strong>From:</strong> ${notifs.autor}</p>
    <p>${notifs.content}</p>`
    ;
        
}

function resumeNotif()
{
    $(".notification").createElement('li');

}

function notifContent() {
    $(".contenuNotif").append('<p>${notifs.subject}</p>');// a afficher dynamiquement
    
}

$(function()
{
    $(".notifications")
})