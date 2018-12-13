import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { SharedModule } from '../shared/shared.module';
import { PostService } from './post.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng2ImgMaxModule } from 'ng2-img-max';



const routes: Routes = [
  {path: 'blog', component: PostListComponent},
  {path: 'blog/:id', component: PostDetailComponent},
  {path: 'dashboard', component: PostDashboardComponent}
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), ImageCropperModule, Ng2ImgMaxModule],
  declarations: [PostDashboardComponent, PostDetailComponent, PostListComponent],
  providers: [PostService]
})
export class PostsModule { }
