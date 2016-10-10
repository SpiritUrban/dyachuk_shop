
import { Component, ElementRef, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'z__model_registation_steps',
  templateUrl: './app/components/_model_reg/z__model_registation_steps/z__model_registation_steps.component.html',
  styleUrls: [ './app/components/_model_reg/z__model_registation_steps/z__model_registation_steps.component.css' ],
    directives: [ROUTER_DIRECTIVES]
})


export class z__model_registation_steps implements OnInit { 
    elementRef: ElementRef;
   

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        console.log('The2 z__model_registation_steps ');     
       
    }    

}

