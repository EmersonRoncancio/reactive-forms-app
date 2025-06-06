import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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
        case 'isEqual':
          return 'Las contraseñas no coinciden';
        case 'nameBlock':
          return 'El nombre no es valido';
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

   static isFieldOneEqualFieldTwo(field: string, field2: string) {
    return (formGroup: AbstractControl)=>{
      const fieldValue1 = formGroup.get(field)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        return {
          isEqual: false,
        }
      } else {
        return null;
      }
    }
  }

  static valitadeNameBlock(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    console.log('valitadeNameBlock', typeof value, value);

    if(value == "Emerson Roncancio"){
      console.log('valitadeNameBlock', 'Nombre bloqueado');
      return {
        nameBlock: true
      }
    }else {
      return null;
    }
  }
}
