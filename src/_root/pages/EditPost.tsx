import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  // const queryClient = useQueryClient();
  // const queryCache = queryClient.getQueryCache();
  // const query = queryCache.find({ queryKey: [QUERY_KEYS.GET_POST_BY_ID] });

  // console.log(query);

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="w-full max-w-5xl flex-start justify-start gap-3">
          <img
            src="/assets/icons/edit.svg"
            alt="edit post"
            width={36}
            height={36}
            className="invert-white"
          />
          <h2 className="w-full h3-bold md:h2-bold text-left">Edit Post</h2>
        </div>

        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};
export default EditPost;
