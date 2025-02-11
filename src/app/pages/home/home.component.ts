import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { LucideAngularModule, Gauge, MousePointer2, ScrollText, Activity, Eye, Target } from 'lucide-angular';
import { CodeVisualizerComponent } from '@app/components/code-visualizer/code-visualizer.component';

const features = [
  {
    icon: Gauge,
    title: 'Real-Time Analytics',
    description:
      "Instantly access live data on user behavior, ensuring you're always in tune with what's happening on your site.",
  },
  {
    icon: MousePointer2,
    title: 'Custom Event Tracking',
    description:
      'Track any event with complete customization, tailoring your data collection to fit your unique needs.',
  },
  {
    icon: ScrollText,
    title: 'Scroll & Inactivity Monitoring',
    description: 'Automatically detect user engagement and inactivity to help you optimize the user experience.',
  },
  {
    icon: Activity,
    title: 'Click Heatmaps',
    description:
      "Visualize user clicks to see exactly where visitors interact most, allowing you to refine your site's layout and design.",
  },
  {
    icon: Eye,
    title: 'Automatic Page Views',
    description: 'Seamlessly track page navigation without any extra setup, capturing every user journey effortlessly.',
  },
  {
    icon: Target,
    title: 'UTM Campaign Tracking',
    description: 'Monitor the performance of your marketing campaigns with detailed insights from UTM parameters.',
  },
];

const steps = [
  {
    title: 'Install the SDK',
    description: 'Add our lightweight SDK to your project with npm or yarn.',
  },
  {
    title: 'Initialize Tracking',
    description: 'Set up tracking with a single line of code in your app.',
  },
  {
    title: 'Analyze Data',
    description: 'Access real-time insights in your personalized dashboard.',
  },
];

const integrationCode = `
import { startTracking } from '@trackeator/sdk';

startTracking({
  apiKey: 'YOUR_API_KEY',
});
`;

const htmlButtonCode = `
<button data-trackr-name="purchase" data-trackr-value="49.99">
  Buy
</button>
`;

const jsButtonCode = `
import { sendCustomEvent } from '@trackeator/sdk';

<button
  onClick={() => {
    sendCustomEvent('purchase', {
      price: 49.99,
    });
  }}
  >
  Buy
</button>
`;

const pricing = [
  {
    key: 'free',
    label: 'free',
    price: 0,
    include: {
      customEvents: 10,
      dataRetention: { type: 'days', value: 30 },
      heatmapTracking: false,
      utmCampaignTracking: false,
    },
  },
  {
    key: 'hobby',
    label: 'hobby',
    price: 20,
    include: {
      customEvents: 50,
      dataRetention: { type: 'days', value: 90 },
      heatmapTracking: true,
      utmCampaignTracking: true,
    },
  },
  {
    key: 'startup',
    label: 'startup',
    price: 90,
    include: {
      customEvents: 200,
      dataRetention: { type: 'year', value: 1 },
      heatmapTracking: true,
      utmCampaignTracking: true,
    },
  },
  {
    key: 'enterprise',
    label: 'enterprise',
    price: 90,
    include: {
      customEvents: 'flexible',
      dataRetention: { type: 'flexible', value: 'flexible' },
      heatmapTracking: true,
      utmCampaignTracking: true,
    },
  },
];

@Component({
  selector: 'app-home-page',
  imports: [NgOptimizedImage, MatButtonModule, LucideAngularModule, CodeVisualizerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePageComponent {
  readonly features = features;
  readonly steps = steps;
  readonly integrationCode = integrationCode;
  readonly htmlButtonCode = htmlButtonCode;
  readonly jsButtonCode = jsButtonCode;
  readonly pricing = pricing;
}
