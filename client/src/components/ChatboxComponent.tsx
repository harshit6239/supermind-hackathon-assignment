import { Send } from "lucide-react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button";
import axios from "axios";

type MessageVariant = "sent" | "received" | null | undefined;

export default function ChatboxComponent() {
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [messages, setMessages] = useState<
        { variant: MessageVariant; content: string; loading: boolean }[]
    >([]);
    const [input, setInput] = useState("");

    const handleSubmit = async () => {
        if (input.trim() === "") {
            return;
        }

        setInput("");

        submitButtonRef.current?.setAttribute("disabled", "true");

        setMessages((prevMessages) => [
            ...prevMessages,
            { variant: "sent", content: input, loading: false },
            {
                variant: "received",
                content: "",
                loading: true,
            },
        ]);

        const resp = await axios.get(
            "https://socialmetric.onrender.com/api/chatbot",
            {
                params: {
                    query: input,
                },
            }
        );

        setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1].loading = false;
            newMessages[newMessages.length - 1].content = resp.data;
            return newMessages;
        });

        submitButtonRef.current?.removeAttribute("disabled");
    };

    return (
        <ExpandableChat
            size="md"
            position="bottom-right"
        >
            <ExpandableChatHeader className="flex-col text-center justify-center">
                <h1 className="text-xl font-semibold">Chat with our AI ✨</h1>
                <p>Ask any question for our AI to answer</p>
            </ExpandableChatHeader>
            <ExpandableChatBody>
                <ChatMessageList>
                    {messages.map((message, index) => (
                        <ChatBubble
                            key={index}
                            variant={message.variant}
                        >
                            <ChatBubbleAvatar
                                fallback={
                                    message.variant === "sent" ? "U" : "AI"
                                }
                            />
                            <ChatBubbleMessage isLoading={message.loading}>
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </ChatBubbleMessage>
                        </ChatBubble>
                    ))}
                </ChatMessageList>
            </ExpandableChatBody>
            <ExpandableChatFooter className="relative">
                <ChatInput
                    className="pr-16"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    placeholder="Type your query here..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            console.log("Enter pressed");
                            submitButtonRef.current?.click();
                        }
                    }}
                />
                <Button
                    ref={submitButtonRef}
                    type="submit"
                    size="icon"
                    className="absolute right-7 bottom-7"
                    onClick={handleSubmit}
                >
                    <Send className="size-4" />
                </Button>
            </ExpandableChatFooter>
        </ExpandableChat>
    );
}
