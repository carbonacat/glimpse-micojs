"push title Glimpse";
"push author carbonacat";
"push description Explore, investigate and try to shutdown the device which produce the timeloop you're stuck into!";
"set version v0.0.1";
"set category game";
"set url https://micojs.github.com";

"include /source/Scene.js";

const bgColor = setPen(0, 0, 0);
const txtColor = setPen(64, 128, 255);

let scene;
let ticker = 0
let ticker_1 = 0;
let ticker_4 = 0;

function init() {
    setFPS(30);
    setTileMap(R.LeafMap);
    scene = new Scene();
}

function update(time) {
    ticker++;
    ticker_1 = 1 - ticker_1;
    if (ticker & 0x04 == 0x04)
        ticker_4 = 1 - ticker_4;

    scene.update()
}

function render() {
    setPen(bgColor);
    clear();

    scene.render();

    // UI.
    setPen(txtColor);
    text("GLIMPSE", 5, 5);
    setPen(0);
}
