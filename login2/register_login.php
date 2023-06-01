<?php
session_start();

$host = 'localhost';
$db = 'piscine';
$user = 'root';
$pass = 'Capoeira55';

$mysqli = new mysqli($host, $user, $pass, $db);

if ($mysqli->connect_error) {
    die('Connection error: ' . $mysqli->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] == 'login') {
            $email = $mysqli->real_escape_string($_POST['email']);
            $password = $_POST['password'];

            $query = "SELECT * FROM utilisateurs WHERE mail='$email'";
            $result = $mysqli->query($query);

            if ($result->num_rows == 1) {
                $user = $result->fetch_assoc();
                if (password_verify($password, $user['mdp'])) {
                    $_SESSION['mail'] = $user['mail'];
                    $_SESSION['nom'] = $user['nom'];
                    $_SESSION['statut'] = $user['statut'];

                    // Direct the user to the appropriate dashboard based on their status
                    if ($_SESSION['statut'] == 'admin') {
                        header("location: admin.php");
                    } else {
                        header("location: load_data.php");
                    }
                } else {
                    $_SESSION['message'] = "Mot de passe incorrect, veuillez réessayer!";
                    header("location: error.php");
                }
            } else {
                $_SESSION['message'] = "Aucun compte n'est associé à cet email!";
                header("location: error.php");
            }
        } elseif ($_POST['action'] == 'register') {
            $nom = $mysqli->real_escape_string($_POST['nom']);
            $email = $mysqli->real_escape_string($_POST['email']);
            $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
            $pseudo = $mysqli->real_escape_string($_POST['pseudo']);
            $statut = $mysqli->real_escape_string($_POST['statut']);

            $query = "SELECT * FROM utilisateurs WHERE mail='$email'";
            $result = $mysqli->query($query);

            if ($result->num_rows == 0) {
                $sql = "INSERT INTO utilisateurs (pseudo, nom, mail, mdp, statut) VALUES ('$pseudo', '$nom', '$email', '$password', '$statut')";
                if ($mysqli->query($sql) === TRUE) {
                    $_SESSION['message'] = "Inscription réussie!";
                    header("location: welcome.php");
                } else {
                    $_SESSION['message'] = "Une erreur est survenue lors de l'inscription.";
                    header("location: error.php");
                }
            } else {
                $_SESSION['message'] = "Cet email est déjà utilisé par un autre compte!";
                header("location: error.php");
            }
        }
    }
}

$mysqli->close();
?>

<!DOCTYPE html>
<html>

<head>
    <title>ECE In - S'Identifier</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" type="text/css" href="login2.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <section class="wrapper">
        <div class="form signup">
            <header>S'inscrire</header>
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
                <input type="text" placeholder="Nom" name="nom" required />
                <input type="text" placeholder="Email" name="email" required />
                <input type="password" placeholder="Mot de Passe" name="password" required />
                <input type="text" placeholder="Pseudo" name="pseudo" required />
                <label for="status">S'inscrire en tant qu':</label>
                <select id="status" name="statut">
                    <option value="basic">Auteur</option>
                    <option value="admin">Admin</option>
                </select>
                <input type="hidden" name="action" value="register">
                <input type="submit" value="S'inscrire" />
            </form>
        </div>

        <div class="form login">
            <header>Se connecter</header>
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
                <input type="text" placeholder="Email" name="email" required />
                <input type="password" placeholder="Mot de passe" name="password" required />
                <input type="hidden" name="action" value="login">
                <input type="submit" value="Se connecter" />
            </form>
        </div>
        <script>
            const wrapper = document.querySelector(".wrapper"),
                signupHeader = document.querySelector(".signup header"),
                loginHeader = document.querySelector(".login header");

            loginHeader.addEventListener("click", () => {
                wrapper.classList.add("active");
            });
            signupHeader.addEventListener("click", () => {
                wrapper.classList.remove("active");
            });
        </script>
    </section>
    <footer>
        <img src="/assets/lf3f.png" alt="logo" id="logo">
        <div class="rubriques">
            <p class="lead">Rubriques</p>
            <ul>
                <li><a href="/Accueil/accueil.html">Accueil</a></li>
                <li><a href="/MonReseau/reseau.html">Mon Réseau</a></li>
                <li><a href="/Vous/vous.html">Vous</a></li>
                <li><a href="/Notifications/notif.html">Notifications</a></li>
                <li><a href="/Messagerie/msg.html">Messagerie</a></li>
                <li><a href="/Emplois/emplois.html">Emplois</a></li>
            </ul>
        </div>
        <div class="contact">
            <p class="lead">Nous contacter</p>
            <ul>
                <li><a href="mailto:ecein75015@gmail.com"><i style="font-size:24px" class="fa">&#xf0e0;</i></a></li>
                <li><a href="tel:+33652971191"><i style="font-size:24px" class="fa">&#xf095;</i></a></li>
                <li><a href="https://www.instagram.com/baelliot_/"><i style="font-size: 24px;" class="fa-brands fa-instagram"></i></a></li>
            </ul>
        </div>
    </footer>
</body>

</html>
