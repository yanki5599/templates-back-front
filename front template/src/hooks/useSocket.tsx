import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketOptions {
  url: string;
  options?: Record<string, any>;
}

interface UseSocketReturn {
  isConnected: boolean;
  messages: any[];
  sendMessage: (event: string, data: any) => void;
}

const useSocket = ({ url, options = {} }: UseSocketOptions): UseSocketReturn => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const socket = io(url, options);
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to WebSocket server.");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from WebSocket server.");
    });

    socket.on("message", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup socket on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url, options]);

  const sendMessage = (event: string, data: any) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(event, data);
    }
  };

  return {
    isConnected,
    messages,
    sendMessage,
  };
};

export default useSocket;
