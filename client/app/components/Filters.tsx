"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setSymbol, setCategory } from "../store/filterSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector((state: RootState) => state.filter.category);

  const [open, setOpen] = useState(false);

  const cryptos = ["bitcoin", "ethereum", "litecoin", "ripple", "dogecoin"];
  const stocks = ["AAPL", "GOOG", "MSFT", "AMZN", "FB"];

  const handleChangeCategory = (newCategory: 'crypto' | 'stock') => {
    dispatch(setCategory(newCategory));
    dispatch(setSymbol(""));
  };

  const handleChangeSymbol = (newSymbol: string) => {
    console.log("Selected symbol:", newSymbol);
    dispatch(setSymbol(newSymbol));
    setOpen(false);
  };
  const options = category === "crypto" ? cryptos : stocks;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Filter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Choose a category</DialogTitle>
          <DialogDescription>
            Select a category to filter your data.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm">
          <p>Select a category</p>
          <Select onValueChange={handleChangeCategory}>
            <SelectTrigger className="w-full focus:ring-offset-0 focus:ring-0">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="cryptos" key="cryptos">
                  Cryptos
                </SelectItem>
                <SelectItem value="stocks" key="stocks">
                  Stocks
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p>Select a {category === "crypto" ? "cryptocurrency" : "stock"}</p>
          <Select onValueChange={handleChangeSymbol} disabled={!category}>
            <SelectTrigger className="w-full focus:ring-offset-0 focus:ring-0">
              <SelectValue
                placeholder={`Select a ${
                  category === "crypto" ? "cryptocurrency" : "stock"
                }`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem
                    value={option}
                    key={option}
                    className="focus-visible:ring-transparent"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Filters;