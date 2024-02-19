import { 
    CastOutlined, 
    ComputerOutlined, 
    DevicesOutlined, 
    GamepadOutlined, 
    SmartphoneOutlined, 
    TabletMacOutlined, 
    WatchOutlined 
} from "@mui/icons-material"

export default function Icon({
    device_type
} : {
    device_type: string;
}) {
    const getDeviceIcon = (device_type: string) => {
        return device_type == 'MOBILE'
        ? <SmartphoneOutlined />
        : device_type == 'TABLET'
        ? <TabletMacOutlined />
        : device_type == 'CONSOLE'
        ? <GamepadOutlined />
        : device_type == 'SMARTTV'
        ? <CastOutlined />
        : device_type == 'WEARABLE'
        ? <WatchOutlined />
        : device_type == 'EMBEDDED'
        ? <DevicesOutlined />
        : device_type == 'UNKNOWN'
        ? <DevicesOutlined />
        : <ComputerOutlined />
    }

    return getDeviceIcon(device_type)
}