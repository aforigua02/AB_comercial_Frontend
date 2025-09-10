import spriteContent from '../assets/_sprite.svg?raw';

export default function SvgSprite() {
    return (
        <div
        style={{ display: 'none' }}
        dangerouslySetInnerHTML={{ __html: spriteContent }}
        />
    );
}
