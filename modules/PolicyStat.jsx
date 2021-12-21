import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

const dateTimeOpts = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

const timeOpts = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

const dateOpts = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const StatTooltip = ({ active, payload, label }) => {
  console.log(label)
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{moment(label).format("MMM YYYY")}</p>
        <p className="desc">{`Policy Count: ${payload[0].value}`}</p>
        <p className="desc">{`Total Premium: $${payload[0].payload.totalPremium}`}</p>
      </div>
    );
  }

  return null;
};

export const PolicyGraph = ({ data }) => {
  return (
    <>
      {/* <div className="grid grid-cols-1 xl:grid-cols-6 mx-0 xl:mx-4"> */}
        {/* <div className="w-full divide-y divide-grey-light xl:p-6 flex xl:col-span-4 flex-col border rounded-3xl mx-0 xl:-ml-2 xl:-mr-2 my-2 xl:my-4 border-primary-300  gap-2"> */}
          {/* <div className="xl:col-span-4 flex justify-center items-center h-15 xl:h-24"> */}
            {/* {renderLineChart} */}
            <ResponsiveContainer width="100%" aspect={3}>
              <LineChart data={data}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis
                  dataKey="month"
                  domain={["auto", "auto"]}
                  name="month"
                  // tick={false}
                  tickFormatter={(unixTime) => moment(unixTime).format("MMM YYYY")}
                />
                <YAxis dataKey="totalCount" name="Policies" />
                <Tooltip content={<StatTooltip />} />
                {/* <Legend className="hidden" /> */}
                <Line
                  connectNulls
                  dot={false}
                  type="monotone"
                  dataKey="totalCount"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
    </>
  );
};
