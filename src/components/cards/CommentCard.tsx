import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";
import { Link } from "react-router-dom";
import CommentForm from "../forms/CommentForm";
import { Input } from "../ui/input";
import { usePostContext } from "@/context/PostContext";

type CommentCardProps = {
  userId: string;
  postId: string;
  comment: string;
};

export default function CommentCard({
  userId,
  postId,
  comment,
}: CommentCardProps) {
  const { data: userDetails } = useGetUserById(userId);

  const { setIsReplying, setCommentId } = usePostContext();

  console.log(userDetails);

  return (
    <article className={`flex flex-col w-full rounded-xl bg-dark-2`}>
      <div className="flex justify-between items-start">
        <div className="w-full flex flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link to={`/profile/${userId}`} className="relative w-11 h-11">
              <img
                src={userDetails?.imageUrl}
                alt="user_community_image"
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>

          <div className="w-full flex flex-col">
            <Link to={`/profile/${userId}`} className="w-fit">
              <h4 className="text-base-semibold text-light-1">
                {userDetails?.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{comment}</p>

            <div className="flex flex-col mt-5 gap-3">
              <div className="flex gap-3.5">
                <img
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
                <Link to={`/posts/${postId}`}>
                  <img
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="object-comtain cursor-pointer"
                    onClick={() => {
                      setIsReplying && setIsReplying(true);
                      setCommentId && setCommentId(userDetails?.username);
                    }}
                  />
                </Link>
                <img
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
                <img
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
              </div>

              {/* {isComment && comments.length > 0 && (
                <Link to={`/posts/${postId}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
