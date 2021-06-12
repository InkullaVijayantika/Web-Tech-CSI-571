import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homepage/homepage.component';
import { MylistComponent } from './mylist/mylist.component';
import { DetailsComponent} from './details/details.component';
import { ReviewComponent} from './review/review.component';


const routes: Routes = [{
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'watch/:media_type/:id',
    component: DetailsComponent
  },
  {
      path: 'mylist',
      component: MylistComponent
    },
  {
    path: 'review',
    component: ReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
