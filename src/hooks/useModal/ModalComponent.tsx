import React, { ReactNode, useCallback, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { ModalProps, ModalStyle } from "./interface"
import styles from "../../styles/modal.module.scss"
export const ModalComponent = ({
	onClose,
	children,
	dismissOnOutsideClick = true,
	modalClassName,
	overlay = "dark",
	overlayClassName,
}: ModalProps & ModalStyle) => {
	const modalEl = useRef<HTMLDivElement>(null)

	const handleClickOutside = useCallback(
		(e: MouseEvent) => {
			if (modalEl.current && !modalEl.current.contains(e.target as Node)) {
				onClose()
			}
		},
		[onClose]
	)

	useEffect(() => {
		if (!dismissOnOutsideClick) return
		document.addEventListener("mousedown", handleClickOutside)

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [dismissOnOutsideClick, handleClickOutside])
	useEffect(() => {
		document.body.style.overflow = "hidden"
		return () => {
			document.body.style.overflow = "auto"
		}
	}, [])
	return createPortal(
		<div
			className={[`${styles["modal-wrapper"]} ${overlayClassName}`].join(" ")}
			style={{
				background: overlay === "dark" ? "rgba(0, 0, 0, 0.5)" : undefined,
				backdropFilter: overlay === "blur" ? "blur(10px)" : "",
			}}
		>
			<div
				className={[
					`${!!modalClassName ? modalClassName : styles["modal-content"]}`,
				].join(" ")}
				ref={modalEl}
			>
				{children}
			</div>
		</div>,
		document.body
	)
}
