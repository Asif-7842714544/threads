"use client";
import { db } from "@/components/firebaseConfig";
import Comment from "@/components/shared/Comment";
import ThreadCard from "@/components/shared/ThreadCard";
import {
  getDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ReactTimeago from "react-timeago";

const Page = ({ params }) => {
  const [threaddata, setthreaddata] = useState([]);
  const [comments, setcomments] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "Threads", params.id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setcomments(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    const getdataBYId = async () => {
      const docRef = doc(db, "Threads", params.id);
      const snapshot = await getDoc(docRef);
      setthreaddata(snapshot.data());
    };
    getdataBYId();
  }, [params.id]);

  return (
    <section className="relative">
      <div className="">
        <ThreadCard
          id={params.id}
          username={threaddata.userName}
          userimg={threaddata.profileimage}
          thread={threaddata.thread}
          timestamp={threaddata.timestamp}
          comment={threaddata.comment}
        />
      </div>
      <div className="mt-7">
        <Comment threadId={params.id} currentuserImg={session?.user?.image} />
      </div>

      {/* comments */}
      <div className="mt-10 gap-3 space-y-3">
        {comments.length > 0 &&
          comments.map((comment) => (
            <div
              className="flex mt-2 w-full flex-col rounded-xl bg-dark-2 p-7 "
              key={comment.id}
            >
              <div className="flex justify-center items-start">
                {/* image */}
                <div className="relative h-11 w-11">
                  <Image
                    src={comment.data().profileimage}
                    alt="profile image"
                    fill
                    className="rounded-full"
                  />
                </div>
                <div className=" w-fit">
                  <h1 className="text-base text-light-2 ">
                    {comment.data().userName}
                  </h1>
                </div>
                <div className="thread-card_bar" />
                {/* <p className="text-white ">{comment.data().userName}</p> */}
              </div>
              <h1 className="text-heading4-medium text-white text-purple-500 px-8">
                {comment.data().comment}
              </h1>
              <ReactTimeago
                className="text-subtle-medium text-white"
                date={comment.data().timestamp?.toDate()}
                locale="en-US"
              />
            </div>
          ))}
      </div>
    </section>
  );
};
export default Page;
