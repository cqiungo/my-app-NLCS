import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useRouter, usePathname } from 'next/navigation'; // App Router
import { ChartBarStacked,Smartphone  } from 'lucide-react';


const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: "/dashboard" },
  { text: 'Người dùng', icon: <PeopleRoundedIcon />, path: "/dashboard/user" },
  { text: 'Đơn hàng', icon: <AssignmentRoundedIcon />, path: "/dashboard/orders" },
  { text: 'Sản phẩm', icon: <Smartphone />, path: "/dashboard/product" },
  { text: 'Danh mục', icon: <ChartBarStacked />, path: "/dashboard/category" },
];


export default function MenuContent() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => router.push(item?.path)}
              selected={pathname === item?.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
