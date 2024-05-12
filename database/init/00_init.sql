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

CREATE TABLE posts
(
    post_id UUID PRIMARY KEY,
    contents TEXT NOT NULL
);

-- INSERT INTO posts (contents)
-- VALUES ('text1'),
--        ('text2'),
--        ('text3');

CREATE TABLE reactions
(
    reaction_id UUID PRIMARY KEY,
    post_id UUID NOT NULL,
    kind VARCHAR(10) NOT NULL,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
    theta FLOAT NOT NULL,
    scale FLOAT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

-- INSERT INTO reactions (post_id, kind, x, y, theta, scale)
-- VALUES ('011002', 'like', 2, 2, 3, 4);
