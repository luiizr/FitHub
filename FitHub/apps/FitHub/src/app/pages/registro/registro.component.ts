import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from 'libs/services/src/usuario/usuario.service';
import { UsuarioDTO } from 'libs/adapters/src/dto/UsuarioDTO';

interface UsuarioArgs {
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

  constructor(
    private readonly userService: UsuarioService,
    private readonly router: Router
  ) {}

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
    const usuarioDto: UsuarioDTO = {
      nome: this.registroData.nome,
      email: this.registroData.email,
      senha: this.registroData.senha,
      peso: this.registroData.peso,
      altura: this.registroData.altura,
      idade: this.registroData.idade,
    };

    try {
      console.info("usuario:", usuarioDto)
      await this.userService.salvarUsuario(usuarioDto);
      // após salvar, redireciona ao login
      this.router.navigate(['/login']);
    } catch (err) {
      console.error(err);
      alert('Erro ao registrar usuário');
    }
  }

  // compatibilidade caso outro código chame este método
  async registrarUsuario(usuario: UsuarioDTO): Promise<void> {
    await this.userService.salvarUsuario(usuario);
  }
}
