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
        this._render = opened ? Door_renderOpenDoor : Door_renderClosedDoor;

        Scene_add(this);
    }

    update()
    {
        this._canBeInteractedWith = Character_checkInteractable(this, DOOR_INTERACTION_DISTANCE);
        if (this._canBeInteractedWith)
        {
            if (this._render != Door_renderOpenDoor)
            {
                // TODO: Door collision might be more for Door.js.
                const relY = this.y - Character_y;

                if (abs(relY) < DOOR_RADIUS_Y + CHARACTER_RADIUS)
                {
                    if (relY <= 0) Character_y++;
                    else Character_y--;
                }
            }
            Character_onCanInteractWith(this);
        }
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

    interact()
    {
        this._render = (this._render == Door_renderOpenDoor) ? Door_renderClosedDoor : Door_renderOpenDoor;
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