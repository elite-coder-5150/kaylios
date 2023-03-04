create table 'relation'
(
    'relation_id' int(11) unsigned not null auto_increment,
    'sender'      int(11) unsigned not null,
    'receiver'    int(11) unsigned not null,
    'status'      varchar(255)     not null default 'pending',
    `date`        timestamp        not null default current_timestamp,
    `time`        timestamp        not null default current_timestamp
)
