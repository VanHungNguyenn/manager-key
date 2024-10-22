import { useContext } from 'react'
import { MessageContext } from './MessageContext'

export const useMessage = () => {
	return useContext(MessageContext)
}
