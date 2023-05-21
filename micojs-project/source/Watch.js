// Watch.js

const watchTimeColor = setPen(255, 163, 0);
const watchTimeUnderColor = setPen(93, 87, 79);
const watchBGColor = setPen(29, 43, 83);

const WATCH_MINUTES_INIT = 24;
const WATCH_SECONDS_BEFORE_INIT = 2;

class Watch
{
    constructor()
    {
        this.minutes = 0;
        this.lastSecondTime = 0;
        this.showEverything = false;

        this.watchTargetX = getWidth() / 2;
        this.watchTargetY = getHeight() / 2;
        this.watchX = this.watchTargetX;
        this.watchY = this.watchTargetY;
    }

    // LIFECYCLE.

    restart()
    {
        this.lastSecondTime = getTime();
        this.minutes = WATCH_MINUTES_INIT - WATCH_SECONDS_BEFORE_INIT;
    }

    update()
    {
        let newTime = getTime();

        if (newTime - this.lastSecondTime > 1000)
        {
            this.lastSecondTime += 1000;
            this.minutes++;
            if (this.minutes == 65)
            {
                // Time loop!
                init();
            }
        }
        this.watchX = this.watchTargetX + (this.watchX - this.watchTargetX) * 0.9375;
        this.watchY = this.watchTargetY + (this.watchY - this.watchTargetY) * 0.9375;
        if (this.minutes < WATCH_MINUTES_INIT)
        {
            this.showEverything = false;
            this.watchTargetX = getWidth() / 2;
            this.watchTargetY = getHeight() / 2;
        }
        else if (this.minutes == WATCH_MINUTES_INIT)
        {
            this.showEverything = true;
            this.watchTargetX = getWidth() - 17;
            this.watchTargetY = 17;
        }
        else if (this.minutes < 60)
        {
            // TODO: ??
        }
        else if (this.minutes == 60)
        {
            this.watchTargetX = getWidth() / 2;
            this.watchTargetY = getHeight() / 2;
        }
        else if (this.minutes < 62)
            this.showEverything = ticker_1;
        else
            this.showEverything = false;
    }

    render()
    {
        setPen(watchBGColor);
        rect(this.watchX - 16, this.watchY - 16, 33, 33);

        setFont(R.fontKoubit);
        setPen(watchTimeUnderColor);
        text("88:88", this.watchX - 16 + 1, this.watchY - 16 + 13);
        setPen(watchTimeColor);
        if (this.minutes < WATCH_MINUTES_INIT)
            text("7:24", this.watchX - 16  + 9, this.watchY - 16  + 13);
        else if (this.minutes >= 60)
            text("8:00", this.watchX - 16  + 9, this.watchY - 16  + 13);
        else
            text("7:" + this.minutes, this.watchX - 16  + 9, this.watchY - 16  + 13);
    }
}