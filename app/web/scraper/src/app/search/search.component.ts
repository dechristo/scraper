import { Component, OnInit } from '@angular/core';
import { PageInformationService } from '../services/page-information-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private service: PageInformationService;

  constructor(service: PageInformationService) {
    this.service = service;
  }

  ngOnInit() {
  }

  scrap() {
    console.log('click');
    this.service.setMockInformation('a');
  }
}
