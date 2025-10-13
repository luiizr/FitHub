import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from 'libs/services/src/usuario/usuario.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private readonly userService: UsuarioService) {}

  verUsuarios(): void {
    const usuarios = this.userService.buscarTodosUsuarios();
    console.log(usuarios);
  }


}
