// Adapted from AmazingGrace src/modules/bible-study/questions.json and arcade/bible-study/index.html.
// GPL-3.0; provenance is recorded in THIRD_PARTY_NOTICES.md.
// Scripture references are provided for study; feedback is a paraphrase, not a quoted translation.
export type Question = {
  id: string;
  text: string;
  choices: string[];
  answerIndex: number;
  reference: string;
  explanation: string;
};
export const questions: Question[] = [
  {
    id: "hearers",
    text: "According to James 1:22, what must believers not be?",
    choices: [
      "Hearers only",
      "Teachers only",
      "Workers only",
      "Preachers only",
    ],
    answerIndex: 0,
    reference: "James 1:22",
    explanation: "James encourages believers to put the word into practice.",
  },
  {
    id: "heart",
    text: "What does David ask God to create in him?",
    choices: ["A strong body", "A clean heart", "A wise mind", "A bold spirit"],
    answerIndex: 1,
    reference: "Psalm 51:10",
    explanation: "David asks for a clean heart and a renewed spirit.",
  },
  {
    id: "noah",
    text: "How many days and nights did it rain during Noah’s flood?",
    choices: ["7", "20", "40", "120"],
    answerIndex: 2,
    reference: "Genesis 7:12",
    explanation: "Rain fell for forty days and forty nights.",
  },
  {
    id: "joseph",
    text: "Who was sold by his brothers and taken to Egypt?",
    choices: ["Moses", "Joseph", "Benjamin", "Isaac"],
    answerIndex: 1,
    reference: "Genesis 37:28",
    explanation: "Joseph’s brothers sold him, and he was taken to Egypt.",
  },
  {
    id: "bethlehem",
    text: "In which town was Jesus born?",
    choices: ["Nazareth", "Jerusalem", "Bethlehem", "Jericho"],
    answerIndex: 2,
    reference: "Luke 2:4–7",
    explanation: "Jesus was born in Bethlehem.",
  },
  {
    id: "apostles",
    text: "How many apostles did Jesus choose in Luke 6:13?",
    choices: ["7", "10", "12", "70"],
    answerIndex: 2,
    reference: "Luke 6:13",
    explanation: "Jesus chose twelve disciples and named them apostles.",
  },
  {
    id: "cana",
    text: "What sign did Jesus perform at the wedding in Cana?",
    choices: [
      "Healing the blind",
      "Turning water into wine",
      "Walking on water",
      "Feeding five thousand",
    ],
    answerIndex: 1,
    reference: "John 2:1–11",
    explanation: "At Cana, Jesus turned water into wine.",
  },
  {
    id: "baptism",
    text: "Who baptized Jesus in the Jordan River?",
    choices: ["Peter", "Philip", "John the Baptist", "Andrew"],
    answerIndex: 2,
    reference: "Matthew 3:13",
    explanation: "Jesus came to John the Baptist to be baptized.",
  },
  {
    id: "acts",
    text: "Which book immediately follows John in the New Testament?",
    choices: ["Romans", "Acts", "Galatians", "Hebrews"],
    answerIndex: 1,
    reference: "New Testament book order",
    explanation: "Acts follows the four Gospels.",
  },
  {
    id: "jonah",
    text: "Which prophet was swallowed by a great fish?",
    choices: ["Elijah", "Jonah", "Ezekiel", "Amos"],
    answerIndex: 1,
    reference: "Jonah 1:17",
    explanation: "A great fish swallowed Jonah.",
  },
];
