import React, { FC } from "react";
import toast from "react-hot-toast";

type NotifyProps = {
  t: any;
  message: string;
};

const Notify: FC<NotifyProps> = ({ t, message }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src="https://media.istockphoto.com/id/1218418104/photo/sorry-we-are-closed.jpg?b=1&s=170667a&w=0&k=20&c=bu9A1L3kX9t0ZlkO_C5ZHQvQghsfTrFgE-Fxw4t_DQs="
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Thông báo</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default Notify;
