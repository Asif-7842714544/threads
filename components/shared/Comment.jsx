"use client";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Image from "next/image";
import { db } from "../firebaseConfig";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import profile from "@/public/assets/profile.svg";

function Comment({ threadId, currentuserImg }) {
  const [comment, setcomment] = useState("");
  const { data: session } = useSession();

  const sendComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "Threads", threadId, "comments"), {
      comment: comment,
      profileimage: session?.user?.image,
      userName: session?.user?.name,
      timestamp: serverTimestamp(),
    });

    setcomment("");
  };

  return (
    <div className=" mt-5 border p-5 border-gray-500 flex items-center justify-start gap-3">
      <div className="relative h-11 w-11">
        <Image
          src={currentuserImg ? currentuserImg : profile}
          alt=""
          fill
          className="rounded-full"
        />
      </div>

      <div className="relative bg-transparent w-full min-w-[180px]">
        <textarea
          value={comment}
          onChange={(e) => {
            setcomment(e.target.value);
          }}
          style={{ "backgroundColor": "black" }}
          className="peer text-white mt-5 mb-2 h-full min-h-[100px] w-full resize-none rounded-[7px]
           bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  transition-all  
            outline-none focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          placeholder="Write your comment here..."
        ></textarea>
      </div>
      <button
        onClick={sendComment}
        disabled={!comment}
        type="button"
        className="comment-form_btn disabled:cursor-not-allowed"
      >
        reply
      </button>
    </div>
  );
}

export default Comment;
