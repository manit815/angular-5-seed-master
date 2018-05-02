import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { CardComponent } from './card.component';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { FetchDataService } from '../services/fetch-data.service';
import { Data } from '../services/data';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


let data: Data[] = [{
                                                   "_id": "5adf6c251bb8ae8474b79915",
                                                   "index": 2,
                                                   "guid": "0a2cd7a7-4127-45e8-a41f-cddf240d2743",
                                                   "isFavourite": false,
                                                   "title": "Tucker Gardner",
                                                   "company": "ZOMBOID",
                                                   "info": "Consectetur nulla adipisicing aliquip proident.",
                                                   "description": "Lorem sit aliqua quis do reprehenderit ut anim aliqua cupidatat eu ut aute tempor. Tempor dolore irure pariatur ex commodo commodo ex sunt officia esse. Dolor mollit magna eu nostrud ipsum est magna minim.\r\nProident aliqua voluptate consectetur in proident labore ea. Ullamco duis officia deserunt nulla. Officia enim aliqua velit dolor officia quis laborum aute aliquip. Sint sit minim enim commodo consectetur esse eiusmod nostrud consequat do.\r\n"
                                                 }];

class MockFetchDataService {

  public url: string = 'test/test.json';

  getData(): Observable<Data[]>{
    return Observable.of(data);
  }
}

let modalService = {
    show: jasmine.createSpy('show')
  };

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockFetchDataService: MockFetchDataService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([ { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
                                                   { path: 'dashboard', component: CardComponent },
                                                   { path: 'detail', component: CardDetailComponent },
                                                   { path: 'detail/:details', component: CardDetailComponent }]) ],
      declarations: [ CardComponent, CardDetailComponent ],
       providers: [{provide: FetchDataService, useClass: MockFetchDataService },
        { provide: BsModalService, useValue: modalService },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockFetchDataService = TestBed.get(FetchDataService);
  });

  it('should resolve test data', async(() => {
      let navigateSpy = spyOn((<any>component).router, 'navigate');
      let _id = '5adf6c251bb8ae8474b79915';
      component.openCard(_id);
      expect(navigateSpy).toHaveBeenCalledWith(['/detail', _id]);
    }));


});
