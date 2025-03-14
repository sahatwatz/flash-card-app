import React, { useState } from "react";
import supabase from "./supabase-client";

export default function AddUser() {
  const [category, setCategory] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const addUser = async () => {
    if (!category.trim() || !question.trim() || !answer.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
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
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-sm mx-auto bg-amber-100">
      <h2 className="text-xl font-bold mb-2">เพิ่มผู้ใช้ใหม่</h2>
      <input
        type="text"
        placeholder="ประเภท"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="question"
        placeholder="คำถาม"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="answer"
        placeholder="คำตอบ"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <button
        onClick={addUser}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "กำลังเพิ่ม..." : "เพิ่มข้อมูล"}
      </button>
    </div>
  );
}
