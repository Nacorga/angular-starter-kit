import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CodeVisualizerComponent } from '@app/components/code-visualizer/code-visualizer.component';
import { homePage } from './home.constants';

@Component({
  selector: 'app-home-page',
  imports: [NgOptimizedImage, MatButtonModule, LucideAngularModule, CodeVisualizerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePageComponent {
  readonly features = homePage.features;
  readonly steps = homePage.steps;
  readonly integrationCode = homePage.integrationCode;
  readonly htmlButtonCode = homePage.htmlButtonCode;
  readonly jsButtonCode = homePage.jsButtonCode;
  readonly highlights = homePage.highlights;
  readonly pricing = homePage.pricing;
}
