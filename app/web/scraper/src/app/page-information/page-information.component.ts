import { Component, OnInit } from '@angular/core';
import { PageInformationService } from '../services/page-information-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-information',
  templateUrl: './page-information.component.html',
  styleUrls: ['./page-information.component.css']
})
export class PageInformationComponent implements OnInit {
  information: string;
  service: PageInformationService;
  infoChangeSubscription: Subscription;

  constructor(service: PageInformationService) {
    this.service = service;
  }

  ngOnInit() {
    this.infoChangeSubscription = this.service.getInfo()
        .subscribe(data => this.information = data);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.infoChangeSubscription.unsubscribe();
  }

}
