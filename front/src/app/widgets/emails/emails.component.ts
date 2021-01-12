import { Component, OnInit } from '@angular/core';
import { EmailsService } from '../../services/emails.service';
import { Emails } from '../../models/emails';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
