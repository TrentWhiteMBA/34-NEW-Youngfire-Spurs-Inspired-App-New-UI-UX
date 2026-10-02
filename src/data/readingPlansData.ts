export interface ReadingPlanDay {
  dayNumber: number;
  title: string;
  scriptureReference: string;
  bookId: string;
  chapter: number;
  devotionalFocus: string;
  keyVerse?: string;
  keyInsight?: string;
  reflectionPrompt?: string;
  practicalAction?: string;
  prayerPrompt?: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'general' | 'men' | 'women' | 'custom' | string;
  badge: string;
  durationDays: number;
  accentColor: 'orange' | 'amber' | 'rose' | 'cyan' | 'purple' | 'emerald';
  themeScripture?: string;
  days: ReadingPlanDay[];
}

const STORAGE_KEY = 'youngfire_reading_progress_map';

export function getCompletedDays(planId: string): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const map = JSON.parse(raw);
    return Array.isArray(map[planId]) ? map[planId] : [];
  } catch {
    return [];
  }
}

export function toggleDayCompleted(planId: string, dayNum: number): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const map: Record<string, number[]> = raw ? JSON.parse(raw) : {};
    const current = Array.isArray(map[planId]) ? [...map[planId]] : [];
    const index = current.indexOf(dayNum);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(dayNum);
      current.sort((a, b) => a - b);
    }
    map[planId] = current;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(
      new CustomEvent('youngfire_reading_progress_updated', {
        detail: { planId, completedDays: current },
      })
    );
    return current;
  } catch {
    return [];
  }
}

export function resetPlanProgress(planId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const map: Record<string, number[]> = raw ? JSON.parse(raw) : {};
    map[planId] = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(
      new CustomEvent('youngfire_reading_progress_updated', {
        detail: { planId, completedDays: [] },
      })
    );
  } catch {}
}

export const READING_PLANS: ReadingPlan[] = [
  {
    id: 'men-on-fire-armor-7',
    title: 'Whole Armor of God: Men of Valour',
    subtitle: '7-Day Spiritual Warfare & Unshakable Faith',
    description:
      'Consecrate yourself as a watchman and leader. Put on the belt of truth, breastplate of righteousness, shield of faith, helmet of salvation, and sword of the Spirit.',
    category: 'men',
    badge: '7-DAY MEN ON FIRE',
    durationDays: 7,
    accentColor: 'orange',
    themeScripture:
      'Ephesians 6:11 — Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.',
    days: [
      {
        dayNumber: 1,
        title: 'The Belt of Truth & Sincerity',
        scriptureReference: 'Ephesians 6:10-14',
        bookId: 'EPH',
        chapter: 6,
        devotionalFocus:
          'Gird your loins with uncompromised biblical truth. Before a warrior takes a step, he must be secured in God’s integrity.',
        keyVerse: 'Ephesians 6:14 — Stand therefore, having your loins girt about with truth...',
        reflectionPrompt: 'Where in your life is the enemy attempting to slip in compromise or secrecy?',
        practicalAction: 'Confess any hidden compromise to the Lord and speak aloud 3 foundational scriptures of truth.',
        prayerPrompt: 'Lord Jesus, gird my mind and heart in the absolute truth of Your holy Word today.',
      },
      {
        dayNumber: 2,
        title: 'The Breastplate of Righteousness',
        scriptureReference: 'Romans 8:1-11',
        bookId: 'ROM',
        chapter: 8,
        devotionalFocus:
          'Guarding the heart: righteousness is not earned by self-effort, but imputed by Christ and defended through holy obedience.',
        keyVerse: 'Romans 8:1 — There is therefore now no condemnation to them which are in Christ Jesus...',
        reflectionPrompt: 'How does resting in Christ’s righteousness protect you against the accusations of the adversary?',
        practicalAction: 'Take 5 minutes to release all condemnation and declare your standing in Jesus Christ.',
        prayerPrompt: 'Father, protect my heart from condemnation and fill me with the peace of Christ’s righteousness.',
      },
      {
        dayNumber: 3,
        title: 'Feet Shod with the Gospel of Peace',
        scriptureReference: 'Isaiah 52:7-10',
        bookId: 'ISA',
        chapter: 52,
        devotionalFocus:
          'Readiness to advance: bringing divine reconciliation and calm authority into every room, family gathering, and workplace.',
        keyVerse: 'Isaiah 52:7 — How beautiful upon the mountains are the feet of him that bringeth good tidings...',
        reflectionPrompt: 'Are your feet carrying peace or strife into your daily environments?',
        practicalAction: 'Encourage one brother today with a verse or message of peace and brotherly strength.',
        prayerPrompt: 'Lord, order my steps and grant me supernatural readiness to bring peace wherever I tread.',
      },
      {
        dayNumber: 4,
        title: 'The Shield of Faith',
        scriptureReference: 'Hebrews 11:1-6',
        bookId: 'HEB',
        chapter: 11,
        devotionalFocus:
          'Quenching the fiery darts: unwavering trust in God’s character extinguishes doubt, cynicism, and fear before they strike.',
        keyVerse: 'Hebrews 11:1 — Now faith is the substance of things hoped for, the evidence of things not seen.',
        reflectionPrompt: 'What specific flaming dart has the enemy launched at your thoughts this week?',
        practicalAction: 'Lift your shield by memorizing Hebrews 11:6 and praising God for His faithfulness.',
        prayerPrompt: 'Holy Spirit, strengthen my faith that every lying dart of doubt would be extinguished instantly.',
      },
      {
        dayNumber: 5,
        title: 'The Helmet of Salvation',
        scriptureReference: 'Philippians 4:4-9',
        bookId: 'PHP',
        chapter: 4,
        devotionalFocus:
          'Fortifying the mind: knowing your eternal adoption protects you from despair, worldly anxiety, and mental fatigue.',
        keyVerse: 'Philippians 4:7 — And the peace of God, which passeth all understanding, shall keep your hearts and minds...',
        reflectionPrompt: 'What thoughts must you take captive today to align with God’s thoughts toward you?',
        practicalAction: 'Practice Philippians 4:8 meditating on what is true, honest, just, and pure.',
        prayerPrompt: 'Lord, guard my mind and thoughts with the eternal certainty of my salvation.',
      },
      {
        dayNumber: 6,
        title: 'The Sword of the Spirit',
        scriptureReference: 'Hebrews 4:12-16',
        bookId: 'HEB',
        chapter: 4,
        devotionalFocus:
          'The living Word: the only offensive weapon in the armor. Speak the Word with authority just as Christ did in the wilderness.',
        keyVerse: 'Hebrews 4:12 — For the word of God is quick, and powerful, and sharper than any twoedged sword...',
        reflectionPrompt: 'Do you speak God’s Word directly over your circumstances, or do you speak your feelings?',
        practicalAction: 'Quote a promise of scripture aloud 3 times during the day when encountering resistance.',
        prayerPrompt: 'Father, sharpen my tongue with the razor-edge of Your Holy Scripture.',
      },
      {
        dayNumber: 7,
        title: 'Praying Always in the Spirit',
        scriptureReference: 'Jude 1:17-25',
        bookId: 'JUD',
        chapter: 1,
        devotionalFocus:
          'The communication link: perpetual intercession for the saints, building yourselves up in your most holy faith.',
        keyVerse: 'Jude 1:20 — But ye, beloved, building up yourselves on your most holy faith, praying in the Holy Ghost...',
        reflectionPrompt: 'How can you establish a deeper rhythm of praying in the Spirit daily?',
        practicalAction: 'Dedicate 15 uninterrupted minutes of prayer and intercession for your brothers in YoungFire.',
        prayerPrompt: 'Lord, ignite my spirit with fervent, continuous intercession for the body of Christ.',
      },
    ],
  },
  {
    id: 'men-on-fire-brotherhood-14',
    title: 'Iron Sharpens Iron: Men On Fire Covenant',
    subtitle: '14-Day Blueprint for Biblical Manhood & Brotherhood',
    description:
      'Deepen accountability, masculine consecration, leadership in the home, and genuine brotherly fellowship at Joshua House of Worship.',
    category: 'men',
    badge: '14-DAY BROTHERHOOD',
    durationDays: 14,
    accentColor: 'amber',
    themeScripture:
      'Proverbs 27:17 — Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.',
    days: Array.from({ length: 14 }, (_, i) => {
      const day = i + 1;
      const scriptures = [
        { ref: 'Proverbs 27:1-17', book: 'PRO', ch: 27, t: 'The Law of Mutual Sharpening' },
        { ref: '1 Samuel 18:1-5', book: '1SA', ch: 18, t: 'Covenant Friendship & David-Jonathan' },
        { ref: 'Nehemiah 4:13-23', book: 'NEH', ch: 4, t: 'Builders with Trowel and Sword' },
        { ref: '1 Kings 2:1-4', book: '1KI', ch: 2, t: 'Show Thyself a Man: David’s Charge' },
        { ref: 'Joshua 1:1-9', book: 'JOS', ch: 1, t: 'Be Strong and of a Good Courage' },
        { ref: 'Proverbs 4:1-18', book: 'PRO', ch: 4, t: 'A Father’s Instruction & Wisdom' },
        { ref: 'Titus 2:1-8', book: 'TIT', ch: 2, t: 'Pattern of Good Works & Sound Speech' },
        { ref: '1 Timothy 6:11-16', book: '1TI', ch: 6, t: 'Fight the Good Fight of Faith' },
        { ref: 'Colossians 3:12-17', book: 'COL', ch: 3, t: 'Clothed in Humility & Brotherly Love' },
        { ref: '1 Corinthians 13:1-13', book: '1CO', ch: 13, t: 'The Strength of Divine Charity' },
        { ref: 'Psalm 133:1-3', book: 'PSA', ch: 133, t: 'How Pleasant for Brethren to Dwell in Unity' },
        { ref: 'Galatians 6:1-10', book: 'GAL', ch: 6, t: 'Bear Ye One Another’s Burdens' },
        { ref: '2 Timothy 2:1-7', book: '2TI', ch: 2, t: 'Endure Hardness as a Good Soldier' },
        { ref: 'Revelation 3:7-13', book: 'REV', ch: 3, t: 'He That Overcometh: Pillar in the Temple' },
      ][i];
      return {
        dayNumber: day,
        title: scriptures.t,
        scriptureReference: scriptures.ref,
        bookId: scriptures.book,
        chapter: scriptures.ch,
        devotionalFocus: `Day ${day} brotherhood discipleship focus on ${scriptures.t}. Standing firm together as Joshua House men of godliness and integrity.`,
        keyVerse: `${scriptures.ref}`,
        reflectionPrompt: 'How does this scripture inspire you to be a stronger brother, son, husband, or father?',
        practicalAction: 'Reach out to a brother and speak words of encouragement and accountability.',
        prayerPrompt: 'Father, form me into a man of honor, steadfastness, and covenant love.',
      };
    }),
  },
  {
    id: 'women-ignited-grace-7',
    title: 'Women Ignited: Radiance, Virtue & Grace',
    subtitle: '7-Day Divine Consecration & Spiritual Identity',
    description:
      'Step into the fullness of your royal daughterhood in Christ. Discover unwavering confidence, purity, prayerful intercession, and holy strength.',
    category: 'women',
    badge: '7-DAY WOMEN IGNITED',
    durationDays: 7,
    accentColor: 'rose',
    themeScripture:
      'Proverbs 31:25 — Strength and honour are her clothing; and she shall rejoice in time to come.',
    days: [
      {
        dayNumber: 1,
        title: 'Clothed in Strength and Honour',
        scriptureReference: 'Proverbs 31:10-31',
        bookId: 'PRO',
        chapter: 31,
        devotionalFocus:
          'Discovering divine worth beyond human comparison. Her price is far above rubies, rooted in her fear and reverent love for God.',
        keyVerse: 'Proverbs 31:30 — Favour is deceitful, and beauty is vain: but a woman that feareth the LORD, she shall be praised.',
        reflectionPrompt: 'In what ways does the fear of the Lord impart true confidence into your identity?',
        practicalAction: 'Write down 3 qualities God celebrates in you and thank Him for His grace.',
        prayerPrompt: 'Heavenly Father, clothe me in Your divine dignity, wisdom, and strength today.',
      },
      {
        dayNumber: 2,
        title: 'Esther’s Royal Courage',
        scriptureReference: 'Esther 4:1-17',
        bookId: 'EST',
        chapter: 4,
        devotionalFocus:
          'Standing in the gap for such a time as this. Holy fasting, prayer, and fearless conviction that shifts the destiny of generations.',
        keyVerse: 'Esther 4:14 — ...and who knoweth whether thou art come to the kingdom for such a time as this?',
        reflectionPrompt: 'Where has God placed you in this season to be His voice and vessel of redemption?',
        practicalAction: 'Set aside a meal or hour for focused prayer over a sister or family challenge.',
        prayerPrompt: 'Lord, give me holy courage to obey Your calling without shrinking back.',
      },
      {
        dayNumber: 3,
        title: 'Mary’s Heart of Worship & Alabaster Pouring',
        scriptureReference: 'Luke 7:36-50',
        bookId: 'LUK',
        chapter: 7,
        devotionalFocus:
          'Extravagant love and unreserved surrender at the feet of Jesus. When gratitude overflows, opinions of critics fade away.',
        keyVerse: 'Luke 7:47 — Wherefore I say unto thee, Her sins, which are many, are forgiven; for she loved much...',
        reflectionPrompt: 'What is the "alabaster flask" of pride, time, or emotion you need to pour at Jesus’ feet?',
        practicalAction: 'Spend 10 minutes in pure praise with no requests, only declaring Jesus’ beauty and worth.',
        prayerPrompt: 'Jesus, I pour my heart at Your feet; accept my worship as sweet fragrance before You.',
      },
      {
        dayNumber: 4,
        title: 'Ruth’s Loyalty & Covenant Blessing',
        scriptureReference: 'Ruth 1:14-22',
        bookId: 'RUT',
        chapter: 1,
        devotionalFocus:
          'Loyalty that transcends circumstance. Intentionally choosing the people of God and witnessing God’s kinsman redeemer provide.',
        keyVerse: 'Ruth 1:16 — ...thy people shall be my people, and thy God my God.',
        reflectionPrompt: 'Who in your life needs your steadfast loyalty and supportive presence right now?',
        practicalAction: 'Send a note of heartfelt appreciation to a mother, mentor, or sister in faith.',
        prayerPrompt: 'Lord, make my heart steadfast and faithful in all covenant relationships.',
      },
      {
        dayNumber: 5,
        title: 'Hannah’s Fervent Intercession',
        scriptureReference: '1 Samuel 1:9-20',
        bookId: '1SA',
        chapter: 1,
        devotionalFocus:
          'The power of a pouring-out soul before the altar. When deep longing is surrendered to God, miracles and prophets are born.',
        keyVerse: '1 Samuel 1:15 — ...I am a woman of a sorrowful spirit... but have poured out my soul before the LORD.',
        reflectionPrompt: 'Have you poured out the deepest ache of your heart to God in secret prayer?',
        practicalAction: 'Take your deepest petition to the secret place and surrender its outcome to the Lord.',
        prayerPrompt: 'O Lord of Hosts, hear my cry and let Your peace settle deep in my heart.',
      },
      {
        dayNumber: 6,
        title: 'Deborah’s Motherly Spiritual Authority',
        scriptureReference: 'Judges 4:4-16',
        bookId: 'JDG',
        chapter: 4,
        devotionalFocus:
          'A mother in Israel who arose when leadership waned. Prophetic clarity, decisive action, and rallying believers into victory.',
        keyVerse: 'Judges 5:7 — The inhabitants of the villages ceased... until that I Deborah arose, that I arose a mother in Israel.',
        reflectionPrompt: 'Where is the Holy Spirit calling you to arise and bring godly counsel and direction?',
        practicalAction: 'Speak life and biblical order into a situation where confusion has reigned.',
        prayerPrompt: 'Holy Spirit, endow me with discernment, courage, and motherly spiritual grace.',
      },
      {
        dayNumber: 7,
        title: 'Mary of Nazareth: Let It Be According to Thy Word',
        scriptureReference: 'Luke 1:26-38',
        bookId: 'LUK',
        chapter: 1,
        devotionalFocus:
          'The posture of supreme yieldedness: "Behold the handmaid of the Lord; be it unto me according to thy word."',
        keyVerse: 'Luke 1:38 — Behold the handmaid of the Lord; be it unto me according to thy word.',
        reflectionPrompt: 'Are you ready to say "yes" to whatever God asks of you, regardless of the cost?',
        practicalAction: 'Pray the prayer of full yieldedness and rest in God’s sovereign love.',
        prayerPrompt: 'Father, not my will, but Yours be done in and through my life forever.',
      },
    ],
  },
  {
    id: 'women-ignited-esther-14',
    title: 'Daughters of the King: For Such a Time',
    subtitle: '14-Day Journey in Purpose, Wisdom & Intercession',
    description:
      'Discover kingdom identity, deep intimacy with God, emotional wholeness, and spiritual influence for young adult women.',
    category: 'women',
    badge: '14-DAY DAUGHTERS OF THE KING',
    durationDays: 14,
    accentColor: 'purple',
    themeScripture:
      'Psalm 46:5 — God is in the midst of her; she shall not be moved: God shall help her, and that right early.',
    days: Array.from({ length: 14 }, (_, i) => {
      const day = i + 1;
      const items = [
        { ref: 'Psalm 45:1-17', book: 'PSA', ch: 45, t: 'The King’s Daughter in Glorious Vesture' },
        { ref: 'Proverbs 3:13-26', book: 'PRO', ch: 3, t: 'Wisdom More Precious Than Rubies' },
        { ref: 'Song of Solomon 2:1-17', book: 'SNG', ch: 2, t: 'His Banner Over Me Is Love' },
        { ref: 'Isaiah 62:1-7', book: 'ISA', ch: 62, t: 'Called Hephzibah: The Lord Delights in You' },
        { ref: 'Zephaniah 3:14-20', book: 'ZEP', ch: 3, t: 'He Will Rejoice Over Thee with Singing' },
        { ref: 'Luke 10:38-42', book: 'LUK', ch: 10, t: 'Choosing the One Thing Needful (Mary at His Feet)' },
        { ref: 'John 20:11-18', book: 'JHN', ch: 20, t: 'First to Proclaim the Risen Lord' },
        { ref: 'Romans 12:1-8', book: 'ROM', ch: 12, t: 'Living Sacrifices & Transformed Minds' },
        { ref: '2 Corinthians 6:14-18', book: '2CO', ch: 6, t: 'Daughters of the Almighty' },
        { ref: 'Ephesians 1:3-14', book: 'EPH', ch: 1, t: 'Blessed with All Spiritual Blessings' },
        { ref: 'Colossians 1:9-14', book: 'COL', ch: 1, t: 'Walking Worthy of the Lord Unto All Pleasing' },
        { ref: '1 Peter 3:1-6', book: '1PE', ch: 3, t: 'The Incorruptible Ornament of a Meek Spirit' },
        { ref: 'Hebrews 10:19-25', book: 'HEB', ch: 10, t: 'Drawing Near in Full Assurance of Faith' },
        { ref: 'Revelation 19:6-9', book: 'REV', ch: 19, t: 'The Marriage Supper of the Lamb' },
      ][i];
      return {
        dayNumber: day,
        title: items.t,
        scriptureReference: items.ref,
        bookId: items.book,
        chapter: items.ch,
        devotionalFocus: `Day ${day} devotional focus: ${items.t}. Walking as an anointed woman of God in purity, power, and faith.`,
        keyVerse: items.ref,
        reflectionPrompt: 'How does this truth anchor your soul against cultural pressures?',
        practicalAction: 'Encourage another sister in Christ with this scripture today.',
        prayerPrompt: 'Heavenly Father, awaken in me the full consciousness of my royal identity in You.',
      };
    }),
  },
  {
    id: 'youngfire-gospel-awakening-7',
    title: 'Gospel Awakening: The Way, The Truth, The Life',
    subtitle: '7-Day Core Discipleship Foundations',
    description:
      'The bedrock of YoungFire Ministry: salvation by grace, the authority of the Word, the Holy Spirit’s presence, and missional living.',
    category: 'general',
    badge: '7-DAY GOSPEL AWAKENING',
    durationDays: 7,
    accentColor: 'cyan',
    themeScripture:
      'Romans 1:16 — For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth.',
    days: [
      {
        dayNumber: 1,
        title: 'In The Beginning Was The Word',
        scriptureReference: 'John 1:1-14',
        bookId: 'JHN',
        chapter: 1,
        devotionalFocus:
          'Jesus Christ is the eternal Logos, the Creator and Light of men. Darkness cannot extinguish His radiance.',
        keyVerse: 'John 1:14 — And the Word was made flesh, and dwelt among us...',
        reflectionPrompt: 'How does knowing Jesus is the living Word change how you open your physical Bible?',
        practicalAction: 'Read John 1:1-5 slowly three times, meditating on Christ as the Light of your life.',
        prayerPrompt: 'Lord Jesus, shine Your radiant light into every corner of my thoughts.',
      },
      {
        dayNumber: 2,
        title: 'You Must Be Born Again',
        scriptureReference: 'John 3:1-21',
        bookId: 'JHN',
        chapter: 3,
        devotionalFocus:
          'Regeneration by water and the Spirit: Christianity is not self-improvement; it is resurrection life.',
        keyVerse: 'John 3:16 — For God so loved the world, that he gave his only begotten Son...',
        reflectionPrompt: 'Are you relying on religious effort or on the miraculous new birth from above?',
        practicalAction: 'Thank Jesus personally for the free gift of eternal life and your new heart.',
        prayerPrompt: 'Holy Spirit, breathe life and renewal over my spirit today.',
      },
      {
        dayNumber: 3,
        title: 'Living Water for Thirsty Souls',
        scriptureReference: 'John 4:1-26',
        bookId: 'JHN',
        chapter: 4,
        devotionalFocus:
          'The woman at the well: Jesus meets us at our point of thirst and replaces broken cisterns with a spring of eternal water.',
        keyVerse: 'John 4:14 — Whosoever drinketh of the water that I shall give him shall never thirst...',
        reflectionPrompt: 'What worldly wells have you been drinking from that leave you thirsty?',
        practicalAction: 'Confess and turn away from empty wells, asking Jesus for fresh living water.',
        prayerPrompt: 'Jesus, fill me with the living water of Your Holy Spirit so I never thirst again.',
      },
      {
        dayNumber: 4,
        title: 'The Bread of Life',
        scriptureReference: 'John 6:35-51',
        bookId: 'JHN',
        chapter: 6,
        devotionalFocus:
          'He who comes to Jesus shall never hunger. Feeding daily on Christ and His Word sustains our inner man.',
        keyVerse: 'John 6:35 — Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger...',
        reflectionPrompt: 'Do you prioritize your spiritual nutrition as consistently as physical meals?',
        practicalAction: 'Spend morning time feasting on Scripture before opening social media.',
        prayerPrompt: 'Father, feed my soul with the Bread of Heaven; let Christ be my daily sustenance.',
      },
      {
        dayNumber: 5,
        title: 'The Good Shepherd & The Door',
        scriptureReference: 'John 10:1-18',
        bookId: 'JHN',
        chapter: 10,
        devotionalFocus:
          'The Good Shepherd gives His life for the sheep. His sheep hear His voice, follow Him, and cannot be plucked from His hand.',
        keyVerse: 'John 10:27 — My sheep hear my voice, and I know them, and they follow me.',
        reflectionPrompt: 'Can you distinguish the Shepherd’s voice of peace from the accuser’s voice of panic?',
        practicalAction: 'Spend 5 minutes of stillness learning to listen for the Shepherd’s still small voice.',
        prayerPrompt: 'Good Shepherd, lead me in paths of righteousness for Your name’s sake.',
      },
      {
        dayNumber: 6,
        title: 'The True Vine & Abiding Fruit',
        scriptureReference: 'John 15:1-17',
        bookId: 'JHN',
        chapter: 15,
        devotionalFocus:
          'Without Him we can do nothing. Abiding in the vine produces love, joy, and fruit that remains.',
        keyVerse: 'John 15:5 — I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit...',
        reflectionPrompt: 'Are you trying to produce fruit by human striving, or by resting and abiding in Christ?',
        practicalAction: 'Identify one area of striving and consciously surrender it to the Vine.',
        prayerPrompt: 'Lord, keep me tightly grafted into You, drawing every ounce of life from Your Spirit.',
      },
      {
        dayNumber: 7,
        title: 'The Resurrection & Great Commission',
        scriptureReference: 'Matthew 28:16-20',
        bookId: 'MAT',
        chapter: 28,
        devotionalFocus:
          'All power is given unto Jesus in heaven and in earth. Go and make disciples, baptizing and teaching them.',
        keyVerse: 'Matthew 28:19-20 — Go ye therefore, and teach all nations... and, lo, I am with you alway, even unto the end of the world.',
        reflectionPrompt: 'Who in your circle needs you to share the good news of Christ’s resurrection?',
        practicalAction: 'Pray for 3 specific friends who do not yet know Jesus and ask for an open door to witness.',
        prayerPrompt: 'Jesus, send me into my world with boldness and the power of Your resurrection.',
      },
    ],
  },
  {
    id: 'wisdom-proverbs-path-14',
    title: 'The Path of Divine Wisdom: Proverbs 1-14',
    subtitle: '14-Day Practical Blueprint for Youth & Young Adults',
    description:
      'Avoid the snares of youth. Walk in discernment, financial prudence, righteous speech, and the fear of the Lord.',
    category: 'general',
    badge: '14-DAY WISDOM PATH',
    durationDays: 14,
    accentColor: 'emerald',
    themeScripture:
      'Proverbs 3:5-6 — Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    days: Array.from({ length: 14 }, (_, i) => {
      const day = i + 1;
      return {
        dayNumber: day,
        title: `Proverbs Chapter ${day}: Blueprint of Discernment`,
        scriptureReference: `Proverbs ${day}`,
        bookId: 'PRO',
        chapter: day,
        devotionalFocus: `Immerse yourself in Proverbs chapter ${day}. Receive wise counsel, guard your heart, and walk in the fear of the Lord.`,
        keyVerse: `Proverbs ${day}:1-7`,
        reflectionPrompt: `What specific verse in Proverbs ${day} pierced your heart with correction or guidance?`,
        practicalAction: 'Write down one practical proverb and apply it in a decision today.',
        prayerPrompt: 'Lord, bestow upon me heavenly wisdom and keep my steps from foolishness.',
      };
    }),
  },
];
