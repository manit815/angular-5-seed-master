import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchDataService } from './fetch-data.service';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpEvent } from '@angular/common/http';
import { Data } from './data';

describe('FetchDataService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [FetchDataService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([FetchDataService], (service: FetchDataService) => {
    expect(service).toBeTruthy();
  }));

  it(
      'should get cards',
      inject(
        [HttpTestingController, FetchDataService],
        (httpMock: HttpTestingController, fetchDataService: FetchDataService) => {
          const testData: Data[] = [
          {
                                                           '_id': '5adf6c25ed52b7d85b97aa1c',
                                                           'index': 1,
                                                           'guid': 'a21df5fe-5402-4e44-89b7-cd1c98204fcb',
                                                           'isFavourite': false,
                                                           'title': 'Chandler Vazquez',
                                                           'company': 'BUGSALL',
                                                           'info': 'Ipsum deserunt dolor duis sunt do anim ea veniam minim exercitation aute.',
                                                           'description': 'Magna velit enim veniam labore deserunt cupidatat elit duis consequat duis id mollit amet. Culpa excepteur aliquip dolore exercitation labore nostrud est dolor laboris dolore ex fugiat. Eiusmod aliquip fugiat veniam cillum eiusmod aliquip amet. Voluptate proident non velit magna pariatur commodo excepteur culpa cillum duis dolore voluptate consectetur nostrud. Quis veniam labore irure eu elit.\r\nNon et irure enim commodo duis anim magna ea tempor. Irure ut in deserunt cupidatat mollit velit elit. Cupidatat nisi adipisicing minim in veniam cillum cupidatat ipsum cillum laboris nisi. Do aliquip excepteur voluptate minim aliquip irure sunt minim excepteur reprehenderit nisi ea. Enim Lorem nostrud pariatur culpa magna nulla in. Ullamco laborum qui do consectetur enim ea sint quis officia aute ex.\r\n'
                                                         },
                                                         {
                                                             "_id": "5adf6c251bb8ae8474b79915",
                                                             "index": 2,
                                                             "guid": "0a2cd7a7-4127-45e8-a41f-cddf240d2743",
                                                             "isFavourite": false,
                                                             "title": "Tucker Gardner",
                                                             "company": "ZOMBOID",
                                                             "info": "Consectetur nulla adipisicing aliquip proident.",
                                                             "description": "Lorem sit aliqua quis do reprehenderit ut anim aliqua cupidatat eu ut aute tempor. Tempor dolore irure pariatur ex commodo commodo ex sunt officia esse. Dolor mollit magna eu nostrud ipsum est magna minim.\r\nProident aliqua voluptate consectetur in proident labore ea. Ullamco duis officia deserunt nulla. Officia enim aliqua velit dolor officia quis laborum aute aliquip. Sint sit minim enim commodo consectetur esse eiusmod nostrud consequat do.\r\n"
                                                           }
                                                           ];

          fetchDataService.getData().subscribe((data) => {
            expect(data).toEqual(testData)
          });

          const mockReq = httpMock.expectOne(fetchDataService.url);

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(testData);

          httpMock.verify();
        }
      )
    );

});
