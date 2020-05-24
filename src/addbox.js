class AddBox extends Box
{
    constructor(type)
    {
        super();
        const _this = this;

        // トップス／ボトムス種類
        this.type = type;

        // divのid
        this.div.id = this.type + ".add";

        // 装飾用のlabel
        this.label = document.createElement("label");
        this.label.style.color = "#FFCACA";
        this.div.appendChild(this.label);

        //
        this.img = document.createElement("img");
        this.img.src = "add.png";
        this.label.appendChild(this.img);

        // ファイル読み込みエレメント
        this.file = document.createElement("input");
        this.file.type = "file";
        this.file.style.display = "none";
        this.label.appendChild(this.file);

        // ファイル読み込みイベントリスナ
        this.file.addEventListener("change", (event) =>
        {
            console.log("AddBox.onchange");

            const i = localStorage[_this.type + "Number"];

            // アイテムを生成
            const src = window.URL.createObjectURL(_this.file.files[0]);
            const item = new Item(i, _this.type, src);
            document.getElementById(_this.type).appendChild(item.div);

            items[item.typeid] = item;

            // ペアをローカルストレージに保存
            localStorage[item.typeid + ".pairs"] 
                = JSON.stringify(Array.from(item.pairs).map((pair) => pair.typeid));

            // img読み込み後にローカルストレージに保存
            item.img.addEventListener("load", (event) =>
            {
                var canvas = document.createElement("canvas");
                canvas.width  = item.img.width;
                canvas.height = item.img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(item.img, 0, 0, item.img.width, item.img.height);
                const data = canvas.toDataURL("image/jpeg");

                localStorage[_this.type + "[" + localStorage[_this.type + "Number"] + "].img"] = data;
                localStorage[_this.type + "Number"] = parseInt(localStorage[_this.type + "Number"]) + 1;
            });
        });
        
        console.log(this);
    }
}