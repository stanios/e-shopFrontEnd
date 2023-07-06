import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { ImagesService } from '../services/images.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit{

  displayedColumns: string[] = ['Id','Product Name', 'Description','Discounted Price', 'Actual Price', 'Images', 'Edit', 'Delete']
  productDetails:  Product[]  = []

  ngOnInit(): void {
   
  }

  constructor(
    private productServ: ProductService,
    public imgDialog: MatDialog,
    private imgServ: ImagesService,
    private router: Router
    ) {
      this.getAllProducts()
  }

  public getAllProducts() {
    this.productServ.getAllProducts()
    .pipe(
      map((prod: Product[], index) => prod.map((product: Product) => 
      this.imgServ.createImages(product)))
    )
    .subscribe({
      next: (response: Product[]) => {
        this.productDetails =  response ;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    }) 

  }

  public deleteProduct(id: number) {
    this.productServ.deleteProduct(id).subscribe({
      next: (response: any) => {
        console.log(response)
        this.getAllProducts()
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })
  }

  public showImages(product: Product) {
    console.log(product)
    this.imgDialog.open(ProductImagesComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    })
  }

  public editProductDetails(productId: number) {
    this.router.navigate(['/addNewProduct', {productId: productId}]);
  }

}
