export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  streamUrl: string;
  tagline: string;
  badge: 'AFRICAN' | 'COUNTRY' | 'URBAN' | 'CONTEMPORARY' | 'OLD SCHOOL' | 'INSTRUMENTAL';
  accentColor: string;
  location?: string;
  description?: string;
}

export const GOSPEL_STATIONS: RadioStation[] = [
  {
    id: 'contemporary-lift',
    name: 'Contemporary Worship Lift',
    genre: 'Contemporary Christian & Live Sanctuary',
    streamUrl: 'https://shoutcast.christianrock.net/stream/5/',
    tagline: 'Atmospheric modern anthems, live stadium worship, and intimate prayers',
    badge: 'CONTEMPORARY',
    accentColor: '#F59E0B',
    location: 'Sanctuary Stadium & Worship Altar',
    description: 'Atmospheric modern anthems, live stadium worship, and intimate prayers.'
  },
  {
    id: 'african-praise',
    name: 'African Gospel Praise',
    genre: 'African Praise & Afrobeat Worship',
    streamUrl: 'https://a6.asurahosting.com:8880/radio.mp3',
    tagline: 'High-energy Afrobeat, Nigerian, Ghanaian, & South African sacred praise',
    badge: 'AFRICAN',
    accentColor: '#F59E0B',
    location: 'African Continental Stream',
    description: 'High-energy Afrobeat, Nigerian, Ghanaian, & South African sacred praise.'
  },
  {
    id: 'urban-hiphop',
    name: 'Urban Gospel & Holy Hip Hop',
    genre: 'Urban Contemporary & Holy Hip Hop',
    streamUrl: 'https://ice.zradio.org/g/high.mp3',
    tagline: 'Modern 808s, kingdom rap, and hard-hitting soulful urban testimonies',
    badge: 'URBAN',
    accentColor: '#F97316',
    location: 'Urban Sanctuary Network',
    description: 'Modern 808s, kingdom rap, and hard-hitting soulful urban testimonies.'
  },
  {
    id: 'country-southern',
    name: 'Country & Southern Gospel',
    genre: 'Country Gospel & Bluegrass Hymns',
    streamUrl: 'https://streams.abidingradio.com:7840/bluegrass',
    tagline: 'Acoustic fingerpicking, southern harmonies, and Appalachian faith',
    badge: 'COUNTRY',
    accentColor: '#EA580C',
    location: 'Southern Sanctuary & Bluegrass',
    description: 'Acoustic fingerpicking, southern harmonies, and Appalachian faith.'
  },
  {
    id: 'old-school-traditional',
    name: 'Old School Traditional Gospel',
    genre: 'Quartets, Traditional Choir & Hammond B3',
    streamUrl: 'https://s4.radio.co/s7bd982a3e/listen',
    tagline: 'Classic church runs, legendary mass choirs, and golden era quartet revival',
    badge: 'OLD SCHOOL',
    accentColor: '#D97706',
    location: 'Golden Era Sanctuary & Hammond B3',
    description: 'Classic church runs, legendary mass choirs, and golden era quartet revival.'
  },
  {
    id: 'secret-place-instrumental',
    name: 'Secret Place Instrumental',
    genre: 'Devotional & Ambient Strings',
    streamUrl: 'https://streams.abidingradio.com:7800/instrumental',
    tagline: 'Continuous piano and atmospheric pads for prayer, study, and fasting',
    badge: 'INSTRUMENTAL',
    accentColor: '#FBBF24',
    location: 'Secret Place Altar & Prayer Chamber',
    description: 'Continuous piano and atmospheric pads for prayer, study, and fasting.'
  }
];
