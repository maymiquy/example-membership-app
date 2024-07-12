import { LayoutGrid, Newspaper, SquarePlay } from "lucide-react";

const getMenu = (pathname) => {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    label: 'Dashboard',
                    href: '/dashboard',
                    active: pathname.includes('/dashboard'),
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
                    active: pathname.includes('/dashboard/article'),
                    icon: Newspaper,
                    submenus: []
                },
                {
                    label: 'Videos',
                    href: '/dashboard/video',
                    active: pathname.includes('/dashboard/video'),
                    icon: SquarePlay,
                    submenus: []
                }
            ]
        },
    ]
}

export default getMenu;