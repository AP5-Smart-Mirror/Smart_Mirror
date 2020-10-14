import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsService } from '../../services/news.service';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  loading: boolean;
  news: News[];
  currentNews: News;

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.news = [];
    this.init();
    setInterval(() => this.init(), 600000);
    setInterval(() => this.nextNews(), 15000);
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
    this.newsService.getNews().then(news => {
      this.loading = true;
      news.forEach(element => {
        this.news.push(element);
      });
      this.currentNews = this.news[0];
    }).then(() => this.loading = false);
  }
}
