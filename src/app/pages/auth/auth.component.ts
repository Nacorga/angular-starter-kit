import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardLayoutComponent } from '@app/layouts/card/card.component';

@Component({
  selector: 'app-auth-page',
  imports: [RouterModule, CardLayoutComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthPageComponent {}
