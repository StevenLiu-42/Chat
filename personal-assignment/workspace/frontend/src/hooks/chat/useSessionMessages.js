import useSWRFetch from "../useSWRFetch";

export default (sessionId) => {
  const apiUrl = `http://localhost:3000/session/${sessionId}`;

  const { data, mutate } = useSWRFetch(apiUrl); // 發送 GET 請求

  return { messages: data && data.messages, mutate };
};
