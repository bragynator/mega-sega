import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  let { name: firstFighterName, health: firstFighterHealth } = firstFighter;
  let { name: secondFighterName, health: secondFighterHealth } = secondFighter;

  document.addEventListener('keydown', (e) => console.log(e.code));

  let i = 1;

  while (firstFighterHealth > 0 && secondFighterHealth > 0) {
    console.log('round - ', i);

    if (i % 2 === 1) {
      const resDmg = await getDamage(firstFighter, secondFighter);
      console.log('result damage - ', resDmg);
      i += 1;
      secondFighterHealth -= resDmg;
      console.log('secondFighterHealth - ', secondFighterHealth);
      continue;
    }

    const resDmg = await getDamage(secondFighter, firstFighter);
    console.log('result damage - ', resDmg);
    i += 1;
    firstFighterHealth -= resDmg;
    console.log('firstFighterHealth - ', firstFighterHealth);
  }

  const winner = firstFighterHealth > 0 ? firstFighter : secondFighter;

  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    resolve(winner);
  });
}

export async function getDamage(attacker, defender) {
  // return damage
  const attack = getHitPower(attacker);
  const block = getBlockPower(defender);

  if (attack <= block) {
    return 0;
  }

  return attack - block;
}

export function getHitPower(fighter) {
  // return hit power
  const { attack } = fighter;
  const criticalHitChance = Math.random() + 1;
  console.log('attack - ', attack * criticalHitChance);
  return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  // return block power
  const { defense } = fighter;
  const dodgeChance = Math.random() + 1;
  console.log('defense - ', defense * dodgeChance);
  return defense * dodgeChance;
}

// async function pressedKey(event) {
//   console.log(event.code);
//   return event.code;
// }
