<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Error</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .error-message {
            text-align: center;
            background-color: #fee;
            border: 1px solid #f99;
            color: #600;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="error-message">
        <?php 
        session_start();
        if( isset($_SESSION['message']) AND !empty($_SESSION['message']) ): 
            echo $_SESSION['message'];    
        else:
            header( "location: admin.php" );
        endif;
        ?>
    </div>
</body>
</html>
