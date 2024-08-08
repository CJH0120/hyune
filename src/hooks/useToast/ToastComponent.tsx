import { useEffect } from "react"
import { ToastProps } from "./interface"

export const ToastComponent = ({
	message,
	type,
	position,
	delay,
	removeToast,
	autoRemove,
	id,
	idx,
}: ToastProps & { removeToast: (id: string) => void } & { idx: number }) => {
	useEffect(() => {
		if (!autoRemove) return
		let timer: NodeJS.Timeout | null = null
		timer = setTimeout(() => {
			removeToast(id as string)
		}, delay ?? 3000)

		return () => clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div
			className={`toast-content ${type + position}`}
			style={{ zIndex: 10 + idx }}
		>
			{id}
			{message}
		</div>
	)
}
