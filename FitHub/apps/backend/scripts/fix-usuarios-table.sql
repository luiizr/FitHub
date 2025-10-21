-- 1. Instalar extensão UUID (obrigatório)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Remover tabela existente (cuidado: apaga todos os dados!)
DROP TABLE IF EXISTS usuarios CASCADE;

-- 3. Criar tabela com UUID automático
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    peso DECIMAL(5,2),
    altura DECIMAL(3,2),
    idade INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Teste para verificar se está funcionando
INSERT INTO usuarios (nome, email, senha, peso, altura, idade) 
VALUES ('Usuario Teste', 'teste@email.com', 'senha123', 70.5, 175, 25);

-- 5. Verificar se o UUID foi gerado automaticamente
SELECT id, nome, email FROM usuarios WHERE email = 'teste@email.com';

-- 6. Limpar o teste
DELETE FROM usuarios WHERE email = 'teste@email.com';

-- 7. Verificar estrutura final da tabela
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default 
FROM information_schema.columns 
WHERE table_name = 'usuarios' 
ORDER BY ordinal_position;