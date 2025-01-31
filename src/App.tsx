
import { Admin, Resource } from 'react-admin';
import { Layout } from './Layout';
import { dataProvider } from './providers/dataProvider';
import { authProvider } from './providers/authProvider';
import { BoardList } from './boards/BoardList';
import { BoardShow } from './boards/BoardShow';


export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    title="SupaBoards"
  >
    <Resource name="boards" list={BoardList} show={BoardShow} />
  </Admin>
);

    