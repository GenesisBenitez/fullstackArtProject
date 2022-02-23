-- PAINTERS TABLES
CREATE TABLE painters(
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
)

INSERT INTO painters(first_name, last_name)
VALUES ('Leonardo', 'Davinci');

SELECT * FROM painters;

-- PAINTINGS TABLES
CREATE TABLE paintings (
    id int NOT NULL AUTO_INCREMENT,
    painting_name VARCHAR(100) NOT NULL,
    painter_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (painter_id) REFERENCES painters(id)
)
INSERT INTO paintings(painting_name, painter_id)
VALUES('Mona Lisa', 1)

SELECT * FROM paintings;

-- JOIN STATMENT FOR paintings
SELECT paintings.painting_name, painters.first_name, painters.last_name
FROM paintings
INNER JOIN painters ON paintings.painter_id = painters.id;

-- USERS
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO users (username)
VALUES('Genesis');

SELECT * FROM users;
-- COMMENTS
CREATE TABLE comments(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    painting_id INT NOT NULL,
    comment VARCHAR(250) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (painting_id) REFERENCES paintings(id)
);

INSERT INTO comments(user_id, painting_id, comment)
VALUES(1,1, 'I really love this painting');

SELECT * FROM comments;

-- JOIN STATMENT FOR comments
SELECT users.username, paintings.painting_name, comments.comment
FROM comments
INNER JOIN users ON comments.user_id = users.id
INNER JOIN paintings ON comments.painting_id = paintings.id;

--GET ALL COMMENTS FOR PAINTINGS
SELECT users.username, paintings.painting_name, comments.comment
FROM comments
INNER JOIN users ON comments.user_id = users.id
INNER JOIN paintings ON comments.painting_id = paintings.id
WHERE painting_id = 1;

-- //added column
alter table users add password varchar(20) not null;

insert into users(username,password)values('genesis','genesis');
select * from users where username = 'genesis' AND password = 'genesis';

alter table paintings add img varchar(300);

update paintings 
set img= 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1024px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg' where id = 1;


alter table painters add img varchar(550);

alter table paintings add description varchar(1000);

alter table painters add bio varchar(1000);

----get all details with painter id--->
Select users.username, paintings.painting_name, painters.first_name, painters.last_name, comments.comment
from comments 
inner join users on comments.user_id = users.id
inner join paintings on comments.painting_id = paintings.id
inner join painters on paintings.painter_id = painters.id;
where painter_id = 2;

alter table painters add art_movement varchar(100);