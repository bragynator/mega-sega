import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  let { health: firstFighterHealth } = firstFighter;
  let { health: secondFighterHealth } = secondFighter;

  const firstFighterHealthBar = document.querySelector('#left-fighter-indicator');
  const secondFighterHealthBar = document.querySelector('#right-fighter-indicator');

  return await new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    document.addEventListener('keydown', logKeyDown);
    document.addEventListener('keyup', logKeyUp);

    let firstFighterBlock = false;
    let secondFighterBlock = false;

    let firstFighterCritCombination = new Set();
    let secondFighterCritCombination = new Set();
    let firstFighterCritTime = 0;
    let secondFighterCritTime = 0;

    function logKeyDown(e) {
      if (e.code === controls.PlayerTwoBlock) {
        secondFighterBlock = true;
      }

      if (e.code === controls.PlayerOneBlock) {
        firstFighterBlock = true;
      }

      if (!firstFighterBlock) {
        if (e.code === controls.PlayerOneAttack) {
          if (!secondFighterBlock) {
            secondFighterHealth -= getHitPower(firstFighter);
            secondFighterHealthBar.style.width = calculateHealthBarWidth(secondFighterHealth, secondFighter) + '%';
          } else {
            secondFighterHealth -= getDamage(firstFighter, secondFighter);
            secondFighterHealthBar.style.width = calculateHealthBarWidth(secondFighterHealth, secondFighter) + '%';
          }
        }
      }

      if (!secondFighterBlock) {
        if (e.code === controls.PlayerTwoAttack) {
          if (!firstFighterBlock) {
            firstFighterHealth -= getHitPower(secondFighter);
            firstFighterHealthBar.style.width = calculateHealthBarWidth(firstFighterHealth, firstFighter) + '%';
          } else {
            firstFighterHealth -= getDamage(secondFighter, firstFighter);
            firstFighterHealthBar.style.width = calculateHealthBarWidth(firstFighterHealth, firstFighter) + '%';
          }
        }
      }

      const [firstCritKeyFirstFighter, secondCritKeyFirstFighter, thirdCritKeyFirstFighter] =
        controls.PlayerOneCriticalHitCombination;

      if (
        e.code === firstCritKeyFirstFighter ||
        e.code === secondCritKeyFirstFighter ||
        e.code === thirdCritKeyFirstFighter
      ) {
        let currentTime = Date.now();

        if (currentTime - firstFighterCritTime > 10000) {
          firstFighterCritCombination.add(e.code);

          if (firstFighterCritCombination.size === 3) {
            secondFighterHealth -= 2 * firstFighter.attack;
            secondFighterHealthBar.style.width = calculateHealthBarWidth(secondFighterHealth, secondFighter) + '%';
            firstFighterCritCombination = new Set();
            firstFighterCritTime = Date.now();
          }
        }
      }

      const [firstCritKeySecondFighter, secondCritKeySecondFighter, thirdCritKeySecondFighter] =
        controls.PlayerTwoCriticalHitCombination;

      if (
        e.code === firstCritKeySecondFighter ||
        e.code === secondCritKeySecondFighter ||
        e.code === thirdCritKeySecondFighter
      ) {
        let currentTime = Date.now();

        if (currentTime - secondFighterCritTime > 10000) {
          secondFighterCritCombination.add(e.code);

          if (secondFighterCritCombination.size === 3) {
            firstFighterHealth -= 2 * secondFighter.attack;
            firstFighterHealthBar.style.width = calculateHealthBarWidth(firstFighterHealth, firstFighter) + '%';
            secondFighterCritCombination = new Set();
            secondFighterCritTime = Date.now();
          }
        }
      }

      console.log(firstFighterHealth, secondFighterHealth);

      if (firstFighterHealth <= 0 || secondFighterHealth <= 0) {
        document.removeEventListener('keydown', logKeyDown);
        document.removeEventListener('keyup', logKeyUp);
        firstFighterHealth <= 0
          ? (firstFighterHealthBar.style.width = '0%')
          : (secondFighterHealthBar.style.width = '0%');
        firstFighterHealth <= 0 ? resolve(secondFighter) : resolve(firstFighter);
      }
    }

    function logKeyUp(e) {
      if (e.code === controls.PlayerTwoBlock) {
        secondFighterBlock = false;
      }

      if (e.code === controls.PlayerOneBlock) {
        firstFighterBlock = false;
      }
    }
  });
}

export function getDamage(attacker, defender) {
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
  return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  // return block power
  const { defense } = fighter;
  const dodgeChance = Math.random() + 1;
  return defense * dodgeChance;
}

function calculateHealthBarWidth(currentHealth, fighter) {
  const { health } = fighter;
  return (currentHealth * 100) / health;
}
