let selectedItem = null;
class Item extends Box
{
    constructor(id, type, src)
    {
        super();
        const _this = this;

        this.id = id;
        this.type = type;

        this.div.id = this.type + "[" + this.id + "]"

        // img
        this.img = document.createElement("img");
        this.img.src = src;
        this.img.style.width = parseInt(this.div.style.width);
        this.img.style.height = parseInt(this.div.style.height);
        this.div.appendChild(this.img);

        this.removeButton = document.createElement("input");
        this.removeButton.type = "button";
        this.removeButton.value = "×";
        this.removeButton.style.position = "relative";
        this.removeButton.style.top = -parseInt(this.div.style.height) + "px";
        this.div.appendChild(this.removeButton);

        this.removeButton.addEventListener("click", (event) =>
        {
            console.log(_this.typeid + ".removebutton.click");
            if (window.confirm("アイテムを削除しますか？"))
            {
                localStorage.removeItem(_this.typeid + ".img"); 
                localStorage.removeItem(_this.typeid + ".pairs");
                // localStorage[_this.type + ".length"] 
                //     = parseInt(localStorage[_this.type + ".length"]) - 1;
                for (const pair of _this.pairs)
                {
                    pair.pairs.delete(_this);
                    localStorage[pair.typeid + ".pairs"] 
                        = JSON.stringify(Array.from(pair.pairs).map((_pair) => _pair.typeid));
                }
                window.confirm("ページを更新してください");
            }
        });

        // ペア
        this.pairs = new Set();

        // アイテムの選択イベントリスナ
        this.img.addEventListener("click", (event) =>
        {            
            // 同じトップス／ボトムス種類の場合は処理なし
            if (selectedItem != null && selectedItem.type != _this.type)
            {
                return;
            }

            console.log(_this.typeid + ".onclick.select");

            for (const typeid in items)
            {
                items[typeid].div.style.opacity = 0.2;
            }

            // 選択済みのアイテムを選択した場合は処理なし
            if (selectedItem == _this)
            {
                selectedItem = null;
                
                for (const typeid in items)
                {
                    items[typeid].div.style.opacity = 1;
                }

                return;
            }

            // 選択済みのアイテムを更新
            selectedItem = _this;

            selectedItem.div.style.opacity = 1;
            
            // ペアのアイテムの枠を青くする
            for (const pair of _this.pairs)
            {
                pair.div.style.opacity = 1;
            }
        });

        // ペアの選択イベントリスナ
        this.img.addEventListener("click", (event) =>
        {
            // トップス／ボトムス種類が同じ選択済みアイテムを選択した場合
            if (selectedItem == null || selectedItem.type == _this.type)
            {
                return;
            }

            console.log(_this.typeid + ".onclick.add_pair");

            // 選択済みアイテムのペアに未登録の場合
            if (!selectedItem.pairs.has(_this))
            {
                // ペアに追加
                selectedItem.pairs.add(_this);
                _this.pairs.add(selectedItem);
                
                _this.div.style.opacity = 1;
            }
            else
            {
                // ペアから削除するか確認
                if (window.confirm("ペアを削除しますか？"))
                {
                    // ペアから削除
                    selectedItem.pairs.delete(_this);
                    _this.pairs.delete(selectedItem);
                    
                    _this.div.style.opacity = 0.2;
                }
            }
            
            // ペアのローカルストレージを更新
            localStorage[selectedItem.typeid + ".pairs"] 
                = JSON.stringify(Array.from(selectedItem.pairs).map((pair) => pair.typeid));
            localStorage[_this.typeid + ".pairs"] 
                = JSON.stringify(Array.from(_this.pairs).map((pair) => pair.typeid));
        });
    }

    get typeid()
    {
        return this.type + "[" + this.id + "]";
    }
}