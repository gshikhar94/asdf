import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular 6';

  showGame = false;

  timer = 0;
  timerInterval;
  clickCounter = 0;

  currentGridValue = null;
  previousGridValue = null;

  currentGridValuePosition = null;
  previousGridValuePosition = null;

  randomArray = [
    ['1', '3', '2'],
    ['4', '-_-', '4'],
    ['2', '1', '3']
  ];

  randomDummyArray = [
    ['X', 'X', 'X'],
    ['X', 'X', 'X'],
    ['X', 'X', 'X'],
  ];

  freezedArray = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];

  constructor(private dialog: MatDialog) { }

  start() {
    this.showGame = true;

    this.createRandomArray();

    clearInterval(this.timerInterval);
    this.timer = 0;
    this.clickCounter = 0;

    this.setNullValues();

    this.randomDummyArray = [
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
    ];

    this.freezedArray = [
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ];

    this.timerInterval = setInterval(() => {
      this.timer++;
    }, 1000)

  }

  seletedGrid(row: number, col: number) {
    if (!this.isGridFreezed(row, col)) {

      this.toggleGridValue(row, col);
      this.freezeGrid(row, col);

      setTimeout(() => {


        if (this.currentGridValue === null) {
          this.currentGrid(row, col);
        } else if (this.currentGridValue && this.previousGridValue === null) {

          this.previousGridValue = this.currentGridValue;
          this.previousGridValuePosition = this.currentGridValuePosition;

          this.currentGrid(row, col);

          if (this.currentGridValue === this.previousGridValue) {
            document.getElementById(this.currentGridValuePosition).setAttribute('class', 'grid-cell animated zoomIn matched');
            document.getElementById(this.previousGridValuePosition).setAttribute('class', 'grid-cell animated zoomIn matched');

            this.setNullValues();

            if (this.isGameCompleted()) {
              setTimeout(() => {
                this.dialog.open(DialogComponent, {
                  data: {
                    time: this.timer,
                    click: this.clickCounter
                  }
                })
                // alert(`You finished the game in ${this.timer} second(s)`);
                this.stop();
              }, 900);
            }

          } else {
            let current = this.currentGridValuePosition.split('-');
            let previous = this.previousGridValuePosition.split('-');

            this.toggleGridValue(current[0], current[1]);
            this.toggleGridValue(previous[0], previous[1]);

            this.unFreezeGrid(current[0], current[1]);
            this.unFreezeGrid(previous[0], previous[1]);

            this.setNullValues();
          }
        }


        this.clickCounter++;

      }, 500);

    } else {
      return;
    }
  }

  toggleGridValue(row: number, col: number) {
    this.randomDummyArray[row][col] =
      (this.randomDummyArray[row][col] === 'X') ? this.randomArray[row][col] : 'X';

    let positon = row + '-' + col;

    document.getElementById(positon).setAttribute('class', 'grid-cell animated flipInY');

    setTimeout(() => {
      document.getElementById(positon).setAttribute('class', 'grid-cell');
    }, 200)
  }

  currentGrid(row: number, col: number) {
    this.currentGridValue = this.randomArray[row][col];
    this.currentGridValuePosition = row + '-' + col;
  }

  previousGrid(row: number, col: number) {
    this.previousGridValue = this.randomArray[row][col];
    this.previousGridValuePosition = row + '-' + col;
  }

  isGridFreezed(row: number, col: number) {
    return this.freezedArray[row][col];
  }

  freezeGrid(row: number, col: number) {
    this.freezedArray[row][col] = true;
  }

  unFreezeGrid(row: number, col: number) {
    this.freezedArray[row][col] = false;
  }

  setNullValues() {
    this.currentGridValue = null;
    this.currentGridValuePosition = null;

    this.previousGridValue = null;
    this.previousGridValuePosition = null;
  }

  isGameCompleted() {
    let counter = 0;
    for (let i = 0; i < this.randomDummyArray.length; i++) {
      for (let j = 0; j < this.randomDummyArray.length; j++) {
        if (this.randomDummyArray[i][j] === 'X') {
          counter++;
        }
      }
    }
    if (counter === 1) {
      return true;
    }
    return false;
  }

  reset() {
    this.randomDummyArray = [
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
    ];

    this.freezedArray = [
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ];

    this.setNullValues();

    this.showGame = false;
    this.start();
  }

  stop() {
    clearInterval(this.timerInterval);
    this.timer = 0;
    this.clickCounter = 0;

    this.showGame = false;
    this.setNullValues();
  }

  createRandomArray() {
    for (var i = 0; i < this.randomArray.length; i++) {
      for (var j = 0; j < this.randomArray[i].length; j++) {
        var i1 = Math.floor(Math.random() * (this.randomArray.length));
        var j1 = Math.floor(Math.random() * (this.randomArray.length));

        var temp = this.randomArray[i][j];
        this.randomArray[i][j] = this.randomArray[i1][j1];
        this.randomArray[i1][j1] = temp;
      }
    }
  }
}
