const load = () =>
{
    const controller = new Controller();
    const topDiv = new TopDiv(controller.items.filter((item) => item.type == "top"));
    const bottomDiv = new BottomDiv();
    document.body.appendChild(topDiv.div);
    document.body.appendChild(bottomDiv.div);
};