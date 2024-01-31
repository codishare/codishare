import './spinner.css'

export default function Spinner() {
    return <div className='h-screen w-screen flex items-center justify-center'>
        <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
        </div>
    </div>
}