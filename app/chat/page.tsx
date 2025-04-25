"use client";
import Messenger from "@/components/message";
export default function Chat() {
  return (
    <div className=" h-screen relative">
      <div className="absolute bottom-0 w-full">
        <Messenger />
      </div>
    </div>
  );
}
