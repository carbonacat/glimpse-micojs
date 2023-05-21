// Door.js

const DOOR_INTERACTION_DISTANCE = 8;
const DOOR_TO_STATUS_Y = 24;
const DOOR_RADIUS_Y = 1;

class Door
{
    constructor(initX, initY, opened, scene)
    {
        this.x = initX;
        this.y = initY;
        this._canBeInteractedWith = false;
        this.setOpened(opened);

        scene.addRenderItem(this);
        scene.addUpdateItem(this);
    }

    update(scene)
    {
        const character = scene.character;

        if (character)
        {
            let toCharacterX = abs(this.x - scene.character.x);
            let toCharacterY = abs(this.y - scene.character.y);
            
            this._canBeInteractedWith = max(toCharacterX, toCharacterY) < DOOR_INTERACTION_DISTANCE;
            if (this._canBeInteractedWith)
                character.onDoorNearby(this);
        }
    }

    render()
    {
        // For the area.
        // setPen(255, 0, 0);
        // rect(this.x - 8, this.y - DOOR_RADIUS_Y, 16, DOOR_RADIUS_Y * 2);
        this._render(this.x, this.y);
        if (this._canBeInteractedWith)
            image(R.Buttons1, this.x, this.y - DOOR_TO_STATUS_Y - ticker_4);
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
    setPen(0);
    setMirrored(false);
    image(R.MetalDoor1, x-1, y-8);
}

function Door_renderOpenDoor(x, y)
{
    setPen(0);
    setMirrored(false);
    image(R.MetalDoor2, x-1, y-8);
}