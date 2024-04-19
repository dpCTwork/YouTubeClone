/* eslint-disable react-refresh/only-export-components */
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react"

type SidebarProviderProps = {
	children: ReactNode
}

type SidebarContextType = {
	isLargeOpen: boolean
	isSmallOpen: boolean
	toggle: () => void
	close: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export const useSidebarContext = () => {
	const value = useContext(SidebarContext)
	if (value == null) throw Error("Cannot use outside of SidebarProvider")
	return value
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
	const [isLargeOpen, setIsLargeOpen] = useState(true)
	const [isSmallOpen, setIsSmallOpen] = useState(false)

	useEffect(() => {
		const handler = () => {
			if (!isScreenSmall()) setIsSmallOpen(false)
		}

		window.addEventListener("resize", handler)

		return () => {
			window.removeEventListener("resize", handler)
		}
	}, [])

	const isScreenSmall = () => {
		return window.innerWidth < 1024
	}

	const toggle = () => {
		if (isScreenSmall()) {
			setIsSmallOpen((small) => !small)
		} else {
			setIsLargeOpen((large) => !large)
		}
	}
	const close = () => {
		if (isScreenSmall()) {
			setIsSmallOpen(false)
		} else {
			setIsLargeOpen(false)
		}
	}

	return (
		<SidebarContext.Provider
			value={{
				isLargeOpen,
				isSmallOpen,
				toggle,
				close,
			}}>
			{children}
		</SidebarContext.Provider>
	)
}
