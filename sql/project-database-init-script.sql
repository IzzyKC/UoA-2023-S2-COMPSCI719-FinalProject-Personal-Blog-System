/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */
drop table if exists test;

create table test (
    id integer not null primary key,
    stuff text  
);

insert into test (stuff) values
    ('Things'),
    ('More things');

/*
*philanthropic-polar-bears sql starts here
*/
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS user_article;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS theme;
DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user(
	id INTEGER NOT NULL,
    username varchar(64) UNIQUE NOT NULL,
    password varchar(64) NOT NULL,
    name varchar(64) NOT NULL,
	birth timestamp,
	description text,
    authToken varchar(128),
	icon TEXT NOT NULL,
	PRIMARY KEY(id)
);

--theme: code table
CREATE TABLE IF NOT EXISTS theme(
	id INTEGER NOT NULL,
	name varchar(24) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS article(
	id INTEGER NOT NULL,
	title varchar(128) NOT NULL,
	content TEXT  NOT NULL,
	time timestamp NOT NULL,
	themeId INTEGER NOT NULL,
	userId INTEGER NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(themeId) REFERENCES theme(id) on DELETE CASCADE,
	FOREIGN KEY(userId) REFERENCES user(id) on DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_article(
	userId INTEGER NOT NULL,
	articleId INTEGER NOT NULL,
	PRIMARY KEY(userId, articleId),
	FOREIGN KEY(userId) REFERENCES user(id) on DELETE CASCADE,
	FOREIGN KEY(articleId) REFERENCES article(id) on DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS image(
	id INTEGER NOT NULL,
	path TEXT NOT NULL,
	articleId INTEGER NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(articleId) REFERENCES article(id) on DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comment(
	id INTEGER NOT NULL,
	content TEXT NOT NULL,
	time timestamp NOT NULL,
	articleId INTEGER NOT NULL,
	userId INTEGER NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(articleId) REFERENCES article(id) on DELETE CASCADE,
	FOREIGN KEY(userId) REFERENCES user(id) on DELETE CASCADE
);

--data for code table
INSERT INTO theme (id, name) VALUES
(0,'Default'),
(1,'Music'),
(2,'Movie'),
(3,'Dog'),
(4,'Cat'),
(5,'Fashion'),
(6,'Beauty'),
(999,'Other');

--TEST DATA for user: Hannah Montana
--username : Hannah_Montana
--password : qwer
INSERT INTO user(id, username, password, name, birth, description, icon) VALUES
(1, 'Hannah_Montana', '$2b$10$fJzO4Qy3onVoTw8b3YjIaOD9Vc3JNMz6yC6ZpXRSVlcdJKL5M9kYC',
 'Hannah Montana', date('2008-11-20'), 'I am a singer', './images/avatar/koala.jpg');
 
INSERT INTO article (id, title, content, time, themeId, userId) VALUES
(1, 'I am a singer', 
'Miley Stewart is a fourteen-year-old middle school student who appears to live a normal life but has a secret identity, pop singer',
 date('2023-10-30'), 1, 1);
 
 INSERT INTO comment(id, content, time, articleId, userId) VALUES
 (1, 'good to go', datetime('2023-10-30'), 1, 1);
 
 INSERT INTO user_article(articleId, userId) VALUES
 (1,1);
