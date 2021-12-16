
import { FaSignInAlt, FaHeadset,FaHandHoldingMedical, FaTh, FaNotesMedical, FaCogs, FaUserMd,FaVial,FaProcedures,FaArchway} from "react-icons/fa";

export const SidebarMenus =[
    {
        id:1,
        name:"Dashboard",
        path: '/doctorDashboard',
        icon: <FaTh/>
    },
    {
        id:2,
        name:"Request Lab Test",
        path: '/LabRequestUser',
        icon: <FaHandHoldingMedical/>
    },
    {
        id: 3,
        name:"Prescribe Drugs",
        path: '/PrescribeDrugsUser',
        icon: <FaNotesMedical/>
    },
    {
        id: 4,
        name:"Drug Prescription History",
        path: '/DrugHistoryDoctor',
        icon: <FaUserMd/>
    },
    {
        id: 5,
        name:"Consultation",
        path: '/Consultations',
        icon: <FaHeadset/>
    },

    {
        id:6,
        name:"Lab Request History",
        path: '/RequestHistoryDoctor',
        icon: <FaVial/>
    },
]

