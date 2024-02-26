
"use client"
import user from '../public/assets/Images/user-header.png'
import searchIcon from '../public/assets/Images/search.png'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import Popper from '@mui/material/Popper';
import Grow from "@mui/material/Grow";
import Box from '@mui/material/Box';
import { Avatar, ClickAwayListener, useTheme } from '@mui/material';
import chip from '../public/assets/Images/Coins/chip.png'
import coin from '../public/assets/Images/Coins/coin.png'
import fire from '../public/assets/Images/Coins/fire.png'
import lightning from '../public/assets/Images/Coins/lightning.png'

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import StarRateIcon from '@mui/icons-material/StarRate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import useApiService from '@/services/ApiService';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Toggle from '@/app/(pages)/themeToggle/Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '@/app/Redux/slice/userSlice';

const drawerWidth = 240;

const drawerData = [
    {
        name: "Home",
        icon: OtherHousesIcon
    },
    {
        name: "Bookmark",
        icon: "2",
    },
    {
        name: "Package",
        icon: "2",
    },
    {
        name: "Resource",
        icon: "2",
    },
]
function Header(props) {
    const router = useRouter();
    const pathname = usePathname()
    const [searchData, setSearchData] = useState([])
    const [profiledata, setProfiledata] = useState()
    const { searchApi, getProfile, notificationUnsubscribe } = useApiService()
    const [localStorageToken, setLocalStorageToken] = useState(false)
    const [debounceTime, setDebounceTime] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [novelOptions, setNovelOptions] = useState([])
    const [searchToggle, setSearchToggle] = useState(false)
    const theme = useTheme();
    const [darkMode, setDarkMode] = useState(false)
    const darkModeData = useSelector((state) => state?.user?.darkModeTheme)
    const dispatch = useDispatch()
    const [placement, setPlacement] = useState('bottom-end')

    // const handleClick = (event) => {
    //     console.log(localStorageToken ? "abc" : "xyz");
    //     if (localStorageToken) {
    //         router.push('/login')
    //     } else {
    //         setAnchorEl(anchorEl ? null : event.currentTarget);
    //     }
    // };

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (darkModeData === "dark") setDarkMode(true)
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem("theme", "dark")
            dispatch(THEME('dark'))
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem("theme", "light")
            dispatch(THEME('light'))
        }
    }, [darkMode])

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    }

    // drawer
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className='dark:bg-gray-800 h-full dark:text-gray-100'>
            <Box className='pl-2 pb-1' >
                <IconButton onClick={handleDrawerToggle}>
                    {theme.direction === 'ltr' ? <CloseIcon /> : <CloseIcon />}
                </IconButton>
            </Box>
            {/* <Toolbar /> */}
            {/* <Divider /> */}
            <Box className='dark:bg-white' sx={{ display: 'flex', justifyContent: "center", alignItems: "center", border: 1, borderRadius: "8px", borderColor: "gray", width: "90%", margin: 'auto' }}>
                <Image src={searchIcon} alt='' className='h-4 w-4' />
                <Autocomplete
                    id="Search"
                    freeSolo
                    loading={isSearching}
                    options={novelOptions}
                    onChange={(e, item) => item !== null && router.push(`/novel-list/${item?.label}`)}
                    onInput={(inputValue) => {
                        setIsSearching(true)
                        handleSearchNovel(inputValue)
                    }}
                    renderInput={(params) => <TextField {...params} placeholder='search' className='w-full focus:outline-none' />}
                    className='focus:outline-none w-[90%] px-2 text-sm' placeholder='search..' />
            </Box>
            <List>
                <ListItem disablePadding sx={{ display: "flex", flexDirection: "column" }} >
                    <ListItemButton sx={{ borderBottom: "1px solid gray", width: "100%" }} onClick={() => {
                        router.push('/novel-list/latest')
                        setMobileOpen(false)
                    }}>
                        <ListItemIcon><FilterAltIcon className='dark:text-white' /> </ListItemIcon>
                        <ListItemText primary="Series" />
                    </ListItemButton>
                    <ListItemButton sx={{ borderBottom: "1px solid gray", width: "100%", }} onClick={() => {
                        router.push('/ranking/views')
                        setMobileOpen(false)
                    }}>
                        <ListItemIcon><StarIcon className='dark:text-white' /> </ListItemIcon>
                        <ListItemText primary="Ranking" />
                    </ListItemButton>
                    <ListItemButton sx={{ borderBottom: "1px solid gray", width: "100%" }} onClick={() => {
                        router.push('/package')
                        setMobileOpen(false)
                    }}>
                        <ListItemIcon><AttachMoneyIcon className='dark:text-white' /> </ListItemIcon>
                        <ListItemText primary="Package" />
                    </ListItemButton>
                    <ListItemButton sx={{ borderBottom: "1px solid gray", width: "100%", }} onClick={() => {
                        router.push('/resources')
                        setMobileOpen(false)
                    }}>
                        <ListItemIcon><MenuBookIcon className='dark:text-white' /> </ListItemIcon>
                        <ListItemText primary="Resource" />
                    </ListItemButton>

                </ListItem>
            </List>
            {/* <Divider /> */}
        </div>
    );

    var container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getProfile().then((res) => {
                setProfiledata(res?.data?.data)
            }).catch((er) => {
                console.log(er, "er profile");
            })
        }
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token == null) {
            setLocalStorageToken(true)
        } else {
            setLocalStorageToken(false)
        }
    }, [pathname, localStorageToken])

    function handleSearchNovel(searched) {
        if (!searched) {
            setNovelOptions([])
            setIsSearching(false)
        } else {
            if (debounceTime) {
                clearTimeout(debounceTime)
            }
            setDebounceTime(
                setTimeout(() => {
                    const url = `page=1&limit=10&filter[search]=${searched.target.value}&filter[genre]=${""}&filter[type]=${""}&filter[novelStatus]=${""}`
                    searchApi(url).then(res => {
                        if (res?.data?.status) {
                            const novels = []
                            res?.data?.data?.novels?.data?.forEach(novel => {
                                novels.push({ id: novel?._id, label: novel?.title + " - Novel" })
                            })
                            const genre = []
                            res?.data?.data?.genres?.forEach(novel => {
                                genre.push({ id: novel?._id, label: novel?.name + " - Genre" })
                            })
                            const authors = []
                            res?.data?.data?.authors?.data?.forEach(novel => {
                                novels.push({ id: novel?._id, label: novel?.name + " - Author" })
                            })
                            setNovelOptions([...novels, ...authors, ...genre])
                        }
                    }).catch(err => console.log(err)).finally(() => setIsSearching(false))
                }, 1000)
            )
        }
    }

    const searchRef = useRef();

    useEffect(() => {
        const handleSearchClose = (e) => {
            if (searchRef?.current && !searchRef.current.contains(e.target)) {
                setSearchToggle(false);
            }
        };

        document.addEventListener("mousedown", handleSearchClose);

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener("mousedown", handleSearchClose);
        };
    }, []);
    // router.push(`/novel-list/${item?.label}`)

    const notificationUnsbscribeApi = () => {
        notificationUnsubscribe().then((res) => {
            console.log(res, "res");
        }).catch((er) => {
            console.log(er);
        })
    }

    const handleAutocompleteChange = (e, item) => {
        if (item !== null) {
            let route;
            if (item.label.includes('- Novel')) {
                route = `/detail/${item.id}`;
            } else if (item.label.includes('- Author')) {
                route = `/authorProfile/${item.id}`;
            } else {
                route = `/novel-list/${item.label}`;
            }
            setSearchToggle(false); // Close the search
            router.push(route);
        }
    };

    return (
        <div className='bg-[#FFFFFF] text-black  dark:bg-[#202020] dark:text-white fixed inset-x-0 top-0 w-full z-40 shadow-xl'>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                anchor="right"
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%', height: '50%' },
                }}
            >
                {drawer}
            </Drawer>

            <div className='flex justify-between items-center px-5 pt-4 pb-4'>
                <div className='flex items-center'>
                    {/* <div className='block lg:hidden'>
                        <MenuIcon onClick={handleDrawerToggle} />
                    </div> */}
                    <div className='text-2xl cursor-pointer' onClick={() => router.push('/')}>JadeScroll</div>
                </div>

                <div className='hidden md:flex justify-center items-center w-full'>
                    {searchToggle ?
                        <>
                            <Autocomplete
                                // ref={searchRef}
                                id="Search"
                                freeSolo
                                loading={isSearching}
                                options={novelOptions}
                                disablePortal={true}
                                className='text-center flex justify-end dark:bg-gray-700 bg-gray-200 text-white inputWidth outline-none pl-3 rounded-full  focus:outline-none border-none z-50'
                                // onChange={(e, item) => item !== null && item?.label.includes('- Novel') ? router.push(`/detail/${item?.id}`)
                                //     : item?.label.includes('- Author') ? router.push(`/authorProfile/${item?.id}`) : router.push(`/novel-list/${item?.label}`)}
                                onChange={handleAutocompleteChange}
                                onInput={(inputValue) => {
                                    setIsSearching(true)
                                    handleSearchNovel(inputValue)
                                }}
                                renderInput={(params) => <TextField
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                {params.InputProps.startAdornment}
                                                <IconButton>
                                                    {/* Insert icon for search here */}
                                                </IconButton>
                                            </>
                                        ),
                                    }}
                                    placeholder='search by novel, genre, author' {...params} className='text-white w-full focus:outline-none border' />}
                            />
                        </>
                        :
                        <div className='lg:flex items-center hidden'>
                            <div className='md:gap-x-12 lg:flex pl-20'>
                                {/* <div onClick={() => router.push('/')} className='cursor-pointer hover:font-semibold hover:text-lg'>Home</div> */}
                                {/* <div onClick={() => router.push('/bookmark')} className='cursor-pointer hover:font-semibold hover:text-lg'>Bookmarks</div> */}
                                <div className='cursor-pointer hover:text-blue-500' onClick={() => router.push('/novel-list/latest')}>Series</div>
                                <div className='cursor-pointer hover:text-blue-500' onClick={() => router.push('/ranking/views')}>Ranking</div>
                                <div className='cursor-pointer hover:text-blue-500' onClick={() => router.push('/package')}>Packages</div>
                                <div onClick={() => router.push('/resources')} className='cursor-pointer hover:text-blue-500'>Resources</div>
                            </div>
                        </div>}
                </div>
                <div className='flex items-center gap-x-4'>
                    <div className='hidden lg:block'>
                        {searchToggle ?
                            <CloseIcon onClick={() => setSearchToggle(false)} className='cursor-pointer' /> :
                            <SearchIcon className='cursor-pointer hover:text-blue-600' onClick={() => setSearchToggle(true)} />
                        }
                    </div>
                    {/* <ThemeToggle /> */}
                    {/* <div className='rounded-full dark:bg-gray-700 bg-white md:flex items-center px-2 hidden'>
                        <Image src={searchIcon} alt='' className='h-4 w-4' />
                        <Autocomplete
                            id="Search"
                            freeSolo
                            loading={isSearching}
                            options={novelOptions}
                            className='dark:bg-gray-700 bg-white text-white outline-none pl-3 rounded-full  focus:outline-none border-none'
                            onChange={(e, item) => item !== null && router.push(`/novel-list/${item?.label}`)}
                            onInput={(inputValue) => {
                                setIsSearching(true)
                                handleSearchNovel(inputValue)
                            }}
                            renderInput={(params) => <TextField {...params} className='text-white w-full focus:outline-none border' />}
                        />
                    </div> */}

                    {!localStorageToken && <div>
                        <BookmarksIcon onClick={() => router.push('/bookmark')} titleAccess='Bookmark' className='cursor-pointer hover:text-blue-600' />
                    </div>}

                    <div>
                        <PersonIcon onClick={() => localStorageToken ? router.push('/login') : handleToggle()}
                            id="composition-button"
                            aria-controls={open ? "composition-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            ref={anchorRef}
                            fontSize='large'
                            sx={{ cursor: "pointer" }}
                            className='hover:text-blue-600' />
                    </div>
                    <div className='block lg:hidden'>
                        <MenuIcon onClick={handleDrawerToggle} />
                    </div>
                </div>
            </div>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps}>
                        <Box sx={{ p: 1, mt: 1, mr: 1, width: '260px' }} className='text-gray-100'>
                            <ClickAwayListener onClickAway={handleClose}>
                                <div
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                    className='p-3 bg-gray-800 rounded-md z-10'>
                                    <div className='flex items-center'>
                                        {profiledata?.profileImg == null ? <Avatar /> :
                                            <Image src={profiledata?.profileImg} height={100} width={100} className='h-14 w-14 rounded-full' />}
                                        <div className='pl-3'>
                                            <div className='font-semibold capitalize'>{profiledata?.name ? profiledata?.name : "---"}</div>
                                            {/* <div className='flex justify-between gap-6'>
                                                <div className='flex items-center'>
                                                    <Image src={chip} className='w-5 h-5 mr-[6px]' />
                                                    <span>0</span>
                                                </div>
                                                <div className='flex items-center'>
                                                    <Image src={lightning} className='w-6 h-7 mr-[5px]' />
                                                    <span>2</span>
                                                </div>
                                                <div className='flex items-center'>
                                                    <Image src={fire} className='w-5 h-5 mr-[6px]' />
                                                    <span>1</span>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center pt-5 px-2'>
                                        <div className='flex items-center'>
                                            <Image src={coin} className='w-4 h-4 mr-[6px]' />
                                            <span>0</span>
                                        </div>
                                        <button className='rounded-full px-3 py-1 text-sm coinsCard hover:underline' onClick={() => router.push('/package')}>GET MORE</button>
                                    </div>
                                    <div className='mt-3 border-2 rounded-md p-2 border-orange-500 coinsCard'>
                                        <div onClick={() => router.push('/becomeAuthor')} className='text-orange-400 cursor-pointer'>BECOME AN AUTHOR</div>
                                        {/* <div className='text-white text-sm pt-1 pb-2'>Get Extra 60% Bonus</div> */}
                                        {/* <button className='text-sm mt-1 py-1 px-5 rounded-full bg-orange-600 text-white hover:underline'>GO</button> */}
                                    </div>
                                    <div className='pt-2 pl-2 leading-7 cursor-pointer'>
                                        <div onClick={() => {
                                            router.push('/profile')
                                            setOpen(false)
                                        }
                                        }>Settings</div>
                                        <div onClick={() => {
                                            router.push('/notification')
                                            setOpen(false)
                                        }}>Notification</div>
                                        <div onClick={() => {
                                            router.push('/purchaseHistory')
                                            setOpen(false)
                                        }}>Purchase History</div>
                                        <div onClick={() => {
                                            router.push('/faq')
                                            setOpen(false)
                                        }}>FAQ</div>
                                        <div onClick={() => {
                                            localStorage.removeItem('token')
                                            router.push('/login')
                                        }}>Log Out</div>
                                        <div className='flex justify-between'>
                                            <div>Mode</div>
                                            <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
                                        </div>
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </Box>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}
Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};
export default Header