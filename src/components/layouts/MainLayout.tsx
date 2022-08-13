import { FaGithubSquare, FaNewspaper } from "react-icons/fa";
import Logo from "../Logo/Logo";
import {
  Button,
  chakra,
  Icon,
  Link as ChakraLink,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLogOut } from "react-icons/fi";
import { ThreeDots } from "react-loader-spinner";

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="w-screen p-2 flex flex-wrap space-x-4 space-y-2 mx-auto bg-[#2A2827] shadow-md">
          <div className="flex-grow">
            {" "}
            <Logo />
          </div>
          <div className="flex space-x-2">
            <ChakraLink
              isExternal
              className="mr-0 ml-auto flex"
              textDecoration={"none"}
              href="https://github.com/flaviojmendes/trilhadev"
            >
              <FaGithubSquare className="m-auto w-8 h-8 text-yellow" />
              <span className="my-auto text-lg ml-1 text-yellow hidden md:block">
                Github
              </span>
            </ChakraLink>
            <span className="text-yellow m-auto align-middle text-3xl">|</span>
            <ChakraLink
              isExternal
              className="mr-0 ml-auto flex"
              textDecoration={"none"}
              href="https://www.getrevue.co/profile/flaviojmendes"
            >
              <FaNewspaper className="m-auto w-8 h-8 text-yellow" />
              <span className="my-auto text-lg ml-1 text-yellow hidden md:block">
                Assine a Newsletter
              </span>
            </ChakraLink>
            <span className="text-yellow m-auto align-middle text-3xl">|</span>
            {isAuthenticated && (
              <>
                <div className="w-200 flex text-yellow align-middle">
                  <img
                    className="m-auto rounded-full w-10 h-10"
                    src={user?.picture}
                    alt={user?.name}
                  />
                  <span className="m-auto ml-2">{user?.name}</span>
                </div>
                <Button margin={'auto'}
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Button>
              </>
            )}

            {!isAuthenticated && !isLoading && (
              <Button margin={'auto'} onClick={() => loginWithRedirect()}>Log In</Button>
            )}
            {isLoading && (
              <ThreeDots
                height="30"
                width="30"
                radius="9"
                color="#d56a47"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            )}
          </div>
        </div>
        <div className="w-screen flex-grow py-1 mx-auto mt-0 mb-10">
          {children}
        </div>
        <footer className="text-center py-4 w-screen bg-dark-brown">
          
          <span className="c-brown">Idealizado por </span>
          <ChakraLink
            isExternal
            color={"#ee8561"}
            href="https://github.com/flaviojmendes"
          >
            flaviojmendes
          </ChakraLink>
          <span className="c-brown">
            {" "}
            e mantido pela{" "}
            <Link style={{ color: "#ee8561" }} to={"/roadmap/community"}>
              comunidade
            </Link>
            .
          </span>
        </footer>
      </div>
    </>
  );
}
