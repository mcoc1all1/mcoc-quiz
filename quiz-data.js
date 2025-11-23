// quiz-data.js
// Contains all MCOC-related data and question generator templates.
// The core game calls MCOC_QUIZ_BANK.generateQuizQuestions(mode, count).

(function (global) {
  "use strict";

  // --- Core data: classes, champions, currencies, modes, mechanics ---------

  const classes = [
    {
      id: "cosmic",
      name: "Cosmic",
      strongAgainst: "tech",
      weakAgainst: "mystic",
      description:
        "Cosmic Champions draw power from space, cosmic forces or otherworldly energy."
    },
    {
      id: "tech",
      name: "Tech",
      strongAgainst: "mutant",
      weakAgainst: "cosmic",
      description:
        "Tech Champions rely on advanced technology, armor, robotics or gadgets."
    },
    {
      id: "mutant",
      name: "Mutant",
      strongAgainst: "skill",
      weakAgainst: "tech",
      description:
        "Mutant Champions gain their powers from the X-gene and mutant physiology."
    },
    {
      id: "skill",
      name: "Skill",
      strongAgainst: "science",
      weakAgainst: "mutant",
      description:
        "Skill Champions win through martial arts, training, weapons mastery and tactics."
    },
    {
      id: "science",
      name: "Science",
      strongAgainst: "mystic",
      weakAgainst: "skill",
      description:
        "Science Champions gained powers from experiments, accidents or scientific events."
    },
    {
      id: "mystic",
      name: "Mystic",
      strongAgainst: "cosmic",
      weakAgainst: "science",
      description:
        "Mystic Champions wield magic or extra-dimensional power and manipulate buffs."
    }
  ];

  const champions = [
    {
      name: "Ghost",
      classId: "tech",
      notes:
        "Ghost is a Tech Champion known for her phasing mechanic and massive burst damage."
    },
    {
      name: "Nick Fury",
      classId: "skill",
      notes:
        "Nick Fury is a Skill Champion with high damage, tactical utility and his signature second life."
    },
    {
      name: "Hyperion",
      classId: "cosmic",
      notes:
        "Hyperion is a Cosmic Champion who ramps up Fury buffs and can trigger powerful Cosmic Healing."
    },
    {
      name: "Doctor Doom",
      classId: "mystic",
      notes:
        "Doctor Doom is a Mystic Champion focusing on Shock, control, and heavy buff manipulation."
    },
    {
      name: "Omega Red",
      classId: "mutant",
      immunities: ["poison"],
      reducedDamage: ["bleed"],
      notes:
        "Omega Red is a Mutant whose physiology makes him immune to Poisons and highly resistant to Bleeds."
    },
    {
      name: "Dust",
      classId: "mutant",
      immunities: ["bleed", "poison", "shock"],
      notes:
        "Dust is a Mutant composed of sand, immune to Bleed, Poison and Shock effects."
    },
    {
      name: "Captain America (Infinity War)",
      classId: "science",
      notes:
        "Captain America (Infinity War) is a Science Champion with strong utility and defensive abilities."
    },
    {
      name: "Warlock",
      classId: "tech",
      immunities: ["bleed", "poison", "cold snap", "frostbite"],
      notes:
        "Warlock is a Tech Champion with powerful utility and is fully immune to Bleed, Poison, Cold Snap and Frostbite."
    },
    // Extra champions to support more templates
    {
      name: "Hercules",
      classId: "cosmic",
      notes:
        "Hercules is a Cosmic Champion famous for huge damage, feats of strength and an immortality-style cheat death when awakened."
    },
    {
      name: "Kitty Pryde",
      classId: "mutant",
      notes:
        "Kitty Pryde is a Mutant Champion who phases through attacks and gains big Special damage while Incinerated."
    },
    {
      name: "Scorpion",
      classId: "science",
      notes:
        "Scorpion is a Science Champion who specializes in Poison and can configure his kit pre-fight to be resistant or immune to different effects."
    },
    {
      name: "Iceman",
      classId: "mutant",
      immunities: ["bleed", "poison", "incinerate"],
      notes:
        "Iceman is a Mutant Champion built around Cold Snap and Frostbite and is naturally immune to Bleed, Poison and Incinerate."
    },
    {
      name: "Mephisto",
      classId: "mystic",
      immunities: ["poison", "incinerate", "cold snap", "frostbite"],
      notes:
        "Mephisto is a Mystic Champion with an aura of Incineration and is immune to Poison, Cold Snap, Frostbite and damage from Incinerate."
    }
  ];

  const currencies = [
    {
      id: "gold",
      name: "Gold",
      primary: true,
      mainUse:
        "Used to upgrade Champions and buy basic items such as potions and boosts.",
      mainSource:
        "Earned from quests, Arenas, events and selling ISO or duplicate Champions."
    },
    {
      id: "units",
      name: "Units",
      primary: true,
      mainUse:
        "Premium currency used to buy crystals, energy refills, potions, revives and special offers.",
      mainSource:
        "Earned from quest milestones, events and offers, and can also be purchased with real money."
    },
    {
      id: "battlechips",
      name: "Battlechips",
      primary: true,
      mainUse:
        "Spent on Arena Crystals, Uncollected Arena Crystals and Thronebreaker Arena Crystals.",
      mainSource: "Earned mainly by fighting in Arenas and Versus fights."
    },
    {
      id: "glory",
      name: "Glory",
      primary: false,
      mainUse:
        "Used in the Glory store to buy Alliance Quest rank-up materials, potions and Raid Tickets.",
      mainSource: "Earned from Alliance Quest and Raids."
    },
    {
      id: "loyalty",
      name: "Alliance Loyalty",
      primary: false,
      mainUse:
        "Used in the Loyalty store for boosts, champions and Raid Tickets.",
      mainSource:
        "Earned by using the Help feature for alliance members and participating in Alliance War and Raids."
    }
  ];

  const gameModes = [
    {
      id: "story",
      name: "Story Quests",
      type: "quest",
      description:
        "The long-term Campaign which tells the core story of the Battlerealm using Acts and Chapters."
    },
    {
      id: "event",
      name: "Event Quests",
      type: "quest",
      description:
        "Rotating monthly quests with new bosses, side objectives and rewards."
    },
    {
      id: "battlegrounds",
      name: "Battlegrounds",
      type: "pvp",
      description:
        "A competitive deck-based PvP mode with drafting and best-of-three matches each season."
    },
    {
      id: "incursions",
      name: "Incursions",
      type: "coop",
      description:
        "A mode where you push through multiple rooms with random Hacks and escalating difficulty, solo or with a partner."
    },
    {
      id: "allianceQuest",
      name: "Alliance Quest",
      type: "alliance",
      description:
        "Cooperative alliance content where Battlegroups clear maps daily for Glory and Raid Tickets."
    },
    {
      id: "allianceWar",
      name: "Alliance War",
      type: "alliance",
      description:
        "Asynchronous alliance versus alliance mode where you place defenders and attack enemy maps to earn Loyalty and War rewards."
    }
  ];

  const mechanics = {
    buffs: [
      {
        name: "Fury",
        effect: "Increases a Champion's Attack Rating for a certain duration.",
        category: "attack"
      },
      {
        name: "Precision",
        effect:
          "Increases a Champion's Critical Rating, making critical hits more likely.",
        category: "attack"
      },
      {
        name: "Cruelty",
        effect:
          "Increases a Champion's Critical Damage, making critical hits deal more damage.",
        category: "attack"
      },
      {
        name: "Regeneration",
        effect: "Restores health over time.",
        category: "survivability"
      },
      {
        name: "Armor Up",
        effect:
          "Increases a Champion's Armor Rating, reducing incoming physical damage from hits.",
        category: "survivability"
      },
      {
        name: "Prowess",
        effect:
          "Increases the damage of Special Attacks while the buff is active.",
        category: "attack"
      }
    ],
    debuffs: [
      {
        name: "Bleed",
        effect:
          "Deals damage over time representing physical cuts and bleeding.",
        category: "damageOverTime"
      },
      {
        name: "Poison",
        effect:
          "Deals damage over time and usually reduces the effectiveness of healing.",
        category: "damageOverTime"
      },
      {
        name: "Shock",
        effect:
          "Deals energy damage over time or on hit and often interacts with Tech Champions.",
        category: "damageOverTime"
      },
      {
        name: "Incinerate",
        effect:
          "Deals energy-based burn damage over time and usually prevents perfect block.",
        category: "damageOverTime"
      },
      {
        name: "Weakness",
        effect:
          "Reduces a Champion's Attack Rating for a certain duration.",
        category: "attackDown"
      },
      {
        name: "Degeneration",
        effect:
          "Deals direct damage over time that usually ignores Armor and many resistances.",
        category: "damageOverTime"
      },
      {
        name: "Armor Break",
        effect:
          "Removes one Armor Up effect and reduces the opponent's Armor Rating while active.",
        category: "armorDown"
      },
      {
        name: "Disorient",
        effect:
          "Reduces a defender's Defensive Ability Accuracy and Block Proficiency.",
        category: "control"
      },
      {
        name: "Slow",
        effect:
          "Reduces the Ability Accuracy of Evade and Unstoppable effects so they are far less likely to trigger.",
        category: "control"
      }
    ],
    basics: {
      comboMeter:
        "The Combo Meter tracks how many consecutive hits you land without being hit.",
      comboReset:
        "When your Champion is struck by a basic attack, the Combo Meter usually resets to zero.",
      energy:
        "Quest Energy limits how many tiles you can move in Story and Event Quests before you must wait or use refills."
    }
  };

  // --- Fun-fact meta data (release years, spin-off, etc.) -------------------

  const gameMeta = {
    releaseYear: 2014,
    developer: "Kabam",
    spinOff: {
      name: "Marvel Realm of Champions",
      shutdownYear: 2022
    }
  };

  // Stable champion release years (year only – no months/days needed for the quiz)
  const championReleaseYears = [
    { name: "Hyperion", year: 2016 },
    { name: "Iceman", year: 2017 },
    { name: "Mephisto", year: 2017 },
    { name: "Ghost", year: 2018 },
    { name: "Captain America (Infinity War)", year: 2018 },
    { name: "Omega Red", year: 2018 },
    { name: "Nick Fury", year: 2019 },
    { name: "Doctor Doom", year: 2019 },
    { name: "Warlock", year: 2019 },
    { name: "Hercules", year: 2021 },
    { name: "Kitty Pryde", year: 2021 },
    { name: "Scorpion", year: 2022 },
    { name: "Dust", year: 2024 }
  ];

  // --- Utility helpers (local to this module) ------------------------------

  function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function buildClassAnswerVariants(className) {
    const lower = className.toLowerCase();
    return [lower, lower + " class"];
  }

  function buildModeAnswerVariants(modeName) {
    const lower = modeName.toLowerCase();
    const parts = lower.split(" ");
    const short =
      parts.length > 1 ? parts[0] + (parts[1] === "quests" ? "" : "") : lower;
    const variants = [lower, short];

    if (lower === "battlegrounds") {
      variants.push("bg", "bgs");
    }
    if (lower === "alliance quest") {
      variants.push("aq", "alliance quests");
    }
    if (lower === "alliance war") {
      variants.push("aw", "alliance wars");
    }
    return Array.from(new Set(variants));
  }

  // --- EASY question generators (MCQ) ---------------------------------------

  function genEasyChampionClassMCQ() {
    const champ = randomElement(champions);
    const classObj = classes.find((c) => c.id === champ.classId);
    const wrongClasses = shuffle(
      classes.filter((c) => c.id !== champ.classId)
    ).slice(0, 3);

    const allChoices = shuffle([
      { text: classObj.name, correct: true },
      ...wrongClasses.map((c) => ({ text: c.name, correct: false }))
    ]);

    return {
      type: "mcq",
      question: "Which class does " + champ.name + " belong to?",
      choices: allChoices,
      explanation: champ.name + " is a " + classObj.name + " Champion."
    };
  }

  // New: “Which champion belongs to this class?”
  function genEasyChampionFromClassMCQ() {
    const classObj = randomElement(classes);
    const candidates = champions.filter((ch) => ch.classId === classObj.id);
    if (!candidates.length) {
      return genEasyChampionClassMCQ();
    }

    const correctChamp = randomElement(candidates);
    const wrongChamps = shuffle(
      champions.filter((ch) => ch.classId !== classObj.id)
    ).slice(0, 3);

    const choices = shuffle([
      { text: correctChamp.name, correct: true },
      ...wrongChamps.map((c) => ({ text: c.name, correct: false }))
    ]);

    return {
      type: "mcq",
      question:
        "Which of these Champions belongs to the " + classObj.name + " class?",
      choices,
      explanation:
        correctChamp.name +
        " is a " +
        classObj.name +
        " Champion, while the others belong to different classes."
    };
  }

  function genEasyClassAdvantageMCQ() {
    const cls = randomElement(classes);
    const target = classes.find((c) => c.id === cls.strongAgainst);
    const wrong = shuffle(
      classes.filter((c) => c.id !== target.id && c.id !== cls.id)
    ).slice(0, 3);

    const choices = shuffle([
      { text: target.name, correct: true },
      ...wrong.map((c) => ({ text: c.name, correct: false }))
    ]);

    return {
      type: "mcq",
      question:
        "In the standard class wheel, " +
        cls.name +
        " Champions have a class advantage over which class?",
      choices: choices,
      explanation:
        cls.name +
        " gains a class bonus when fighting " +
        target.name +
        " Champions."
    };
  }

  function genEasyClassWeaknessMCQ() {
    const cls = randomElement(classes);
    const target = classes.find((c) => c.id === cls.weakAgainst);
    const wrong = shuffle(
      classes.filter((c) => c.id !== target.id && c.id !== cls.id)
    ).slice(0, 3);

    const choices = shuffle([
      { text: target.name, correct: true },
      ...wrong.map((c) => ({ text: c.name, correct: false }))
    ]);

    return {
      type: "mcq",
      question:
        "According to the class wheel, " +
        cls.name +
        " Champions are weak to which class?",
      choices: choices,
      explanation:
        cls.name +
        " suffers a class penalty when fighting " +
        target.name +
        " Champions."
    };
  }

  function genEasyCurrencyUseMCQ() {
    const cur = randomElement(currencies);
    const wrong = shuffle(currencies.filter((c) => c.id !== cur.id)).slice(0, 3);

    const choices = shuffle(
      [cur, ...wrong].map((c) => ({
        text: c.name,
        correct: c.id === cur.id
      }))
    );

    return {
      type: "mcq",
      question:
        "Which currency is primarily described as: “" + cur.mainUse + "”",
      choices: choices,
      explanation:
        cur.name + " is mainly used this way in Marvel Contest of Champions."
    };
  }

  function genEasyArenaCurrencyMCQ() {
    const arenaCurrency = currencies.find((c) => c.id === "battlechips");
    const wrong = shuffle(
      currencies.filter((c) => c.id !== "battlechips")
    ).slice(0, 3);

    const choices = shuffle(
      [arenaCurrency, ...wrong].map((c) => ({
        text: c.name,
        correct: c.id === "battlechips"
      }))
    );

    return {
      type: "mcq",
      question:
        "Which currency is mainly earned from Arenas and then spent on Arena Crystals?",
      choices: choices,
      explanation:
        "Battlechips are earned by playing Arenas and are used to buy Arena Crystals."
    };
  }

  function genEasyPrimaryCurrencyMCQ() {
    const primaryNames = currencies
      .filter((c) => c.primary)
      .map((c) => c.name);
    const fake = randomElement(["Mana", "Credits", "Energy Points", "Stamina"]);

    const realChoices = shuffle(primaryNames).slice(0, 3);

    const choices = shuffle([
      { text: realChoices[0], correct: false },
      { text: realChoices[1], correct: false },
      { text: realChoices[2], correct: false },
      { text: fake, correct: true }
    ]);

    return {
      type: "mcq",
      question:
        "Which of these is NOT one of the three core primary currencies often listed for Marvel Contest of Champions?",
      choices: choices,
      explanation:
        "Gold, Units and Battlechips are widely cited as the three primary currencies. The fake option is not used in MCOC."
    };
  }

  // New: which is NOT a Champion class
  function genEasyNotAClassMCQ() {
    const real = shuffle(classes)
      .map((c) => c.name)
      .slice(0, 3);
    const fake = randomElement([
      "Elemental",
      "Celestial",
      "Speed",
      "Shadow",
      "Chaos"
    ]);

    const allChoices = shuffle([
      ...real.map((name) => ({ text: name, correct: false })),
      { text: fake, correct: true }
    ]);

    return {
      type: "mcq",
      question:
        "Which of these is NOT one of the six core Champion classes in Marvel Contest of Champions?",
      choices: allChoices,
      explanation:
        "The core classes are Cosmic, Tech, Mutant, Skill, Science and Mystic. The fake option is not a class."
    };
  }

  function genEasyModeDescriptionMCQ() {
    const mode = randomElement(gameModes);
    const wrong = shuffle(
      gameModes.filter((m) => m.id !== mode.id)
    ).slice(0, 3);

    const choices = shuffle(
      [mode, ...wrong].map((m) => ({
        text: m.name,
        correct: m.id === mode.id
      }))
    );

    return {
      type: "mcq",
      question:
        "Which game mode best matches this description: “" +
        mode.description +
        "”",
      choices: choices,
      explanation: mode.name + " is the mode described here."
    };
  }

  function genEasyBuffEffectMCQ() {
    const buff = randomElement(mechanics.buffs);
    const wrong = shuffle(
      mechanics.buffs.filter((b) => b.name !== buff.name)
    ).slice(0, 3);

    const choices = shuffle(
      [buff, ...wrong].map((b) => ({
        text: b.name,
        correct: b.name === buff.name
      }))
    );

    return {
      type: "mcq",
      question:
        "Which buff is best described as: “" + buff.effect + "”",
      choices: choices,
      explanation: "This description belongs to the " + buff.name + " buff."
    };
  }

  function genEasyDebuffEffectMCQ() {
    const debuff = randomElement(mechanics.debuffs);
    const wrong = shuffle(
      mechanics.debuffs.filter((d) => d.name !== debuff.name)
    ).slice(0, 3);

    const choices = shuffle(
      [debuff, ...wrong].map((d) => ({
        text: d.name,
        correct: d.name === debuff.name
      }))
    );

    return {
      type: "mcq",
      question:
        "Which debuff is best described as: “" + debuff.effect + "”",
      choices: choices,
      explanation:
        "This description belongs to the " + debuff.name + " debuff."
    };
  }

  function genEasyComboMeterMCQ() {
    const choices = shuffle([
      {
        text:
          "It tracks how many consecutive hits you land without being hit.",
        correct: true
      },
      {
        text:
          "It tracks how many crystals you have opened since starting the game.",
        correct: false
      },
      {
        text:
          "It tracks the total number of Champions in your roster in real time.",
        correct: false
      },
      {
        text:
          "It tracks how much quest energy you will receive after the fight.",
        correct: false
      }
    ]);

    return {
      type: "mcq",
      question:
        "What does the Combo Meter track during a fight in Marvel Contest of Champions?",
      choices: choices,
      explanation:
        "The Combo Meter shows how many consecutive hits you have landed without taking a hit."
    };
  }

  function genEasyImmunityMCQ() {
    const choiceSets = [
      {
        question:
          "Which Champion in MCOC is known for being immune to Bleed, Poison and Shock effects?",
        correct: "Dust",
        options: ["Dust", "Ghost", "Nick Fury", "Hyperion"],
        explanation:
          "Dust is immune to Bleed, Poison and Shock due to her sand-based body."
      },
      {
        question:
          "Omega Red’s mutant physiology makes him immune to which damage over time effect?",
        correct: "Poison",
        options: ["Poison", "Frostbite", "Shock", "Incinerate"],
        explanation:
          "Omega Red is fully immune to Poison and takes heavily reduced damage from Bleeds."
      }
    ];

    const picked = randomElement(choiceSets);
    const choices = shuffle(
      picked.options.map((txt) => ({
        text: txt,
        correct: txt === picked.correct
      }))
    );

    return {
      type: "mcq",
      question: picked.question,
      choices: choices,
      explanation: picked.explanation
    };
  }

  // NEW: Easy questions around alliance currencies and modes

  function genEasyGloryStoreCurrencyMCQ() {
    const glory = currencies.find((c) => c.id === "glory");
    const wrong = shuffle(
      currencies.filter((c) => c.id !== "glory")
    ).slice(0, 3);

    const choices = shuffle(
      [glory, ...wrong].map((c) => ({
        text: c.name,
        correct: c.id === "glory"
      }))
    );

    return {
      type: "mcq",
      question:
        "Which currency do you mainly spend in the Glory store to buy Alliance Quest rank-up materials and potions?",
      choices,
      explanation:
        "Glory is spent in the Glory store on Alliance Quest resources and is earned primarily from Alliance Quest and Raids."
    };
  }

  function genEasyLoyaltyStoreCurrencyMCQ() {
    const loyalty = currencies.find((c) => c.id === "loyalty");
    const wrong = shuffle(
      currencies.filter((c) => c.id !== "loyalty")
    ).slice(0, 3);

    const choices = shuffle(
      [loyalty, ...wrong].map((c) => ({
        text: c.name,
        correct: c.id === "loyalty"
      }))
    );

    return {
      type: "mcq",
      question:
        "Which currency do you earn from Alliance War and spend in the Loyalty store for boosts and certain Champions?",
      choices,
      explanation:
        "Alliance Loyalty is earned from Alliance War and other alliance activities and is spent in the Loyalty store."
    };
  }

  function genEasyStoryQuestRoleMCQ() {
    const story = gameModes.find((m) => m.id === "story");
    const wrong = shuffle(
      gameModes.filter((m) => m.id !== "story")
    ).slice(0, 3);

    const choices = shuffle(
      [story, ...wrong].map((m) => ({
        text: m.name,
        correct: m.id === "story"
      }))
    );

    return {
      type: "mcq",
      question:
        "Which game mode is the long-term Campaign that tells the core story of the Battlerealm using Acts and Chapters?",
      choices,
      explanation:
        "Story Quests form the main campaign for Marvel Contest of Champions, laid out as Acts and Chapters."
    };
  }

  function genEasyAllianceWarModeMCQ() {
    const aw = gameModes.find((m) => m.id === "allianceWar");
    const wrong = shuffle(
      gameModes.filter((m) => m.id !== "allianceWar")
    ).slice(0, 3);

    const choices = shuffle(
      [aw, ...wrong].map((m) => ({
        text: m.name,
        correct: m.id === "allianceWar"
      }))
    );

    return {
      type: "mcq",
      question:
        "Which game mode is an asynchronous alliance-versus-alliance mode where you place defenders and then attack an enemy alliance's map?",
      choices,
      explanation:
        "Alliance War is the alliance-versus-alliance mode where defenders are placed and then attacked for War rewards and Loyalty."
    };
  }

  function genEasyBuffVsDebuffMCQ() {
    const choices = shuffle([
      { text: "Fury", correct: false },
      { text: "Precision", correct: false },
      { text: "Weakness", correct: true },
      { text: "Regeneration", correct: false }
    ]);

    return {
      type: "mcq",
      question:
        "Which of these is a debuff (negative effect) rather than a buff (positive effect) in Marvel Contest of Champions?",
      choices,
      explanation:
        "Weakness is a debuff that reduces a Champion's Attack Rating, while Fury, Precision and Regeneration are buffs."
    };
  }

  // New: specific immunity-based MCQs using extra champs

  function genEasyIcemanImmunityMCQ() {
    const choices = shuffle([
      {
        text: "Iceman",
        correct: true
      },
      {
        text: "Warlock",
        correct: false
      },
      {
        text: "Dust",
        correct: false
      },
      {
        text: "Omega Red",
        correct: false
      }
    ]);

    return {
      type: "mcq",
      question:
        "Which Champion is naturally immune to Bleed, Poison and Incinerate all at once?",
      choices,
      explanation:
        "Iceman is a Mutant Champion who is immune to Bleed, Poison and Incinerate from the start of the fight."
    };
  }

  function genEasyWarlockImmunityMCQ() {
    const choices = shuffle([
      {
        text: "Warlock",
        correct: true
      },
      {
        text: "Iceman",
        correct: false
      },
      {
        text: "Mephisto",
        correct: false
      },
      {
        text: "Ghost",
        correct: false
      }
    ]);

    return {
      type: "mcq",
      question:
        "Which Tech Champion is fully immune to Bleed, Poison, Cold Snap and Frostbite?",
      choices,
      explanation:
        "Warlock is a Tech Champion who is immune to Bleed, Poison, Cold Snap and Frostbite."
    };
  }

  // --- NEW fun-fact EASY questions (MCQ) -----------------------------------

  function genEasyGameReleaseYearMCQ() {
    const correctYear = gameMeta.releaseYear;
    const options = shuffle([
      correctYear,
      correctYear - 2,
      correctYear + 1,
      correctYear + 3
    ]);
    const choices = options.map((year) => ({
      text: String(year),
      correct: year === correctYear
    }));

    return {
      type: "mcq",
      question:
        "In which year was Marvel Contest of Champions first released worldwide on mobile devices?",
      choices,
      explanation:
        "Marvel Contest of Champions launched globally as a mobile fighting game in " +
        correctYear +
        "."
    };
  }

  function genEasyGameDeveloperMCQ() {
    const choices = shuffle([
      { text: "Kabam", correct: true },
      { text: "Niantic", correct: false },
      { text: "Supercell", correct: false },
      { text: "Square Enix", correct: false }
    ]);

    return {
      type: "mcq",
      question: "Which studio develops Marvel Contest of Champions?",
      choices,
      explanation:
        "Marvel Contest of Champions is developed by Kabam as a free-to-play fighting game for mobile devices."
    };
  }

  function genEasyGameGenreMCQ() {
    const choices = shuffle([
      { text: "Free-to-play mobile fighting game", correct: true },
      { text: "Turn-based card game", correct: false },
      { text: "Open-world action RPG", correct: false },
      { text: "Battle royale shooter", correct: false }
    ]);

    return {
      type: "mcq",
      question:
        "Marvel Contest of Champions is best described as which type of game?",
      choices,
      explanation:
        "It is a free-to-play fighting game built for mobile devices, using one-on-one battles between Marvel characters."
    };
  }

  function genEasySpinOffGameMCQ() {
    const spinoffName = gameMeta.spinOff.name;
    const choices = shuffle([
      { text: spinoffName, correct: true },
      { text: "Marvel Future Fight", correct: false },
      { text: "Marvel Strike Force", correct: false },
      { text: "Contest of Chaos", correct: false }
    ]);

    return {
      type: "mcq",
      question:
        "Which of these was a separate mobile game spin-off set in Battleworld that was linked to Marvel Contest of Champions?",
      choices,
      explanation:
        spinoffName +
        " was a companion game set in Battleworld that tied into the Contest of Champions universe."
    };
  }

  function genEasyComboResetMCQ() {
    const choices = shuffle([
      {
        text: "It usually resets to zero if you are struck by a basic attack.",
        correct: true
      },
      {
        text: "It slowly drains over time even if you are not hit.",
        correct: false
      },
      {
        text:
          "It permanently stays the same for the whole quest once it reaches 100 hits.",
        correct: false
      },
      {
        text: "It converts directly into extra Power whenever you are struck.",
        correct: false
      }
    ]);

    return {
      type: "mcq",
      question:
        "What usually happens to your Combo Meter when your Champion is struck by a basic attack?",
      choices,
      explanation: mechanics.basics.comboReset
    };
  }

  function genEasyQuestEnergyMCQ() {
    const choices = shuffle([
      {
        text:
          "It limits how many tiles you can move in Story and Event Quests before you need to wait or use refills.",
        correct: true
      },
      {
        text: "It determines how many Special Attacks you can throw in each fight.",
        correct: false
      },
      {
        text: "It decides how many times per day you can enter Battlegrounds.",
        correct: false
      },
      {
        text:
          "It is only used to rank up Champions in the upgrade screen.",
        correct: false
      }
    ]);

    return {
      type: "mcq",
      question: "What does Quest Energy do in Story and Event Quests?",
      choices,
      explanation: mechanics.basics.energy
    };
  }

  function genEasyAllianceModePickMCQ() {
    const allianceModes = gameModes.filter((m) => m.type === "alliance");
    const correctMode = randomElement(allianceModes);
    const wrong = shuffle(
      gameModes.filter((m) => m.type !== "alliance")
    ).slice(0, 3);

    const choices = shuffle(
      [correctMode, ...wrong].map((m) => ({
        text: m.name,
        correct: m.id === correctMode.id
      }))
    );

    return {
      type: "mcq",
      question:
        "Which of these game modes is primarily played as alliance content?",
      choices,
      explanation:
        correctMode.name +
        " is an alliance mode, while the other listed modes are primarily solo or non-alliance content."
    };
  }

  function genEasyBattlegroundsDescriptionMCQ() {
    const choices = shuffle([
      {
        text:
          "A competitive deck-based PvP mode with drafting and best-of-three matches.",
        correct: true
      },
      {
        text:
          "A long-term Story campaign that tells the main plot of the Battlerealm.",
        correct: false
      },
      {
        text:
          "A co-op mode where you and a partner push through rooms with random Hacks.",
        correct: false
      },
      {
        text:
          "A daily alliance map-clearing mode played in Battlegroups.",
        correct: false
      }
    ]);

    return {
      type: "mcq",
      question: "How is the Battlegrounds game mode best described?",
      choices,
      explanation:
        "Battlegrounds is a competitive deck-based PvP mode with drafting and best-of-three matches each season."
    };
  }

  function genEasyHerculesImmortalityMCQ() {
    const choices = shuffle([
      { text: "Hercules", correct: true },
      { text: "Nick Fury", correct: false },
      { text: "Ghost", correct: false },
      { text: "Scorpion", correct: false }
    ]);

    return {
      type: "mcq",
      question:
        "Which Champion is famous for building Feats of Strength and gaining an Immortality buff that lets him survive killing blows when awakened?",
      choices,
      explanation:
        "Hercules is a Cosmic Champion who builds Feats of Strength and, when awakened, gains an Immortality buff that prevents him from being knocked out for a short time after a fatal hit."
    };
  }

  function genEasyNickFurySecondLifeMCQ() {
    const choices = shuffle([
      { text: "Nick Fury", correct: true },
      { text: "Warlock", correct: false },
      { text: "Hyperion", correct: false },
      { text: "Mephisto", correct: false }
    ]);

    return {
      type: "mcq",
      question:
        "Which Champion uses a Life Model Decoy so that when he \"dies\" the first time, he comes back in his real form with huge Fury and damage?",
      choices,
      explanation:
        "Nick Fury's signature ability, Life Model Decoy, lets him lose his first health bar and then return in his real form with big Fury and increased damage."
    };
  }

  function genEasyGhostPhasingMCQ() {
    const choices = shuffle([
      { text: "Ghost", correct: true },
      { text: "Kitty Pryde", correct: false },
      { text: "Dust", correct: false },
      { text: "Omega Red", correct: false }
    ]);

    return {
      type: "mcq",
      question:
        "Which Champion is best known for phasing through incoming attacks when she dashes back, causing most hits to Miss and leading to huge burst damage?",
      choices,
      explanation:
        "Ghost is a Tech Champion whose phasing makes most incoming hits Miss while she is phasing, allowing her to build massive burst damage with well-timed Specials."
    };
  }

  function genEasyKittyPrydePhasingMCQ() {
    const choices = shuffle([
      { text: "Kitty Pryde", correct: true },
      { text: "Ghost", correct: false },
      { text: "Dust", correct: false },
      { text: "Captain America (Infinity War)", correct: false }
    ]);

    return {
      type: "mcq",
      question:
        "Which Champion can phase so that she takes no damage from most hits while phased and gains extra Special damage the more Incinerates she has on herself?",
      choices,
      explanation:
        "Kitty Pryde is a Mutant Champion whose phasing prevents most incoming damage, and each Incinerate on her increases her Special Attack damage while she is phased."
    };
  }

  // NEW extra-fun EASY questions --------------------------------------------

  function genEasyNotGameModeMCQ() {
    const realModes = shuffle(gameModes)
      .map((m) => m.name)
      .slice(0, 3);
    const fake = randomElement([
      "Battle Royale",
      "King of the Hill",
      "Dungeon Rush",
      "Summoner Skirmish"
    ]);

    const choices = shuffle([
      ...realModes.map((name) => ({ text: name, correct: false })),
      { text: fake, correct: true }
    ]);

    return {
      type: "mcq",
      question:
        "Which of these is NOT a standard game mode in Marvel Contest of Champions?",
      choices,
      explanation:
        "Core long-term modes include " +
        gameModes.map((m) => m.name).join(", ") +
        ". The fake option is not an actual in-game mode."
    };
  }

  function genEasyNotCurrencyMCQ() {
    const realCurrencies = shuffle(currencies)
      .map((c) => c.name)
      .slice(0, 3);
    const fake = randomElement([
      "Vibranium Shards",
      "Hero Points",
      "Honor Tokens",
      "Crystal Tickets"
    ]);

    const choices = shuffle([
      ...realCurrencies.map((name) => ({ text: name, correct: false })),
      { text: fake, correct: true }
    ]);

    return {
      type: "mcq",
      question:
        "Which of these is NOT a real in-game currency used in Marvel Contest of Champions?",
      choices,
      explanation:
        "Gold, Units, Battlechips, Glory and Alliance Loyalty are all real currencies. The fake option is not used in MCOC."
    };
  }

  function genEasySpinOffShutdownYearMCQ() {
    const year = gameMeta.spinOff.shutdownYear;
    const options = shuffle([year, year - 1, year + 1, year - 2]);
    const choices = options.map((y) => ({
      text: String(y),
      correct: y === year
    }));

    return {
      type: "mcq",
      question:
        "In which year was the spin-off game " +
        gameMeta.spinOff.name +
        " shut down?",
      choices,
      explanation:
        gameMeta.spinOff.name +
        " was shut down in " +
        year +
        ", while Marvel Contest of Champions continues to run."
    };
  }

  // --- HARD question generators (text answers) -----------------------------

  function genHardAnyClass() {
    const accepted = classes.map((c) => c.name.toLowerCase());
    return {
      type: "text",
      question:
        "Name any one of the six core Champion classes in Marvel Contest of Champions.",
      answer: classes[0].name,
      acceptableAnswers: accepted,
      explanation:
        "The six core classes are Cosmic, Tech, Mutant, Skill, Science and Mystic."
    };
  }

  function genHardChampionClass() {
    const champ = randomElement(champions);
    const cls = classes.find((c) => c.id === champ.classId);
    const accepted = buildClassAnswerVariants(cls.name);

    return {
      type: "text",
      question:
        "Which class does " +
        champ.name +
        " belong to? Answer with the class name only.",
      answer: cls.name,
      acceptableAnswers: accepted,
      explanation: champ.name + " is a " + cls.name + " Champion."
    };
  }

  function genHardPremiumCurrency() {
    const units = currencies.find((c) => c.id === "units");

    return {
      type: "text",
      question:
        "What is the name of the premium currency used to buy things like crystals, potions, revives and energy refills?",
      answer: units.name,
      acceptableAnswers: [units.name.toLowerCase(), "unit"],
      explanation:
        "Units are the main premium currency used to purchase many items and offers."
    };
  }

  function genHardArenaCurrency() {
    const bc = currencies.find((c) => c.id === "battlechips");

    return {
      type: "text",
      question:
        "Which currency do you mostly earn in Arenas and then spend on Arena Crystals?",
      answer: bc.name,
      acceptableAnswers: [
        "battlechips",
        "battle chips",
        "battle-chip",
        "battle chip"
      ],
      explanation:
        "Battlechips are obtained from Arena fights and spent on Arena Crystals."
    };
  }

  function genHardEnergyName() {
    return {
      type: "text",
      question:
        "What resource limits how many tiles you can move in Story and Event Quests before you have to wait or use refills?",
      answer: "Energy",
      acceptableAnswers: ["energy", "quest energy"],
      explanation:
        "Quest Energy determines how far you can move on Story and Event Quest maps."
    };
  }

  function genHardDustImmunity() {
    return {
      type: "text",
      question:
        "Dust in MCOC is immune to Bleed and Poison. Name the third damaging effect she is also immune to.",
      answer: "Shock",
      acceptableAnswers: ["shock", "shocks"],
      explanation:
        "Dust is immune to Bleed, Poison and Shock effects thanks to her sand form."
    };
  }

  function genHardOmegaRedPoison() {
    return {
      type: "text",
      question:
        "Which damaging debuff is Omega Red fully immune to because of his mutant physiology?",
      answer: "Poison",
      acceptableAnswers: ["poison", "poisons"],
      explanation:
        "Omega Red is completely immune to Poison effects and takes heavily reduced Bleed damage."
    };
  }

  function genHardGameModeName() {
    const mode = randomElement(gameModes);
    const accepted = buildModeAnswerVariants(mode.name);

    return {
      type: "text",
      question:
        "Which game mode matches this description: “" +
        mode.description +
        "” (answer with the mode name, e.g. Battlegrounds).",
      answer: mode.name,
      acceptableAnswers: accepted,
      explanation: mode.name + " is the mode described here."
    };
  }

  function genHardComboMeterName() {
    return {
      type: "text",
      question:
        "What is the in-fight meter called that tracks how many consecutive hits you land without being hit yourself?",
      answer: "Combo Meter",
      acceptableAnswers: ["combo meter", "combo", "hit combo"],
      explanation:
        "The Combo Meter increases with each landed hit and usually resets when you are struck."
    };
  }

  function genHardBuffName() {
    const buff = randomElement(mechanics.buffs);
    const accepted = [buff.name.toLowerCase()];

    return {
      type: "text",
      question:
        "Name the buff that is best described as: “" + buff.effect + "”",
      answer: buff.name,
      acceptableAnswers: accepted,
      explanation: "That description belongs to the " + buff.name + " buff."
    };
  }

  function genHardDebuffName() {
    const debuff = randomElement(mechanics.debuffs);
    const accepted = [
      debuff.name.toLowerCase(),
      debuff.name.toLowerCase() + " debuff"
    ];

    return {
      type: "text",
      question:
        "Name the debuff that is best described as: “" + debuff.effect + "”",
      answer: debuff.name,
      acceptableAnswers: accepted,
      explanation:
        "That description belongs to the " + debuff.name + " debuff."
    };
  }

  // NEW: extra hard-mode questions using alliance modes and currencies

  function genHardGloryCurrencyName() {
    const glory = currencies.find((c) => c.id === "glory");
    return {
      type: "text",
      question:
        "What is the name of the alliance currency you spend in the Glory store to buy Alliance Quest rank-up materials and potions?",
      answer: glory.name,
      acceptableAnswers: [glory.name.toLowerCase()],
      explanation:
        "Glory is earned mainly from Alliance Quest and Raids and spent in the Glory store."
    };
  }

  function genHardLoyaltyCurrencyName() {
    const loyalty = currencies.find((c) => c.id === "loyalty");
    return {
      type: "text",
      question:
        "Which alliance currency is primarily earned from Alliance War and spent in the Loyalty store for War boosts and certain Champions?",
      answer: loyalty.name,
      acceptableAnswers: [
        "loyalty",
        "alliance loyalty",
        loyalty.name.toLowerCase()
      ],
      explanation:
        "Alliance Loyalty is the currency tied to Alliance War victories and the Loyalty store."
    };
  }

  function genHardBattlegroundsMode() {
    const bg = gameModes.find((m) => m.id === "battlegrounds");
    const accepted = buildModeAnswerVariants(bg.name);
    return {
      type: "text",
      question:
        "In Marvel Contest of Champions, which competitive PvP mode uses a deck of Champions, drafting picks and bans, and best-of-three matches each season?",
      answer: bg.name,
      acceptableAnswers: accepted,
      explanation:
        "Battlegrounds is the competitive deck-based PvP game mode that uses drafting and best-of-three matches."
    };
  }

  function genHardAllianceQuestMode() {
    const aq = gameModes.find((m) => m.id === "allianceQuest");
    const accepted = buildModeAnswerVariants(aq.name);
    return {
      type: "text",
      question:
        "Name the cooperative alliance game mode where Battlegroups clear maps daily to earn Glory and other alliance resources.",
      answer: aq.name,
      acceptableAnswers: accepted,
      explanation:
        "Alliance Quest is the cooperative alliance mode focused on clearing maps for Glory and other rewards."
    };
  }

  function genHardArenaModeName() {
    return {
      type: "text",
      question:
        "What is the name of the score-based game mode where you repeatedly run fights to earn Battlechips, Units, Gold and featured Champion rewards from milestones and rankings?",
      answer: "Arenas",
      acceptableAnswers: ["arena", "arenas"],
      explanation:
        "Arenas are the score-based grind mode that award Battlechips, Units, Gold and featured Champions from milestones and rankings."
    };
  }

  // NEW: immunities & advanced mechanics

  function genHardIcemanTripleImmunity() {
    return {
      type: "text",
      question:
        "Which Mutant Champion is naturally immune to Bleed, Poison and Incinerate all at once?",
      answer: "Iceman",
      acceptableAnswers: ["iceman"],
      explanation:
        "Iceman is a Mutant Champion who is immune to Bleed, Poison and Incinerate from the start of the fight."
    };
  }

  function genHardWarlockQuadImmunity() {
    return {
      type: "text",
      question:
        "Which Tech Champion is fully immune to Bleed, Poison, Cold Snap and Frostbite?",
      answer: "Warlock",
      acceptableAnswers: ["warlock"],
      explanation:
        "Warlock is a Tech Champion with strong utility and total immunity to Bleed, Poison, Cold Snap and Frostbite."
    };
  }

  function genHardProwessBuffName() {
    return {
      type: "text",
      question:
        "What is the name of the buff that specifically increases the damage of Special Attacks rather than all basic hits?",
      answer: "Prowess",
      acceptableAnswers: ["prowess"],
      explanation:
        "Prowess is a buff that boosts Special Attack damage, while Fury boosts overall Attack."
    };
  }

  function genHardArmorBreakDebuffName() {
    return {
      type: "text",
      question:
        "Which debuff removes an Armor Up effect and reduces the opponent's Armor Rating while it is active?",
      answer: "Armor Break",
      acceptableAnswers: ["armor break", "armour break"],
      explanation:
        "Armor Break removes an Armor Up and lowers Armor Rating, allowing your hits to deal more damage."
    };
  }

  function genHardDisorientDebuffName() {
    return {
      type: "text",
      question:
        "Which non-damaging debuff reduces a defender's Defensive Ability Accuracy and Block Proficiency?",
      answer: "Disorient",
      acceptableAnswers: ["disorient"],
      explanation:
        "Disorient is a control debuff that makes defensive abilities less reliable and weakens block."
    };
  }

  function genHardClassAdvantageName() {
    const cls = randomElement(classes);
    const target = classes.find((c) => c.id === cls.strongAgainst);
    const accepted = buildClassAnswerVariants(target.name);

    return {
      type: "text",
      question:
        "In the base class advantage wheel, " +
        cls.name +
        " Champions have an advantage over which class?",
      answer: target.name,
      acceptableAnswers: accepted,
      explanation:
        cls.name +
        " gains a class bonus when fighting " +
        target.name +
        " Champions."
    };
  }

  function genHardClassWeaknessName() {
    const cls = randomElement(classes);
    const target = classes.find((c) => c.id === cls.weakAgainst);
    const accepted = buildClassAnswerVariants(target.name);

    return {
      type: "text",
      question:
        "In the base class advantage wheel, which class do " +
        cls.name +
        " Champions suffer a disadvantage against?",
      answer: target.name,
      acceptableAnswers: accepted,
      explanation:
        cls.name +
        " suffers a class penalty when fighting " +
        target.name +
        " Champions."
    };
  }

  // --- NEW fun-fact HARD / VERY HARD questions (text) ----------------------

  function genHardGameReleaseYear() {
    const year = gameMeta.releaseYear;
    return {
      type: "text",
      question:
        "In which year was Marvel Contest of Champions originally released worldwide on mobile devices? (Answer with the four-digit year.)",
      answer: String(year),
      acceptableAnswers: [String(year)],
      explanation:
        "Marvel Contest of Champions launched globally for iOS and Android in " +
        year +
        "."
    };
  }

  function genHardSpinOffGameName() {
    const spinoff = gameMeta.spinOff.name;
    return {
      type: "text",
      question:
        "Name the mobile game spin-off, set in Battleworld, that was connected to Marvel Contest of Champions and shut down in " +
        gameMeta.spinOff.shutdownYear +
        ".",
      answer: spinoff,
      acceptableAnswers: [
        spinoff.toLowerCase(),
        "realm of champions",
        "marvel realm of champions"
      ],
      explanation:
        spinoff +
        " was a Battleworld-set companion game in the Contest of Champions universe that later shut down."
    };
  }

  function genHardChampionReleaseYearFact() {
    const fact = randomElement(championReleaseYears);
    const yearStr = String(fact.year);
    return {
      type: "text",
      question:
        "In which year was " +
        fact.name +
        " first released as a playable Champion in Marvel Contest of Champions? (Answer with the four-digit year.)",
      answer: yearStr,
      acceptableAnswers: [yearStr],
      explanation:
        fact.name +
        " entered the roster in " +
        fact.year +
        " as part of that year's Champion releases."
    };
  }

  function genVeryHardChampionReleasedInYear() {
    const picked = randomElement(championReleaseYears);
    const year = picked.year;
    const champsSameYear = championReleaseYears
      .filter((c) => c.year === year)
      .map((c) => c.name);

    const canonical = champsSameYear[0];

    return {
      type: "text",
      question:
        "Name any one Champion who was first released in Marvel Contest of Champions in " +
        year +
        ". (Answer with the Champion's name.)",
      answer: canonical,
      acceptableAnswers: champsSameYear.map((name) => name.toLowerCase()),
      explanation:
        "Champions released in " +
        year +
        " include: " +
        champsSameYear.join(", ") +
        "."
    };
  }

  function genVeryHardReleaseOrderPair() {
    let first = randomElement(championReleaseYears);
    let second = randomElement(championReleaseYears);

    let safety = 0;
    while (
      (second.name === first.name || second.year === first.year) &&
      safety < 40
    ) {
      second = randomElement(championReleaseYears);
      safety++;
    }

    const earlier = first.year < second.year ? first : second;
    const later = earlier === first ? second : first;

    return {
      type: "text",
      question:
        "Between " +
        first.name +
        " and " +
        second.name +
        ", which Champion entered Marvel Contest of Champions first?",
      answer: earlier.name,
      acceptableAnswers: [earlier.name.toLowerCase()],
      explanation:
        earlier.name +
        " was released in " +
        earlier.year +
        ", while " +
        later.name +
        " was released in " +
        later.year +
        "."
    };
  }

  function genHardHerculesImmortality() {
    return {
      type: "text",
      question:
        "Which Champion gains an Immortality buff from his awakened ability that prevents him from being knocked out for a short time after a fatal hit?",
      answer: "Hercules",
      acceptableAnswers: ["hercules"],
      explanation:
        "Hercules is a Cosmic Champion whose awakened ability grants an Immortality buff that keeps him alive for a short duration after he would be knocked out."
    };
  }

  function genHardNickFuryLMD() {
    return {
      type: "text",
      question:
        "Which Champion's signature ability, Life Model Decoy, lets him lose his first health bar and then return in his real form with a huge Fury effect and increased damage?",
      answer: "Nick Fury",
      acceptableAnswers: ["nick fury", "nf"],
      explanation:
        "Nick Fury starts fights as a Life Model Decoy. When the decoy is destroyed, he returns in his real form with big Fury and increased damage."
    };
  }

  function genHardGhostPhase() {
    return {
      type: "text",
      question:
        "Name the Tech Champion who can phase while dashing back so that most incoming hits Miss and who is known for huge burst damage when you time her Specials correctly.",
      answer: "Ghost",
      acceptableAnswers: ["ghost"],
      explanation:
        "Ghost is a Tech Champion whose phasing makes most hits Miss while she is phasing and lets her build huge burst damage."
    };
  }

  function genHardKittyPrydePhase() {
    return {
      type: "text",
      question:
        "Which Mutant Champion can phase so she takes no damage from most hits while phased and whose Special Attacks gain extra damage based on the number of Incinerates on her?",
      answer: "Kitty Pryde",
      acceptableAnswers: ["kitty pryde", "kitty"],
      explanation:
        "Kitty Pryde phases to avoid most incoming damage, and each Incinerate on her increases her Special Attack damage while she is phased."
    };
  }

  // NEW: any primary currency

  function genHardAnyPrimaryCurrency() {
    const primary = currencies.filter((c) => c.primary);
    const accepted = primary.map((c) => c.name.toLowerCase());
    return {
      type: "text",
      question:
        "Name any one of the primary currencies commonly used in Marvel Contest of Champions.",
      answer: primary[0].name,
      acceptableAnswers: accepted,
      explanation:
        "Commonly cited primary currencies are " +
        primary.map((c) => c.name).join(", ") +
        "."
    };
  }

  // --- Split HARD vs VERY HARD pools (no overlap) --------------------------

  const easyGenerators = [
    genEasyChampionClassMCQ,
    genEasyChampionClassMCQ,
    genEasyChampionClassMCQ,
    genEasyChampionFromClassMCQ,
    genEasyClassAdvantageMCQ,
    genEasyClassWeaknessMCQ,
    genEasyCurrencyUseMCQ,
    genEasyArenaCurrencyMCQ,
    genEasyPrimaryCurrencyMCQ,
    genEasyNotAClassMCQ,
    genEasyModeDescriptionMCQ,
    genEasyBuffEffectMCQ,
    genEasyDebuffEffectMCQ,
    genEasyComboMeterMCQ,
    genEasyComboResetMCQ,
    genEasyQuestEnergyMCQ,
    genEasyImmunityMCQ,
    genEasyGloryStoreCurrencyMCQ,
    genEasyLoyaltyStoreCurrencyMCQ,
    genEasyStoryQuestRoleMCQ,
    genEasyAllianceWarModeMCQ,
    genEasyAllianceModePickMCQ,
    genEasyBuffVsDebuffMCQ,
    genEasyIcemanImmunityMCQ,
    genEasyWarlockImmunityMCQ,
    genEasyBattlegroundsDescriptionMCQ,
    genEasyHerculesImmortalityMCQ,
    genEasyNickFurySecondLifeMCQ,
    genEasyGhostPhasingMCQ,
    genEasyKittyPrydePhasingMCQ,
    // fun-fact and extra-fun easy questions:
    genEasyGameReleaseYearMCQ,
    genEasyGameDeveloperMCQ,
    genEasyGameGenreMCQ,
    genEasySpinOffGameMCQ,
    genEasyNotGameModeMCQ,
    genEasyNotCurrencyMCQ,
    genEasySpinOffShutdownYearMCQ
  ];

  const hardGenerators = [
    genHardAnyClass,
    genHardChampionClass,
    genHardChampionClass,
    genHardChampionClass,
    genHardPremiumCurrency,
    genHardArenaCurrency,
    genHardEnergyName,
    genHardGameModeName,
    genHardComboMeterName,
    genHardBuffName,
    genHardDebuffName,
    genHardGloryCurrencyName,
    genHardLoyaltyCurrencyName,
    genHardBattlegroundsMode,
    genHardAllianceQuestMode,
    genHardArenaModeName,
    genHardHerculesImmortality,
    genHardNickFuryLMD,
    genHardGhostPhase,
    genHardKittyPrydePhase,
    genHardAnyPrimaryCurrency
  ];

  // Very hard = advanced immunities, class wheel, and history / fun facts
  const veryHardGenerators = [
    genHardDustImmunity,
    genHardOmegaRedPoison,
    genHardIcemanTripleImmunity,
    genHardWarlockQuadImmunity,
    genHardProwessBuffName,
    genHardArmorBreakDebuffName,
    genHardDisorientDebuffName,
    genHardClassAdvantageName,
    genHardClassWeaknessName,
    genHardGameReleaseYear,
    genHardSpinOffGameName,
    genHardChampionReleaseYearFact,
    genVeryHardChampionReleasedInYear,
    genVeryHardReleaseOrderPair
  ];

  // --- Public generator used by the core game ------------------------------

  function generateQuizQuestions(mode, desiredCount) {
    let generators;

    if (mode === "easy") {
      generators = easyGenerators;
    } else if (mode === "hard") {
      generators = hardGenerators;
    } else if (mode === "veryHard") {
      generators = veryHardGenerators;
    } else {
      // Fallback – shouldn't happen with your current HTML,
      // but this keeps it safe.
      generators = easyGenerators;
    }

    const generated = [];
    const usedTexts = new Set();
    let safety = 0;

    while (generated.length < desiredCount && safety < 2000) {
      const gen = randomElement(generators);
      const q = gen();
      const key = q.question.toLowerCase().trim();

      if (!usedTexts.has(key)) {
        generated.push(q);
        usedTexts.add(key);
      }

      safety++;
    }

    return generated;
  }

  // Expose only what the game needs
  global.MCOC_QUIZ_BANK = {
    generateQuizQuestions: generateQuizQuestions
  };
})(window);
