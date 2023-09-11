export default function getFormattedValue(time) {
    // Math.trunnc pour enlever les chiffres après la virgule
    // Si le digit est inférieur à 10 on ajoute un 0 devant
    // Pareil pour les secondes
    const minutes = `${Math.trunc(time / 60) < 10 ? `0${Math.trunc(time / 60)}` : Math.trunc(time / 60)}`
    const seconds = `${time % 60 < 10 ? `0${time % 60}` : time % 60}`

    return `${minutes}:${seconds}`
}