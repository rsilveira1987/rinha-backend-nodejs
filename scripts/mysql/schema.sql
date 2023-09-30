CREATE DATABASE IF NOT EXISTS backend;

USE backend;

CREATE TABLE tb_pessoas (
  -- id varchar(36),
  id uuid,
  apelido varchar(32),
  nome varchar(100),
  nascimento varchar(10),
  stack text,
  search text
);

CREATE FULLTEXT INDEX ft_index ON tb_pessoas (search) WITH PARSER ngram;