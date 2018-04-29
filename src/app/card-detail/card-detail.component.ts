import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Data } from '../services/data';
import { FetchDataService } from '../services/fetch-data.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  cards: Data[];
  cardDetails: Data;
  constructor(private route: ActivatedRoute, private fetchDataService: FetchDataService) { }

  ngOnInit() {
    //this.getDetails();
    this.route.params.forEach((params: Params) => {
      this.fetchDataService.getData().subscribe( data => {
        this.cards = [...data];
        this.cardDetails = this.cards.find(card => card._id === params.details);
      })
    });
  }

  /* getDetails(): void {
    this.cardDetails = <Data>this.route.snapshot.params;
  }*/

}
