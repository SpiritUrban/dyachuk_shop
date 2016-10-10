
import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'modelpage',
  templateUrl: './app/components/modelpage/modelpage.component.html' 
})


export class modelpage implements OnInit { 
    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
       console.log('The2 modelpage');
    }    

}

