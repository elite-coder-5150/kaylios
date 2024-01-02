create database `kaylios`;
use `kaylios`;

create table 
    `follow_system` (
        `follow_id` int(11) NOT NULL AUTO_INCREMENT primary key,
        `followee` varchar(255) NOT NULL,
        `follower_id` int(11) NOT NULL,
        `follow_date` date NOT NULL
);

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

select u.* from users as u
join follow_systems as follow on u.user_id = follow.follow_id
where follow.follow_id = u.user_id;
