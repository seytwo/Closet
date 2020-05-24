class Box
{
    constructor()
    {
        this.div = document.createElement("div");
        this.div.style.outline = "solid 1px";
        this.div.style.display = "inline-block";
        this.div.style.verticalAlign = "top";
        this.div.style.height = (parseInt(window.getComputedStyle(document.body).height) / 2 / 3) + "px";
        this.div.style.width = (parseInt(window.getComputedStyle(document.body).height) / 2 / 3) + "px";
        this.div.style.margin = "0px";
    }
}