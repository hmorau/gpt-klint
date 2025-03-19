export interface Conversation {
    id: string;
    subject: string;
    messages?: Message[];
  }
  export interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
  }