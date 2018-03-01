import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ReadJsonService } from './read-json.service';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { HelperDirective } from './helper.directive';
import { mappings } from './mappings';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  { path: 'search', component: SearchComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    PolicyDetailsComponent,
    SearchComponent,
    RecentActivityComponent,
    HelperDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [PolicyDetailsComponent, RecentActivityComponent],
  providers: [ReadJsonService,mappings],
  bootstrap: [AppComponent]
})
export class AppModule { }
