import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ReadJsonService } from "../read-json.service";
import { Subject } from "rxjs/Subject";
import { mappings } from "../mappings";
import { HelperDirective } from '../helper.directive';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  intents: any = [];
  startAt = new Subject();
  endAt = new Subject();
  @ViewChild(HelperDirective) componentHost: HelperDirective;

  constructor(private readJsonService: ReadJsonService, private factoryResolver: ComponentFactoryResolver, private mappings: mappings) {
    // this.intents = this.readJsonService.readJson(this.startAt, this.endAt).subscribe(data => {
    //   console.log(data['abc']['intent']);
    //   if (data['abc']['intent'] == "policy details"){
    //     console.log(data['abc']['intent'])
    //   }
    // });

  }

  ngOnInit() {
  }

  searchValue($event) {
    let value = $event.target.value;
    this.readJsonService.readJson(this.startAt, this.endAt).subscribe(data => {
      // console.log(data['products']['intent']);
      for (let product in data) {
        if (product) {
          this.intents.push(data[product]['intent']);
        }
      }
    })
    // this.startAt.next(value)
    // this.endAt.next(value + "\uf8ff");
    // console.log(value);

  }
  inititateComp(value) {
    console.log(this.mappings.mappings[0]);
    let componentFactory = this.factoryResolver.resolveComponentFactory(this.mappings.mappings[0]["policy details"]);

    let viewContainerRef = this.componentHost.viewContainerRef;

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance).data = this.mappings.mappings[0].data;
  }
}
