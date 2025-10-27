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
      // Buscar dados completos do usuário
      // O backend extrai o ID do JWT automaticamente via middleware
      const usuarioData = await this.usuarioService.buscarUsuarioPorId();
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
    this.router.navigate(['']);
  }
}
