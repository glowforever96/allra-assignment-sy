import { useProgressStore } from "@/store/useProgressStore";
import { useState } from "react";

function usePolicyForm() {
  const POLICY_DATA = [
    {
      id: 1,
      label: "서비스 이용약관 동의 (필수)",
      required: true,
      href: "https://intro.allra.co.kr/policy/terms",
    },
    {
      id: 2,
      label: "개인(신용)정보 수집 및 이용동의 (필수)",
      required: true,
      href: "https://intro.allra.co.kr/policy/seller",
    },
    {
      id: 3,
      label: "개인(신용)정보 제공 및 위탁동의 (필수)",
      required: true,
      href: "https://intro.allra.co.kr/policy/manage",
    },
    {
      id: 4,
      label: "개인(신용)정보 조회 동의 (필수)",
      required: true,
      href: "https://intro.allra.co.kr/policy/inquiry",
    },
    {
      id: 5,
      label: "마케팅 활용 및 광고성 정보 수신동의",
      required: false,
      href: "",
    },
  ];

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [signupStep, setSignupStep] = useState(1);
  const { increase } = useProgressStore();

  // 전체 동의 된 상태인지 여부 판별
  const isAllChecked = POLICY_DATA.every((item) => checkedItems[item.id]);

  // 필수 선택 사항 동의 된 상태 판별
  const isRequiredChecked = POLICY_DATA.filter((item) => item.required).every(
    (item) => checkedItems[item.id]
  );

  const handleCheck = (id: number, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  const handleAllCheck = (checked: boolean) => {
    const newCheckedItems: Record<number, boolean> = {};
    POLICY_DATA.forEach((item) => (newCheckedItems[item.id] = checked));
    setCheckedItems(newCheckedItems);
  };

  const handleClickNext = () => {
    if (isRequiredChecked) {
      setSignupStep(2);
      increase(15);
    }
  };

  return {
    POLICY_DATA,
    checkedItems,
    signupStep,
    isAllChecked,
    isRequiredChecked,
    handleCheck,
    handleAllCheck,
    handleClickNext,
  };
}

export default usePolicyForm;
