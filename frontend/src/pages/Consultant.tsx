import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Consultant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Como posso ajudar?",
      sender: "consultant",
      time: "8:00 PM",
    },
    {
      id: 2,
      text: "Quero entender meus atuais impostos!",
      sender: "user",
      time: "8:00 PM",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          sender: "user",
          time: "8:01 PM",
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header pageTitle="Consultor" />
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-6 flex items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Logan Roy" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-xl font-medium">Logan Roy</h2>
            <p className="text-gray-500">CFA e CPF</p>
          </div>
          <div className="ml-auto flex gap-4">
            <Button variant="outline" className="text-[#00E5DC] border-[#00E5DC] rounded-full w-10 h-10 p-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </Button>
            <Button variant="outline" className="text-[#00E5DC] border-[#00E5DC] rounded-full w-10 h-10 p-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l5 5-5 5"></path><path d="M4 4v7a4 4 0 0 0 4 4h11"></path></svg>
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "consultant" && (
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?img=3"
                    alt="Consultant"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-w1-teal text-white rounded-br-none"
                    : "bg-white border rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`text-xs mt-1 text-right ${
                    msg.sender === "user" ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
              {msg.sender === "user" && (
                <Avatar className="h-10 w-10 ml-3">
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Digite a mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-[#00E5DC] hover:bg-[#00E5DC]/80">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Consultant;
