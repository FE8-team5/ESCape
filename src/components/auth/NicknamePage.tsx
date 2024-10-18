import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import PrimaryButton from "@/components/@shared/button/PrimaryButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Spinner } from "flowbite-react";

export default function NicknamePage({ provider }) {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const result = await oAuthSignUp({ nickname: data.nickname }, provider);
      if (result) {
        router.push("/");
      } else {
        alert("회원가입 실패");
      }
    } catch (err) {
      setError("nickname", {
        type: "server",
        message: "회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[200px] max-w-[640px] text-white p-3 mx-auto">
      <div className="flex justify-center">
        <Link href="/" className="inline-block py-10">
          <Image width={200} src={Logo} alt="로고 이미지" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="block pb-1">닉네임</label>
          <input
            type="text"
            className={`bg-brand-black-medium w-full rounded-xl border-solid border-brand-black-light py-4 px-6 text-brand-gray-dark focus:outline-blue-gradation ${
              errors.nickname ? "border-red-500" : ""
            }`}
            placeholder="닉네임을 입력해주세요"
            {...register("nickname", {
              required: "닉네임은 필수 입력입니다.",
              maxLength: {
                value: 10,
                message: "닉네임은 최대 10자까지 가능합니다.",
              },
            })}
          />
          {errors.nickname && (
            <p className="text-red-500 text-sm mt-2">
              {errors.nickname.message}
            </p>
          )}
        </div>
        <div className="pt-2">
          <PrimaryButton type="submit" active={true}>
            {loading ? (
              <Spinner aria-label="로딩 중..." size="md" />
            ) : (
              "가입하기"
            )}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
