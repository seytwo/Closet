const items = {};
const load = () =>
{
    //ローカルストレージを初期化
    if (localStorage.topNumber == null)
    {
        console.log("initialize local strage");
        localStorage["top.length"] = 0;
        localStorage["bottom.length"] = 0;
    }

    // divを初期化
    const topDiv = new Div("top");
    const bottomDiv = new Div("bottom");
    document.body.appendChild(topDiv.div);
    document.body.appendChild(bottomDiv.div);
    
    // ペアを設定
    for (const typeid in items)
    {
        const item = items[typeid];
        const pairs = JSON.parse(localStorage[typeid + ".pairs"]);
        for (const pair of pairs)
        {
            item.pairs.add(items[pair]);
        }
    }
};