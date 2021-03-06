import React from 'react'
import { Box, Link, Flex } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from 'generated/graphql';
import { Button } from '@chakra-ui/react';
import { isServer } from 'utils/isServer';
interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery( {
        pause: isServer(),
    });
    let body = null;
 
    if (fetching) {
        body = null;
    } else if (!data?.me) {
        body = (
            <><NextLink href="/login">
                <Link mr={2} color="black">
                    Login
                </Link>
            </NextLink>
                <NextLink href="/register">
                    <Link color="black">
                        Register
                    </Link>
                </NextLink></>
        )
    } else {
        body = (
            <Flex>
                <Box mr="2">{data?.me.username}
                </Box>
                <Box>
                    <Button 
                    isLoading = { logoutFetching }
                    onClick={() => {
                        logout();
                    }}>Logout</Button>
                </Box>
            </Flex>

        );
    }
    return (
        <Flex zIndex = {2} bg="gray" padding={2} ml="auto" position= "sticky">

            <Box ml={"auto"}>
                {body}
            </Box>

        </Flex>
    );
}

export default NavBar;