import type { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id:  'ee7fa58c-0dba-4ae7-80db-20a9ad9fa47e',
    comment: 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    rating: 5,
    user: {
      name: 'Christina',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/7.jpg',
      isPro: true,
    },
    date: '2025-10-17T21:00:00.200Z',
  },

  {
    id:  'ee7fa58c-0dba-4ae7-80db-20a9ad9fa47e',
    comment: 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    rating: 5,
    user: {
      name: 'Kendall',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/9.jpg',
      isPro: false,
    },
    date: '2025-10-14T21:00:00.200Z',
  },

  {
    id:  '7ea6b89b-0505-437a-98ba-e983f9ea6fa5',
    comment: 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    rating: 1,
    user: {
      name: 'Isaac',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/6.jpg',
      isPro: true,
    },
    date: '2025-10-14T21:00:00.200Z',
  },
];
