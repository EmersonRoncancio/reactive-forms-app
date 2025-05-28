import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {

  fb = inject(FormBuilder)
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear Solid', [Validators.required, Validators.minLength(3)]],
      ['Final Fantasy VII', [Validators.required, Validators.minLength(3)]],
      ['The Legend of Zelda: Ocarina of Time', [Validators.required, Validators.minLength(3)]],
    ], Validators.minLength(3))
  })

  newMyForm = new FormControl('', [Validators.required, Validators.minLength(3)]);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray
  }

  onSave(){
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }

  addFavoriteGame(event: Event) {
    event.preventDefault();

    if(this.newMyForm.invalid) {
      this.newMyForm.markAllAsTouched();
      return;
    }

    const newGame = this.newMyForm.value;

    this.favoriteGames.push(
      this.fb.control(newGame, [Validators.required, Validators.minLength(3)])
    );

    this.newMyForm.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

 }
