import { useState, useEffect } from "react";
import supabase from "../supabase-client";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { HiLightningBolt } from "react-icons/hi";
import Notice from "./Notice";

export default function RandomItemById() {
  const [ids, setIds] = useState([]); // เก็บเฉพาะ id
  const [randomItem, setRandomItem] = useState(null); // เก็บข้อมูลที่สุ่มได้
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // ควบคุมการ Flip

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
    <div className="p-4 flex flex-col justify-center items-center rounded-lg gap-4 max-w-sm mx-auto">
      <HiLightningBolt className="h-32 w-32 mt-[10%] mb-4 text-yellow-200" />
      <button
        onClick={getRandomItem}
        disabled={loading}
        className="bg-tahiti cursor-pointer tracking-wider font-chicle-regular text-2xl text-midnight px-6 py-2 rounded-full w-auto mb-2"
      >
        {loading ? "Randomizing..." : "Random Flashcard !"}
      </button>
      <Notice />
      {randomItem && (
        <motion.div
          className="relative w-64 h-84 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ด้านหน้า - คำถาม */}
          <div
            className="absolute w-full h-full flex gap-4 flex-col items-center justify-center bg-midnight shadow-2xl rounded-lg"
            style={{
              backfaceVisibility: "hidden",
              position: "absolute"
            }}
          >
            <h2 className="text-tahiti font-caveat-regular text-2xl opacity-50 flex-grow mt-4">
              {randomItem.category} Question
            </h2>
            <p className="text-lg font-bold leading-relaxed text-center p-4 text-tahiti font-nunito-light flex-grow-[2] mt-2">
              {randomItem.question}
            </p>
          </div>

          {/* ด้านหลัง - คำตอบ */}
          <div
            className="absolute w-full h-full flex flex-col overflow-hidden gap-4 items-center justify-center bg-gray-400 shadow-2xl rounded-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute"
            }}
          >
            <h2 className="text-soulblue font-caveat-regular text-2xl opacity-50 flex-grow mt-4">
              Answer
            </h2>
            <p className="text-lg leading-relaxed font-bold text-center p-4 text-soulblue font-nunito-light flex-grow-[2] mt-2">
              {randomItem.answer}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
