export function generateTwoDArray(row,col) {
    let newArr = Array(row);
    for (let i = 0; i  < row; i++) {
        newArr[i] = Array(col).fill(null);
    }
    return newArr
}