import { WebPartContext } from "@microsoft/sp-webpart-base";
import { useEffect, useState } from "react";
import {
  getLists,
  IDisasterDeclarationsSummariesResponse,
} from "../services";

interface IUseMockDataResults {
  data: IDisasterDeclarationsSummariesResponse | undefined;
  loading: boolean;
  error: Error | undefined;
}

export const useMockData = (context: WebPartContext): IUseMockDataResults => {
  const [data, setData] = useState<
    IDisasterDeclarationsSummariesResponse | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(undefined);

    const timer = setTimeout(() => {
      getLists(context)
        .then((response) => {
          if (isMounted) {
            setData(response);
            setLoading(false);
          }
        })
        .catch((error: Error) => {
          if (isMounted) {
            setError(error);
            setLoading(false);
          }
        });
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [context]);

  return { data, loading, error };
};
