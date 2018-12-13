import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Ng2ImgMaxService } from 'ng2-img-max';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})

export class PostDashboardComponent implements OnInit {

  title: string;
  image: string = null;
  content: string;

  buttonText = 'Create Post';

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  uploadedImage: File;

  /* imageChangedEvent: any = '';
  croppedImage: any = '';
 */
  constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage,
    private ng2ImgMax: Ng2ImgMaxService, private router: Router, public snackBar: MatSnackBar) {}

  ngOnInit() {

  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      title: this.title,
      image: this.image,
      content: this.content,
      published: new Date()
    };
    this.postService.create(data);
    /* this.title = '';
    this.content = '';
    this.buttonText = 'Post Created';
    this.image = '';
    setTimeout(() => this.buttonText = 'Create Post', 3000); */
    this.snackBar.open('You have successfully created', this.title, {
      duration: 5000,
    });
    this.router.navigate(['/blog']);
    }



  /* fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  } */

  onImageChange(event) {
    const file = event.target.files[0];
    console.log(file);
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Only Images are accepted');
    } else {
    this.ng2ImgMax.resizeImage(file, 400, 300).subscribe(
      result => {
        const file2 = new File([result], result.name);
        console.log(file2);
        const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file2);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => this.image = url);
        })
      )
      .subscribe();
      console.log('Uploaded');
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }
}
  uploadImage(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Only Images are accepted');
    } else {
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => this.image = url);
        })
      )
      .subscribe();
      console.log('Uploaded');
    }
  }
}
