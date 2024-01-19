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

alter table `users`
    add column `role` enum ('admin', 'moderator', 'owner', 'user');

alter table `users`
    drop column `pass_hash`;
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
alter table `notes`00
    add column `user_id` int(11) after `note_id`;

use `kaylios`;
create table `newsletter` (
    `newsletter_id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `email` varchar(30) NOT NULL,
    `joined_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

alter table `newsletter`
    add column `user_id` int(11) NOT NULL after `newsletter_id`;

use `kaylios`;
INSERT INTO `users` (`user_name`, `email`, `role`, `bio`, `profile_picture_url`)
VALUES
  ('JohnDoe', 'john.doe@example.com', 'user', 'Bio for John Doe', 'john_doe.jpg'),
  ('AliceSmith', 'alice.smith@example.com', 'user', 'Bio for Alice Smith', 'alice_smith.jpg'),
  ('BobJohnson', 'bob.johnson@example.com', 'user', 'Bio for Bob Johnson', 'bob_johnson.jpg'),
  ('EmilyBrown', 'emily.brown@example.com', 'user', 'Bio for Emily Brown', 'emily_brown.jpg'),
  ('ChrisMiller', 'chris.miller@example.com', 'user', 'Bio for Chris Miller', 'chris_miller.jpg'),
  ('Admin123', 'admin123@example.com', 'admin', 'Bio for Admin123', 'admin123.jpg'),
  ('Moderator456', 'moderator456@example.com', 'moderator', 'Bio for Moderator456', 'moderator456.jpg'),
  ('Owner789', 'owner789@example.com', 'owner', 'Bio for Owner789', 'owner789.jpg'),
  ('SarahJones', 'sarah.jones@example.com', 'user', 'Bio for Sarah Jones', 'sarah_jones.jpg'),
  ('MarkTaylor', 'mark.taylor@example.com', 'user', 'Bio for Mark Taylor', 'mark_taylor.jpg');

use `kaylios`;
create table `request` (
    `request_id` int(11) NOT NULL primary key AUTO_INCREMENT,
    `receiver_id` int(11) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL on UPDATE CURRENT_TIMESTAMP
);
use `kaylios`;
alter table `request`
    add column `user_id` int(11) NOT NULL after `receiver_id`;

alter table `request`
    drop column `receiver_id`;
SELECT * FROM `request`;