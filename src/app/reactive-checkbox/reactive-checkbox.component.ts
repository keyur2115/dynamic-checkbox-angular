import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-checkbox',
  templateUrl: './reactive-checkbox.component.html',
  styleUrls: ['./reactive-checkbox.component.scss']
})
export class ReactiveCheckboxComponent {

  form: FormGroup;

  websiteList: any = [
    { id: 1, name: 'Google.com' },
    { id: 2, name: 'Angular.com' },
    { id: 3, name: 'Codequs.com' }
  ];

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      website: this.fb.array([])
    })
  }

  onCheckBoxChange(event:any){
    console.log('event', event.target.value);
    const website:FormArray = this.form.get('website') as FormArray;

    // console.log("website.control", website.controls);

    if(event.target.checked){
        website.push(new FormControl(event.target.value));
    } else {
       const index = website.controls.findIndex(x => x.value === event.target.value);
       website.removeAt(index);
       
    }


  }

  onSubmit(){
    console.log("this.form.value", this.form.value);
  }
}
