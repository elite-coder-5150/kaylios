create database `kaylios`;
use `kaylios`;

create table 
    `follow_system` (
        `follow_id` int(11) NOT NULL AUTO_INCREMENT primary key,
        `followee` varchar(255) NOT NULL,
        `follower_id` int(11) NOT NULL,
        `follow_date` date NOT NULL
);

alter table `follow_system`
    drop column `followee`;

create table 
    `users` (
        `user_id` int(11) NOT NULL primary key AUTO_INCREMENT,
        `user_name` varchar(255) NOT NULL,
        `email` varchar(255),
        `pass_hash` varchar(255) NOT NULL,
        `bio` text,
        `profile_picture_url` varchar(255) NOT NULL,
        `joined_date` date
);
use `kaylios`;

select
    u.user_id, 
    u.user_name, 
    u.email, u.bio, 
    u.profile_picture_url, 
    u.joined_date
from follow_system f
join users u on f.follow_id = u.user_id;

use `kaylios`;

create table `relation` (
    `relation_id` int(11) PRIMARY KEY AUTO_INCREMENT,
    `from` bigint(20) not null,
    `to` bigint(20) NOT NULL,
    `status` varchar(1) NOT NULL,
    `since` datetime not null DEFAULT CURRENT_TIMESTAMP()
);
use `kaylios`;
create table `notes` (
    `note_id` int(11)  PRIMARY KEY AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `content` text,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
)

use `kaylios`;
alter table `notes`
    add column `user_id` int(11) after `note_id`;

use `kaylios`;
create table `newsletter` (
    `newsletter_id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `email` varchar(30) NOT NULL,
    `joined_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
)