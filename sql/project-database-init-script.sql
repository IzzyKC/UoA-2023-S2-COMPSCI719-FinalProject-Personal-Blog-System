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
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS user_article;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS user_theme;
DROP TABLE IF EXISTS theme;
DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user(
	id INTEGER NOT NULL,
    username varchar(64) UNIQUE NOT NULL,
    password varchar(64) NOT NULL,
    name varchar(64),
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

CREATE TABLE IF NOT EXISTS user_theme(
	userId INTEGER NOT NULL,
	themeId INTEGER NOT NULL,
	PRIMARY KEY(userId, themeId),
	FOREIGN KEY(userId) REFERENCES user(id) on DELETE CASCADE,
	FOREIGN KEY(themeId) REFERENCES theme(id) on DELETE CASCADE
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

CREATE TABLE IF NOT EXISTS notification(
	id INTEGER NOT NULL,
	senderId INTEGER NOT NULL,
	receiverId INTEGER NOT NULL,
	content TEXT NOT NULL,
	time timestamp NOT null,
	PRIMARY KEY(id),
	FOREIGN KEY(senderId) REFERENCES user(id) on DELETE CASCADE,
	FOREIGN KEY(receiverId) REFERENCES user(id) on DELETE CASCADE
	
);

INSERT INTO theme (id, name) VALUES
(0,'Default'),
(1,'Music'),
(2,'Movie'),
(3,'Dog'),
(4,'Cat'),
(5,'Fashion'),
(6,'Beauty'),
(999,'Other');
