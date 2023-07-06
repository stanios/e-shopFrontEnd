import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog'
import { FileHandle } from '../models/file-handle.interface';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit{

  constructor( @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.receivImages();
  }

  receivImages() {
    console.log(this.data)
  }
}
