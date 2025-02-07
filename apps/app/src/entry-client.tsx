// @refresh reload
import { StartClient, mount } from '@solidjs/start/client'

// biome-ignore lint/style/noNonNullAssertion: This is the mount point of the application app always exists
mount(() => <StartClient />, document.getElementById('app')!)
