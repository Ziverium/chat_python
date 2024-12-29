"use client"; // Mark this as a client-side component

import Link from "next/link";
import "./pages.css"; // Add this line to import the CSS file

export default function Home() {
  return (
    <div className="container">
      <h1 className="heading">Let's Meet Your Chat Assistant</h1>
      <Link href="/chat">
        <button className="button">Let's Go</button>
      </Link>
    </div>
  );
}
