
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES}      from '@angular/router';

import { CONFIGS }                       from '../../../app.configs';

declare var jQuery: any;
declare var io:     any;

@Component({
  selector:    'model_reg2',
  templateUrl: './app/components/_model_reg/model_reg2/model_reg2.component.html',
  styleUrls: [ './app/components/_model_reg/model_reg2/model_reg2.component.css' ]
})


export class model_reg2 implements OnInit { 
    elementRef: ElementRef;
    RD:         any = {}; // Registration Data
    RD_send:    any = {}; // Registration Data
    socket          = null;    

    autoComplete() {
        this.RD.firstname = this.RD.lastname = this.RD.month = this.RD.day = this.RD.year = this.RD.gender = this.RD.country = this.RD.nationality = this.RD.ethnicity = "test"
    }
    next() {         
        //this.RD_send.__proto__ = this.RD;             

        // Закодувати даані lop
        for(var i in this.RD){
            console.log( "ENCODE>>" );
            console.log( "key: " + i + ", value: " + this.RD[i] );
            this.RD_send[i]      = encodeURIComponent( this.RD[i] );   
        }        
        console.log( "RESULT>>" );    
        console.log( this.RD_send );        

        // if correct data -> next step   
        if (   this.RD.firstname    &&    this.RD.lastname    &&    this.RD.month    &&    this.RD.day    &&    this.RD.year    &&    this.RD.gender    &&    this.RD.country    &&    this.RD.nationality    &&    this.RD.ethnicity    ) { 

            this.socket.emit('global', {
                _id:     localStorage.getItem("_id"),
                session: localStorage.getItem("session"),
                command: 'Save to my db-segment',
                data: {
                    RD: this.RD_send
                }       
            });  

            this.router.navigate(['model_reg3']);            
        } else alert(' Enter at all the data!!! ')
    };    
  

    constructor(elementRef: ElementRef, private router:Router) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        console.log('The2 model_reg2');  

        //this.autoComplete()    
        this.socket = io( CONFIGS.url_backend_ws_server );
        /*
        setInterval(() => {
            console.log('access');
            this.socket.emit('access', {
                _id:     localStorage.getItem("_id"),
                session: localStorage.getItem("session")        
            });          
        }, 2000);   
        */  
        // Поки що спрацьовує з 1 разу
        this.socket.emit('access', {
            _id:     localStorage.getItem("_id"),
            session: localStorage.getItem("session")        
        });   
    }    
}

