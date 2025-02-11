import {
  Gauge,
  MousePointer2,
  ScrollText,
  Activity,
  Eye,
  Target,
  Zap,
  Puzzle,
  Shield,
  Sliders,
  ChartColumn,
} from 'lucide-angular';

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

const highlights = [
  {
    title: 'Lightweight & Blazing Fast',
    description:
      "Most analytics tools slow down websites with large scripts. Trackeator is ultra-light, ensuring your site's speed stays optimal.",
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
    delay: 0,
  },
  {
    title: 'Accurate Event Tracking',
    description:
      'Forget the guesswork. We track navigation, time spent, inactivity, and custom events with pinpoint accuracy.',
    icon: Target,
    gradient: 'from-blue-500 to-cyan-500',
    delay: 0.1,
  },
  {
    title: 'Effortless Integration',
    description: 'Minimal setup in any JavaScript framework. Works seamlessly with Next.js, React, Angular, and more.',
    icon: Puzzle,
    gradient: 'from-green-500 to-emerald-500',
    delay: 0.2,
  },
  {
    title: 'No Cookies, No Privacy Headaches',
    description:
      'Track users without compromising privacy. 100% GDPR, CCPA, and PECR compliant. No cookie banners required.',
    icon: Shield,
    gradient: 'from-purple-500 to-pink-500',
    delay: 0.3,
  },
  {
    title: 'Customizable Event Tracking',
    description: 'Capture any user interaction using either HTML attributes or direct method calls.',
    icon: Sliders,
    gradient: 'from-red-500 to-rose-500',
    delay: 0.4,
  },
  {
    title: 'Google Analytics Alternative',
    description:
      "Unlike GA, Trackeator doesn't sample data or require complex dashboards. Get raw, accurate tracking with zero noise.",
    icon: ChartColumn,
    gradient: 'from-indigo-500 to-violet-500',
    delay: 0.5,
  },
];

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

export const homePage = {
  features,
  steps,
  integrationCode,
  htmlButtonCode,
  jsButtonCode,
  highlights,
  pricing,
};
