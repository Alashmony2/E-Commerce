import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { autContext } from "../../contexts/autContext";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { NavLink } from "react-router-dom";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(autContext);
  const navigate = useNavigate();
  const menuItems = ["Home", "Categories", "Brands", "Cart"];

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
          <p className="font-bold text-inherit"><span><i className="fa-solid fa-cart-shopping pr-2"></i></span>FreshCart</p>
        </NavbarBrand>
      </NavbarContent>

      {isLoggedIn && 
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <NavLink
                color="foreground"
                to={item === "Home" ? "/" : "/" + item.toLowerCase()}
              >
                {item}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      }

      <NavbarContent justify="end">
        {isLoggedIn ? 
          <NavbarItem>
            <Button onPress={logout} color="danger" variant="flat">
              Sign Out
            </Button>
          </NavbarItem>
          : 
          <>
            <NavbarItem className="flex">
              <NavLink to="/login">Login</NavLink>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat">
                <NavLink to="/register">Sign Up</NavLink>
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
                to={item === "Home" ? "/" : "/" + item.toLowerCase()}
                size="lg"
              >
                {item}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
}
