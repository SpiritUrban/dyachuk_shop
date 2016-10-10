
import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'transaction',
  templateUrl: './app/components/transaction/transaction.component.html' 
})


export class transaction implements OnInit { 
    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
       console.log('The2 transaction');
    }    

}

