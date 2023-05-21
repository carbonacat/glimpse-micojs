"push title Glimpse";
"push author carbonacat";
"push description Explore, investigate and try to shutdown the device which produce the timeloop you're stuck into!";
"set version v0.0.1";
"set category game";
"set url https://micojs.github.com";

"include /source/Character.js";

const bgColor = setPen(0, 0, 0);
const txtColor = setPen(64, 128, 255);
const txtBadColor = setPen(256, 64, 128);

let screenWidth, screenHeight;

let character = new Character(50, 50);

function init() {
    screenWidth = getWidth();
    screenHeight = getHeight();
    setFPS(30);
    setTileMap(R.LeafMap);
}

function update(time) {
    character.update();
}

function render() {
    setPen(bgColor);
    clear();
    
    // UI.
    setPen(txtColor);
    text("GLIMPSE", 5, 5);

    character.render();
}
