import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Baking Calculator';
  result?: IResult;
  form: FormGroup;

  private readonly _presetData: IResult = {
    flour: 500,
    water: 60,
    salt: 1,
    yeast: 1,
  };

  constructor(
    private readonly _fb: FormBuilder,
  ) {
    this.form = _fb.group({
      flour: [this._presetData.flour, [Validators.required]],
      water: [this._presetData.water, [Validators.required]],
      salt: [this._presetData.salt, [Validators.required]],
      yeast: [this._presetData.yeast, [Validators.required]],
    });
  }

  calculate() {
    this.result = {
      flour: this._calcFlour(),
      water: this._calcWater(),
      salt: this._calcSalt(),
      yeast: this._calcYeast(),
    };
  }

  reset() {
    this.form.reset();
    this.form.patchValue(this._presetData);
    this.result = undefined;
    this.form.updateValueAndValidity();
    this.form.markAsUntouched();
  }

  private _calcFlour(): number {
    return this._getValue('flour');
  }

  private _calcWater(): number {
    const waterPercentage = this._getValue('water');
    const flourTotal = this._getValue('flour');
    return (flourTotal / 100) * waterPercentage;
  }

  private _calcSalt(): number {
    const saltPercentage = this._getValue('salt');
    const flourTotal = this._getValue('flour');
    return (flourTotal / 100) * saltPercentage;
  }

  private _calcYeast(): number {
    const yeastPercentage = this._getValue('yeast');
    const flourTotal = this._getValue('flour');
    return (flourTotal / 100) * yeastPercentage;
  }

  private _getValue(name: string) {
    return this.form.get(name).value;
  }
}

export interface IResult {
  flour: number;
  water: number;
  salt: number;
  yeast: number;
}
