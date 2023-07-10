import React from "react";
import ReactDOM from "react-dom/client";
import { RootState, persistor, store } from "./store/store";
import { addChat, clearAllChats } from "./store/chatSlice";
import { Provider, useSelector, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { styled } from "styled-components";

const StyledDiv = styled.div`
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Clear = styled.span`
  text-decoration: underline;
  color: #727272;
  text-decoration-color: #a3c2e4;
  cursor: pointer;
`;

const Text = styled(Clear)`
  text-decoration: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #a3c2e4;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const UserBox = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #a3c2e4;
  padding: 6px;
  & .material-icons-round {
    font-size: 16px;
    margin-right: 8px;
  }
`;

const BotBox = styled(UserBox)`
  background-color: transparent;
`;

const StyledInput = styled.input`
  padding: 8px 10px;
  border: 1px solid #a3c2e4;
  outline: none;
  border-radius: 6px 0px 0px 6px;
  width: 100%;
`;

const StyledButton = styled.button`
  padding: 8px 10px;
  color: #fff;
  background-color: #a3c2e4;
  border: 1px solid #a3c2e4;
  outline: none;
  border-radius: 0px 6px 6px 0px;
  cursor: pointer;
`;

const AlwaysScollToBottom = () => {
  const elementRef = React.useRef<any>();
  React.useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};
interface IProps {}

const Popup: React.FC<IProps> = () => {
  const [text, setText] = React.useState("");

  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chats);

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
    setText("");
  };

  const ClearChats = () => {
    dispatch(clearAllChats());
  };

  return (
    <StyledDiv>
      <div style={{ textAlign: "center", padding: 10 }}>
        <h4 style={{ margin: 0, marginBottom: 8 }}>KlimbB Extension</h4>
        {chats.length > 0 ? (
          <Clear onClick={ClearChats}>Reset Chat</Clear>
        ) : (
          <Text>Let's get started!</Text>
        )}
      </div>
      <div style={{ height: 300, overflow: "auto" }}>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatBox key={chat.id}>
              <UserBox>
                <span className="material-icons-round">person</span>
                <span>{chat.usermsg}</span>
              </UserBox>
              <BotBox>
                <span className="material-icons-round">tips_and_updates</span>
                <span>{chat.botmessage}</span>
              </BotBox>
            </ChatBox>
          ))
        ) : (
          <></>
        )}
        <AlwaysScollToBottom />
      </div>
      <Container>
        <StyledInput
          type="text"
          value={text}
          onChange={(event: {
            target: { value: React.SetStateAction<string> };
          }) => setText(event.target.value)}
          placeholder="Type something..."
        />
        <StyledButton onClick={postMethod} disabled={text.length <= 0}>
          Send
        </StyledButton>
      </Container>
    </StyledDiv>
  );
};

export default Popup;

const element = document.getElementById("popup") as HTMLDivElement;
const root = ReactDOM.createRoot(element);
root.render(
  <Provider store={store}>
    <PersistGate loading={<span>Loading...</span>} persistor={persistor}>
      <Popup />
    </PersistGate>
  </Provider>
);
