import TelefonoLogo from "../assets/Telefono-01.png";

export default function Hero() {
    return (
        <section className="relative overflow-hidden h-dvh w-full bg-white flex flex-col items-center justify-center text-center px-4 font-sans">
            <div aria-hidden className="pointer-events-none hero-halo animate-hero-halo z-0 "/>

                <h1 className="relative z-10 text-4xl md:text-7xl font-bold text-Azul max-w-4xl flex items-center gap-2 flex-col">
                    BIENVENIDO  A
                    <span className="z-10 -mt-50">
                    <img
                        src={TelefonoLogo}
                        alt="Logo de Telofono"
                        className="inline-block w-85 object-contain"
                    />
                    </span>

                    <span className="z-10 -mt-53 md:text-5xl [text-shadow:2px_2px_0_white,-2px_-2px_0_white,2px_-2px_0_white,-2px_2px_0_white]">
                    MONITORING INNOVATION
                    </span>
                </h1>

                <ul className="relative z-10 flex flex-row w-full justify-between items-center px-50 mt-45">
                    <li><a href="https://monitoringinnovation.com/" target="_blank" rel="noopener noreferrer" className="text-azul2 text-sm">MONITORINGINNOVATION</a></li>
                    <li><a href="https://gpscontrol.co/" target="_blank" rel="noopener noreferrer" className="text-azul2 text-sm">GPS CONTROL</a></li>
                    <li><a href="https://github.com/aforigua02/AB_comercial_Frontend" target="_blank" rel="noopener noreferrer" className="text-azul2 text-sm">Link repo front</a></li>
                    <li><a href="https://github.com/aforigua02/AB_comercial_Backend" target="_blank" rel="noopener noreferrer" className="text-azul2 text-sm">Link repo back</a></li>
                </ul>
    </section>
  );
}
