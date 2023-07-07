import React from "react";
import ReactDOM from "react-dom/client";
import ReactDOMServer from "react-dom/server";
import { RootState } from "./store/store";
import { addChat } from "./store/chatSlice";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store/store";

interface IProps {}

const Popup: React.FC<IProps> = () => {
  const [text, setText] = React.useState("");

  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);

  // React.useEffect(() => {
  //   const handleClick = () => {
  //     setActive(!active);
  //   };
  //   const EmbedButton = (
  //     <button
  //       style={{
  //         padding: "4px 4px",
  //         border: "none",
  //         borderRadius: "50px",
  //         fontWeight: "600",
  //       }}
  //       onClick={handleClick}
  //     >
  //       C
  //     </button>
  //   );
  //   chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
  //     const currentTabId = tabs.length === 0 ? 0 : tabs[0].id!;
  //     chrome.tabs.sendMessage(currentTabId, {
  //       type: "jsx_element",
  //       element: ReactDOMServer.renderToString(EmbedButton),
  //     });
  //   });
  // }, [active]);

  const postMethod = () => {
    const d = {
      message: text,
    };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(d),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        dispatch(
          addChat({
            username: "You",
            usermsg: text,
            botname: "ChatGPT",
            botmessage: data.message,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h4>KlimbB Extension</h4>
      <p>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              style={{ borderBottom: "1px solid #727272", padding: "4px 10px" }}
            >
              {chat.username}: {chat.usermsg} <br />
              {chat.botname}: {chat.botmessage}
            </div>
          ))
        ) : (
          <p>Start asking...</p>
        )}
      </p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your message here"
      />
      <button onClick={postMethod}>Send</button>
    </div>
  );
};

export default Popup;

const element = document.getElementById("popup") as HTMLDivElement;
const root = ReactDOM.createRoot(element);
root.render(
  <Provider store={store}>
    <Popup />
  </Provider>
);
