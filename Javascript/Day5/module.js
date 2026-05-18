function display(message) {
    const e1 = document.createElement("div");
    e1.innerText = message;
    document.body.appendChild(e1);
}

export { display };