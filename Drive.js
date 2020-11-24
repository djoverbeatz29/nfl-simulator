class Drive {
    constructor(params={}) {
        this.yardline = params.yardline || 25;
        this.down = params.down || 1;
        this.toGo = params.toGo || 10;
        this.driveOn = true;
        this.playCount = 0;
    }

    play() {
        const rez = Math.random();
        if (rez<0.05) return -5;
        else if (rez<0.10) return -1;
        else if (rez<0.33) return 0;
        else if (rez<0.37) return 1;
        else if (rez<0.40) return 2;
        else if (rez<0.45) return 3;
        else if (rez<0.50) return 4;
        else if (rez<0.60) return 5;
        else if (rez<0.65) return 6;
        else if (rez<0.72) return 8;
        else if (rez<0.75) return 9;
        else if (rez<0.84) return 10;
        else if (rez<0.89) return 15;
        else if (rez<0.96) return 20;
        else if (rez<0.99) return 25;
        else return 50;
    }

    playDrive() {
        let rez;
        while (this.driveOn) {
            if (Math.random() < 0.018) {
                rez='Turnover!';
                this.playCount += 1;
                break;
            }
            const myPlay = this.play();
            this.yardline = Math.min(Math.max(0, this.yardline + myPlay), 100);
            if (myPlay >= this.toGo) {
                this.toGo = Math.min(10, 100-this.yardline);
                this.down = 1;
            }
            else {
                this.toGo -= myPlay;
                this.down += 1;
            }
            if (this.yardline > 0 && this.yardline < 100 && this.down < 4) {}
            else this.driveOn = false;
            this.playCount += 1;
        }
        if (this.yardline <= 0) rez='Safety!';
        else if (this.yardline >= 100) rez='Touchdown!';
        else if (this.down >= 4) {
            if (this.yardline < 60) rez='Punted!';
            else rez='Field goal!';
        }
        return {
            yardline: this.yardline,
            playCount: this.playCount,
            down: this.down,
            toGo: this.toGo,
            rez: rez
        };
    }
}