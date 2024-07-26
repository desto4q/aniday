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

export type {EpisodeData,IAnimeEntry,IAnimeInfo,IAnimePage,IEpisode,Source}