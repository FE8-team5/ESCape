import Axios from "axios";
import {BoardData} from "@/dtos/ArticleDto";

const Base_URL = "http://rave-dev.ddns.net:8080";

export async function getArticlesByLike(page = 0, pageSize = 3): Promise<BoardData> {
  try {
    const url = `${Base_URL}/articles?page=${page}&pageSize=${pageSize}&orderBy=like`

    const response = await Axios.get(url);
    return response.data as BoardData;
  } catch (e) {
    console.error("데이터를 불러오는데 오류가 있습니다:", e);
    throw e;
  }
}