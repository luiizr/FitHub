import { Component, inject } from '@angular/core';

import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserService } from '@fithub/application';

@Component({
  selector: 'app-login-teste',
  imports: [NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, ReactiveFormsModule],
  templateUrl: './loginTeste.html',
  styleUrl: './loginTeste.css',
})
export class LoginTeste {
  private fb = inject(NonNullableFormBuilder);
  private userService = inject(UserService);
  validateForm = this.fb.group({
  username: this.fb.control('', [Validators.required]),
  password: this.fb.control('', [Validators.required]),
  remember: this.fb.control(true)
  });


  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      const { username } = this.validateForm.value;
      
      if (!username) {
        console.log('Username não informado');
        return;
      }
      
      try {
        // Exemplo de uso do UserService - buscar usuário por username
        const user = await this.userService.getUserByUsername(username);
        
        if (user) {
          console.log('Usuário encontrado:', user.toJSON());
        } else {
          console.log('Usuário não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


}
