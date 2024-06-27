import { LayoutGrid, SquarePen, Tag } from "lucide-react";

const getMenu = (pathname) => {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    label: 'Dashboard',
                    href: '/dashboard/contents',
                    active: pathname.includes('/dashboard/contents'),
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
                    href: '/dashboard/articles',
                    active: pathname.includes('/dashboard/articles'),
                    icon: SquarePen,
                    submenus: []
                },
                {
                    label: 'Videos',
                    href: '/dashboard/videos',
                    active: pathname.includes('/dashboard/videos'),
                    icon: Tag,
                    submenus: []
                }
            ]
        },
    ]
}

export default getMenu;