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

  constructor(private fetchData: FetchDataService, private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.fetchData.getData().subscribe( data => {this.cards = [...data];})
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

}
