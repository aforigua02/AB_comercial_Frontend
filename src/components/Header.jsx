import sprite from "../assets/_sprite.svg";

export default function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-white/20">
            <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
                <div className="font-semibold text-pink-600">
                    <svg  className="h-8 w-8 mt-5">
                        <use href={`${sprite}#Imagologo_motion`} />
                    </svg>
                </div>
            </nav>
        </header>
    )
}
