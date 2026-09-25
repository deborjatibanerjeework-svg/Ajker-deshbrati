import { Injectable, signal, computed } from '@angular/core';
import { Article, HistoricalIssue } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  breakingNews = signal<string[]>([
    'রাজ্যজুড়ে মেহনতি জনতার যৌথ মহামিছিলের সমর্থনে বিভিন্ন জেলায় প্রস্তুতি সভা শুরু।',
    'চা বাগান শ্রমিকদের ন্যূনতম দৈনিক মজুরি বৃদ্ধির দাবিতে আন্দোলনের তীব্রতা বাড়ছে।',
    'কেন্দ্রীয় বঞ্চনা ও কৃষি সংকট মোকাবিলায় কৃষক সভার বিশেষ রাজ্য সম্মেলন আগামী সপ্তাহে।'
  ]);

  private articlesData = signal<Article[]>([
    {
      id: '1',
      title: 'শ্রমজীবী মানুষের অধিকার রক্ষায় রাজ্যজুড়ে গণমিছিলের ডাক',
      subtitle: 'ন্যূনতম মজুরি ও স্থায়ী কর্মসংস্থানের দাবিতে সোচ্চার বামপন্থী শ্রমিক সংগঠনগুলো',
      category: 'lead',
      categoryLabel: 'প্রধান প্রতিবেদন',
      excerpt: 'কলকাতাসহ জেলার বিভিন্ন প্রান্তে ব্যাপক পদযাত্রা অনুষ্ঠিত হয়েছে। ধর্মঘট ও ঐক্যবদ্ধ প্রতিরোধের বার্তা তুলে ধরা হয় সমাবেশ থেকে।',
      content: 'পুঁজিবাদী আগ্রাসন এবং জনবিরোধী নীতির বিরুদ্ধে শ্রমজীবী মানুষের দীর্ঘস্থায়ী প্রতিরোধ গড়ে তুলতে হবে। এই লড়াই কেবল অর্থনৈতিক দাবির নয়, এটি সাংবিধানিক কাঠামো ও গণতান্ত্রিক অধিকার সুরক্ষার লড়াই। কারখানা বন্ধ, ঠিকা শ্রম এবং সামাজিক সুরক্ষার অভাবের বিরুদ্ধে জেলায় জেলায় সংগঠিত হচ্ছে লাল পতাকার সংগ্রামী বাহিনী...',
      author: 'নিজস্ব সংবাদদাতা',
      date: '১৬ সেপ্টেম্বর ২০২৬',
      readingTime: '৪ মিনিট পাঠ',
      imageUrl: 'https://images.unsplash.com/photo-1591994843349-f415893b3a6b?auto=format&fit=crop&w=1200&q=80',
      imageCaption: 'কলকাতার রাজপথে ঐতিহাসিক যৌথ গণমিছিল ও প্রতিবাদী সমাবেশ',
      imageCredit: 'আলোকচিত্র: দেশব্রতী ব্যুরো',
      highlight: true
    },
    {
      id: '2',
      title: 'ফ্যাসিবাদবিরোধী গণঐক্য ও তৃণমূল স্তরের প্রতিরোধ',
      subtitle: 'গণতান্ত্রিক মূল্যবোধ রক্ষায় সর্বস্তরের সংগ্রামী মানুষের ঐক্য',
      category: 'editorial',
      categoryLabel: 'সম্পাদকীয়',
      excerpt: 'সামাজিক সম্প্রীতি ও সাংবিধানিক মূল্যবোধ সুরক্ষায় গণসংগঠনগুলোর যৌথ উদ্যোগ সময়ের সবচেয়ে বড় দাবি।',
      content: 'সাম্প্রতিক রাজনৈতিক প্রেক্ষাপট আমাদের শিক্ষা দেয় যে তৃণমূল স্তরে সচেতনতা বৃদ্ধি না করলে প্রতিবিপ্লবী শক্তির বিস্তার রোধ করা সম্ভব নয়। সংস্কৃতি, শিক্ষা এবং জনজীবনে যে বিভেদের রাজনীতি চালানো হচ্ছে, তার বিরুদ্ধে গণসংগ্রামই একমাত্র পথ...',
      author: 'সম্পাদকমণ্ডলী',
      date: '১৬ সেপ্টেম্বর ২০২৬',
      readingTime: '৩ মিনিট পাঠ',
      imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      imageCaption: 'সম্প্রীতি সমাবেশ ও মতাদর্শিক আলোচনা চক্র'
    },
    {
      id: '3',
      title: 'গ্রামাঞ্চলে কৃষি মজুরদের বকেয়া পাওনা আদায়ের আন্দোলন',
      subtitle: '১০০ দিনের কাজের ন্যায্য মজুরির দাবিতে জেলাশাসকের দপ্তর অভিযান',
      category: 'movement',
      categoryLabel: 'গণআন্দোলন',
      excerpt: 'গ্রামীণ কর্মসংস্থান প্রকল্পের বকেয়া মজুরি দ্রুত মিটিয়ে দেওয়ার দাবিতে জেলা প্রশাসকের দপ্তরের সামনে বিক্ষোভ সমাবেশ।',
      content: 'গ্রামীণ সংকট আরও তীব্র হচ্ছে। কাজ করিয়ে নেওয়ার পর মাসের পর মাস গরিব মজুরদের টাকা আটকে রেখে ভাতে মারার চক্রান্ত রুখতে পথে নেমেছেন হাজার হাজার ক্ষেতমজুর ও আদিবাসী পরিবারের সদস্যরা...',
      author: 'জেলা ব্যুরো, বর্ধমান',
      date: '১৫ সেপ্টেম্বর ২০২৬',
      readingTime: '২ মিনিট পাঠ',
      imageUrl: 'https://images.unsplash.com/photo-1595085610896-fb31c7e92a83?auto=format&fit=crop&w=800&q=80',
      imageCaption: 'বর্ধমান কালেক্টরেটের সম্মুখে কৃষকদের অবস্থান'
    },
    {
      id: '4',
      title: 'ঐতিহাসিক প্রেক্ষাপট: ষাটের দশকের উত্তাল দিনগুলি ও দেশব্রতী',
      subtitle: 'বিপ্লবী মুখপত্রের জন্মগাথা ও নকশালবাড়ি অভ্যুত্থান',
      category: 'party',
      categoryLabel: 'ইতিহাস ও মতাদর্শ',
      excerpt: 'ইংরেজি ‘Liberation’ এবং হিন্দি ‘Lokyudh’-এর পাশাপাশি বাংলার বুকে কীভাবে জন্ম নিয়েছিল এই গণসংগ্রামের মুখপত্র।',
      content: 'ষাটের দশকের শেষভাগে বৈপ্লবিক গণআন্দোলনের প্রয়োজনেই আত্মপ্রকাশ ঘটেছিল ‘দেশব্রতী’র। লিফলেট এবং হাতে লেখা সাইক্লোস্টাইল সংস্করণ থেকে আজকের আধুনিক মাধ্যমেও এর বিপ্লবী আদর্শ অপরিবর্তিত...',
      author: 'বিশেষ প্রতিবেদক',
      date: '১৪ সেপ্টেম্বর ২০২৬',
      readingTime: '৫ মিনিট পাঠ',
      imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
      imageCaption: 'ষাটের দশকের পুরনো সাইক্লোস্টাইল ও মুদ্রিত দলিলের সংগ্রহ'
    },
    {
      id: '5',
      title: 'রাজ্যের বিদ্যুৎ মাশুল বৃদ্ধির বিরুদ্ধে নাগরিক কনভেনশন',
      category: 'politics',
      categoryLabel: 'রাজ্য রাজনীতি',
      excerpt: 'বিদ্যুৎ মাশুল প্রত্যাহার ও বেসরকারিকরণের চক্রান্ত রুখে দিতে নাগরিক কমিটির বৃহত্তর কর্মসূচি।',
      content: 'সাধারণ পরিবারের কাঁধে বাড়তি বিদ্যুৎ বিলের বোঝা চাপানোর প্রতিবাদে কলকাতায় অনুষ্ঠিত হলো নাগরিক কনভেনশন। অবিলম্বে এই অযৌক্তিক বোঝা প্রত্যাহারের দাবি তোলা হয়...',
      author: 'শহর প্রতিনিধি',
      date: '১৩ সেপ্টেম্বর ২০২৬',
      readingTime: '২ মিনিট পাঠ'
    },
    {
      id: '6',
      title: 'চা বাগান শ্রমিকদের দৈনিক মজুরি বৃদ্ধির চুক্তি রূপায়ণে ঢিলেমি',
      category: 'movement',
      categoryLabel: 'গণআন্দোলন',
      excerpt: 'উত্তরবঙ্গের ডুয়ার্স ও তরাই অঞ্চলের চা শ্রমিকদের মধ্যে ব্যাপক অসন্তোষ।',
      content: 'মালিকপক্ষ ও রাজ্য সরকারের দীর্ঘসূত্রিতায় এখনো বহু বাগানে কার্যকর হয়নি চুক্তিভিত্তিক ন্যূনতম ভাতা। অবিলম্বে কারখানা ঘেরাওয়ের হুঁশিয়ারি দিয়েছে শ্রমিক যৌথ মঞ্চ...',
      author: 'উত্তরবঙ্গ সংবাদ ব্যুরো',
      date: '১২ সেপ্টেম্বর ২০২৬',
      readingTime: '৩ মিনিট পাঠ'
    }
  ]);

  historicalArchives = signal<HistoricalIssue[]>([
    {
      year: '১৯৬৯',
      title: 'দেশব্রতী — ঐতিহাসিক উদ্বোধনী সংখ্যা',
      edition: 'বর্ষ ১, সংখ্যা ১',
      description: 'নকশালবাড়ি আন্দোলনের প্রেক্ষিতে মেহনতি মানুষের রাজনৈতিক সংগঠন ও মতাদর্শিক দিকনির্দেশনার দলিল।',
      sisterPublication: 'Deshbrati',
      pdfAvailable: true,
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80'
    },
    {
      year: '১৯৬৯',
      title: 'Liberation — English Central Organ',
      edition: 'Vol 2, No 7',
      description: 'Historical English-language mouthpiece covering anti-imperialist mass mobilization in South Asia.',
      sisterPublication: 'Liberation',
      pdfAvailable: true,
      coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=500&q=80'
    },
    {
      year: '১৯৭২',
      title: 'Lokyudh — हिंदी राज्य मुखपत्र',
      edition: 'अंक ३, विशेष संस्करण',
      description: 'बिहार और उत्तर भारत के किसान-मजदूर आंदोलन की क्रांतिकारी रिपोर्टिंग।',
      sisterPublication: 'Lokyudh',
      pdfAvailable: true,
      coverImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=500&q=80'
    },
    {
      year: '১৯৭৭',
      title: 'জরুরি অবস্থা উত্তর গণআন্দোলনের রূপরেখা',
      edition: 'বিশেষ সংখ্যা',
      description: 'স্বৈরাচারী শাসনের বিরুদ্ধে লড়াই শেষে গণতান্ত্রিক অধিকার পুনঃপ্রতিষ্ঠার সংগ্রাম।',
      sisterPublication: 'Deshbrati',
      pdfAvailable: true,
      coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=500&q=80'
    }
  ]);

  selectedCategory = signal<string>('all');
  searchQuery = signal<string>('');
  selectedArticle = signal<Article | null>(null);

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
