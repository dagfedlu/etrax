"use client"

import { Box, Flex, Input, Button } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useSWRConfig } from "swr"
import { auth } from "@/lib/mutations"
import { FC, useState } from "react"
import NextImage from "next/image"

const AuthForm: FC<{ mode: string }> = ({ mode }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo-svg.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <form>
          <Input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            bg="green.500"
            isLoading={isLoading}
            sx={{
              "&:hover": {
                bg: "green.300",
              },
            }}
          >
            {mode}
          </Button>
        </form>
      </Flex>
    </Box>
  )
}

export default AuthForm
