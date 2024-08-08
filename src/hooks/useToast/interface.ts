export interface ToastContextType {
	toasts: ToastProps[]
	addToast: (toast: ToastProps) => void
	removeToast: (id: string) => void
}
export interface ToastType {
	type: "success" | "error" | "loading"
}
export enum ToastPositionX {
	left = "left",
	center = "center",
	right = "right",
}
export enum ToastPositionY {
	TOP = "top",
	MIDDLE = "middle",
	BOTTOM = "bottom",
}
export type ToastPosition = `${ToastPositionY}-${ToastPositionX}`

export interface ToastProps {
	id?: string
	type: "success" | "error" | "loading"
	delay?: number
	autoRemove?: boolean
	message: string
	position?: ToastPosition
}

export type ToastDefaultProps = {
	content: ToastProps[]
	removeToast: (id: string) => void
	positionArray: ToastPosition[]
}
