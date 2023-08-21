import PostThread from "@/components/shared/PostThread";

async function page() {
  return (
    <div>
      <h4 className="text-red-500 text-heading2-bold ">Create Thread</h4>
      <PostThread />
    </div>
  );
}

export default page;
