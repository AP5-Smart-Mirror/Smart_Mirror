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
  nbUnread: number;

  constructor(
    private mailGoogleService: EmailsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.mailGoogle = [];
    this.fetchMails();
    setInterval(() => this.fetchMails(), 3600000);
  }


  fetchMails(): void {
    this.mailGoogleService.getMail().then(mailGoogle => {
      this.loading = true;
      this.nbUnread = 0;
      mailGoogle.forEach(element => {
        element.sender = element.sender.split('<')[0];
        this.mailGoogle.push(element);
        this.nbUnread++;
      });
      console.log(this.mailGoogle);
    }).then(() => this.loading = false);
  }

}
