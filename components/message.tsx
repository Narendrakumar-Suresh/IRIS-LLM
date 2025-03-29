"use client";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { Metadata } from "next";
import Response from "./response"; // Import the new component

interface Message {
  text: string;
  sender: "user" | "ai";
}

export default function Messenger() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendHandler = () => {
    if (!value.trim()) {
      alert("Enter something");
      return;
    }
    // Add user message
    setMessages([...messages, { text: value, sender: "user" }]);
    // TODO: Add AI response here
    setValue("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message, index) =>
          message.sender === "user" ? (
            <div key={index} className="flex justify-end">
              <Alert
                variant={"default"}
                className="max-w-80 p-2 m-8 rounded-2xl bg-blue-200"
              >
                <AlertTitle className="text-xs text-slate-600">You</AlertTitle>
                <AlertDescription className="text-xl text-black">
                  {message.text}
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <Response key={index} /> // Render AIMessage for AI
          )
        )}
      </div>
      {/* Message sender */}
      <div className="flex justify-center items-center p-4">
        <Textarea
          placeholder="Enter your query"
          className="w-[900px] h-14 mx-4 rounded-2xl text-white"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="submit"
          className="h-12 w-12 rounded-full"
          variant={"outline"}
          onClick={sendHandler}
        >
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
}
