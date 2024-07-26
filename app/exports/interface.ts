interface IEpisode {
    id: string;
    number: number;
    url: string;
  }
  
  interface IAnimeInfo {
    id: string;
    title: string;
    url: string;
    genres: string[];
    totalEpisodes: number;
    image: string;
    releaseDate: string;
    description: string;
    subOrDub: string;
    type: string;
    status: string;
    otherName: string;
    episodes: IEpisode[];
  }
  
  interface IAnimeEntry {
    id?: string;
    title?: string;
    image?: string;
    url?: string;
    genres?: string[];
    episodeId?: string;
    episodeNumber?: number;
    releaseDate?: string;
  }
  
  interface IAnimePage {
    currentPage: string;
    hasNextPage: boolean;
    results: IAnimeEntry[];
  }
  
  interface Source {
    url: string;
    isM3U8: boolean;
    quality: string;
  }
  
  interface EpisodeData {
    headers: {
      Referer: string;
    };
    sources: Source[];
    download: string;
  }

  interface Episode {
    id: string;
    number: number;
    title: string;
    isFiller: boolean;
    url: string;
  }
  interface Recommendation {
    id: string;
    title: string;
    url: string;
    image: string;
    duration: string;
    japaneseTitle: string;
    type: string;
    nsfw: boolean;
    sub: number;
    dub: number;
    episodes: number;
  }
  interface RelatedAnime {
    id: string;
    title: string;
    url: string;
    image: string;
    japaneseTitle: string;
    type: string;
    sub: number;
    dub: number;
    episodes: number;
  }
  interface IAnimeEntryDetails {
    id: string;
    title: string;
    malID: number;
    alID: number;
    japaneseTitle: string;
    image: string;
    description: string;
    type: string;
    url: string;
    recommendations: Recommendation[];
    relatedAnime: RelatedAnime[];
    subOrDub: string;
    hasSub: boolean;
    hasDub: boolean;
    totalEpisodes: number;
    episodes: Episode[];
  }
  

export type {EpisodeData,IAnimeEntry,IAnimeInfo,IAnimePage,IEpisode,Source,IAnimeEntryDetails,}