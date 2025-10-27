# 🔐 Plano Completo: Autenticação + Dashboard

## 📋 Estado Atual

### ✅ O que já funciona:
1. **Login no Backend** (`POST /api/login`)
   - Valida email e senha
   - Gera token JWT com user ID e email
   - Token expira em 1 dia

2. **Frontend - UsuarioService**
   - `loginUsuario()`: Faz login e retorna token
   - `isLoggedIn()`: Verifica se há token no localStorage
   - `logout()`: Remove token
   - `buscarUsuarioPorId()`: Busca dados do usuário

3. **Axios Interceptor** (`AxiosHttpClient`)
   - Auto-injeta `Authorization: Bearer ${token}` em todas as requisições
   - Redireciona para `/login` se receber 401

4. **Routes Angular**
   - Landing Page → Login → Dashboard (estrutura pronta)
   - Dashboard component existe mas está vazio

---

## 🔧 O que falta implementar

### **PARTE 1: Frontend - Proteção de Rotas**

#### 1.1 - Criar AuthGuard
📁 **Arquivo**: `apps/FitHub/src/app/guards/auth.guard.ts`
```typescript
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '@fit-hub/frontend';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.isLoggedIn()) {
    return true;
  }

  // Redireciona para login se não autenticado
  router.navigate(['/login']);
  return false;
};
```

**Por que funciona:**
- `CanActivateFn` é uma função que valida se a rota pode ser acessada
- `isLoggedIn()` verifica se há token no localStorage
- Se não houver token, redireciona para `/login`

---

#### 1.2 - Registrar Dashboard no Routing
📁 **Arquivo**: `apps/FitHub/src/app/app.routes.ts`
```typescript
import { Route } from '@angular/router';
import { LoginComponent } from '../inicial/login/login.component';
import { RegistroComponent } from '../inicial/registro/registro.component';
import { LandingPageComponent } from '../inicial/landingPage/landingPage.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],  // 🔒 Rota protegida!
  },
  {
    path: '**',
    redirectTo: '',
  },
];
```

---

### **PARTE 2: Frontend - Componente Dashboard**

#### 2.1 - TypeScript do Dashboard
📁 **Arquivo**: `apps/FitHub/src/dashboard/dashboard.component.ts`
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '@fit-hub/frontend';
import { Usuario } from '@fit-hub/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private readonly usuarioService = inject(UsuarioService);
  private readonly router = inject(Router);

  usuario: Usuario | null = null;
  carregando = true;
  erro: string | null = null;

  ngOnInit(): void {
    this.carregarDadosUsuario();
  }

  async carregarDadosUsuario(): Promise<void> {
    try {
      // Decodificar token JWT para obter ID do usuário
      const token = localStorage.getItem('authToken');
      if (!token) {
        this.erro = 'Token não encontrado';
        return;
      }

      // Decodificar JWT payload
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      
      // Buscar dados completos do usuário
      const usuarioData = await this.usuarioService.buscarUsuarioPorId(payload.id);
      if (usuarioData) {
        this.usuario = usuarioData;
      } else {
        this.erro = 'Usuário não encontrado';
      }
    } catch (err) {
      console.error('Erro ao carregar dados do usuário:', err);
      this.erro = 'Erro ao carregar dados do usuário';
    } finally {
      this.carregando = false;
    }
  }

  logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
```

**Como funciona:**
1. `ngOnInit()` é chamado quando componente é inicializado
2. Busca token do localStorage
3. Decodifica JWT para extrair ID do usuário (JWT é `header.payload.signature` em base64)
4. Chama API para buscar dados completos do usuário
5. Se sucesso, exibe dados; se erro, mostra mensagem

---

#### 2.2 - Template HTML do Dashboard
📁 **Arquivo**: `apps/FitHub/src/dashboard/dashboard.component.html`
```html
<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
  <!-- Container Principal -->
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-gray-600 mt-2">Bem-vindo ao seu painel de controle</p>
      </div>
      <button
        (click)="logout()"
        class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>

    <!-- Loading State -->
    <div *ngIf="carregando" class="flex justify-center items-center py-16">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Carregando seus dados...</p>
      </div>
    </div>

    <!-- Error State -->
    <div *ngIf="erro && !carregando" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
      <p class="text-red-700 font-semibold">❌ Erro:</p>
      <p class="text-red-600">{{ erro }}</p>
    </div>

    <!-- User Data Card -->
    <div *ngIf="usuario && !carregando" class="bg-white rounded-lg shadow-lg p-8 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Seus Dados Pessoais</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Nome -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-600 text-sm font-semibold mb-1">Nome</p>
          <p class="text-gray-800 text-lg">{{ usuario.nome }}</p>
        </div>

        <!-- Email -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-600 text-sm font-semibold mb-1">Email</p>
          <p class="text-gray-800 text-lg">{{ usuario.email }}</p>
        </div>

        <!-- Idade -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-600 text-sm font-semibold mb-1">Idade</p>
          <p class="text-gray-800 text-lg">{{ usuario.idade }} anos</p>
        </div>

        <!-- Peso -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-600 text-sm font-semibold mb-1">Peso</p>
          <p class="text-gray-800 text-lg">{{ usuario.peso }} kg</p>
        </div>

        <!-- Altura -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-600 text-sm font-semibold mb-1">Altura</p>
          <p class="text-gray-800 text-lg">{{ usuario.altura }} cm</p>
        </div>

        <!-- TMB (se disponível) -->
        <div *ngIf="usuario.TMB" class="bg-gray-50 p-4 rounded-lg">
          <p class="text-gray-600 text-sm font-semibold mb-1">Taxa Metabólica Basal</p>
          <p class="text-gray-800 text-lg">{{ usuario.TMB }}</p>
        </div>
      </div>

      <!-- Últimas Atualizações -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-gray-600 text-sm">
          Último acesso: {{ usuario.id || 'Carregando...' }}
        </p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div *ngIf="usuario && !carregando" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition cursor-pointer">
        <div class="text-4xl mb-4">📊</div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Estatísticas</h3>
        <p class="text-gray-600 text-sm">Ver seu progresso e estatísticas</p>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition cursor-pointer">
        <div class="text-4xl mb-4">🏋️</div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Treinos</h3>
        <p class="text-gray-600 text-sm">Gerenciar seus treinos</p>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition cursor-pointer">
        <div class="text-4xl mb-4">🍎</div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Nutrição</h3>
        <p class="text-gray-600 text-sm">Acompanhar sua alimentação</p>
      </div>
    </div>
  </div>
</div>
```

---

#### 2.3 - CSS do Dashboard
📁 **Arquivo**: `apps/FitHub/src/dashboard/dashboard.component.css`
```css
/* Estilos personalizados, se necessário além do Tailwind */
:host {
  display: block;
  height: 100%;
}
```

---

### **PARTE 3: Backend - Rota Protegida**

#### 3.1 - Criar Controller de Usuário Protegido
📁 **Arquivo**: `apps/backend/src/API/UsuarioController.ts`
```typescript
import { Express, Request, Response } from 'express';
import { RepositorioUsuario } from '@fit-hub/core';
import { verificarToken } from '../middleware/authMiddleware';

export default class UsuarioController {
  constructor(
    servidor: Express,
    repoUsuario: RepositorioUsuario,
  ) {
    // GET /api/usuario - Busca dados do usuário logado
    servidor.get('/api/usuario', verificarToken, async (req: Request, res: Response) => {
      try {
        // O middleware verificarToken coloca o user_id em req.user
        const userId = (req as any).user.id;

        const usuario = await repoUsuario.BuscarUsuarioPorId(userId);

        if (!usuario) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Nunca retornar senha!
        const usuarioSeguro = { ...usuario, senha: undefined };

        res.status(200).json(usuarioSeguro);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ message: 'Erro ao buscar usuário', error });
      }
    });

    // PUT /api/usuario - Atualizar dados do usuário (futuro)
    servidor.put('/api/usuario', verificarToken, async (req: Request, res: Response) => {
      try {
        const userId = (req as any).user.id;

        // Validações básicas
        if (!userId) {
          return res.status(400).json({ message: 'ID do usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar usuário', error });
      }
    });
  }
}
```

---

#### 3.2 - Criar Middleware JWT
📁 **Arquivo**: `apps/backend/src/middleware/authMiddleware.ts`
```typescript
import { Request, Response, NextFunction } from 'express';
import { Jwt } from '@fit-hub/backendAdapters';

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Buscar token no header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Extrair o token (remove "Bearer ")
    const token = authHeader.substring(7);

    // Verificar e decodificar o token
    const provedorJwt = new Jwt(process.env.JWT_SECRET || 'seu-segredo-aqui');
    const decoded = provedorJwt.obter(token);

    // Anexar dados decodificados ao request
    (req as any).user = decoded;

    // Continuar para próxima função
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
```

---

#### 3.3 - Atualizar main.ts Backend
📁 **Arquivo**: `apps/backend/src/main.ts` (seção de Rotas Protegidas)
```typescript
/*
=========================== 
      Rotas Protegidas
=========================== 
*/
const provedorJwt = new Jwt(process.env.JWT_SECRET || 'seu-segredo-aqui')
new UsuarioController(app, repoUsuario)
```

**Adicionar import no topo:**
```typescript
import UsuarioController from './API/UsuarioController';
```

---

### **PARTE 4: Fluxo Completo (Resumido)**

```
1️⃣ USUÁRIO CLICA EM "ENTRAR" NA LANDING PAGE
   ↓
2️⃣ NAVEGA PARA `/login` (sem proteção, ok)
   ↓
3️⃣ DIGITA EMAIL E SENHA
   ↓
4️⃣ CLICA EM "LOGIN"
   ↓
5️⃣ `LoginComponent` → `UsuarioService.loginUsuario()`
   ↓
6️⃣ `POST /api/login` (backend valida e gera JWT)
   ↓
7️⃣ TOKEN RETORNADO → `LoginComponent` salva em `localStorage`
   ↓
8️⃣ `LoginComponent` navega para `/dashboard`
   ↓
9️⃣ `authGuard` valida se há token (SIM ✅)
   ↓
🔟 `DashboardComponent` inicializa
   ↓
1️⃣1️⃣ `ngOnInit()` extrai ID do token JWT
   ↓
1️⃣2️⃣ `GET /api/usuario` com `Authorization: Bearer ${token}`
   ↓
1️⃣3️⃣ `verificarToken` (middleware) valida o token
   ↓
1️⃣4️⃣ `UsuarioController` busca dados do usuário no banco
   ↓
1️⃣5️⃣ DADOS RETORNADOS → `DashboardComponent` exibe
   ↓
1️⃣6️⃣ USUÁRIO LOGADO COM SUCESSO! ✅
```

---

## 🚀 Checklist de Implementação

- [ ] 1. Criar `authGuard` em `apps/FitHub/src/app/guards/auth.guard.ts`
- [ ] 2. Adicionar rota `/dashboard` com guard em `app.routes.ts`
- [ ] 3. Implementar `DashboardComponent.ts`
- [ ] 4. Criar `dashboard.component.html` com Tailwind
- [ ] 5. Criar `UsuarioController.ts` no backend
- [ ] 6. Criar `middleware/authMiddleware.ts`
- [ ] 7. Adicionar `UsuarioController` em `main.ts`
- [ ] 8. Testar fluxo completo: `Registro → Login → Dashboard`

---

## 🧪 Testes Manuais

### No Frontend:
```
1. Abrir http://localhost:4200
2. Ir para /registro → criar conta
3. Ir para /login → fazer login
4. Deve redirecionar para /dashboard com dados do usuário
5. Clicar em Logout → voltar para /login
6. Tentar acessar /dashboard diretamente sem token → redireciona para /login ✅
```

### No Backend (com curl/Postman):
```bash
# Fazer login
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","senha":"sua-senha"}'

# Usar o token retornado para acessar rota protegida
curl -X GET http://localhost:4000/api/usuario \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📝 Resumo das Mudanças

| Componente | Arquivo | Ação |
|---|---|---|
| Frontend | `authGuard` | ✨ CRIAR |
| Frontend | `app.routes.ts` | 📝 ATUALIZAR |
| Frontend | `dashboard.component.ts` | ✨ CRIAR |
| Frontend | `dashboard.component.html` | ✨ CRIAR |
| Backend | `UsuarioController.ts` | ✨ CRIAR |
| Backend | `middleware/authMiddleware.ts` | ✨ CRIAR |
| Backend | `main.ts` | 📝 ATUALIZAR |

Total: **7 operações** (5 criar, 2 atualizar)

---

## 💡 Próximos Passos (Após Isso Funcionar)

1. ✅ Dashboard básico com dados do usuário
2. 🔄 Atualizar perfil do usuário (`PUT /api/usuario`)
3. 📊 Páginas de estatísticas
4. 🏋️ Gerenciar treinos
5. 🍎 Controlar alimentação
6. 🔐 Recuperação de senha
