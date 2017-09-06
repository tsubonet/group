import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _el: HTMLElement;

// constructor(nativeElement: any) {
//     this._el = nativeElement;
//     console.log(this._el);
// }

  inputPersons: string = '';
  resultGroup = [];

  condition: string = 'persons';
  selectPersons: number = 4;
  selectGroup: number = 2;

  onExecute(): void {

    let inputArray = this.inputPersons.split(/\r\n|\r|\n/);

    inputArray = inputArray.filter((e) => {
      return e !== "";
    });

    if (!inputArray.length) {
      alert("メンバーを入力してください");
      return;
    }

    this.shuffle(inputArray);

    inputArray.forEach((value, i) => {
      if (value.indexOf('☆') !== -1) {
        inputArray.splice(i, 1);
        inputArray.unshift(value);
      }
    });

    const group = (this.condition === 'persons')
          ? Math.floor(inputArray.length / this.selectPersons)
          : this.selectGroup;
    let num = 0;
    let newArr = [];

    for(var i = 0; i < inputArray.length; i++) {
      if ( !newArr[num] ) newArr[num] = [];
      newArr[num].push(inputArray[i]);
      num++;
      if ( num >= group ) num = 0;
    }
    this.resultGroup = newArr;
    this.scrollBy(200, 300);
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
        var normalizedTime = (performance.now() - startTime) / duration;
        if (normalizedTime > 1) normalizedTime = 1;

        window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
        if (normalizedTime < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
}
