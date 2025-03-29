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
**Astute RAG: A Novel Method to Combine Internal and External Knowledge for More Reliable Retrieval Augmentation**

**Abstract**
Retrieval Augmentation Gaps (RAG) is a crucial step in Natural Language Processing (NLP) tasks that can compromise the quality of retrieved passages. This study proposes Astute RAG, a novel method designed to improve reliability while preserving the grounding effect when retrieval augmentation is successful. Astute RAG aims to leverage external knowledge to enhance LLMs through RAG, we need an effective approach to differentiate between internal and external knowledge, utilizing each only when trustworthy, ensuring proper integration. Our proposed method addresses this challenge by eliciting information from LLMs’ intrinsic knowledge and then consolidating it with external information retrieved during augmentation.

**Introduction**
The retrieval augmentation gap (RAG) is a common issue in NLP tasks like Question Answering (QAs we obtain passages through various sources, our knowledge, research has explored the use of external knowledge to augment RAG, but LLMs’ inherent abilities and reliability. We investigate whether Astute RAG effectively addresses issues plaguing previous approaches by addressing these questions.

**Main Body**

### Methodology

*   **Initial Elicitation**: we initially elicit information from LLMs’ internal knowledge using pre-trained weights.
*    **Knowledge Consolidation**: Then, we consolidate the obtained information with external sources
*   **Comparison**: Astute RAG selects appropriate answer for each group of consistent and conflicting or irrelevant passages, respectively. We conduct comparisons between answers to determine final correct answers.

### Experimental Design

We conducted experiments using Gemini and Claude3on three datasets (Section 4). These datasets comprise texts from Wikipedia articles, the latter being a common task in large language model training data on which we collected our dataset for both passage groups of LLMs. We also collected external knowledge databases related to these datasets. We then evaluate Astute RAG performance using evaluation metrics and reported in Section 3.
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
