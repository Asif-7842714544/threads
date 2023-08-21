"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/components/firebaseConfig";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PostThread() {
  const router = useRouter();
  const { data: session } = useSession();

  const { register, watch } = useForm({
    defaultValues: {
      thread: "",
      name: "",
    },
  });

  const formData = watch();

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!formData.thread) return;
    e.preventDefault();
    const docref = await addDoc(collection(db, "Threads"), {
      userName: session?.user?.name,
      profileimage: session?.user?.image,
      thread: formData.thread,
      timestamp: serverTimestamp(),
    });

    toast("Data updated", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    router.push("/home");
  };

  return (
    <form>
      <textarea
        {...register("thread", { required: true })}
        id="message"
        rows={10}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
         border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your threads here..."
      ></textarea>
      <button
        onClick={onSubmit}
        disabled={!formData.thread}
        type="submit"
        className="mt-2 text-white disabled:cursor-not-allowed bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 
        focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600
         dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        Submit
      </button>
    </form>
  );
}

export default PostThread;
