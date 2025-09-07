import { useProgressStore } from "@/store/useProgressStore";
import { Progress } from "./ui/progress";

export default function ProgessBar() {
  const { value } = useProgressStore();
  return (
    <div className="flex flex-col gap-1 my-8">
      <div className="flex items-center justify-between text-primary text-body-3 tracking-body-3 leading-body-3 font-normal md:text-body-2 md:tracking-body-2 md:leading-body-2">
        <span className="font-normal">
          최대 1,250만원까지 무료 선정산이 가능해요.
        </span>
        <span className="font-semibold">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
