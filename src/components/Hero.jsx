import TelefonoLogo from "../assets/Telefono-01.png";


export default function Hero() {
    return (
        <section className="h-dvh w-full bg-white flex flex-col items-center justify-center text-center px-4 font-sans">
            <h1 className="text-4xl md:text-7xl font-bold text-Azul max-w-4xl flex items-center gap-2 flex-col">
                BIENVENIDO  A <span className="z-1 -mt-50">
                    <img src={TelefonoLogo}
                    alt="Logo de Telofono"
                    className="inline-block w-85 object-contain"
                    />
                </span>
                <span className="z-2 -mt-53 md:text-5xl [text-shadow:2px_2px_0_white,-2px_-2px_0_white,2px_-2px_0_white,-2px_2px_0_white]" >
                    MONITORING INNOVATION
                </span>
            </h1>
            <ul className="flex flex-row w-full justify-between items-center px-50 mt-45">
                <li><a href="https://monitoringinnovation.com/" className="text-azul2 text-sm">MONITORINGINNOVATION</a></li>
                <li><a href="https://gpscontrol.co/" className="text-azul2 text-sm">GPS CONTROL</a></li>
                <li><a href="" className="text-azul2 text-sm">Link repo front</a></li>
                <li><a href="" className="text-azul2 text-sm">Link repo back</a></li>
            </ul>
        </section>
    )
}
