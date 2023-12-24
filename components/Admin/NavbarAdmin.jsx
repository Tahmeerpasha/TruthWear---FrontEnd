'use client'
import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { RxAvatar } from 'react-icons/rx'
import {
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { logout } from "@/api/authService";
import { DialogWithForm } from "../tailwind/DialogWithForm";
import { logoutUserAsync } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";

const getUser = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem('siteUser'));
    }
    return null;
}
const user = getUser();
console.log(user)




function NavList() {
    const router = useRouter()

    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:items-center lg:p-1">
            <Typography
                as="a"
                href="#"
                variant="small"
                color="white"
                className="font-medium"
                onClick={() => router.push('/admin/add-product')}
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">Add Products</ListItem>
            </Typography>
            <Typography
                as="a"
                href="#"
                variant="small"
                color="white"
                className="font-medium"
                onClick={() => router.push('/admin/products')}
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">View Products</ListItem>
            </Typography>
            <Typography
                as="a"
                href="#"
                variant="small"
                color="white"
                className="font-medium"
                onClick={() => router.push('/admin/orders')}
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Orders
                </ListItem>
            </Typography>
        </List>
    );
}

export function NavbarAdmin() {
    const router = useRouter()
    // const { loading, cartItems } = useSelector((state) => state.cart)


    const [openNav, setOpenNav] = React.useState(false);
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );

    }, []);

    const handleClick = (value) => {
        value === 'Login' ? router.push('/login') : router.push('/sign-up');
        console.log(value);
    }


    return (
        <Navbar className="max-w-full lg:fixed lg:z-50 lg:top-0 rounded-none  border-black bg-black text-white bg-opacity-100 " variant="filled">
            <div className="flex items-center justify-between" >
                <div className='flex w-[30%] p-1 hover:cursor-pointer' onClick={() => { router.replace('/') }}>
                    <Image height={1080} width={1080} src="/logo.svg" alt="logo" className='p-2 w-[15%]' />
                    <Image height={309} width={806} src="/white-logo.jpg" alt="logo" className='w-[25%]' />
                </div>

                <div className="hidden lg:block">
                    <NavList />
                </div>

                {user !== null ?
                    (
                        <ul className="flex space-x-5 justify-center items-center">
                            <li>
                                <ProfileMenu className="" />
                            </li>
                        </ul>
                    )
                    :
                    <div className="hidden gap-2 lg:flex">
                        <DialogWithForm />
                        <Button variant="gradient" size="sm" name="SignUp" onClick={() => handleClick("sign-up")}>
                            Sign Up
                        </Button>
                    </div>
                }
                <IconButton
                    variant="text"
                    color="white"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    <Button variant="outlined" size="sm" color="white" fullWidth>
                        Log In
                    </Button>
                    <Button variant="gradient" size="sm" fullWidth>
                        Sign Up
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}

const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];
function ProfileMenu() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);
    const handleClick = (label) => {
        if (label === 'Sign Out') {
            logout();
            dispatch(logoutUserAsync());
        } else {
            router.push('/' + label);
        }
        console.log(label);
    };

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <RxAvatar color="white" size={40} />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => { closeMenu; handleClick(label) }}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}