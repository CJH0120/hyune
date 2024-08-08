import { createContext, ReactNode, useCallback, useState } from "react"
import { ToastContextType, ToastProps } from "./interface"
import { Toast } from "./ToastWrapper"

export const ToastContext = createContext<ToastContextType | undefined>(
	undefined
)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [toasts, setToasts] = useState<ToastProps[]>([])

	const addToast = useCallback((toast: ToastProps) => {
		setToasts((prevToasts) => [
			...prevToasts,
			{ ...toast, id: Date.now().toString() },
		])
	}, [])

	const removeToast = useCallback((id: string) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
	}, [])
	return (
		<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
			{!!toasts.length && <Toast removeToast={removeToast} content={toasts} />}
			{children}
		</ToastContext.Provider>
	)
}
