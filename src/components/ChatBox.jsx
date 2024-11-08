import React, { useState, useEffect } from 'react';
import ChatBubble from "./ChatBubble";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! Welcome to LSEG. I’m here to help you.",
      options: [],
    },
    {
      type: "bot",
      text: "Please select a Stock Exchange.",
      options: [
        "London Stock Exchange",
        "New York Stock Exchange",
        "NASDAQ Stock Exchange",
      ],
      disabled: false,
    },
  ]);
  const [stockData, setStockData] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState(null);

  useEffect(() => {
    fetch("/StockData.json")
      .then((response) => response.json())
      .then((data) => {
        setStockData(data);
        console.log("Loaded stock data:", data); 
      })
      .catch((error) => console.error("Error loading stock data:", error));
  }, []);

  const handleOptionSelection = (option) => {
    console.log("User selected option:", option);

    const userMessage = { type: "user", text: option };
    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.map((msg, index) =>
        index === prevMessages.length - 1 && msg.type === "bot"
          ? { ...msg, disabled: true }
          : msg
      );
      return [...updatedMessages, userMessage];
    });

    if (!selectedExchange) {
      const exchange = stockData.find((item) => item.stockExchange === option);
      console.log("Found exchange:", exchange); // Debug log for selected exchange

      if (exchange) {
        setSelectedExchange(exchange); // Set the selected exchange here
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Please select a stock.",
            options: exchange.topStocks.map((stock) => stock.stockName),
            disabled: false,
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Invalid selection. Please select a valid stock exchange.",
            options: [
              "London Stock Exchange",
              "New York Stock Exchange",
              "NASDAQ Stock Exchange",
            ],
            disabled: false,
          },
        ]);
      }
    } else {
      const stock = selectedExchange.topStocks.find(
        (stock) => stock.stockName === option
      );
      console.log("Selected stock:", stock); 

      if (stock) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: `Stock Price of ${stock.stockName} is $${stock.price}. Please select an option.`,
            options: ["Main menu", "Go Back"],
            disabled: false,
          },
        ]);
      } else if (option === "Main menu") {
        setSelectedExchange(null);
        setMessages([
          {
            type: "bot",
            text: "Hello! Welcome to LSEG. I’m here to help you.",
            options: [],
          },
          {
            type: "bot",
            text: "Please select a Stock Exchange.",
            options: [
              "London Stock Exchange",
              "New York Stock Exchange",
              "NASDAQ Stock Exchange",
            ],
            disabled: false,
          },
        ]);
      } else if (option === "Go Back") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Please select a stock.",
            options: selectedExchange.topStocks.map((stock) => stock.stockName),
            disabled: false,
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Invalid selection. Please select a valid stock.",
            options: selectedExchange.topStocks.map((stock) => stock.stockName),
            disabled: false,
          },
        ]);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg}
            onSelectOption={handleOptionSelection}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatBox;
