import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "minimum 3 char" }),
  name: z.string().min(3).max(30),
//   accountId: z.string(),
});

export const CommentValidation = z.object({
  threadComment: z.string().nonempty().min(3, { message: "minimum 3 char" }),
});
