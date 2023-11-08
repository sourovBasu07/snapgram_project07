import React, {
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// type IContextPost = {};

export const INITIAL_POST = {};

const INITIAL_STATE = {
  // post: INITIAL_POST,
  isReplying: false,
  setIsReplying: () => {},
  commentId: "",
  setCommentId: () => {},
  commentValue: "",
  setCommentValue: () => {},
};

type IContextType = {
  isReplying: boolean;
  setIsReplying: React.Dispatch<SetStateAction<boolean>>;
  commentId: string;
  setCommentId: React.Dispatch<SetStateAction<string>>;
  commentValue: string;
  setCommentValue: React.Dispatch<SetStateAction<string>>;
};

const PostContext = createContext<IContextType>(INITIAL_STATE);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>("");
  const [commentValue, setCommentValue] = useState<string>("");

  const value = {
    isReplying,
    setIsReplying,
    commentId,
    setCommentId,
    commentValue,
    setCommentValue,
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);
