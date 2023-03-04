<?php

namespace classes;

class Time {
    public function timeAgo ($time_ago) {
        $time_ago = strtotime($time_ago) ? strtotime($time_ago) : $time_ago;
        $time = time() - $time_ago;
        $time = ($time + 4 * 60 * 60) + 30 * 60;

        switch ($time) {
            case $time <= 60;
                return ($time = 1) ? "just now" : $time." seconds ago";

            case $time >= 60 && $time < 3600;
                return (round($time / 60) == 1) ? "1 minute ago" : round($time / 60)." minutes ago";

            case $time >= 3600 && $time < 86400;
                return (round($time / 3600) == 1) ? "1 hour ago" : round($time / 3600)." hours ago";

            case $time >= 86400 && $time < 604800;
                return (round($time / 86400) == 1) ? "1 day ago" : round($time / 86400)." days ago";

            case $time >= 604800 && $time < 2592000;
                return (round($time / 604800) == 1) ? "1 week ago" : round($time / 604800)." weeks ago";

            case $time >= 2592000 && $time < 31104000;
                return (round($time / 2592000) == 1) ? "1 month ago" : round($time / 2592000)." months ago";
        }
    }

    public function normalTime ($time) {
        $str = strtotime($time);
        return date('DD/MM/YYYY h:i:s a', $str);
    }
}
