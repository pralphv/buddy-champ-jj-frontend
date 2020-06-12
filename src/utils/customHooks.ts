import { useState, useEffect } from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import * as types from "./types";

export function useWindow(): types.Window {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.screen.width);

    // Bind the event listener
    window.addEventListener("resize", handleSetTable);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("resize", handleSetTable);
    };
  }, []);

  function handleSetTable() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    setWidth(windowWidth);
    setHeight(windowHeight);
  }

  return { width, height };
}

export function useIsMobile(): boolean {
  const isMobile: boolean = useMediaQuery("(max-width:900px)");
  return isMobile;
}

export function useFetch(url: string): [any, boolean] {
  const [data, setData] = useState<Object>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      console.log(`Fetching ${url}`)
      setLoading(true);
      try {
        const resp = await fetch(url);
        const data_ = await resp.json();
        setData(data_.msg);
      } catch (error) {
        console.log("API Error: " + error);
      }
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return [data, loading];
}

function checkObjectIsFilled(obj: object): boolean {
  return !Object.values(obj).some((x) => x === "");
}

export function usePost(url: string, args: object): [any, boolean] {
  const [data, setData] = useState<Object>();
  const [loading, setLoading] = useState<boolean>(false);
  const argsToPreventRendering = JSON.stringify(args);
  useEffect(() => {
    async function fetchData() {
      console.log(`Fetching ${url}`)
      setLoading(true);
      try {
        const resp = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(args),
        });
        const data_ = await resp.json();
        setData(data_.msg);
      } catch (error) {
        console.log("API Error: " + error);
      }
      setLoading(false);
    }
    if (checkObjectIsFilled(args)) {
      fetchData();
    }
  }, [url, argsToPreventRendering]); // need deep comparison for objects

  return [data, loading];
}
