import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  result?: IResult;
  form: FormGroup;
  readonly ingredients = ['flour', 'water', 'salt', 'yeast'];

  private readonly _presetData = IngredientCalculator.defaultValues();

  constructor(
    private readonly _fb: FormBuilder,
  ) {
    this.form = _fb.group({
      flour: [this._presetData.flour, [Validators.required]],
      water: [this._presetData.water, [Validators.required]],
      salt: [this._presetData.salt, [Validators.required]],
      yeast: [this._presetData.yeast, [Validators.required]],
    });

    this.reset();
  }

  formatLabel(value: number | null): string {
    if (!value) {
      return '0%';
    }

    return `${value}%`;
  }

  calculate() {
    this.result = IngredientCalculator.calculate(
      this._getValue('flour'),
      this._getValue('water'),
      this._getValue('salt'),
      this._getValue('yeast'),
    );
  }

  reset() {
    this.form.reset();
    this.form.patchValue(this._presetData);
    this.result = undefined;
    this.form.updateValueAndValidity();
    this.form.markAsUntouched();
    this.calculate();
  }


  private _getValue(name: string) {
    return this.form.get(name).value;
  }
}

export class IngredientCalculator {
  static calculate(flour: number, water: number, salt: number, yeast: number): IResult {
    return {
      flour,
      water: this._calcPercentage(flour, water),
      salt: this._calcPercentage(flour, salt),
      yeast: this._calcPercentage(flour, yeast),
    };
  }

  static defaultValues(): IResult {
    return {
      flour: 500,
      water: 60,
      salt: 1,
      yeast: 1,
    };
  }

  private static _calcPercentage(base: number, part: number): number {
    return (base / 100) * part;
  }
}

export interface IResult {
  flour: number;
  water: number;
  salt: number;
  yeast: number;
}
