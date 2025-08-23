"use client";
import usePolicyForm from "@/hooks/usePolicyForm";
import { Checkbox } from "./ui/checkbox";
import ArrowRightIcon from "@/assets/arrow-right.svg";
import Link from "next/link";

type PolicyFormProps = ReturnType<typeof usePolicyForm>;

export default function PolicyForm({
  POLICY_DATA,
  checkedItems,
  handleCheck,
  isAllChecked,
  handleAllCheck,
}: PolicyFormProps) {
  return (
    <form className="flex flex-col w-full">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={isAllChecked}
          id="all-checked"
          onCheckedChange={(c) => handleAllCheck(Boolean(c))}
        />
        <label
          className="
           text-label-900 text-body-1 leading-body-1 tracking-body-1 font-medium 
           sm:text-title-4 sm:leading-title-4 sm:tracking-title-4
         "
          htmlFor="all-checked"
        >
          전체 동의
        </label>
      </div>
      <div className="h-px w-full bg-line-400 my-7" />
      <div className="flex flex-col gap-5">
        {POLICY_DATA.map(({ id, label, href }) => (
          <div key={id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={checkedItems[id] ?? false}
                id={`check${id}`}
                onCheckedChange={(c) => handleCheck(id, Boolean(c))}
              />
              <label
                htmlFor={`check${id}`}
                className="text-label-700 text-body-2 leading-body-2 tracking-body-2 cursor-pointer
                sm:text-body-1 sm:leading-body-1 sm:tracking-body-1"
              >
                {label}
              </label>
            </div>
            {href && (
              <Link target="_blank" href={href}>
                <ArrowRightIcon />
              </Link>
            )}
          </div>
        ))}
      </div>
    </form>
  );
}
