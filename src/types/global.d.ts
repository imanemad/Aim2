interface IChildrenProps{
    children:React.ReactNode
}

interface IPageProps {
    params: {
        type: string
    }
}

interface IconProps {
    size?: number;          
    className?: string;    
    onClick?: ()=>void;  
}