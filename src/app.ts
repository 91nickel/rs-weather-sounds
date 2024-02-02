import buttonsConfig from './buttons'

interface IPlayer {
    name: string
    audio: HTMLAudioElement
}

let activeButton: HTMLElement,
    activePlayer: IPlayer,
    players: Array<IPlayer> = []

const app = document.getElementById('app') as HTMLElement
const buttonsContainer = app.querySelector('.container.buttons') as HTMLElement
const volumeSwitcher = app.querySelector('.container.switcher input') as HTMLInputElement

function getButtons(): NodeListOf<HTMLButtonElement> {
    return buttonsContainer.querySelectorAll('button')
}

function setActivePlayer(name: string): void {
    activePlayer.audio.pause()
    const ap = players.find(p => p.name === name)
    if (ap)
        activePlayer = ap
}

function activateButton(button: HTMLButtonElement): void {
    getButtons().forEach(b => b !== button && b.classList.remove('active'))
    button.classList.add('active')
    activeButton = button
}

function deactivateButton(button: HTMLButtonElement): void {
    button.classList.remove('active')
}

function setAppBackground(name: string): void {
    buttonsConfig.forEach(n => {
        const className = `bg-${n}`
        if (app.classList.contains(className)) {
            app.classList.remove(className)
        }
    })
    app.classList.add(`bg-${name}`)
}

function onClick(event: Event): void {
    const target = event.currentTarget as HTMLButtonElement
    const isActive = target.classList.contains('active')
    const weatherName: string | undefined = target.dataset.name
    if (!weatherName) return

    if (isActive) {
        deactivateButton(target)
        activePlayer.audio.pause()
    } else {
        activateButton(target)
        setAppBackground(weatherName)
        setActivePlayer(weatherName)
        activePlayer.audio.play()
    }
}

function onVolumeChange(event: Event): void {
    const target = event.currentTarget as HTMLInputElement
    players.forEach(({audio}) => audio.volume = +target.value / 100)
}

export function init(): void {

    buttonsConfig.forEach((name, i) => {
        const btn: HTMLButtonElement = document.createElement('button')
        btn.classList.add('btn')
        btn.classList.add('btn-light')
        btn.classList.add(name)
        btn.dataset.name = name

        const icon: HTMLElement = document.createElement('span')
        icon.classList.add('icon')
        btn.appendChild(icon)
        buttonsContainer.appendChild(btn)

        const audio: HTMLAudioElement = new Audio(require(`./assets/audio/${name}.mp3`))
        audio.loop = true

        players.push({name, audio})

        if (i === 0) {
            setAppBackground(name)
            activeButton = btn
            activePlayer = {name, audio}
        }

        btn.addEventListener('click', onClick)
    })

    volumeSwitcher.value = '50'
    volumeSwitcher.addEventListener('input', onVolumeChange)
}
