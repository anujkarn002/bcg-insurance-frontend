import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "react-query";
import { getPolicies } from "../lib/request";
import Pagination from "../components/Pagination";

const dateTimeOpts = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

const PolicyRow = ({ policy, pos }) => {
  const { push } = useRouter();
  return (
    <tr
      className="cursor-pointer border-b border-primary-300 hover:shadow-lg"
      onClick={() => push(`/policies/${policy?.id}`)}
    >
      <td className="py-3 px-6  text-left whitespace-nowrap">
        <text>{policy?.id}</text>
      </td>
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <p>
          {new Date(policy?.datePurchased).toLocaleString(
            "en-US",
            dateTimeOpts
          )}
        </p>
      </td>
      <td className="py-3 px-6 text-left">
        <text>{policy?.customer.id}</text>
      </td>
      <td className="py-3 px-6 text-center">
        <text>{policy?.vehicle.fuelType ?? `----------`}</text>
      </td>
      <td className="py-3 px-6 text-center">
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full">
          {policy?.vehicle.segment ?? `--`}
        </span>
      </td>
      <td className="py-3 px-6 text-center">
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full">
          ${policy?.premium}
        </span>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </td>
    </tr>
  );
};

export const PolicyList = ({data}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [q, setQ] = useState(null);
  // const fetchPolicies = async (p = 1, ps = 10, q = null) =>
  //   await (
  //     await getPolicies(p, ps, q)
  //   ).data;
  // const { isLoading, isError, error, data, isFetching, isPreviousData } =
  //   useQuery(
  //     ["fetchPolicies", page, pageSize, q],
  //     () => fetchPolicies(page, pageSize, q),
  //     {
  //       keepPreviousData: true,
  //     }
  //   );
  return (
    <>
      <div className="w-full lg:w-full">
        <div className="bg-white rounded my-2">
          <div className="flex flex-row items-center flex-nowrap w-full pl-6 pb-4">
            <div className="pr-3 py-1 rounded-full bg-indigo-600 bg-opacity-75">
              <FaUsers size="25" />
            </div>
            <text className="text-3xl font-semibold text-secondary text-gray-700">
              {`${data?.count ?? `0`}`}
            </text>
          </div>
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-primary-200 text-gray-600 uppercase text-md leading-normal">
                <th className="py-3 px-6 text-left"># ID</th>
                <th className="py-3 px-6 text-left">Date Of Purchase</th>
                <th className="py-3 px-6 text-left">Customer ID</th>
                <th className="py-3 px-6 text-center">Fuel</th>
                <th className="py-3 px-6 text-center">Vehicle Segment</th>
                <th className="py-3 px-6 text-center">Premium</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-md font-light">
              {data?.results?.map((policy, idx) => {
                return (
                  <PolicyRow
                    policy={policy}
                    key={policy.id}
                    pos={pageSize * page - pageSize + idx}
                  />
                );
              })}
            </tbody>
          </table>
          <div className="w-full mt-4">
            <div className="flex flex-row justify-end items-center">
              {/* <div>
                <Dropdown isOpen={true} onClick={() => 1} onClose={() => 1}>
                  <DropdownItem>25</DropdownItem>
                </Dropdown>
              </div> */}
              <div>
                {/* <Pagination
                  totalResults={data?.count ?? 0}
                  resultsPerPage={pageSize}
                  onChange={(p) => setPage(p)}
                  label="Policy pagination"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
