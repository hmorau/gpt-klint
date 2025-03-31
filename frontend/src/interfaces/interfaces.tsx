export interface Conversation {
    id: string;
    title: string;
    messages?: Message[];
  }
  export interface Message {
    text: string;
    sender: "user" | "bot";
  }