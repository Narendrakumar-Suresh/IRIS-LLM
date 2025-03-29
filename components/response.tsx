"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Copy, Download } from "lucide-react";

export default function Response({ markdown }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    // Load Marked.js dynamically if not already available
    if (!window.marked) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
      script.async = true;
      script.onload = () => {
        setHtml(window.marked.parse(markdown));
      };
      document.body.appendChild(script);
    } else {
      setHtml(window.marked.parse(markdown));
    }
  }, [markdown]);

  return (
    <div className="border-2 rounded-2xl p-2 mb-8">
      <div
        className="w-full text-black prose p-2 "
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="flex m-2 w-24 justify-around">
        <Button
          onClick={() => {
            alert("Copy");
          }}
        >
          <Copy />
        </Button>
        <Button
          onClick={() => {
            alert("Download");
          }}
        >
          <Download />
        </Button>
      </div>
    </div>
  );
}
