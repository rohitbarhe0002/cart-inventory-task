import {
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
} from "@urql/next";
import { BASE_URL } from "./utils";

const ssr = ssrExchange({
  isClient: typeof window !== "undefined",
});
const client = createClient({
  url: BASE_URL,
  exchanges: [cacheExchange, ssr, fetchExchange],
  suspense: true,
});

export { client, ssr };
