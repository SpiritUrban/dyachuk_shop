
import { Component, ElementRef, OnInit } from '@angular/core';

import { CONFIGS } from '../../app.configs';

declare var jQuery: any;
declare var io: any;
declare var window: any;

@Component({
  selector: 'test',
  template: `
  <h1 id="log"> The TEST-COMPONENT </h1>

  <button (click)="sendMessage()" type="button" value="Create"> Send Message to Frame </button>  

  <iframe id="frame" src="https://rest-ex4-spiriturban.c9users.io" name="target">
    <p>Your browser does not support iframes.</p>
  </iframe>
  ` ,
    styleUrls: [ './app/components/test/test.css' ],
 
})


export class test implements OnInit { 
    elementRef: ElementRef;

    
    socket = null;
    bidValue = '';   
    
    
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }



    sendMessage() {
        var receiver = window.top.frames['target']; //document.getElementById('iframe').contentWindow;
        receiver.postMessage('Hello Treehouse!', 'https://rest-ex4-spiriturban.c9users.io');
	}    

    ngOnInit() {
        console.log('Test');
       // jQuery(this.elementRef.nativeElement).draggable({containment:'#draggable-parent'});
        jQuery('body').css('color','red');
        //jQuery('#log').text('Тру ля ля - jQuery');  
        //window.emit( { "Fack": "Pussy"} );
        //window.socket.emit('my other event', { my: 'data3' });  
        /*this.socket.on('news', function (data) {
          console.log('on in test');      
				// прив"язати до іншої події???  
        });	 */     


      this.socket = io( CONFIGS.url_backend_ws_server );

      this.socket.on('news', function(data){            
            console.log(data+ ' The Test');
            //this.socket.emit('global', { app: 'init-x' });
            //this.price = data;
      }.bind(this));

     

      this.socket.emit('global', { app: 'init-x2' });
      this.socket.emit('global', { app: 'init-x3' });

    }    

}

//alert();
// $( "my-app" ).h1( "Next Step..." );

/*
$('body').css('color','red');

$('my-app').css({
    display:'block',
    margin:'10px',
    color:'#ffffff',
    border: 'solid 1px red'
});

$('#log').text('Тру ля ля');
*/