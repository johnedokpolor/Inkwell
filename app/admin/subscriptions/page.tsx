"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import SubscriberListItem from "@/Componets/AdminComponents/SubscriberListItem ";
import { toast } from "react-toastify";
import Link from "next/link";

const Page = () => {
  interface Subscriber {
    _id: string;
    email: string;
    createdAt: string;
  }
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const fetchSubscribers = async () => {
    console.log("Fetching subscribers");
    try {
      const response = await axios.get("/api/subscriber");
      setSubscribers(response.data.subscribers);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSubscribers();
  }, []);

  const deleteSubscriber = async (id: string) => {
    const response = await axios.delete("/api/subscriber", {
      params: { id },
    });
    if (response.data.success) {
      toast.success("Subscriber Deleted Successfully");
      fetchSubscribers()
    } else {
      toast.success("Subscriber Deletion Failed, Try Again");
    }

    fetchSubscribers();
  };

  return (
    <div className="sm:px-15 w-full px-5 pt-7">
      <h1 className="font-medium text-lg mb-7">All Subscribers</h1>
      <div className="w-full h-[80vh]  overflow-auto border-1 pb-3">
        {subscribers?.length !== 0 ? (
          <table className="w-3xl sm:w-full x ">
            <thead>
              <tr className="text-left uppercase text-gray-700">
                <th className="font-medium text-base  py-3 px-5 ">
                  Subscriber Email
                </th>
               
                <th className="font-medium text-base py-3  px-5">Date</th>
                <th className="font-medium text-base py-3  px-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers?.map((subscriber: Subscriber, i) => {
                return (
                  <SubscriberListItem
                    key={i}
                    email={subscriber.email}
                    createdAt={subscriber.createdAt}
                    deleteSubscriber={() => deleteSubscriber(subscriber._id)}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center my-10 gap-3 flex-col">
            <p className="text-lg ">No Subscribers Available</p>
            <Link
              href="/"
              className="bg-black rounded-md text-white py-2 px-3 w-auto"
            >
              {" "}
              Subscribe Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
