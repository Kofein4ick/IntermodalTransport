import Registration from './components/Registration';
import Authorization from './components/Authorization';
import History from './components/History';
import Form from './components/Form';
import NoLogHistory from './components/NoLoginHistory';
import AdminPage from './components/AdminPage';
import { AUTH_ROUTE, REG_ROUTE, FORM_ROUTE,  HISTORY_ROUTE, ADMIN_ROUTE } from "./utils/consts"

export const authRoutes = [


    {
        path: HISTORY_ROUTE,
        Component: History
    }

    
]

export const adminRoutes = [


    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    }

    
]



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
        Component: NoLogHistory
    },

    {
        path: FORM_ROUTE,
        Component: Form
    }


    

]