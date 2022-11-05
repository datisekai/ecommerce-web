import React, { useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import HistorySearch from "./Cards/HistorySearch";
import { BsSearch } from "react-icons/bs";
import Tippy from "@tippyjs/react/headless";

const Search = () => {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div
      id="parent"
      className="showMenuSearch relative flex h-[2.5rem] items-stretch rounded-sm  bg-white p-[0.1875rem] "
    >
      <Tippy
        interactive
        visible={focus}
        onClickOutside={() => setFocus(false)}
        render={(attrs) => (
          <div
            {...attrs}
            className="shadowBox w-[90%] rounded-sm bg-white px-3 py-3"
          >
            <HistorySearch />
            <HistorySearch />
            <HistorySearch />
          </div>
        )}
      >
        <input
          type="text"
          onFocus={() => setFocus(true)}
          onChange={(e: any) => setSearch(e.target.value)}
          className="flex flex-1 px-[0.625rem] text-[16px] outline-none placeholder:font-extralight placeholder:uppercase"
          placeholder="Voucher thương hiệu xịn lấy ngay!!"
        />
      </Tippy>

      <button className="absolute right-[4px] flex h-[34px] min-w-[60px] max-w-[190px] items-center justify-center rounded-sm bg-[#fb5533] px-[15px]">
        <BsSearch className="text-[18px] text-white" />
      </button>
    </div>
  );
};

export default Search;
