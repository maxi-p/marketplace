/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import TestApp from './TestApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => TestApp);
// Temp set to TestApp
