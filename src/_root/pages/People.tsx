import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const People = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError } = useGetUsers();

  if (isError) {
    toast({
      title: "Something went wrong",
    });
    return;
  }

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => console.log(json));

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="w-full text-left h3-bold md:h2-bold">All Users</h2>
        {isLoading || !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li className="w-full min-w-[200px] flex-1" key={creator.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default People;
