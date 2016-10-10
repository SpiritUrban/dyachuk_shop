// Імпортуємо декоратор "Injectable" і застосовуємо його до класу "CriptoService"
import {Injectable} from '@angular/core';

@Injectable()
// Створюємо клас CriptoService
export class CriptoService {
    hexcase: any = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
    b64pad: any  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

    // Перший метод
    test(x) {
        return x + this.test3;
    }

     test3 = () => {return 3}
}

