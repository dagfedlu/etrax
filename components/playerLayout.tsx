"use client"

import { Box } from "@chakra-ui/layout"
import Sidebar from "./sidebar"

const PlayerLayout = ({ children }: any) => {
  return (
    // main
    <Box width="100vw" height="100vh">
      {/* sidebar */}
      <Box position="absolute" top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      {/* main content */}
      <Box marginLeft="250px" marginBottom="100px">
        {children}
      </Box>
      {/* play bar */}
      <Box position="absolute" left="0" bottom="0">
        Play Bar
      </Box>
    </Box>
  )
}

export default PlayerLayout
