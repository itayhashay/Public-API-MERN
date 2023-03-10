import { useEffect } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const OnlineUsers = ({setOnlineUsers}) => {

  useEffect(() => {
    socket.on('updateUsers', (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });

    return () => {
      socket.off('updateUsers');
    };
  }, []);
};

export default OnlineUsers;
