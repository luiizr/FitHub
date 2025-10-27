import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UsuarioService } from '@fit-hub/frontend';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  private readonly userService = inject(UsuarioService);
  private readonly router = inject(Router);

  email = '';
  senha = '';
  carregando = false;
  erro: string | null = null;

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.erro = null;
    this.carregando = true;

    try {
      if (!this.email || !this.senha) {
        this.erro = 'Preencha todos os campos';
        return;
      }

      const token = await this.userService.loginUsuario(this.email, this.senha);
      console.info('Token recebido:', token);
      if (token) {
        console.info('Armazenando token e redirecionando...');
        localStorage.setItem('authToken', token);
        console.info('Navegando para o dashboard');
        this.router.navigate(['/dashboard']);
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      this.erro = err instanceof Error ? err.message : 'Erro ao fazer login';
    } finally {
      this.carregando = false;
    }
  }

}
