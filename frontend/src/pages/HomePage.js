import React from "react";
import HomePageHeader from "../homepage-comp/HomePageHeader"
import { HomePageBody } from "../homepage-comp/HomePageBody";
import "./styles/HomePage.css"

export function HomePage(){
  const decks = [
    { id: 1, title: "Java Basics", description: "Flashcards for Java concepts" },
    { id: 2, title: "React Essentials", description: "React components and hooks" }];

  const handleCreateDeck = () => {
    console.log("Create Deck button clicked!");
  };

  return (
    <div>
      <HomePageHeader />
      <HomePageBody decks={decks} onCreateDeck={handleCreateDeck} />
    </div>
  );
}