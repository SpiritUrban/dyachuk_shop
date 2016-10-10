
import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'top100vote',
  templateUrl: './app/components/top100vote/top100vote.component.html' ,
  styleUrls: [ './app/components/top100vote/top100vote.component.css' ]
})


export class top100vote implements OnInit { 
    elementRef: ElementRef;
    slides: string[];
    position: number;
    add(x: number) { 
        this.position++ ; 
        if ( this.position > this.slides.length - 1 ) this.position = 0;
        //console.log(x); 
    };
    subtract(x: number) { 
        this.position-- ; 
        if ( this.position < 0 ) this.position = this.slides.length - 1;
        //console.log(x); 
    };    
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
        this.slides = ['app/img/preview_01.jpg', 'app/img/preview_02.jpg', 'app/img/preview_03.jpg', 'app/img/preview_04.jpg', 'app/img/preview_05.jpg'];
        this.position = 0;
    }
    ngOnInit() {
       console.log('The top100vote');
       //jQuery('main').text('Тру ля ля - jQuery');
    }    

}

