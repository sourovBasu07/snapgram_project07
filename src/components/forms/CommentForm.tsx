import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { CommentValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePostComment } from "@/lib/react-query/queriesAndMutations";
import { useEffect, useRef } from "react";
import { usePostContext } from "@/context/PostContext";

type CommentFormProps = {
  userId: string;
  postId: string;
  imageUrl: string;
};

const CommentForm = ({ userId, postId, imageUrl }: CommentFormProps) => {
  const { mutateAsync: postComment } = usePostComment();

  const { isReplying, commentId } = usePostContext();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      comment: commentId ? commentId : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    const postedComment = await postComment({
      userId,
      postId,
      comment: values.comment,
    });

    console.log(postedComment);
  };

  useEffect(() => {
    if (commentId) {
      form.setValue("comment", `@${commentId} `);
      inputRef.current?.focus();
    } else {
      form.setValue("comment", "");
      // inputRef.current?.focus();
    }
  }, [commentId]);

  return (
    <Form {...form}>
      <div className="flex flex-col py-5">
        {isReplying && <p className="">Replying to {commentId}</p>}
        <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full flex items-center gap-3">
                <FormLabel>
                  <img
                    src={imageUrl}
                    alt="current_user"
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    {...field}
                    ref={(el) => {
                      field.ref(el);
                      inputRef.current = el;
                    }}
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none bg-dark-4"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        </form>
      </div>
    </Form>
  );
};
export default CommentForm;
