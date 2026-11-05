import type { ComponentType } from "react";
import type { Caption } from "./components/Captions";
import { Crisis } from "./scenes/Crisis";
import { Discover } from "./scenes/Discover";
import { Growth } from "./scenes/Growth";
import { Hollow } from "./scenes/Hollow";
import { Intro } from "./scenes/Intro";
import { Mandate } from "./scenes/Mandate";
import { Meet } from "./scenes/Meet";
import { Realize } from "./scenes/Realize";
import { Slope } from "./scenes/Slope";
import { Takeaway } from "./scenes/Takeaway";

export const FPS = 30;
const TARGET_SECONDS = 180; // script.md: 3 minutes
const MAX_CHARS_PER_SECOND = 18;

type Scene = { Visual: ComponentType; captions: Caption[] };

// A scene lasts as long as its captions, so its animation cues follow these seconds.
export const TIMELINE: Scene[] = [
  {
    Visual: Intro,
    captions: [
      { text: "Bayangkan sebuah alat yang mampu mengerjakan hampir semua tugasmu.", seconds: 6 },
      { text: "Apa jadinya jika kamu benar-benar menyerahkan semuanya kepada alat itu?", seconds: 6 },
    ],
  },
  {
    Visual: Meet,
    captions: [
      { text: "Ini Raka, mahasiswa Ilmu Komputer.", seconds: 5 },
      { text: "Rekursi, pointer, algoritma... semuanya terasa terlalu sulit.", seconds: 5 },
      { text: "Semalaman dia menatap layar, dan tetap tidak mengerti.", seconds: 5 },
    ],
  },
  {
    Visual: Discover,
    captions: [
      { text: "Lalu Raka menemukan AI, dan mulai bertanya.", seconds: 6 },
      { text: "Bukan meminta jawaban, melainkan meminta penjelasan.", seconds: 6 },
      { text: "AI menjelaskan dengan sabar, lalu Raka sendiri yang menulis kodenya.", seconds: 7 },
    ],
  },
  {
    Visual: Growth,
    captions: [
      { text: "Perlahan, konsep yang sulit mulai masuk akal.", seconds: 5 },
      { text: "Tugasnya selesai lebih cepat. Pemahamannya pun ikut bertambah.", seconds: 5 },
      { text: "Raka bersemangat. Rasanya tidak ada yang mustahil.", seconds: 4 },
    ],
  },
  {
    Visual: Slope,
    captions: [
      { text: "Tetapi kemudian muncul godaan kecil: kenapa tidak sekalian saja?", seconds: 6 },
      { text: "Pertama, tugas kuliah.", seconds: 4 },
      { text: "Lalu proyek dan presentasi.", seconds: 4 },
      { text: "Bahkan keputusan yang seharusnya dia ambil sendiri.", seconds: 5 },
      { text: "Raka makin jarang berpikir. AI makin banyak bekerja.", seconds: 5 },
    ],
  },
  {
    Visual: Hollow,
    captions: [
      { text: "Hasilnya terlihat mengesankan. Nilai bagus, pujian datang.", seconds: 6 },
      { text: "Tetapi Raka tidak lagi memahami apa yang dia kumpulkan.", seconds: 6 },
      { text: "Karyanya tampak megah, tetapi isinya kosong.", seconds: 5 },
    ],
  },
  {
    Visual: Crisis,
    captions: [
      { text: "Lalu datang masalah yang sesungguhnya.", seconds: 5 },
      { text: "Saat demo proyek, sistemnya rusak, dan dosen bertanya: mengapa kodemu ditulis seperti ini?", seconds: 8 },
      { text: "Raka terdiam. Kode itu atas namanya, tetapi dia tidak bisa memperbaikinya sendiri.", seconds: 8 },
    ],
  },
  {
    Visual: Realize,
    captions: [
      { text: "Di situlah Raka sadar: masalahnya bukan pada AI.", seconds: 5 },
      { text: "Masalahnya, dia telah menyerahkan tanggung jawabnya.", seconds: 5 },
      { text: "AI seharusnya mengasah kemampuannya, bukan menghapus tanggung jawabnya.", seconds: 5 },
    ],
  },
  {
    Visual: Mandate,
    captions: [
      { text: "Sejak awal, Allah memanggil manusia untuk bekerja dan mengusahakan ciptaan-Nya.", seconds: 8 },
      { text: "Dari cangkul hingga komputer, alat selalu menolong kita menjalankan panggilan itu.", seconds: 8 },
      { text: "AI pun bisa menolong. Namun memakainya untuk lari dari tanggung jawab merusak tujuan kerja itu sendiri.", seconds: 7 },
    ],
  },
  {
    Visual: Takeaway,
    captions: [
      { text: "Gunakan AI untuk belajar, mengeksplorasi, dan memperbaiki karyamu.", seconds: 6 },
      { text: "Tetapi jangan biarkan AI menggantikan pemikiran, integritas, dan tanggung jawabmu.", seconds: 7 },
      { text: "AI boleh membantu pekerjaan kita, tetapi tanggung jawab tetap milik kita.", seconds: 7 },
    ],
  },
];

const captions = TIMELINE.flatMap((scene) => scene.captions);
const totalSeconds = captions.reduce((sum, c) => sum + c.seconds, 0);

if (totalSeconds !== TARGET_SECONDS) {
  throw new Error(`Timeline is ${totalSeconds}s, expected ${TARGET_SECONDS}s`);
}
for (const c of captions) {
  if (c.text.length / c.seconds > MAX_CHARS_PER_SECOND) {
    throw new Error(`Caption too fast to read: "${c.text}"`);
  }
}

export const TOTAL_FRAMES = totalSeconds * FPS;
