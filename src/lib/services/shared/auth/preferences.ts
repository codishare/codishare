import { ROLE, STACK } from "@/types/auth/_enums";

export default function validate({
    name,
    alias,
    stack,
    role,
    icon,
    banner
}: {
    name?: string,
    alias?: string,
    stack?: string,
    role?: string,
    icon?: File,
    banner?: File
}) { 
    // @ Validate name 
    if(!name) {
        return 'name';
    }

    if(typeof name !== 'string') {
        return 'invalid_format';
    }

    // @ Validate alias
    if(alias && typeof alias !== 'string') {
        return 'invalid_format';
    }

    // @ Validate stack
    if(!stack) {
        return 'stack';
    }

    if(typeof stack !== 'string') {
        return 'invalid_format';
    }

    if(!Object.keys(STACK).includes(stack)) {
        return 'stack_invalid';
    }

    // @ Validate role
    if(!role) {
        return 'role';
    }

    if(typeof role !== 'string') {
        return 'invalid_format';
    }

    if(!Object.keys(ROLE).includes(role)) {
        return 'role_invalid';
    }

    // @ Validate icon
    let iconExtension

    if(icon && (icon as File).name && !(icon instanceof File)) {
        iconExtension = (icon as File).name.split('.').pop()?.toLowerCase();

        return 'icon_invalid';
    }
    
    if (icon && (icon as File).name && iconExtension && !['jpg', 'jpeg', 'png'].includes(iconExtension)) {
        return 'icon_invalid';
    }

    // @ Validate banner
    let bannerExtension

    if(banner && (banner as File).name && !(banner instanceof File)) {
        bannerExtension = (banner as File).name.split('.').pop()?.toLowerCase();

        return 'banner_invalid';
    }
    
    if (banner && (banner as File).name && bannerExtension && !['jpg', 'jpeg', 'png'].includes(bannerExtension)) {
        return 'banner_invalid';
    }

    return true
}