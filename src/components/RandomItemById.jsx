import { useState, useEffect } from "react";
import supabase from "../supabase-client";

export default function RandomItemById() {
  const [ids, setIds] = useState([]); // เก็บเฉพาะ id
  const [randomItem, setRandomItem] = useState(null); // เก็บข้อมูลที่สุ่มได้
  const [loading, setLoading] = useState(false);

  // ฟังก์ชันดึง ID ทั้งหมด
  const fetchIds = async () => {
    const { data, error } = await supabase.from("flash-database").select("id");
    if (error) {
      console.error("Error fetching IDs:", error.message);
    } else {
      setIds(data.map((item) => item.id)); // เอาเฉพาะ id เก็บไว้
    }
  };

  // โหลดข้อมูลตอนเริ่มต้น
  useEffect(() => {
    fetchIds();

    // Subscribe to Realtime
    const subscription = supabase
      .channel("realtime-items") // ตั้งชื่อ channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "flash-database" },
        (payload) => {
          console.log("New item added:", payload.new);
          setIds((prevIds) => [...prevIds, payload.new.id]); // อัปเดต id ใหม่
        }
      )
      .subscribe();

    // Cleanup subscription เมื่อ Component ถูก unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // ฟังก์ชันสุ่ม ID แล้วดึงข้อมูลของ ID นั้น
  const getRandomItem = async () => {
    if (ids.length === 0) return;

    setLoading(true);
    const randomId = ids[Math.floor(Math.random() * ids.length)]; // สุ่ม ID

    const { data, error } = await supabase
      .from("flash-database")
      .select("*")
      .eq("id", randomId)
      .single();

    if (error) {
      console.error("Error fetching item:", error.message);
    } else {
      setRandomItem(data); // อัพเดตข้อมูลที่สุ่มได้
    }

    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-2">
        สุ่มข้อมูลโดยใช้ ID (เรียลไทม์)
      </h2>
      <button
        onClick={getRandomItem}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
      >
        {loading ? "กำลังสุ่ม..." : "สุ่มข้อมูล"}
      </button>
      {randomItem && (
        <div className="p-3 border rounded bg-gray-100">
          <h3 className="font-bold">{randomItem.question}</h3>
          <p>{randomItem.answer}</p>
          <p className="text-sm text-gray-600">ID: {randomItem.id}</p>
        </div>
      )}
    </div>
  );
}
