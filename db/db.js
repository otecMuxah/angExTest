const courses = [
  {
    id: 1,
    name: "Fundamentals of Credit",
    imageUrl: "https://picsum.photos/100/100",
    status: "DRAFT",
    instructors: [
      {
        name: "Roli Jain",
        image: "https://picsum.photos/300/300",
      },
      {
        name: "Sebastian Taylor",
        image: "https://picsum.photos/300/300",
      },
    ],
  },
  {
    id: 2,
    name: "Accounting Fundamentals",
    status: "PUBLISHED",
    imageUrl: "https://picsum.photos/100/100",
    instructors: [
      {
        name: "Roli Jain",
        image: "https://picsum.photos/300/300",
      },
    ],
  },
];

const courseDetailed = [
  {
    id: 1,
    name: "Fundamentals of Credit",
    status: "DRAFT",
    images: [
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
    ],
    instructors: [
      {
        name: "Roli Jain",
        image: "https://picsum.photos/300/300",
      },
      {
        name: "Sebastian Taylor",
        image: "https://picsum.photos/300/300",
      },
    ],
  },
  {
    id: 2,
    name: "Accounting Fundamentals",
    status: "PUBLISHED",
    images: [
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
    ],
    instructors: [
      {
        name: "Roli Jain",
        image: "https://picsum.photos/300/300",
      },
    ],
  },
];

module.exports = { courses, courseDetailed }
