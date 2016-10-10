
import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'verified',
  templateUrl: './app/components/verified/verified.component.html' 
})


export class verified implements OnInit { 
    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
       console.log('The2 verified');
    }    

}

