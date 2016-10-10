
import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'main_page',
  templateUrl: './app/components/main_page/main_page.component.html',
  styleUrls: [ './app/components/main_page/main_page.component.css' ]
})


export class main_page implements OnInit { 
    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
       console.log('The2 main_page!!!')
    }    

}

