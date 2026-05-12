import { FaRegUser, FaHistory, FaRegTrashAlt, FaCheck, FaThermometerHalf, FaEye, FaEyeSlash } from "react-icons/fa";
import { LuLayoutDashboard, LuBookText, LuWeight, LuBriefcaseBusiness } from "react-icons/lu";
import { GoGear } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { MdDateRange, MdEdit, MdHorizontalRule, MdOutlinePalette, MdAlternateEmail } from "react-icons/md";
import { IoIosMenu, IoMdClose, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { SiStagetimer } from "react-icons/si";
import { CiSearch, CiStar, CiBellOn } from "react-icons/ci";
import { BiBarChartAlt } from "react-icons/bi";
import { MdOutlineDataUsage } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { BsDroplet } from "react-icons/bs";
import { GiRemedy } from "react-icons/gi";




export const icons = {
    "usuario": <FaRegUser />,
    "senha": <TbLockPassword />,
    "dashboard": <LuLayoutDashboard />,
    "historico": <FaHistory />,
    "manual": <LuBookText />,
    "configuracoes": <GoGear />,
    "adicionar": <IoAddCircleOutline />,
    "calendario": <MdDateRange />,
    "menu": <IoIosMenu />,
    "avaliacoes": <SiStagetimer />,
    "fechar": <IoMdClose />,
    "editar": <MdEdit />,
    "lixeira": <FaRegTrashAlt />,
    "lupa": <CiSearch />,
    "check": <FaCheck />,
    "negativo": <MdHorizontalRule />,
    "estrela": <CiStar />,
    "seta_direita": <IoIosArrowForward />,
    "seta_esquerda": <IoIosArrowBack />,
    "paleta": <MdOutlinePalette />,
    "termometro": <FaThermometerHalf />,
    "peso": <LuWeight />,
    "sino": <CiBellOn />,
    "cargo": <LuBriefcaseBusiness />,
    "grafico": <BiBarChartAlt />,
    "grafico2": <MdOutlineDataUsage />,
    "email": <MdAlternateEmail />,
    "olhoAberto": <FaEye />,
    "olhoFechado": <FaEyeSlash />,
    "coracao": <FaHeartbeat /> ,
    "gota": <BsDroplet /> , 
    "remedio": <GiRemedy />
}