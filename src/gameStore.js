import { makeAutoObservable } from "mobx";

class GameStore {
    score = 0;
    bullets = 0;
    gameOver = false;
    best = +localStorage.getItem('best') || 0
    constructor() {
        makeAutoObservable(this);
    }


    tik() {
        this.score += this.bullets / 100
        // console.log(this.score);
        if (this.score > this.best) {
            this.best = Math.round(this.score)
            localStorage.setItem('best', this.score)
        }

    }
    increaseScore() {
        this.score += 1;
    }
    addBullet() {
        this.bullets += 1;
    }

    loose() {
        this.bullets = 0;
        setTimeout(() => {
            this.gameOver = true;
        }, 2000);
    }
}

export const gameStore = new GameStore();
