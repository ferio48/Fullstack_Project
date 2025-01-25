import { Injectable } from '@angular/core';
import { ImageDataModel } from '../models/image-data-model';
import { FileHandle } from '../models/file-handle';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(imageFileData: ImageDataModel[]) {
    const productImagesToFileHandle: FileHandle[] = [];
    
    for(let i = 0; i < imageFileData.length; i++) {
      
      const imageBlob = this.dataURItoBlob(imageFileData[i].imageData, imageFileData[i].type)

      const imageFile = new File([imageBlob], imageFileData[i].name, {type: imageFileData[i].type});

      const finalFileHandle: FileHandle = {
        id: imageFileData[i].id,
        name: imageFileData[i].name,
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      productImagesToFileHandle.push(finalFileHandle);
    }

    return productImagesToFileHandle;
  }

  public dataURItoBlob(picBytes: any, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], {type: imageType});
    return blob;
  }
}
