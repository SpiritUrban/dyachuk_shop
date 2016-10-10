
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES}      from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { z__model_registation_steps }    from '../../../components/_model_reg/z__model_registation_steps/z__model_registation_steps.component';
import { CriptoService } from '../../../services/cripto.service';
import { CONFIGS } from '../../../app.configs';

declare var jQuery: any;
declare var Crypt: any;
declare var rstr2hex: any;

@Component({
  selector: 'confirmation_email',
  templateUrl: './app/components/_model_reg/confirmation_email/confirmation_email.component.html',
  styleUrls: [ './app/components/_model_reg/confirmation_email/confirmation_email.component.css' ],
  directives: [z__model_registation_steps],
  providers: [CriptoService]
})


export class confirmation_email implements OnInit { 
    elementRef: ElementRef;

    style_conainer: string;    
    RD: any; // Registration Data_1

    constructor( 
        elementRef: ElementRef, 
        private router:Router, 
        private http: Http, 
        private criptoService: CriptoService
        ) {
            this.elementRef = elementRef;
            this.criptoService = criptoService;
    }   

    next_or_repeat(data){
        // if successful registration -> "report it  & next"
        // else -> "report it"
        console.log('*******************');
        console.log(data);
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

    request() {
        //console.log(this.RD);    
            
        console.log(' Start request(); ');

        // Це выдправляэться на сервер запитом 
        let body = JSON.stringify({ 
            hesh:  window.location.hash
        }); 
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            body     
        }); 

        return this.http.post( CONFIGS.url_backend_server + '/api/confirmation_email', {a:2}, {
        headers: headers
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
    




    ngOnInit() {
        console.log('The2 confirmation_email');

        this.request();

        //alert(CONFIGS.url_backend_server);

        //alert( window.location.hash );

        this.RD = {};
/*
        Crypt = new Crypt();  // constructor  
        console.log( '444444444444444444444444444444' );
        console.log( Crypt.AES.encrypt("plaintext") );
        console.log( '444444444444444444444444444444' );
        //this.getTest();
        console.log( rstr2hex('abdsgsdsdgsdgsdgsdgdsgsdgdsggsdgdsgc')  );*/
    }    

}

