"use client";
import React, { useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";
import ThreadCard from "@/components/shared/ThreadCard";

function Threads() {
  const [thread, setthreads] = useState([]);
  
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "Threads"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setthreads(snapshot.docs);
      }
    );
  }, [db]);



  return (
    <div className="gap-2 space-y-2">
      {thread.map((item) => (
        <ThreadCard
          key={item.id}
          id={item.id}
          username={item.data().userName}
          userimg={item.data().profileimage}
          thread={item.data().thread}
          timestamp={item.data().timestamp}
          comment={item.data().comment}
        />
      ))}
    </div>
  );
}

export default Threads;
