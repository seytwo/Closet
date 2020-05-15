const topsNumber = 8;
const bottomsNumber = 12;

const pairs =
[
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 12],
    [2, 1],
    [2, 5],
    [3, 5],
    [3, 7],
    [3, 11],
    [4, 1],
    [4, 3],
    [4, 5],
    [4, 7],
    [5, 1],
    [5, 3],
    [5, 5],
    [5, 7],
    [5, 11],
    [6, 5],
    [6, 7],
    [6, 11],
    [7, 5],
    [7, 7],
    [7, 11],
    [7, 12],
    [8, 9]
];

class Controller
{
    constructor()
    {
        this.items = [];
        for (let i = 0; i < topsNumber; i++)
        {
            const item = new Item(i + 1, "top", {});
            this.items.push(item);
        }
        for (let i = 0; i < bottomsNumber; i++)
        {
            const item = new Item(i + 1, "bottom", {});
            this.items.push(item);
        }
        
        this.dict = 
        {
            "top" : [],
            "bottom" : []
        };
        for (const item of this.items)
        {
            this.dict[item.type][item.id] = item;
        }

        for (const pair of pairs)
        {
            const top = this.dict["top"][pair[0]];
            const bottom = this.dict["bottom"][pair[1]];
            top.pairs.push(bottom);
            bottom.pairs.push(top);
        }
    }
}