"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/dataSlice"; // Adjust path as per your project
import { AppDispatch, RootState } from "../store/store"; // Adjust path as per your project
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTimeAgo } from "../utils";

const DataTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.data.data);
  const status = useSelector((state: RootState) => state.data.status);
  const error = useSelector((state: RootState) => state.data.error);
  const symbol = useSelector((state: RootState) => state.filter.value);

  useEffect(() => {
    dispatch(fetchData(symbol));
    const interval = setInterval(() => {
      dispatch(fetchData(symbol));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;

  return (
    <>
      <Table className="w-[95vw] md:w-[60vw] m-auto">
        <TableCaption>A list of your recent data.</TableCaption>
        <TableHeader>
          <TableRow className="text-center bg-gray-300 hover:bg-gray-300">
            <TableHead className="text-center w-1/4">SL No.</TableHead>
            <TableHead className="text-center w-1/4">Symbol</TableHead>
            <TableHead className="text-center w-1/4">Price</TableHead>
            <TableHead className="text-center w-1/4">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item,index) => (
            <TableRow key={item._id}>
              <TableCell className="text-center">{index+1}</TableCell>
              <TableCell className="text-center">{item.symbol}</TableCell>
              <TableCell className="text-center">{item.price}</TableCell>
              <TableCell className="text-center">{getTimeAgo(item.timestamp)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
