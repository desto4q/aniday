import axios from 'axios';

interface IApiProps {
  page?: number | string;
  id?: number | string;
}

const fetchTop = async ({page}: IApiProps) => {
  try {
    const response = await axios.get(
      `https://dezz-consument.vercel.app/anime/gogoanime/top-airing?page=${
        page ? page : 1
      }`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchRecentEpisodes = async ({page}: IApiProps) => {
  try {
    const response = await axios.get(
      `https://dezz-consument.vercel.app/anime/gogoanime/recent-episodes?page=${
        page ? page : 1
      }`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchAnimeInfo = async ({id}: IApiProps) => {
  try {
    const response = await axios.get(
      `https://dezz-consument.vercel.app/anime/gogoanime/info/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchEpisode = async ({id}: {id: string | number}) => {
  try {
    const response = await axios.get(
      `https://dezz-consument.vercel.app/anime/gogoanime/watch/${id}?server=gogocdn`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const queryAnime = async ({
  query,
  pid,
}: {
  query: string;
  pid: number | string;
}) => {
  try {
    const response = await axios.get(
      `https://dezz-consument.vercel.app/anime/gogoanime/${query}?page=${pid}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchPopular = async ({page}: IApiProps) => {
  try {
    const response = await axios.get(
      `https://dezz-consument.vercel.app/anime/gogoanime/popular?page=${
        page ? page : 1
      }`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const fetchFavorites = async ({page}: IApiProps) => {
  try {
    const response = await axios.get(
      `https://dezz-consument.vercel.app/anime/zoro/most-favorite?page=${
        page ? page : 1
      }`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const fetchMovies = async ({page}: IApiProps) => {
  try {
    const response = await axios.get(
      `https://dezz-consument.vercel.app/anime/gogoanime/movies?page=${
        page ? page : 1
      }`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchgenreList = async () => {
  try {
    const response = await axios.get(
      'https://dezz-consument.vercel.app/anime/gogoanime/genre/list',
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
const fetchGenre = async ({page, id}: IApiProps) => {
  try {
    const response = await axios.get(
      `https://dezz-consument.vercel.app/anime/gogoanime/genre/${id}?page=${
        page ? page : 1
      }`,
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
export {
  fetchGenre,
  fetchgenreList,
  fetchTop,
  fetchRecentEpisodes,
  fetchAnimeInfo,
  fetchEpisode,
  queryAnime,
  fetchPopular,
  fetchFavorites,
  fetchMovies,
};
