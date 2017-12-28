import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'search-control',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SearchControlComponent, multi: true }
  ]
})
export class SearchControlComponent implements OnInit, ControlValueAccessor {

  onChanges;
  _value;
  @Input() label;
  @Input() type;
  @Input() init;
  @Input() url: Array<any> | string;

  constructor() { }

  ngOnInit() {
  }

  writeValue(value) {
    this._value = value;
  }

  registerOnChange(fn) {
    this.onChanges = fn;
  }

  registerOnTouched(fn) { }

  setDisabledState() { }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChanges(this._value);
  }
}
