export const getRandomBG = () => {
    const colors = [
        "#f6b100",
        "#025caa",
        "#be3e3f",
        "#02ca3a",
    ]

    const color = colors[Math.floor(Math.random() * colors.length)]
    return "bg-[" + color + "]"
}

export const getAvatarName = (name) => {
    if(!name) return ""

    return name.split(" ").map(n => n[0]).join("").toUpperCase()
}

export const formatDate = (date) => {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ]
        
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`
    }