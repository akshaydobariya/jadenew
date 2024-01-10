"use client"
import user from '../public/assets/Images/user-header.png'
import searchIcon from '../public/assets/Images/search.png'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
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
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    // drawer
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List sx={{ marginTop: "14px" }}>
                <ListItem disablePadding sx={{ display: "flex", flexDirection: "column" }} >
                    <ListItemButton sx={{ borderBottom: "1px solid gray", width: "100%" }} onClick={() => {
                        router.push('/')
                        setMobileOpen(false)
                    }}>
                        <ListItemIcon><OtherHousesIcon /> </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton sx={{ borderBottom: "1px solid gray", width: "100%" }} onClick={() => {
                        router.push('/bookmark')
                        setMobileOpen(false)
                    }}>
                        <ListItemIcon><StarRateIcon /> </ListItemIcon>
                        <ListItemText primary="Bookmark" />
                    </ListItemButton>
                    <ListItemButton sx={{ borderBottom: "1px solid gray", width: "100%" }} onClick={() => {
                        router.push('/package')
                        setMobileOpen(false)
                    }}>
                        <ListItemIcon><AttachMoneyIcon /> </ListItemIcon>
                        <ListItemText primary="Package" />
                    </ListItemButton>
                    <ListItemButton sx={{ borderBottom: "1px solid gray", width: "100%", }} onClick={() => {
                        router.push('/resources')
                        setMobileOpen(false)
                    }}>
                        <ListItemIcon><MenuBookIcon /> </ListItemIcon>
                        <ListItemText primary="Resource" />
                    </ListItemButton>
                </ListItem>
            </List>
            {/* <Divider /> */}
        </div>
    );

    var container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className='bg-gray-900 text-white fixed inset-x-0 top-0 w-full z-[9999] shadow-sm'>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>

            <div className='flex justify-between items-center px-5 pt-4 pb-4'>
                <div className='flex items-center'>
                    <div className='block md:hidden'>
                        <MenuIcon onClick={handleDrawerToggle} />
                    </div>
                    <div className='text-2xl pl-3 cursor-pointer' onClick={() => router.push('/')}>Zscroll</div>
                </div>
                <div className='flex items-center'>
                    <div className='md:gap-x-12 hidden md:flex pl-20'>
                        <div onClick={() => router.push('/')} className='cursor-pointer hover:font-semibold hover:text-lg'>Home</div>
                        <div onClick={() => router.push('/bookmark')} className='cursor-pointer hover:font-semibold hover:text-lg'>Bookmarks</div>
                        <div className='cursor-pointer hover:font-semibold hover:text-lg' onClick={() => router.push('/package')}>Packages</div>
                        <div onClick={() => router.push('/resources')} className='cursor-pointer hover:font-semibold hover:text-lg'>Resources</div>
                    </div>
                </div>
                <div className='flex items-center gap-x-6'>
                    <div className='rounded-full bg-gray-700 md:flex items-center px-2 hidden'>
                        <Image src={searchIcon} alt='' className='h-4 w-4' />
                        <input type="search" placeholder='Search' className='bg-gray-700 text-black py-1 outline-none pl-3 rounded-full inputWidth' />
                    </div>
                    <div>
                        <PersonIcon onClick={handleClick} fontSize='large' sx={{ cursor: "pointer" }} />
                    </div>
                </div>
            </div>

            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ p: 1, mt: 1, mr: 1, width: '260px' }} className='text-gray-100'>
                    <div className='p-3 bg-gray-800 rounded-md z-10'>
                        <div className='flex items-center'>
                            <Avatar />
                            <div className='pl-3'>
                                <div className='font-semibold'>Rehan123</div>
                                <div className='flex justify-between gap-6'>
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
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center pt-5 px-2'>
                            <div className='flex items-center'>
                                <Image src={coin} className='w-4 h-4 mr-[6px]' />
                                <span>0</span>
                            </div>
                            <button className='rounded-full px-3 py-1 text-sm coinsCard hover:underline'>GET MORE</button>
                        </div>
                        <div className='mt-3 border-2 rounded-md p-2 border-orange-500 coinsCard'>
                            <div className='text-orange-400'>BECOME AN AUTHOR</div>
                            {/* <div className='text-white text-sm pt-1 pb-2'>Get Extra 60% Bonus</div> */}
                            {/* <button className='text-sm mt-1 py-1 px-5 rounded-full bg-orange-600 text-white hover:underline'>GO</button> */}
                        </div>
                        <div className='pt-2 pl-2 leading-7 cursor-pointer'>
                            <div onClick={() => router.push('/profile')}>Profile</div>
                            <div onClick={() => router.push('/notification')}>Notification</div>
                            <div>Purchase History</div>
                            <div>FAQ</div>
                            <div onClick={() => router.push('login')}>Log Out</div>
                        </div>
                    </div>
                </Box>
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