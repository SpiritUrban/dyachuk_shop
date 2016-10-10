
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES}      from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { z__model_registation_steps }    from '../../components/_model_reg/z__model_registation_steps/z__model_registation_steps.component';
import { CriptoService }                 from '../../services/cripto.service';
import { CONFIGS }                       from '../../app.configs';

declare var jQuery:   any;
declare var Crypt:    any;
declare var b64_sha1: any;
declare var io:       any;

@Component({
  selector: 'authorization',
  templateUrl: './app/components/authorization/authorization.component.html',
  styleUrls: [ './app/components/authorization/authorization.component.css' ],
  directives: [z__model_registation_steps],
  providers: [CriptoService]
})


export class authorization implements OnInit { 
    elementRef: ElementRef;

    style_conainer: string;    
    RD:      any; // Registration Data_1
    RD_send: any; // Registration Data_1
    socket = null;

    constructor( 
        elementRef: ElementRef, 
        private router:Router, 
        private http: Http, 
        private criptoService: CriptoService
        ) {
            this.elementRef = elementRef;
            this.criptoService = criptoService;
    }    

    /*
    getTest() {
        //this.test = this.criptoService.test()
        alert(this.criptoService.test('Hi!'));
    }
    */


    next_or_repeat(data){
        // if successful registration -> "report it  & next"
        // else -> "report it"
        console.log('next_or_repeat!!!!!!!!!!!');
        console.log(data);
        /*
        // popap (saccessful)  or   popap (занято - введіть іньші)
        if (data.email=='free' && data.login=='free') { 
            alert('Зареєстровано!'); 
            this.router.navigate(['model_reg2']); 
        }
        else if (data.email=='busy') if (confirm('Email busy! Цей iмейл вже зареєстрований. Відновити пароль???') == true) {
            alert('Відновлення паролю! - __Потрібно реалізувати!!! ');
            // Тут потрібно перенаправити на сторінку відновлення паролю
            // Або ж відразу запустити модуль відправки паролю на пошту чи збросу паролю 
        }
        if (data.login=='busy') alert('Login busy! Логін вже зайнятий. Виберіть іньший!')*/
    }

    soket_access(){

        console.log(' The soket_access')

        // Просимо сокет-сервер обновити данні про юзерів (зчитати з БД сесію)        
        this.socket.emit('refresh', {  });    

        alert( ' success! ' )

        // Шлем токен і ід, для отримання доступу
        this.socket.emit('access', {
            _id:     localStorage.getItem("_id"),
            session: localStorage.getItem("session")        
        });          
        /*
        setInterval(() => {
            console.log('access');
            this.socket.emit('access', {
                _id:     localStorage.getItem("_id"),
                session: localStorage.getItem("session")        
            });          
        }, 2000);
        */
    }

    save_session(data){
      localStorage.setItem("_id",     data._id);
      localStorage.setItem("session", data.session);        
    }

    request() {
        //console.log(this.RD);        
        let body = JSON.stringify({
            email: this.RD_send.email, 
            password: this.RD_send.password, 
            login: this.RD_send.login, 
            location_c: this.RD_send.location_c
        }); 
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            body     
        }); 
        
        return this.http.post( CONFIGS.url_backend_server + '/api/authorization', {a:2}, {
        headers: headers
        })
        .map(res => res.json())
        .subscribe(
          data => { 
                    console.log('Data ==> '); console.log(data);
                    this.save_session(data);
                    if ( data._id !== undefined ) {                        

                        this.soket_access()
                         
                    }
                    if ( data.status == "data NOT coincide" ) alert( "data NOT coincide" )
                  },
          err => {
              console.log('Error !!! ==> ' + err);
              /*setTimeout(() => {
                  console.log('****');
                  this.request();
              },  2000);*/
              //this.request();
              
          },
          () => console.log('Authentication Complete')
         );           
    }

    // Пройти авторизацію
    // Реально - отримати код сесії
    // запит - сервер генерує сесію, пише в БД і - віддає сесію відгуком
    next() {  
        this.RD_send = {};
        this.RD_send.__proto__ = this.RD;        

        // Закодувати даані
        this.RD_send.login      = encodeURIComponent( this.RD_send.login );        
        this.RD_send.email      = encodeURIComponent( this.RD_send.email );

        this.RD_send.password   = b64_sha1( this.RD_send.password ); // Шифрування пароля
        this.RD_send.location_c = window.location.origin;        



        // if correct data -> next step        
        if (   this.RD.login    &&    this.RD.password   ) { 
            //alert();
            this.request();   
            /*
            // Put its Data to localStorage
            localStorage.setItem( 'RD1', JSON.stringify(this.RD) );    
            // test // Get its Data from localStorage    
            console.log(   JSON.parse( localStorage.getItem( 'RD1' ) )    );*/            
        }
    };
    

    ngOnInit() {
        console.log('The2 model_reg1');

        // Підключаємо сокети
        this.socket = io( CONFIGS.url_backend_ws_server );

        this.RD = {};
    }    
}

