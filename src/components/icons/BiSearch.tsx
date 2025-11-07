
export default function BiSearch({ size = 16, className = "bi bi-search" }: IconProps) {
    return (
        <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 512 512" 
            width={size} 
            height={size} 
            className={className} 
            xmlns="http://www.w3.org/2000/svg">
            <path fill="none" strokeMiterlimit="10" strokeWidth="32" d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64z"></path>
            <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29 448 448"></path>
        </svg>
    );
}
