import HeaderSection from "@/components/addboard/HeaderSection";
import ContentSection from "@/components/addboard/ContentSection";
import {FormEvent, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postArticles} from "@/libs/axios/addboard/postArticles";
import {useRouter} from "next/router";

export default function AddBoardsPage() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");
  const [userId, setUserId] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();

  // ContentSection 컴포넌트에서 받아온 value 값들을 적용하기 위한 이벤트 핸들러
  const handleFormDataChange = (value: {image: File | null; title: string | undefined; content: string | undefined}) => {
    setImage(value.image);
    setTitle(value?.title);
    setContent(value?.content);
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

  // 작성을 완료한 value 를 formData 에 담아 보내기 위한 이벤트 핸들러
  // formData 를 활용한 이유는 이미지 파일이 JSON 형태로 전송할 수 없는 문제가 있어서 임시 사용
  // URL 로 받아와서 string 형태로 처리할 수 있는 방법이 있으면 개선 예정
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image as File);
    formData.append("title", title as string);
    formData.append("content", content as string);
    formData.append("userId", String(userId));

    uploadPostMutation.mutate(formData);

    setImage(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="relative mx-4 md:6 xl:mx-auto xl:w-[1200px] py-[100px]">
      <form onSubmit={handleSubmit}>
        <HeaderSection>
          게시글 쓰기
        </HeaderSection>
        <ContentSection title={title} content={content} onFormDataChange={handleFormDataChange} />
      </form>
    </div>
  );
}
