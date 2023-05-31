// Item.js

const Item_INTERACTION_DISTANCE = 4;
const Item_RENDER_OFFSETY = -2;
const Item_TILED_OFFSETX = 0;
const Item_TILED_OFFSETY = -2;
const Item_TO_STATUS_Y = 24;

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
            this._canBeInteractedWith = Character_checkInteractable(this, Item_INTERACTION_DISTANCE);
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
        
        // For the area.
        // setPen(255, 0, 255);
        // rect(x - Item_INTERACTION_DISTANCE, y - Item_INTERACTION_DISTANCE, Item_INTERACTION_DISTANCE*2, Item_INTERACTION_DISTANCE*2);
        // setPen(0);

        image(this.spriteRes, x, y+Item_RENDER_OFFSETY);
        if (this._canBeInteractedWith)
            image(R.Buttons2, x, y - Item_TO_STATUS_Y - ticker_4);
    }
}

