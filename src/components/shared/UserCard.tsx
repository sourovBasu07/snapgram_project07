import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import FollowButton from "./FollowButton";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const { user: loggedUser } = useUserContext();

  if (user.$id === loggedUser.id) return null;

  return (
    <div className="user-card">
      <Link to={`/profile/${user.$id}`}>
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="w-14 h-14 rounded-full"
        />

        <div className="flex-center flex-col gap-1">
          <p className="base-medium text-center text-light-1 line-clamp-1">
            {user.name}
          </p>
          <p className="small-regular text-center text-light-3 line-clamp-1">
            @{user.username}
          </p>
        </div>
      </Link>

      <FollowButton userId={loggedUser.id} profileId={user.$id} />
    </div>
  );
};
export default UserCard;
