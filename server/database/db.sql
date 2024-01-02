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
join users u on f.follow_id = u.user_id

select count(*) as follower_count
from follow_system
where followee = 'darrell parkhouse'