let current = 0

export function generateID(){
    return (current++).toString()
}