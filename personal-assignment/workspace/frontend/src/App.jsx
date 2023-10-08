import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
	SignIn,
	SignUp,
} from '@clerk/clerk-react'

import './css/style.css'

import './charts/ChartjsConfig'

// Import pages
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key')
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function App() {
	const location = useLocation()

	useEffect(() => {
		document.querySelector('html').style.scrollBehavior = 'auto'
		window.scroll({ top: 0 })
		document.querySelector('html').style.scrollBehavior = ''
	}, [location.pathname]) // triggered on route change

	return (
		<ClerkProvider publishableKey={clerkPubKey}>
			<Routes>
				<Route exact path="/" element={<Dashboard />} />
				<Route
					path="/sign-in/*"
					element={<SignIn routing="path" path="/sign-in" />}
				/>
				<Route
					path="/sign-up/*"
					element={<SignUp routing="path" path="/sign-up" />}
				/>
				<Route
					path="/chat"
					element={
						<>
							<SignedIn>
								<Chat />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
			</Routes>
		</ClerkProvider>
	)
}

export default App
