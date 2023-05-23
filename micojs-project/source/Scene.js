// Scene.js

"include /source/Character.js";
"include /source/Door.js";
"include /source/tools.js";

const Scene_RENDERING_CAPACITY = 16;
const Scene_UPDATE_CAPACITY = 16;

const Scene__renderList = new Array(Scene_RENDERING_CAPACITY);
let Scene__renderCount;
const Scene__updateList = new Array(Scene_UPDATE_CAPACITY);
let Scene__updateCount;
let Scene__enabled;
let Scene_cameraX;
let Scene_cameraY;
let Scene_screenWidth;
let Scene_screenHeight;


function Scene_init()
{
    Scene_screenWidth = getWidth();
    Scene_screenHeight = getHeight();

    Scene__updateList.fill(null);
    Scene__updateCount = 0;
    Scene__renderList.fill(null);
    Scene__renderCount = 0;

    // Scene here.
 
    new Character(50, 50);

    new Door(100, 41, false);

    new Door(120, 49, true);
    new Door(144, 49, false);
    new Door(168, 49, false);
    new Door(192, 49, false);
    new Door(216, 49, false);

    new Door(68, 97, false);
}

function Scene_update()
{
    CAMERA_X = 0;
    CAMERA_Y = 0;
    if (!Scene__enabled) return ;
    for (let i = 0; i < Scene__updateCount; i++)
        Scene__updateList[i].update();
    Scene_cameraX = max(0, min(Character_x - Scene_screenWidth / 2, 256 - Scene_screenWidth));
    Scene_cameraY = max(0, min(Character_y - Scene_screenHeight / 2, 256 - Scene_screenHeight));
}

function Scene_addUpdateItem(item) 
{
    if (Scene__updateCount < Scene_UPDATE_CAPACITY)
    {
        Scene__updateList[Scene__updateCount] = item;
        Scene__updateCount++;
    }
    else
        debug("CRIT - UpdateList full!");
}

function Scene_addRenderItem(item)
{
    if (Scene__renderCount < Scene_RENDERING_CAPACITY)
    {
        Scene__renderList[Scene__renderCount] = item;
        Scene__renderCount++;
    }
    else
        debug("CRIT - RenderList full!");
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
    
    for (let i = 1; i < Scene__renderCount; i++)
        if (Scene__renderList[i - 1].y > Scene__renderList[i].y)
        {
            let tmp = Scene__renderList[i - 1];

            Scene__renderList[i - 1] = Scene__renderList[i];
            Scene__renderList[i] = tmp;
        }
    for (let i = 0; i < Scene__renderCount; i++)
        Scene__renderList[i].render();
}