import { Component, OnInit } from '@angular/core';
import { DndDropEvent,DropEffect} from 'ngx-drag-drop';
import { field, value } from '../Model/controlmodel';
import swal from 'sweetalert2';
import { FormdataService } from '../services/formdata.service';
import { Router } from "@angular/router";




@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.css']
})
export class FormbuilderComponent implements OnInit {
 value:value={
    label:"",
    value:""
  };
toggle=false;
  fieldModels:Array<field>=[
    {
      "type": "text",
      "icon": "fa-font",
      "label": "Text",
      "description": "Enter your name",
      "placeholder": "Enter your name",
      "className": "form-control",
      "toggle":false
      
    }, {
      "type": "textarea",
      "icon":"fa-text-width",
      "label": "Textarea" ,
      "toggle":false
    }, {
      "type": "date",
      "icon":"fa-calendar",
      "label": "Date",
      "placeholder": "Date",
      "className": "form-control"
    }, {
      "type": "checkbox",
      "required": true,
      "label": "Checkbox",
      "icon":"fa-list",
      "description": "Checkbox",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "radio",
      "icon":"fa-list-ul",
      "label": "Radio",
      "description": "Radio boxes",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
   
  ];

  modelFields:Array<field>=[];
   model:any = {
    name:'Form name...',
    description:'Form Description...',
    theme:{
      bgColor:"ffffff",
      textColor:"555555",
      bannerImage:""
    },
    attributes:this.modelFields
  };
  constructor(private formdata:FormdataService,private route:Router) { }

  ngOnInit() {
  }
 onDrop( event:DndDropEvent, list?:any[] ) {
    if( list && (event.dropEffect === "copy" || event.dropEffect === "move") ) {
      
      if(event.dropEffect === "copy")
      event.data.name = event.data.type+'-'+new Date().getTime();
      let index = event.index;
      if( typeof index === "undefined" ) {
        index = list.length;
      }
      list.splice( index, 0, event.data );
    }
  }


   onDragged( item:any, list:any[], effect:DropEffect ) {
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }
      
  onDragCanceled(event:DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
  
  onDragover(event:DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }

   onDragStart(event:DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }
  
  onDragEnd(event:DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }
  
  onDraggableCopied(event:DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }
  
  onDraggableLinked(event:DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  showProperties(item)
  {
    this.toggle=false;
    this.model.attributes.forEach(it=>{
      it!=item? it.toggle=false:it.toggle=!item.toggle;
     
    })

  }
 addValue(values){
    values.push(this.value);
    this.value={label:"",value:""};
  }

   removeField(i){

     swal.fire({
       title: 'Are you sure?',
       text: 'Do you want to remove this field?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, keep it'
     }).then((result) => {
       if (result.value) {
         this.model.attributes.splice(i, 1);
         swal.fire(
           'Deleted!',
         )
       }
     })
   

  }

  saveAndgoto(){
    this.formdata.set(this.model);
   this.route .navigate(['/form']);
  }
}