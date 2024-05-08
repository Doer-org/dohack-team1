CREATE TABLE "locations"
(
    location_id varchar(6)  not null,
    prefecture  varchar(4)  not null,  
    city        varchar(12) not null,  
    primary key (location_id)
);

INSERT INTO locations
VALUES ('011002', '北海道', '札幌市'),
       ('012025', '北海道', '函館市'),
       ('012033', '北海道', '小樽市');
