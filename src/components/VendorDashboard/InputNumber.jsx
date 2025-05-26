import React from "react";
import { BiSolidMinusCircle, BiSolidPlusCircle } from "react-icons/bi";

export default function InputNumber({ count, setCount }) {
  const handleCountDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleCountIncrease = () => {
    setCount(count + 1);
  };

  const handleCountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setCount(Number(value));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <BiSolidMinusCircle
            className={`text-2xl  ${
              count === 0 ? "text-[#9A9A9A]" : "cursor-pointer dark:text-black"
            }`}
            onClick={handleCountDecrease}
          />
        </div>
        <div>
          <input
            type="text"
            className="font-bold text-base text-black  bg-transparent border-b border-[#9A9A9A] text-center min-w-[20px]"
            value={count < 10 ? `0${count}` : count}
            onChange={handleCountChange}
            onBlur={() => setCount(Math.max(0, count))}
            size={count.toString().length}
          />
        </div>
        <div>
          <BiSolidPlusCircle
            className="text-2xl cursor-pointer dark:text-black"
            onClick={handleCountIncrease}
          />
        </div>
      </div>
    </div>
  );
}
