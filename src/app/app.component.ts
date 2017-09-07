import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputPersons: string    = '';
  resultGroup: string[][] = [];
  condition: string       = 'persons';
  selectPersons: number   = 4;
  selectGroup: number     = 2;
  resultOffset: number    = 0;

  constructor (private _elementRef : ElementRef) {
  }

  ngOnInit(): void {
     this.resultOffset = this._elementRef.nativeElement.querySelector('#result-area').offsetTop;
  }

  onExecute(): void {
    let inputArray: string[]    = this.inputPersons.split(/\r\n|\r|\n/);
    let filteredArray: string[] = this.filterProcess(inputArray);
    let groupNum: number        = 0;
    let resultArray: string[][] = [];

    const groupConstraint: number = (this.condition === 'persons')
          ? Math.floor(filteredArray.length / this.selectPersons)
          : this.selectGroup;

    for(var i = 0; i < filteredArray.length; i++) {
      if ( !resultArray[groupNum] ) resultArray[groupNum] = [];
      resultArray[groupNum].push(filteredArray[i]);
      groupNum++;
      if ( groupNum >= groupConstraint ) groupNum = 0;
    }
    this.resultGroup = resultArray;
    this.scrollBy(this.resultOffset, 300);
  }

  filterProcess(array): string[] {

    let processArray = array.filter((e) => {
      return e !== "";
    });

    this.shuffle(processArray);

    processArray.forEach((value, i) => {
      if (value.indexOf('☆') !== -1) {
        processArray.splice(i, 1);
        processArray.unshift(value);
      }
    });

    return processArray;
  }

  shuffle(array): string[] {
    let n = array.length, t, i;

    while (n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }
    return array;
  }

  scrollBy(distance, duration): void {
    const initialY = document.body.scrollTop;
    const y = initialY + distance;
    const baseY = (initialY + y) * 0.5;
    const difference = initialY - baseY;
    const startTime = performance.now();

    function step() {
      let normalizedTime = (performance.now() - startTime) / duration;
      if (normalizedTime > 1) normalizedTime = 1;

      window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
      if (normalizedTime < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

}
