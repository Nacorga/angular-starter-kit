import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CodeVisualizerComponent } from '@app/components/code-visualizer/code-visualizer.component';
import { homePage } from './home.constants';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseComponent } from '@app/components/base.component';
import { FooterComponent } from '@app/components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  imports: [
    TranslatePipe,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LucideAngularModule,
    FooterComponent,
    CodeVisualizerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePageComponent extends BaseComponent {
  readonly features = homePage.features;
  readonly steps = homePage.steps;
  readonly integrationCode = homePage.integrationCode;
  readonly htmlButtonCode = homePage.htmlButtonCode;
  readonly jsButtonCode = homePage.jsButtonCode;
  readonly highlights = homePage.highlights;
  readonly pricing = homePage.pricing;
  readonly faqs = homePage.faqs;

  emailFC = new FormControl('', Validators.compose([Validators.required, Validators.email]));
}
