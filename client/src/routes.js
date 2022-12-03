import Registration from './pages/Registration';
import Authorization from './pages/Authorization';
import History from './pages/History';
import Form from './pages/Form';
import NoLogHistory from './pages/NoLoginHistory';
import AdminPage from './pages/AdminPage';
import { AUTH_ROUTE, REG_ROUTE, FORM_ROUTE,  HISTORY_ROUTE, ADMIN_ROUTE} from "./utils/consts"

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
    },


    

]