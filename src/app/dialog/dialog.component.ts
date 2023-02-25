import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent{
  listOfItem = ['banana', 'orange','apple']

productForm !: FormGroup;
actionBtn : string ="save"

constructor(private formBuilder : FormBuilder, 
  private api : ApiService,
  @Inject(MAT_DIALOG_DATA) public editData : any,
  private dialog : MatDialogRef<DialogComponent>){}

ngOnInit(): void {

this.productForm =this.formBuilder.group({
  product:['', Validators.required],
  catagory:['',Validators.required],
  select:['',Validators.required],
  date:['',Validators.required],
  radio:['',Validators.required],
  price:['',Validators.required],
  comment:['',Validators.required]
})

if(this.editData){
  this.actionBtn = "Update"
  this.productForm.controls['product'].setValue(this.editData.product);
  this.productForm.controls['catagory'].setValue(this.editData.product);
  this.productForm.controls['select'].setValue(this.editData.select);
  this.productForm.controls['date'].setValue(this.editData.date);
  this.productForm.controls['radio'].setValue(this.editData.radio);
  this.productForm.controls['price'].setValue(this.editData.price);
  this.productForm.controls['comment'].setValue(this.editData.comment);
}

}



addProduct(){
  if(!this.editData){
    if( this.productForm.valid ){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert('product add seccusefully')
          this.productForm.reset();
          this.dialog.close('save');
        },
        error:()=>{
          alert('Error has been occer')
          this.productForm.reset();
         
        }
      })
    }
  }else{
    this.update()
  }
}

update(){
this.api.putProduct(this.productForm.value,this.editData.id)
.subscribe({
  next:(res)=>{
    alert('data updated')
    this.productForm.reset();
    this.dialog.close('update');
  },
  error:()=>{
    alert('error occer')
  }
})
}

}
