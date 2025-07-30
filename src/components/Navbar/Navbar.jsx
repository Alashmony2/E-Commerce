import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { autContext } from "../../contexts/autContext";
import { counterContext } from "../../contexts/counterContext";
import { useTheme } from "../../contexts/themeContext";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Badge,
} from "@heroui/react";
import { NavLink } from "react-router-dom";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(autContext);
  const { counter } = useContext(counterContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const menuItems = ["Home", "Categories", "Brands", "Whish List"];

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit dark:text-white"><span><i className="fa-solid fa-cart-shopping pr-2 text-blue-600 dark:text-blue-400"></i></span>FreshCart</p>
        </NavbarBrand>
      </NavbarContent>

      {isLoggedIn &&
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <NavLink
                color="foreground"
                to={item === "Home" ? "/" : "/" + item.toLowerCase().trim().replace(/\s+/g, "-").replace("whish-list", "whishlist")}
              >
                {item}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      }

      <NavbarContent justify="end">
        {isLoggedIn ?
          <>
            <NavbarItem>
              <Link 
                to="/cart" 
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                <Badge 
                  content={counter} 
                  color="warning" 
                  isInvisible={counter === 0}
                  className="text-white"
                >
                  <i className="fa-solid fa-cart-shopping text-blue-600 dark:text-blue-400 text-lg"></i>
                </Badge>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button 
                isIconOnly
                variant="light"
                onPress={toggleTheme}
                className="text-default-500 hover:text-default-700 dark:text-default-400 dark:hover:text-default-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <i className="fa-solid fa-sun text-lg"></i>
                ) : (
                  <i className="fa-solid fa-moon text-lg"></i>
                )}
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button onPress={logout} color="danger" variant="flat">
                Sign Out
              </Button>
            </NavbarItem>
          </>
          :
          <>
            <NavbarItem>
              <Button 
                isIconOnly
                variant="light"
                onPress={toggleTheme}
                className="text-default-500 hover:text-default-700 dark:text-default-400 dark:hover:text-default-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <i className="fa-solid fa-sun text-lg"></i>
                ) : (
                  <i className="fa-solid fa-moon text-lg"></i>
                )}
              </Button>
            </NavbarItem>
            <NavbarItem className="flex">
              <NavLink to="/login" className="text-foreground dark:text-white">Login</NavLink>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat">
                <NavLink to="/register" className="text-primary dark:text-primary-400">Sign Up</NavLink>
              </Button>
            </NavbarItem>
          </>
        }
      </NavbarContent>

      {isLoggedIn && (
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              onClick={() => setIsMenuOpen(false)}
              key={`${item}-${index}`}
            >
              <NavLink
                className="w-full"
                color={"foreground"}
                to={item === "Home" ? "/" : "/" + item.toLowerCase().trim().replace(/\s+/g, "-").replace("whish-list", "whishlist")}
                size="lg"
              >
                {item}
              </NavLink>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem
            onClick={() => setIsMenuOpen(false)}
            key="cart"
          >
            <Link
              to="/cart"
              className="w-full flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Badge 
                content={counter} 
                color="warning" 
                isInvisible={counter === 0}
                className="text-white"
              >
                <i className="fa-solid fa-cart-shopping text-blue-600 dark:text-blue-400 text-lg"></i>
              </Badge>
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      )}
    </Navbar>
  );
}
