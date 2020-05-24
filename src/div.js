class Div
{
    constructor(type)
    {
        const _this = this;

        // トップス／ボトムス種類
        this.type = type;
        
        // div
        this.div = document.createElement("div");
        this.div.id = this.type;
        this.div.style.height = (parseInt(window.getComputedStyle(document.body).height) / 2) + "px";
        this.div.style.outline = "dotted 1px";
        this.div.style.overflow = "scroll";

        // 追加ボックス
        this.addBox = new AddBox(this.type);
        this.div.appendChild(this.addBox.div);
        
        // ローカルストレージから読み込み
        let i = 0;
        let typeid = this.type + "[" + i + "]";
        let src = localStorage[typeid + ".img"]
        while (src != undefined)
        {
            const item = new Item(i, this.type, src);
            this.div.appendChild(item.div);

            items[item.typeid] = item;

            i = i + 1;
            typeid = this.type + "[" + i + "]";
            src = localStorage[typeid + ".img"];
        }
    }
}