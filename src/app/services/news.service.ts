import { Injectable, signal, computed } from '@angular/core';
import { Article, HistoricalIssue } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  // 3. Breaking news ticker data
  breakingNews = signal<string[]>([
    'রাজ্যজুড়ে মেহনতি জনতার যৌথ মহামিছিলের সমর্থনে বিভিন্ন জেলায় প্রস্তুতি সভা শুরু।',
    'চা বাগান শ্রমিকদের ন্যূনতম দৈনিক মজুরি বৃদ্ধির দাবিতে আন্দোলনের তীব্রতা বাড়ছে।',
    'কেন্দ্রীয় বঞ্চনা ও কৃষি সংকট মোকাবিলায় কৃষক সভার বিশেষ রাজ্য সম্মেলন আগামী সপ্তাহে।'
  ]);

  // Article repository
  private articlesData = signal<Article[]>([
    {
      id: '1',
      title: 'শ্রমজীবী মানুষের অধিকার রক্ষায় রাজ্যজুড়ে গণমিছিলের ডাক',
      subtitle: 'ন্যূনতম মজুরি ও স্থায়ী কর্মসংস্থানের দাবিতে সোচ্চার বামপন্থী শ্রমিক সংগঠনগুলো',
      category: 'lead',
      categoryLabel: 'প্রধান প্রতিবেদন',
      excerpt: 'কলকাতাসহ জেলার বিভিন্ন প্রান্তে ব্যাপক পদযাত্রা অনুষ্ঠিত হয়েছে। ধর্মঘট ও ঐক্যবদ্ধ প্রতিরোধের বার্তা তুলে ধরা হয় সমাবেশ থেকে।',
      content: 'পুঁজিবাদী আগ্রাসন এবং জনবিরোধী নীতির বিরুদ্ধে শ্রমজীবী মানুষের দীর্ঘস্থায়ী প্রতিরোধ গড়ে তুলতে হবে। এই লড়াই কেবল অর্থনৈতিক দাবির নয়, এটি গণতান্ত্রিক কাঠামোর সুরক্ষার লড়াই...',
      author: 'নিজস্ব সংবাদদাতা',
      date: '১৬ সেপ্টেম্বর ২০২৬',
      highlight: true
    },
    {
      id: '2',
      title: 'ফ্যাসিবাদবিরোধী গণঐক্য ও তৃণমূল স্তরের প্রতিরোধ',
      category: 'editorial',
      categoryLabel: 'সম্পাদকীয়',
      excerpt: 'সামাজিক সম্প্রীতি ও সাংবিধানিক মূল্যবোধ সুরক্ষায় গণসংগঠনগুলোর যৌথ উদ্যোগ সময়ের দাবি।',
      content: 'সাম্প্রতিক রাজনৈতিক প্রেক্ষাপট আমাদের শিক্ষা দেয় যে তৃণমূল স্তরে সচেতনতা বৃদ্ধি না করলে প্রতিবিপ্লবী শক্তির বিস্তার রোধ করা সম্ভব নয়...',
      author: 'সম্পাদকমণ্ডলী',
      date: '১৬ সেপ্টেম্বর ২০২৬'
    },
    {
      id: '3',
      title: 'গ্রামাঞ্চলে কৃষি মজুরদের বকেয়া পাওনা আদায়ের আন্দোলন',
      category: 'movement',
      categoryLabel: 'গণআন্দোলন',
      excerpt: 'গ্রামীণ কর্মসংস্থান প্রকল্পের বকেয়া মজুরি দ্রুত মিটিয়ে দেওয়ার দাবিতে জেলা প্রশাসকের দপ্তরের সামনে বিক্ষোভ।',
      content: 'গ্রামীণ সংকট আরও তীব্র হচ্ছে। মজুরি আটকে রাখার মাধ্যমে সাধারণ মেহনতি মানুষের জীবন বিপন্ন করে তোলা হচ্ছে...',
      author: 'জেলা ব্যুরো, বর্ধমান',
      date: '১৫ সেপ্টেম্বর ২০২৬'
    },
    {
      id: '4',
      title: 'ঐতিহাসিক প্রেক্ষাপট: ষাটের দশকের উত্তাল দিনগুলি ও দেশব্রতী',
      category: 'party',
      categoryLabel: 'ইতিহাস ও মতাদর্শ',
      excerpt: 'ইংরেজি ‘Liberation’ এবং হিন্দি ‘Lokyudh’-এর পাশাপাশি বাংলার বুকে কীভাবে জন্ম নিয়েছিল এই গণসংগ্রামের মুখপত্র।',
      content: 'ষাটের দশকের শেষভাগে বৈপ্লবিক গণআন্দোলনের প্রয়োজনেই আত্মপ্রকাশ ঘটেছিল ‘দেশব্রতী’র। আজও সেই সংগ্রামী ঐতিহ্য বজায় রেখে মেহনতি মানুষের পাশে এই মুখপত্র...',
      author: 'বিশেষ প্রতিবেদক',
      date: '১৪ সেপ্টেম্বর ২০২৬'
    },
    {
      id: '5',
      title: 'রাজ্যের বিদ্যুৎ মাশুল বৃদ্ধির বিরুদ্ধে নাগরিক কনভেনশন',
      category: 'politics',
      categoryLabel: 'রাজ্য রাজনীতি',
      excerpt: 'বিদ্যুৎ মাশুল প্রত্যাহার ও বেসরকারিকরণের চক্রান্ত রুখে দিতে নাগরিক কমিটির বৃহত্তর কর্মসূচি।',
      content: 'সাধারণ পরিবারের কাঁধে বাড়তি বিদ্যুৎ বিলের বোঝা চাপানোর প্রতিবাদে কলকাতায় অনুষ্ঠিত হলো নাগরিক কনভেনশন...',
      author: 'শহর প্রতিনিধি',
      date: '১৩ সেপ্টেম্বর ২০২৬'
    }
  ]);

  // 2. Historical archive documents (1960s to present)
  historicalArchives = signal<HistoricalIssue[]>([
    {
      year: '১৯৬৯',
      title: 'দেশব্রতী — ঐতিহাসিক উদ্বোধনী সংখ্যা',
      edition: 'বর্ষ ১, সংখ্যা ১',
      description: 'নকশালবাড়ি আন্দোলনের প্রেক্ষিতে মেহনতি মানুষের রাজনৈতিক সংগঠন ও মতাদর্শিক দিকনির্দেশনার দলিল।',
      sisterPublication: 'Deshbrati',
      pdfAvailable: true
    },
    {
      year: '১৯৬৯',
      title: 'Liberation — English Central Organ',
      edition: 'Vol 2, No 7',
      description: 'Historical English-language mouthpiece covering anti-imperialist mass mobilization in South Asia.',
      sisterPublication: 'Liberation',
      pdfAvailable: true
    },
    {
      year: '১৯৭২',
      title: 'Lokyudh — हिंदी राज्य मुखपत्र',
      edition: 'अंक ३, विशेष संस्करण',
      description: 'बिहार और उत्तर भारत के किसान-मजदूर आंदोलन की क्रांतिकारी रिपोर्टिंग।',
      sisterPublication: 'Lokyudh',
      pdfAvailable: true
    },
    {
      year: '১৯৭৭',
      title: 'জরুরি অবস্থা উত্তর গণআন্দোলনের রূপরেখা',
      edition: 'বিশেষ সংখ্যা',
      description: 'স্বৈরাচারী শাসনের বিরুদ্ধে লড়াই শেষে গণতান্ত্রিক অধিকার পুনঃপ্রতিষ্ঠার সংগ্রাম।',
      sisterPublication: 'Deshbrati',
      pdfAvailable: true
    }
  ]);

  // 1 & 3. Reactive state signals
  selectedCategory = signal<string>('all');
  searchQuery = signal<string>('');
  selectedArticle = signal<Article | null>(null);

  // Filtered list dynamically computed from selected category and search input
  filteredArticles = computed(() => {
    const cat = this.selectedCategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.articlesData().filter(article => {
      const matchesCategory = (cat === 'all') || (article.category === cat);
      const matchesQuery = !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  });

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  selectArticle(article: Article | null) {
    this.selectedArticle.set(article);
  }
}
