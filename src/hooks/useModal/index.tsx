import React, { useState, useCallback, ReactNode, useEffect } from "react"
import { ModalComponent } from "./ModalComponent"
import { ModalProps, ModalStyle } from "./interface"

export const useModal = () => {
	const [open, setOpen] = useState<boolean>(false)
	const openModal = useCallback(() => {
		setOpen(true)
	}, [])

	const closeModal = useCallback(() => {
		setOpen(false)
	}, [])

	const Modal = ({
		children,
		dismissOnOutsideClick,
		modalClassName,
		overlay,
		overlayClassName,
	}: Omit<ModalProps, "onClose"> & ModalStyle) => {
		return open ? (
			<ModalComponent
				modalClassName={modalClassName}
				overlay={overlay}
				overlayClassName={overlayClassName}
				dismissOnOutsideClick={dismissOnOutsideClick}
				onClose={closeModal}
			>
				{children}
			</ModalComponent>
		) : null
	}

	return {
		openModal,
		closeModal,
		Modal,
	}
}
