import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "react-toastify";

const Comments = ({ id }: { id: string }) => {
  interface Comment {
    name: string;
    assignedTo: string;
    comment: "";
    createdAt: string;
  }
  const [comment, setComment] = useState({
    name: "",
    assignedTo: id,
    comment: "",
  });
  console.log(id);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("name", comment.name);
    formData.append("assignedTo", comment.assignedTo);
    formData.append("comment", comment.comment);

    const response = await axios.post("/api/comment", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchComments();
    } else {
      toast.error("Comment not added");
    }
    setLoading(false);
    setComment(prev => ({
      ...prev,
      name:"",
      comment:""
    }))
  };
  console.log(comment);

  const fetchComments = async () => {
    const response = await axios.get("/api/comment", {
      params: {
        id: id,
      },
    });
    setComments(response.data.comments);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div>
      <p className="font-medium text-lg mb-3 mt-5">Comments</p>
      <div>
        <form
          className="sm:flex gap-4 sm:space-y-0 space-y-3  "
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleChange}
            className="border-1 outline-0 w-full  rounded-md py-2 px-4 border-gray-500 "
            type="text"
            placeholder="Enter Your Name"
            name="name"
            value={comment.name}
            required
          />
          <input
            onChange={handleChange}
            className="border-1 outline-0 w-full rounded-md py-2 px-4 border-gray-500"
            type="text"
            placeholder="Comment Here"
            name="comment"
            value={comment.comment}
            required
          />
          <button className="bg-black cursor-pointer rounded-md text-white  px-5 py-2">
            {loading ? "Commenting..." : " Comment"}
          </button>
        </form>
      </div>

      <div className="border-1 space-y-5 bg-slate-100 border-gray-700 mt-4 p-5 rounded-lg">
        {comments.map((comment, i) => (
          <Comment
            key={i}
            name={comment.name}
            comment={comment.comment}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
