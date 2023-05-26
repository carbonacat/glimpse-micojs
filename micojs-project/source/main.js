"push title Glimpse";
"push author carbonacat";
"push description Explore, investigate and try to shutdown the device which produce the timeloop you're stuck into!";
"set version v0.0.1";
"set category game";
"set url https://micojs.github.com";

"include /source/Scene.js";
"include /source/Watch.js";

const bgColor = setPen(0, 0, 0);
const txtColor = setPen(64, 128, 255);

let ticker = 0
let ticker_1 = 0;
let ticker_4 = 0;
let watch = null;

function init() {
    setFPS(30);

    Watch_init();
    initGame();
}

function initGame() {
    setTileMap(R.LeafMap);
    Scene_init()
    Watch_restart();
}

function update(time) {
    ticker++;
    ticker_1 = 1 - ticker_1;
    if ((ticker & 0x03) == 0x00)
        ticker_4 = 1 - ticker_4;

    Watch_update();
    Scene_update()
}

function render() {
    setPen(bgColor);
    clear();
    
    Scene_render();
    Watch_render();
}
