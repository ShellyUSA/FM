import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { notification } from 'antd';

export default function MonitorDB() {
  const [response, setResponse] = useState("");
  const ENDPOINT = "http://localhost:5050"
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("dbchange", data => {
      setResponse(data);
      notification.open({
        message: 'Database Change',
        description: 'A change in the database has been detected',
      });
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();

  }, []);

  return (
    <div>
      {response}
    </div>
  );

}

