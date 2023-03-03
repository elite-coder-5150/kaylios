<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Friend request manager</title>
</head>
<body>
    <?php
        require 'classes/friend-request-system/Relation.php';
        $rel = new \classes\FriendRequestSystem\Relation();
        $user_id = 1;

        if (isset($_POST['req'])) {
            $pass = true;

            switch ($_POST['req']) {
                default:
                    $pass = false;
                    $rel->error = "Invalid request";
                    break;
                case "add":
                    $pass = $rel->request($user_id, $_POST['req']);
                    break;

                case "accept":
                    $pass = $rel->accept($user_id, $_POST['req']);
                    break;

                case "cancel":
                    $pass = $rel->cancel($user_id, $_POST['req']);
                    break;
            }
        }
    ?>
</body>
</html>
