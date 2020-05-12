/**
 * pahnev: "Fighting bugs? Bob Marley - Everything's Gonne Be Alright" (02/13/20)
 * BackeyM - "Author: @backey Copyright© 2020" (02/13/20)
 * syszen - "inflation will occur - pixelogicdev" (02/13/20)
 * syszen - "for future proof reference 10000 active users = gruvee tattoo" (02/13/20)
 * TheDkbay - "Gib name" (1/22/2020)
 * Stacking - "He had no arms or legs. He couldn't see, hear, or speak. This is how he led a nation." (01/27/20)
 * sillyonly - "this is still high! I would love to get a discount on this object! please!" (02/15/20)
 * @format
 */

import { AppRegistry } from 'react-native'
import App from 'Gruvee/App'
import ReduxProvider from 'Gruvee/components/ReduxProvider'
import { enableScreens } from 'react-native-screens'
import { name as appName } from './app.json'

enableScreens()
AppRegistry.registerComponent(appName, () => ReduxProvider(App))
