import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
declare let $:any;

@Component({
  selector: 'app-reactive-checkbox',
  templateUrl: './reactive-checkbox.component.html',
  styleUrls: ['./reactive-checkbox.component.scss']
})
export class ReactiveCheckboxComponent implements OnInit {

  form: FormGroup;
  checkBoxData:any = [];
  chackboxUpdateObj:any = {};
  updateId:any;

  websiteList: any = [
    'Google.com', 
    'Angular.com',
    'Codequs.com',
    'React.com',    
    'yahoo.com',    
    'zerodha.com'
  ];

  constructor(private fb: FormBuilder, private api:ApiService){
    this.form = this.fb.group({
      id:[''],
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

  updateModal(data:any){
    console.log("data", data)

    if(data.website.length){
      this.updateId = data.id;
      this.form.patchValue({
        website: data.website,
        id:data.id
      })
      this.onUpdateCheckbox();
      $("#checkboxModal").modal('show');
    }
  }

  onUpdateCheckbox(){
    this.chackboxUpdateObj = {};
    console.log("form.value", this.form.value)
    this.websiteList.forEach((webName:any) => {
      this.chackboxUpdateObj[webName] = this.form.value.website.includes(webName);
    })

    console.log("chackboxUpdateObj", this.chackboxUpdateObj);
  }


  onSubmit(){
    console.log("this.form.value", this.form.value);

    this.api.addApi(this.form.value).then((res:any) => {
       this.checkBoxData.push(res);
    })
  }

  updateData(){
    this.api.updateApi(this.updateId, this.form.value).then((res:any) => {
      if(res){
        for(let i in this.checkBoxData){
          if(this.checkBoxData[i].id == res.id){
            this.checkBoxData[i] = res;
          }
        }
      }
    })
  }
}
