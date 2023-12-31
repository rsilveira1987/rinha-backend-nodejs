-- DROP TABLE IF EXISTS tb_pessoas;

-- CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CREATE UNLOGGED TABLE tb_pessoas (
--   id varchar(36),
--   apelido varchar(32),
--   nome varchar(100),
--   nascimento varchar(10),
--   stack text
-- );
-- CREATE INDEX idx_tb_pessoas_id ON tb_pessoas USING HASH(id);
-- CREATE INDEX idx_tb_pessoas_apelido ON tb_pessoas USING GIN(apelido gin_trgm_ops);
-- CREATE INDEX idx_tb_pessoas_nome ON tb_pessoas USING GIN(nome gin_trgm_ops);
-- CREATE INDEX idx_tb_pessoas_stack ON tb_pessoas USING GIN(stack gin_trgm_ops);

DROP TABLE IF EXISTS tb_pessoas;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE UNLOGGED TABLE tb_pessoas (
  id uuid,
  apelido varchar(32),
  nome varchar(100),
  nascimento varchar(10),
  stack text,
  search text
);

CREATE INDEX idx_tb_pessoas_id ON tb_pessoas USING HASH(id);
CREATE INDEX
    CONCURRENTLY IF NOT EXISTS idx_tb_pessoas_trigram ON tb_pessoas USING gist (
        search gist_trgm_ops(siglen = 64)
    );

SET TIME ZONE 'America/Sao_Paulo';