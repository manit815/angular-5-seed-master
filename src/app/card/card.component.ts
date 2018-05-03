import { Component, OnInit, TemplateRef  } from '@angular/core';
import { FetchDataService } from '../services/fetch-data.service';
import { Data } from '../services/data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards: Data[];
  public modalRef: BsModalRef;
  favorite: boolean = true;
  favoriteCount: number = 0;
  public favoritesArray = [];
  public nonFavoriteArray = [];

  constructor(private fetchData: FetchDataService, private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.fetchData.getData().subscribe( data => {
      this.cards = [...data];
      if(this.cards.length){
        for(let cardFavorite of this.cards) {
                if(cardFavorite.isFavourite) {
                  this.favoritesArray.push(cardFavorite);
                  this.favoriteCount++;

                } else {
                  this.nonFavoriteArray.push(cardFavorite);
                }
        }

      } else {
        console.log('No data returned');
      }

  },
  error=> console.log('error msg', error))
  }

  public openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }

  /*public openCard(detail: Data) {
    this.router.navigate(['/detail', detail]);
  }*/

  public openCard(_id: string) {
      this.router.navigate(['/detail', _id]);
  }

  public markFavorite(data: Data){

      for(let cardDetail of this.cards){
        if(data._id === cardDetail._id){
          if(data.isFavourite){
            cardDetail.isFavourite = false;
            this.favoriteCount--;
            this.favoritesArray.splice(this.favoritesArray.findIndex(card=> card._id === data._id), 1);
            this.nonFavoriteArray.push(cardDetail);
          } else {
            cardDetail.isFavourite = true;
            this.favoriteCount++;
            this.favoritesArray.push(cardDetail);
            this.nonFavoriteArray.splice(this.nonFavoriteArray.findIndex(card=> card._id === data._id), 1);
          }

        }
      }


  }

}
