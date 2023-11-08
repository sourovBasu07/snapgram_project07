import CommentCard from "@/components/cards/CommentCard";
import CommentForm from "@/components/forms/CommentForm";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
  useGetUserPosts,
} from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();

  if (!id) return null;

  const { data: post, isLoading: isPostLoading } = useGetPostById(id);

  console.log(post);

  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );

  const { mutate: deletePost, isPending: isDeletePending } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    console.log("Deleting");

    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  console.log(user.id);
  console.log(post?.creator.$id);

  // if (!post) {
  //   return (
  //     <div className="w-full h-full flex-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className="post_details-container">
      <div className="w-full max-w-5xl hidden md:flex">
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={() => navigate(-1)}
        >
          <img src="/assets/icons/back.svg" alt="back" width={24} height={24} />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isPostLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="image" className="post_details-img" />

          <div className="post_details-info">
            <div className="w-full flex-between">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 lg:w-12 h-8 lg:h-12 rounded-full"
                />

                <div className="flex flex-col gap-1">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div
                className={`flex-center gap-4 ${
                  user.id !== post?.creator.$id ? "hidden" : ""
                }`}
              >
                <Link
                  to={`/update-post/${post.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  variant="ghost"
                  className={`post_details-delete_btn ${
                    user.id !== post?.creator.$id && "!hidden"
                  }`}
                  onClick={handleDeletePost}
                >
                  {isDeletePending ? (
                    <Loader />
                  ) : (
                    <img
                      src="/assets/icons/delete.svg"
                      alt="delete"
                      width={24}
                      height={24}
                    />
                  )}
                </Button>
              </div>
            </div>
            <hr className="w-full border border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    className="small-regular text-light-3"
                    key={`${tag}${index}`}
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
            {post.comments.map((comment: Models.Document) => (
              <CommentCard
                key={comment.$id}
                userId={comment.userId}
                postId={post.$id}
                comment={comment.comment}
              />
            ))}

            <CommentForm
              userId={user.id}
              postId={post.$id}
              imageUrl={user.imageUrl}
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="w-full border border-dark-4/80" />
        <h3 className="w-full body-bold md:h3-bold my-10">
          More Related Posts
        </h3>
        {isUserPostLoading ? (
          <Loader />
        ) : relatedPosts && relatedPosts.length > 0 ? (
          <GridPostList posts={relatedPosts} />
        ) : (
          <p className="subtle-semibold lg:small-regular">No Related Posts</p>
        )}
      </div>
    </div>
  );
};
export default PostDetails;
