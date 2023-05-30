// Item.js

const ITEM_INTERACTION_DISTANCE = 4;

class Item
{
    constructor(x, y, spriteRes)
    {
        this.x = x;
        this.y = y;
        this.spriteRes = spriteRes;
        this._canBeInteractedWith = false;
        this._deleteMe = false;
        
        Scene_add(this);
    }

    update()
    {
        if (!Character_currentItem)
        {
            this._canBeInteractedWith = Character_checkInteractable(this, DOOR_INTERACTION_DISTANCE);
            if (this._canBeInteractedWith && Character__actingB)
            {
                Character_currentItem = this.spriteRes;
                this._deleteMe = true;
                Character__actingB = false;
            }
        }
        return this._deleteMe;
    }

    render()
    {
        var x = this.x - Scene_cameraX;
        var y = this.y - Scene_cameraY;
        
        image(this.spriteRes, x, y - 4);
        if (this._canBeInteractedWith)
            image(R.Buttons2, x, y - DOOR_TO_STATUS_Y - ticker_4);
    }
}

