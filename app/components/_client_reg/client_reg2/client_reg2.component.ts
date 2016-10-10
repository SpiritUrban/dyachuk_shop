
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES}      from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { z__model_registation_steps }    from '../../../components/_model_reg/z__model_registation_steps/z__model_registation_steps.component';
import { CriptoService }                 from '../../../services/cripto.service';
import { CONFIGS }                       from '../../../app.configs';

//declare var jQuery:   any; 
declare var Crypt:    any;
declare var b64_sha1: any;
declare var io:       any;
declare var Selected_models: any;

@Component({
  selector:     'client_reg2',
  templateUrl:  './app/components/_client_reg/client_reg2/client_reg2.component.html',
  styleUrls:  [ './app/components/_client_reg/client_reg2/client_reg2.component.css' ],
  directives: [z__model_registation_steps],
  providers:  [CriptoService]
})

export class client_reg2 implements OnInit { 
    elementRef:     ElementRef;
    _id:            string;
    session:        string;
    style_conainer: string;    
    RD:             any; // Registration Data
    RD_send:        any; // Registration Data
    body:           any;
    headers:        any;
    socket =        null;
    Best_models:    any;
    Recently_seen:  any;
    Channels_list:  any;
    Groups_list:    any;
    Filtering_list: any;
    Result_list:    any;
    Selected_models:    Array<string>   = []
    Selected_channels:  Array<string>   = []
    Selected_groups:    Array<string>   = []
    Selected_filtering: Array<string>   = []
    test:            any;
    i_liked:         Array<string> = []
    svitch:          boolean;
    svitch2:         boolean;
    svitch_channels: boolean;
    svitch_groups  : boolean;
    svitch_search  : boolean;
    page_mode:       string;    
    Select_your_preferences: Array<string> = []
    search_Visible:          boolean;
    content_of_the_request:  string;

    constructor( 
        elementRef:            ElementRef, 
        private router:        Router, 
        private http:          Http, 
        private criptoService: CriptoService
        ) {
            this.elementRef    = elementRef;
            this.criptoService = criptoService;
           }    


    //()// Перехід назад
    back(){ this.router.navigate(['client_reg1']) }


    next() { 

        // Видалити елементи що повторюються
        var carrent1
        var carrent2
        var lists = ['Selected_models', 'Selected_channels', 'Selected_groups']

        lists.map((el)=>{
            for (var i=0; i < this[el].length; i++) {
                carrent1 = this[el][i]            
                for (var ii=0; ii < this[el].length; ii++) {
                    carrent2 = this[el][ii]                
                    if ( (carrent1._id == carrent2._id) && ( i !== ii ))   this[el].splice(i, 1) 
                }
            }            
        }) // Видалити елементи що повторюються      


        console.log( 'm: ' + this.Selected_models.length )
        
        console.log( this.Selected_models )
        console.log( 'ch ' + this.Selected_channels.length )
        console.log( 'gr ' + this.Selected_groups.length )

            //(3)// Передати  реєстраційнi даннi через сокет
            this.socket.emit('global', {
                _id:     localStorage.getItem("_id"),
                session: localStorage.getItem("session"),
                command: 'Save to my db-segment (JSON->OBJ)',
                data: {                    
                    RD: JSON.stringify( {
                        Selected_models: this.Selected_models,
                        Selected_channels: this.Selected_channels,
                        Selected_groups: this.Selected_groups
                    })
                }                    
            });        

        //()// Перехід на наступну сторінку
        this.router.navigate(['client_reg3']);   

        //this.RD_send = {};
        //this.RD_send.__proto__ = this.RD;

        // Закодувати даані
        //this.RD_send.login      = encodeURIComponent( this.RD_send.login );        
        //this.RD_send.email      = encodeURIComponent( this.RD_send.email );

        //this.RD_send.password   = b64_sha1( this.RD_send.password ); // Шифрування пароля
        //this.RD_send.location_c = window.location.origin;

        // if correct data -> next step        
        //if (   this.RD.login    &&    this.RD.password    &&    this.RD.email.indexOf('@') > 0    &&    this.RD.checkbox    ) { 
            //this.request();   
       
        //} else alert('In correct registrarion data!!!')
    };    

    like(id, ix, target){
        if (  this.i_liked.some((model) => { return model == id })  ) console.log('busy') // Вже лайкнуто
        else {
            if (target = "Best_models") this.Best_models[ix].likes ++ // ilusion+
            if (target = 'Recently_seen') this.Recently_seen[ix].likes ++ // ilusion+
            // Відправити сокетом команду - лайкнути
            this.socket.emit('global', {
                _id:     localStorage.getItem("_id"    ),
                session: localStorage.getItem("session"),
                command: 'I liked model ...',
                target:  id     
            })         
        }   
        this.i_liked.push(id)  
    }

    choose(element, type) {
        console.log('ELEMENT: ---- ')
        console.log(element)
        switch(type) {
            case 'models':
                this.Selected_models.push(element)
                console.log('this.Selected_models')
                console.log(this.Selected_models)                

                // Знайти  element в інших 2-х списках і видалити їх звідти
                for (var i = 0; i < this.Best_models.length; i++) {
                    if ( this.Best_models[i]._id == element._id ) {
                        this.Best_models.splice(i, 1)
                    }
                }
                for (var i = 0; i < this.Recently_seen.length; i++) {
                    if ( this.Recently_seen[i]._id == element._id ) {
                        this.Recently_seen.splice(i, 1)
                    }
                }                 
            break
            case 'search_models':      
                this.Selected_models.push(element)
                console.log('this.Selected_models')
                console.log(this.Selected_models)

                // Знайти  element в інших 2-х списках і видалити їх звідти
                for (var i = 0; i < this.Best_models.length; i++) {
                    if ( this.Best_models[i]._id == element._id ) {
                        this.Best_models.splice(i, 1)
                    }
                }
                for (var i = 0; i < this.Recently_seen.length; i++) {
                    if ( this.Recently_seen[i]._id == element._id ) {
                        this.Recently_seen.splice(i, 1)
                    }
                }  
                for (var i = 0; i < this.Result_list.length; i++) {
                    if ( this.Result_list[i]._id == element._id ) {
                        this.Result_list.splice(i, 1)
                    }
                }                  
            break            
            case 'channels':
                this.Selected_channels.push(element)
                
                for (var i = 0; i < this.Channels_list.length; i++) {
                    if ( this.Channels_list[i].name == element.name ) {
                         this.Channels_list.splice(i, 1)
                    }
                }           
                    
            break
            case 'groups':
                this.Selected_groups.push(element)

                for (var i = 0; i < this.Groups_list.length; i++) {
                    if ( this.Groups_list[i].name == element.name ) {
                         this.Groups_list.splice(i, 1)
                    }
                }     
            break                              
        }
    }

    // Механізм пошуку // +
    searchChange(newValue){
        console.log(newValue)
        //console.log( this.search_Visible )
        this.content_of_the_request = newValue
    }
    searchRun(event){
        if( (event.keyCode == 13) || (event.keyCode ==undefined) ) {
            this.socket.emit('global', {
                _id:     localStorage.getItem("_id"    ),
                session: localStorage.getItem("session"),
                command: 'Give me search result...',
                target:  'Models',
                request: this.content_of_the_request      
            });
        }       
    }
    searchNew(search){
            this.socket.emit('global', {
                _id:     localStorage.getItem("_id"    ),
                session: localStorage.getItem("session"),
                command: 'Give me search result...',
                target:  'Models',
                request: search      
            });      
    }    
    // Механізм пошуку // -


    ngOnInit() {
        console.log('The client_reg2');

        this._id     = localStorage.getItem("_id"    )
        this.session = localStorage.getItem("session")

        this.Select_your_preferences = [
            "Blonde",
            "Brunet",
            "German", "Irish", "African", "English", "American", "Mexican",	"Italian", "Polish", "French", 	"American Indian and Alaskan Native", "Scottish", "Dutch", "Norwegian", "Scotch-Irish", "Chinese"
        ]

        //this.Best_models          = [{_id: '0', username: '0', likes: '0'}]
        //this.Best_models_length   = [{_id: '0', username: '0', likes: '0'}]

        //this.Recently_seen        = [{_id: '0', username: '0', likes: '0'}]
        //this.Recently_seen_length = [{_id: '0', username: '0', likes: '0'}]
        //this.Channels_list        = [{_id: '0', username: '0', likes: '0'}]

        this.page_mode = 'models'        

        //jQuery('#log').text('Тру ля ля - jQuery'); // Працює !!!
        
        this.RD = {};

        //()// Підключаємо сокети
        this.socket = io( CONFIGS.url_backend_ws_server );       

        //()// Запросити данні 'Best models'
        this.socket.emit('global', {
            _id:     this._id,
            session: this.session,
            command: 'Give me ...',
            target:  'Best models'      
        });   
        //()// Запросити данні 'Recently_seen'
        this.socket.emit('global', {
            _id:     this._id,
            session: this.session,
            command: 'Give me ...',
            target:  'Recently_seen'      
        });          
        //()// Запросити данні 'Channels'
        this.socket.emit('global', {
            _id:     this._id,
            session: this.session,
            command: 'Give me ...',
            target:  'Channels'      
        });  
        //()// Запросити данні 'Recently_seen'
        this.socket.emit('global', {
            _id:     this._id,
            session: this.session,
            command: 'Give me ...',
            target:  'Groups'      
        });          


        // Реакція на відповідь з сервера
        this.socket.on('global', (data) => {      
                console.log( data )      
                console.log( ' - прийшло з червера в компоненту "client_reg2" ');

                switch(data.command) {

                    case 'The best_list':
                        console.log('The best_list')    
                        this.Best_models = data.best_list
                        /*
                        var i =0    
                        for (var model in data.best_list ){
                            this.Best_models_length[i] = 1
                            i++
                        }
                        */
                        setTimeout(() =>{ this.svitch = true}, 10)
                        console.log('this.Best_models: ' + this.Best_models)
                        break;

                    case 'The recently_seen':
                        console.log('The recently_seen')     
                        console.log('recently_seen: ' + data.recently_seen) 

                        this.Recently_seen = data.recently_seen
                        /*
                        var i =0    
                        for (var model in data.recently_seen ){
                            this.Recently_seen_length[i] = 1
                            i++
                        }*/

                        setTimeout(() =>{ this.svitch2 = true}, 10)
                        console.log('this.Best_models: ' + this.Recently_seen)
                        break;   

                    case 'The Channels_list':
                        console.log('The Channels_list')     
                        console.log('channels_list: ' + data.channels_list) 

                        this.Channels_list = data.channels_list

                        setTimeout(() =>{ this.svitch_channels = true}, 10)
                        console.log('this.Channels_list: ' + this.Channels_list)
                        break;   

                    case 'The groups_list':
                        console.log('The groups_list')     
                        console.log('groups_list: ' + data.groups_list) 

                        this.Groups_list = data.groups_list

                        setTimeout(() =>{ this.svitch_groups = true}, 10)
                        console.log('this.Groups_list: ' + this.Groups_list)
                        break;    

                    case 'The search result':
                        console.log('The search result')     
                        console.log('The search result: ' + data.result) 

                        this.Result_list = data.result

                        setTimeout(() =>{ this.svitch_search = true}, 10)
                        console.log('this.Result_list: ' + this.Result_list)
                        break;                                                

                    default:
                        console.log('The DEFAULT')                     
                }                
        })
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