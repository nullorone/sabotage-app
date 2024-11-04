import { useState, useRef, useEffect } from 'react';
import styles from './Wheel.module.css'; // Подключаем стили для оформления колеса

const sectors = [
    { color: '#f82', label: 'Lose' },
    { color: '#0bf', label: '1' },
    { color: '#fb0', label: '3' },
    { color: '#0fb', label: '6' },
    { color: '#b0f', label: '2' },
    { color: '#f0b', label: '5' },
    { color: '#bf0', label: '4' }
]

export const WheelOld = () => {
    const wheelRef = useRef<HTMLCanvasElement | null>(null);
    const spinRef = useRef<HTMLDivElement | null>(null);
    const [spinEl, setSpinEl] = useState<HTMLDivElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [value, setValue] = useState<string | number | null>(null)

    useEffect(() => {
        if (wheelRef.current && spinRef.current) {
            setCtx(wheelRef.current.getContext('2d'));
            setSpinEl(spinRef.current);
        }
    }, [wheelRef.current, spinRef.current]);

    useEffect(() => {
        if (ctx && spinEl) {
            sectors.forEach(drawSector)
            rotate() // Initial rotation
            engine() // Start engine
        }
    }, [ctx, spinEl]);

    const tot = sectors.length;
    const dia = ctx?.canvas.width ?? 0;
    const rad = dia / 2;
    const PI = Math.PI;
    const TAU = 2 * PI;
    const arc = TAU / sectors.length;

    const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
    let angVel = 0; // Angular velocity
    let ang = 0; // Angle in radians

    const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

    function drawSector(sector, i) {
        const ang = arc * i;
        if (ctx) {
        ctx.save();
        // COLOR
        ctx.beginPath();
        ctx.fillStyle = sector.color;
        ctx.moveTo(rad, rad);
        ctx.arc(rad, rad, rad, ang, ang + arc);
        ctx.lineTo(rad, rad);
        ctx.fill();
        // TEXT
        ctx.translate(rad, rad);
        ctx.rotate(ang + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText(sector.label, rad - 10, 10);
        //
        ctx.restore();

        }
    }

    function rotate() {
        const sector = sectors[getIndex()];
        if (ctx && spinEl) {
            ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
            spinEl.textContent = !angVel ? 'Крутить' : sector.label;
            spinEl.style.background = sector.color;
            setValue(sector.label);
        }
    }

    function frame() {
        if (!angVel) {
            return;
        }
        angVel *= friction; // Decrement velocity by friction
        if (angVel < 0.002) angVel = 0; // Bring to stop
        ang += angVel; // Update angle
        ang %= TAU; // Normalize angle
        rotate();
    }

    function engine() {
        frame();
        requestAnimationFrame(engine);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <h2 className={styles.title}>Ваш выигрыш:</h2>
                <span className={styles.subtitle}>{value === 'Lose' ? '' : value}</span>
            </div>
            <div className={styles.wheelOfFortune}>
                <canvas className={styles.wheel} ref={wheelRef} width="300" height="300"></canvas>
                <div className={styles.spin} ref={spinRef} onClick={() => {
                    if (!angVel) angVel = rand(0.25, 0.45)
                }}>Крутить
                </div>
            </div>
        </div>
    );
};


function rand(m, M) {
    return Math.random() * (M - m) + m;
}


