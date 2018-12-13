import {Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';
import {MatSnackBar} from '@angular/material';



import {Post } from '../post';

@Component( {
selector: 'app-post-detail',
templateUrl: './post-detail.component.html',
styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

post: Post;
published: number;
editing = false;

constructor(
private route: ActivatedRoute,
private postService: PostService,
private router: Router,
public auth: AuthService,
public snackBar: MatSnackBar
    ) {
}

ngOnInit() {
this.getPost();
console.log(this);
}
getPost() {
const id = this.route.snapshot.paramMap.get('id');
return this.postService.getPostData(id).subscribe(data =>  this.post = data);
}
updatePost() {
  const formData = {
    title: this.post.title,
    content: this.post.content
  };
  const id = this.route.snapshot.paramMap.get('id');
  this.postService.update(id, formData);
  this.editing = false;
  this.snackBar.open('You have successfully updated', this.post.title, {
    duration: 5000,
  });
  this.router.navigate(['/blog']);
}
delete() {
  const id = this.route.snapshot.paramMap.get('id');
  this.postService.delete(id);
  this.snackBar.open('You have successfully deleted', this.post.title, {
    duration: 5000,
  });
  this.router.navigate(['/blog']);
}
}
