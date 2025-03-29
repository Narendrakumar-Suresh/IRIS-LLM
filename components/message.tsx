"use client";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SendHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Response from "./response"; // Import the new component

interface Message {
  text: string;
  sender: "user" | "ai";
}

const markdownResponse = `
The sky appears blue to us because of a phenomenon called Rayleigh scattering, named after the British physicist Lord Rayleigh. He discovered that when sunlight enters Earth's atmosphere, it encounters tiny molecules of gases such as nitrogen and oxygen.

These gas molecules scatter the light in all directions, but they scatter shorter (blue) wavelengths more than longer (red) wavelengths. This is because blue light has a smaller wavelength and is therefore bent by the gas molecules less than red light.

As a result, when sunlight enters the atmosphere, it is scattered in every direction, with the blue light being distributed throughout the sky. Our eyes perceive this scattered blue light as the color of the sky.

In addition to Rayleigh scattering, other factors can also contribute to the appearance of the sky as blue, such as:

- **Dust and pollen particles**: These particles can scatter light and give the sky a more yellowish or brownish hue.

- Water vapor: Water molecules in the air can absorb and scatter light, which can also contribute to a bluer color.

- Clouds: The presence of clouds can scatter light and make the sky appear whiter or grayer.

However, it's worth noting that the sky does not actually appear blue all the time. During sunrise and sunset, the sky can take on hues of red, orange, and pink due to the scattering of light by atmospheric particles.
  `;

export default function Messenger() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Add ref

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
            <Response key={index} markdown={markdownResponse} />
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
          variant={"outline"}
          onClick={sendHandler}
        >
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
}
