import { Component, input } from '@angular/core';

@Component({
  selector: 'app-code-visualizer',
  imports: [],
  templateUrl: './code-visualizer.component.html',
  styleUrl: './code-visualizer.component.scss',
})
export class CodeVisualizerComponent {
  code = input.required<string>();
}
