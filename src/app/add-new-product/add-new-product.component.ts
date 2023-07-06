import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product.interface';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../models/file-handle.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{

  isNew = true;
  

  constructor(
    private productServ: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute:ActivatedRoute) {

  }

  @ViewChild('selectFile') selectFileRef!: ElementRef<HTMLInputElement>;

  product: Product = {
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  };

  ngOnInit(): void {
  
    this.product = this.activatedRoute.snapshot.data['product']
    if(this.product.productName != "") {
      this.isNew = false;
    }
  }

  

  addProduct(productFrom: NgForm) {

    const productFormData = this.prepareFormData(this.product)
    
    this.productServ.addProduct(productFormData).subscribe({
      next: (response: FormData) => {
        console.log(response)
        productFrom.reset()
        this.product.productImages = []
      }, 
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    } 
    )
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    );

    for(let i = 0; i < product.productImages.length; i++) {
      formData.append(
        "imageFile",
        product.productImages[i].file,
        product.productImages[i].file.name
      )
    }

    return formData;
    
  }

  onFileSelected(input: HTMLInputElement) {
    if(input.files && input.files.length > 0) {
      const newFile = input.files[0];

      const fileHandle: FileHandle = {
        file: newFile,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(newFile)
        )
      }

      this.product.productImages.push(fileHandle);
    }
  }

  removeImage(i: number) {
    this.product.productImages.splice(i, 1)
  }

}
