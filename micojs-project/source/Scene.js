// Scene.js

"include /source/Character.js";
"include /source/Door.js";
"include /source/tools.js";

const Scene_RENDERING_CAPACITY = 16;
const Scene_UPDATE_CAPACITY = 16;

const Scene__renderList = new Array(Scene_RENDERING_CAPACITY);
let Scene__renderCount = 0;
const Scene__updateList = new Array(Scene_UPDATE_CAPACITY);
let Scene__updateCount = 0;
let Scene__enabled = true;

function Scene_init()
{
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
    if (!Scene__enabled) return ;
    for (let i = 0; i < Scene__updateCount; i++)
        Scene__updateList[i].update();
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