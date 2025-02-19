import { Pipe, PipeTransform } from '@angular/core';
import { Munieca } from '../interfaces/munieca.interface';

@Pipe({
  name: 'muniecaImage'
})
export class MuniecaImagePipe implements PipeTransform {

  transform(munieca: Munieca): string {
    if (!munieca._id && !munieca.Foto ){
      return 'no-image.png';
    }

    if ( munieca.Foto ) return munieca.Foto;

    return `no-image.png`
  }


}
