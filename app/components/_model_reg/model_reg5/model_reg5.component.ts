
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES}      from '@angular/router';
import { CONFIGS }                       from '../../../app.configs';

declare var jQuery: any;
declare var io:     any;

@Component({
  selector:    'model_reg3',
  templateUrl: './app/components/_model_reg/model_reg5/model_reg5.component.html',
  styleUrls: [ './app/components/_model_reg/model_reg5/model_reg5.component.css' ]
})


export class model_reg5 implements OnInit { 
    elementRef: ElementRef;
    RD:         any = {}; // Registration Data
    RD_send:    any = {}; // Registration Data
    socket          = null;    

    autoComplete() {
        this.RD.select_one_card = this.RD.acc_number_1_4 = this.RD.acc_number_2_4 = this.RD.acc_number_3_4 = this.RD.acc_number_4_4 = this.RD.card_firstname = this.RD.card_lastname = 'test'
        this.RD.heckbox = true        
    }    

    next() {
        // Закодувати даані lop
        for(var i in this.RD){
            console.log( "ENCODE>>" );
            console.log( "key: " + i + ", value: " + this.RD[i] );
            this.RD_send[i]      = encodeURIComponent( this.RD[i] );   
        }        
        console.log( "RESULT>>" );    
        console.log( this.RD_send );

        // if correct data -> next step        
        if (   this.RD.select_one_card    &&   this.RD.acc_number_1_4    &&   this.RD.acc_number_2_4    &&   this.RD.acc_number_3_4    &&   this.RD.acc_number_4_4    &&    this.RD.card_firstname    &&    this.RD.card_lastname    &&    this.RD.heckbox    ) {

            // Відправити данні
            this.socket.emit('global', {
                _id:     localStorage.getItem("_id"),
                session: localStorage.getItem("session"),
                command: 'Save to my db-segment',
                data: {
                    RD: this.RD_send
                }       
            });              

            this.router.navigate(['model_reg6']);
        } else alert(' Enter at all the data!!! ')
    }
  
    constructor(elementRef: ElementRef, private router:Router) {
        this.elementRef = elementRef;
    }
    
    ngOnInit() {
        console.log('The2 model_reg5');  
        //this.autoComplete()

        // Встановлення доступу через сокет
        this.socket = io( CONFIGS.url_backend_ws_server );   
        this.socket.emit('access', {
            _id:     localStorage.getItem("_id"),
            session: localStorage.getItem("session")        
        }); 
    }    

}

