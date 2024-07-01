import { Newspaper } from 'lucide-react';
import { SquarePlay } from 'lucide-react';

const pricingList = {
    Basic: {
        article: {
            value: '3 Articles',
            icon: Newspaper,
        },
        video: {
            value: '3 Videos',
            icon: SquarePlay,
        }
    },
    Premium: {
        article: {
            value: '10 Articles',
            icon: Newspaper,
        },
        video: {
            value: '10 Videos',
            icon: SquarePlay,
        }
    },
    Platinum: {
        article: {
            value: 'Unlimited Articles',
            icon: Newspaper,
        },
        video: {
            value: 'Unlimited Videos',
            icon: SquarePlay,
        }
    }
}


export default pricingList