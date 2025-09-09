import sprite from "../assets/_sprite.svg";

export default function Footer(){
    return(
        <footer className="w-full flex justify-center h-20">
            <svg  className="h-20 w-40 mt-5">
                <use xlinkHref={`${sprite}#Imagologotipo_motion`} />
            </svg>
        </footer>
    )
}