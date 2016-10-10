
import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'enter_18',
  templateUrl: './app/components/enter_18/enter_18.component.html',
  styleUrls: [ './app/components/enter_18/enter_18.component.css' ]
})


export class enter_18 implements OnInit { 
    elementRef: ElementRef;
    accsess_18: string; // Must be 'Open' to access
    // Open access 18+
    open_18() {
        this.accsess_18 = 'Open';
        console.log("Open 18+");
        console.log(this.accsess_18);  
    };    
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
       console.log('The2 enter_18');
    }    

}

