class BottomDiv
{
    constructor()
    {
        const _this = this;
        
        this.div = document.createElement("div");
        this.div.id = "bottom";
        this.div.style.width = "auto";
        this.div.style.height = (parseInt(window.getComputedStyle(document.body).height) / 2) + "px";
        this.div.style.outline = "dotted 1px";
        this.div.style.overflow = "scroll";

        this.div.addEventListener("showBottom", (event) =>
        {
            while (_this.div.firstChild)
            {
                _this.div.removeChild(_this.div.firstChild);
            }

            const top = event.detail;
            for (const bottom of top.pairs)
            {
                console.log(bottom);
                _this.div.appendChild(bottom.div);
            }
        });
    }
}