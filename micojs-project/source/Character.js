// Character.js

class Character
{
    constructor(initX, initY)
    {
        this._x = initX;
        this._y = initY;
        this._subAnimIndex = 0;
        this._mirrored = false;
        this._leftLegIndex = 0;
        this._rightLegIndex = 0;
    }

    update()
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
    }

    render()
    {
        const x = this._x;
        const y = this._y;
        const leftLegIndex = this._leftLegIndex;
        const rightLegIndex = this._rightLegIndex;

        setPen(0);
        setMirrored(this._mirrored);
        image(CharacterLegs[leftLegIndex], x + this._mirroredXOffset(+1), y - 3);
        image(CharacterLegs[rightLegIndex], x + this._mirroredXOffset(-1), y - 3);
        image(CharacterArms[rightLegIndex], x + this._mirroredXOffset(1), y - 10 + TorsoYOffset[rightLegIndex]);
        image(R.CharacterTorso, x + this._mirroredXOffset(1), y - 9 + TorsoYOffset[leftLegIndex]);
        image(R.CharacterHeads, x, y - 16 + HeadYOffset[leftLegIndex]);
        image(CharacterArms[leftLegIndex], x + this._mirroredXOffset(-1), y - 10 + TorsoYOffset[leftLegIndex]);
    }

    _updateMovement()
    {
        let walking = false;

        {
            let x = this._x;
            let y = this._y;

            if (LEFT)
            {
                x--;
                this._mirrored = true;
            }
            if (RIGHT)
            {
                x++;
                this._mirrored = false;
            }
            if (getTileProperty(x, y, "collides"))
                x = this._x;
            else
                this._x = x;

            if (UP) y--;
            if (DOWN) y++;
            if (getTileProperty(x, y, "collides"))
                y = this._y
            else
                this._y = y;
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
