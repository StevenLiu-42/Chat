// import { useCookies } from "react-cookie";
import { useUser } from '@clerk/clerk-react'
import useSWRFetch from '../useSWRFetch'

export default () => {
	// const [cookies] = useCookies(["studentId"]);
	const { user } = useUser()

	const apiUrl = `http://localhost:3000/users/${user.id}/sessions`;

	const { data } = useSWRFetch(apiUrl) // 發送 GET 請求

	return data
}
