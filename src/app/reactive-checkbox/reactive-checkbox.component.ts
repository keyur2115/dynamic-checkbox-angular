import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reactive-checkbox',
  templateUrl: './reactive-checkbox.component.html',
  styleUrls: ['./reactive-checkbox.component.scss']
})
export class ReactiveCheckboxComponent implements OnInit {

  form: FormGroup;
  checkBoxData:any = [];

  websiteList: any = [
    { id: 1, name: 'Google.com' },
    { id: 2, name: 'Angular.com' },
    { id: 3, name: 'Codequs.com' }
  ];

  constructor(private fb: FormBuilder, private api:ApiService){
    this.form = this.fb.group({
      name:[''],
      website: this.fb.array([])
    })
  }

  ngOnInit():void {
    this.getData();

  }

  onCheckBoxChange(event:any){
    console.log('event', event.target.value);
    const website:FormArray = this.form.get('website') as FormArray;

    if(event.target.checked){
        website.push(new FormControl(event.target.value));
    } else {
       const index = website.controls.findIndex(x => x.value === event.target.value);
       website.removeAt(index);
    }


  }

  getData(){
    this.api.getApi().then((res:any) => {
      console.log(res);
      if(res){
        this.checkBoxData = res;
      }
      console.log("checkboxdata", this.checkBoxData);
    })
  }

  deleteData(id:any, index:any){
    this.api.deleteApi(id).then((res:any) => {
      if(res){
        this.checkBoxData.splice(index, 1);
      }
    })
  }


  onSubmit(){
    console.log("this.form.value", this.form.value);

    this.api.addApi(this.form.value).then((res:any) => {
       this.checkBoxData = res;
    })
  }
}
