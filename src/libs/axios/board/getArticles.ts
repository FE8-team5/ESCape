import Axios from "axios";
import {BoardData} from "@/dtos/ArticleDto";

const Base_URL = "http://rave-dev.ddns.net:8080";

interface getArticlesParams {
  selectedOption: string;
  searchValue: string;
  currentPage: number;
}

export async function getArticles({selectedOption, searchValue, currentPage}: getArticlesParams): Promise<BoardData> {
  try {
    let orderBy = '';
    if (selectedOption === "최신순") {
      orderBy = "recent";
    } else if (selectedOption === "인기순") {
      orderBy = "like";
    }

    const url = searchValue
      ? `${Base_URL}/articles?page=${currentPage}&pageSize=4&orderBy=${orderBy}&keyword=${searchValue}`
      : `${Base_URL}/articles?page=${currentPage}&pageSize=4&orderBy=${orderBy}`

    const response = await Axios.get(url);
    return response.data as BoardData;
  } catch (e) {
    console.error("데이터를 불러오는데 오류가 있습니다:", e);
    throw e;
  }
}