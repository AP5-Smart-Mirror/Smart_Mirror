import { Component, OnInit } from '@angular/core';
import { EmailsService } from '../../services/emails.service';
import { Emails } from '../../models/emails';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {
  loading: boolean;
  mailGoogle: Emails[];
  currentMailGoogle: Emails;

  constructor(
    private mailGoogleService: EmailsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.mailGoogle = [];
    this.init();
    setInterval(() => this.init(), 600000);
    setInterval(() => this.nextMailGoogle(), 10000);
  }

  nextMailGoogle(): void{
    const idxCurrentMailGoogle = this.mailGoogle.indexOf(this.currentMailGoogle);
    if (idxCurrentMailGoogle + 1 < this.mailGoogle.length){
      this.currentMailGoogle = this.mailGoogle[idxCurrentMailGoogle + 1 ];
    }
    else{
      this.currentMailGoogle = this.mailGoogle[0];
    }
  }

  init(): void {
    this.mailGoogleService.getNews().then(mailGoogle => {
      this.loading = true;
      mailGoogle.forEach(element => {
        this.mailGoogle.push(element);
        
      });
      console.log(this.mailGoogle);
     // this.currentMailGoogle = this.mailGoogle[0];
    }).then(() => this.loading = false);
  }

}
