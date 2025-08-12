import { AppProps } from "next/app"
import { Provider } from "@/components/ui/provider"
import { SessionProvider } from "@/contexts/sessionContext"


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <SessionProvider>
              <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}
