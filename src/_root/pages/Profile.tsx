import GridPostList from "@/components/shared/GridPostList";
import LikedPosts from "@/components/shared/LikedPosts";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

type StatBlockProps = {
  value: string | number;
  label: string;
};

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { user: loggedInUser } = useUserContext();

  const { data: currentProfile } = useGetUserById(id || "");

  if (!currentProfile) {
    return (
      <div className="w-full h-full flex-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex flex-col xl:flex-row max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentProfile.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 lg:w-36 h-28 lg:h-36 rounded-full"
          />

          <div className="flex flex-col justify-between flex-1 md:mt-2">
            <div className="w-full flex flex-col">
              <h1 className="w-full text-center xl:text-left h3-bold md:h1-semibold">
                {currentProfile.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentProfile.username}
              </p>
            </div>

            <div className="flex justify-center xl:justify-start items-center flex-wrap gap-8 mt-10 z-20">
              <StatBlock value={currentProfile.posts.length} label="Posts" />
              <StatBlock value={50} label="Followers" />
              <StatBlock value={25} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left max-w-screen-sm mt-7">
              {currentProfile.bio || "Bio"}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div
              className={`${
                loggedInUser.id !== currentProfile.$id && "hidden"
              }`}
            >
              <Link
                to={`/update-profile/${loggedInUser.id}`}
                className={`h-12 flex-center bg-dark-4 gap-2 rounded-lg px-5 text-light-1 ${
                  loggedInUser.id !== currentProfile.$id && "hidden"
                }`}
              >
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex small-medium whitespace-nowrap">
                  Edit Profile
                </p>
              </Link>
            </div>

            <div className={`${loggedInUser.id === id && "hidden"}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentProfile.$id === loggedInUser.id && (
        <div className="flex w-full max-w-5xl">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
          >
            <img
              src="/assets/icons/posts.svg"
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}
          >
            <img
              src="/assets/icons/like.svg"
              alt="liked posts"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={
            <GridPostList posts={currentProfile.posts} showUser={false} />
          }
        />

        {currentProfile.$id === loggedInUser.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>

      <Outlet />
    </div>
  );
};
export default Profile;
