import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  imports: [MatButtonModule, MatExpansionModule, MatInputModule, MatProgressBarModule, MatToolbarModule,
     MatCardModule, MatIconModule, MatSnackBarModule],
  exports: [MatButtonModule, MatExpansionModule, MatInputModule, MatProgressBarModule, MatToolbarModule, MatCardModule, MatIconModule],
  declarations: []
})
export class MaterialModule { }
