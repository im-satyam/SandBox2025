import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageSquareText, ArrowDown, SendHorizonal } from 'lucide-react';

const Chatbot = () => {
    const [isChatting, setIsChatting] = useState(false);
    const [messages, setMessages] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleInput = (data) => {
        const userMessage = { text: data.uInput, sender: "user" };
        const botMessage = { text: data.uInput, sender: "bot" };

        setMessages([...messages, userMessage, botMessage]);
    };

    return (
        <div className='absolute bottom-5 right-5 flex flex-col items-end'>
            {isChatting ? (
                <div className='w-96 h-124 bg-green-600 text-white right-0 rounded-4xl px-3 py-2 flex flex-col gap-1'>
                    <div className='w-full bg-green-950 rounded-4xl px-3 py-1 flex justify-between items-center'>
                        <div>HelperCop!</div>
                        <div>
                            <button className='hover:cursor-pointer text-green-400' onClick={() => setIsChatting(!isChatting)}>
                                <ArrowDown />
                            </button>
                        </div>
                    </div>
                    <div className='flex-1 bg-green-950 rounded-4xl px-3 py-1 flex flex-col w-full overflow-y-auto space-y-2'>
                        {messages.map((msg, index) => (
                            <div key={index} className={`p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500 self-end" : "bg-gray-700 self-start"}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className='w-full mt-auto'>
                        <form action="POST" onSubmit={handleSubmit(handleInput)} className="relative w-full">
                            <input
                                type="text"
                                placeholder="Enter your text"
                                {...register("uInput", { required: "Text is required" })}
                                className="border-2 border-gray-200 rounded-full px-4 py-2 w-full pr-10"
                                name="uInput"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 hover:cursor-pointer">
                                <SendHorizonal />
                            </button>
                        </form>
                    </div>
                </div>
            ) : ""}
            <div>
                <button className='hover:cursor-pointer text-green-400' onClick={() => setIsChatting(!isChatting)}>
                    <MessageSquareText />
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
