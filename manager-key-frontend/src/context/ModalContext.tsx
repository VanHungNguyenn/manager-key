import { Modal } from 'antd'
import { HookAPI } from 'antd/es/modal/useModal'
import { createContext } from 'react'

export const ModalContext = createContext<HookAPI>({} as HookAPI)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [modal, contextHolder] = Modal.useModal()

	return (
		<ModalContext.Provider value={modal}>
			{contextHolder}
			{children}
		</ModalContext.Provider>
	)
}
