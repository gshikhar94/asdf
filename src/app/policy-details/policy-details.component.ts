import { Component, OnInit, Input , AfterViewInit, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
