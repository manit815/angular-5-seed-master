import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../services/data';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  cardDetails: Data;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails(): void {
    this.cardDetails = <Data>this.route.snapshot.params;
  }

}
