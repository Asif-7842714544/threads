"use client";
import Image from "next/image";
import heart from "@/public/assets/heart-gray.svg";
import reply from "@/public/assets/reply.svg";
import repost from "@/public/assets/repost.svg";
import share from "@/public/assets/share.svg";
import Link from "next/link";
import profile from "@/public/assets/profile.svg";
import deletepic from "@/public/assets/delete.svg";
import ReactTimeago from "react-timeago";
import {
 
  doc,
  deleteDoc,

} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  id: string;
  username: string;
  userimg: string;
  thread: string;
  timestamp: string;
  comment?: string;
}

function ThreadCard({ id, username, userimg, thread, timestamp }: Props) {
  // const [comments, setcomments] = useState([]);

  // console.log(comments);

  // useEffect(() => {
  //   return onSnapshot(
  //     query(
  //       collection(db, "Threads", id, "comments"),
  //       orderBy("timestamp", "desc")
  //     ),
  //     (snapshot) => setcomments(snapshot.docs)
  //   )
  // }, [db]);
  const deleteposts = async () => {
    await deleteDoc(doc(db, "Threads", id));
    
    toast("Thread Deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="relative transition-all duration-300">
      <div className="h-8 right-2 hover:scale-125 transition duration-300 cursor-pointer top-2  w-8 absolute">
        <Image
          onClick={deleteposts}
          src={deletepic}
          alt="profile image"
          fill
          className="rounded-full h-11 w-11"
        />
      </div>
      <article
        key={id}
        className="flex w-full flex-col rounded-xl bg-dark-2 p-7 "
      >
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              {/* image */}
              <div className="relative h-11 w-11 ">
                <Image
                  src={userimg ? userimg : profile}
                  alt="profile image"
                  fill
                  className="rounded-full"
                />
              </div>
              <div className="thread-card_bar" />
            </div>

            <div className=" flex w-full flex-col">
              {/* Username */}
              <div className=" w-fit">
                <h1 className="text-base-semibold text-light-2 ">{username}</h1>
              </div>
              {/* Thread */}

              <p className="mt-2 text-heading3-bold text-purple-500  ">
                {thread}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <div className="flex gap-3.5">
                  <Image
                    src={heart}
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain hover:scale-125"
                  />
                  <Link href={`/thread/${id}`}>
                    <Image
                      src={reply}
                      alt="reply"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain hover:scale-125"
                    />
                  </Link>

                  <Image
                    src={repost}
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain hover:scale-125"
                  />
                  <Image
                    src={share}
                    alt="share"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain hover:scale-125"
                  />
                </div>
                {/* {comment && comment.length > 0 && (
                <div>
                  <Link href={`/thread/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {comment.length} replies
                    </p>
                  </Link>
                </div>
              )} */}
              </div>
              <div className="right-4">
                <ReactTimeago
                  className="text-subtle-medium text-white"
                  date={timestamp?.toDate()}
                  locale="en-US"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ThreadCard;
