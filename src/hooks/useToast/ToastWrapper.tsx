import { createPortal } from "react-dom"
import { useMemo } from "react"
import {
	ToastPosition,
	ToastPositionX,
	ToastPositionY,
	ToastDefaultProps,
} from "./interface"
import { ToastComponent } from "./ToastComponent"

export const Toast = ({
	content,
	removeToast,
}: Omit<ToastDefaultProps, "positionArray">) => {
	const positions = useMemo(() => {
		const positions: ToastPosition[] = []
		for (const x of Object.values(ToastPositionX)) {
			for (const y of Object.values(ToastPositionY)) {
				positions.push(`${y}-${x}`)
			}
		}
		return positions
	}, [])

	return createPortal(
		<ToastWrapper
			positionArray={positions}
			removeToast={removeToast}
			content={content}
		/>,
		document.body
	)
}

const ToastWrapper = ({
	content,
	positionArray,
	removeToast,
}: ToastDefaultProps) => {
	return (
		<>
			{positionArray.map((position) => (
				<div
					className={`hyune-toast-${position}  hyune-toast-default`}
					key={position}
				>
					{content
						.filter((toast) => toast.position === position)
						.map((toast, idx) => (
							<ToastComponent
								idx={idx}
								id={toast.id}
								removeToast={removeToast}
								key={toast.id}
								{...toast}
							/>
						))}
				</div>
			))}
		</>
	)
}
