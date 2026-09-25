import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsService } from './services/news.service';
import { Article } from './models/article';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  newsService = inject(NewsService);

  // Signals
  breakingNews = this.newsService.breakingNews;
  selectedCategory = this.newsService.selectedCategory;
  filteredArticles = this.newsService.filteredArticles;
  selectedArticle = this.newsService.selectedArticle;
  archives = this.newsService.historicalArchives;

  // Masthead & UI Features
  isDarkMode = signal<boolean>(false);
  readerFontSize = signal<number>(18); // Default font size in px
  copyNotification = signal<boolean>(false);
  searchTerm = '';

  navCategories = [
    { key: 'all', label: 'প্রধান পাতা' },
    { key: 'editorial', label: 'সম্পাদকীয়' },
    { key: 'movement', label: 'গণআন্দোলন' },
    { key: 'politics', label: 'রাজ্য রাজনীতি' },
    { key: 'party', label: 'ইতিহাস ও মতাদর্শ' },
    { key: 'archive', label: 'ঐতিহাসিক আর্কাইভ' }
  ];

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }

  changeFontSize(delta: number) {
    this.readerFontSize.update(size => Math.min(Math.max(size + delta, 14), 26));
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.newsService.setSearchQuery(term);
  }

  clearSearch() {
    this.searchTerm = '';
    this.newsService.setSearchQuery('');
  }

  filterByCategory(catKey: string, event: Event) {
    event.preventDefault();
    this.newsService.setCategory(catKey);
  }

  get isArchiveView(): boolean {
    return this.selectedCategory() === 'archive';
  }

  // Hero Lead Article
  get leadArticle(): Article | undefined {
    return this.filteredArticles().find(a => a.category === 'lead') || this.filteredArticles()[0];
  }

  // Secondary grid cards (with images)
  get secondaryArticles(): Article[] {
    const lead = this.leadArticle;
    return this.filteredArticles()
      .filter(a => a !== lead && !!a.imageUrl)
      .slice(0, 2);
  }

  // Text-only brief list for sidebar
  get textOnlyArticles(): Article[] {
    const lead = this.leadArticle;
    const secondaryIds = new Set(this.secondaryArticles.map(a => a.id));
    return this.filteredArticles().filter(a => a !== lead && !secondaryIds.has(a.id));
  }

  // Related articles in reader modal
  get relatedArticles(): Article[] {
    const current = this.selectedArticle();
    if (!current) return [];
    return this.filteredArticles()
      .filter(a => a.id !== current.id)
      .slice(0, 3);
  }

  openArticle(article: Article) {
    this.newsService.selectArticle(article);
  }

  closeModal() {
    this.newsService.selectArticle(null);
  }

  shareArticle(platform: 'whatsapp' | 'facebook' | 'twitter' | 'copy') {
    const article = this.selectedArticle();
    if (!article) return;

    const url = window.location.href;
    const text = `${article.title} — আজকের দেশব্রতী`;

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${text}\n${url}`);
      this.copyNotification.set(true);
      setTimeout(() => this.copyNotification.set(false), 2000);
    }
  }

  downloadEPaper() {
    alert('আজকের দেশব্রতী (১৬ সেপ্টেম্বর ২০২৬) ই-পেপার সংস্করণ ডাউনলোড শুরু হচ্ছে...');
  }
}
