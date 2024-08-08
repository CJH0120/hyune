import { useContext } from "react"
import { ToastContext } from "./provider"
import { ToastContextType } from "./interface"
import "./toast.css"
export const useToast = (): ToastContextType => {
	const context = useContext(ToastContext)
	if (context === undefined) {
		throw new Error("useToast must be used within a ToastProvider")
	}
	return context
}
