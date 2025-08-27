import { toast } from "sonner";

function useClipboard() {
  // 구형 브라우저 지원
  const copoyWithExecCommand = () => {
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("링크가 복사되었어요.");
    } catch (error) {
      console.error("URL 복사 실패:", error);
      copoyWithExecCommand();
      toast("링크가 복사되었어요.");
    }
  };

  return { handleCopy };
}

export default useClipboard;
