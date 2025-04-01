"use client";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SendHorizontal, Loader } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Response from "./response";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Message {
  text: string;
  sender: "user" | "ai";
}

export default function Messenger() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false); // Track AlertDialog state
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendHandler = async () => {
    if (!value.trim()) {
      alert("Enter something");
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: value, sender: "user" },
    ]);

    setValue("");
    setLoading(true);
    setAlertOpen(true); // Show alert when request starts

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/prepare-paper",
        { query: value },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.response, sender: "ai" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      alert("Failed to get a response from the server.");
    } finally {
      setLoading(false);
      setAlertOpen(false); // Hide alert once loading is done
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen mb-2">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message, index) =>
          message.sender === "user" ? (
            <div key={index} className="flex justify-end">
              <Alert
                variant="default"
                className="max-w-80 p-2 m-8 rounded-2xl bg-blue-200"
              >
                <AlertTitle className="text-xs text-slate-600">You</AlertTitle>
                <AlertDescription className="text-xl text-black">
                  {message.text}
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <Response key={index} markdown={message.text} />
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex justify-center items-center p-4 bg-transparent">
        <Textarea
          placeholder="Enter your query"
          className="w-[900px] lg:h-12 sm:h-12 mx-4 rounded-2xl text-black"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="submit"
          className="h-12 w-12 rounded-full"
          variant="outline"
          onClick={sendHandler}
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" /> : <SendHorizontal />}
        </Button>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Be Ready!!!</AlertDialogTitle>
            <AlertDialogDescription>
              Your work is getting ready!
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
