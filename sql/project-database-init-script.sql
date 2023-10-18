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