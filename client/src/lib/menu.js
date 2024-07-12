import { LayoutGrid, Newspaper, SquarePlay } from "lucide-react";

const getMenu = (pathname) => {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    label: 'Dashboard',
                    href: '/dashboard',
                    active: pathname === ('/dashboard'),
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Contents",
            menus: [
                {
                    label: 'Articles',
                    href: '/dashboard/article',
                    active: pathname.includes('/article'),
                    icon: Newspaper,
                    submenus: []
                },
                {
                    label: 'Videos',
                    href: '/dashboard/video',
                    active: pathname.includes('/video'),
                    icon: SquarePlay,
                    submenus: []
                }
            ]
        },
    ]
}

export default getMenu;