"use client"

import type React from "react"
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Box,
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  Restaurant as RestaurantIcon,
  Close as CloseIcon,
} from "@mui/icons-material"
import { styled, alpha } from "@mui/material/styles"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))

interface FoodHeaderProps {
  cartItemCount?: number
  onSearch?: (query: string) => void
  onCartClick?: () => void
  onLoginClick?: () => void
  isLoggedIn?: boolean
  userName?: string
}

export default function FoodHeader({
  cartItemCount = 0,
  onSearch,
  onCartClick,
  onLoginClick,
  isLoggedIn = false,
  userName = "User",
}: FoodHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
    onSearch?.(query)
  }

  const menuItems = [
    { label: "Thực đơn", href: "/menu" },
    { label: "Khuyến mãi", href: "/promotions" },
    { label: "Về chúng tôi", href: "/about" },
    { label: "Liên hệ", href: "/contact" },
  ]

  const renderMobileMenu = (
    <Drawer anchor="left" open={mobileMenuOpen} onClose={handleMobileMenuToggle}>
      <Box sx={{ width: 250, pt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ color: "primary.main", fontWeight: "bold" }}>
            Menu
          </Typography>
          <IconButton onClick={handleMobileMenuToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} component="a" href={item.href}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {isLoggedIn
        ? [
            <MenuItem key="profile" onClick={handleMenuClose}>
              Hồ sơ
            </MenuItem>,
            <MenuItem key="orders" onClick={handleMenuClose}>
              Đơn hàng của tôi
            </MenuItem>,
            <MenuItem key="logout" onClick={handleMenuClose}>
              Đăng xuất
            </MenuItem>,
          ]
        : [
            <MenuItem
              key="login"
              onClick={() => {
                handleMenuClose()
                onLoginClick?.()
              }}
            >
              Đăng nhập
            </MenuItem>,
            <MenuItem key="register" onClick={handleMenuClose}>
              Đăng ký
            </MenuItem>,
          ]}
    </Menu>
  )

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#ff6b35" }}>
        <Toolbar>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMobileMenuToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: isMobile ? 1 : 0 }}>
            <RestaurantIcon sx={{ mr: 1 }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: "bold", color: "white" }}>
              FoodOrder
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", ml: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  href={item.href}
                  sx={{ mx: 1, "&:hover": { backgroundColor: alpha("#fff", 0.1) } }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          {!isMobile && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm món ăn..."
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Search>
          )}

          {/* Cart */}
          <IconButton color="inherit" onClick={onCartClick} sx={{ mx: 1 }}>
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User Account */}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {isLoggedIn ? (
              <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <AccountCircleIcon />
            )}
          </IconButton>
        </Toolbar>

        {/* Mobile Search */}
        {isMobile && (
          <Box sx={{ px: 2, pb: 1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm món ăn..."
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
              />
            </Search>
          </Box>
        )}
      </AppBar>

      {renderMobileMenu}
      {renderProfileMenu}
    </>
  )
}
