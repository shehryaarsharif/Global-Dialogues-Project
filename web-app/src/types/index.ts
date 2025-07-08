export interface VizData {
  sentiment: {
    [key: string]: number;
  };
  geographic: {
    [key: string]: number;
  };
  age: {
    [key: string]: number;
  };
  religion: {
    [key: string]: number;
  };
  area: {
    [key: string]: number;
  };
  quotes: {
    [key: string]: Quote[];
  };
}

export interface Quote {
  quote: string;
  source: string;
}

export interface StorySection {
  id: string;
  title: string;
  age: string;
  location: string;
  region: string;
  quote: Quote;
  chartType: 'bar' | 'radar' | 'pie' | 'line';
  chartData: any;
} 