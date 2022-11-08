import Registration from './components/Registration';
import Authorization from './components/Authorization';
import History from './components/History';
import Form from './components/Form';
import { AUTH_ROUTE, REG_ROUTE, FORM_ROUTE,  HISTORY_ROUTE } from "./utils/consts"

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Authorization
    },

    {
        path: REG_ROUTE,
        Component: Registration
    },

    {
        path: HISTORY_ROUTE,
        Component: History
    },

    {
        path: FORM_ROUTE,
        Component: Form
    }

]