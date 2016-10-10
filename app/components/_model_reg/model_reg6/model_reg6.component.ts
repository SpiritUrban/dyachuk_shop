// Повторний рефакторинг пізніше -- свіжий погляд
// !!! Потім обмежити розміри файлів. Вирішити які розміри...

import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES}      from '@angular/router';
import { CONFIGS }                       from '../../../app.configs';

declare var jQuery: any;
declare var io:     any;


@Component({
  selector: 'model_reg3',
  templateUrl: './app/components/_model_reg/model_reg6/model_reg6.component.html',
  styleUrls: [ './app/components/_model_reg/model_reg6/model_reg6.component.css' ]
})


export class model_reg6 implements OnInit { 
    elementRef: ElementRef;
    RD:         any = {}; // Registration Data
    RD_:        any = {}; // For filtering
    RD_send:    any = {}; // Registration Data
    socket          = null;   
    items = [1,2];
    loaded_files: any = {}

    autoComplete() {
        this.RD.select_one_card = this.RD.acc_number_1_4 = this.RD.acc_number_2_4 = this.RD.acc_number_3_4 = this.RD.acc_number_4_4 = this.RD.card_firstname = this.RD.card_lastname = 'test'
        this.RD.heckbox = true        
    }    



  onChange(e, name, inter_path, external_command) {  // e == change { target: <input#id-front>, isTrusted: true, currentTarget: <input#id-front>, eventPhase: 2, bubbles: true, cancelable: false, defaultPrevented: false, timeStamp: 1474539656690000, originalTarget: <input#id-front>, explicitOriginalTarget: <input#id-front>, NONE: 0 }

    console.log('First') ////////

    // Vizualization
    if ( name  !== 'upload-avatar' ) {
        document.getElementById(name+"__").style.display =  "none"
        document.getElementById(name+"_").style.display =  "block"
    }

    console.log('viz') ////////    

    //document.getElementById("modal").style.height = '100px'
    //document.getElementById("modal").style.display = 'inline'

    var fileReader            = new FileReader();
    
    var file = (<HTMLInputElement>document.getElementById(name)).files[0];  // file == {  name: "OhdIJZy8H7o.jpg", lastModified: 1467921666657,  lastModifiedDate: Date 2016-07-07T20:01:06.657Z,  size: 214450,  type: "image/jpeg"   }
    console.log('file')

    let iterations = Math.ceil( file.size / 1048576 )
    console.log( 'iterations ' +  iterations ) ////////
    console.log( file.size ) ////////

    //for ( var i=0; i<iterations; i++ ) {}

    var i=0
    var loop = () => {
        var progress = (100/iterations)*i
        console.log('in-loop') ////////
        //document.getElementById(name + "_").style.width =  progress+"%"
        console.log('in-loop-2') ////////

        var start = i * 1048576 
        var end   = start + 1048576
        console.log( 'start = ' + start ) ////////
        console.log( 'end = ' + end ) ////////

        var slice = file.slice(start, end);  // Blob { size: 1048576, type: "" }
        fileReader.readAsArrayBuffer(slice);


        // --- суто для аватарки ---
        if ( name  == 'upload-avatar' ) {
            var fileReader_for_canvas: any,
                target: EventTarget;
            fileReader_for_canvas = new FileReader();
            fileReader_for_canvas.readAsDataURL(file);        

            fileReader_for_canvas.onload = (imgsrc:any) => {
                var preview : any = document.querySelector('img');
                var preview2 : any = document.querySelector('#model_avatar');
                //var preview : any = document.getElementById('upload-avatar');
                
                preview.src = fileReader_for_canvas.result;
                preview2.src = fileReader_for_canvas.result;
                
            }// --- суто для аватарки ---        
        }

        // В залежності що завантажується
        // Задати ім"я файла, команду(директорію) 
        var file_name = name
        var command_2
        var revrite
        var additional 

        if (name == 'video-file' ) {
            file_name  = this.RD.video_name // Якщо це відео-файл - то взяти ім"я з поля імені
            command_2  = 'path'  
            revrite    = true   
            additional = {   
                categories: this.RD.video_categories,
                themes:     this.RD.video_themes
            }                 
        }

        if (name == 'photo-file') {
            file_name  = file.name.split('.')[0] // Передаэться реальна назва файла. потрібно механізм додати - Команда на сервер - назначити номер фотографії
            command_2  = 'path'
            revrite    = false
            additional = {   
                albom:      this.RD.photo_albom_name,
                categories: this.RD.photo_categories
            }
        }    

        if ( name == 'upload-avatar' ) {
            command_2 = 'root'
            file_name = 'avatar'
            revrite   = true 
        }
           

            // Коли загрузилось переслати по частинах
            fileReader.onload =  (e) => { // e == load { target: FileReader, isTrusted: true, lengthComputable: true, loaded: 1048576, total: 1048576, currentTarget: FileReader, eventPhase: 2, bubbles: false, cancelable: false, defaultPrevented: false, timeStamp: 1474537690010000 }
                this.socket.emit( 'global', { command: 'Save to my fs', command_2: command_2, revrite: revrite, additional: additional, inter_path: inter_path, data: fileReader.result, file_size:file.size, iterations: iterations, the_ineration: i, type: file.type,  _id: localStorage.getItem("_id"), name: file_name  })    
                console.log('inter') ////////
                console.log(fileReader.result) ////////
                if (i<iterations) loop()
            } 

        i++
        if (i == iterations) {
            //document.getElementById(name+"_").style.width =  "100%"
            //document.getElementById('model-video-upload').style.display =  "none" // Сховати відео-модалку
            if ( name  !== 'upload-avatar' ) {
                document.getElementById(name+"_").style.display =  "none"
                document.getElementById(name+"__").style.display =  "block"
            }

            //document.getElementById("modal").style.height = '0px'
            //document.getElementById("modal").style.display = 'none' 
        }
    }
    loop()
    // Example // var start = 0; var stop  = file.size - 1;  var blob  = file.slice(start, stop + 1);
    //var CHUNK_SIZE = 1024,  offset = 0;
    //var slice = file.slice(offset, offset + CHUNK_SIZE);  // Blob { size: 1024, type: "" }
    //fileReader.readAsArrayBuffer(slice);
    this.loaded_files[name] = true
  }    


    next() {
        // Пропустити в базу тільки потрібні данні
        var filter = [
            'model_quote',
            'stars_levels', // Minute rate,
            'model_age',
            'model_height',
            'model_breast',
            'model_preferences',
            'model_language',
            'model_category01',
            'model_category02',
            'model_note']
            filter.forEach( (item, i, arr) => {
                this.RD_[item]  = this.RD[item]
            })

        // Закодувати даані lop
        for(var i in this.RD_){
            console.log( "ENCODE>>" ) ////////
            console.log( "key: " + i + ", value: " + this.RD_[i] ) ////////
            this.RD_send[i]      = encodeURIComponent( this.RD_[i] )
        }      
        // Виключення
        this.RD_send.model_language  = this.RD.model_language
        this.RD_send.model_language_quality = this.RD.model_language_quality
        //---------------------------------------------------------- 

        console.log( "RESULT>>" ) ////////
        console.log( this.RD_send ) ////////

        // if correct data -> next step        
        if (        filter.every(  (x) => { return this.RD_[x] })       ) { // Квантор всеобщносты - Якщо усі 'true' 

            // Відправити данні
            this.socket.emit('global', {
                _id:     localStorage.getItem("_id"),
                session: localStorage.getItem("session"),
                command: 'Save to my db-segment',
                data: {
                    RD: this.RD_send
                }       
            });              

            alert('SUCCESS!!!!')
           // this.router.navigate(['model_reg1']);
        } else alert(' Enter at all the data!!! ')
    }   

    constructor(elementRef: ElementRef, private router:Router) {
        this.elementRef = elementRef;
    }


    add_element(name, object, counter){
        // Examples
        // var object  = 'model_language' 
        // var counter = 'model_language_quality'
        this.RD[counter].push(name)
        var obj = this.RD[object]         
        var i = 0      
        for (var key in obj) { i++ } // Порахувати кількість елементів в об"єкті
        this.RD[object][i] = name
    }  
    rm_element(i, object, counter) {
        var ii = 0
        this.RD[counter].splice(i, 1) 
        delete this.RD[object][i]
        // далі перезібрати ПО ПОРЯДКУ об"экт
        var obj = this.RD[object]
        this.RD[object] = {}                
        for ( var key in obj ) {
            this.RD[object][ii] = obj[key]
            ii++
        }       
    }    
  

    ngOnInit() { console.log('The2 model_reg6');  

        // Стартові данні // Можливо змінити підхід?
        this.RD.model_height = "160"
        this.RD.model_breast = "Normal"
        this.RD.model_preferences = "Heterosexual"
        this.RD.model_category01 = this.RD.model_category02 = ""
        this.RD.model_note = ""

        // Для хитрого селекора
        this.RD.model_language_quality = ["English"] // кількість
        this.RD.model_language  = {}                 // які мови конкретно
        this.RD.model_language[0] = "English"

        // video_categories
        this.RD.video_categories_quality = ["Blond"] // кількість
        this.RD.video_categories  = {}               // які категорії конкретно
        this.RD.video_categories[0] = "Blond"        

        // video_themes
        this.RD.video_themes_quality = ["Theme"]     // кількість
        this.RD.video_themes  = {}                   // які категорії конкретно
        this.RD.video_themes[0] = "Theme"                

        // photo_categories
        this.RD.photo_categories_quality = ["Blond"] // кількість
        this.RD.photo_categories  = {}               // які категорії конкретно
        this.RD.photo_categories[0] = "Blond"             

        // Встановлення доступу через сокет
        this.socket = io( CONFIGS.url_backend_ws_server );   
        this.socket.emit('access', {
            _id:     localStorage.getItem("_id"),
            session: localStorage.getItem("session")        
        }); 
    }    

}

