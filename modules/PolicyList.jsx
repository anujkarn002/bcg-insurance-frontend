import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "react-query";
import { getPolicies } from "../lib/request";
import Pagination from "../components/Pagination";
import moment from "moment";

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
      <td className="py-2 px-2 ">
        <text>{policy?.id}</text>
      </td>
      <td className="py-3 px-2  whitespace-nowrap">
          {moment(policy?.datePurchased).format("MMM Do YYYY")}
      </td>
      <td className="py-2 px-2 ">
        <text>{policy?.customer.id}</text>
      </td>
      <td className="py-2 px-2 ">
        <text>{policy?.vehicle.fuelType ?? `----------`}</text>
      </td>
      <td className="py-2 px-2 ">
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full">
          {policy?.vehicle.segment ?? `--`}
        </span>
      </td>
      <td className="py-2 px-2 ">
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full">
          ${policy?.premium}
        </span>
      </td>
      <td className="py-2 px-2 ">
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full">
          {policy?.customer.gender}
        </span>
      </td>
      <td className="py-2 px-2 ">
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full">
          {policy?.customer.incomeGroup}
        </span>
      </td>
      <td className="py-2 px-2 ">
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full">
          {policy?.customerIsMarried ? `Yes` : `No`}
        </span>
      </td>
      <td className="py-3 px-2 ">
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
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
                <th className="py-3 px-2"># ID</th>
                <th className="py-3 px-2">Date Of Purchase</th>
                <th className="py-3 px-2">Customer ID</th>
                <th className="py-3 px-2">Fuel</th>
                <th className="py-3 px-2">Vehicle Segment</th>
                <th className="py-3 px-2">Premium</th>
                <th className="py-3 px-2">Customer Gender</th>
                <th className="py-3 px-2">Customer Income Group</th>
                <th className="py-3 px-2">Marital Status</th>
                <th className="py-3 px-2">Action</th>
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
