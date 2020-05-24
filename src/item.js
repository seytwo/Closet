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

            // 選択済みのアイテムの設定を戻す
            if (selectedItem != null)
            {
                selectedItem.div.style.outline = "solid 1px";
                selectedItem.div.style.outlineColor = "black";
                for (const pair of selectedItem.pairs)
                {
                    pair.div.style.outline = "solid 1px";
                    pair.div.style.outlineColor = "black";
                }
            }

            // 選択済みのアイテムを選択した場合は処理なし
            if (selectedItem == _this)
            {
                selectedItem = null;
                return;
            }

            // 選択済みのアイテムを更新
            selectedItem = _this;

            // 選択したアイテムの枠を赤くする
            _this.div.style.outline = "solid 10px";
            _this.div.style.outlineColor = "red";

            // ペアのアイテムの枠を青くする
            for (const pair of _this.pairs)
            {
                pair.div.style.outline = "solid 10px";
                pair.div.style.outlineColor = "blue";
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
                
                // ペアの枠線を青色にする
                _this.div.style.outline = "solid 10px";
                _this.div.style.outlineColor = "blue";
            }
            else
            {
                // ペアから削除するか確認
                if (window.confirm("ペアを削除しますか？"))
                {
                    // ペアから削除
                    selectedItem.pairs.delete(_this);
                    _this.pairs.delete(selectedItem);
                    
                    // ペアの枠線を戻す
                    _this.div.style.outline = "solid 1px";
                    _this.div.style.outlineColor = "black";
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