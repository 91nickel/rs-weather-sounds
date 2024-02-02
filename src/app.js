import buttonsConfig from './buttons'

let activeButton = null, activePlayer = null, players = [], volume = 0
const app = document.getElementById('app')
const buttonsContainer = app.querySelector('.container.buttons')
const volumeSwitcher = app.querySelector('.container.switcher input')

function getButtons () {
    return buttonsContainer.querySelectorAll('button')
}

function setActivePlayer (name) {
    activePlayer.audio.pause()
    activePlayer = players.find(p => p.name === name)
}

function activateButton (button) {
    getButtons().forEach(b => b !== button && b.classList.remove('active'))
    button.classList.add('active')
    activeButton = button
    return button
}

function deactivateButton (button) {
    return button.classList.remove('active')
}

function setAppBackground (name) {
    buttonsConfig.forEach(name => {
        const className = `bg-${name}`
        if (app.classList.contains(className)) {
            app.classList.remove(className)
        }
    })
    app.classList.add(`bg-${name}`)
}

function onClick (event) {
    const target = event.currentTarget
    const isActive = target.classList.contains('active')
    const {name: weatherName} = target.dataset

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

function onVolumeChange (event) {
    players.forEach(({audio}) => audio.volume = +event.currentTarget.value / 100)
}

export function init () {

    buttonsConfig.forEach((name, i) => {
        const btn = document.createElement('button')
        btn.classList.add('btn')
        btn.classList.add('btn-light')
        btn.classList.add(name)
        btn.dataset.name = name
        const icon = document.createElement('span')
        icon.classList.add('icon')
        btn.appendChild(icon)
        buttonsContainer.appendChild(btn)

        const audio = new Audio(require(`./assets/audio/${name}.mp3`))
        audio.loop = true

        players.push({name, audio})

        if (i === 0) {
            setAppBackground(name)
            activeButton = btn
            activePlayer = {name, audio}
        }

        btn.addEventListener('click', onClick)
    })

    volumeSwitcher.value = 50
    volumeSwitcher.addEventListener('input', onVolumeChange)
}


