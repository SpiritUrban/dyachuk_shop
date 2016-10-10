
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
  selector:     'client_reg1',
  templateUrl:  './app/components/_client_reg/client_reg1/client_reg1.component.html',
  styleUrls:  [ './app/components/_client_reg/client_reg1/client_reg1.component.css' ],
  directives: [z__model_registation_steps],
  providers:  [CriptoService]
})

export class client_reg1 implements OnInit { 
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

    next_or_repeat(data){
        // if successful registration -> "report it  & next"  // else -> "report it"        
        console.log(data);
        // popap (saccessful)  or   popap (занято - введіть іньші)

        if (data.email=='free' && data.login=='free') { 
            alert('Зареєстровано!'); 

            //(1)// Автоматична авторизація
            this.request_auth();

            //(2)// Закодувати даані lop
            for(var i in this.RD){
                console.log( "ENCODE>>" );
                console.log( "key: " + i + ", value: " + this.RD[i] );
                this.RD_send[i]      = encodeURIComponent( this.RD[i] );   
            }        
            console.log( "RESULT>>" );    
            console.log( this.RD_send );              

            //(3)// Передати другу частину реєстраційних данних через сокет
            this.socket.emit('global', {
                _id:     localStorage.getItem("_id"),
                session: localStorage.getItem("session"),
                command: 'Save to my db-segment',
                data: {
                    RD: this.RD_send
                }       
            });  

            //(4)// Перехід на наступну сторінку
            this.router.navigate(['client_reg2']); 
        }
        else if (data.email=='busy') if (confirm('Email busy! Цей iмейл вже зареєстрований. Відновити пароль???') == true) {
            alert('Відновлення паролю! - __Потрібно реалізувати!!! ');
            // Тут потрібно перенаправити на сторінку відновлення паролю
            // Або ж відразу запустити модуль відправки паролю на пошту чи збросу паролю 
        }
        if (data.login=='busy') alert('Login busy! Логін вже зайнятий. Виберіть іньший!')
    }

    request() {       
        var  body = this.body;
        this.body = JSON.stringify({ 
            email:      this.RD_send.email, 
            password:   this.RD_send.password, 
            login:      this.RD_send.login, 
            location_c: this.RD_send.location_c,
            account:    'Client' // Задати тип акаунту
        }); 
        console.log( this.body )
        this.headers = new Headers({ 
            'Content-Type': 'application/json',
            body     
        }); 
        return this.http.post( CONFIGS.url_backend_server + '/api/registration', {a:2}, {
        headers: this.headers
        })
        .map(res => res.json())
        .subscribe(
          data =>  this.next_or_repeat(data),
          err => {
              console.log('Error !!! ==> ' + err);
              this.request();
          },
          () => console.log('Authentication Complete')
         );           
    }

    request_auth() {        
        return this.http.post( CONFIGS.url_backend_server + '/api/authorization', {a:2}, {
        headers: this.headers
        })
        .map(res => res.json())
        .subscribe(
          data => { 
                    console.log('Data ==> '); console.log(data);
                    this.save_session(data);
                    if ( data._id !== undefined ) {                        

                        this.soket_acess()                         
                    }
                    if ( data.status == "data NOT coincide" ) alert( "data NOT coincide" )
                  },
          err => {
              console.log('Error !!! ==> ' + err);              
          },
          () => console.log('Authentication Complete')
         );           
    }   

    soket_acess(){
        console.log(' The soket_access')
        // Просимо сокет-сервер обновити данні про юзерів (зчитати з БД сесію)        
        this.socket.emit('refresh', {  });   
        alert( ' success! ' )
        // Шлем токен і ід, для отримання доступу
            this.socket.emit('access', {
                _id:     localStorage.getItem("_id"),
                session: localStorage.getItem("session")        
            });       
    }
    save_session(data){
      localStorage.setItem("_id",     data._id);
      localStorage.setItem("session", data.session);        
    }     

    next() { 
        this.RD_send = {};
        this.RD_send.__proto__ = this.RD;

        // Закодувати даані
        this.RD_send.login      = encodeURIComponent( this.RD_send.login );        
        this.RD_send.email      = encodeURIComponent( this.RD_send.email );

        this.RD_send.password   = b64_sha1( this.RD_send.password ); // Шифрування пароля
        this.RD_send.location_c = window.location.origin;


        
        /*
        // Checkbox indicator
        if (!this.RD.checkbox) { 
            this.style_conainer = 'alert';             // Highlight checkbox
            setTimeout(()=>{  this.clear();  }, 2000); // Remove the backlight after 2 seconds                      
        }
        */

        // if correct data -> next step        
        if (   this.RD.login    &&    this.RD.password    &&    this.RD.email.indexOf('@') > 0     ) { 
            
            this.request();   
       
        } else alert('In correct registrarion data!!!')
    };    

    // Remove the backlight on .checkbox-wrapper
    clear() {        
        this.style_conainer = 'clear_alert';
        console.log("clear");
    };   

    ngOnInit() {
        console.log('The client_reg1');
        
        this.RD = {};

        // Підключаємо сокети
        this.socket = io( CONFIGS.url_backend_ws_server );       
    }    
}

// -------------------------------------------------------------------------------------------- END















// Зразки робочих методів

    /*
    getTest() {
        //this.test = this.criptoService.test()
        alert(this.criptoService.test('Hi!'));
    }
    */

// Soket pulse
        /*
        setInterval(() => {
            console.log('access');
            this.socket.emit('access', {
                _id:     localStorage.getItem("_id"),
                session: localStorage.getItem("session")        
            });          
        }, 2000);*/    

//
            /*
            // Put its Data to localStorage
            localStorage.setItem( 'RD1', JSON.stringify(this.RD) );    
            // test // Get its Data from localStorage    
            console.log(   JSON.parse( localStorage.getItem( 'RD1' ) )    );*/             