import { Component } from '@angular/core';

@Component({
  selector: 'app-monty-hall',
  templateUrl: './monty-hall.component.html',
  styleUrls: ['./monty-hall.component.css'],
})
export class MontyHallComponent {
  prizeDoor: number;
  chosenDoor: number;
  openDoor: number;
  changeChoice: boolean;
  win: boolean;
  gameOver: boolean;
  selectedDoor: number;
  gameStats: { attempt: number, change: boolean, win: boolean }[] = [];
  isStatsModalOpen: boolean = false;

  constructor() {
    this.reset();
  }

  reset() {
    this.prizeDoor = Math.floor(Math.random() * 3) + 1;
    this.chosenDoor = null;
    this.openDoor = null;
    this.changeChoice = false;
    this.win = false;
    this.gameOver = false;
  }

  chooseDoor(door: number) {
    if (this.gameOver) {
      return;
    }
    this.chosenDoor = door;
    this.openDoor = this.getOpenDoor();
    this.selectedDoor = door;
  }

  toggleChangeChoice() {
    this.changeChoice = !this.changeChoice;
  }

  getOpenDoor() {
    let doors = [1, 2, 3].filter(
      (door) => door !== this.prizeDoor && door !== this.chosenDoor
    );
    return doors[Math.floor(Math.random() * doors.length)];
  }

  revealPrize() {
    this.win = this.chosenDoor === this.prizeDoor;

    if (this.changeChoice) {
      const remainingDoors = [1, 2, 3].filter(
        (door) => door !== this.chosenDoor && door !== this.openDoor
      );
      this.chosenDoor = remainingDoors[0];
    }

    this.openDoor = this.chosenDoor; // Cambio realizado aquí

    this.win = this.chosenDoor === this.prizeDoor;
    this.gameOver = true;
    this.updateStats();
  }


  getChangeChoiceText() {
    return this.changeChoice ? 'Sí' : 'No';
  }

  getDoorImage(door: number) {
    if (this.openDoor === door) {
      return door === this.prizeDoor ? 'url(../../../../assets/ferrari.png)' : 'url(../../../../assets/cabra.png)';
    } else {
      return 'none';
    }
  }

  openStatsModal() {
    this.isStatsModalOpen = true;
  }

  closeStatsModal() {
    this.isStatsModalOpen = false;
  }

  updateStats() {
    const stat = {
      attempt: this.gameStats.length + 1,
      change: this.changeChoice,
      win: this.win
    };
    this.gameStats.push(stat);
  }



}
