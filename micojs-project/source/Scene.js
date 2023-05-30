// Scene.js

"include /source/Character.js";
"include /source/Door.js";
"include /source/tools.js";

const Scene__CAPACITY = 64;
const Scene__entities = new Array(Scene__CAPACITY);
let Scene__entitiesCount;
let Scene__enabled;
let Scene_cameraX;
let Scene_cameraY;
let Scene_screenWidth;
let Scene_screenHeight;


function Scene_init()
{
    Scene_screenWidth = getWidth();
    Scene_screenHeight = getHeight();

    Scene__entities.fill(null);
    Scene__entitiesCount = 0;

    // Scene here.
 
    new Character(50, 50);

    new Door(100, 41, false);

    new Door(120, 49, true);
    new Door(144, 49, false);
    new Door(168, 49, false);
    new Door(192, 49, false);
    new Door(216, 49, false);

    new Door(68, 97, false);

    // new Item(180, 72, R.Items2);
    // new Item(196, 72, R.Items4);
    // new Item(180, 88, R.Items3);
    // new Item(196, 72, R.Items1);
}

function Scene_update()
{
    CAMERA_X = 0;
    CAMERA_Y = 0;
    if (!Scene__enabled) return ;
    for (let i = 0; i < Scene__entitiesCount; i++)
        Scene__entities[i].update();
    Scene_cameraX = max(0, min(Character_x - Scene_screenWidth / 2, 320 - Scene_screenWidth));
    Scene_cameraY = max(0, min(Character_y - Scene_screenHeight / 2, 320 - Scene_screenHeight));
}

function Scene_add(entity) 
{
    if (Scene__entitiesCount < Scene__CAPACITY)
    {
        Scene__entities[Scene__entitiesCount] = entity;
        Scene__entitiesCount++;
    }
    else
        debug("CRIT - UpdateList full!");
}

function Scene_render()
{
    if (!Scene__enabled)
    {
        setTileMap(R.BlackMap);
        return ;
    }

    CAMERA_X = Scene_cameraX;
    CAMERA_Y = Scene_cameraY;
    setTileMap(R.LeafMap);
    
    for (let i = 1; i < Scene__entitiesCount; i++)
        if (Scene__entities[i - 1].y > Scene__entities[i].y)
        {
            let tmp = Scene__entities[i - 1];

            Scene__entities[i - 1] = Scene__entities[i];
            Scene__entities[i] = tmp;
        }
    for (let i = 0; i < Scene__entitiesCount; i++)
        Scene__entities[i].render();
}