
import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'my_header',
  templateUrl: './app/components/my_header/my_header.component.html',
  styleUrls: [ './app/components/my_header/my_header.component.css' ]
})


export class my_header implements OnInit { 
    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
       console.log('The my_header!')
    }    

}

