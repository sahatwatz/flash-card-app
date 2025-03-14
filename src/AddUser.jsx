import React, { useState } from "react";
import supabase from "./supabase-client";
import { HiDocumentAdd } from "react-icons/hi";

export default function AddUser() {
  const [category, setCategory] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Frontend", "Backend", "Fullstack"];

  const addUser = async () => {
    if (!category.trim() || !question.trim() || !answer.trim()) {
      alert("Please fill out the application form before submitting it");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase

      .from("flash-database") // ชื่อ Table
      .insert([{ category, question, answer }]); // ข้อมูลที่ต้องการเพิ่ม

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("User added:", data);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-4 text-tahiti rounded-lg shadow-md gap-4 max-w-sm mx-auto flex flex-col justify-center items-center">
      <HiDocumentAdd className="h-24 w-24 mt-[10%]" />
      <h2 className="text-4xl font-bold mb-2 font-caveat-regular">
        Add Flashcard
      </h2>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 mb-2 w-full bg-midnight"
      >
        <option value="">-- Select Categories --</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="question"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="answer"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <button
        onClick={addUser}
        disabled={loading}
        className="bg-tahiti text-midnight font-chicle-regular text-2xl tracking-wider px-4 py-2 rounded w-full"
      >
        {loading ? "Adding..." : "Add Card"}
      </button>
    </div>
  );
}
