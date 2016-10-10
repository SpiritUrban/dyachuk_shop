
import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS }    from '@angular/http';

import { my_header } from './components/my_header/my_header.component';
import { my_footer } from './components/my_footer/my_footer.component';
import { enter_18 }  from './components/enter_18/enter_18.component';

// For precompile
import { model_reg1 }    from './components/_model_reg/model_reg1/model_reg1.component';
import { model_reg2 }    from './components/_model_reg/model_reg2/model_reg2.component';
import { model_reg3 }    from './components/_model_reg/model_reg3/model_reg3.component';
import { model_reg4 }    from './components/_model_reg/model_reg4/model_reg4.component';
import { model_reg5 }    from './components/_model_reg/model_reg5/model_reg5.component';
import { model_reg6 }    from './components/_model_reg/model_reg6/model_reg6.component';

import { client_reg1 }    from './components/_client_reg/client_reg1/client_reg1.component';
// For precompile

import { CONFIGS }   from './app.configs';

declare var io: any;
declare var window: any;


@Component({
  selector: 'my-app',
  template: `  
    
    <!-- nav>
      <a routerLink="/test"  routerLinkActive="active">          ...test          </a>       
      <a routerLink="/channel" routerLinkActive="active">        ...channel       </a>
      <a routerLink="/featuredvideo" routerLinkActive="active">  ...featuredvideo </a>
      <a routerLink="/modelpage" routerLinkActive="active">      ...modelpage     </a>
      <a routerLink="/singlevideo" routerLinkActive="active">    ...singlevideo   </a>
      <a routerLink="/stories" routerLinkActive="active">        ...stories       </a>
      <a routerLink="/top100vote" routerLinkActive="active">     ...top100vote    </a>
      <a routerLink="/verified" routerLinkActive="active">       ...verified      </a>
      <a routerLink="/model_reg1" routerLinkActive="active">     ...model_reg1    </a>

      <a routerLink="/client_reg1" routerLinkActive="active">            ...client_reg1         </a>
      <a routerLink="/client_reg_15min" routerLinkActive="active">       ...client_reg_15min    </a>

      <span> _ </span>
      <a routerLink="/confirmation_email" routerLinkActive="active">     ...confirmation_email   </a>

      <a routerLink="/authorization" routerLinkActive="active">  ...authorization </a>

      <a routerLink="/payment" routerLinkActive="active">        ...payment       </a>
      <a routerLink="/transaction" routerLinkActive="active">    ...transaction   </a>

    </nav -->  

    <!--enter_18> </enter_18-->

    <div class="bg-wrapper"></div>

    <my_header></my_header>
    
    <router-outlet></router-outlet>    

    <my_footer></my_footer>

    <!--div id="log"> 2 </div-->    

    

    `,
    directives: [ ROUTER_DIRECTIVES, my_header, my_footer, enter_18 ],
    providers: [ HTTP_PROVIDERS ],
    precompile: [ model_reg1, model_reg2, model_reg3, model_reg4, model_reg5, model_reg6 ]
})


export class AppComponent {
    price: number = 0.0;
    socket = null;
    bidValue = 'x';
 
    constructor(){      
    }

    test(){ console.log('The TEST in APP !!!!')}
    ngOnInit() {

      // Підключаємо сокети
      this.socket = io( CONFIGS.url_backend_ws_server );

      // Шлем привіт. 
      this.socket.emit('global', { 
        msg: ' Hello server! '
       });

      
      // МУЛЯЖ - встановлюю існуючі ключі
      // Це встановиться через ХТТП (форма авторизації)
      //localStorage.setItem("_id",   "57d8e29e3ad8e23c06b486d9");
      //localStorage.setItem("session", "444a6s54saf5f4a3sf54as");      
      console.log('auth data')
      console.log('auth data')
      console.log('auth data')
      console.log(localStorage.getItem("_id"))
      console.log(localStorage.getItem("session"))

      
      // Шлем токен і ід, для отримання доступу
      this.socket.emit('access', {
          _id:     localStorage.getItem("_id"),
          session: localStorage.getItem("session")        
       });       

      // Реакція на відповідь з сервера
      this.socket.on('news', function(data){      
            console.log( data )      
            console.log( ' - прийшло з червера в компоненту "app" ');
            //this.socket.emit('global', { app: 'init-x' });
            //this.price = data;
      }.bind(this));

 
     
      // Тестовий сокет-пульс 
      /*
      setInterval(() => {
        console.log('*');
        this.socket.emit('global', { app: 'init-x3', random: Math.random() });
      }, 3000);*/


    }//ngOnInit 

}//export


