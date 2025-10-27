import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Usuario } from '@fit-hub/core'
import { UsuarioService } from '@fit-hub/frontend';

interface UsuarioArgs extends Usuario {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  confirmPassword?: string;
  idade: number;
  altura: number;
  peso: number;
  genero?: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  // Controle de etapas
  currentStep = 1;
  totalSteps = 2;

  // URL da imagem de fundo
  backgroundImageUrl = 'https://images.unsplash.com/photo-1606889464198-fcb18894cf50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxneW0lMjB3b3Jrb3V0fGVufDB8fHx8MTc2MDc0MzI0N3ww&ixlib=rb-4.1.0&q=80&w=1080';

  // Dados base do formulário de registro
  registroData: UsuarioArgs = {
    nome: '',
    email: '',
    senha: '',
    confirmPassword: '',
    idade: 18,
    altura: 170,
    peso: 70,
    genero: '',
  };

  private readonly userService = inject(UsuarioService);
  private readonly router = inject(Router);

  // Avançar para próxima etapa
  nextStep(): void {
    // Validação da etapa 1
    if (this.currentStep === 1) {
      if (!this.registroData.nome || !this.registroData.email || !this.registroData.senha || !this.registroData.confirmPassword) {
        alert('Preencha todos os campos');
        return;
      }

      // Validar formato do email
      if (!this.isValidEmail(this.registroData.email)) {
        alert('E-mail inválido');
        return;
      }

      // Validar comprimento mínimo da senha
      if (this.registroData.senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres');
        return;
      }

      if (this.registroData.senha !== this.registroData.confirmPassword) {
        alert('As senhas não conferem');
        return;
      }

      this.currentStep = 2;
    }
  }

  // Método para validar formato de email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Voltar para etapa anterior
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  async onSubmit(): Promise<void> {
    // validações da etapa 2
    if (!this.registroData.idade || !this.registroData.altura || !this.registroData.peso) {
      alert('Preencha todas as informações físicas');
      return;
    }

    // monta DTO e envia ao service (service fará o mapeamento para domínio)
    const usuarioDto: Usuario = {
      nome: this.registroData.nome,
      email: this.registroData.email,
      senha: this.registroData.senha,
      peso: this.registroData.peso,
      altura: this.registroData.altura,
      idade: this.registroData.idade,
    };

    try {
      // Não loga dados sensíveis (senha)
      await this.userService.registrarUsuario(usuarioDto);

      // Limpar dados sensíveis após sucesso
      this.registroData.senha = '';
      this.registroData.confirmPassword = '';
      this.registroData.email = '';
      
      // após salvar, redireciona ao login
      this.router.navigate(['/login']);
    } catch {
      // Mensagem genérica sem expor detalhes do erro
      alert('Erro ao registrar usuário. Tente novamente.');
    }
  }

  // Navegação
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
