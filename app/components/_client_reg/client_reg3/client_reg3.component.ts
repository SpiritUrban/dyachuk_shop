
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES}      from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { z__model_registation_steps }    from '../../../components/_model_reg/z__model_registation_steps/z__model_registation_steps.component';
import { CriptoService }                 from '../../../services/cripto.service';
import { CONFIGS }                       from '../../../app.configs';

declare var jQuery:   any;
declare var Crypt:    any;
declare var b64_sha1: any;
declare var io:       any;

@Component({
  selector:     'client_reg3',
  templateUrl:  './app/components/_client_reg/client_reg3/client_reg3.component.html',
  styleUrls:  [ './app/components/_client_reg/client_reg3/client_reg3.component.css' ],
  directives: [z__model_registation_steps],
  providers:  [CriptoService]
})

export class client_reg3 implements OnInit { 
    elementRef:     ElementRef;
    style_conainer: string;    
    RD:             any; // Registration Data
    RD_send:        any; // Registration Data
    body:           any;
    headers:        any;
    socket =        null;

    constructor( 
        elementRef:            ElementRef, 
        private router:        Router, 
        private http:          Http, 
        private criptoService: CriptoService
        ) {
            this.elementRef    = elementRef;
            this.criptoService = criptoService;
           }    



    next() { 
        console.log(this.RD)
        //()// Передати  реєстраційi даннi через сокет
        this.socket.emit('global', {
            _id:     localStorage.getItem("_id"),
            session: localStorage.getItem("session"),
            command: 'Save to my db-segment',
            data: {
                RD: this.RD
            }       
        });     

        //()// Перехід на наступну сторінку
        this.router.navigate(['client_reg4']);      

    };    

 

    ngOnInit() {
        console.log('The client_reg3');        
        this.RD = {};
        this.RD.pay_method = 'KD_Card'

        // Підключаємо сокети
        this.socket = io( CONFIGS.url_backend_ws_server );       
    }    
}

// -------------------------------------------------------------------------------------------- END
