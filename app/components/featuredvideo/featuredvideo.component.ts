
import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'featuredvideo',
  templateUrl: './app/components/featuredvideo/featuredvideo.component.html' 
})


export class featuredvideo implements OnInit { 
    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
       console.log('The2 featuredvideo')
    }    

}

