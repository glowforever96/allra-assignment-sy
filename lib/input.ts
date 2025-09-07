// 숫자만 입력 가능, 최대 길이 제한 함수
export const handleNumberOnlyInput = (
  e: React.FormEvent<HTMLInputElement>,
  maxLength: number
) => {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/\D/g, "");
  if (target.value.length > maxLength) {
    target.value = target.value.slice(0, maxLength);
  }
};
