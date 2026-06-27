export type ClientEntry = { id: string; name: string; category?: string; logo_url?: string };

// 로고 소스: Google 파비콘 서비스(안정적, 모든 도메인 지원). clearbit는 국내 도메인 미지원이 많아 교체.
const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const clients: ClientEntry[] = [
  { id: '1',  name: '현대자동차',   category: 'Automotive', logo_url: favicon('hyundai.com') },
  { id: '2',  name: '동서식품',     category: 'F&B',        logo_url: favicon('dongsuh.co.kr') },
  { id: '3',  name: 'SKT',          category: 'Telecom',    logo_url: favicon('sktelecom.com') },
  { id: '4',  name: '포스트',       category: 'F&B',        logo_url: favicon('postfoods.co.kr') },
  { id: '5',  name: '유니레버',     category: 'FMCG',       logo_url: favicon('unilever.com') },
  { id: '6',  name: '보령제약',     category: 'Healthcare', logo_url: favicon('boryung.co.kr') },
  { id: '7',  name: '하이트진로',   category: 'Beverage',   logo_url: favicon('hitejinro.com') },
  { id: '8',  name: 'KB자산운용',   category: 'Finance',    logo_url: favicon('kbam.co.kr') },
  { id: '9',  name: '소니코리아',   category: 'Electronics',logo_url: favicon('sony.co.kr') },
  { id: '10', name: '올리브영',     category: 'Beauty',     logo_url: favicon('oliveyoung.co.kr') },
  { id: '11', name: 'KBS',          category: 'Media',      logo_url: favicon('kbs.co.kr') },
  { id: '12', name: 'Mnet',         category: 'Media',      logo_url: favicon('mnet.com') },
  { id: '13', name: '동원홈푸드',   category: 'F&B',        logo_url: favicon('dongwonfoodservice.com') },
  { id: '14', name: '칭따오',       category: 'Beverage',   logo_url: favicon('tsingtao.com') },
  { id: '15', name: '링글',         category: 'EdTech',     logo_url: favicon('ringleplus.com') },
  { id: '16', name: '패스트캠퍼스', category: 'EdTech',     logo_url: favicon('fastcampus.co.kr') },
  { id: '17', name: '아임비타',     category: 'Healthcare', logo_url: favicon('imbita.com') },
  { id: '18', name: '밀레',         category: 'Fashion',    logo_url: favicon('millet.com') },
  { id: '19', name: '본죽',         category: 'F&B',        logo_url: favicon('bonjuk.co.kr') },
  { id: '20', name: '이투스',       category: 'EdTech',     logo_url: favicon('etoos.com') },
  { id: '21', name: '갈더마코리아', category: 'Healthcare', logo_url: favicon('galderma.com') },
  { id: '22', name: '칼스버그',     category: 'Beverage',   logo_url: favicon('carlsberg.com') },
  { id: '23', name: '다올투자증권', category: 'Finance',    logo_url: favicon('daol.co.kr') },
  { id: '24', name: '라푸마',       category: 'Fashion',    logo_url: favicon('lafuma.com') },
];
