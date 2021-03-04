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
  }


  init(): void {
    this.mailGoogleService.getMail().then(mailGoogle => {
      this.loading = true;
      let cpt = 0;
      mailGoogle.forEach(element => {
        this.mailGoogle.push(element);
        this.mailGoogle[cpt].date = this.mailGoogle[cpt].date.substring(0, this.mailGoogle[cpt].date.length - 5);
        this.mailGoogle[cpt].sender = this.mailGoogle[cpt].sender.split('<')[0];
        cpt = cpt + 1;
      });
      cpt = 0;
      console.log(this.mailGoogle);
    }).then(() => this.loading = false);
  }

}
