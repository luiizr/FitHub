import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '@fit-hub/frontend';

/**
 * Guard que bloqueia usuários já autenticados de acessar rotas públicas
 * (login, registro, landing page).
 * 
 * Se o usuário JÁ ESTÁ logado, ele é redirecionado para o dashboard.
 * Se o usuário NÃO ESTÁ logado, ele pode prosseguir normalmente.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isNotAuthenticatedGuard: CanActivateFn = (_route, _state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  // Se o usuário ESTÁ logado, redireciona para dashboard
  if (usuarioService.isLoggedIn()) {
    router.navigate(['/dashboard']);
    return false;
  }

  // Se NÃO ESTÁ logado, permite prosseguir
  return true;
};
