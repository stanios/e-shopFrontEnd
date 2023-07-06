import { Injectable, Sanitizer } from '@angular/core';
import { Product } from '../models/product.interface';
import { FileHandle } from '../models/file-handle.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: Product) {
    const productImgs: any[] = product.productImages;

    const productImgsToFileHandle: FileHandle[] = [];

    for(let i = 0; i < productImgs.length; i++) {
      const imageFileData =  productImgs[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picBytes, imageFileData.type)

      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type})

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      productImgsToFileHandle.push(finalFileHandle)
    }

    product.productImages = productImgsToFileHandle;
    return product;
  }


  public dataURItoBlob(picBytes: any, imageType: any) {
      const byteString = window.atob(picBytes);
      const arrayBuffer = new ArrayBuffer(byteString.length)
      const int8Array = new Uint8Array(arrayBuffer)

      for(let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i)
      }

      const blob = new Blob([int8Array], {type: imageType});

      return blob;
  }
}
