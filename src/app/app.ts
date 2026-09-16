import { Component, inject } from '@angular/core';
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

  // Reactive state signals from service
  breakingNews = this.newsService.breakingNews;
  selectedCategory = this.newsService.selectedCategory;
  filteredArticles = this.newsService.filteredArticles;
  selectedArticle = this.newsService.selectedArticle;
  archives = this.newsService.historicalArchives;

  // Search input binding
  searchTerm = '';

  // Navigation category list
  navCategories = [
    { key: 'all', label: 'প্রধান পাতা' },
    { key: 'editorial', label: 'সম্পাদকীয়' },
    { key: 'movement', label: 'গণআন্দোলন' },
    { key: 'politics', label: 'রাজ্য রাজনীতি' },
    { key: 'party', label: 'ইতিহাস ও মতাদর্শ' },
    { key: 'archive', label: 'ঐতিহাসিক আর্কাইভ' }
  ];

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

  get leadArticle(): Article | undefined {
    return this.filteredArticles().find(a => a.category === 'lead') || this.filteredArticles()[0];
  }

  get otherArticles(): Article[] {
    const lead = this.leadArticle;
    return this.filteredArticles().filter(a => a !== lead);
  }

  openArticle(article: Article) {
    this.newsService.selectArticle(article);
  }

  closeModal() {
    this.newsService.selectArticle(null);
  }
}
