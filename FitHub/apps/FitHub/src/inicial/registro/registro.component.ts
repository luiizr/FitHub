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

  async onSubmit(): Promise<void> {
    // validações básicas
    if (
      !this.registroData.nome ||
      !this.registroData.email ||
      !this.registroData.senha
    ) {
      alert('Preencha nome, email e senha');
      return;
    }

    if (this.registroData.senha !== this.registroData.confirmPassword) {
      alert('As senhas não conferem');
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
      console.info("usuario:", usuarioDto)
      await this.userService.registrarUsuario(usuarioDto);
      // após salvar, redireciona ao login
      this.router.navigate(['/login']);
    } catch (err) {
      console.error(err);
      alert('Erro ao registrar usuário');
    }
  }
}
