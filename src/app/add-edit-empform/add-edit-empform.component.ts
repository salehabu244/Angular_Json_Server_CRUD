import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
// import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-empform',
  templateUrl: './add-edit-empform.component.html',
  styleUrls: ['./add-edit-empform.component.css']
})
export class AddEditEmpformComponent implements OnInit{

  education: string[]=['SSC','HSC','BSc','MSc','PHD']

  empForm: FormGroup; // Define empForm as a FormGroup

  constructor(private fb: FormBuilder, private service:ServiceService, private dialogref:MatDialogRef<AddEditEmpformComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any) {
    this.empForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl(''),
      education: new FormControl(''),
      company: new FormControl(''),
      exp: new FormControl(''),
      salary: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  onFormSubmit(){
    if(this.empForm.valid){
      // console.warn(this.empForm.value);
      if(this.data){
        this.service.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next :(val:any)=>{
            alert ("Employee Details Update Successfully!!");
            this.dialogref.close(true);
          },
          error (err:any){
            alert(err);
          }
        })
      }
      else{
        this.service.addEmployee(this.empForm.value).subscribe({
          next :(val:any)=>{
            alert ("Employee Added Successfully!!");
            this.dialogref.close(true);
          },
          error (err:any){
            alert(err);
          }
        })
      }
    }
  }
}
