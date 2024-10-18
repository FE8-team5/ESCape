import Axios from "axios";
import {ArticleFormData} from "@/dtos/ArticleDto";

const Base_URL = "http://rave-dev.ddns.net:8080";

export async function postArticles(formData: FormData) {
  const url = `${Base_URL}/articles`
  const responses = await Axios.post<ArticleFormData>(
    url,
    formData,
    {
      headers: {
        "Content-Type": "application/json"
      },
    },
  );
  return responses.data
}