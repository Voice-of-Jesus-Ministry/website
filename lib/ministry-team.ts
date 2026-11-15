export type MinistryLeader = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  description: string;
  ministryArt?: boolean;
};

export const ministryLeaders: MinistryLeader[] = [
  {
    name: "Nicholai Madias",
    role: "President & Director",
    image: "/media/people/nicholai-madias.png",
    imageAlt: "Illustrated portrait of Nicholai Madias",
    description: "Serving the ministry through organizational leadership.",
  },
  {
    name: "Sheila Garcia",
    role: "Vice President & Director",
    image: "/media/people/sheila-garcia.png",
    imageAlt: "Illustrated portrait of Sheila Garcia",
    description: "Supporting the ministry's faith-centered mission and service.",
  },
  {
    name: "Lea Asis",
    role: "Secretary & Director",
    image: "/media/people/lea-asis.png",
    imageAlt: "Illustrated portrait of Lea Asis",
    description: "Supporting the ministry's leadership and administration.",
  },
  {
    name: "Pastor Sharon Barber",
    role: "Treasurer & Director",
    image: "/media/people/sharon-barber.jpg",
    imageAlt: "Illustrated portrait of Pastor Sharon Barber",
    description: "Serving in pastoral leadership and as a board officer.",
  },
  {
    name: "Pastor Allen Oprecina",
    role: "Director & Bible Study Leader",
    image: "/media/people/allen-oprecina-ministry.jpg",
    imageAlt: "Illustration of Pastor Allen teaching Bible study",
    description: "Leading Bible teaching and fellowship for the ministry community.",
    ministryArt: true,
  },
];
