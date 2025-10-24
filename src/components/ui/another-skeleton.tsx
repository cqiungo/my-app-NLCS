"use client"

import * as React from "react"
import { Skeleton, Stack, Box } from "@mui/material"

export default function Animations() {
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Stack spacing={2}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              border: "1px solid #eee",
              borderRadius: 2,
              p: 2,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
