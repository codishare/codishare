import { ROLE, STACK } from "@/_types";

export default function validate(
    data: FormData
) {
    const name = data.get('name') as string;
    const alias = data.get('alias') as string;
    const stack = data.get('stack') as string;
    const role = data.get('role') as string;
    const icon = data.get('icon') as File;
    const banner = data.get('banner') as File;

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
    if(icon && !(icon instanceof File)) {
        return 'icon_invalid';
    }

    const iconExtension = icon.name.split('.').pop()?.toLowerCase();
    
    if (icon && iconExtension && !['jpg', 'jpeg', 'png'].includes(iconExtension)) {
        return 'icon_invalid';
    }

    // @ Validate banner
    if(banner && !(banner instanceof File)) {
        return 'banner_invalid';
    }

    const bannerExtension = banner.name.split('.').pop()?.toLowerCase();

    if (banner && bannerExtension && !['jpg', 'jpeg', 'png'].includes(bannerExtension)) {
        return 'banner_invalid';
    }

    return true
}