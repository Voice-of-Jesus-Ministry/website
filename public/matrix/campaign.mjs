// Local gameplay state is not proof of membership, identity, or an upload entitlement.
export const SAVE_KEY = 'voj-matrix-campaign-v1';
export const UPGRADES = {
  focus: { name: 'Guidance reserve', cost: 25, detail: 'One hint in the next puzzle or reflection chapter', max: 2 },
  shield: { name: 'Shield reserve', cost: 25, detail: '+30 integrity next mission', max: 2 },
  energy: { name: 'Energy reserve', cost: 25, detail: '+60 building energy next mission', max: 2 },
  power: { name: 'Signal amplifier', cost: 50, detail: '+25% tower / ship damage next mission', max: 2 },
};
export const CHAPTERS = [
  { title: 'Rooftop Dawn', mode: 'defense', art: 'chapter-1.jpg', text: 'Electra watches the city awaken. Her first choice is to protect a path for others, rather than control them. Build wards beside the route and let your light serve your neighbors.', reference: 'Matthew 5:14–16', goal: 'Place towers beside the glowing path, then start the wave. Protect the exit from 12 packets.' },
  { title: 'The Architecture of Guilt', mode: 'match', art: 'chapter-2.jpg', text: 'The Core calls Electra the sum of her failures. She learns to distinguish an honest memory from a final verdict. Untangle the pattern, just as Peter learned that failure need not end his calling.', reference: 'John 21:15–19', goal: 'Swap two adjacent symbols to make a line of three. Clear 24 symbols. Invalid swaps return to their starting positions.' },
  { title: 'The Exodus Route', mode: 'defense', art: 'chapter-3.jpg', text: 'A dazzling tree has captured the city’s attention. Electra turns toward the people trying to leave its shadow. Protect their route; courage becomes useful when it makes room for someone else.', reference: 'Luke 10:30–37', goal: 'Protect the route from 20 stronger packets. Precision and slow towers are now available.' },
  { title: 'Human Connection', mode: 'choice', art: 'chapter-4.jpg', text: 'At a golden bridge, Electra meets someone the system has overlooked. Connection is a choice, not an automatic protocol. Practice mercy, truth, and patient listening before returning to the city.', reference: 'James 1:19; Ephesians 4:32', goal: 'Work through three Scripture-guided choices. Feedback explains each choice; you can try again.' },
  { title: 'The Luminous Question', mode: 'shooter', art: 'chapter-5.jpg', text: 'A luminous question rises over the city. Void packets try to drown it out. Electra clears the signal so people can hear and reflect. Move your ship and protect the space for thoughtful questions.', reference: 'James 1:5', goal: 'Clear all 18 signal invaders. Move with arrows or A/D; press Space to fire. Touch controls are below.' },
  { title: 'The Mirror and the Mask', mode: 'maze', art: 'chapter-6.jpg', text: 'The labyrinth asks Electra to face what she would rather hide. Each light is a moment of honest reflection. Gather the lights, avoid the sentinels, and keep moving with hope.', reference: 'Psalm 139:23–24', goal: 'Collect all 12 lights. Move one cell at a time with arrows, WASD, or the touch controls; walls cannot be crossed.' },
  { title: 'A Matrix of Conscience', mode: 'boss', art: 'chapter-7.jpg', text: 'Dawn has become dusk. Electra brings protection, discernment, and connection together. The city’s final guardian will not fall by waiting: move, fire, and shield the signal until the route is clear.', reference: 'Romans 12:2; 1 Corinthians 13:13', goal: 'Defeat the guardian by firing at its core while dodging incoming packets. Your quiz upgrades apply here too.' },
];
const q = (text, options, answer, reference, explanation) => ({ text, options, answer, reference, explanation });
export const QUIZZES = [
  [q('Jesus compared His followers to the light of what?', ['The world', 'A palace', 'A hidden cave'], 0, 'Matthew 5:14', 'Jesus calls His disciples the light of the world.'), q('Why should our light shine before others?', ['To win praise for ourselves', 'So they see good works and glorify the Father', 'To avoid serving others'], 1, 'Matthew 5:16', 'Good works point others toward the Father.'), q('What did Jesus call the greatest commandment?', ['Gain power', 'Avoid every question', 'Love the Lord your God'], 2, 'Matthew 22:37–38', 'Jesus places love for God at the center.')],
  [q('How many times did Peter deny knowing Jesus?', ['Once', 'Three times', 'Seven times'], 1, 'Luke 22:54–62', 'Peter remembered Jesus’ warning after the rooster crowed.'), q('What did Jesus ask Peter beside the sea?', ['Do you love me?', 'Where is your sword?', 'Have you won?'], 0, 'John 21:15–17', 'Jesus asked about Peter’s love and called him to care for His sheep.'), q('What responsibility did Jesus give Peter?', ['Hide from everyone', 'Count the boats', 'Feed and tend His sheep'], 2, 'John 21:15–17', 'Restoration included a renewed responsibility to serve.')],
  [q('Who showed mercy to the injured traveler?', ['The Samaritan', 'The robbers', 'No one'], 0, 'Luke 10:30–37', 'The Samaritan stopped and cared for the wounded traveler.'), q('What did Jesus tell the listener to do?', ['Wait for applause', 'Go and do likewise', 'Ignore the traveler'], 1, 'Luke 10:37', 'Jesus called the listener to practice mercy.'), q('Who is named in the second great commandment?', ['Only the powerful', 'Only our friends', 'Our neighbor'], 2, 'Matthew 22:39', 'Love your neighbor as yourself.')],
  [q('James says we should be swift to do what?', ['Hear', 'Accuse', 'Become angry'], 0, 'James 1:19', 'Be swift to hear, slow to speak, and slow to wrath.'), q('How should believers treat one another?', ['With contempt', 'With kindness and forgiveness', 'With indifference'], 1, 'Ephesians 4:32', 'Be kind, tenderhearted, and forgiving.'), q('What does a soft answer turn away?', ['Every responsibility', 'All questions', 'Wrath'], 2, 'Proverbs 15:1', 'A gentle answer can interrupt the escalation of anger.')],
  [q('What should someone who lacks wisdom do?', ['Ask God', 'Pretend to know', 'Stop learning'], 0, 'James 1:5', 'James invites those who lack wisdom to ask God.'), q('What should we do with what we hear?', ['Believe every claim without thought', 'Examine it and hold fast to what is good', 'Reject all teaching'], 1, '1 Thessalonians 5:21', 'Test all things and hold fast to what is good.'), q('What guides our path in Psalm 119?', ['Popularity', 'Fear', 'God’s word'], 2, 'Psalm 119:105', 'God’s word is a lamp to the feet and a light to the path.')],
  [q('What does the psalmist ask God to search?', ['The heart', 'A storehouse', 'The sea'], 0, 'Psalm 139:23', 'The prayer invites God to search and know the heart.'), q('Where does the psalmist ask to be led?', ['Toward revenge', 'In the everlasting way', 'Away from truth'], 1, 'Psalm 139:24', 'The prayer seeks God’s lasting way.'), q('What should confession be joined with?', ['Blaming others', 'Hiding the truth', 'Turning away from wrongdoing'], 2, 'Proverbs 28:13', 'The proverb connects confession and forsaking sin with mercy.')],
  [q('Romans 12:2 speaks of renewal of what?', ['The mind', 'A throne', 'A wall'], 0, 'Romans 12:2', 'Paul describes transformation through the renewing of the mind.'), q('Which is greatest among faith, hope, and love?', ['Fame', 'Love', 'Strength'], 1, '1 Corinthians 13:13', 'Paul names love as the greatest of these.'), q('What is the fruit of the Spirit listed first?', ['Wealth', 'Victory', 'Love'], 2, 'Galatians 5:22–23', 'Love begins Paul’s list of the fruit of the Spirit.')],
];
export const freshCampaign = () => ({ version: 1, level: 0, phase: 'briefing', bank: 0, earned: 0, spent: 0, answers: [], upgrades: { focus: 0, shield: 0, energy: 0, power: 0 } });
export function restoreCampaign(raw) {
  try {
    const v = JSON.parse(raw);
    if (v?.version !== 1 || !Number.isInteger(v.level) || v.level < 0 || v.level >= CHAPTERS.length || !['briefing', 'quiz', 'shop', 'victory'].includes(v.phase)) return freshCampaign();
    if (!Array.isArray(v.answers) || v.answers.length > 3 || v.answers.some(a => !Number.isInteger(a) || a < 0 || a > 2)) return freshCampaign();
    if (![v.bank, v.earned, v.spent].every(n => Number.isInteger(n) && n >= 0 && n <= 1575) || v.bank !== v.earned - v.spent) return freshCampaign();
    if (!v.upgrades || Object.keys(UPGRADES).some(k => !Number.isInteger(v.upgrades[k]) || v.upgrades[k] < 0 || v.upgrades[k] > UPGRADES[k].max)) return freshCampaign();
    if ((v.phase === 'shop' || v.phase === 'victory') && v.answers.length !== 3) return freshCampaign();
    if (v.phase === 'victory' && v.level !== 6) return freshCampaign();
    return { ...freshCampaign(), level: v.level, phase: v.phase, bank: v.bank, earned: v.earned, spent: v.spent, answers: [...v.answers], upgrades: { ...v.upgrades } };
  } catch { return freshCampaign(); }
}
export function finishMission(s) { return s.phase === 'briefing' ? { ...s, phase: 'quiz', answers: [], upgrades: { focus: 0, shield: 0, energy: 0, power: 0 } } : s; }
export function availableUpgrade(level, key) {
  const mode=CHAPTERS[level+1]?.mode;
  return key==='energy'?mode==='defense':key==='power'?['defense','shooter','boss'].includes(mode):key==='shield'?['defense','shooter','boss','maze'].includes(mode):key==='focus'?['match','choice'].includes(mode):false;
}
export function answerQuestion(s, choice) {
  if (s.phase !== 'quiz' || s.answers.length >= 3 || !Number.isInteger(choice) || choice < 0 || choice > 2) return s;
  const reward = choice === QUIZZES[s.level][s.answers.length].answer ? 25 : 0;
  const answers = [...s.answers, choice];
  return { ...s, answers, bank: s.bank + reward, earned: s.earned + reward, phase: answers.length === 3 ? (s.level === 6 ? 'victory' : 'shop') : 'quiz' };
}
export function buyUpgrade(s, key) {
  const u = UPGRADES[key];
  if (s.phase !== 'shop' || !u || !availableUpgrade(s.level,key) || s.bank < u.cost || s.upgrades[key] >= u.max) return s;
  return { ...s, bank: s.bank - u.cost, spent: s.spent + u.cost, upgrades: { ...s.upgrades, [key]: s.upgrades[key] + 1 } };
}
export function nextMission(s) { return s.phase === 'shop' && s.level < 6 ? { ...s, level: s.level + 1, phase: 'briefing', answers: [] } : s; }
export function missionBonuses(s) { return { hp: 100 + s.upgrades.shield * 30, energy: 180 + s.upgrades.energy * 60, damage: 1 + s.upgrades.power * .25, hints:s.upgrades.focus }; }
