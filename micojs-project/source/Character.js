// Character.js

// DATA.

class Character
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        Character__init(x, y);
        Scene_addUpdateItem(this);
        Scene_addRenderItem(this);
    }

    update()
    {
        this.y = Character__y;
        this.x = Character__x;
        Character__update();
    }
    render()
    {
        Character__render();
    }

    onDoorNearby(door)
    {
        Character__onDoorNearby(door);
    }
}

const CHARACTER_RADIUS = 3;
let Character__x;
let Character__y;

let Character__lastA;
let Character__acting;

let Character__subAnimIndex;
let Character__mirrored;
let Character__leftLegIndex;
let Character__rightLegIndex;


// // LIFECYCLE.

function Character__init(x, y)
{
    Character__x = x;
    Character__y = y;

    Character__lastA = A;
    Character__acting = false;

    Character__subAnimIndex = 0;
    Character__mirrored = false;
    Character__leftLegIndex = 0;
    Character__rightLegIndex = 0;
}

function Character__update()
{
    let subAnimIndex = Character__subAnimIndex;
    let rightLegIndex = Character__rightLegIndex;
    let leftLegIndex = Character__leftLegIndex;

    if (Character__updateMovement())
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
    
    Character__subAnimIndex = subAnimIndex;
    Character__rightLegIndex = rightLegIndex;
    Character__leftLegIndex = leftLegIndex;

    
    if (A != Character__lastA)
    {
        Character__lastA = A;
        Character__acting = A;
    }
    else
        Character__acting = false;
}

function Character__onDoorNearby(door)
{
    if (!door.isOpened())
    {
        // TODO: Door collision might be more for Door.js.
        const relY = door.y - Character__y;

        if (abs(relY) < DOOR_RADIUS_Y + CHARACTER_RADIUS)
        {
            if (relY <= 0) Character__y++;
            else Character__y--;
        }
    }
    if (Character__acting)
    {
        door.setOpened(!door.isOpened());
        Character__acting = false;
    }
}


// MOVEMENT.

function Character__attemptLeft(slide)
{
    Character__x--;

    const up = getTileProperty(Character__x - CHARACTER_RADIUS, Character__y - CHARACTER_RADIUS, "collides");
    const down = getTileProperty(Character__x - CHARACTER_RADIUS, Character__y + CHARACTER_RADIUS, "collides");

    if (up || down)
    {
        Character__x++;
        if (slide)
        {
            if (!up)
                Character__attemptUp();
            else if (!down)
                Character__attemptDown();
        }
        return false;
    }
    return true;
}

function Character__attemptRight(slide)
{
    Character__x++;

    const up = getTileProperty(Character__x + CHARACTER_RADIUS, Character__y - CHARACTER_RADIUS, "collides");
    const down = getTileProperty(Character__x + CHARACTER_RADIUS, Character__y + CHARACTER_RADIUS, "collides");

    if (up || down)
    {
        Character__x--;
        if (slide)
        {
            if (!up)
                Character__attemptUp();
            else if (!down)
                Character__attemptDown();
        }
        return false;
    }
    return true;
}

function Character__attemptUp(slide)
{
    Character__y--;

    const left = getTileProperty(Character__x - CHARACTER_RADIUS, Character__y - CHARACTER_RADIUS, "collides");
    const right = getTileProperty(Character__x + CHARACTER_RADIUS, Character__y - CHARACTER_RADIUS, "collides");

    if (left || right)
    {
        Character__y++;
        if (slide)
        {
            if (!left)
                Character__attemptLeft();
            else if (!right)
                Character__attemptRight();
        }
        return false;
    }
    return true;
}

function Character__attemptDown(slide)
{
    Character__y++;

    const left = getTileProperty(Character__x - CHARACTER_RADIUS, Character__y + CHARACTER_RADIUS, "collides");
    const right = getTileProperty(Character__x + CHARACTER_RADIUS, Character__y + CHARACTER_RADIUS, "collides");

    if (left || right)
    {
        Character__y--;
        if (slide)
        {
            if (!left)
                Character__attemptLeft();
            else if (!right)
                Character__attemptRight();
        }
        return false;
    }
    return true;
}

function Character__updateMovement()
{
    let walking = false;

    {
        if (LEFT)
        {
            Character__attemptLeft(!DOWN && !UP);
            Character__mirrored = true;
        }
        if (RIGHT)
        {
            Character__attemptRight(!DOWN && !UP);
            Character__mirrored = false;
        }
        if (UP)
            Character__attemptUp(!LEFT && !RIGHT);
        if (DOWN)
            Character__attemptDown(!LEFT && !RIGHT);
        walking = LEFT || RIGHT || UP || DOWN;
    }
    return walking;
}


// RENDERING.

function Character__render()
{
    // For the area.
    // setPen(128, 128, 128);
    // rect(Character__x - 3, Character__y - 3, 7, 7);
    setPen(0);
    setMirrored(Character__mirrored);
    image(CharacterLegs[Character__leftLegIndex], Character__x + Character__mirroredXOffset(+1), Character__y - 2);
    image(CharacterLegs[Character__rightLegIndex], Character__x + Character__mirroredXOffset(-1), Character__y - 2);
    image(CharacterArms[Character__rightLegIndex], Character__x + Character__mirroredXOffset(1), Character__y - 9 + TorsoYOffset[Character__rightLegIndex]);
    image(R.CharacterTorso, Character__x + Character__mirroredXOffset(1), Character__y - 8 + TorsoYOffset[Character__leftLegIndex]);
    image(R.CharacterHeads, Character__x, Character__y - 15 + HeadYOffset[Character__leftLegIndex]);
    image(CharacterArms[Character__leftLegIndex], Character__x + Character__mirroredXOffset(-1), Character__y - 9 + TorsoYOffset[Character__leftLegIndex]);
}

function Character__mirroredXOffset(offset)
{
    if (Character__mirrored) return -offset;
    return offset;
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
