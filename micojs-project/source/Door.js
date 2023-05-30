// Door.js

const DOOR_INTERACTION_DISTANCE = 8;
const DOOR_TO_STATUS_Y = 24;
const DOOR_RADIUS_Y = 1;

class Door
{
    constructor(initX, initY, opened)
    {
        this.x = initX;
        this.y = initY;
        this._canBeInteractedWith = false;
        this.setOpened(opened);

        Scene_addUpdateItem(this);
        Scene_addRenderItem(this);
    }

    update()
    {
        let toCharacterX = abs(this.x - Character_x);
        let toCharacterY = abs(this.y - Character_y);
        
        this._canBeInteractedWith = max(toCharacterX, toCharacterY) < DOOR_INTERACTION_DISTANCE;
        if (this._canBeInteractedWith)
            Character_onDoorNearby(this);
    }

    render()
    {
        var x = this.x - Scene_cameraX;
        var y = this.y - Scene_cameraY;
        
        // For the area.
        // setPen(255, 0, 0);
        // rect(x - 8, y - DOOR_RADIUS_Y, 16, DOOR_RADIUS_Y * 2);
        this._render(x, y);
        if (this._canBeInteractedWith)
            image(R.Buttons1, x, y - DOOR_TO_STATUS_Y - ticker_4);
    }

    setOpened(opened)
    {
        this._render = opened ? Door_renderOpenDoor : Door_renderClosedDoor;
    }

    isOpened()
    {
        return this._render == Door_renderOpenDoor;
    }
}

function Door_renderClosedDoor(x, y)
{
    image(R.MetalDoor1, x-1, y-8);
}

function Door_renderOpenDoor(x, y)
{
    image(R.MetalDoor2, x-1, y-8);
}