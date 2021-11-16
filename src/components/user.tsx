import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { signIn, signOut, useSession } from "next-auth/client";
import React from "react";

export const User: React.FC = () => {
  const [session] = useSession();
  return (
    <>
      <Box mr={4}>{session?.user?.name ? session.user.name : "Guest User"}</Box>
      {session?.user && typeof session.user.image === "string" && (
        <Box mr={4}>
          <Avatar size={"sm"} src={session.user.image} />
        </Box>
      )}
      {session ? (
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={400}
          variant={"link"}
          href={"#"}
          onClick={() => signOut()}
        >
          SIGN OUT
        </Button>
      ) : (
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={400}
          variant={"link"}
          href={"#"}
          onClick={() => signIn()}
        >
          SIGN IN
        </Button>
      )}
    </>
  );
};
