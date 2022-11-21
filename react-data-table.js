import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Image from "next/image";
import { Actions } from "@/assets/index";
import { IoIosClose, IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";
import Dropdown from "@/components/molecules/dropdown";
import { Menu } from "@headlessui/react";
import { GiHolosphere } from "react-icons/gi";
import Head from "next/head";
import { GrFormClose } from "react-icons/gr";
import { BsCheck } from "react-icons/bs";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Table from "@/components/organisms/table";

const Pipeline = () => {
  const router = useRouter();
  const { skeletonCol } = TableSkeleton();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  const columns = [
    {
      name: "No",
      width: "100px",
      selector: (row, index) => <div className="w-4">{row.id}</div>,
    },
    {
      name: "Status",
      selector: (row) => (
        <div onClick={() => router.push(`/pipeline/${row.id}/detail`)}>
          <p
            className={`text-sm ${
              row.status.find((item) =>
                item.status.toLowerCase().includes("failed")
              )
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {row.status.find((item) =>
              item.status.toLowerCase().includes("failed")
            )
              ? "Failed"
              : "Success"}
          </p>
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div
          className="text-sm"
          onClick={() => router.push(`/pipeline/${row.id}/detail`)}
        >
          {row.action}
        </div>
      ),
    },
    {
      name: "Stage",
      selector: (row) => {
        return (
          <div
            className="text-sm flex"
            onClick={() => router.push(`/pipeline/${row.id}/detail`)}
          >
            {row.status.map((item, index, row) => {
              return row.length - 1 != index ? (
                <p key={index} className="flex items-center">
                  {item.status.toLowerCase() == "success" ? (
                    <span>
                      <BsCheck className="text-green-500 w-4 h-4" />
                    </span>
                  ) : (
                    <span>
                      <IoIosClose className="text-red-500 w-4 h-4" />
                    </span>
                  )}
                  {"-"}
                </p>
              ) : (
                <p key={index} className="flex items-center">
                  {item.status.toLowerCase() == "success" ? (
                    <BsCheck className="text-green-500 w-4 h-4" />
                  ) : (
                    <IoIosClose className="text-red-500 w-4 h-4" />
                  )}
                </p>
              );
            })}
          </div>
        );
      },
    },
  ];

  createTheme("custome", {
    text: {
      primary: "white",
      secondary: "white",
    },
    background: {
      default: "black",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "gray",
    },
    button: {
      default: "#2aa198",
      hover: "gray",
      focus: "rgba(255,255,255,.12)",
      disabled: "rgba(255, 255, 255, .34)",
    },
    sortFocus: {
      default: "#2aa198",
    },
  });

  return (
    <div className="px-4">
      <Head>
        <title>pipeline</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-end pb-4">
        <DropdownAction />
      </div>
      <div className="mt-2 px-4 bg-black items-center border border-white">
        <div className="flex justify-between py-4">
          <p className="text-2xl font-medium pl-3">Recent Action</p>
          <div className="flex gap-2 items-center">
            <div className="bg-white p-1 rounded flex items-center cursor-pointer hover:opacity-80 ease-in-out duration-150">
              <Image src={Actions} alt="icon" />
            </div>
            <DropdownAction />
          </div>
        </div>
        <DataTable
          columns={isLoading ? skeletonCol : columns}
          data={data}
          pagination={data.length > 10 && !isLoading ? true : false}
          fixedHeader
          className="overflow-hidden"
          theme={"custome"}
          highlightOnHover
          customStyles={{
            headCells: {
              style: {
                fontWeight: "bold",
                fontSize: "16px",
              },
            },
            rows: {
              highlightOnHoverStyle: {
                backgroundColor: "#263238",
                color: "white",
                cursor: "pointer",
              },
            },
          }}
          onRowClicked={(value) => {
            !isLoading && router.push(`/pipeline/${value.id}/detail`);
          }}
        />
      </div>
    </div>
  );
};

export default Pipeline;

const DropdownAction = () => {
  return (
    <Dropdown
      width={""}
      title={
        <p className="bg-[#9F0037] font-medium px-4 py-1 rounded flex items-center gap-1 hover:opacity-80 ease-in-out duration-150">
          Actions
          <IoMdArrowDropdown />
        </p>
      }
    >
      <div className="px-1 py-1 shadow-md">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-sky-500 text-white" : "text-black font-semibold"
              } group flex w-full items-center rounded-md px-2 py-2 text-xs font-semibold`}
            >
              {active ? (
                <GiHolosphere className="mr-1 h-4 w-4 " aria-hidden="true" />
              ) : (
                <GiHolosphere
                  className="mr-1 h-4 w-4 text-sky-500"
                  aria-hidden="true"
                />
              )}
              Input here
            </button>
          )}
        </Menu.Item>
      </div>
    </Dropdown>
  );
};

const TableSkeleton = () => {
  const SkeletonThemeTable = () => {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Skeleton duration={1} />
      </SkeletonTheme>
    );
  };

  const skeletonCol = [
    {
      name: "No",
      width: "100px",
      selector: (row, index) => (
        <div className="w-4">
          <SkeletonThemeTable />
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="w-40">
          <SkeletonThemeTable />
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="w-20">
          <SkeletonThemeTable />
        </div>
      ),
    },
    {
      name: "Stage",
      selector: (row) => (
        <div className="w-20">
          <SkeletonThemeTable />
        </div>
      ),
    },
  ];

  return {
    skeletonCol,
  };
};

const data = [
  {
    id: 1,
    status: [
      {
        name: "function 1",
        status: "success",
      },
      {
        name: "function 2",
        status: "success",
      },
      {
        name: "function 3",
        status: "success",
      },
    ],
    action: "sqoop",
  },
  {
    id: 2,
    status: [
      {
        name: "function 1",
        status: "success",
      },
      {
        name: "function 2",
        status: "success",
      },
      {
        name: "function 3",
        status: "failed",
      },
    ],
    action: "sqoop",
  },
  {
    id: 3,
    status: [
      {
        name: "function 1",
        status: "success",
      },
      {
        name: "function 2",
        status: "success",
      },
      {
        name: "function 3",
        status: "success",
      },
    ],
    action: "sqoop",
  },
  {
    id: 4,
    status: [
      {
        name: "function 1",
        status: "failed",
      },
    ],
    action: "sqoop",
  },
  {
    id: 5,
    status: [
      {
        name: "function 1",
        status: "success",
      },
      {
        name: "function 2",
        status: "failed",
      },
    ],
    action: "sqoop",
  },
  {
    id: 6,
    status: [
      {
        name: "function 1",
        status: "success",
      },
      {
        name: "function 2",
        status: "success",
      },
      {
        name: "function 3",
        status: "failed",
      },
    ],
    action: "sqoop",
  },
  {
    id: 7,
    status: [
      {
        name: "function 1",
        status: "success",
      },
      {
        name: "function 2",
        status: "success",
      },
      {
        name: "function 3",
        status: "failed",
      },
    ],
    action: "sqoop",
  },
  {
    id: 8,
    status: [
      {
        name: "function 1",
        status: "success",
      },
      {
        name: "function 2",
        status: "success",
      },
      {
        name: "function 3",
        status: "failed",
      },
    ],
    action: "sqoop",
  },
  {
    id: 9,
    status: [
      {
        name: "function 1",
        status: "success",
      },
      {
        name: "function 2",
        status: "success",
      },
      {
        name: "function 3",
        status: "failed",
      },
    ],
    action: "sqoop",
  },
  {
    id: 10,
    status: [
      {
        name: "function 1",
        status: "success",
      },
      {
        name: "function 2",
        status: "success",
      },
      {
        name: "function 3",
        status: "failed",
      },
    ],
    action: "sqoop",
  },
  {
    id: 11,
    status: "Failed",
    status: [
      {
        name: "function 1",
        status: "success",
      },
      {
        name: "function 2",
        status: "success",
      },
      {
        name: "function 3",
        status: "failed",
      },
    ],
    action: "sqoop",
  },
];
