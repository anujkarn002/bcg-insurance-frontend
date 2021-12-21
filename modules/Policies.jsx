import { useRouter } from "next/router";
import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useQuery } from "react-query";
import { getPoliciesStat, getPolicies } from "../lib/request";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import { PolicyGraph } from "./PolicyStat";
import { PolicyList } from "./PolicyList";

const regions = [
  { value: "", name: "Select Region" },
  { value: "east", name: "East" },
  { value: "west", name: "West" },
  { value: "north", name: "North" },
  { value: "south", name: "South" },
];

export const Policies = ({}) => {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");

  const setSearchTerm = ({ currentTarget: { value } }) => setQ(value);

  const fetchPolicies = async (p = 1, ps = 10, q = "") =>
    await (
      await getPolicies(p, ps, q)
    ).data;

  const fetchPoliciesStat = async (region = "") =>
    await (
      await getPoliciesStat(region)
    ).data;

  const {
    isLoading: isPoliciesLoading,
    isError: isPoliciesError,
    error: policiesError,
    data: policies,
    isFetching: isPoliciesFetching,
    isPreviousData: isPoliciesPreviousData,
  } = useQuery(
    ["fetchPolicies", page, pageSize, q],
    () => fetchPolicies(page, pageSize, q),
    {
      keepPreviousData: true,
    }
  );

  const {
    isLoading: isPoliciesStatLoading,
    isError: isPoliciesStatError,
    error: policiesStatError,
    data: policiesStat,
    isFetching: isPoliciesStatFetching,
    isPreviousData: isPoliciesStatPreviousData,
  } = useQuery(["fetchPoliciesStat", region], () => fetchPoliciesStat(region), {
    keepPreviousData: true,
  });

  const [tab, setTab] = useState(0);
  return (
    <>
      <div className="w-full lg:w-full">
        <div className="flex flex-row items-center ml-2">
          <div className="ml-2 rounded-full bg-indigo-600 bg-opacity-75">
            {/* <FaChartLine size="25" /> */}
            <img
              width={25}
              height={25}
              src={`https://static.thenounproject.com/png/1653454-200.png`}
            />
          </div>
          <div className="mx-2">
            <h4 className="text-2xl font-semibold text-secondary text-gray-700">
              Policies
            </h4>
          </div>
        </div>
        <div className="bg-white rounded my-2">
          <div className="w-full flex justify-between flex-wrap-reverse gap-2 p-6">
            <div className="self-start">
              <text>Showing fetched records</text>
            </div>
            <div className="flex flex-row flex-nowrap gap-4">
              {tab === 1 ? (
                <select
                  name="select"
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {regions.map(function (n) {
                    return (
                      <option value={n.value} selected={region === n.value}>
                        {n.name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <SearchBar className="mb-2" onChange={setSearchTerm} placeholder="Policy ID or Customer ID" value={q} />
              )}
            </div>
          </div>

          {policies?.results.length ? (
            <>
              {/* Tabs */}
              <div className="mx-auto">
                <div className="flex flex-row justify-between items-center">
                  <ul id="tabs" className="inline-flex w-full px-1 pt-2">
                    <li
                      onClick={() => setTab(0)}
                      className={`px-4 py-2 -mb-px font-semibold text-gray-800 ${
                        tab == 0 ? "border-b-2" : ""
                      } border-blue rounded-t opacity-50`}
                    >
                      <a href="#table">Table</a>
                    </li>
                    <li
                      onClick={() => setTab(1)}
                      className={`px-4 py-2 font-semibold text-gray-800 ${
                        tab == 1 ? "border-b-2" : ""
                      } border-blue rounded-t opacity-50`}
                    >
                      <a href="#graph">Graph</a>
                    </li>
                  </ul>
                  {/* <div className="mx-2 lg:mx-4">
                    <text className="cursor-pointer text-lg text-secondary">
                      <PoliciesDownloader data={policies} />
                    </text>
                  </div> */}
                </div>

                {/* Tabs content */}
                <div className="mx-auto">
                  {tab === 0 ? (
                    <>
                      {/* 0 for table */}
                      <PolicyList data={policies} />
                    </>
                  ) : (
                    <>
                      {/* 1 for graph */}
                      <PolicyGraph data={policiesStat} />
                    </>
                  )}
                </div>
              </div>
              {/* Tabs */}
              {tab === 0 ? (
                <div className="w-full mt-4 hidden">
                  <div className="flex flex-row justify-end items-center">
                    <div className="h-12 w-12">
                      {isPoliciesLoading ? <Spinner /> : <></>}
                    </div>
                    <div>
                      <Pagination
                        totalResults={policies?.count ?? 0}
                        resultsPerPage={pageSize}
                        onChange={(p) => setPage(p)}
                        label="Policies pagination"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
