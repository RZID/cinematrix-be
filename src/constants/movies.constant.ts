import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';

export default [
  {
    title: 'Laskar Pelangi',
    description:
      'Laskar Pelangi adalah sebuah film drama Indonesia tahun 2008 yang disutradarai oleh Riri Riza dari skenario yang ditulis oleh Salman Aristo bersama Riri dan Mira Lesmana berdasarkan novel berjudul sama karya Andrea Hirata. Film ini diproduksi oleh Miles Films bersama Mizan Productions dan SinemArt.',
    rating: 5.0,
    releaseDate: '2008-09-25 00:00:00.000',
    media: [
      {
        fileUrl:
          'https://upload.wikimedia.org/wikipedia/id/1/17/Laskar_Pelangi_film.jpg',
        altName: 'Cover laskar pelangi',
        isBanner: true,
        type: 'PHOTO',
      },

      {
        fileUrl:
          'https://www.youtube.com/embed/8ZYOqARRTng?si=6gA5MCx-DwK6WeB0',
        altName: 'Trailer laskar pelangi',
        isBanner: false,
        type: 'VIDEO',
      },
    ],
  },

  {
    title: 'KKN di Desa Penari',
    description:
      'KKN di Desa Penari (Hanacaraka: ꦏ꧀ꦏ꧀ꦤ꧀ꦝꦶꦣꦺꦱꦥꦼꦤꦫꦶ) adalah film hantu Indonesia tahun 2022 yang disutradarai oleh Awi Suryadi berdasarkan cerita viral berjudul sama karya SimpleMan. Film produksi MD Pictures serta Pichouse Films ini dibintangi oleh Tissa Biani, Adinda Thomas, dan Achmad Megantara. KKN di Desa Penari tayang perdana di bioskop Indonesia pada 30 April 2022. Film ini sempat dijadwalkan akan tayang pada 19 Maret 2020 dan 24 Februari 2022. Namun, keduanya dibatalkan karena pandemi Covid-19.',
    rating: 4.8,
    releaseDate: '2022-04-30 00:00:00.000',
    media: [
      {
        fileUrl:
          'https://upload.wikimedia.org/wikipedia/id/b/b7/KKN_di_Desa_Penari.jpg',
        altName: 'Cover KKN Di Desa Penari',
        isBanner: true,
        type: 'PHOTO',
      },

      {
        fileUrl:
          'https://www.youtube.com/embed/PAMx9m4Z2V4?si=qBitPYPvNhITKEEz',
        altName: 'Trailer KKN Di Desa Penari',
        isBanner: false,
        type: 'VIDEO',
      },
    ],
  },

  {
    title: 'Avengers: Endgame',
    description:
      'Avengers: Endgame adalah film pahlawan super Amerika tahun 2019 yang berdasarkan kisah tim pahlawan super Avengers dari Marvel Comics. Film yang diproduksi oleh Marvel Studios dan didistribusikan oleh Walt Disney Studios Motion Pictures ini adalah sekuel langsung Avengers: Infinity War (2018) dan merupakan film ke-22 Marvel Cinematic Universe (MCU). Film ini disutradarai oleh Anthony dan Joe Russo dan ditulis oleh Christopher Markus dan Stephen McFeely, dan menampilkan pemeran ensambel di antaranya Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner, Don Cheadle, Paul Rudd, Brie Larson, Karen Gillan, Danai Gurira, Benedict Wong, Jon Favreau, Bradley Cooper, Gwyneth Paltrow, dan Josh Brolin. Pada film ini, anggota Avengers yang masih hidup dan para sekutunya berusaha untuk membalikkan kerusakan yang disebabkan oleh Thanos dalam Infinity War.',
    rating: 4.5,
    releaseDate: '2019-04-26 00:00:00.000',
    media: [
      {
        fileUrl:
          'https://upload.wikimedia.org/wikipedia/id/0/0d/Avengers_Endgame_poster.jpg',
        altName: 'Cover Avengers Endgame',
        isBanner: true,
        type: 'PHOTO',
      },

      {
        fileUrl:
          'https://www.youtube.com/embed/TcMBFSGVi1c?si=BaIseKf4Ot79eYL9',
        altName: 'Trailer Avengers Endgame',
        isBanner: false,
        type: 'VIDEO',
      },
    ],
  },
] as CreateMovieDto[];
