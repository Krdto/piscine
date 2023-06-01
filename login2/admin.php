<?php
session_start();

$host = 'localhost';
$db = 'piscine';
$user = 'root';
$pass = 'Capoeira55';

$mysqli = new mysqli($host, $user, $pass, $db);

if($mysqli->connect_error) {
    die('Connection error: ' . $mysqli->connect_error);
}

// Check if logged in user is an admin
if ($_SESSION['statut'] != 1) {
    $_SESSION['message'] = "Vous devez être un administrateur pour accéder à cette page!";
    header("location: login.php");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Add a new user
    if (isset($_POST['add_user'])) {
        $nom = $mysqli->real_escape_string($_POST['nom']);
        $email = $mysqli->real_escape_string($_POST['email']);
        $pseudo = $mysqli->real_escape_string($_POST['pseudo']);
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $status = $mysqli->real_escape_string($_POST['status']);

        $query = "INSERT INTO utilisateurs (nom, mail, pseudo, mdp, statut) VALUES ('$nom', '$email', '$pseudo', '$password', '$status')";
        if ($mysqli->query($query)) {
            $_SESSION['message'] = "Nouvel utilisateur ajouté!";
        } else {
            $_SESSION['message'] = "Erreur lors de l'ajout d'un utilisateur: " . $mysqli->error;
        }
    }

    // Delete a user by email, pseudo, or nom
    if (isset($_POST['delete_user'])) {
        $email = $mysqli->real_escape_string($_POST['email']);
        $pseudo = $mysqli->real_escape_string($_POST['pseudo']);
        $nom = $mysqli->real_escape_string($_POST['nom']);

        $query = "DELETE FROM utilisateurs WHERE mail='$email' OR pseudo='$pseudo' OR nom='$nom'";
        if ($mysqli->query($query)) {
            $_SESSION['message'] = "Utilisateur supprimé avec succès!";
        } else {
            $_SESSION['message'] = "Erreur lors de la suppression d'un utilisateur: " . $mysqli->error;
        }
    }
}
$mysqli->close();
?>

<html>
<body>
<!-- Display message -->
<?php if (isset($_SESSION['message'])): ?>
<div>
    <?= $_SESSION['message']; ?>
</div>
<?php unset($_SESSION['message']); endif; ?>

<!-- Form for adding a new user -->
<form action="" method="POST">
    <input type="text" name="nom" placeholder="Nom" name="nom" required />
    <input type="text" name="email" placeholder="Email" name="email" required />
    <input type="text" name="pseudo" placeholder="Pseudo" name="pseudo" required />
    <input type="password" name="password" placeholder="Mot de Passe" name="password" required />
    <input type="text" name="role" placeholder="Statut" name="status" required />
    <input type="submit" name="add_user" value="Add User" />
</form>

<!-- Form for deleting a user by email, pseudo, or nom -->
<form action="" method="POST">
<input type="text" name="nom" placeholder="Nom" name="nom" required />
    <input type="text" name="email" placeholder="Email" name="email" required />
    <input type="text" name="pseudo" placeholder="Pseudo" name="pseudo" required />
    <input type="submit" name="delete_user" value="Delete User" />
</form>
</body>
</html>
