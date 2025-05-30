import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

  static isVerifield(form: FormGroup, field: string): boolean {
    return (!!form.controls[field].errors && form.controls[field].touched);
  }

  static isVerifieldArray(form: FormArray, index: number): boolean {
    return ( !!form.controls[index].errors && form.controls[index].touched );
  }

  static getMessageErrror(errors: ValidationErrors): string | null {
    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor minimo es ${errors['min'].min}`;
        case 'email':
          return 'El correo no es valido';
      }
    };

    return null;
  }

  static getFiedErrors(form: FormGroup, field: string): string | null {

    if(!form.controls[field]) return null;

    const errors = form.controls[field].errors ?? {};

    return FormUtils.getMessageErrror(errors);
  }

  static getFieldErrorsArray(form: FormArray, index: number): string | null {
    if(!form.controls[index]) return null;

    const errors = form.controls[index].errors ?? {};

    return FormUtils.getMessageErrror(errors);
  }

  static getFieldErrorsGroupArray(form: FormGroup, field: string): string | null {

    console.log('getFieldErrorsGroupArray', form.controls[field]);
    if(!form.controls[field]) return null;

    const errors = form.controls[field].errors ?? {};

    switch (Object.keys(errors)[0]) {
      case 'minlength':
        return `Se requieren minimo ${errors['minlength'].requiredLength} juegos favoritos`;
    }

    return null
  }
}
