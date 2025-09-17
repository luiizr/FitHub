import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { LoginTeste } from '../loginTeste/loginTeste';


@Component({
  imports: [
    CommonModule,
    RouterOutlet,
    LoginTeste
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})

export class App {
  protected title = 'FitHub';
  private router = inject(Router);
  abrirLogado = false
  sumirBotao = false
  
  irParaLogin() {
    this.abrirLogado = true
    this.sumirBotao = true
    this.router.navigate(['/login']);
  }
}