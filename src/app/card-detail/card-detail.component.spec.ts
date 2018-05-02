import { async, ComponentFixture, TestBed, fakeAsync, inject  } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CardDetailComponent } from './card-detail.component';
import { FetchDataService } from '../services/fetch-data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Data } from '../services/data';
import { HttpModule } from '@angular/http';

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

  public getData(): Observable<Data[]>{
    return Observable.of(data);
  }
}

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;
  let fetchDataService: FetchDataService;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDetailComponent ],
      providers: [{provide: FetchDataService, useClass: MockFetchDataService }, {
                                              provide: ActivatedRoute, useValue: {
                                                params: Observable.of({ details: '5adf6c251bb8ae8474b79915' })
                                              }
                                            }],
      imports: [HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(()=>{
    fetchDataService = TestBed.get(FetchDataService);
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should return the card details', async( () => {
    fetchDataService.getData();
    component.ngOnInit();
    expect(component.cardDetails).toBe(data[0]);

  }));

});
