import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchesPageComponent {

  fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm = this.fb.group({
    gender: ['M', [Validators.required, Validators.minLength(1)]],
    notifications: [false, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  })

  onSave(){
    console.log(this.myForm.value)
    console.log(this.myForm.valid)

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
 }
