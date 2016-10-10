
import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'singlevideo',
  templateUrl: './app/components/singlevideo/singlevideo.component.html' 
})


export class singlevideo implements OnInit { 
    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
       console.log('The2 singlevideo');
    }    

}

