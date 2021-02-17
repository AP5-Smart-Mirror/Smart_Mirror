import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  loading: boolean;
  news: News[];
  currentNews: News;
  newsText : String = "";
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.init();
    setInterval(() => this.init(), 600000);
  }

  nextNews(): void {
    const idxCurrentNews = this.news.indexOf(this.currentNews);
    if (idxCurrentNews + 1 < this.news.length){
      this.currentNews = this.news[idxCurrentNews + 1 ];
    }
    else{
      this.currentNews = this.news[0];
    }
  }
  
  init(): void {
    this.news = [];
    this.newsService.getNews().then(news => {
      this.loading = true;
      news.forEach(element => {
        this.newsText+=element.title;
        this.newsText += " - ";
      });
      this.currentNews = this.news[0];
    }).then(() => this.loading = false);
  }
}
