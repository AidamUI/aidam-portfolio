/**
 * Real photos used around the site, outside the project and documentation
 * galleries (which carry their own image lists). Dimensions are the actual
 * file's pixel size, which next/image needs to avoid layout shift.
 */
export const PERSONAL_PHOTOS = {
  headshot: {
    src: "/images/personal/headshot.jpg",
    alt: "Portrait of Aidam.",
    width: 1200,
    height: 1600,
  },
  about: {
    src: "/images/personal/about.jpg",
    alt: "Aidam above the clouds at sunrise, partway up a mountain trail.",
    width: 960,
    height: 1280,
  },
  academic: {
    src: "/images/personal/academic.jpg",
    alt: "Aidam outside the Fasilkom UI building, wearing a yellow orientation jacket.",
    width: 1600,
    height: 1600,
  },
  workProfessional: {
    src: "/images/personal/work-professional.jpg",
    alt: "Aidam standing in front of the IBM logo at the office.",
    width: 1281,
    height: 1442,
  },
  workTeaching: {
    src: "/images/personal/work-teaching.jpg",
    alt: "A computer lab full of students during a teaching session.",
    width: 1200,
    height: 1600,
  },
  workOrganisational: {
    src: "/images/personal/work-organisational.jpg",
    alt: "A large group photo from a student organisation event.",
    width: 1500,
    height: 844,
  },
} as const;
