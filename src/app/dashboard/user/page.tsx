'use client'

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import UserBoard from '../../components/UserBoard/userBoardPage'
export default function ManageUserPage(){
    return (
        <>
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                User's
            </Typography>
            <UserBoard></UserBoard>
        </Box>
        </>
    )
}