import { FormGroup } from "@angular/forms";

export class FormUtils {

  static isVerifield(form: FormGroup, field: string): boolean {
    return (!!form.controls[field].errors && form.controls[field].touched);
  }

  static getFiedErrors(form: FormGroup, field: string): string | null {

    if(!form.controls[field]) return null;

    const errors = form.controls[field].errors ?? {};

    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor minimo es ${errors['min'].min}`;
      }
    };

    return null;
  }
}
