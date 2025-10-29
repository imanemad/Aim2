import { IIconProps } from "@/types/iconProps";



export default function Logo({
    size = 48,
    color = "currentColor",
    className = "",
}: IIconProps){
    return (
        <svg
            width={size}
            height={size}
            fill={color}
            className={className}
            id="Layer_1" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 87.96 87.97">
            <path d="M86.79,43.98v2c.01-.38.01-.76.01-1.14,0-.29,0-.58-.01-.86Z"/>
            <g>
                <path d="M43.99,0C19.7,0,0,19.69,0,43.98s19.7,43.99,43.99,43.99c9.85,0,18.94-3.24,26.27-8.71v6.76h17.7v-42.9C87.5,19.22,67.99,0,43.99,0ZM44.11,69.89c-14.32,0-25.92-11.6-25.92-25.91s11.6-25.92,25.92-25.92,25.92,11.6,25.92,25.92-11.61,25.91-25.92,25.91Z"/>
                <circle cx="44.36" cy="43.12" r="15" transform="translate(-12.45 67.6) rotate(-67.5)"/>
            </g>
        </svg>
    )
}
