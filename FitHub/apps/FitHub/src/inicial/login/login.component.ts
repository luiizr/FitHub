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
      // Validação
      if (!this.email || !this.senha) {
        this.erro = 'Preencha todos os campos';
        return;
      }

      // Validar formato de email
      if (!this.isValidEmail(this.email)) {
        this.erro = 'E-mail inválido';
        return;
      }

      const token = await this.userService.loginUsuario(this.email, this.senha);
      
      if (token) {
        // Armazenar token (sem logar)
        localStorage.setItem('authToken', token);
        
        // Limpar dados sensíveis (boas práticas)
        this.email = '';
        this.senha = '';
        
        // Redirecionar
        this.router.navigate(['/dashboard']);
      }
    } catch (err) {
      console.error('Erro ao fazer login');
      // NUNCA expor detalhes da erro (pode ser JWT inválido, etc)
      this.erro = 'Email ou senha incorretos';
    } finally {
      this.carregando = false;
    }
  }

  // Helper: Validar email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
