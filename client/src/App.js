import './App.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';

const socket= io.connect("http://localhost:3001");

function App() {
  //Room States
  const [room, setroom] = useState("");

 //Message States
  const [message, setmessage] = useState("");
  const [messageReceived, setmessageReceived] = useState("");

  const joinRoom = () =>{
    if(room!==""){
      socket.emit("join_room", room);
    }
  };

  const sendMessage= () =>{
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) =>{
      setmessageReceived(data.message)
    })
  }, [socket]);

  return (
    <div className="App">
      <input 
      placeholder="Room Number..."
      onChange = { (event) =>{
        setroom(event.target.value);
      }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input 
        placeholder="Message..." 
        onChange= {(event) =>{
        setmessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
