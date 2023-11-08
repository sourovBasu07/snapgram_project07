import {
  useFollowUser,
  useGetCurrentUser,
  useUnfollowUser,
} from "@/lib/react-query/queriesAndMutations";
import { Button } from "../ui/button";

type FollowButtonProps = {
  profileId: string;
  userId: string;
};

const FollowButton = ({ profileId, userId }: FollowButtonProps) => {
  const { mutateAsync: followUser } = useFollowUser();

  const { mutate: unfollowUser } = useUnfollowUser();

  const { data: currentUser } = useGetCurrentUser();

  const isFollowed = currentUser?.followings.find(
    (followed: any) => followed.followingId.$id === profileId
  );

  const handleFollow = async () => {
    if (isFollowed) {
      unfollowUser(isFollowed.$id);
      return;
    }
    await followUser({ userId: userId, followingId: profileId });
  };
  return (
    <Button
      type="button"
      className="shad-button_primary px-8"
      onClick={handleFollow}
    >
      {isFollowed ? "Following" : "Follow"}
    </Button>
  );
};
export default FollowButton;
