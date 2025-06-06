import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-registry-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './registry-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryPageComponent {

  fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3), Validators.pattern(this.formUtils.namePattern), this.formUtils.valitadeNameBlock]],
    email: ['',[Validators.required, Validators.email, Validators.pattern(this.formUtils.emailPattern)]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.formUtils.notOnlySpacesPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  },{
    validators: [
      this.formUtils.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  })

  onSave(){

    console.log(this.myForm.errors);
    console.log(this.myForm.valid);

    console.log(this.myForm.value);
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset();
  }
 }
