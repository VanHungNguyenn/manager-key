import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { MessageProvider } from './context/MessageContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'
import './index.css'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'Poppins, sans-serif',
				},
			}}
		>
			<ModalProvider>
				<MessageProvider>
					<Provider store={store}>
						<App />
					</Provider>
				</MessageProvider>
			</ModalProvider>
		</ConfigProvider>
	</StrictMode>
)
