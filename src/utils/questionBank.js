export const generateSessionQuestions = () => {
  const questions = [];
  const NAMES = ["John", "Mike", "Sarah", "Emma", "Liam", "Olivia"];
  const OBJECTS = ["pencil", "eraser", "toy car", "juice box", "sandwich"];
  
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randCents = (min, max) => Math.round((min + Math.random() * (max - min)) / 5) * 5;
  const toDec = (cents) => '$' + (cents / 100).toFixed(2);

  // We generate 5 worlds, 10 questions each.
  
  const generateUniqueOptions = (correct, wrongArray) => {
    const opts = new Set([correct]);
    for (const w of wrongArray) {
      if (opts.size < 4) opts.add(w);
    }
    // If somehow we don't have 4, add fallbacks
    let fallbackCents = 100;
    while (opts.size < 4) {
      opts.add(toDec(fallbackCents));
      fallbackCents += 100;
    }
    return Array.from(opts).sort(() => Math.random() - 0.5);
  };

  for (let w = 0; w < 5; w++) {
    for (let q = 0; q < 10; q++) {
      const type = q; // 0 to 9 types
      const difficulty = w < 2 ? 1 : (w < 4 ? 2 : 3);
      const minCents = difficulty === 1 ? 50 : (difficulty === 2 ? 500 : 1000);
      const maxCents = difficulty === 1 ? 1000 : (difficulty === 2 ? 5000 : 10000);
      
      const cents = randCents(minCents, maxCents);
      const dollars = Math.floor(cents / 100);
      const c = cents % 100;
      const decString = toDec(cents);
      const id = `W${w}_Q${q}`;

      if (type === 0) { // Q1: Write amount
        questions.push({
          id, world: w, difficulty, type: 'write_decimal', amountCents: cents,
          questionText: `${pick(NAMES)} has ${dollars} dollars and ${c} cents. Write this amount in decimal notation.`,
          visual: 'placeValueChart',
          hint1: 'Dollars go to the left of the decimal point. Cents go to the right.',
          hint2: 'Remember the format is $X.XX',
          explanation: `${dollars} dollars and ${c} cents is written as ${decString}.`,
          correctAnswer: decString,
          options: generateUniqueOptions(decString, [toDec(cents * 10), toDec(cents + 5), toDec(cents - 5)])
        });
      } else if (type === 1) { // Q2: Read/identify
        questions.push({
          id, world: w, difficulty, type: 'read_decimal', amountCents: cents,
          questionText: `Which amount matches ${dollars} dollars and ${c} cents?`,
          visual: 'priceTag',
          hint1: 'Look at the dollars and cents carefully.',
          hint2: 'The decimal point separates dollars and cents.',
          explanation: `It is written as ${decString}.`,
          correctAnswer: decString,
          options: generateUniqueOptions(decString, [`$${c}.${dollars.toString().padStart(2,'0')}`, `$${dollars}.${(c+1).toString().padStart(2,'0')}`, `$${dollars+1}.${c.toString().padStart(2,'0')}`])
        });
      } else if (type === 2) { // Q3: Convert to cents
        questions.push({
          id, world: w, difficulty, type: 'to_cents', amountCents: cents,
          questionText: `How many cents is ${decString}?`,
          visual: 'coinTray',
          hint1: '1 dollar is 100 cents.',
          hint2: 'Remove the decimal point to see the total cents.',
          explanation: `${decString} is ${cents} cents.`,
          correctAnswer: `${cents} cents`,
          options: generateUniqueOptions(`${cents} cents`, [`${cents * 10} cents`, `${Math.floor(cents / 10)} cents`, `${cents + 10} cents`, `${cents + 100} cents`])
        });
      } else if (type === 3) { // Q4: Convert from cents
        questions.push({
          id, world: w, difficulty, type: 'from_cents', amountCents: cents,
          questionText: `Convert ${cents} cents to decimal notation.`,
          visual: 'coinTray',
          hint1: '100 cents make 1 dollar.',
          hint2: 'Put a decimal point before the last two digits.',
          explanation: `${cents} cents is ${decString}.`,
          correctAnswer: decString,
          options: generateUniqueOptions(decString, [toDec(cents * 10), toDec(cents / 10), toDec(cents + 100), toDec(cents + 50)])
        });
      } else if (type === 4) { // Q5: Compare
        const cents2 = cents + randCents(5, 50) * (Math.random() > 0.5 ? 1 : -1);
        const correct = cents > cents2 ? decString : toDec(cents2);
        questions.push({
          id, world: w, difficulty, type: 'compare_amounts', amountCents: cents,
          questionText: `Which is greater: ${decString} or ${toDec(cents2)}?`,
          visual: 'priceTag',
          hint1: 'Compare the dollars first.',
          hint2: 'If dollars are the same, compare the cents.',
          explanation: `${correct} is greater.`,
          correctAnswer: correct,
          options: generateUniqueOptions(correct, [cents > cents2 ? toDec(cents2) : decString, 'They are equal', 'Cannot determine'])
        });
      } else if (type === 5) { // Q6: Add
        const cents2 = randCents(50, 200);
        const sum = cents + cents2;
        questions.push({
          id, world: w, difficulty, type: 'add_amounts', amountCents: cents,
          questionText: `What is ${decString} + ${toDec(cents2)}?`,
          visual: 'priceTag',
          hint1: 'Add the cents, then add the dollars.',
          hint2: 'Make sure to carry over if cents go over 99.',
          explanation: `The sum is ${toDec(sum)}.`,
          correctAnswer: toDec(sum),
          options: generateUniqueOptions(toDec(sum), [toDec(sum + 100), toDec(sum - 10), toDec(sum + 10), toDec(sum + 50)])
        });
      } else if (type === 6) { // Q7: Subtract (Change)
        const paid = maxCents + 1000;
        const change = paid - cents;
        questions.push({
          id, world: w, difficulty, type: 'find_change', amountCents: cents,
          questionText: `${pick(NAMES)} pays ${toDec(paid)} for an item that costs ${decString}. How much change?`,
          visual: 'priceTag',
          hint1: 'Subtract the cost from the amount paid.',
          hint2: 'Line up the decimal points when subtracting.',
          explanation: `${toDec(paid)} - ${decString} = ${toDec(change)}.`,
          correctAnswer: toDec(change),
          options: generateUniqueOptions(toDec(change), [toDec(change + 100), toDec(change - 100), toDec(change + 50), toDec(change + 10)])
        });
      } else if (type === 7) { // Q8: True/False
        const isTrue = Math.random() > 0.5;
        const wrongCents = cents + (Math.random() > 0.5 ? 10 : -10);
        const decStringWrong = toDec(wrongCents);
        questions.push({
          id, world: w, difficulty, type: 'true_false_decimal', amountCents: cents,
          questionText: `True or False: ${dollars} dollars and ${c} cents = ${isTrue ? decString : decStringWrong}?`,
          visual: 'trueFalse',
          hint1: 'Read the dollars and cents carefully.',
          hint2: 'Does the decimal notation match the words?',
          explanation: `The statement is ${isTrue ? 'True' : 'False'}.`,
          correctAnswer: isTrue ? 'True' : 'False',
          options: ['True', 'False']
        });
      } else if (type === 8) { // Q9: Place Value
        const tenths = Math.floor(c / 10);
        questions.push({
          id, world: w, difficulty, type: 'place_value', amountCents: cents,
          questionText: `In ${decString}, what digit is in the tenths place?`,
          visual: 'placeValueChart',
          hint1: 'The tenths place is the first digit right after the decimal point.',
          hint2: `Look at the digit immediately after the dot in ${decString}.`,
          explanation: `In ${decString}, the digit ${tenths} is in the tenths place.`,
          correctAnswer: String(tenths),
          options: generateUniqueOptions(String(tenths), [String(dollars % 10), String(c % 10), '0', '1', '2'])
        });
      } else if (type === 9) { // Q10: Word Problem
        const cents2 = randCents(50, 500);
        const total = cents + cents2;
        questions.push({
          id, world: w, difficulty, type: 'word_problem', amountCents: cents,
          questionText: `${pick(NAMES)} buys a ${pick(OBJECTS)} for ${decString} and a ${pick(OBJECTS)} for ${toDec(cents2)}. How much did they spend in all?`,
          visual: 'priceTag',
          hint1: 'Add the two costs together.',
          hint2: 'Line up the decimal points and add carefully.',
          explanation: `${decString} + ${toDec(cents2)} = ${toDec(total)}.`,
          correctAnswer: toDec(total),
          options: generateUniqueOptions(toDec(total), [toDec(total + 100), toDec(total - 100), toDec(total + 10), toDec(total + 50)])
        });
      }
    }
  }
  return questions.sort(() => Math.random() - 0.5);
};

export const questionBank = generateSessionQuestions();
