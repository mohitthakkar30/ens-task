import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import Head from "next/head";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [addr, setAddr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resolveAddress = async () => {
    try {
      setResult("");
      setIsLoading(true);
      const response = await fetch("/api/resolveAddress?value=" + input);
      const data = await response.json();
      setResult("Output - " + data.name);
      setIsLoading(false);
      if (data.error) {
        setResult(data.error);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const resolveName = async () => {
    try {
      setResult("");
      setIsLoading(true);
      const response = await fetch("/api/resolveName?value=" + input);
      const data = await response.json();
      setResult("Output - " + data.address);
      setIsLoading(false);
      if (data.error) {
        setResult(data.error);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const resolveRecords = async () => {
    try {
      setResult("");
      setIsLoading(true);
      const response = await fetch("/api/resolveRecord?value=" + input);
      const data = await response.json();
      const jsonData = JSON.stringify(data);
      setAddr(data.records.coinTypes[0].addr);
      setResult("Output - " + "Address - " + addr + "  " + jsonData);
      setIsLoading(false);
      if (data.error) {
        setResult(data.error);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Dotnames</title>
        <meta name="description" content="Dotnames" />
        <link rel="icon" href="/dotnames.png" />
      </Head>
      <div className="flex flex-col items-center m-40 min-h-screen py-2">
        <h1 className="p-3 text-6xl font-bold text-center">
          Welcome to{" "}
          <a className="text-[#f95b8b]" href="https://dotnames.com">
            Dotnames
          </a>
        </h1>

        <form className="max-w-lg  mx-auto">
          Enter your ENS or Address
          <div className="p-1 w-full relative">
            <input
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter ENS or address"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </form>
        <div className="p-4">
          <button
            type="submit"
            onClick={resolveAddress}
            className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Resolve Address
          </button>
          <button
            type="submit"
            onClick={resolveName}
            className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Resolve Name
          </button>
          <button
            type="submit"
            onClick={resolveRecords}
            className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Resolve Records
          </button>
          {isLoading ? <CircularProgress color="error" size={25} /> : null}
        </div>
        <div className="p-4">
          <p className="text-2xl text-center">{result}</p>
        </div>
      </div>
    </>
  );
}
