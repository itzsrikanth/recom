import {
  Component, OnInit,
  Input } from '@angular/core';

@Component({
  selector: 'grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss']
})
export class GridTableComponent implements OnInit {

  @Input() inData: Array<Object>;
  @Input() config: Object;
  private paginator: Number = 0;
  private pageList: Array<Number>;
  private rowList: Array<Number>;
  private colList: Array<String>;
  private optionalList: Array<String> = [];
  private totalColList: Array<String>;
  private colObj: Object;
  private procData: Array<Object>;
  private serialState: Boolean;

  range(count: Number): Array<Number> {
    return new Array(count).fill(0).map((x, i) => i);
  }

  init(): void {
    this.config['rowMax'] = this.config['rowMax'] ? this.config['rowMax'] : 10;
    this.config['colMax'] = this.config['colMax'] ? this.config['colMax'] : 6;
    this.config['pageCount'] = Math.ceil(this.inData.length / this.config['rowMax']);
    this.serialState = this.config['serialize'] || false;
    if (this.config['optionalRow'] === undefined) {
      this.config['optionalRow'] = true;
    }

    this.pageList = this.range(this.config['pageCount']);
    this.totalColList = Object.keys(this.inData[0]);
    this.colList = this.totalColList.slice(0, this.config['colMax']);
    this.rowList = this.range(this.config['rowMax']);
    //this.colObj = this.inData[0];
    this.colObj = { ...this.inData[0] };
    for (let prop in this.colObj) {
      //this.colObj[prop] = this.colList.indexOf(prop) !== -1 ? true : false;
      if (this.colList.indexOf(prop) !== -1) {
        this.colObj[prop] = true;
      } else {
        this.colObj[prop] = false;
        this.optionalList.push(prop);
      }
    }
  }

  processData(): void {
    this.procData = this.inData.filter((elem, i) => {
      return this.paginator === Math.floor(i / this.config['rowMax']);
    });
  }

  serialize(): void {
    //console.log(this.procData[0]['#']);
    if (this.serialState) {
      this.totalColList.unshift('#');
      this.colObj['#'] = true;
      this.inData.forEach((elem, i) => {
        elem['#'] = i+1;
      });
    } else {
      if (this.totalColList[0] === '#') {
        this.totalColList.shift();
        this.colObj['#'] = false;
        this.inData.forEach(elem => {
          delete elem['#'];
        });
      }
    }
    console.log(this.procData);
    this.serialState = !this.serialState;
  }

  columnSelect(elem): void {
    this.colObj[elem.id] = elem.checked;
    this.optionalList = [];
    for (let col in this.colObj) {
      if (!this.colObj[col]) {
        this.optionalList.push(col);
      }
    }
  }

  constructor() { }

  ngOnInit() {
    this.init();
    this.serialize();
    this.processData();
  }

}
