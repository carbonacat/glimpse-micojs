// Character.js

const CHARACTER_RADIUS = 3;

class Character
{
    constructor(initX, initY, scene)
    {
        this.x = initX;
        this.y = initY;

        this._lastA = A;
        this._acting = false;

        this._subAnimIndex = 0;
        this._mirrored = false;
        this._leftLegIndex = 0;
        this._rightLegIndex = 0;
        scene.addRenderItem(this);
        scene.addUpdateItem(this);
    }

    // LIFECYCLE.

    update(scene)
    {
        let subAnimIndex = this._subAnimIndex;
        let rightLegIndex = this._rightLegIndex;
        let leftLegIndex = this._leftLegIndex;

        if (this._updateMovement())
        {
            subAnimIndex++;
            if (subAnimIndex >= 3)
            {
                subAnimIndex = 0;
                
                let leftToRight = rightLegIndex - leftLegIndex;

                if (leftToRight < 0) leftToRight += CharacterLegs.length;

                if (leftToRight == 4)
                {
                    rightLegIndex += 1;
                    if (rightLegIndex >= CharacterLegs.length)
                        rightLegIndex = 0;
                }
                else if (leftToRight == 5)
                {
                    leftLegIndex += 1;
                    if (leftLegIndex >= CharacterLegs.length)
                        leftLegIndex = 0;
                    rightLegIndex += 1;
                    if (rightLegIndex >= CharacterLegs.length)
                        rightLegIndex = 0;
                }
                else
                {
                    leftLegIndex -= 1;
                    if (leftLegIndex < 0)
                        leftLegIndex = CharacterLegs.length - 1;
                    rightLegIndex += 1;
                    if (rightLegIndex >= CharacterLegs.length)
                        rightLegIndex = 0;
                }
            }
        }
        else
        {
            subAnimIndex = 0;
            if (leftLegIndex > 5)
            {
                leftLegIndex++;
                if (leftLegIndex >= CharacterLegs.length) leftLegIndex = 0;
            }
            else if (leftLegIndex > 0) leftLegIndex--;
            if (rightLegIndex > 5)
            {
                rightLegIndex++;
                if (rightLegIndex >= CharacterLegs.length) rightLegIndex = 0;
            }
            else if (rightLegIndex > 0) rightLegIndex--;
        }
        
        this._subAnimIndex = subAnimIndex;
        this._rightLegIndex = rightLegIndex;
        this._leftLegIndex = leftLegIndex;

        
        if (A != this._lastA)
        {
            this._lastA = A;
            this._acting = A;
        }
        else
            this._acting = false;
    }

    onDoorNearby(door)
    {
        if (!door.isOpened())
        {
            // TODO: Door collision might be more for Door.js.
            const relY = door.y - this.y;

            if (abs(relY) < DOOR_RADIUS_Y + CHARACTER_RADIUS)
            {
                if (relY <= 0) this.y++;
                else this.y--;
            }
        }
        if (this._acting)
        {
            door.setOpened(!door.isOpened());
            this._acting = false;
        }
    }


    // RENDERING.

    render()
    {
        // For the area.
        // setPen(128, 128, 128);
        // rect(this.x - 3, this.y - 3, 7, 7);
        setPen(0);
        setMirrored(this._mirrored);
        image(CharacterLegs[this._leftLegIndex], this.x + this._mirroredXOffset(+1), this.y - 2);
        image(CharacterLegs[this._rightLegIndex], this.x + this._mirroredXOffset(-1), this.y - 2);
        image(CharacterArms[this._rightLegIndex], this.x + this._mirroredXOffset(1), this.y - 9 + TorsoYOffset[this._rightLegIndex]);
        image(R.CharacterTorso, this.x + this._mirroredXOffset(1), this.y - 8 + TorsoYOffset[this._leftLegIndex]);
        image(R.CharacterHeads, this.x, this.y - 15 + HeadYOffset[this._leftLegIndex]);
        image(CharacterArms[this._leftLegIndex], this.x + this._mirroredXOffset(-1), this.y - 9 + TorsoYOffset[this._leftLegIndex]);
    }


    // TOOLS.

    _attemptLeft(slide)
    {
        this.x--;

        const up = getTileProperty(this.x - CHARACTER_RADIUS, this.y - CHARACTER_RADIUS, "collides");
        const down = getTileProperty(this.x - CHARACTER_RADIUS, this.y + CHARACTER_RADIUS, "collides");

        if (up || down)
        {
            this.x++;
            if (slide)
            {
                if (!up)
                    this._attemptUp();
                else if (!down)
                    this._attemptDown();
            }
            return false;
        }
        return true;
    }
    _attemptRight(slide)
    {
        this.x++;

        const up = getTileProperty(this.x + CHARACTER_RADIUS, this.y - CHARACTER_RADIUS, "collides");
        const down = getTileProperty(this.x + CHARACTER_RADIUS, this.y + CHARACTER_RADIUS, "collides");

        if (up || down)
        {
            this.x--;
            if (slide)
            {
                if (!up)
                    this._attemptUp();
                else if (!down)
                    this._attemptDown();
            }
            return false;
        }
        return true;
    }
    _attemptUp(slide)
    {
        this.y--;

        const left = getTileProperty(this.x - CHARACTER_RADIUS, this.y - CHARACTER_RADIUS, "collides");
        const right = getTileProperty(this.x + CHARACTER_RADIUS, this.y - CHARACTER_RADIUS, "collides");

        if (left || right)
        {
            this.y++;
            if (slide)
            {
                if (!left)
                    this._attemptLeft();
                else if (!right)
                    this._attemptRight();
            }
            return false;
        }
        return true;
    }
    _attemptDown(slide)
    {
        this.y++;

        const left = getTileProperty(this.x - CHARACTER_RADIUS, this.y + CHARACTER_RADIUS, "collides");
        const right = getTileProperty(this.x + CHARACTER_RADIUS, this.y + CHARACTER_RADIUS, "collides");

        if (left || right)
        {
            this.y--;
            if (slide)
            {
                if (!left)
                    this._attemptLeft();
                else if (!right)
                    this._attemptRight();
            }
            return false;
        }
        return true;
    }

    _updateMovement()
    {
        let walking = false;

        {
            if (LEFT)
            {
                this._attemptLeft(!DOWN && !UP);
                this._mirrored = true;
            }
            if (RIGHT)
            {
                this._attemptRight(!DOWN && !UP);
                this._mirrored = false;
            }
            if (UP)
                this._attemptUp(!LEFT && !RIGHT);
            if (DOWN)
                this._attemptDown(!LEFT && !RIGHT);
            walking = LEFT || RIGHT || UP || DOWN;
        }
        return walking;
    }

    _mirroredXOffset(offset)
    {
        if (this._mirrored) return -offset;
        return offset;
    }
}

const CharacterLegs =
[
    R.CharacterLeg1, R.CharacterLeg2, R.CharacterLeg3, R.CharacterLeg4, R.CharacterLeg5,
    R.CharacterLeg6, R.CharacterLeg7, R.CharacterLeg8, R.CharacterLeg9, R.CharacterLeg10
];
const CharacterArms =
[
    R.CharacterArms6, R.CharacterArms7, R.CharacterArms8, R.CharacterArms9, R.CharacterArms10,
    R.CharacterArms1, R.CharacterArms2, R.CharacterArms3, R.CharacterArms4, R.CharacterArms5
];
const TorsoYOffset = [0, 0, 0, 1, 1, 0, 0, 0, 1, 1];
const HeadYOffset = [0, 0, 1, 1, 0, 0, 0, 1, 1, 0];
