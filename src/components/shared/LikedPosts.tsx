import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import GridPostList from "./GridPostList";
import Loader from "./Loader";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser) {
    return (
      <div className="w-full h-full flex-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};
export default LikedPosts;
