create table `audio_post`
(
    `audio_id`  int(11) unsigned not null auto_increment,
    `post_id`   int(11) unsigned not null,
    `audio_url` varchar(255)     not null,
    `audio`     varchar(256)     not null,
    `about`     varchar(256)     not null
);

create table `block`
(
    `block_id`        int(11) unsigned not null auto_increment,
    `user_id`         int(11) unsigned not null,
    `blocked_user_id` int(11) unsigned not null
);

create table `bookmark`
(
    `bookmark_id` int(11) unsigned not null auto_increment,
    `user_id`     int(11) unsigned not null,
    `post_id`     int(11) unsigned not null
);

create table `comment_likes`
(
    `comment_like_id` int(11) unsigned not null auto_increment,
    `user_id`         int(11) unsigned not null,
    `comment_id`      int(11) unsigned not null,
    'commenter_id'    int(11) unsigned not null,
    `time`            timestamp        not null default current_timestamp
);

create table `conversations`
(
    `conversation_id` int(11) unsigned not null auto_increment,
    `name`            varchar(255)     not null,
    `user_one`        int(11) unsigned not null,
    `user_two`        int(11) unsigned not null,
    `comb_users`      varchar(255)     not null,
    `time`            timestamp        not null default current_timestamp
);

create table `doc_post`
(
    `doc_id`  int(11) unsigned not null auto_increment,
    `post_id` int(11) unsigned not null,
    `doc_url` varchar(255)     not null,
    `doc`     varchar(256)     not null,
    `about`   varchar(256)     not null
);

create table 'relation'
(
    'relation_id' int(11) unsigned not null auto_increment,
    'sender'      int(11) unsigned not null,
    'receiver'    int(11) unsigned not null,
    'status'      varchar(255)     not null default 'pending',
    `date`        timestamp        not null default current_timestamp,
    `time`        timestamp        not null default current_timestamp
);

create table `private_email`
(
    `email_id` int(11) unsigned not null auto_increment,
    `user_id`  int(11) unsigned not null,
    `email`    varchar(255)     not null,
    `time`     timestamp        not null default current_timestamp
);

create table `favorites`
(
    `favorite_id` int(11) unsigned not null auto_increment,
    `user_id`     int(11) unsigned not null,
    `post_id`     int(11) unsigned not null,
    `time`        timestamp        not null default current_timestamp
);

create table `follow_system`
(
    `follow_id`   int(11) unsigned not null auto_increment,
    `user_id`     int(11) unsigned not null,
    `follower_id` int(11) unsigned not null,
    `time`        timestamp        not null default current_timestamp,
    `date`        timestamp        not null default current_timestamp
);

create table `groups` (
    `group_id` int(11) unsigned not null auto_increment,
    `group_name` varchar(255) not null,
    `group_desc` varchar(255) not null,
    `group_cover` varchar(255) not null,
    `group_admin` int(11) unsigned not null
);

create table `group_conv`
(
    `group_conv_id` int(11) unsigned not null auto_increment,
    `group_id`      int(11) unsigned not null,
    `user_id`       int(11) unsigned not null,
    `conv`          varchar(255)     not null,
    `time`          timestamp        not null default current_timestamp
);

create table `group_conv_members`
(
    `group_conv_member_id` int(11) unsigned not null auto_increment,
    `group_conv_id`        int(11) unsigned not null,
    `user_id`              int(11) unsigned not null,
    `time`                 timestamp        not null default current_timestamp
);
