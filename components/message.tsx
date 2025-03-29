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
  # Welcome!
  **The Blue Sky: A Marvel of Atmospheric Science**

Have you ever stood outside on a clear day, gazing up at the brilliant blue sky above? It's easy to assume that the color of
the sky is simply a result of our eyes playing tricks on us. However, it's actually a fascinating phenomenon that involves a
combination of atmospheric science and physics.

The sky appears blue because of a process called Rayleigh scattering, named after the British physicist Lord Rayleigh who first
described it in the late 19th century. When sunlight enters Earth's atmosphere, it encounters tiny molecules of gases such as
nitrogen (N2) and oxygen (O2). These molecules scatter the shorter, blue wavelengths of light more than the longer, red
wavelengths.

As a result, the blue light is dispersed throughout the atmosphere, giving the sky its characteristic blue color. This
phenomenon is more pronounced during the daytime when the sun is overhead, and it's less noticeable at night when the Earth is
tilted away from the sun.

But why does this specific color of blue dominate? There are a few factors that contribute to this:

1. **Atmospheric conditions**: The amount of dust, water vapor, and pollutants in the atmosphere can affect the way light
scatters. For example, areas with high levels of pollution tend to have more brownish hues due to the presence of particulate
matter.
2. **Angle of the sun**: When sunlight passes through the atmosphere at an angle, it's scattered in all directions, including
towards our eyes. This is known as diffuse scattering.
3. **Clouds and aerosols**: Clouds and aerosols can reflect or scatter light in different ways, adding to the blue color of the
sky.

In summary, the blue sky we see on a sunny day is a result of Rayleigh scattering, which occurs when sunlight interacts with
tiny molecules in the atmosphere. The specific combination of atmospheric conditions, angle of the sun, and presence of clouds
and aerosols all contribute to the characteristic blue hue of our skies.
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
    setMessages([...messages, { text: value, sender: "ai" }]);
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

      <div className="flex justify-center items-center p-4">
        <Textarea
          placeholder="Enter your query"
          className="w-[900px] h-24 mx-4 rounded-2xl text-black bg-white"
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
