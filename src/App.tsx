
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { Layout } from './Layout';
import { dataProvider } from './providers/dataProvider';
import { authProvider } from './providers/authProvider';


export const App = () => (
    <Admin
        layout={Layout}
        dataProvider={dataProvider}
		authProvider={authProvider}
	>
		<Resource name="boards" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
		<Resource name="columns" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
		<Resource name="cards" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
        <Resource name="users" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    </Admin>
);

    