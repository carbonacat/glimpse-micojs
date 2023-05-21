// Scene.js

"include /source/Character.js";
"include /source/Door.js";

const RENDERING_CAPACITY = 16;
const UPDATE_CAPACITY = 16;

class Scene
{
    constructor()
    {
        this.character = null;
        this._renderList = new Array(RENDERING_CAPACITY);
        this._renderCount = 0;
        this._updateList = new Array(UPDATE_CAPACITY);
        this._updateCount = 0;

        // Map loading code here.
        this.character = new Character(50, 50, this);

        new Door(100, 41, false, this);

        new Door(120, 49, true, this);
        new Door(144, 49, false, this);
        new Door(168, 49, false, this);
        new Door(192, 49, false, this);
        new Door(216, 49, false, this);

        new Door(68, 97, false, this);
    }

    update()
    {
        for (let i = 0; i < this._updateCount; i++)
            this._updateList[i].update(this);
    }

    addUpdateItem(item)
    {
        if (this._updateCount <= UPDATE_CAPACITY)
        {
            this._updateList[this._updateCount] = item;
            this._updateCount++;
        }
        else
            debug("CRIT - UpdateList full!");
    }

    addRenderItem(item)
    {
        if (this._renderCount <= RENDERING_CAPACITY)
        {
            this._renderList[this._renderCount] = item;
            this._renderCount++;
        }
        else
            debug("CRIT - RenderList full!");
    }

    render()
    {
        for (let i = 1; i < this._renderCount; i++)
            if (this._renderList[i - 1].y > this._renderList[i].y)
            {
                let tmp = this._renderList[i - 1];

                this._renderList[i - 1] = this._renderList[i];
                this._renderList[i] = tmp;
            }
        for (let i = 0; i < this._renderCount; i++)
            this._renderList[i].render();
    }
}