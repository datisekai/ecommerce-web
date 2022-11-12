import { useRouter } from "next/router";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.name as string || "")


  const handleSearch = (e:any) => {
    e.preventDefault();
      if(search.trim() !== ""){
        router.push(`/search?name=${search}`)
      }
  }
  return (
    <form onSubmit={handleSearch}>

    <div
      id="parent"
      className="showMenuSearch relative flex h-[2.5rem] items-stretch rounded-sm  bg-white p-[0.1875rem] "
    >
    {/* <Tippy
      interactive
      visible={false}
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
    > */}
      <input
        type="text"
        // onFocus={() => setFocus(true)}
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        className="flex flex-1 px-[0.625rem] text-[16px] outline-none placeholder:font-extralight placeholder:uppercase"
        placeholder="Voucher thương hiệu xịn lấy ngay!!"
      />
    {/* </Tippy> */}

    <button type="submit" className="absolute right-[4px] flex h-[34px] min-w-[60px] max-w-[190px] items-center justify-center rounded-sm bg-[#fb5533] px-[15px]">
      <BsSearch className="text-[18px] text-white" />
    </button>
    </div>
    </form>
  );
};

export default Search;
