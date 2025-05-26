import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {

  fb = inject(FormBuilder)

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear Solid', [Validators.required]],
      ['Final Fantasy VII', [Validators.required]],
      ['The Legend of Zelda: Ocarina of Time', [Validators.required]]
    ], Validators.minLength(3))
  })

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray
  }

 }
