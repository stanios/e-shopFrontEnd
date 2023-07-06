import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Product } from '../models/product.interface';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './product.service';
import { ImagesService } from './images.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(
    private productServ: ProductService,
    private imgServ: ImagesService
    ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
    
    const id = parseInt(route.paramMap.get("productId") || "-1") ;

    if(id && id != -1) {
      return this.productServ.getProductDetails(id)
      .pipe(
        map(p => this.imgServ.createImages(p))
      );
    } else {
      return of(this.getProductDetails());
    }
  }
  getProductDetails() {
    return {
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []
    }
  }
}


// export const resolver : ResolveFn<Product> =
// (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   if (inject(RecipeService).getRecipes().length === 0) {
//       return  inject(DataStorageService).fetchRecipes() 
//   } else {
//       return inject(RecipeService).getRecipes();
//   } 
//}