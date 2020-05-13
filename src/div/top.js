class TopDiv
{
    constructor(tops)
    {
        const _this = this;

        this.tops = tops;

        this.div = document.createElement("div");
        this.div.id = "top";
        this.div.style.height = (parseInt(window.getComputedStyle(document.body).height) / 2) + "px";
        this.div.style.outline = "dotted 1px";
        this.div.style.overflow = "scroll";

        for (const top of this.tops)
        {
            console.log(top);
            this.div.appendChild(top.div);
        }

    }
}