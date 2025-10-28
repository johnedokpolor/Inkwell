import React from "react";

const Comment = ({
  name,
  comment,
  createdAt,
}: {
  name: string;
  comment: string;
  createdAt: string;
}) => {
  const date = new Date(createdAt).toDateString();

  return (
    <div className="w-full bg-white shadow-md  p-5 relative border-1 border-gray-700 rounded-lg">
      <div className="flex gap-2 items-center">
        <p className="font-medium text-lg">{name}</p>
        <p className=" text-slate-500 text-sm">{date}</p>
      </div>

      <p> {comment}</p>
    </div>
  );
};

export default Comment;
