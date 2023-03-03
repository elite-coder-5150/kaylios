create table 'relation'
(
    'relation_id' int(11) unsigned not null auto_increment,
    'sender'      int(11) unsigned not null,
    'receiver'    int(11) unsigned not null,
    'status'      varchar(255)     not null default 'pending',
    `date`        timestamp        not null default current_timestamp,
    `time`        timestamp        not null default current_timestamp
)

#q: can mysql handle a million users?
## a: yes, but it will be slow
## would mongodb be better?
### a: yes, but it will be slow

## q: what type of database can handle 1 million users?
## a:
