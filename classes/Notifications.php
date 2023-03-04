<?php

namespace classes;

use classes\FollowSystem\Follow;
use classes\Time;

class Notification
{
    protected $db;
    protected $util;
    protected $avatar;
    protected $time;
    protected $follow;
    protected $group;
    protected $message;
    public function __construct()
    {
        $this->db = new Database();
        $this->util = new Util();
        $this->avatar = new Avatar();
        $this->time = new Time();
        $this->follow = new Follow();
        $this->group = new Group();
        $this->message = new Message();

    }

    public function notifyCount()
    {
        if (isset($_SESSION['id'])) {
            $session = $_SESSION['id'];

            $sql = "SELECT notify_id FROM notifications WHERE notify_to=:session";

            $query = $this->db->prepare($sql);
            $query->execute(array(':session' => $session));

            return $query->rowCount();


        }
    }

    public function unreadCount () {
        if (isset($_SESSION['id'])) {
            $session = $_SESSION['id'];

            $sql = "SELECT notify_id FROM notifications WHERE notify_to=:session AND read='0'";

            $query = $this->db->prepare($sql);
            $query->execute(array(':session' => $session));

            $count = $query->rowCount();

            if ($count != 0) {
                if ($count > 9) {
                    return $count;
                } else {
                    return "+";
                }
            }
        }
    }

    public function titleNotify () {
        if (self::unreadCount() != 0) return "(".self::unreadCount().")";
    }

    public function markRead () {
        $session = $_SESSION['id'];

        $sql = "UPDATE notifications SET status=:status WHERE notify_to=:to";

        $query = $this->db->prepare($sql);
        $query->execute(array(':status' => 1, ':to' => $session));
    }

    public function recommendNotify ($to, $of) {
        $by = $_SESSION['id'];

        $sql = "INSERT INTO notifications (notify_by, notify_to, type, time) VALUES(:by, :to, :of, now())";

        $query = $this->db->prepare($sql);
        $query->execute(array(':by' => $by, ':to' => $to, ':of' => $of));
    }

    public function actionNotify ($to, $post, $type) {
        $by = $_SESSION['id'];

        if ($by == $to) {
            $sql = "INSERT INTO notifications (notify_by, notify_to, type, post_id, time) VALUES(:by, :to, :type, :post, now())";

            $query = $this->db->prepare($sql);
            $query->execute(array(':by' => $by, ':to' => $to, ':type' => $type, ':post' => $post));
        }
    }

    public function clearNotifications () {
        $session = $_SESSION['id'];

        $sql = "DELETE FROM notifications WHERE notify_to=:session";

        $query = $this->db->prepare($sql);
        $query->execute(array(':session' => $session));
    }
    public function notifyFollow($get)
    {
        $session = $_SESSION['id'];

        $sql = "INSERT INTO notifications (notify_by, notify_to, type, time) VALUES(:session, :get, 'follow', now())";

        $query = $this->db->prepare($sql);
        $query->execute(array(':session' => $session, ':get' => $get));

        echo "<div class='alert alert-success'>You are now following " . $this->util->getDetails($get, 'username') . "</div>";
    }

    public function getNotifications($type) {
        $session = $_SESSION['id'];

        if ($type == "follow") {
            echo "<li class='notify'>
                    <div class='profile'>
                        <!-- remove the phoenix backer images -->
                        <img src='img/avatars/' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> is now following you
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            is now following you
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                 </li>
            ";
        }

        if ($type == "friend-request") {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> sent you a friend request
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            sent you a friend request
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'post-comment') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> commented on your post
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            commented on your post
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'post-like') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> liked your post
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            liked your post
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'post-share') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> shared your post
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            shared your post
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'group-invite') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> invited you to join a group
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            invited you to join a group
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'group-join') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> joined your group
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            joined your group
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'group-post') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> posted in your group
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            posted in your group
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'liked-post') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> liked your post
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            liked your post
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'post-dislike') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> disliked your post
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            disliked your post
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'post-comment') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> commented on your post
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            commented on your post
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }
        if ($type == 'comment-like') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> liked your comment
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            liked your comment
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>   
            ";

        }

        if ($type == 'comment-dislike') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> disliked your comment
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            disliked your comment
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>   
            ";
        }

        if ($type == 'comment-reply') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> replied to your comment
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            replied to your comment
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>   
            ";
        }

        if ($type == 'comment-reply-like') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> liked your reply
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            liked your reply
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'accept-request') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> accepted your friend request
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            accepted your friend request
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }

        if ($type == 'friend-request') {
            echo "
                <li>
                    <div class='profile'>
                        <img src='img/avatars/" . $this->avatar->getAvatar($session) . "' alt=''>
                    </div>
                    <div class='notify-body'>
                        <div class='notify-header'>
                            <a href='profile.php?user=" . $this->util->getDetails($session, 'username') . "'>" . $this->util->getDetails($session, 'username') . "</a> sent you a friend request
                        </div>
                        <p class='notify-text'>
                            <strong>
                                <?php echo $this->util->getDetails($session, 'username'); ?>
                            </strong>
                            sent you a friend request
                        </p>
                        <div class='notify-time'>
                            <span class='timeago' title='" . $this->time->timeAgo($this->util->getDetails($session, 'username')) . "'></span>
                        </div>
                    </div>
                </li>
            ";
        }
    }
}
