// Item.js

const ITEM_INTERACTION_DISTANCE = 4;

class Item {
    constructor(x, y, spriteRes) {
        this.x = x;
        this.y = y;
        this.spriteRes = spriteRes;
        this._canBeInteractedWith = false;
        this._deleteMe = false;
        
        Scene_add(this);
    }

    update() {
        let toCharacterX = abs(this.x - Character_x);
        let toCharacterY = abs(this.y - Character_y);
        
        this._canBeInteractedWith = max(toCharacterX, toCharacterY) < DOOR_INTERACTION_DISTANCE;
        if (this._canBeInteractedWith)
            Character_onItemNearby(this);
        return this._deleteMe;
    }

    render() {
        var x = this.x - Scene_cameraX;
        var y = this.y - Scene_cameraY;
        
        image(this.spriteRes, x, y - 4);
        if (this._canBeInteractedWith)
            image(R.Buttons1, x, y - DOOR_TO_STATUS_Y - ticker_4);
    }

    pickup() {
        this._deleteMe = true;
    }
}

