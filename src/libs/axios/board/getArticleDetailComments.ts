import Axios from "axios";
import {ArticleDetail} from "@/dtos/ArticleDto";

const Base_URL = "http://rave-dev.ddns.net:8080";

export async function getArticleDetailComments(id: string | string[] | undefined): Promise<ArticleDetail> {
  try {
    const url = `${Base_URL}/articles/${id}/comments`;

    const response = await Axios.get(url);
    return response.data as ArticleDetail;
  } catch (e) {
    console.error("데이터를 불러오는데 오류가 있습니다:", e);
    throw e;
  }
}