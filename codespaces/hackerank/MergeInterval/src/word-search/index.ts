import { wordSearch } from './code';
// Driver code
function main() {
  const input = [
    [
      [
        ['E', 'D', 'X', 'I', 'W'],
        ['P', 'U', 'F', 'M', 'Q'],
        ['I', 'C', 'Q', 'R', 'F'],
        ['M', 'A', 'L', 'C', 'A'],
        ['J', 'T', 'I', 'V', 'E'],
      ],
      'educative',
    ],

    [
      [
        ['O', 'Y', 'O', 'I'],
        ['B', 'I', 'E', 'M'],
        ['K', 'D', 'Y', 'R'],
        ['M', 'T', 'W', 'I'],
        ['Z', 'I', 'T', 'O'],
      ],
      'DYNAMIC',
    ],

    [
      [
        ['h', 'e', 'c', 'm', 'l'],
        ['w', 'l', 'i', 'e', 'u'],
        ['a', 'r', 'r', 's', 'n'],
        ['s', 'i', 'i', 'o', 'r'],
      ],
      'WARRIOR',
    ],

    [
      [
        ['C', 'Q', 'N', 'A'],
        ['P', 'S', 'E', 'I'],
        ['Z', 'A', 'P', 'E'],
        ['J', 'V', 'T', 'K'],
      ],
      'SAVE',
    ],

    [[['A']], 'ABC'],

    [
      [
        ['P', 'S', 'S', 'I', 'W', 'P'],
        ['P', 'Y', 'C', 'A', 'Q', 'T'],
        ['I', 'S', 'H', 'P', 'F', 'Y'],
        ['M', 'T', 'O', 'L', 'O', 'I'],
        ['J', 'I', 'N', 'O', 'G', 'K'],
        ['I', 'M', 'D', 'T', 'Y', 'T'],
      ],
      'PSYCHOLOGY',
    ],
  ];
  let num = 1;

  input.forEach((i: any) => {
    console.log(num + '.\tGrid = ');
    for (let j = 0; j < i[0].length; j++) console.log('\t\t', i[0][j]);
    if (i[1] == '') console.log(`\n\tWord = ""`);
    else console.log('\n\tWord = ', i[1]);
    const search_result = wordSearch(i[0], i[1]);
    if (search_result) console.log('\n\tSearch result = Word found');
    else console.log("\n\tSearch result = Word couldn't be found");
    num++;
    console.log('-'.repeat(100));
  });
}

main();
