const min = 1;
const max = 20;
const amountOfNumbers = 1000;

const finalObject = {};

for (let i = 1; i <= max; i++) {
    finalObject[i] = 0;
}

for (let i = 0; i < amountOfNumbers; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    finalObject[randomNumber]++;
}

console.log(finalObject)

// const min = 1
// const max = 20
// const amountOfNumbers = 1000

// const results = []

// for (let i = 0; i < amountOfNumbers; i++) {
//     const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
//     results.push(randomNumber)
// }

// const num1 = results.filter((num) => num === 1)
// const num2 = results.filter((num) => num === 2)
// const num3 = results.filter((num) => num === 3)
// const num4 = results.filter((num) => num === 4)
// const num5 = results.filter((num) => num === 5)
// const num6 = results.filter((num) => num === 6)
// const num7 = results.filter((num) => num === 7)
// const num8 = results.filter((num) => num === 8)
// const num9 = results.filter((num) => num === 9)
// const num10 = results.filter((num) => num === 10)
// const num11 = results.filter((num) => num === 11)
// const num12 = results.filter((num) => num === 12)
// const num13 = results.filter((num) => num === 13)
// const num14 = results.filter((num) => num === 14)
// const num15 = results.filter((num) => num === 15)
// const num16 = results.filter((num) => num === 16)
// const num17 = results.filter((num) => num === 17)
// const num18 = results.filter((num) => num === 18)
// const num19 = results.filter((num) => num === 19)
// const num20 = results.filter((num) => num === 20)

// finalObject = {
//     1: num1.length,
//     2: num2.length,
//     3: num3.length,
//     4: num4.length,
//     5: num5.length,
//     6: num6.length,
//     7: num7.length,
//     8: num8.length,
//     9: num9.length,
//     10: num10.length,
//     11: num11.length,
//     12: num12.length,
//     13: num13.length,
//     14: num14.length,
//     15: num15.length,
//     16: num16.length,
//     17: num17.length,
//     18: num18.length,
//     19: num19.length,
//     20: num20.length
// }

// console.log(finalObject)


