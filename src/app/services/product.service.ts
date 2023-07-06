import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.interface";
import { CONSTANTS } from "../models/constans";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    
    constructor(private http: HttpClient) {
    }
    private isLoadingSubject = new Subject<Product>

    public addProduct(product: FormData) {
        return this.http.post<FormData>(CONSTANTS.apiUrl + "/addNewProduct", product)
    }

    public getAllProducts() {
      return this.http.get<Product[]>(CONSTANTS.apiUrl + "/getAllProducts")
    }

    public deleteProduct(productId: number) {
      console.log(`${CONSTANTS.apiUrl}deleteProductDetails/${productId}`)
      return this.http.delete(`${CONSTANTS.apiUrl}/deleteProductDetails/${productId}`)
      
    }

    public getProductDetails(productId: number) {
      return this.http.get<Product>(`${CONSTANTS.apiUrl}/getProductDetails/${productId}`)
    }
  }
