# Clean Architecture com Autenticação JWT - FitHub

## Estrutura da Arquitetura Limpa

O projeto foi organizado seguindo os princípios da Clean Architecture, com separação clara de responsabilidades em camadas:

```
libs/
├── domain/          # Entidades e regras de negócio centrais
├── application/     # Casos de uso e regras de aplicação
├── infrastructure/  # Implementações concretas e integrações
└── shared/          # Utilitários compartilhados
```

### 📁 Camada Domain (libs/domain)
- **Entidades**: `User` - Representa o usuário do sistema
- **Interfaces**: `UserRepository` - Contrato para persistência de usuários
- **Regras**: Lógica de negócio central, independente de frameworks

### 📁 Camada Application (libs/application)
- **DTOs**: Objetos de transferência de dados (`LoginDto`, `RegisterDto`, `AuthResponseDto`, `UserDto`)
- **Use Cases**: Casos de uso principais (`LoginUserUseCase`, `RegisterUserUseCase`, `UpdateUserUseCase`)
- **Services**: Serviços de aplicação (`UserService` - operações específicas do domínio)
- **Ports**: Interfaces para serviços externos (`HashService`, `JwtService`)

### 📁 Camada Infrastructure (libs/infrastructure)
- **Repositórios**: `PostgresUserRepository` - Implementação concreta para PostgreSQL
- **Serviços**: 
  - `BcryptHashService` - Hash de senhas com bcrypt
  - `JsonWebTokenService` - Geração e verificação de JWT

### 📁 Backend (apps/backend)
- **Controllers**: 
  - `AuthController` - Endpoints HTTP para autenticação
  - `UserController` - Endpoints HTTP para operações de usuário
- **Modules**: 
  - `AuthModule` - Configuração de injeção de dependências para auth
  - `UserModule` - Configuração de injeção de dependências para usuários

## 🔐 Como Funciona a Autenticação JWT

### Fluxo de Registro:
1. **Controller** recebe dados via POST `/auth/register`
2. **RegisterUserUseCase** valida se email/username não existem
3. **BcryptHashService** gera hash da senha
4. **PostgresUserRepository** salva usuário no banco
5. **JsonWebTokenService** gera token JWT
6. Retorna usuário + token para o cliente

### Fluxo de Login:
1. **Controller** recebe credenciais via POST `/auth/login`
2. **LoginUserUseCase** busca usuário por email
3. **BcryptHashService** compara senha fornecida com hash salvo
4. **JsonWebTokenService** gera token JWT
5. Retorna usuário + token para o cliente

### Estrutura do JWT:
```json
{
  "sub": "user-id",
  "email": "user@example.com", 
  "username": "username",
  "iat": 1234567890,
  "exp": 1234654290
}
```

## 🚀 Como Usar

### 1. Configurar Banco de Dados
Execute o script de migração:
```sql
-- Arquivo: apps/backend/src/database/migrations/001_create_users_table.sql
-- Execute no PostgreSQL para criar a tabela users
```

### 2. Configurar Variáveis de Ambiente
```env
# apps/backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=FitHub

# JWT_SECRET - Como gerar uma chave segura:
# Opção 1: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Opção 2: openssl rand -hex 64
# Opção 3: Use um gerador online confiável
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2

# 🔐 IMPORTANTE para PRODUÇÃO:
# - Use uma chave de pelo menos 256 bits (64 caracteres hex)
# - Nunca compartilhe essa chave
# - Use variáveis de ambiente diferentes para cada ambiente (dev/staging/prod)
# - Considere rotacionar a chave periodicamente
```

### 3. Endpoints Disponíveis

#### Autenticação

##### Registrar Usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

##### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Operações de Usuário

##### Buscar Perfil do Usuário
```http
GET /api/users/:id
```

##### Atualizar Usuário
```http
PUT /api/users/:id
Content-Type: application/json

{
  "email": "newemail@example.com",
  "username": "newusername"
}
```

##### Alterar Senha
```http
PUT /api/users/:id/password
Content-Type: application/json

{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

##### Deletar Usuário
```http
DELETE /api/users/:id
```

#### Resposta de Sucesso
```json
{
  "user": {
    "id": "abc123",
    "email": "user@example.com",
    "username": "username",
    "createdAt": "2025-09-17T10:00:00Z",
    "updatedAt": "2025-09-17T10:00:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🔧 Vantagens da Arquitetura

### ✅ Organização dos Services
Na Clean Architecture, os services são organizados por responsabilidade:

#### 🏗️ Application Services (`libs/application/src/lib/services/`)
- **UserService**: Operações específicas do domínio usuário
- **Coordena** use cases e repositórios
- **Não contém** regras de negócio complexas
- **Exemplo**: `getUserProfile()`, `getAllUsers()`

#### 🔧 Infrastructure Services (`libs/infrastructure/src/lib/services/`)
- **BcryptHashService**: Implementação concreta de hash
- **JsonWebTokenService**: Implementação concreta de JWT
- **Implementam** as interfaces da camada Application
- **Exemplo**: Como fazer hash, como assinar JWT

#### 🎯 Use Cases vs Services - Diferença:
- **Use Cases**: Orquestram **uma** operação de negócio específica
- **Services**: Agrupam **múltiplas** operações relacionadas a uma entidade

```typescript
// ✅ Use Case - Uma operação específica
class LoginUserUseCase {
  execute(loginDto: LoginDto): Promise<AuthResponseDto>
}

// ✅ Service - Múltiplas operações de uma entidade
class UserService {
  getUserById(id: string): Promise<User>
  getUserProfile(id: string): Promise<UserProfile>
  getAllUsers(): Promise<User[]>
}
```

### ✅ Testabilidade
- Cada camada pode ser testada isoladamente
- Use cases não dependem de frameworks
- Mocks fáceis através das interfaces

### ✅ Flexibilidade
- Trocar PostgreSQL por MongoDB: apenas alterar `PostgresUserRepository`
- Trocar JWT por OAuth: apenas alterar `JsonWebTokenService`
- Adicionar cache: criar decorator nos use cases

### ✅ Manutenibilidade
- Regras de negócio centralizadas na camada domain
- Dependências sempre apontam para dentro
- Código organizado por responsabilidade

### ✅ Escalabilidade
- Fácil adicionar novos use cases
- Reutilização de código entre projetos
- Separação clara de concerns

## 🛡️ Segurança Implementada

- **Hash de Senhas**: bcrypt com salt rounds
- **JWT Assinado**: chave secreta configurável
- **Validação de Email/Username**: únicos no sistema
- **Timeouts**: tokens expiram em 24h
- **Validação de Dados**: DTOs tipados

## 📚 Próximos Passos Sugeridos

1. **Middleware de Autenticação**: Para proteger rotas
2. **Refresh Tokens**: Para renovação automática
3. **Rate Limiting**: Prevenir ataques de força bruta
4. **Logs de Auditoria**: Rastrear tentativas de login
5. **Validação Avançada**: class-validator nos DTOs
6. **Testes Unitários**: Para cada camada
7. **Documentação Swagger**: Para os endpoints