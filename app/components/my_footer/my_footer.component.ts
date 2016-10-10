
import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'my_footer',
  templateUrl: './app/components/my_footer/my_footer.component.html',
  styleUrls: [ './app/components/my_footer/my_footer.component.css' ]
})


export class my_footer implements OnInit { 
    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
       console.log('The my_footer!')
    }    

}

