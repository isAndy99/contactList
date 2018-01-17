import { createThemedComponent } from '../utils';
import ContactsListApp from './ContactsList';

import theme from './theme.scss';

const ThemedContactsList = createThemedComponent('ContactsList', ContactsListApp, theme);

export default ThemedContactsList;
export { ContactsListApp };
export { ThemedContactsList as ContactsList };
