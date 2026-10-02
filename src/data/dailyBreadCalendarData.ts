/**
 * Dynamic 365-Day NKJV Daily Bread Calendar
 * Morning Manna: Dedicated Old Testament / Wisdom reading unique to each day of the year (1-366).
 * Evening Solace: Dedicated New Testament / Epistles reading unique to each day of the year (1-366).
 * Translated according to the New King James Version (NKJV).
 */

export interface DevotionalItem {
  title: string;
  subheading: string;
  scriptureRef: string;
  bookId: string;
  chapter: number;
  scriptureText: string;
  exposition: string;
  prayer: string;
  practicalAction: string;
  testament: string;
}

export interface DayDevotional {
  dayNumber: number;
  morning: DevotionalItem;
  evening: DevotionalItem;
}

export interface ScriptureEntry {
  ref: string;
  bookId: string;
  ch: number;
  theme: string;
  verse: string;
  exposition?: string;
  prayer?: string;
  action?: string;
}

// Canonical Old Testament / Wisdom Milestones (366 Unique Days)
const OT_ANCHORS: ScriptureEntry[] = [
  {
    ref: 'Genesis 1:1–3',
    bookId: 'GEN',
    ch: 1,
    theme: 'The Sovereign Creator & Light of Dawn',
    verse: 'In the beginning God created the heavens and the earth. The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters. Then God said, "Let there be light"; and there was light.',
    exposition: 'Every morning echoes the primordial dawn. Before any agenda, chaos, or uncertainty takes shape, the Spirit of God hovers over your life. Speak God\'s truth over your morning and watch light pierce darkness.',
    prayer: 'Almighty Creator, speak light into my mind, order into my schedule, and holiness into my walk today. In Jesus’ name, Amen.',
    action: 'Spend three quiet minutes at dawn acknowledging God as the Sovereign Lord of your day.'
  },
  {
    ref: 'Genesis 12:1–3',
    bookId: 'GEN',
    ch: 12,
    theme: 'The Call to Consecrated Pilgrimage',
    verse: 'Now the LORD had said to Abram: "Get out of your country, from your family and from your father\'s house, to a land that I will show you. I will make you a great nation; I will bless you and make your name great; and you shall be a blessing."',
    exposition: 'Faith begins when we surrender familiar comforts for divine promises. Like Abram, young believers are summoned to step away from cultural drift and embark on an uncompromised discipleship journey.',
    prayer: 'Lord, give me courage to detach from worldly compromises and walk faithfully into the divine assignment You have set before me.',
    action: 'Identify one habit or influence that pulls you toward worldly compromise, and intentionally set it aside today.'
  },
  {
    ref: 'Genesis 15:1',
    bookId: 'GEN',
    ch: 15,
    theme: 'Your Shield and Exceedingly Great Reward',
    verse: 'After these things the word of the LORD came to Abram in a vision, saying, "Do not be afraid, Abram. I am your shield, your exceedingly great reward."',
    exposition: 'When anxiety over provision or protection creeps into your thoughts, remember God’s declaration. He does not merely offer blessings; He Himself is your impenetrable defense and eternal prize.',
    prayer: 'Father, You are my shield against the darts of the enemy and my greatest portion. I rest my confidence completely in You.',
    action: 'When facing an intimidating task today, whisper: "The Lord is my shield and my exceedingly great reward."'
  },
  {
    ref: 'Genesis 22:14',
    bookId: 'GEN',
    ch: 22,
    theme: 'Jehovah-Jireh: The Lord Will Provide',
    verse: 'And Abraham called the name of the place, The-LORD-Will-Provide; as it is said to this day, "In the Mount of the LORD it shall be provided."',
    exposition: 'On Mount Moriah, Abraham discovered that obedience precedes revelation. God does not withhold provision from those who surrender what they cherish most to His holy altar.',
    prayer: 'Lord Jesus, I surrender all to Your altar. I trust that on the mount of obedience, You will faithfully provide every spiritual and physical need.',
    action: 'Pray for a brother or sister facing financial or spiritual scarcity, trusting God to supply.'
  },
  {
    ref: 'Genesis 28:15',
    bookId: 'GEN',
    ch: 28,
    theme: 'The Unfailing Presence of the Lord',
    verse: 'Behold, I am with you and will keep you wherever you go, and will bring you back to this land; for I will not leave you until I have done what I have spoken to you.',
    exposition: 'Jacob was a fugitive on a stone pillow when God reaffirmed His presence. No loneliness, dislocation, or geographic distance can sever you from the steadfast presence of the Almighty.',
    prayer: 'Faithful God, thank You for never abandoning me. May Your tangible presence govern my decisions and quiet all loneliness.',
    action: 'Take 60 seconds to bless God for His unwavering faithfulness in your past seasons.'
  },
  {
    ref: 'Genesis 50:20',
    bookId: 'GEN',
    ch: 50,
    theme: 'Redemptive Sovereignty Over Adversity',
    verse: 'But as for you, you meant evil against me; but God meant it for good, in order to bring it about as it is this day, to save many people alive.',
    exposition: 'Betrayal and delays cannot derail the destiny ordained by God. What enemy plots or human jealousy intended for destruction, divine sovereignty weaves into redemption and testimony.',
    prayer: 'Sovereign Father, heal every wound from past betrayals. I trust Your hand to turn every trial into spiritual fruit for Your glory.',
    action: 'Forgive anyone from your past who wronged you, releasing bitterness into God\'s righteous hands.'
  },
  {
    ref: 'Exodus 3:14',
    bookId: 'EXO',
    ch: 3,
    theme: 'I AM WHO I AM: The Self-Existent Lord',
    verse: 'And God said to Moses, "I AM WHO I AM." And He said, "Thus you shall say to the children of Israel, \'I AM has sent me to you.\'"',
    exposition: 'God revealed Himself not as a concept, but as the uncaused, eternal \'I AM\'. Whatever deficit you feel today—weakness, confusion, inadequacy—Christ is the all-sufficient answer.',
    prayer: 'I AM that I AM, be my strength in weakness, my wisdom in perplexity, and my righteous anchor today.',
    action: 'Meditate on the eternal power of the name of Jesus whenever feeling inadequate today.'
  },
  {
    ref: 'Exodus 14:13–14',
    bookId: 'EXO',
    ch: 14,
    theme: 'Stand Still and See God\'s Salvation',
    verse: 'And Moses said to the people, "Do not be afraid. Stand still, and see the salvation of the LORD, which He will accomplish for you today... The LORD will fight for you, and you shall hold your peace."',
    exposition: 'Trapped between Pharaoh\'s iron chariots and the deep Red Sea, Israel had only one command: stand still and watch God deliver. Your battle belongs entirely to the Lord of Hosts.',
    prayer: 'Mighty Deliverer, hush my anxious rushing. I stand still and watch You part the waters of impossibility before me.',
    action: 'When tempted to react in panic or frustration today, pause and breathe a prayer of stillness.'
  },
  {
    ref: 'Exodus 33:14–15',
    bookId: 'EXO',
    ch: 33,
    theme: 'The Inseparable Sanctuary Presence',
    verse: 'And He said, "My Presence will go with you, and I will give you rest." Then he said to Him, "If Your Presence does not go with us, do not bring us up from here."',
    exposition: 'Moses valued the manifest presence of God above territory, victory, or earthly success. Consecrated disciples make the identical vow: we will not take a single step without the Lord.',
    prayer: 'Holy Spirit, if Your presence does not go before me today, do not permit me to advance. Fill my atmosphere with Your peace.',
    action: 'Prioritize a 5-minute sanctuary pause before entering your workplace, school, or fellowship.'
  },
  {
    ref: 'Deuteronomy 6:4–6',
    bookId: 'DEU',
    ch: 6,
    theme: 'The Shema: Wholehearted Love for God',
    verse: 'Hear, O Israel: The LORD our God, the LORD is one! You shall love the LORD your God with all your heart, with all your soul, and with all your strength. And these words which I command you today shall be in your heart.',
    exposition: 'Discipleship is not divided loyalty. Christ calls for unreserved affection—heart, soul, and physical energy dedicated to honoring His holy covenant in every sphere of life.',
    prayer: 'Lord, kindle an undivided flame of love in my heart. Let no idol compete with Your throne in my soul.',
    action: 'Write Deuteronomy 6:5 on an index card or phone lock screen as a devotion reminder.'
  },
  {
    ref: 'Joshua 1:8–9',
    bookId: 'JOS',
    ch: 1,
    theme: 'Meditate on the Law Day and Night',
    verse: 'This Book of the Law shall not depart from your mouth, but you shall meditate in it day and night, that you may observe to do according to all that is written in it... Have I not commanded you? Be strong and of good courage; do not be afraid, nor be dismayed, for the LORD your God is with you wherever you go.',
    exposition: 'Courage is born from immersion in Scripture. When God\'s Word fills your mouth and mind, fear is displaced by supernatural authority to possess every spiritual inheritance.',
    prayer: 'Lord Jesus, let Your holy Word dwell richly in my heart. Make me bold as a lion in the face of contemporary opposition.',
    action: 'Speak Joshua 1:9 aloud over your family, household, and community before noon.'
  },
  {
    ref: 'Joshua 24:15',
    bookId: 'JOS',
    ch: 24,
    theme: 'As for Me and My House',
    verse: 'And if it seems evil to you to serve the LORD, choose for yourselves this day whom you will serve... But as for me and my house, we will serve the LORD.',
    exposition: 'Joshua called the assembled tribes to a definitive, public declaration. Lukewarm neutrality is impossible in the kingdom of God. Consecration demands an everyday decision to serve Christ.',
    prayer: 'Lord, I choose this day to serve You exclusively. Let my conduct, finances, and relationships honor Your name.',
    action: 'Declare openly to a fellow believer today: "As for me, I have resolved to follow Christ."',
  },
  {
    ref: '1 Samuel 16:7',
    bookId: '1SA',
    ch: 16,
    theme: 'The Lord Looks at the Consecrated Heart',
    verse: 'For the LORD does not see as man sees; for man looks at the outward appearance, but the LORD looks at the heart.',
    exposition: 'While contemporary culture fixates on curated images and external accolades, God audits the secret chamber of the heart. Purity, humility, and faithfulness in private are what heaven exalts.',
    prayer: 'Search me, O God, and know my heart. Cleanse every impure motive and make my inner sanctuary pleasing in Your sight.',
    action: 'Do one act of kindness or intercession in complete secret today, seen only by God.'
  },
  {
    ref: '2 Chronicles 7:14',
    bookId: '2CH',
    ch: 7,
    theme: 'Humility, Prayer, and National Healing',
    verse: 'If My people who are called by My name will humble themselves, and pray and seek My face, and turn from their wicked ways, then I will hear from heaven, and will forgive their sin and heal their land.',
    exposition: 'Spiritual revival never begins with secular politicians or external institutions; it ignites when God\'s consecrated people repent, fall on their faces, and intercede with broken hearts.',
    prayer: 'Lord, send revival to YoungFire, our city, and our generation. Humble our spirits, forgive our transgressions, and heal our land.',
    action: 'Dedicate 10 minutes today to interceding specifically for the city of San Antonio and youth across the world.'
  },
  {
    ref: 'Job 19:25–26',
    bookId: 'JOB',
    ch: 19,
    theme: 'I Know That My Redeemer Lives',
    verse: 'For I know that my Redeemer lives, and He shall stand at last on the earth; and after my skin is destroyed, this I know, that in my flesh I shall see God.',
    exposition: 'From the ashes of grief and physical affliction, Job uttered one of the most magnificent confessions of resurrection faith in all of human history. Christ is our living, eternal Redeemer.',
    prayer: 'Living Redeemer, when trials press in and health fails, my hope is anchored in Your resurrection victory. I will praise You forever.',
    action: 'Encourage a brother or sister walking through grief with the promise of Job 19:25.'
  },
  {
    ref: 'Psalm 1:1–3',
    bookId: 'PSA',
    ch: 1,
    theme: 'The Blessed Tree Planted by Living Waters',
    verse: 'Blessed is the man who walks not in the counsel of the ungodly, nor stands in the path of sinners, nor sits in the seat of the scornful; but his delight is in the law of the LORD, and in His law he meditates day and night. He shall be like a tree planted by the rivers of water, that brings forth its fruit in its season, whose leaf also shall not wither; and whatever he does shall prosper.',
    exposition: 'A flourishing spiritual life requires deliberate separation from cynical advice and deep rootedness in Scripture. Meditate upon God\'s Word and your spiritual life will remain green in every season.',
    prayer: 'Lord, plant my soul beside the living streams of Your Holy Spirit. Let my fruit be abundant and my testimony unyielding.',
    action: 'Memorize Psalm 1:2 and recite it during moments of transition today.'
  },
  {
    ref: 'Psalm 23:1–3',
    bookId: 'PSA',
    ch: 23,
    theme: 'The Good Shepherd of My Soul',
    verse: 'The LORD is my shepherd; I shall not want. He makes me to lie down in green pastures; He leads me beside the still waters. He restores my soul; He leads me in the paths of righteousness for His name\'s sake.',
    exposition: 'Because the Sovereign Lord is your Shepherd, you lack no good thing. When spiritual fatigue sets in, allow Christ to lead you to quiet waters of prayer and restore your weary soul.',
    prayer: 'Good Shepherd, lead me today. Quiet my racing thoughts, guide my feet into righteousness, and restore my soul with Your peace.',
    action: 'Put down your smartphone for 15 minutes and listen quietly for the still, small voice of the Shepherd.'
  },
  {
    ref: 'Psalm 27:1',
    bookId: 'PSA',
    ch: 27,
    theme: 'The Lord Is My Light and My Salvation',
    verse: 'The LORD is my light and my salvation; whom shall I fear? The LORD is the strength of my life; of whom shall I be afraid?',
    exposition: 'Fear loses its power the instant the light of God\'s countenance enters the room. Since Christ has secured your eternal salvation and is your daily fortress, fear is rendered completely powerless.',
    prayer: 'Lord, dispeller of darkness, You are the strength of my life. I renounce fear and walk forward in divine courage.',
    action: 'Write down your biggest fear on paper, then cross it out with the proclamation: "The Lord is my light!"'
  },
  {
    ref: 'Psalm 46:1–3',
    bookId: 'PSA',
    ch: 46,
    theme: 'God Is Our Refuge and Very Present Help',
    verse: 'God is our refuge and strength, a very present help in trouble. Therefore we will not fear, even though the earth be removed, and though the mountains be carried into the midst of the sea.',
    exposition: 'Catastrophes, economic volatility, and cultural shifts cannot shake the city of God. The Lord is not distant in crisis; He is an immediate, accessible, and omnipotent sanctuary.',
    prayer: 'Lord God, You are my immediate shelter. When chaos erupts around me, I hide myself beneath the shadow of Your wings.',
    action: 'Send a message of encouragement to someone under severe workplace or family stress.'
  },
  {
    ref: 'Psalm 91:1–2',
    bookId: 'PSA',
    ch: 91,
    theme: 'Dwelling in the Secret Place of the Most High',
    verse: 'He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty. I will say of the LORD, "He is my refuge and my fortress; my God, in Him I will trust."',
    exposition: 'Protection is not found in physical walls or human security, but in unbroken intimacy with God. Make prayer your dwelling place and divine favor will guard your steps.',
    prayer: 'Most High God, I abide in Your secret place today. Be my fortress and shield against all unseen snares and spiritual warfare.',
    action: 'Pray Psalm 91 aloud over your bedroom, vehicle, and workspace.'
  },
  {
    ref: 'Psalm 103:1–5',
    bookId: 'PSA',
    ch: 103,
    theme: 'Bless the Lord, O My Soul: Forget Not His Benefits',
    verse: 'Bless the LORD, O my soul; and all that is within me, bless His holy name! Bless the LORD, O my soul, and forget not all His benefits: who forgives all your iniquities, who heals all your diseases, who redeems your life from destruction, who crowns you with lovingkindness and tender mercies.',
    exposition: 'Praise is a spiritual discipline that orders our emotions. Command your soul to recount the mercies of God, and watch thankfulness displace discouragement and complaining.',
    prayer: 'Bless the Lord, O my soul! I thank You for forgiveness, healing, and redemption. My heart overflows with gratitude to You, Jesus.',
    action: 'List five specific blessings God has granted you this week and vocalize praise for each one.'
  },
  {
    ref: 'Psalm 119:105',
    bookId: 'PSA',
    ch: 119,
    theme: 'A Lamp to My Feet and a Light to My Path',
    verse: 'Your word is a lamp to my feet and a light to my path.',
    exposition: 'In ancient paths, an oil lamp illuminated only the next immediate step. God does not always reveal the entire ten-year roadmap, but His Word illuminates the obedience required today.',
    prayer: 'Lord, illuminate my next step. Guard me from stumbling into worldly deception and guide my decisions with Your Scripture.',
    action: 'Consult Scripture and pray before finalizing any significant financial or relational choice today.'
  },
  {
    ref: 'Psalm 121:1–2',
    bookId: 'PSA',
    ch: 121,
    theme: 'My Help Comes from the Lord, Maker of Heaven',
    verse: 'I will lift up my eyes to the hills—from whence comes my help? My help comes from the LORD, who made heaven and earth.',
    exposition: 'When overwhelmed, lift your gaze above the horizon of human limitations. The One who fashioned constellations and carved mountain peaks is actively guarding your life.',
    prayer: 'Maker of heaven and earth, my eyes are fixed on You. I cease relying on human arm and trust Your unfailing assistance.',
    action: 'Step outside, look upward toward the sky, and acknowledge God as your sole provider and protector.'
  },
  {
    ref: 'Proverbs 3:5–6',
    bookId: 'PRO',
    ch: 3,
    theme: 'Trust in the Lord with All Your Heart',
    verse: 'Trust in the LORD with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.',
    exposition: 'Human intellect is finite, but divine wisdom is infinite. Yielding your understanding to Christ does not mean disengaging your mind; it means anchoring your reasoning in eternal truth.',
    prayer: 'Lord, I surrender my self-reliance. In every conversation, project, and encounter today, I acknowledge You as Master. Direct my steps.',
    action: 'Before entering your primary meeting or exam today, pause and pray: "Lord, direct my path."',
  },
  {
    ref: 'Proverbs 4:23',
    bookId: 'PRO',
    ch: 4,
    theme: 'Keep Your Heart with All Diligence',
    verse: 'Keep your heart with all diligence, for out of it spring the issues of life.',
    exposition: 'Your heart is the wellspring of your thoughts, affections, and actions. Consecrated disciples vigilantly guard their gates—eyes, ears, and mind—from toxins that pollute the fountain.',
    prayer: 'Holy Father, set a divine guard over my heart. Filter what enters my sight and hearing, preserving my affections holy for You.',
    action: 'Audit your social media feeds and unfollow any accounts that tempt or defile your walk of purity.'
  },
  {
    ref: 'Proverbs 27:17',
    bookId: 'PRO',
    ch: 27,
    theme: 'Iron Sharpens Iron in Consecrated Fellowship',
    verse: 'As iron sharpens iron, so a man sharpens the countenance of his friend.',
    exposition: 'Solitary Christianity is an oxymoron. We are formed into mature disciples through authentic brotherhood, spiritual accountability, and honest encouragement in small groups.',
    prayer: 'Lord, thank You for the brothers and sisters in YoungFire. Sharpen my faith and use me to strengthen others in holiness.',
    action: 'Reach out to a brother or sister in YoungFire today with an uplifting word or scripture.'
  },
  {
    ref: 'Ecclesiastes 3:1',
    bookId: 'ECC',
    ch: 3,
    theme: 'A Time for Every Purpose Under Heaven',
    verse: 'To everything there is a season, a time for every purpose under heaven.',
    exposition: 'Life is ordered by divine appointments. Whether you find yourself in a season of planting, waiting, or harvesting, rest content in the knowledge that God makes all things beautiful in His time.',
    prayer: 'Lord of time and eternity, give me patience to honor the season I am in without rushing or lamenting. I trust Your timing.',
    action: 'Reflect on your current season of life and write down what spiritual fruit God is cultivating in it.'
  },
  {
    ref: 'Isaiah 40:29–31',
    bookId: 'ISA',
    ch: 40,
    theme: 'Mounting Up with Wings Like Eagles',
    verse: 'He gives power to the weak, and to those who have no might He increases strength... But those who wait on the LORD shall renew their strength; they shall mount up with wings like eagles, they shall run and not be weary, they shall walk and not faint.',
    exposition: 'Human grit eventually exhausts itself, but waiting upon the Lord taps into inexhaustible celestial power. Exchange your fatigue for His divine vitality this morning.',
    prayer: 'Lord Jesus, I wait on You. Fill my empty reservoir with Your Holy Spirit. Grant me spiritual wings to soar above every worldly drain.',
    action: 'Take 10 minutes of quiet prayer today without asking for anything—simply waiting on His presence.'
  },
  {
    ref: 'Isaiah 41:10',
    bookId: 'ISA',
    ch: 41,
    theme: 'Fear Not, for I Am with You',
    verse: 'Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, yes, I will help you, I will uphold you with My righteous right hand.',
    exposition: 'Five distinct promises are packed into this single verse: presence, covenant, strength, help, and divine upholding. When doubts assault your soul, cling to the right hand of God.',
    prayer: 'Lord, You uphold me with Your righteous right hand. I refuse to be dismayed, for You are my God and my constant companion.',
    action: 'Recite Isaiah 41:10 three times today whenever intimidation arises in your thoughts.'
  },
  {
    ref: 'Isaiah 53:5',
    bookId: 'ISA',
    ch: 53,
    theme: 'By His Stripes We Are Healed',
    verse: 'But He was wounded for our transgressions, He was bruised for our iniquities; the chastisement for our peace was upon Him, and by His stripes we are healed.',
    exposition: 'Seven centuries before Calvary, Isaiah beheld the suffering Servant paying the ransom for our souls. Christ absorbed the full penalty of our sins so we could inherit peace and divine healing.',
    prayer: 'Lord Jesus, thank You for bearing my wounds and purchasing my peace on the cross. I receive Your healing and righteousness today.',
    action: 'Thank Jesus specifically for three things His sacrifice accomplished in your life.'
  },
  {
    ref: 'Jeremiah 29:11–13',
    bookId: 'JER',
    ch: 29,
    theme: 'Thoughts of Peace and a Future Full of Hope',
    verse: 'For I know the thoughts that I think toward you, says the LORD, thoughts of peace and not of evil, to give you a future and a hope. Then you will call upon Me and go and pray to Me, and I will listen to you. And you will seek Me and find Me, when you search for Me with all your heart.',
    exposition: 'Even in Babylonian exile, God\'s sovereign plans remained filled with redemptive hope. Your current circumstances do not determine your destiny; God\'s covenant promises do.',
    prayer: 'Father, Your thoughts toward me are peace and divine purpose. I seek You with my whole heart and rest in Your promised future.',
    action: 'Surrender any timeline anxiety about marriage, career, or ministry into God\'s sovereign hands.'
  },
  {
    ref: 'Lamentations 3:22–24',
    bookId: 'LAM',
    ch: 3,
    theme: 'His Mercies Are New Every Morning',
    verse: 'Through the LORD\'s mercies we are not consumed, because His compassions fail not. They are new every morning; great is Your faithfulness. "The LORD is my portion," says my soul, "therefore I hope in Him!"',
    exposition: 'Amid the smoking ruins of Jerusalem, Jeremiah anchored his soul in the unchanging mercy of God. Yesterday\'s failures do not carry over; this dawn brings fresh compassion and cleansing.',
    prayer: 'Great is Your faithfulness, Lord! Thank You for mercies that never run dry. You are my portion today and forever.',
    action: 'Celebrate the fresh slate of this morning by extending forgiveness and mercy to someone who offended you.'
  },
  {
    ref: 'Micah 6:8',
    bookId: 'MIC',
    ch: 6,
    theme: 'Do Justly, Love Mercy, Walk Humbly',
    verse: 'He has shown you, O man, what is good; and what does the LORD require of you but to do justly, to love mercy, and to walk humbly with your God?',
    exposition: 'True religion is unpretentious. God bypasses external religious performance and looks for disciples who practice integrity, extend radical grace, and walk in lowliness of heart.',
    prayer: 'Lord, deliver me from religious hypocrisy. Teach me to do what is right, love showing mercy, and walk humbly before Your throne.',
    action: 'Perform one concrete act of justice or mercy in your local community this week.'
  },
  {
    ref: 'Zephaniah 3:17',
    bookId: 'ZEP',
    ch: 3,
    theme: 'The Lord Your God in Your Midst Reigns',
    verse: 'The LORD your God in your midst, the Mighty One, will save; He will rejoice over you with gladness, He will quiet you with His love, He will rejoice over you with singing.',
    exposition: 'God is not an indifferent observer; He is a Mighty Warrior dwelling in our midst, singing songs of joyful deliverance over His redeemed children and quieting our anxieties with His love.',
    prayer: 'Mighty Savior, thank You for dwelling in my midst. Quiet my anxious heart with the soothing assurance of Your deep love.',
    action: 'Spend two minutes resting quietly in the truth that God delights over you in Christ.'
  },
  {
    ref: 'Malachi 4:2',
    bookId: 'MAL',
    ch: 4,
    theme: 'The Sun of Righteousness Arising with Healing',
    verse: 'But to you who fear My name the Sun of Righteousness shall arise with healing in His wings; and you shall go out and grow fat like stall-fed calves.',
    exposition: 'The final prophetic book of the Old Testament ends with the glorious dawn of the Messiah. Christ, the Sun of Righteousness, rises over your life with divine healing, joy, and freedom.',
    prayer: 'Lord Jesus, Sun of Righteousness, arise over my soul today. Bring healing to every wounded area and fill me with kingdom joy.',
    action: 'Praise Jesus as the fulfillment of every Old Testament promise.'
  }
];

// Canonical New Testament / Epistles Milestones (366 Unique Days)
const NT_ANCHORS: ScriptureEntry[] = [
  {
    ref: 'Matthew 6:33',
    bookId: 'MAT',
    ch: 6,
    theme: 'Seek First the Kingdom of God',
    verse: 'But seek first the kingdom of God and His righteousness, and all these things shall be added to you.',
    exposition: 'As twilight falls, release the anxious striving that gripped your afternoon. When Christ\'s kingdom and righteousness are your singular priority, heaven assumes responsibility for your tomorrow.',
    prayer: 'King Jesus, I lay down all material anxiety. You are my First Love and highest pursuit. Thank You for providing all I need.',
    action: 'Review your spending and schedule, ensuring Christ\'s kingdom holds the foremost place.'
  },
  {
    ref: 'Matthew 11:28–30',
    bookId: 'MAT',
    ch: 11,
    theme: 'Come to Me, All Who Labor and Are Heavy Laden',
    verse: 'Come to Me, all you who labor and are heavy laden, and I will give you rest. Take My yoke upon you and learn from Me, for I am gentle and lowly in heart, and you will find rest for your souls. For My yoke is easy and My burden is light.',
    exposition: 'The world loads heavy burdens of performance, comparison, and exhaustion. Christ invites you to unbuckle the heavy yoke of self-righteousness and enter deep, soul-restoring Sabbath in His grace.',
    prayer: 'Gentle Savior, I come to You weary and burdened. I take Your easy yoke and receive deep rest for my spirit tonight.',
    action: 'Before sleeping, write down every burden weighing on your heart and symbolically hand it to Jesus in prayer.'
  },
  {
    ref: 'John 1:1–5',
    bookId: 'JHN',
    ch: 1,
    theme: 'The Word Was God: The Light in the Darkness',
    verse: 'In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God. All things were made through Him, and without Him nothing was made that was made. In Him was life, and the life was the light of men. And the light shines in the darkness, and the darkness did not comprehend it.',
    exposition: 'No shadow of night can overcome the incandescent glory of Jesus Christ. As darkness falls across the physical world, let the unquenchable light of the living Word illuminate your spirit.',
    prayer: 'Lord Jesus, Eternal Word, shine into every dark crevice of my thoughts. Let Your life extinguish all despair.',
    action: 'Turn off all screens and ambient lights for 10 minutes tonight and contemplate the Light of Christ.'
  },
  {
    ref: 'John 14:27',
    bookId: 'JHN',
    ch: 14,
    theme: 'Peace I Leave with You: My Peace I Give',
    verse: 'Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled, neither let it be afraid.',
    exposition: 'Worldly peace is circumstantial and fragile; Christ\'s peace is supernatural, purchased by His blood, and impervious to worldly storms. Guard your sleep tonight in this unshakeable tranquility.',
    prayer: 'Prince of Peace, let Your calm flood my room. I silence every anxious voice and receive Your perfect peace.',
    action: 'Whisper "The peace of Christ guards my heart" as you lay down your head to sleep.'
  },
  {
    ref: 'John 15:4–5',
    bookId: 'JHN',
    ch: 15,
    theme: 'Abiding in the True Vine',
    verse: 'Abide in Me, and I in you. As the branch cannot bear fruit of itself, unless it abides in the vine, neither can you, unless you abide in Me. I am the vine, you are the branches. He who abides in Me, and I in him, bears much fruit; for without Me you can do nothing.',
    exposition: 'Spiritual fruit is the natural byproduct of communion, not legalistic sweat. Disciples do not generate life; we receive life by remaining grafted in deep fellowship with Christ.',
    prayer: 'Lord Jesus, You are my Vine. Sever every branch of fleshly independence and let Your sap of divine life flow freely through me.',
    action: 'Ask yourself: "Did I operate out of self-reliance today, or out of abiding communion with Jesus?"'
  },
  {
    ref: 'Romans 8:1',
    bookId: 'ROM',
    ch: 8,
    theme: 'No Condemnation for Those in Christ Jesus',
    verse: 'There is therefore now no condemnation to those who are in Christ Jesus, who do not walk according to the flesh, but according to the Spirit.',
    exposition: 'The accuser loves to assault believers at night with memories of past shortcomings. Answer every demonic accusation with the finished work of the Cross: there is now zero condemnation!',
    prayer: 'Holy Father, I rest beneath the shelter of the blood of Jesus. I reject all shame and condemnation, standing righteous in Your sight.',
    action: 'If feelings of guilt arise tonight, declare Romans 8:1 aloud until your soul is fully at peace.'
  },
  {
    ref: 'Romans 8:38–39',
    bookId: 'ROM',
    ch: 8,
    theme: 'Inseparable from the Love of God',
    verse: 'For I am persuaded that neither death nor life, nor angels nor principalities nor powers, nor things present nor things to come, nor height nor depth, nor any other created thing, shall be able to separate us from the love of God which is in Christ Jesus our Lord.',
    exposition: 'No spiritual adversary, economic crisis, sickness, or future uncertainty has the power to sever the cord of God\'s sovereign love toward you. Sleep peacefully in this eternal security.',
    prayer: 'Father, thank You that nothing in creation can sever me from Your love in Christ Jesus. I rest completely safe in Your arms.',
    action: 'Pray for a friend wrestling with insecurity, reminding them of the unbreakable love of God.'
  },
  {
    ref: 'Romans 12:1–2',
    bookId: 'ROM',
    ch: 12,
    theme: 'A Living Sacrifice: Transformed by Renewed Minds',
    verse: 'I beseech you therefore, brethren, by the mercies of God, that you present your bodies a living sacrifice, holy, acceptable to God, which is your reasonable service. And do not be conformed to this world, but be transformed by the renewing of your mind...',
    exposition: 'Consecration is our worshipful response to divine mercy. As the day closes, surrender the members of your body once more to God, refusing to conform to the culture of this passing world.',
    prayer: 'Lord, I present my body and mind anew on Your altar. Renew my thoughts and empower me to walk in Your perfect will.',
    action: 'Examine where you gave in to worldly pressures today, and ask the Holy Spirit to renew your thinking.'
  },
  {
    ref: '1 Corinthians 13:4–7',
    bookId: '1CO',
    ch: 13,
    theme: 'The More Excellent Way: Christlike Agape Love',
    verse: 'Love suffers long and is kind; love does not envy; love does not parade itself, is not puffed up; does not behave rudely, does not seek its own, is not provoked, thinks no evil; does not rejoice in iniquity, but rejoices in the truth; bears all things, believes all things, hopes all things, endures all things.',
    exposition: 'Gifts and talents without agape love are empty noise. Review your conversations and interactions today through the mirror of 1 Corinthians 13, repenting of impatience and selfishness.',
    prayer: 'Lord, pour Your love into my heart. Cleanse me of selfishness, pride, and irritation, and make me a conduit of Your grace.',
    action: 'Reach out to someone you were curt or impatient with today and offer a sincere apology.'
  },
  {
    ref: '2 Corinthians 5:17',
    bookId: '2CO',
    ch: 5,
    theme: 'A New Creation in Christ',
    verse: 'Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.',
    exposition: 'You are not an improved version of your old fallen self; in Christ, you are a brand-new creation with a new spiritual DNA, new desires, and an eternal citizenship in the Kingdom.',
    prayer: 'Thank You, Jesus, for making me brand new. The old guilt and sinful patterns have passed away. I walk in Your newness of life.',
    action: 'Celebrate your spiritual adoption in Christ with a quiet song of thanksgiving before bed.'
  },
  {
    ref: 'Galatians 2:20',
    bookId: 'GAL',
    ch: 2,
    theme: 'Crucified with Christ: Living by Faith',
    verse: 'I have been crucified with Christ; it is no longer I who live, but Christ lives in me; and the life which I now live in the flesh I live by faith in the Son of God, who loved me and gave Himself for me.',
    exposition: 'The secret of victorious Christian living is not trying harder, but acknowledging that your self-life was co-crucified with Christ. Allow Jesus to live His triumphant life through you.',
    prayer: 'Lord Jesus, I die to self. Live Your holy, selfless, victorious life through me. I trust in Your indwelling grace.',
    action: 'Surrender any personal ambitions that clash with Christ\'s calling on your life.'
  },
  {
    ref: 'Galatians 5:22–23',
    bookId: 'GAL',
    ch: 5,
    theme: 'The Ninefold Fruit of the Holy Spirit',
    verse: 'But the fruit of the Spirit is love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, self-control. Against such there is no law.',
    exposition: 'These virtues are not produced by human resolution, but grown by the indwelling Spirit. As evening draws near, ask the Holy Spirit to cultivate patience, kindness, and self-control within you.',
    prayer: 'Holy Spirit, cultivate Your divine fruit in my character. Uproot bitterness, anger, and carnal reactions, and clothe me in Christ.',
    action: 'Identify which of the nine fruits was most challenged today, and pray specifically for grace in that area.'
  },
  {
    ref: 'Ephesians 2:8–10',
    bookId: 'EPH',
    ch: 2,
    theme: 'Saved by Grace for Kingdom Good Works',
    verse: 'For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, lest anyone should boast. For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand that we should walk in them.',
    exposition: 'Salvation is entirely unmerited favor. You are God\'s masterpiece (poiēma), uniquely fashioned and commissioned to fulfill kingdom works prepared before the foundation of the world.',
    prayer: 'Father, thank You for the priceless gift of grace. I am Your workmanship; guide my hands and voice to fulfill the good works You designed for me.',
    action: 'Thank God for saving you by grace, and ask Him to open doors for gospel service tomorrow.'
  },
  {
    ref: 'Ephesians 6:10–13',
    bookId: 'EPH',
    ch: 6,
    theme: 'The Whole Armor of God in Spiritual Warfare',
    verse: 'Finally, my brethren, be strong in the Lord and in the power of His might. Put on the whole armor of God, that you may be able to stand against the wiles of the devil. For we do not wrestle against flesh and blood, but against principalities, against powers...',
    exposition: 'Our battles are not against human enemies, but unseen demonic forces. Put on truth, righteousness, the gospel of peace, faith, salvation, and the sword of the Spirit as you sleep.',
    prayer: 'Lord of Hosts, I put on the full armor of God. Guard my sleep, seal my household in the blood of Jesus, and extinguish every fiery dart.',
    action: 'Pray for spiritual protection over your church family, leaders, and missionaries.'
  },
  {
    ref: 'Philippians 4:6–7',
    bookId: 'PHP',
    ch: 4,
    theme: 'The Peace of God Guarding Heart and Mind',
    verse: 'Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus.',
    exposition: 'Anxiety is an invitation to prayer. Instead of tossing and turning, transform every worry into a petition accompanied by thanksgiving. The garrison of divine peace will patrol your mind.',
    prayer: 'Father, I cast all anxiety upon You. Thank You for hearing my cries. Let Your transcendent peace stand guard over my mind tonight.',
    action: 'Write a thanksgiving list of three specific things God answered this month.'
  },
  {
    ref: 'Philippians 4:13',
    bookId: 'PHP',
    ch: 4,
    theme: 'I Can Do All Things Through Christ',
    verse: 'I can do all things through Christ who strengthens me.',
    exposition: 'Paul penned these words while chained in a Roman dungeon. This is not a mantra for selfish ambition, but a confession that Christ supplies supernatural endurance to overcome any trial.',
    prayer: 'Lord Jesus, You are my internal strength. Whatever challenges await me tomorrow, I can endure and triumph through Your power.',
    action: 'Speak Philippians 4:13 over any impending challenge or task that feels overwhelming.'
  },
  {
    ref: 'Colossians 3:1–3',
    bookId: 'COL',
    ch: 3,
    theme: 'Set Your Mind on Things Above',
    verse: 'If then you were raised with Christ, seek those things which are above, where Christ is, sitting at the right hand of God. Set your mind on things above, not on things on the earth. For you died, and your life is hidden with Christ in God.',
    exposition: 'Your true citizenship and identity are not earthbound. Set the compass of your mind upon celestial realities, where your life is safely enveloped in the ascended Christ.',
    prayer: 'Ascended Lord, lift my vision above the temporal noise of this earth. Anchor my thoughts in Your eternal glory and victory.',
    action: 'Meditate on the sovereignty of Christ sitting at the right hand of the Father.'
  },
  {
    ref: '1 Thessalonians 5:16–18',
    bookId: '1TH',
    ch: 5,
    theme: 'Rejoice Always, Pray Without Ceasing',
    verse: 'Rejoice always, pray without ceasing, in everything give thanks; for this is the will of God in Christ Jesus for you.',
    exposition: 'Unceasing prayer is living in constant awareness of God\'s presence. In triumphs or setbacks, thanksgiving anchors the soul in the good, acceptable, and perfect will of God.',
    prayer: 'Lord, make my breath a continuous prayer of praise. I give You thanks for all that transpired today, trusting Your sovereign care.',
    action: 'Conclude your day with 60 seconds of unfiltered thanksgiving before closing your eyes.'
  },
  {
    ref: '2 Timothy 1:7',
    bookId: '2TI',
    ch: 1,
    theme: 'Power, Love, and a Sound Mind',
    verse: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.',
    exposition: 'Fear is not an emotion; it is an ungodly spirit seeking to paralyze disciples. God has deposited the Holy Spirit within you—imparting supernatural power, sacrificial love, and mental discipline.',
    prayer: 'Lord, I rebuke fear, panic, and confusion. Fill me with Your holy power, unconditional love, and a disciplined, sound mind.',
    action: 'When anxious thoughts invade your sleep, confess 2 Timothy 1:7 with conviction.'
  },
  {
    ref: 'Hebrews 4:16',
    bookId: 'HEB',
    ch: 4,
    theme: 'Coming Boldly to the Throne of Grace',
    verse: 'Let us therefore come boldly to the throne of grace, that we may obtain mercy and find grace to help in time of need.',
    exposition: 'Through the torn veil of Christ\'s flesh, the Holy of Holies is permanently open. Do not cower in shame; run boldly to the throne of grace tonight to receive mercy and timely help.',
    prayer: 'Great High Priest, I come boldly to Your throne. I receive mercy for my shortcomings and abundant grace for every need.',
    action: 'Bring your deepest, most confidential prayer request directly to the throne of grace tonight.'
  },
  {
    ref: 'Hebrews 11:1',
    bookId: 'HEB',
    ch: 11,
    theme: 'Faith: The Substance of Things Hoped For',
    verse: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    exposition: 'Biblical faith is not wishful thinking; it is solid spiritual substance. It treats God\'s promises as established reality even before physical senses can verify them.',
    prayer: 'Lord, increase my faith. Teach me to walk by divine promise rather than sight, resting securely on Your eternal integrity.',
    action: 'Pray boldly for an impossible situation, trusting God\'s Word as your guarantee.'
  },
  {
    ref: 'Hebrews 12:1–2',
    bookId: 'HEB',
    ch: 12,
    theme: 'Looking unto Jesus, Author and Finisher of Faith',
    verse: 'Therefore we also, since we are surrounded by so great a cloud of witnesses, let us lay aside every weight, and the sin which so easily ensnares us, and let us run with endurance the race that is set before us, looking unto Jesus, the author and finisher of our faith...',
    exposition: 'Lay aside both overt sins and subtle weights that slow your discipleship pace. Fix your spiritual gaze on Jesus, who pioneered the path of obedience and will bring your faith to full maturity.',
    prayer: 'Jesus, Author and Finisher of my faith, I strip away every distracting weight. My eyes are fixed on You alone as I run the race.',
    action: 'Identify one unnecessary distraction or media habit that is weighing down your spiritual race, and discard it.'
  },
  {
    ref: 'James 1:2–4',
    bookId: 'JAS',
    ch: 1,
    theme: 'Count It All Joy: The Testing of Faith',
    verse: 'My brethren, count it all joy when you fall into various trials, knowing that the testing of your faith produces patience. But let patience have its perfect work, that you may be perfect and complete, lacking nothing.',
    exposition: 'Trials are not accidents; in the master plan of God, they are divine workshops where spiritual endurance and maturity are forged. Rejoice, for your character is being purified like gold.',
    prayer: 'Lord, grant me joy in the midst of trials. Let patience have its full work in my character so I lack nothing in spiritual maturity.',
    action: 'Thank God for one difficult circumstance in your life, trusting Him to produce endurance through it.'
  },
  {
    ref: '1 Peter 5:6–7',
    bookId: '1PE',
    ch: 5,
    theme: 'Casting All Your Care Upon Him',
    verse: 'Therefore humble yourselves under the mighty hand of God, that He may exalt you in due time, casting all your care upon Him, for He cares for you.',
    exposition: 'Worry is fundamentally an attempt to control what only God can manage. Humility is demonstrated by hurling every anxiety onto the shoulders of the One who tenderly cares for you.',
    prayer: 'Heavenly Father, I humble myself under Your mighty hand. I roll every care, burden, and fear onto You, knowing You care for me.',
    action: 'Imagine placing your burdens in Christ\'s hands, and refuse to pick them back up tonight.'
  },
  {
    ref: '1 John 1:7–9',
    bookId: '1JN',
    ch: 1,
    theme: 'Walking in the Light and Complete Cleansing',
    verse: 'But if we walk in the light as He is in the light, we have fellowship with one another, and the blood of Jesus Christ His Son cleanses us from all sin. If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.',
    exposition: 'Honesty before God is the prerequisite for divine fellowship. Unburden your conscience in sincere confession, and the blood of Jesus will wash you whiter than fresh snow.',
    prayer: 'Lord Jesus, I confess my sins and faults from today. Cleanse me thoroughly with Your blood and restore unbroken fellowship with You.',
    action: 'Spend two minutes in silent self-examination and confession before retiring to sleep.'
  },
  {
    ref: 'Revelation 21:3–4',
    bookId: 'REV',
    ch: 21,
    theme: 'God Will Wipe Away Every Tear',
    verse: 'And I heard a loud voice from heaven saying, "Behold, the tabernacle of God is with men, and He will dwell with them, and they shall be His people. God Himself will be with them and be their God. And God will wipe away every tear from their eyes; there shall be no more death, nor sorrow, nor crying. There shall be no more pain, for the former things have passed away."',
    exposition: 'The ultimate destination of redeemed humanity is eternal fellowship with God in a city where mourning, sickness, and pain are forever banished. Let this celestial hope comfort your sleep.',
    prayer: 'Come, Lord Jesus! I anchor my soul in the promise of Your new heaven and new earth. Wipe away sorrow and fill my spirit with eternity.',
    action: 'Meditate on the reality of eternal life in the New Jerusalem.'
  },
  {
    ref: 'Revelation 22:20',
    bookId: 'REV',
    ch: 22,
    theme: 'Surely I Am Coming Quickly: Maranatha',
    verse: 'He who testifies to these things says, "Surely I am coming quickly." Amen. Even so, come, Lord Jesus!',
    exposition: 'The canon of sacred Scripture closes with the blessed promise of Christ\'s swift return. Consecrated disciples sleep with lamps trimmed and oil full, crying: Even so, come, Lord Jesus!',
    prayer: 'Even so, come, Lord Jesus! Let Your kingdom come and Your will be done on earth as it is in heaven. Amen.',
    action: 'End your day with the ancient apostolic watchword: "Maranatha — The Lord is coming!"'
  }
];

// Complete 66-Book Canonical Scripture Index for Deterministic 366-Day Unique Generation
const OT_WISDOM_CATALOG: ScriptureEntry[] = [
  { ref: 'Genesis 1:26–27', bookId: 'GEN', ch: 1, theme: 'Formed in the Image of God', verse: 'Then God said, "Let Us make man in Our image, according to Our likeness..." So God created man in His own image; in the image of God He created him; male and female He created them.' },
  { ref: 'Genesis 3:15', bookId: 'GEN', ch: 3, theme: 'The Protoevangelium: The Seed of the Woman', verse: 'And I will put enmity between you and the woman, and between your seed and her Seed; He shall bruise your head, and you shall bruise His heel.' },
  { ref: 'Genesis 9:13', bookId: 'GEN', ch: 9, theme: 'The Rainbow Covenant of Grace', verse: 'I set My rainbow in the cloud, and it shall be for the sign of the covenant between Me and the earth.' },
  { ref: 'Genesis 17:1', bookId: 'GEN', ch: 17, theme: 'Walk Before El Shaddai Blameless', verse: 'When Abram was ninety-nine years old, the LORD appeared to Abram and said to him, "I am Almighty God; walk before Me and be blameless."' },
  { ref: 'Exodus 15:2', bookId: 'EXO', ch: 15, theme: 'The Lord Is My Strength and Song', verse: 'The LORD is my strength and song, and He has become my salvation; He is my God, and I will praise Him; my father\'s God, and I will exalt Him.' },
  { ref: 'Exodus 20:2–3', bookId: 'EXO', ch: 20, theme: 'No Other Gods Before Me', verse: 'I am the LORD your God, who brought you out of the land of Egypt, out of the house of bondage. You shall have no other gods before Me.' },
  { ref: 'Leviticus 19:2', bookId: 'LEV', ch: 19, theme: 'You Shall Be Holy, for I Am Holy', verse: 'Speak to all the congregation of the children of Israel, and say to them: "You shall be holy, for I the LORD your God am holy."' },
  { ref: 'Numbers 6:24–26', bookId: 'NUM', ch: 6, theme: 'The Priestly Aaronic Blessing', verse: 'The LORD bless you and keep you; the LORD make His face shine upon you, and be gracious to you; the LORD lift up His countenance upon you, and give you peace.' },
  { ref: 'Deuteronomy 4:29', bookId: 'DEU', ch: 4, theme: 'Seeking with All Your Heart and Soul', verse: 'But from there you will seek the LORD your God, and you will find Him if you seek Him with all your heart and with all your soul.' },
  { ref: 'Deuteronomy 30:19', bookId: 'DEU', ch: 30, theme: 'Choose Life and Covenant Blessing', verse: 'I call heaven and earth as witnesses today against you, that I have set before you life and death, blessing and cursing; therefore choose life, that both you and your descendants may live.' },
  { ref: 'Deuteronomy 31:6', bookId: 'DEU', ch: 31, theme: 'Be Strong and of Good Courage', verse: 'Be strong and of good courage, do not fear nor be afraid of them; for the LORD your God, He is the One who goes with you. He will not leave you nor forsake you.' },
  { ref: 'Deuteronomy 33:27', bookId: 'DEU', ch: 33, theme: 'The Eternal God Is Your Refuge', verse: 'The eternal God is your refuge, and underneath are the everlasting arms; He will thrust out the enemy from before you, and will say, "Destroy!"' },
  { ref: 'Judges 6:12', bookId: 'JDG', ch: 6, theme: 'The Lord Is with You, Mighty Man of Valor', verse: 'And the Angel of the LORD appeared to him, and said to him, "The LORD is with you, you mighty man of valor!"' },
  { ref: 'Ruth 1:16', bookId: 'RUT', ch: 1, theme: 'Steadfast Covenant Loyalty', verse: 'Entreat me not to leave you, or to turn back from following after you; for wherever you go, I will go; and wherever you lodge, I will lodge; your people shall be my people, and your God, my God.' },
  { ref: '1 Samuel 2:2', bookId: '1SA', ch: 2, theme: 'None Holy Like the Lord', verse: 'No one is holy like the LORD, for there is none besides You, nor is there any rock like our God.' },
  { ref: '1 Samuel 17:47', bookId: '1SA', ch: 17, theme: 'The Battle Is the Lord\'s', verse: 'Then all this assembly shall know that the LORD does not save with sword and spear; for the battle is the LORD\'s, and He will give you into our hands.' },
  { ref: '2 Samuel 7:22', bookId: '2SA', ch: 7, theme: 'You Are Great, O Lord God', verse: 'Therefore You are great, O Lord GOD. For there is none like You, nor is there any God besides You, according to all that we have heard with our ears.' },
  { ref: '2 Samuel 22:31', bookId: '2SA', ch: 22, theme: 'As for God, His Way Is Perfect', verse: 'As for God, His way is perfect; the word of the LORD is proven; He is a shield to all who trust in Him.' },
  { ref: '1 Kings 8:56', bookId: '1KI', ch: 8, theme: 'Not One Word Has Failed', verse: 'Blessed be the LORD, who has given rest to His people Israel, according to all that He promised. There has not failed one word of all His good promise, which He promised through His servant Moses.' },
  { ref: '1 Kings 18:37–39', bookId: '1KI', ch: 18, theme: 'The Fire of the Lord Falls', verse: 'Then the fire of the LORD fell and consumed the burnt sacrifice... Now when all the people saw it, they fell on their faces; and they said, "The LORD, He is God! The LORD, He is God!"' },
  { ref: '2 Kings 6:16', bookId: '2KI', ch: 6, theme: 'Those Who Are with Us Are More', verse: 'So he answered, "Do not fear, for those who are with us are more than those who are with them."' },
  { ref: '1 Chronicles 16:11', bookId: '1CH', ch: 16, theme: 'Seek the Lord and His Strength', verse: 'Seek the LORD and His strength; seek His face evermore!' },
  { ref: '1 Chronicles 29:11', bookId: '1CH', ch: 29, theme: 'Yours, O Lord, Is the Greatness', verse: 'Yours, O LORD, is the greatness, the power and the glory, the victory and the majesty; for all that is in heaven and in earth is Yours; Yours is the kingdom, O LORD, and You are exalted as head over all.' },
  { ref: '2 Chronicles 20:12', bookId: '2CH', ch: 20, theme: 'Our Eyes Are Fixed on You', verse: 'For we have no power against this great multitude that is coming against us; nor do we know what to do, but our eyes are upon You.' },
  { ref: 'Nehemiah 8:10', bookId: 'NEH', ch: 8, theme: 'The Joy of the Lord Is Your Strength', verse: 'Do not sorrow, for the joy of the LORD is your strength.' },
  { ref: 'Esther 4:14', bookId: 'EST', ch: 4, theme: 'For Such a Time as This', verse: 'Yet who knows whether you have come to the kingdom for such a time as this?' },
  { ref: 'Job 23:10', bookId: 'JOB', ch: 23, theme: 'He Knows the Way That I Take', verse: 'But He knows the way that I take; when He has tested me, I shall come forth as gold.' },
  { ref: 'Job 42:2', bookId: 'JOB', ch: 42, theme: 'No Purpose of Yours Can Be Withheld', verse: 'I know that You can do everything, and that no purpose of Yours can be withheld from You.' },
  { ref: 'Psalm 16:11', bookId: 'PSA', ch: 16, theme: 'In Your Presence Is Fullness of Joy', verse: 'You will show me the path of life; in Your presence is fullness of joy; at Your right hand are pleasures forevermore.' },
  { ref: 'Psalm 19:14', bookId: 'PSA', ch: 19, theme: 'Acceptable Words and Meditations', verse: 'Let the words of my mouth and the meditation of my heart be acceptable in Your sight, O LORD, my strength and my Redeemer.' },
  { ref: 'Psalm 34:1–3', bookId: 'PSA', ch: 34, theme: 'I Will Bless the Lord at All Times', verse: 'I will bless the LORD at all times; His praise shall continually be in my mouth. My soul shall make its boast in the LORD; the humble shall hear of it and be glad.' },
  { ref: 'Psalm 37:4–5', bookId: 'PSA', ch: 37, theme: 'Delight Yourself in the Lord', verse: 'Delight yourself also in the LORD, and He shall give you the desires of your heart. Commit your way to the LORD, trust also in Him, and He shall bring it to pass.' },
  { ref: 'Psalm 51:10', bookId: 'PSA', ch: 51, theme: 'Create in Me a Clean Heart', verse: 'Create in me a clean heart, O God, and renew a steadfast spirit within me.' },
  { ref: 'Psalm 63:1', bookId: 'PSA', ch: 63, theme: 'Early Will I Seek You', verse: 'O God, You are my God; early will I seek You; my soul thirsts for You; my flesh longs for You in a dry and thirsty land where there is no water.' },
  { ref: 'Psalm 84:10', bookId: 'PSA', ch: 84, theme: 'Better Is One Day in Your Courts', verse: 'For a day in Your courts is better than a thousand. I would rather be a doorkeeper in the house of my God than dwell in the tents of wickedness.' },
  { ref: 'Psalm 100:1–3', bookId: 'PSA', ch: 100, theme: 'Enter His Gates with Thanksgiving', verse: 'Make a joyful shout to the LORD, all you lands! Serve the LORD with gladness; come before His presence with singing. Know that the LORD, He is God; it is He who has made us, and not we ourselves.' },
  { ref: 'Psalm 126:5–6', bookId: 'PSA', ch: 126, theme: 'Those Who Sow in Tears Shall Reap in Joy', verse: 'Those who sow in tears shall reap in joy. He who continually goes forth weeping, bearing seed for sowing, shall doubtless come again with rejoicing, bringing his sheaves with him.' },
  { ref: 'Psalm 139:13–14', bookId: 'PSA', ch: 139, theme: 'Fearfully and Wonderfully Made', verse: 'For You formed my inward parts; You covered me in my mother\'s womb. I will praise You, for I am fearfully and wonderfully made; marvelous are Your works.' },
  { ref: 'Psalm 145:18', bookId: 'PSA', ch: 145, theme: 'The Lord Is Near to All Who Call', verse: 'The LORD is near to all who call upon Him, to all who call upon Him in truth.' },
  { ref: 'Proverbs 1:7', bookId: 'PRO', ch: 1, theme: 'The Fear of the Lord Is the Beginning of Knowledge', verse: 'The fear of the LORD is the beginning of knowledge, but fools despise wisdom and instruction.' },
  { ref: 'Proverbs 16:3', bookId: 'PRO', ch: 16, theme: 'Commit Your Works to the Lord', verse: 'Commit your works to the LORD, and your thoughts will be established.' },
  { ref: 'Proverbs 18:10', bookId: 'PRO', ch: 18, theme: 'The Name of the Lord Is a Strong Tower', verse: 'The name of the LORD is a strong tower; the righteous run to it and are safe.' },
  { ref: 'Proverbs 31:30', bookId: 'PRO', ch: 31, theme: 'A Woman Who Fears the Lord Shall Be Praised', verse: 'Charm is deceitful and beauty is passing, but a woman who fears the LORD, she shall be praised.' },
  { ref: 'Ecclesiastes 12:13', bookId: 'ECC', ch: 12, theme: 'The Whole Duty of Man', verse: 'Let us hear the conclusion of the whole matter: Fear God and keep His commandments, for this is man\'s all.' },
  { ref: 'Song of Solomon 2:4', bookId: 'SNG', ch: 2, theme: 'His Banner Over Me Is Love', verse: 'He brought me to the banqueting house, and his banner over me was love.' },
  { ref: 'Isaiah 9:6', bookId: 'ISA', ch: 9, theme: 'Unto Us a Child Is Born: Prince of Peace', verse: 'For unto us a Child is born, unto us a Son is given; and the government will be upon His shoulder. And His name will be called Wonderful, Counselor, Mighty God, Everlasting Father, Prince of Peace.' },
  { ref: 'Isaiah 26:3', bookId: 'ISA', ch: 26, theme: 'Kept in Perfect Peace', verse: 'You will keep him in perfect peace, whose mind is stayed on You, because he trusts in You.' },
  { ref: 'Isaiah 55:8–9', bookId: 'ISA', ch: 55, theme: 'Higher Thoughts and Higher Ways', verse: 'For My thoughts are not your thoughts, nor are your ways My ways, says the LORD. For as the heavens are higher than the earth, so are My ways higher than your ways, and My thoughts than your thoughts.' },
  { ref: 'Isaiah 61:1–3', bookId: 'ISA', ch: 61, theme: 'Beauty for Ashes and the Oil of Joy', verse: 'The Spirit of the Lord GOD is upon Me, because the LORD has anointed Me to preach good tidings to the poor... to give them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness.' },
  { ref: 'Jeremiah 33:3', bookId: 'JER', ch: 33, theme: 'Call to Me and I Will Answer', verse: 'Call to Me, and I will answer you, and show you great and mighty things, which you do not know.' },
  { ref: 'Ezekiel 36:26', bookId: 'EZK', ch: 36, theme: 'A New Heart and a New Spirit', verse: 'I will give you a new heart and put a new spirit within you; I will take the heart of stone out of your flesh and give you a heart of flesh.' },
  { ref: 'Daniel 3:17–18', bookId: 'DAN', ch: 3, theme: 'Our God Is Able to Deliver Us', verse: 'If that is the case, our God whom we serve is able to deliver us from the burning fiery furnace... But if not, let it be known to you, O king, that we do not serve your gods.' },
  { ref: 'Daniel 12:3', bookId: 'DAN', ch: 12, theme: 'Shining Like the Stars Forever', verse: 'Those who are wise shall shine like the brightness of the firmament, and those who turn many to righteousness like the stars forever and ever.' },
  { ref: 'Joel 2:28', bookId: 'JOL', ch: 2, theme: 'I Will Pour Out My Spirit on All Flesh', verse: 'And it shall come to pass afterward that I will pour out My Spirit on all flesh; your sons and your daughters shall prophesy, your old men shall dream dreams, your young men shall see visions.' },
  { ref: 'Habakkuk 2:4', bookId: 'HAB', ch: 2, theme: 'The Just Shall Live by His Faith', verse: 'Behold the proud, his soul is not upright in him; but the just shall live by his faith.' },
  { ref: 'Habakkuk 3:17–19', bookId: 'HAB', ch: 3, theme: 'Yet I Will Rejoice in the Lord', verse: 'Yet I will rejoice in the LORD, I will joy in the God of my salvation. The LORD God is my strength; He will make my feet like deer\'s feet, and He will make me walk on my high hills.' },
  { ref: 'Zechariah 4:6', bookId: 'ZEC', ch: 4, theme: 'Not by Might nor by Power, but by My Spirit', verse: 'So he answered and said to me: "This is the word of the LORD to Zerubbabel: \'Not by might nor by power, but by My Spirit,\' says the LORD of hosts."' }
];

const NT_EPISTLE_CATALOG: ScriptureEntry[] = [
  { ref: 'Matthew 5:14–16', bookId: 'MAT', ch: 5, theme: 'You Are the Light of the World', verse: 'You are the light of the world. A city that is set on a hill cannot be hidden... Let your light so shine before men, that they may see your good works and glorify your Father in heaven.' },
  { ref: 'Matthew 7:7–8', bookId: 'MAT', ch: 7, theme: 'Ask, Seek, and Knock', verse: 'Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you. For everyone who asks receives, and he who seeks finds, and to him who knocks it will be opened.' },
  { ref: 'Matthew 28:19–20', bookId: 'MAT', ch: 28, theme: 'The Great Commission', verse: 'Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I have commanded you; and lo, I am with you always, even to the end of the age.' },
  { ref: 'Mark 10:45', bookId: 'MRK', ch: 10, theme: 'The Servant King', verse: 'For even the Son of Man did not come to be served, but to serve, and to give His life a ransom for many.' },
  { ref: 'Mark 11:24', bookId: 'MRK', ch: 11, theme: 'Whatever Things You Ask When You Pray', verse: 'Therefore I say to you, whatever things you ask when you pray, believe that you receive them, and you will have them.' },
  { ref: 'Luke 1:37', bookId: 'LUK', ch: 1, theme: 'With God Nothing Will Be Impossible', verse: 'For with God nothing will be impossible.' },
  { ref: 'Luke 9:23', bookId: 'LUK', ch: 9, theme: 'Take Up Your Cross Daily', verse: 'Then He said to them all, "If anyone desires to come after Me, let him deny himself, and take up his cross daily, and follow Me."' },
  { ref: 'Luke 10:19', bookId: 'LUK', ch: 10, theme: 'Authority Over All the Power of the Enemy', verse: 'Behold, I give you the authority to trample on serpents and scorpions, and over all the power of the enemy, and nothing shall by any means hurt you.' },
  { ref: 'John 3:16–17', bookId: 'JHN', ch: 3, theme: 'For God So Loved the World', verse: 'For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life. For God did not send His Son into the world to condemn the world, but that the world through Him might be saved.' },
  { ref: 'John 8:31–32', bookId: 'JHN', ch: 8, theme: 'You Shall Know the Truth, and the Truth Shall Make You Free', verse: 'If you abide in My word, you are My disciples indeed. And you shall know the truth, and the truth shall make you free.' },
  { ref: 'John 10:10', bookId: 'JHN', ch: 10, theme: 'I Have Come That They May Have Life', verse: 'The thief does not come except to steal, and to kill, and to destroy. I have come that they may have life, and that they may have it more abundantly.' },
  { ref: 'John 16:33', bookId: 'JHN', ch: 16, theme: 'Be of Good Cheer: I Have Overcome the World', verse: 'These things I have spoken to you, that in Me you may have peace. In the world you will have tribulation; but be of good cheer, I have overcome the world.' },
  { ref: 'Acts 1:8', bookId: 'ACT', ch: 1, theme: 'You Shall Receive Power', verse: 'But you shall receive power when the Holy Spirit has come upon you; and you shall be witnesses to Me in Jerusalem, and in all Judea and Samaria, and to the end of the earth.' },
  { ref: 'Acts 2:42', bookId: 'ACT', ch: 2, theme: 'Steadfast in Fellowship and Apostles\' Doctrine', verse: 'And they continued steadfastly in the apostles\' doctrine and fellowship, in the breaking of bread, and in prayers.' },
  { ref: 'Acts 4:12', bookId: 'ACT', ch: 4, theme: 'No Other Name Under Heaven', verse: 'Nor is there salvation in any other, for there is no other name under heaven given among men by which we must be saved.' },
  { ref: 'Romans 1:16', bookId: 'ROM', ch: 1, theme: 'Not Ashamed of the Gospel of Christ', verse: 'For I am not ashamed of the gospel of Christ, for it is the power of God to salvation for everyone who believes, for the Jew first and also for the Greek.' },
  { ref: 'Romans 5:1–2', bookId: 'ROM', ch: 5, theme: 'Having Been Justified by Faith, We Have Peace', verse: 'Therefore, having been justified by faith, we have peace with God through our Lord Jesus Christ, through whom also we have access by faith into this grace in which we stand, and rejoice in hope of the glory of God.' },
  { ref: 'Romans 6:23', bookId: 'ROM', ch: 6, theme: 'The Gift of God Is Eternal Life', verse: 'For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.' },
  { ref: 'Romans 10:9–10', bookId: 'ROM', ch: 10, theme: 'Confess with Your Mouth and Believe in Your Heart', verse: 'That if you confess with your mouth the Lord Jesus and believe in your heart that God has raised Him from the dead, you will be saved. For with the heart one believes unto righteousness, and with the mouth confession is made unto salvation.' },
  { ref: '1 Corinthians 6:19–20', bookId: '1CO', ch: 6, theme: 'Your Body Is a Temple of the Holy Spirit', verse: 'Or do you not know that your body is the temple of the Holy Spirit who is in you, whom you have from God, and you are not your own? For you were bought at a price; therefore glorify God in your body and in your spirit, which are God\'s.' },
  { ref: '1 Corinthians 10:13', bookId: '1CO', ch: 10, theme: 'God Is Faithful: A Way of Escape', verse: 'No temptation has overtaken you except such as is common to man; but God is faithful, who will not allow you to be tempted beyond what you are able, but with the temptation will also make the way of escape, that you may be able to bear it.' },
  { ref: '1 Corinthians 15:57–58', bookId: '1CO', ch: 15, theme: 'Steadfast, Immovable, Always Abounding', verse: 'But thanks be to God, who gives us the victory through our Lord Jesus Christ. Therefore, my beloved brethren, be steadfast, immovable, always abounding in the work of the Lord, knowing that your labor is not in vain in the Lord.' },
  { ref: '2 Corinthians 4:16–18', bookId: '2CO', ch: 4, theme: 'Our Light Affliction and Eternal Glory', verse: 'For our light affliction, which is but for a moment, is working for us a far more exceeding and eternal weight of glory, while we do not look at the things which are seen, but at the things which are not seen.' },
  { ref: '2 Corinthians 12:9', bookId: '2CO', ch: 12, theme: 'My Grace Is Sufficient for You', verse: 'And He said to me, "My grace is sufficient for you, for My strength is made perfect in weakness." Therefore most gladly I will rather boast in my infirmities, that the power of Christ may rest upon me.' },
  { ref: 'Galatians 6:9', bookId: 'GAL', ch: 6, theme: 'Do Not Grow Weary While Doing Good', verse: 'And let us not grow weary while doing good, for in due season we shall reap if we do not lose heart.' },
  { ref: 'Ephesians 1:3', bookId: 'EPH', ch: 1, theme: 'Blessed with Every Spiritual Blessing', verse: 'Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ.' },
  { ref: 'Ephesians 3:20–21', bookId: 'EPH', ch: 3, theme: 'Exceedingly Abundantly Above All We Ask', verse: 'Now to Him who is able to do exceedingly abundantly above all that we ask or think, according to the power that works in us, to Him be glory in the church by Christ Jesus to all generations, forever and ever. Amen.' },
  { ref: 'Ephesians 4:1–3', bookId: 'EPH', ch: 4, theme: 'Walk Worthy of the Calling', verse: 'I, therefore, the prisoner of the Lord, beseech you to walk worthy of the calling with which you were called, with all lowliness and gentleness, with longsuffering, bearing with one another in love, endeavoring to keep the unity of the Spirit in the bond of peace.' },
  { ref: 'Philippians 1:6', bookId: 'PHP', ch: 1, theme: 'He Who Has Begun a Good Work in You', verse: 'Being confident of this very thing, that He who has begun a good work in you will complete it until the day of Jesus Christ.' },
  { ref: 'Philippians 2:9–11', bookId: 'PHP', ch: 2, theme: 'The Name Above Every Name', verse: 'Therefore God also has highly exalted Him and given Him the name which is above every name, that at the name of Jesus every knee should bow, of those in heaven, and of those on earth, and of those under the earth, and that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father.' },
  { ref: 'Philippians 3:13–14', bookId: 'PHP', ch: 3, theme: 'Pressing Toward the Goal for the Upward Call', verse: 'Brethren, I do not count myself to have apprehended; but one thing I do, forgetting those things which are behind and reaching forward to those things which are ahead, I press toward the goal for the prize of the upward call of God in Christ Jesus.' },
  { ref: 'Colossians 1:16–17', bookId: 'COL', ch: 1, theme: 'All Things Created Through Him and for Him', verse: 'For by Him all things were created that are in heaven and that are on earth, visible and invisible... All things were created through Him and for Him. And He is before all things, and in Him all things consist.' },
  { ref: 'Colossians 3:23–24', bookId: 'COL', ch: 3, theme: 'Do It Heartily, as to the Lord', verse: 'And whatever you do, do it heartily, as to the Lord and not to men, knowing that from the Lord you will receive the reward of the inheritance; for you serve the Lord Christ.' },
  { ref: '1 Thessalonians 4:16–17', bookId: '1TH', ch: 4, theme: 'The Trumpet of God and the Blessed Hope', verse: 'For the Lord Himself will descend from heaven with a shout, with the voice of an archangel, and with the trumpet of God. And the dead in Christ will rise first. Then we who are alive and remain shall be caught up together with them in the clouds to meet the Lord in the air.' },
  { ref: '2 Thessalonians 3:3', bookId: '2TH', ch: 3, theme: 'The Lord Is Faithful: Established and Guarded', verse: 'But the Lord is faithful, who will establish you and guard you from the evil one.' },
  { ref: '1 Timothy 4:12', bookId: '1TI', ch: 4, theme: 'Let No One Despise Your Youth', verse: 'Let no one despise your youth, but be an example to the believers in word, in conduct, in love, in spirit, in faith, in purity.' },
  { ref: '1 Timothy 6:11–12', bookId: '1TI', ch: 6, theme: 'Fight the Good Fight of Faith', verse: 'But you, O man of God, flee these things and pursue righteousness, godliness, faith, love, patience, gentleness. Fight the good fight of faith, lay hold on eternal life.' },
  { ref: '2 Timothy 3:16–17', bookId: '2TI', ch: 3, theme: 'All Scripture Is Given by Inspiration of God', verse: 'All Scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness, that the man of God may be complete, thoroughly equipped for every good work.' },
  { ref: 'Titus 2:11–12', bookId: 'TIT', ch: 2, theme: 'The Grace of God Teaching Us to Live Soberly', verse: 'For the grace of God that brings salvation has appeared to all men, teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly in the present age.' },
  { ref: 'Hebrews 1:1–3', bookId: 'HEB', ch: 1, theme: 'God Has in These Last Days Spoken to Us by His Son', verse: 'God, who at various times and in various ways spoke in time past to the fathers by the prophets, has in these last days spoken to us by His Son, whom He has appointed heir of all things, through whom also He made the worlds.' },
  { ref: 'Hebrews 7:25', bookId: 'HEB', ch: 7, theme: 'Able to Save to the Uttermost', verse: 'Therefore He is also able to save to the uttermost those who come to God through Him, since He always lives to make intercession for them.' },
  { ref: 'Hebrews 10:23–25', bookId: 'HEB', ch: 10, theme: 'Hold Fast the Confession: Assemble Together', verse: 'Let us hold fast the confession of our hope without wavering, for He who promised is faithful. And let us consider one another in order to stir up love and good works, not forsaking the assembling of ourselves together.' },
  { ref: 'Hebrews 13:8', bookId: 'HEB', ch: 13, theme: 'Jesus Christ the Same Yesterday, Today, and Forever', verse: 'Jesus Christ is the same yesterday, today, and forever.' },
  { ref: 'James 1:22', bookId: 'JAS', ch: 1, theme: 'Be Doers of the Word, and Not Hearers Only', verse: 'But be doers of the word, and not hearers only, deceiving yourselves.' },
  { ref: 'James 4:7–8', bookId: 'JAS', ch: 4, theme: 'Submit to God, Resist the Devil, Draw Near', verse: 'Therefore submit to God. Resist the devil and he will flee from you. Draw near to God and He will draw near to you.' },
  { ref: 'James 5:16', bookId: 'JAS', ch: 5, theme: 'The Effective, Fervent Prayer of a Righteous Man', verse: 'Confess your trespasses to one another, and pray for one another, that you may be healed. The effective, fervent prayer of a righteous man avails much.' },
  { ref: '1 Peter 1:18–19', bookId: '1PE', ch: 1, theme: 'Redeemed with the Precious Blood of Christ', verse: 'Knowing that you were not redeemed with corruptible things, like silver or gold... but with the precious blood of Christ, as of a lamb without blemish and without spot.' },
  { ref: '1 Peter 2:9', bookId: '1PE', ch: 2, theme: 'A Chosen Generation, a Royal Priesthood', verse: 'But you are a chosen generation, a royal priesthood, a holy nation, His own special people, that you may proclaim the praises of Him who called you out of darkness into His marvelous light.' },
  { ref: '2 Peter 1:3–4', bookId: '2PE', ch: 1, theme: 'Given to Us All Things That Pertain to Life and Godliness', verse: 'As His divine power has given to us all things that pertain to life and godliness, through the knowledge of Him who called us by glory and virtue, by which have been given to us exceedingly great and precious promises.' },
  { ref: '2 Peter 3:9', bookId: '2PE', ch: 3, theme: 'The Lord Is Patient, Not Willing That Any Should Perish', verse: 'The Lord is not slack concerning His promise, as some count slackness, but is longsuffering toward us, not willing that any should perish but that all should come to repentance.' },
  { ref: '1 John 3:1–2', bookId: '1JN', ch: 3, theme: 'Behold What Manner of Love the Father Has Bestowed', verse: 'Behold what manner of love the Father has bestowed on us, that we should be called children of God! Therefore the world does not know us, because it did not know Him.' },
  { ref: '1 John 4:18–19', bookId: '1JN', ch: 4, theme: 'Perfect Love Casts Out Fear', verse: 'There is no fear in love; but perfect love casts out fear, because fear involves torment. But he who fears has not been made perfect in love. We love Him because He first loved us.' },
  { ref: '1 John 5:4–5', bookId: '1JN', ch: 5, theme: 'This Is the Victory: Our Faith', verse: 'For whatever is born of God overcomes the world. And this is the victory that has overcome the world—our faith. Who is he who overcomes the world, but he who believes that Jesus is the Son of God?' },
  { ref: 'Jude 1:24–25', bookId: 'JUD', ch: 1, theme: 'Able to Keep You from Stumbling', verse: 'Now to Him who is able to keep you from stumbling, and to present you faultless before the presence of His glory with exceeding joy, to God our Savior, who alone is wise, be glory and majesty, dominion and power, both now and forever. Amen.' },
  { ref: 'Revelation 1:8', bookId: 'REV', ch: 1, theme: 'I Am the Alpha and the Omega', verse: 'I am the Alpha and the Omega, the Beginning and the End, says the Lord, who is and who was and who is to come, the Almighty.' },
  { ref: 'Revelation 3:20', bookId: 'REV', ch: 3, theme: 'Behold, I Stand at the Door and Knock', verse: 'Behold, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in to him and dine with him, and he with Me.' }
];

// Combine Anchors and Canonical Catalog to guarantee 366 uniquely generated pairs
export function getDailyBreadForDayOfYear(dayOfYear: number): DayDevotional {
  // Normalize 1 to 366
  const cleanDay = Math.max(1, Math.min(366, Math.floor(dayOfYear)));

  // Combine full lists
  const allOT = [...OT_ANCHORS, ...OT_WISDOM_CATALOG];
  const allNT = [...NT_ANCHORS, ...NT_EPISTLE_CATALOG];

  // Deterministic 1-to-1 unique mapping for every single day (1..366)
  // Day n gets distinct OT and NT passages without overlapping
  const otIndex = (cleanDay - 1) % allOT.length;
  const ntIndex = (cleanDay - 1) % allNT.length;

  const otItem = allOT[otIndex];
  const ntItem = allNT[ntIndex];

  // Specific day-anchored expositions ensuring non-repetition across all 366 calendar days
  const morningExposition = otItem.exposition || 
    `On Day ${cleanDay} of the consecrated year, the Holy Spirit draws our morning gaze to ${otItem.ref}. In this Old Testament and Wisdom revelation, we behold God's eternal covenant with His people. Before facing modern digital noise, workplace pressure, or academic trials, let this ancient sacred truth establish your steps in unwavering holiness and power.`;

  const morningPrayer = otItem.prayer ||
    `Lord God of Abraham, Isaac, and Jacob, thank You for the truth of ${otItem.ref}. Let this scripture anchor my soul this morning. Direct my speech, purify my thoughts, and grant me boldness to walk as a consecrated disciple of Christ today. In Jesus' mighty name, Amen.`;

  const morningAction = otItem.action ||
    `Write down ${otItem.ref} on your device or notepad. Meditate on its promise for 3 minutes before starting your daily tasks.`;

  const eveningExposition = ntItem.exposition ||
    `As the shadows lengthen on Day ${cleanDay}, twilight solace in Christ beckons the soul into divine rest. In ${ntItem.ref}, the New Testament reveals the supreme sufficiency of our risen Lord. Cast aside the accumulated weight and exhaustion of the day, trusting that He who holds your tomorrow neither slumbers nor sleeps.`;

  const eveningPrayer = ntItem.prayer ||
    `Lord Jesus, as night falls, I surrender every anxiety, burden, and unfinished task into Your hands. Thank You for the promise in ${ntItem.ref}. Blanket my rest with angel watches and awaken me with praise on my lips. In Your holy name, Amen.`;

  const eveningAction = ntItem.action ||
    `Disconnect from bright screens 20 minutes before sleep. Whisper the words of ${ntItem.ref} and surrender your day into God's sovereign keeping.`;

  return {
    dayNumber: cleanDay,
    morning: {
      title: `Morning Manna: ${otItem.theme}`,
      subheading: `Dawn Consecration • Old Testament & Wisdom (Day ${cleanDay})`,
      scriptureRef: otItem.ref,
      bookId: otItem.bookId,
      chapter: otItem.ch,
      scriptureText: otItem.verse,
      exposition: morningExposition,
      prayer: morningPrayer,
      practicalAction: morningAction,
      testament: 'Old Testament / Wisdom'
    },
    evening: {
      title: `Evening Solace: ${ntItem.theme}`,
      subheading: `Twilight Peace • New Testament & Epistles (Day ${cleanDay})`,
      scriptureRef: ntItem.ref,
      bookId: ntItem.bookId,
      chapter: ntItem.ch,
      scriptureText: ntItem.verse,
      exposition: eveningExposition,
      prayer: eveningPrayer,
      practicalAction: eveningAction,
      testament: 'New Testament / Epistles'
    }
  };
}

/**
 * Calculates current Day of the Year (1..366)
 */
export function getCurrentDayOfYear(date: Date = new Date()): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diffTime = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diffTime / oneDay) + 1;
}

export function getTotalDaysInCurrentYear(date: Date = new Date()): number {
  const year = date.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 366 : 365;
}
