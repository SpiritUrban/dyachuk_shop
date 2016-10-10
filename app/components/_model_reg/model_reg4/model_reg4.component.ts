
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES}      from '@angular/router';
import { CONFIGS }                       from '../../../app.configs';

declare var jQuery: any;
declare var io:     any;
declare var fileReader: any;


@Component({
  selector:    'model_reg3',
  templateUrl: './app/components/_model_reg/model_reg4/model_reg4.component.html',
  styleUrls: [ './app/components/_model_reg/model_reg4/model_reg4.component.css' ]
})


export class model_reg4 implements OnInit { 
    elementRef: ElementRef;
    RD:         any = {}; // Registration Data
    RD_send:    any = {}; // Registration Data
    //FD:         any = {}; // Для пересилки файлів
    socket          = null;    
    file:       any = null;
    compInfo: string = "Loading"
    loaded_files: any = {}



  onChange(e, name, number) {  // e == change { target: <input#id-front>, isTrusted: true, currentTarget: <input#id-front>, eventPhase: 2, bubbles: true, cancelable: false, defaultPrevented: false, timeStamp: 1474539656690000, originalTarget: <input#id-front>, explicitOriginalTarget: <input#id-front>, NONE: 0 }

    // Vizualization
    document.getElementById(name+"_").style.display =  "block"
    

    //document.getElementById("modal").style.height = '100px'
    //document.getElementById("modal").style.display = 'inline'

    var fileReader = new FileReader();
    var file = (<HTMLInputElement>document.getElementById(name)).files[0];  // file == {  name: "OhdIJZy8H7o.jpg", lastModified: 1467921666657,  lastModifiedDate: Date 2016-07-07T20:01:06.657Z,  size: 214450,  type: "image/jpeg"   }


    let iterations = Math.ceil( file.size / 1048576 )
    console.log( 'iterations ' +  iterations )
    console.log( file.size )

    //for ( var i=0; i<iterations; i++ ) {}

    var i=0
    var loop = () => {
        var progress = (100/iterations)*i
        document.getElementById(name+"_").style.width =  progress+"%"

        var start = i * 1048576 
        var end   = start + 1048576
        console.log( 'start = ' + start )
        console.log( 'end = ' + end )

        var slice = file.slice(start, end);  // Blob { size: 1048576, type: "" }
        fileReader.readAsArrayBuffer(slice);

        // Коли загрузилось переслати по частинах
        fileReader.onload =  (e) => { // e == load { target: FileReader, isTrusted: true, lengthComputable: true, loaded: 1048576, total: 1048576, currentTarget: FileReader, eventPhase: 2, bubbles: false, cancelable: false, defaultPrevented: false, timeStamp: 1474537690010000 }
            this.socket.emit( 'global', { command: 'Save to my fs', command_2: 'root', data: fileReader.result, file_size:file.size, iterations: iterations, the_ineration: i, type: file.type,  _id: localStorage.getItem("_id"), name: name  })    
            console.log('inter')
            console.log(fileReader.result)
            if (i<iterations) loop()
        } 
        i++
        if (i == iterations) {
            document.getElementById(name+"_").style.width =  "100%"

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

    /*
    loader(data) {  console.log(data)        
        this.socket.emit('global', {
            command: 'Save to my fs',
            data: {
                FD:   data.file, // 
                size: data.size
            }       
        });          
    }*/

    next() {        
        console.log(' Next ')
        console.log( this.loaded_files )
      
        //
        // if correct data -> next step        
        if (   this.loaded_files['id-front']  &&  this.loaded_files['id-back']  &&  (  this.loaded_files['id-face']  ||  this.loaded_files['id-snapshot']  )  ) {

            this.router.navigate(['model_reg5'])
        } else alert(' Enter at all the data!!! ')
    };    
  
    constructor(elementRef: ElementRef, private router:Router) {
        this.elementRef = elementRef;
        this.compInfo   = "Page Loaded";
    }

    ngOnInit() {
        console.log('The2 model_reg4');   
        this.socket = io( CONFIGS.url_backend_ws_server );   
        this.socket.emit('access', {
            _id:     localStorage.getItem("_id"),
            session: localStorage.getItem("session")        
        });   
    }    

}

