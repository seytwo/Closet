class Item
{
    constructor(id, type, data)
    {
        const _this = this;

        this.id = id;
        this.type = type;
        this.data = data;

        this.div = document.createElement("div");
        this.div.style.outline = "dotted 1px";
        this.div.style.display = "inline-block";
        this.div.style.verticalAlign = "top";

        this.img = document.createElement("img");
        this.img.src = "data\\" + this.type + "\\"  + this.id + "\\img.jpg";
        this.img.style.height = (parseInt(window.getComputedStyle(document.body).height) / 2 / 3) + "px";
        this.div.appendChild(this.img);

        if (this.type == "top") 
        {
            this.img.addEventListener("click", (event) =>
            {
                console.log("Item[" + _this.id + "].onclick");
    
                const _event = new CustomEvent("showBottom", {detail : _this});
                document.getElementById("bottom").dispatchEvent(_event);
            });
        }

        this.pairs = [];
    }
}