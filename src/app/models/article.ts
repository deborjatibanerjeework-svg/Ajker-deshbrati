export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  category: 'all' | 'lead' | 'movement' | 'politics' | 'editorial' | 'party' | 'archive';
  categoryLabel: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  highlight?: boolean;
}

export interface HistoricalIssue {
  year: string;
  title: string;
  edition: string;
  description: string;
  sisterPublication: 'Deshbrati' | 'Liberation' | 'Lokyudh';
  pdfAvailable: boolean;
}
