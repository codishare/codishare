import { cn } from "@/lib/cn";
import Image from "next/image";

export default function ProfilePicture({
    icon,
    height = 48,
    width = 48,
    className
}: {
    icon: string;
    height?: number;
    width?: number;
    className?: string;
}) {
    return <Image
        src={ icon.replace(/\\/g, '/') }
        alt=""
        width={ width }
        height={ height } 
        onError={(e) => e.target.classList.add('hidden')}
        className={ cn('rounded-full shadow-lg aspect-square', className) }
    />
}