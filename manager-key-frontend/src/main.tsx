import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
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
			<Provider store={store}>
				<App />
			</Provider>
		</ConfigProvider>
	</StrictMode>
)
