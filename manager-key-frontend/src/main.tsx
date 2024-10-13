import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'Poppins, sans-serif',
				},
			}}
		>
			<App />
		</ConfigProvider>
	</StrictMode>
)
