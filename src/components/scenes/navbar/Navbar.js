import
{
    Close,
    DarkMode,
    Help,
    LightMode,
    Menu,
    Message,
    Notifications,
    Search
} from "@mui/icons-material";
import
{
    Box,
    FormControl,
    IconButton,
    InputBase,
    MenuItem,
    Select,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import FlexBetween from "components/FlexBetween/FlexBetween";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { setMode, setLogout } from 'state';



const Navbar = ( { isProfile = false } ) =>
{
    const [ isMobileMenuToggled, setIsMobileMenuToggled ] = useState( false );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector( ( state ) => state.user );



    const isNonMobileScreen = useMediaQuery( "(min-width: 1000px)", { noSsr: true } );

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const alt = theme.palette.background.alt;
    const [ search, setSearch ] = useState( "" );

    const fullName = `${ user.firstName } ${ user.lastName }`;

    const handleSearch = async () =>
    {
        console.log( search );
    };



    return (
        <FlexBetween padding="1rem 6%" backgroundColor={ alt }>
            <FlexBetween gap="1.7rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    onClick={ () => navigate( "/home" ) }
                    sx={ {
                        "&:hover": {
                            color: "#0D4C92",
                            cursor: "pointer",
                        }, color: "#790252"
                    } }
                >
                    Media-Lib
                </Typography>
                {
                    isProfile ? " " : (
                        isNonMobileScreen && (
                            <FlexBetween background={ neutralLight } borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                                <InputBase placeholder="Search..." sx={ { color: "#A10035", fontWeight: "bold" } } onChange={ ( e ) => setSearch( e.target.value ) } />
                                <IconButton onClick={ () => handleSearch() } >
                                    <Search sx={ { color: "#D2001A", "&:hover": { color: "#21E1E1" } } } />
                                </IconButton>
                            </FlexBetween>
                        )
                    )
                }
            </FlexBetween>

            {/* Desktop Nav */ }
            { isNonMobileScreen ? (
                <FlexBetween gap="2rem">
                    {
                        isProfile ? " " : (
                            <IconButton onClick={ () => dispatch( setMode() ) }>
                                {
                                    theme.palette.mode === "dark" ? (
                                        <DarkMode sx={ { fontSize: "25px" } } data-tooltip-id="dark-tooltip" data-tooltip-content="Dark Mode" />
                                    ) : (
                                        <LightMode sx={ { color: dark, fontSize: "25px" } } data-tooltip-id="light-tooltip" data-tooltip-content="Light Mode" />

                                    )
                                }
                                <Tooltip id="dark-tooltip" />
                                <Tooltip id="light-tooltip" />
                            </IconButton >
                        )
                    }
                    <Message
                        sx={ {
                            "&:hover": { cursor: "pointer", color: "#3C79F5" },
                            fontSize: "25px", color: "#00337C"
                        } }
                        onClick={ () => navigate( `/message/${ user._id }` ) }
                        data-tooltip-id="message-tooltip"
                        data-tooltip-content="Message"
                    />
                    <Tooltip id="message-tooltip" />
                    <Notifications
                        sx={ {
                            "&:hover": { cursor: "pointer", color: "#FF0032" },
                            fontSize: "25px", color: "#820000"
                        } }
                        onClick={ () => navigate( `/notification/${ user._id }` ) }
                        data-tooltip-id="notification-tooltip" data-tooltip-content="Notifications"
                    />
                    <Tooltip id="notification-tooltip" />

                    {
                        isProfile ? " " : (
                            <>
                                <Help
                                    sx={ {
                                        "&:hover": { cursor: "pointer", color: "#6ECCAF" },
                                        fontSize: "25px", color: "#68B984"
                                    } }
                                    onClick={ () => navigate( "/help-center" ) }
                                    data-tooltip-id="help-tooltip"
                                    data-tooltip-content="Help"
                                />
                                <Tooltip id="help-tooltip" />
                            </>
                        )
                    }

                    <FormControl variant="standard" value={ fullName }>
                        <Select value={ fullName }
                            sx={ {
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }

                            } }

                            input={ <InputBase /> }
                        >
                            <MenuItem value={ fullName }>
                                <Typography>{ fullName }</Typography>
                            </MenuItem>

                            <MenuItem onClick={ () =>
                            {
                                dispatch( setLogout() );
                            } }>
                                Log Out
                            </MenuItem>

                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={ () => setIsMobileMenuToggled( !isMobileMenuToggled ) }>
                    <Menu />
                </IconButton>
            ) }

            {/* Mobile Nav */ }
            {
                !isNonMobileScreen && isMobileMenuToggled && (
                    <Box
                        position="fixed"
                        right="0"
                        bottom="0"
                        height="100%"
                        zIndex="10"
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor={ background }
                    >
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton onClick={ () => setIsMobileMenuToggled( !isMobileMenuToggled ) }>
                                <Close />
                            </IconButton>
                        </Box>
                        {/* Menu Items */ }
                        <FlexBetween
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            gap="2rem">
                            <IconButton onClick={ () => dispatch( setMode() ) }
                                sx={ { fontSize: "25px" } }
                            >
                                {
                                    theme.palette.mode === "dark" ? (
                                        <DarkMode sx={ { fontSize: "25px" } } />
                                    ) : (
                                        <LightMode sx={ { color: dark, fontSize: "25px" } } />
                                    )
                                }
                            </IconButton >
                            <Message sx={ { fontSize: "25px" } } />
                            <Notifications sx={ { fontSize: "25px" } } />
                            <Help sx={ { fontSize: "25px" } } />
                            <FormControl variant="standard" value={ fullName }>
                                <Select value={ fullName }
                                    sx={ {
                                        backgroundColor: neutralLight,
                                        width: "150px",
                                        borderRadius: "0.25rem",
                                        p: "0.25rem 1rem",
                                        "& .MuiSvgIcon-root": {
                                            pr: "0.25rem",
                                            width: "3rem"
                                        },
                                        "& .MuiSelect-select:focus": {
                                            backgroundColor: neutralLight
                                        }

                                    } }

                                    input={ <InputBase /> }
                                >
                                    <MenuItem value={ fullName }>
                                        <Typography>{ fullName }</Typography>
                                    </MenuItem>

                                    <MenuItem onClick={ () => dispatch( setLogout() ) }>
                                    </MenuItem>

                                </Select>
                            </FormControl>
                        </FlexBetween>
                    </Box>
                )
            }
        </FlexBetween>
    );
};

export default Navbar;