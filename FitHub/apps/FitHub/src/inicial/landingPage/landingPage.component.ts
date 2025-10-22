import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Importar componentes do Zard UI Layout usando o alias do tsconfig
import { 
  LayoutComponent, 
  HeaderComponent, 
  ContentComponent, 
  FooterComponent 
} from '@fit-hub/frontend';
// import { LucideAngularModule, arrow } from ''

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    LayoutComponent,
    HeaderComponent, 
    ContentComponent, 
    FooterComponent,
    // LucideAngularModule
  ],
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css'],
})
export class LandingPageComponent {
  private readonly router = inject(Router);

  isScrolled = false;

  // Ícones
  // readonly ArrowRight = Arrow;
  
  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 50;
      });
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', () => {});
    }
  }


  // Métodos para navegação
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
