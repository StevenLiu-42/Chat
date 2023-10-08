import useSWRDelete from "../useSWRDelete";

export default (sessionId) => {
  const apiUrl = `http://localhost:3000/session/${sessionId}`;

  const { trigger } = useSWRDelete(apiUrl); // 發送 DELETE 請求

  return { trigger };
};
