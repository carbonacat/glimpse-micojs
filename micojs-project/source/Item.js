// Item.js

class Item {
    constructor(x, y, spriteRes) {
        this.x = x;
        this.y = y;
        this.spriteRes = spriteRes;
        
        Scene_add(this);
    }

    update(time) {
    }

    render() {
        image(this.spriteRes, this.x, this.y-4);
    }
}

