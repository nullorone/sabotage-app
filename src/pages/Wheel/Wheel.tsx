import styles from './Wheel.module.css';
import {useEffect, useState} from "react";

const sectors = [
    { color: '#f82', label: 'Lose' },
    { color: '#0bf', label: '1' },
    { color: '#fb0', label: '6' },
    { color: '#0fb', label: '3' },
    { color: '#b0f', label: '4' },
    { color: '#f0b', label: '5' },
    { color: '#bf0', label: '2' }
]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const rand = (m, M) => Math.random() * (M - m) + m

export const Wheel = () => {
    const [value, setValue] = useState<string | number | null>(null)
    // const valueRef = useRef<string | null>(null);

    useEffect(() => {
        const tot = sectors.length
        const spinEl = document.querySelector('#spin')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const ctx = document.querySelector('#wheel')?.getContext('2d')
        const dia = ctx.canvas.width
        const rad = dia / 2
        const PI = Math.PI
        const TAU = 2 * PI
        const arc = TAU / sectors.length

        const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=hard
        let angVel = 0 // Angular velocity
        let ang = 0 // Angle in radians

        const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        function drawSector(sector, i) {
            const ang = arc * i
            ctx.save()
            // COLOR
            ctx.beginPath()
            ctx.fillStyle = sector.color
            ctx.moveTo(rad, rad)
            ctx.arc(rad, rad, rad, ang, ang + arc)
            ctx.lineTo(rad, rad)
            ctx.fill()
            // TEXT
            ctx.translate(rad, rad)
            ctx.rotate(ang + arc / 2)
            ctx.textAlign = 'right'
            ctx.fillStyle = '#fff'
            ctx.font = 'bold 30px sans-serif'
            ctx.fillText(sector.label, rad - 10, 10)
            //
            ctx.restore()
        }

        function rotate() {
            const sector = sectors[getIndex()]
            ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
            spinEl!.textContent = !angVel ? 'Крутить' : sector.label
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            spinEl!.style.background = sector.color;
            setValue(sector.label)
            // if (valueRef.current) {
            //     valueRef.current = sector.label;
            //
            // }
        }

        function frame() {
            if (!angVel) return
            angVel *= friction // Decrement velocity by friction
            if (angVel < 0.002) angVel = 0 // Bring to stop
            ang += angVel // Update angle
            ang %= TAU // Normalize angle
            rotate()
        }

        function engine() {
            frame()
            requestAnimationFrame(engine)
        }

        function init() {
            sectors.forEach(drawSector)
            rotate() // Initial rotation
            engine() // Start engine
            spinEl?.addEventListener('click', () => {
                if (!angVel) angVel = rand(0.25, 0.45)
            })
        }

        init()
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <h2 className={styles.title}>Ваш выигрыш:</h2>
                {value === 'Lose' ? <span className={styles.subtitle}>Попробуйте еще раз</span> :
                    <img className={styles.image} src={`./sabotage-app/ann_${value}.jpg`} alt={''}/>}
            </div>
            <div className={styles.wheelOfFortune} id="wheelOfFortune">
                <canvas className={styles.wheel} id="wheel" width="300" height="300"></canvas>
                <div className={styles.spin} id="spin">SPIN</div>
            </div>
        </div>
        )
}