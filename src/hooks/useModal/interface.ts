import { ReactNode } from "react"

export interface ModalProps {
	children?: ReactNode
	onClose: () => void
	dismissOnOutsideClick?: boolean
}

export interface ModalStyle {
	overlay?: "blur" | "dark" | "none"
	overlayClassName?: string
	modalClassName?: string
}
