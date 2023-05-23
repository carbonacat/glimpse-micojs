// Watch.js

"include /source/Scene.js";


// DATA.

const Watch__timeColor = setPen(255, 163, 0);
const Watch__timeUnderColor = setPen(93, 87, 79);
const Watch__BGColor = setPen(29, 43, 83);

const Watch__MINUTES_INIT = 24;
const Watch__SECONDS_BEFORE_INIT = 2;

let Watch__minutes;
let Watch__lastSecondTime;
let Watch__x;
let Watch__y;
let Watch__targetX;
let Watch__targetY;


// LIFECYCLE.

function Watch_init()
{
    Watch__minutes = 0;
    Watch__lastSecondTime = 0;
    Scene__enabled = false;
    Watch__targetX = getWidth() / 2;
    Watch__targetY = getHeight() / 2;
    Watch__x = Watch__targetX;
    Watch__y = Watch__targetY;
}

function Watch_restart()
{
    Watch__lastSecondTime = getTime();
    Watch__minutes = Watch__MINUTES_INIT - Watch__SECONDS_BEFORE_INIT;
}

function Watch_update()
{
    let newTime = getTime();

    if (newTime - Watch__lastSecondTime > 1000)
    {
        Watch__lastSecondTime += 1000;
        Watch__minutes++;
        if (Watch__minutes == 65)
            initGame();
    }
    Watch__x = Watch__targetX + (Watch__x - Watch__targetX) * 0.9375;
    Watch__y = Watch__targetY + (Watch__y - Watch__targetY) * 0.9375;
    if (Watch__minutes < Watch__MINUTES_INIT)
    {
        Scene__enabled = false;
        Watch__targetX = getWidth() / 2;
        Watch__targetY = getHeight() / 2;
    }
    else if (Watch__minutes == Watch__MINUTES_INIT)
    {
        Scene__enabled = true;
        Watch__targetX = getWidth() - 17;
        Watch__targetY = 17;
    }
    else if (Watch__minutes < 60)
    {
        // TODO: ??
    }
    else if (Watch__minutes == 60)
    {
        Watch__targetX = getWidth() / 2;
        Watch__targetY = getHeight() / 2;
    }
    else if (Watch__minutes < 62)
        Scene__enabled = ticker_1;
    else
        Scene__enabled = false;
}

function Watch_render()
{
    setPen(Watch__BGColor);
    rect(Watch__x - 16, Watch__y - 16, 33, 33);

    setFont(R.fontKoubit);
    setPen(Watch__timeUnderColor);
    text("88:88", Watch__x - 16 + 1, Watch__y - 16 + 13);
    setPen(Watch__timeColor);
    if (Watch__minutes < Watch__MINUTES_INIT)
        text("7:24", Watch__x - 16  + 9, Watch__y - 16  + 13);
    else if (Watch__minutes >= 60)
        text("8:00", Watch__x - 16  + 9, Watch__y - 16  + 13);
    else
        text("7:" + Watch__minutes, Watch__x - 16  + 9, Watch__y - 16  + 13);
}