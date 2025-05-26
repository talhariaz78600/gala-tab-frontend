import React from "react";
import Profile from "../../../../assets/img/profile.png";

const Chat = () => {
  return (
    <div>
      <div className="flex gap-2 p-3">
        <div>
          <img
            src={Profile}
            alt=""
            className="size-10 max-w-10 border-2 border-white rounded-full object-cover"
          />
        </div>
        <div className="sm:mr-40">
          <div className="bg-[#C2C6CC] p-3 border rounded-xl">
            <p className="text-xs">
              Gee, its been good news all day. i met someone special today.
              she's really pretty. i’ll like to talk more about it but it has to
              be tomorrow. she should grab a drink later.
            </p>
            <span className="text-[9px] mt-3">Sent via SMS</span>
          </div>
          <div className="text-end">
            <span className="text-[9px]">July, 22, 4:27pm</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 p-3">
        <div className="sm:ml-40">
          <div className="bg-[#FFFFFF] p-3 border rounded-xl">
            <p className="text-xs">
              Gee, its been good news all day. i met someone special today.
              she's really pretty. i’ll like to talk more about it but it has to
              be tomorrow. she should grab a drink later.
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[9px]">
                July, 22, 4:27pm by Beth Turner
              </span>
              <span className="text-[9px]">Sent via SMS</span>
            </div>
          </div>
        </div>
        <div>
          <img
            src={Profile}
            alt=""
            className="size-10 max-w-10 border-2 border-white rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex gap-2 p-3">
        <div className="sm:ml-40">
          <div className="bg-[#FFFFFF] p-3 border rounded-xl">
            <p className="text-xs">
              Gee, its been good news all day. i met someone special today.
              she's really pretty. i’ll like to talk more about it but it has to
              be tomorrow. she should grab a drink later.
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[9px]">
                July, 22, 4:27pm by Beth Turner
              </span>
              <span className="text-[9px]">Sent via SMS</span>
            </div>
          </div>
        </div>
        <div>
          <img
            src={Profile}
            alt=""
            className="size-10 max-w-10 border-2 border-white rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex gap-2 p-3">
        <div>
          <img
            src={Profile}
            alt=""
            className="size-10 max-w-10 border-2 border-white rounded-full object-cover"
          />
        </div>
        <div className="sm:mr-40">
          <div className="bg-[#C2C6CC] p-3 border rounded-xl">
            <p className="text-xs">
              Gee, its been good news all day. i met someone special today.
              she's really pretty. i’ll like to talk more about it but it has to
              be tomorrow. she should grab a drink later.
            </p>
            <span className="text-[9px] mt-3">Sent via SMS</span>
          </div>
          <div className="text-end">
            <span className="text-[9px]">July, 22, 4:27pm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
