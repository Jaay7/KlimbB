chrome.runtime.onMessage.addListener((message, sender, callback) => {
  const tag = document.querySelector("h1.ytd-watch-metadata") as HTMLElement;
  if (message.type === "jsx_element") {
    // const element = message.element;
    // tag.insertAdjacentHTML("afterend", element);
    // callback({ message: "success" });
    // return true;
    const { top, left, width, height } = tag.getBoundingClientRect();
    const d = message.element.cloneNode(true) as HTMLElement;
    document.body.appendChild(d);
    const { width: dWidth, height: dHeight } = d.getBoundingClientRect();
    d.style.position = "absolute";
    d.style.top = `${top + height}px`;
    callback({ message: "success" });
    return true;
  }
});
