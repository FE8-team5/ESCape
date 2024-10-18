import HeaderSection from "@/components/addboard/HeaderSection";
import ContentSection from "@/components/addboard/ContentSection";
import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postArticles} from "@/libs/axios/addboard/postArticles";
import {useRouter} from "next/router";

export default function AddBoardsPage() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleFormDataChange = (value: {image: File | null; title: string; content: string}) => {
    setImage(value.image);
    setTitle(value.title);
    setContent(value.content);
  }

  // 게시글 전송을 위한 useMutation
  // 쿼리 무효화 작업이 완료된 후 페이지를 이동하기 위해 async await 를 사용하여 기다림
  const uploadPostMutation = useMutation({
    mutationFn: (newPost: FormData) => postArticles(newPost),
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['articles']});
        await queryClient.invalidateQueries({ queryKey: ['likes']});
        router?.push("/board")
      } catch (e) {
        console.error(e);
      }
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image as File);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", String(userId));

    uploadPostMutation.mutate(formData);

    setImage(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="relative mx-4 md:6 xl:mx-auto xl:w-[1200px] py-[100px]">
      <form onSubmit={handleSubmit}>
        <HeaderSection />
        <ContentSection onFormDataChange={handleFormDataChange} />
      </form>
    </div>
  );
}
